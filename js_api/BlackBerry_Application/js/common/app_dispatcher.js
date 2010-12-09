(function () {
	var MINI_BROKER_LOCATION = SERVER_URL + "blackberry/app";
	if(!this.blackberry) {
		return; //nothing to dispatch
	}

	this.blackberry.app = {
		//Override the delegates for each namespace method
		dispatcher : {
			
			/*
			 * Dispatch the properties
			 */
			"author" : function() {
				
				return blackberry.transport.getTextValueSync(MINI_BROKER_LOCATION+ "/author");
			},
			"authorEmail" : function() {
				return blackberry.transport.getTextValueSync(MINI_BROKER_LOCATION+ "/authorEmail");
			},
			"authorURL" : function() {
				return blackberry.transport.getTextValueSync(MINI_BROKER_LOCATION+ "/authorURL");
			},
			"copyright" : function() {
				return blackberry.transport.getTextValueSync(MINI_BROKER_LOCATION+ "/copyright");
			},
			"description" : function() {
				return blackberry.transport.getTextValueSync(MINI_BROKER_LOCATION+ "/description");
			},
			"id" : function() {
				return blackberry.transport.getTextValueSync(MINI_BROKER_LOCATION+ "/id");
			},
			"isForeground" : function() {
				return blackberry.transport.getTextValueSync(MINI_BROKER_LOCATION+ "/isForeground");
			},
			"license" : function() {
				return blackberry.transport.getTextValueSync(MINI_BROKER_LOCATION+ "/license");
			},
			"licenseURL" : function() {
				return blackberry.transport.getTextValueSync(MINI_BROKER_LOCATION+ "/licenseURL");
			},
			"name" : function() {
				
				return blackberry.transport.getTextValueSync(MINI_BROKER_LOCATION+ "/name");
			},
			"version" : function() {
				return blackberry.transport.getTextValueSync(MINI_BROKER_LOCATION+ "/version");
			},
			
			/*
			 * Dispatch the functions
			 */
			"exit" : function() {
				return blackberry.transport.getTextValueSync(MINI_BROKER_LOCATION+ "/exit");
			},
			"requestBackground" : function() {
				return blackberry.transport.getTextValueSync(MINI_BROKER_LOCATION+ "/requestBackground");
			},
			"requestForeground" : function() {
				return blackberry.transport.getTextValueSync(MINI_BROKER_LOCATION+ "/requestForeground");
			},
			"setHomeScreenIcon" : function(uri, hover) {
				if(!hover) {
					hover = false;
				}
				return blackberry.transport.getTextValueSync(MINI_BROKER_LOCATION+ "/setHomeScreenIcon?uri=" + uri + "&hover=" + hover);
			},
			"setHomeScreenName" : function(text) {
				return blackberry.transport.getTextValueSync(MINI_BROKER_LOCATION+ "/setHomeScreenName?text=" + text);
			}
		}
	};	
})();