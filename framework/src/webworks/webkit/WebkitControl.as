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
	import flash.display.Sprite;
	import flash.events.ErrorEvent;
	import flash.events.Event;
	import flash.events.LocationChangeEvent;
	import flash.geom.Rectangle;
	import flash.net.URLRequestHeader;
	import flash.utils.*;
	
	import qnx.display.IowWindow;
	import qnx.events.ExtendedLocationChangeEvent;
	import qnx.events.NetworkResourceRequestedEvent;
	import qnx.events.UnknownProtocolEvent;
	import qnx.events.WebViewEvent;
	import qnx.events.WindowObjectClearedEvent;
	import qnx.media.QNXStageWebView;
	
	import webworks.JavaScriptLoader;
	import webworks.access.Access;
	import webworks.config.ConfigConstants;
	import webworks.config.ConfigData;
	import webworks.util.Utilities;
	
	public class WebkitControl extends Sprite
	{
		private var _webView:QNXStageWebView;
        private var _creationID:Number;
        private var _uniqueID:String;
        private var _windowObj:IowWindow;
		private var _javascriptLoader:JavaScriptLoader;
		
		public function WebkitControl(creationID:Number) {
			_creationID = creationID;
			
			init({ 
				enableCrossSiteXHR : true,
				visible : true
			});
		}

		private function init(defaultWebviewSettings:Object):void {
			//Initialize JS loader
			_javascriptLoader = new JavaScriptLoader(this);
			
			//Create the webview with default settings
			_webView = createWebview(defaultWebviewSettings);

			// Enable/Disable WebInspector
			var debugEnabledConfig:Boolean = ConfigData.getInstance().getProperty(ConfigConstants.DEBUGENABLED);
			_webView.enableWebInspector = debugEnabledConfig;
			
			//Set custom headers
			var customHeaders:Vector.<URLRequestHeader> = createCustomHeaderVector();
			addWebviewCustomHeaders(customHeaders);
			
			//Add the event listeners
			addWebviewEventListeners();
		}
		
		private function createWebview(defaultSettings : Object):QNXStageWebView
		{
			var wv:QNXStageWebView = new QNXStageWebView();
			
			wv.stage = this.stage;
			wv.enableCrossSiteXHR = defaultSettings["enableCrossSiteXHR"];
			wv.visible = defaultSettings["visible"];
			
			return wv;
		}
		
		private function createCustomHeaderVector():Vector.<URLRequestHeader>
		{
			var customHeaders:Vector.<URLRequestHeader> = new Vector.<URLRequestHeader>();
			var customHeadersConfig:Object = ConfigData.getInstance().getProperty(ConfigConstants.CUSTOMHEADERS);
			for (var customName:String in customHeadersConfig) {
				customHeaders.push(new URLRequestHeader(customName, customHeadersConfig[customName]));
			}
			
			return customHeaders;
		}
		
		private function addWebviewCustomHeaders(customHeaders : Vector.<URLRequestHeader>):void 
		{
			if(customHeaders.length > 0) {
				_webView.customHTTPHeaders = customHeaders;
			}
		}
		
		private function addWebviewEventListeners():void
		{
			_webView.addEventListener(ErrorEvent.ERROR, loadError);
			_webView.addEventListener(Event.COMPLETE, loadComplete);
			
			_webView.addEventListener(LocationChangeEvent.LOCATION_CHANGING, locationChanging);
			_webView.addEventListener(LocationChangeEvent.LOCATION_CHANGE, locationChanged); 
			_webView.addEventListener(WebViewEvent.CREATED, htmlEventBrowserCreated);
			_webView.addEventListener(NetworkResourceRequestedEvent.NETWORK_RESOURCE_REQUESTED, networkResourceRequested);
			_webView.addEventListener(UnknownProtocolEvent.UNKNOWN_PROTOCOL, handleUnknownProtocol);
			_webView.addEventListener(WindowObjectClearedEvent.WINDOW_OBJECT_CLEARED, onJavaScriptWindowObjectCleared);
		}
		
		private function networkResourceRequested(event:NetworkResourceRequestedEvent):void
		{
			trace("networkResourceRequested: " + event.url);
			dispatchEvent(new WebkitEvent(WebkitEvent.TAB_NETWORKRESOURCEREQUESTED, event.url));
		}
		
		private function handleUnknownProtocol(event:UnknownProtocolEvent):void
		{
			trace("handleUnknownProtocol: " + event.url);
			dispatchEvent(new WebkitEvent(WebkitEvent.TAB_UNKNOWNPROTOCOL, event));
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
				Utilities.alert(event.location + " is not allowed", _webView);
			}
			else
				dispatchEvent(new WebkitEvent(WebkitEvent.TAB_LOCATION_CHANGING, event));		
		}
		               
        private function htmlEventBrowserCreated(event:WebViewEvent):void
        {
            trace("WEBKITCONTROL: " + event.type, _webView.windowUniqueId);
            _uniqueID = _webView.windowUniqueId;
            _windowObj = IowWindow.getExternalWindow(-1, _uniqueID);
            dispatchEvent(new WebkitEvent(event.type, { creationID:_creationID }));
        }
        
        private function htmlEventHandler( event:WebViewEvent ):void
        {
            trace("WEBKITCONTROL: " + event.type);
            dispatchEvent( new WebkitEvent(event.type ) );
        }
		
		public function go(address:String):void
		{
			trace("Go function called: " + address);
			_webView.loadURL(address);
		}
		
		public function setViewPort(newViewport:Rectangle):void {
			if (_webView != null) {
				_webView.viewPort=newViewport;
			}
		}
		
		public function executeJavaScript(js:String):void
		{
			_webView.executeJavaScript(js);
        }
		
		public function stop() : void 
		{
			_webView.stop();
		}
		
		public function get qnxWebView():QNXStageWebView
		{
			return _webView;
		}

		private function onJavaScriptWindowObjectCleared(event:WindowObjectClearedEvent):void{
			event.preventDefault();
			_javascriptLoader.registerJavaScript(_webView.location, event);
			trace("window object cleared event");
		}
	}
}
