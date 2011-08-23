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
package
{
	import flash.desktop.NativeApplication;
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.events.StageOrientationEvent;
	import flash.geom.Rectangle;
	import flash.utils.*;
	
	import json.JSON;
	
	import qnx.dialog.AlertDialog;
	import qnx.events.ExtendedLocationChangeEvent;
	import qnx.events.JavaScriptCallbackEvent;
	import qnx.events.UnknownProtocolEvent;
	
	import webworks.FunctionBroker;
	import webworks.config.ConfigConstants;
	import webworks.config.ConfigData;
	import webworks.errors.HTTPErrorMapping;
	import webworks.extension.IApiExtension;
	import webworks.extension.WebWorksReturnValue;
	import webworks.loadingScreen.LoadingScreen;
	import webworks.loadingScreen.Transitions;
	import webworks.service.ServiceManager;
	import webworks.webkit.WebkitControl;
	import webworks.webkit.WebkitEvent;

	[SWF(width="1024", height="600", frameRate="30", backgroundColor="#000000")]
	public class WebWorksAppTemplate extends Sprite
	{
		private static var LOCAL_PROTOCOL:String = "local:///";
		
		private var _entryURL:String;
		private var _webWindow:WebkitControl;
        private var _errorDialog:AlertDialog;
		private var _loadingScreen:LoadingScreen;
		private var _transitions:Transitions;
 		private var _broker:FunctionBroker;
		private var _serviceManager:ServiceManager;
		
		public function WebWorksAppTemplate() 
        {			
			if (stage) {
				init();
			} else {
				addEventListener(Event.ADDED_TO_STAGE, init);
			}
		}
		
		private function init(e:Event = null):void 
        {
			removeEventListener(Event.ADDED_TO_STAGE, init);
			stage.addEventListener(StageOrientationEvent.ORIENTATION_CHANGE, onOrientationChange); 
			_entryURL = ConfigData.getInstance().getProperty(ConfigConstants.CONTENT);
			NativeApplication.nativeApplication.addEventListener(Event.ACTIVATE, appActive);
			NativeApplication.nativeApplication.addEventListener(Event.DEACTIVATE, appBackground);
			appInitialized();
		}
		
		private function appActive(event:Event):void 
        {
			stage.frameRate = 30;
			_webWindow.visible = true;
			trace("Increased Framerate to " + stage.frameRate + " | " + event);
		}
		
		private function appBackground(event:Event):void 
        {
			stage.frameRate = 2;
			trace("Reduced Framerate to " + stage.frameRate + " | " + event);
		}
		
		private function appInitialized():void 
        {
			setupStage();
			setupWebkit();
			
			ConfigData.getInstance().setProperty(ConfigConstants.ENV_WEBVIEW, _webWindow.qnxWebView);
			ConfigData.getInstance().setProperty(ConfigConstants.ENV_APPLICATION, this);
               
            _loadingScreen = new LoadingScreen(0,0, stage.stageWidth,stage.stageHeight);
			_transitions = new Transitions(_loadingScreen, _webWindow.viewPort);
			_serviceManager = new ServiceManager(_webWindow);
			_broker = new FunctionBroker(_webWindow.qnxWebView, _serviceManager);
			
			var configProperties:Dictionary = ConfigData.getInstance().properties;
			configProperties["serviceManager"] = _serviceManager;
			
			registerExtensions(configProperties);
		}
		
		private function registerExtensions(env:Dictionary):void
		{
			var widgetExtensions:Array = ConfigData.getInstance().getProperty(ConfigConstants.WIDGETEXTENSIONS);
			for(var key:String in widgetExtensions)
			{
				var extension:IApiExtension = widgetExtensions[key][ConfigConstants.ENTRYCLASS] as IApiExtension;
				if (extension != null)
				{
					extension.register(env);
				}
			}			
		}
        
 		private function setupStage():void 
        {
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.stageFocusRect = false;
			stage.align = StageAlign.TOP_LEFT;
		}
		
		private function setupWebkit():void 
        {
            var creationID:Number = int(Math.random() * 1000000) + new Date().time;
            _webWindow = new WebkitControl(creationID, stage);
			_webWindow.setViewPort(new Rectangle(0, 0, stage.stageWidth,  stage.stageHeight));

			_webWindow.addEventListener(WebkitEvent.TAB_LOAD_COMPLETE, tabLoadComplete);
			_webWindow.addEventListener(WebkitEvent.TAB_LOAD_ERROR, webkitLoadError);
            _webWindow.addEventListener(WebkitEvent.WEBVIEW_CREATED, webkitWindowReady);
 			_webWindow.addEventListener(WebkitEvent.TAB_LOCATION_CHANGING, webkitLocationChanging);
			_webWindow.addEventListener(WebkitEvent.TAB_LOCATION_CHANGED, webkitLocationChanged);
			_webWindow.addEventListener(WebkitEvent.TAB_UNKNOWNPROTOCOL, handleUnknownProtocol);
			_webWindow.addEventListener(WebkitEvent.TAB_QNXCALLEXTENSION, handleQnxCallExtension);
 			addChild(_webWindow);
		}
		
		private function handleUnknownProtocol(event:WebkitEvent):void			
		{
			var upe:UnknownProtocolEvent = event.data as UnknownProtocolEvent;
			var requestUrl:String = upe.url;
			var sid:int = upe.streamId;
			
			// bypass "data:" protocol, somehow it fires the UnknownProtocolEvent for "data:" protocol
			if (requestUrl.indexOf("data:") == 0) {
				return;
			}			
			
			// hold the unknown protocol event
			upe.preventDefault();
			

			var returnedBody:String = "";
			
			try {
				returnedBody = _broker.handleXHRRequest(upe.url).toString();
				_webWindow.qnxWebView.notifyResourceOpened(sid, HTTPErrorMapping.getSuccessCode(), HTTPErrorMapping.getSuccessMessage());
			}
			
			catch (e:Error) {
				var httpError:HTTPErrorMapping = new HTTPErrorMapping(e);
				_webWindow.qnxWebView.notifyResourceOpened(sid,httpError.code, httpError.message);
			}
			
			var byteData:ByteArray;
			byteData = new ByteArray();
			byteData.writeUTFBytes(returnedBody);

			_webWindow.qnxWebView.notifyResourceHeaderReceived(sid, "Content-Type", "text/plain");
			_webWindow.qnxWebView.notifyResourceHeaderReceived(sid, "Content-Length", byteData.length.toString());
			_webWindow.qnxWebView.notifyResourceDataReceived(sid, byteData);
			
			_webWindow.qnxWebView.notifyResourceDone(sid);
		}
		
		private function handleQnxCallExtension(event:WebkitEvent):void
		{
			var jsce:JavaScriptCallbackEvent = event.data as JavaScriptCallbackEvent;
			var requestUrl:String = "";
			
			for each(var param:String in jsce.params){
				//rest of the parameters 
				requestUrl += param; 
			}
			
			var returnedBody:String = "";
			
			try {
				returnedBody = _broker.handleXHRRequest(requestUrl).toString();
			}
			catch (e:Error) {
				// Error code will always be -1 for now whichever error happens
				var errorReturn:WebWorksReturnValue = new WebWorksReturnValue({}, WebWorksReturnValue.RET_ERROR, e.message);
				returnedBody = errorReturn.json;
			}
			
			jsce.result = returnedBody;
		}
			
		private function tabLoadComplete(event:WebkitEvent):void 
        {
			trace("HTML LOAD DONE");
		}

		private function webkitWindowReady(event:WebkitEvent):void 
        {
			loadURL(_entryURL);
		}
        
 		private function webkitLoadError(event:WebkitEvent):void 
        {
			trace("webkitcontrol, load error happened.");
		} 
		
		private function webkitLocationChanging(event:WebkitEvent):void 
        {
			trace("webkitLocationChanging event");
			//register javascript
			var qnxEvent:ExtendedLocationChangeEvent = event.data as ExtendedLocationChangeEvent;
			if (qnxEvent == null)
			{
				return;
			}
			
			var url:String = qnxEvent.location; 
					
			// add loading screen only if the location changes
			if (url.search(_webWindow.qnxWebView.originalLocation) < 0 && _loadingScreen.isLoadingScreenRequired(url))
			{
				_loadingScreen.show(url);
			}

			if (_loadingScreen.firstLaunchFlag) 
			{
				_loadingScreen.clearFirstLaunchFlag();
			}
		}
		
		private function webkitLocationChanged(event:WebkitEvent):void 
		{
			trace("webkitLocationChanged event");
			_loadingScreen.hideIfNecessary();
		}

		private function onOrientationChange(event:StageOrientationEvent):void
		{
			if (_webWindow != null)
			{
                _webWindow.setViewPort(new Rectangle(0, 0, stage.stageWidth, stage.stageHeight));
				_transitions.setViewPort(new Rectangle(0, 0, stage.stageWidth, stage.stageHeight));
				_loadingScreen.setLoadingScreenArea(new Rectangle(0, 0, stage.stageWidth, stage.stageHeight));
			}
		}
		
		public function loadURL(url:String):void 
        {
			if (url.indexOf(":") < 0) {
				url = LOCAL_PROTOCOL + url;
			}
			
			if (_loadingScreen.showOnFirstLaunch) {
				_loadingScreen.show(url);
			}
			_webWindow.go(url);
		}
		
		public function get transitionEffect():Transitions
		{
			return _transitions;
		}
	}
}