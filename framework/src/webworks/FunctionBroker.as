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
package webworks
{
	import flash.events.EventDispatcher;
	import flash.events.IEventDispatcher;
	
	import qnx.events.JavaScriptCallbackEvent;
	import qnx.media.QNXStageWebView;
	
	import webworks.config.ConfigData;
	import webworks.errors.WebWorksError;
	import webworks.extension.IApiExtension;
	import webworks.util.DeviceURL;
	import webworks.webkit.WebkitEvent;
	
	
	/**
	 * apply the white list rules and delegate the XHR request to AS API 
	 * 
	*/
	public class FunctionBroker extends EventDispatcher
	{
		private var webView:QNXStageWebView;
		
		public function FunctionBroker(webview:QNXStageWebView, target:IEventDispatcher=null)
		{
			webView = webview;
			super(target);
		}		

		//handle the event fired by qnx.callExtensionMethod() from javascript
		//call API specified by the event data and return a JSON string
		public function handleJSMethodCall(event:JavaScriptCallbackEvent):String
		{
			return handleXHRRequest(event);
		}
		
		//parse the url, check the feature available and invoke the feature
		public function handleXHRRequest(obj:Object):String
		{	
			
			if ( webView == null )
				throw new WebWorksError(WebWorksError.SERVER_ERROR);
			
			var deviceUrl:String = null;			
			//Test if we have an Event or a string, otherwise return
			//This section is only for testing so that we only comment out as little code as possible to make it work.
			// In the final version this should only be called with an event
			if (obj is WebkitEvent)
			{
				deviceUrl = obj.data as String;				
			}
			else if ( obj is String)
			{
				deviceUrl = String(obj);
			}

			else if ( obj is JavaScriptCallbackEvent)
			{
				deviceUrl = obj.name;
			}
			
			var device:DeviceURL = new DeviceURL(deviceUrl);
			//var url:String = event.data as String;
			if ( deviceUrl == null || !device.isDeviceProtocol())
				throw new WebWorksError(WebWorksError.BAD_REQUEST);

			//validate the feature
			if ( ConfigData.getInstance().isFeatureAllowed(device.featureName, webView.location))
			{
				var extension:IApiExtension = ConfigData.getInstance().getExtension(device.featureName);
				if ( extension != null )
					return extension.invokeFunction(device.methodName, device.unescapedQuery);
				else								
					throw new WebWorksError(WebWorksError.NOT_IMPLEMENTED);				
			}
			else
			{			
				throw new WebWorksError(WebWorksError.FORBIDDEN);				
			}
		}	
	}	
}
