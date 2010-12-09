(function () {
	
	var MINI_BROKER_LOCATION = "blackberry/invoke";
	var INVOKE_LOCATION = MINI_BROKER_LOCATION + "/invoke";
	
	var APP_TYPE = "appType";
	
	var APP_URL_CAMERA = "camera://";
	var APP_URL_CAMERA_VIDEO = "camera://video";
	var APP_URL_BROWSER = "http://";
	var APP_URL_MAP = "map://";
	var APP_URL_MUSIC = "music://";
	var APP_URL_PHOTOS = "photos://";
	var APP_URL_VIDEOS = "videos://";
	var APP_URL_APPWROLD = "appworld://"
	var APP_URL_UPDATE = "update://";

	var APP_TYPE_ERROR = "appType not supported";
	var APP_BROWSER_ERROR = "Protocol specified in the url is not supported."
	
	var 
	
	if(!this.blackberry) {
		return; //nothing to dispatch
	}

	this.blackberry.invoke = {
		//Override the delegates for each namespace method
		dispatcher : {
			
			/*
			 * Dispatch the properties
			 */
			 
			"invoke" : function(appType, args) {
				var uri = INVOKE_LOCATION;
				var recall = new blackberry.transport.RemoteFunctionCall(uri);
				
				switch(appType){
				
					
					//Camera
					case 4:
						
						
						
						if(!args || args.view == 1)
							recall.addParam(APP_TYPE, APP_URL_CAMERA_VIDEO);						
						else
							recall.addParam(APP_TYPE,APP_URL_CAMERA);
						break;
						
					//Maps
					case 5:
						recall.addParam(APP_TYPE,APP_URL_MAP);						
						break;
						
					//Browser
					case 11:	
						
						if(!args){
							recall.addParam(APP_TYPE, APP_URL_BROWSER);
						}						
						else{
							//Only http:// works to launch the browser
							if(args.url.indexOf(APP_URL_BROWSER) != 0)
								throw APP_BROWSER_ERROR;								
							
							recall.addParam(APP_TYPE, args.url);							
						}
						
						break;
						
					//Music
					case 13:						
						recall.addParam(APP_TYPE, APP_URL_MUSIC);
						break;
					
					//Photos
					case 14:
						recall.addParam(APP_TYPE, APP_URL_PHOTOS);
						break;
					
					//Videos
					case 15:
						recall.addParam(APP_TYPE, APP_URL_VIDEOS);
						break;
					
					//AppWorld
					case 16:
						recall.addParam(APP_TYPE, APP_URL_APPWROLD);
						break;
					
					//Update
					case 17:
						recall.addParam(APP_TYPE, APP_URL_UPDATE);
						break;
						
					default:
						throw APP_TYPE_ERROR;
				}
				return recall.makeSyncCall();
			}			
			
			
			
		}
	};	
})();