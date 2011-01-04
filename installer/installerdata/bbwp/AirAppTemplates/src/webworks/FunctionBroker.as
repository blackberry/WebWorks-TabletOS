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
package webworks
{
	import flash.events.EventDispatcher;
	import flash.events.IEventDispatcher;
	
	import qnx.events.JavaScriptCallbackEvent;
	import qnx.media.QNXStageWebView;
	
	import webworks.config.ConfigConstants;
	import webworks.config.ConfigData;
	import webworks.errors.AccessError;
	import webworks.extension.IApiExtension;
	import webworks.util.DeviceURL;
	import webworks.util.Utilities;
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
			if ( event.name == null ) // event.methodName = device://host/featureid/methodname?par1=val...
				return null;
			var device:DeviceURL = new DeviceURL(event.name);
			
			if ( !device.isDeviceProtocol() )
				return null;

			//validate the feature
			if ( webView == null )
				return null;

			if ( ConfigData.getInstance().isFeatureAllowed(device.featureName, webView.location))
			{
				var extension:IApiExtension = ConfigData.getInstance().getExtension(device.featureName);
				if ( extension != null )
				{
					var obj:Object = extension.invokeFunction(device.methodName, device.query);
			    	return obj.toString();
				}
				else
				{
					Utilities.alert(device.featureName + " is not defined", webView);
					throw new AccessError("Access error:feature not defined",  0);
				}
			}
			else
			{
			    Utilities.alert(device.featureName + " is not allowed", webView);
			    return null;
			}
		}
		
		//parse the url, check the feature available and invoke the feature
		public function handleXHRRequest(obj:Object):Object
		{			
			if ( webView == null )
				return null;
			
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
			
			//var url:String = event.data as String;
			if ( deviceUrl == null )
				return null;
			var device:DeviceURL = new DeviceURL(deviceUrl);
			
			if ( !device.isDeviceProtocol() )
				return null;

			//validate the feature
			if ( ConfigData.getInstance().isFeatureAllowed(device.featureName, webView.location))
			{
				var extension:IApiExtension = ConfigData.getInstance().getExtension(device.featureName);
				if ( extension != null )
					return extension.invokeFunction(device.methodName, device.query);
				else
				{
					Utilities.alert(device.featureName + " is not defined!", webView);
					throw new AccessError("Access error:feature not defined",  0);
				}
			}
			else
			{
				Utilities.alert(device.featureName + " is not allowed!", webView);
				throw new AccessError("Access error: feature is not allowed", 1);
			}
		}
	}	
}
