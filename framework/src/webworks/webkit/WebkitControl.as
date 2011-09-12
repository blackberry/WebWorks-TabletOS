/*
* Copyright 2010-2011 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
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
	import flash.display.Stage;
	import flash.events.ErrorEvent;
	import flash.events.Event;
	import flash.events.LocationChangeEvent;
	import flash.filesystem.*;
	import flash.geom.Rectangle;
	import flash.net.URLRequestHeader;
	import flash.sensors.Geolocation;
	import flash.utils.*;
	
	import qnx.display.IowWindow;
	import qnx.events.ExtendedLocationChangeEvent;
	import qnx.events.JavaScriptCallbackEvent;
	import qnx.events.NetworkResourceRequestedEvent;
	import qnx.events.UnknownProtocolEvent;
	import qnx.events.WebViewEvent;
	import qnx.events.WindowObjectClearedEvent;
	import qnx.fullscreen.FullscreenClient;
	import qnx.media.QNXStageWebView;
	
	import webworks.JavaScriptLoader;
	import webworks.access.Access;
	import webworks.config.ConfigConstants;
	import webworks.config.ConfigData;
	import webworks.fullScreenView.FullScreenView;
	import webworks.uri.URI;
	import webworks.util.Utilities;
	
	public class WebkitControl extends Sprite
	{
		private var _webView:QNXStageWebView;
        private var _creationID:Number;
        private var _uniqueID:String;
        private var _windowObj:IowWindow;
		private var _javascriptLoader:JavaScriptLoader;
		private var _fsView:FullScreenView;
		
		public function WebkitControl(creationID:Number, appStage:Stage) {
			_creationID = creationID;
		
			//Initialize JS loader
			_javascriptLoader = new JavaScriptLoader(this);
			
			//The object passed to createWebview will be iterated over and 
			//the settings will be applied as-is to the WebView. Make sure their names
			//match what the QNXStageWebView supports.
			var defaultSettings:Object = {
				
				enableResourceFiltering : true,
				
				enableCrossSiteXHR : true,
				
				enableGeolocation : !(new Geolocation().muted),
				
				// Enable/Disable WebInspector
				enableWebInspector : ConfigData.getInstance().getProperty(ConfigConstants.DEBUGENABLED),
				
				stage : appStage
				
			}

			//Add all the events that we will register to the QNXStageWebView.
			var events:Dictionary = new Dictionary();
			events[ErrorEvent.ERROR] = loadError;
			events[Event.COMPLETE] = loadComplete;
			events[LocationChangeEvent.LOCATION_CHANGING] = locationChanging;
			events[LocationChangeEvent.LOCATION_CHANGE] = locationChanged;
			events[WebViewEvent.CREATED] = htmlEventBrowserCreated;
			events[NetworkResourceRequestedEvent.NETWORK_RESOURCE_REQUESTED] = networkResourceRequested;
			events[WindowObjectClearedEvent.WINDOW_OBJECT_CLEARED] = onJavaScriptWindowObjectCleared;
			events[JavaScriptCallbackEvent.JAVA_SCRIPT_CALLBACK] = onJavaScriptCallbackEvent;
			
			//Create the webview with our default settings and register the events we need
			_webView = createWebview(defaultSettings, events);
			
			_fsView = new FullScreenView(fullscreenClientGet() );
  			_fsView.addEventListener(WebkitEvent.FULL_SCREEN_ENTER, addFullScreenView);
  			_fsView.addEventListener(WebkitEvent.FULL_SCREEN_EXIT, onExitFullScreenView);
		}
		
		private function createWebview(defaultSettings:Object, events:Dictionary):QNXStageWebView
		{
			var wv:QNXStageWebView = new QNXStageWebView();
			
			//Apply default properties
			for(var webViewProp:String in defaultSettings) {
				trace("Applying QNXStageWebView property: " + webViewProp + " = " + defaultSettings[webViewProp]);
				wv[webViewProp] = defaultSettings[webViewProp];
			}
			
			//Set custom headers
			var customHeaders:Vector.<URLRequestHeader> = createCustomHeaderVector();
			if(customHeaders.length > 0) {
				wv.customHTTPHeaders = customHeaders;
			}
			
			//Add the event listeners
			for(var event:String in events) {
				wv.addEventListener(event, events[event]);
			}
			
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
		
		private function onJavaScriptCallbackEvent(event:JavaScriptCallbackEvent):void{ 
			trace("JavaScriptCallbackEvent: " + event.name);
			
			if (event.name.toLowerCase() != "webworks") {
				return;
			}
			
			dispatchEvent(new WebkitEvent(WebkitEvent.TAB_QNXCALLEXTENSION, event));			
		}
		
		private function networkResourceRequested(event:NetworkResourceRequestedEvent):void
		{
			trace("networkResourceRequested: (" + event.action + ") " + event.url);
			dispatchEvent(new WebkitEvent(WebkitEvent.TAB_NETWORKRESOURCEREQUESTED, event));
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
			{
				var requestURI:URI  = new URI(event.location);
				var geolocation:Geolocation = new Geolocation();
				var file:File = File.applicationDirectory;
				trace(file.toString());
				if (!geolocation.muted)
				{
					var baseUrl:String;
					if (requestURI.scheme == "http")
					{
						baseUrl = requestURI.scheme + "://" + requestURI.authority;
					}
					else
						if (requestURI.scheme == "local")
						{
							baseUrl = requestURI.scheme + "://";
						}
					else
						if (requestURI.scheme == "file")
						{
							baseUrl = requestURI.scheme + "://";
						}					
					_webView.updateGeolocationFilter(baseUrl,true);
				}
				dispatchEvent(new WebkitEvent(WebkitEvent.TAB_LOCATION_CHANGING, event));
			}
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
		
		public function get viewPort():Rectangle
		{
			return _webView.viewPort;
		}

		private function onJavaScriptWindowObjectCleared(event:WindowObjectClearedEvent):void{
			event.preventDefault();
			_javascriptLoader.registerJavaScript(_webView.location, event);
			trace("window object cleared event");
		}
		
  		private function fullscreenClientGet():FullscreenClient
  		{
  			return _webView.fullscreenClientGet();
  		}
  	
  		private function addFullScreenView(event:WebkitEvent):void
  		{
  			addChild(_fsView);
  			_webView.zOrder = -1;
  		}
  		
  		private function onExitFullScreenView(event:WebkitEvent): void
  		{
  			_webView.zOrder = 0;
 		}
	}
}
