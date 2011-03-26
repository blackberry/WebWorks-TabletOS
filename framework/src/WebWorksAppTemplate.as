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
package
{
	import flash.desktop.NativeApplication;
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.utils.*;
	
	import qnx.dialog.AlertDialog;
	import qnx.events.ExtendedLocationChangeEvent;
	import qnx.events.UnknownProtocolEvent;
	
	import webworks.FunctionBroker;
	import webworks.config.ConfigConstants;
	import webworks.config.ConfigData;
	import webworks.errors.HTTPErrorMapping;
	import webworks.extension.IApiExtension;
	import webworks.loadingScreen.LoadingScreen;
	import webworks.loadingScreen.Transitions;
	import webworks.webkit.WebkitControl;
	import webworks.webkit.WebkitEvent;
	

	[SWF(width="1024", height="600", frameRate="30", backgroundColor="#000000")]
	public class WebWorksAppTemplate extends Sprite
	{
		private static var LOCAL_PROTOCOL:String = "local:///";
		
		private var entryURL:String;
		private var webWindow:WebkitControl;
        private var errorDialog:AlertDialog;
		private var loadingScreen:LoadingScreen;
		private var transitions:Transitions;
 		private var broker:FunctionBroker;
		
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
			entryURL = ConfigData.getInstance().getProperty(ConfigConstants.CONTENT);
			NativeApplication.nativeApplication.addEventListener(Event.ACTIVATE, appActive);
			NativeApplication.nativeApplication.addEventListener(Event.DEACTIVATE, appBackground);
			appInitialized();
		}
		
		private function appActive(event:Event):void 
        {
			stage.frameRate = 30;
			webWindow.visible = true;
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
			ConfigData.getInstance().setProperty(ConfigConstants.ENV_WEBVIEW, webWindow.qnxWebView);
			ConfigData.getInstance().setProperty(ConfigConstants.ENV_APPLICATION, this);
			loadingScreen = new LoadingScreen(0,0, stage.stageWidth,stage.stageHeight);
			transitions = new Transitions(loadingScreen);
			broker = new FunctionBroker(webWindow.qnxWebView);
			registerExtensions(ConfigData.getInstance().properties);
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
            webWindow = new WebkitControl(creationID, 0, 0, stage.stageWidth,  stage.stageHeight);

			webWindow.addEventListener(WebkitEvent.TAB_LOAD_COMPLETE, tabLoadComplete);
			webWindow.addEventListener(WebkitEvent.TAB_LOAD_ERROR, webkitLoadError);
            webWindow.addEventListener(WebkitEvent.WEBVIEW_CREATED, webkitWindowReady);
 			webWindow.addEventListener(WebkitEvent.TAB_LOCATION_CHANGING, webkitLocationChanging);
			webWindow.addEventListener(WebkitEvent.TAB_LOCATION_CHANGED, webkitLocationChanged);
			webWindow.addEventListener(WebkitEvent.TAB_UNKNOWNPROTOCOL, handleUnknownProtocol)
 			addChild(webWindow);
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
				returnedBody = broker.handleXHRRequest(upe.url).toString();
				webWindow.qnxWebView.notifyResourceOpened(sid, HTTPErrorMapping.getSuccessCode(), HTTPErrorMapping.getSuccessMessage());
			}
			
			catch (e:Error) {
				var httpError:HTTPErrorMapping = new HTTPErrorMapping(e);
				webWindow.qnxWebView.notifyResourceOpened(sid,httpError.code, httpError.message);
			}
			
			var byteData:ByteArray;
			byteData = new ByteArray();
			byteData.writeUTFBytes(returnedBody);

			webWindow.qnxWebView.notifyResourceHeaderReceived(sid, "Content-Type", "text/plain");
			webWindow.qnxWebView.notifyResourceHeaderReceived(sid, "Content-Length", byteData.length.toString());
			webWindow.qnxWebView.notifyResourceDataReceived(sid, byteData);
			
			webWindow.qnxWebView.notifyResourceDone(sid);
		}
			
		private function tabLoadComplete(event:WebkitEvent):void 
        {
			trace("HTML LOAD DONE");
		}

		private function webkitWindowReady(event:WebkitEvent):void 
        {
			loadURL(entryURL);
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
			if (url.search(webWindow.qnxWebView.originalLocation) < 0 && loadingScreen.isLoadingScreenRequired(url))
			{
				loadingScreen.show(url);
			}

			if (loadingScreen.firstLaunchFlag) 
			{
				loadingScreen.clearFirstLaunchFlag();
			}
		}
		
		private function webkitLocationChanged(event:WebkitEvent):void 
		{
			trace("webkitLocationChanged event");
			loadingScreen.hideIfNecessary();
		}
			
		public function loadURL(url:String):void 
        {
			if (url.indexOf(":") < 0) {
				url = LOCAL_PROTOCOL + url;
			}
			
			if (loadingScreen.showOnFirstLaunch) {
				loadingScreen.show(url);
			}
			webWindow.go(url);
		}
		
		public function get transitionEffect():Transitions
		{
			return transitions;
		}
	}
}