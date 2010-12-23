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
	import flash.utils.Timer;
	
	import qnx.display.IowWindow;
	import qnx.events.ExtendedLocationChangeEvent;
	import qnx.events.JavaScriptCallbackEvent;
	import qnx.events.JavaScriptResultEvent;
	import qnx.events.NetworkResourceRequestedEvent;
	import qnx.events.UnknownProtocolEvent;
	import qnx.events.WebViewEvent;
	import qnx.media.QNXStageWebView;
	
	import webworks.access.Access;
	import webworks.config.ConfigConstants;
	import webworks.config.ConfigData;
	import webworks.extension.AppNameSpaceGenerator;
	import webworks.policy.WidgetPolicy;
	import webworks.util.Utilities;
	
	import flash.utils.*;
	
	public class WebkitControl extends Sprite
	{
		private var webView:QNXStageWebView;
		private var defaults:Object;
        private var creationID:Number;
        private var uniqueID:String;
        private var windowObj:IowWindow;
		
		public function WebkitControl(_creationID:Number,_x:int, _y:int, _width:int, _height:int) {
			defaults = new Object();
			defaults.x = _x;
			defaults.y = _y;	
			defaults.width = _width;
			defaults.height = _height;
            creationID = _creationID;
			_init();
		}
		
		private function _init():void
		{
			webView = new QNXStageWebView();
			webView.stage = this.stage;
			webView.viewPort = new Rectangle(defaults.x, defaults.y, defaults.width, defaults.height);
			webView.addEventListener(ErrorEvent.ERROR, loadError);
			webView.addEventListener(Event.COMPLETE, loadComplete);
//
			webView.addEventListener(LocationChangeEvent.LOCATION_CHANGING, locationChanging);
			webView.addEventListener(LocationChangeEvent.LOCATION_CHANGE, locationChanged); 
//			webView.addEventListener(JavaScriptCallbackEvent.JAVASCRIPT_CALLBACK, jsMethodCalled);
//			webView.addEventListener(JavaScriptResultEvent.JAVASCRIPT_RESULT, jsExeced);	
//			webView.addEventListener(HtmlEvent.HTML_DOM_INITIALIZED, domInitialized);
            webView.addEventListener(WebViewEvent.CREATED, htmlEventBrowserCreated);
//            webView.addEventListener(HtmlEvent.HTML_BROWSER_CREATE_FAILED, htmlEventHandler);
			//webView.addEventListener(QNXRequestEvent, requestHandler); //the event need to be defined by webkit
			webView.addEventListener(NetworkResourceRequestedEvent.NETWORK_RESOURCE_REQUESTED, networkResourceRequested);
			webView.addEventListener(UnknownProtocolEvent.UNKNOWN_PROTOCOL, handleUnknownProtocol);
			webView.addEventListener(WebViewEvent.DOCUMENT_LOAD_FINISHED, windowCleared);
			
		}
		
		private function windowCleared(event:WebViewEvent):void
		{
			var appNSGen:AppNameSpaceGenerator = new AppNameSpaceGenerator(ConfigData.getInstance().properties);
			var myJsonProperties:String = appNSGen.appDataJson;
			//var myJsonProperties:String = "{author:'Jason'}";
			
			webView.executeJavaScript("alert('Blackberry: '+blackberry);");
			webView.executeJavaScript("alert('Blackberry.app: '+blackberry.app);");
			//var js:String = "(function() {var json = arguments[0]; for(var prop in json) { if(json.hasOwnProperty(prop)) {blackberry.app.__defineGetter__(prop, function() { return json[prop]; });}}})(" + myJsonProperties + ");";
			var js:String = "(function() {var json = arguments[0]; var json = arguments[0];var oldApp = blackberry.app;blackberry.app = json;blackberry.app.exit = oldApp.exit;})(" + myJsonProperties + ");";
			//var js:String = "(function() { var json = arguments[0]; for(var prop in json) { alert('json[prop]='+json[prop]); blackberry.app[prop] = json[prop];} alert('2'); })(" + myJsonProperties + ");";
			trace(js);
			webView.executeJavaScript(js); // + myJsonProperties + ");");
			//webView.executeJavaScript("function() { alert('arguments[0]' + arguments[0]); var json = arguments[0]; }(" + myJsonProperties + ");");
			//for(prop in json) { blackberry.app[prop] = json[prop];}
			//webView.executeJavaScript("blackberry.app = {author  : 'Jason'};");
			trace(event.toString());			
		}

		private function networkResourceRequested(event:NetworkResourceRequestedEvent):void
		{
			trace("networkResourceRequested: " + event.url);
			dispatchEvent(new WebkitEvent(WebkitEvent.TAB_NETWORKRESOURCEREQUESTED, event.url));
			Utilities.alert("networkResourceRequested: " + event.url, webView);
		}
		
		private function handleUnknownProtocol(event:UnknownProtocolEvent):void
		{
			trace("handleUnknownProtocol: " + event.url);
			dispatchEvent(new WebkitEvent(WebkitEvent.TAB_UNKNOWNPROTOCOL, event.url));
			Utilities.alert("handleUnknownProtocol: " + event.url, webView);
		}		
		
		private function loadComplete(event:Event):void
		{
			trace("Load Complete");
			dispatchEvent(new WebkitEvent(WebkitEvent.TAB_LOAD_COMPLETE));
		}
		
		private function loadError(event:Event):void
		{
			trace("Load error");
			dispatchEvent(new WebkitEvent(WebkitEvent.TAB_LOAD_ERROR));
		}
		
		private function locationChanged(event:ExtendedLocationChangeEvent):void
		{
			trace("Location Changed");
		}
		
		private function locationChanging(event:ExtendedLocationChangeEvent):void
		{
			trace("QNX Location Changing");
			var config : ConfigData = ConfigData.getInstance();
			var access : Access = config.getAccessByUrl(event.location);
			if (access==null && event.location!="about:blank" && !config.getProperty(ConfigConstants.HASMULTIACCESS))
			{
				event.preventDefault();
				trace(event.location + "not allowed");
				Utilities.alert(event.location + " is not allowed", webView);
			}
			else
				dispatchEvent(new WebkitEvent(WebkitEvent.TAB_LOCATION_CHANGING,event));		
		}
		
		private function domInitialized(event:WebViewEvent):void
		{
			trace("dom initialize event");
			dispatchEvent(new WebkitEvent(WebkitEvent.TAB_DOMINITIALIZE, event));
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
		
		public function setCustomHeader(h : String):void
		{
			trace("Custom HTTP Headers");
			var chttp:Dictionary = new Dictionary();
			chttp["Date"] = "Thurs, 23 December 2010 12:00:00 GMT-5";
			chttp["Server"] = "";
			chttp["Last-Modified"] = "";
			chttp["Content-Length"] = "";
			chttp["Content-Type"] = "";
			webView.customHTTPHeaders(chttp);
			
		}
	}
}
