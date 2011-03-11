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
(function () {
	
	var INVOKE_API_URL = "blackberry/invoke";
	var INVOKE_LOCATION = INVOKE_API_URL + "/invoke";
	
	var APP_TYPE = "appType";
	
	var APP_URL_CAMERA = "camera://";
	var APP_URL_CAMERA_VIDEO = "camera://video";
	var APP_URL_BROWSER = "http://";
	var APP_URL_MUSIC = "music://";
	var APP_URL_PHOTOS = "photos://";
	var APP_URL_VIDEOS = "videos://";
	var APP_URL_APPWROLD = "appworld://"


	var APP_TYPE_ERROR = "appType not supported";
	var APP_BROWSER_ERROR = "Protocol specified in the url is not supported.";
	
	function InvokeDispatcher() {
	}
			
	InvokeDispatcher.prototype.invoke = function(appType, args) {
		var uri = INVOKE_LOCATION;
		var remote = new blackberry.transport.RemoteFunctionCall(uri);
		
		switch(appType) {
			//Camera
			case 4:
				if(!args || args.view == 1)
					remote.addParam(APP_TYPE, APP_URL_CAMERA_VIDEO);						
				else
					remote.addParam(APP_TYPE,APP_URL_CAMERA);
				break;
				

			//Browser
			case 11:	
				
				if(!args){
					remote.addParam(APP_TYPE, APP_URL_BROWSER);
				}						
				else{
					//Only http:// works to launch the browser
					if(args.url.indexOf(APP_URL_BROWSER) != 0)
						throw APP_BROWSER_ERROR;								
					
					remote.addParam(APP_TYPE, args.url);							
				}
				
				break;
				
			//Music
			case 13:						
				remote.addParam(APP_TYPE, APP_URL_MUSIC);
				break;
			
			//Photos
			case 14:
				remote.addParam(APP_TYPE, APP_URL_PHOTOS);
				break;
			
			//Videos
			case 15:
				remote.addParam(APP_TYPE, APP_URL_VIDEOS);
				break;
			
			//AppWorld
			case 16:
				remote.addParam(APP_TYPE, APP_URL_APPWROLD);
				break;
			
			default:
				throw APP_TYPE_ERROR;
		}
		
		return remote.makeAsyncCall();
	}
	
	blackberry.Loader.javascriptLoaded("blackberry.invoke", InvokeDispatcher);
})();