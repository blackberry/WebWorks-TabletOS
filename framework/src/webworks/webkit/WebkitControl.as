/*
 * Copyright 2010 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ 
package webworks.webkit
{
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.events.ErrorEvent;
	import flash.events.Event;
	import flash.events.LocationChangeEvent;
	import flash.events.TimerEvent;
	import flash.geom.Rectangle;
	import flash.net.NetworkInfo;
	import flash.net.NetworkInterface;
	import flash.utils.*;
	import flash.utils.Timer;
	
	import mx.core.EventPriority;
	
	import qnx.display.IowWindow;
	import qnx.events.ExtendedLocationChangeEvent;
	import qnx.events.JavaScriptCallbackEvent;
	import qnx.events.JavaScriptResultEvent;
	import qnx.events.NetworkResourceRequestedEvent;
	import qnx.events.UnknownProtocolEvent;
	import qnx.events.WebViewEvent;
	import qnx.media.QNXStageWebView;
	
	import webworks.JavaScriptLoader;
	import webworks.access.Access;
	import webworks.config.ConfigConstants;
	import webworks.config.ConfigData;	
	import webworks.policy.WidgetPolicy;
	import webworks.util.Utilities;
	
	public class WebkitControl extends Sprite
	{
		private var webView:QNXStageWebView;
		private var defaults:Object;
        private var creationID:Number;
        private var uniqueID:String;
        private var windowObj:IowWindow;
		private var javascriptLoader:JavaScriptLoader;
		
		public function WebkitControl(_creationID:Number,_x:int, _y:int, _width:int, _height:int) {
			defaults = new Object();
			defaults.x = _x;
			defaults.y = _y;	
			defaults.width = _width;
			defaults.height = _height;
            creationID = _creationID;
			_init();
		}
		
		private function _init():void {
			webView = new QNXStageWebView();
			webView.stage = this.stage;
			webView.viewPort = new Rectangle(defaults.x, defaults.y, defaults.width, defaults.height);
			webView.enableCrossSiteXHR = true;
			javascriptLoader = new JavaScriptLoader(this);
			
			// set custom headers
			var customHeadersString:String = "";
			var customHeaders:Object = ConfigData.getInstance().getProperty(ConfigConstants.CUSTOMHEADERS);
			for (var customName:String in customHeaders) {
				customHeadersString += customName + ":" + customHeaders[customName] + " ";
			}
			
			if(customHeadersString.length > 0) {
				webView.customHTTPHeaders = customHeadersString;
			}
			
			webView.addEventListener(ErrorEvent.ERROR, loadError);
			webView.addEventListener(Event.COMPLETE, loadComplete);

			webView.addEventListener(LocationChangeEvent.LOCATION_CHANGING, locationChanging);
			webView.addEventListener(LocationChangeEvent.LOCATION_CHANGE, locationChanged); 
            webView.addEventListener(WebViewEvent.CREATED, htmlEventBrowserCreated);
			webView.addEventListener(NetworkResourceRequestedEvent.NETWORK_RESOURCE_REQUESTED, networkResourceRequested);
			webView.addEventListener(UnknownProtocolEvent.UNKNOWN_PROTOCOL, handleUnknownProtocol);
			webView.addEventListener(WebViewEvent.JAVA_SCRIPT_WINDOW_OBJECT_CLEARED, onJavaScriptWindowObjectCleared);



			
		}		
		

		private function networkResourceRequested(event:NetworkResourceRequestedEvent):void
		{
			trace("networkResourceRequested: " + event.url);
			dispatchEvent(new WebkitEvent(WebkitEvent.TAB_NETWORKRESOURCEREQUESTED, event.url));
			//Utilities.alert("networkResourceRequested: " + event.url, webView);
		}
		
		private function handleUnknownProtocol(event:UnknownProtocolEvent):void
		{
			trace("handleUnknownProtocol: " + event.url);
			dispatchEvent(new WebkitEvent(WebkitEvent.TAB_UNKNOWNPROTOCOL, event.url));
			//Utilities.alert("handleUnknownProtocol: " + event.url, webView);
		}		
		
		private function loadComplete(event:Event):void
		{
			trace("Load Complete");
			dispatchEvent(new WebkitEvent(WebkitEvent.TAB_LOAD_COMPLETE));
		}
		
		private function loadError(event:Event):void
		{
			trace("Load error: " + event.toString());
			dispatchEvent(new WebkitEvent(WebkitEvent.TAB_LOAD_ERROR));
		}
		
		private function locationChanged(event:ExtendedLocationChangeEvent):void
		{
			trace("QNX Location Changed: " + event.location);
			dispatchEvent(new WebkitEvent(WebkitEvent.TAB_LOCATION_CHANGED, event));
		}
		
		private function locationChanging(event:ExtendedLocationChangeEvent):void
		{
			trace("QNX Location Changing: " + event.location);
			var config : ConfigData = ConfigData.getInstance();
			var access : Access = config.getAccessByUrl(event.location);
			if (access==null && event.location!="about:blank" && !config.getProperty(ConfigConstants.HASMULTIACCESS))
			{
				event.preventDefault();
				trace(event.location + "not allowed");
				Utilities.alert(event.location + " is not allowed", webView);
			}
			else
				dispatchEvent(new WebkitEvent(WebkitEvent.TAB_LOCATION_CHANGING, event));		
		}
		               
        private function htmlEventBrowserCreated(event:WebViewEvent):void
        {
            trace("WEBKITCONTROL: " + event.type, webView.windowUniqueId);
            uniqueID = webView.windowUniqueId;
            windowObj = IowWindow.getExternalWindow(-1, uniqueID);
            dispatchEvent(new WebkitEvent(event.type, { creationID:creationID }));
        }
        
        private function htmlEventHandler( event:WebViewEvent ):void
        {
            trace("WEBKITCONTROL: " + event.type);
            dispatchEvent( new WebkitEvent(event.type ) );
        }
		
		public function go(address:String):void
		{
			trace("Go function called: " + address);
			webView.loadURL(address);
		}
		
		public function executeJavaScript(js:String):void
		{
			webView.executeJavaScript(js);
        }
		
		public function stop() : void 
		{
			webView.stop();
		}
		
		public function get qnxWebView():QNXStageWebView
		{
			return webView;
		}

		private function onJavaScriptWindowObjectCleared(event:WebViewEvent):void{
			event.preventDefault();
			javascriptLoader.registerJavaScript(webView.location, event);
		}
		

	}
}
