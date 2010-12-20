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
	//We will not attach ourselves if the blackberry namespace doesn't exist
	if(!this.blackberry) {
		return;
	}	
	var bb = this.blackberry;
	var disp = this.blackberry.invoke.dispatcher;
	
	bb.invoke = {
		
		/*
		 * This function will launch another application 
		 */
		invoke : disp.invoke,
		
		/*
		 * Constructor for a new CameraArguments object.
		 * readwrite  property  Number   view
		 */
		CameraArguments : function() {
			this.view = 0;
		},
		
		/* Open Browser application on the BlackBerry PlayBook.
		 * @param url The desired url to bring up in the browser.
		 */
		BrowserArguments : function(url) {
			this.url = url;
		}
		
	};
	
	/*
	 * Define constants for appType
	 */
	bb.invoke.__defineGetter__("APP_ADDRESSBOOK", function() { return 0; });
	bb.invoke.__defineGetter__("APP_BLUETOOTH_CONFIG", function() { return 1; });
	bb.invoke.__defineGetter__("APP_CALCULATOR", function() { return 2; });
	bb.invoke.__defineGetter__("APP_CALENDAR", function() { return 3; });
	bb.invoke.__defineGetter__("APP_CAMERA", function() { return 4; });
	bb.invoke.__defineGetter__("APP_MAPS", function() { return 5; });
	bb.invoke.__defineGetter__("APP_MEMOPAD", function() { return 6; });
	bb.invoke.__defineGetter__("APP_MESSAGES", function() { return 7; });
	bb.invoke.__defineGetter__("APP_PHONE", function() { return 8; });
	bb.invoke.__defineGetter__("APP_SEARCH", function() { return 9; });
	bb.invoke.__defineGetter__("APP_TASKS", function() { return 10; });
	bb.invoke.__defineGetter__("APP_BROWSER", function() { return 11; });
	bb.invoke.__defineGetter__("APP_JAVA", function() { return 12; });
	bb.invoke.__defineGetter__("APP_MUSIC", function() { return 13; });
	bb.invoke.__defineGetter__("APP_PHOTOS", function() { return 14; });
	bb.invoke.__defineGetter__("APP_VIDEOS", function() { return 15; });
	bb.invoke.__defineGetter__("APP_APPWORLD", function() { return 16; });
	bb.invoke.__defineGetter__("APP_UPDATE", function() { return 17; });	
	
	/*
	 * Define constants for CameraArguments
	 */
	bb.invoke.CameraArguments.__defineGetter__("VIEW_CAMERA", function() { return 0; });	
	bb.invoke.CameraArguments.__defineGetter__("VIEW_RECORDER", function() { return 1; });	
	
	
	
})();
