(function () {
	var MINI_BROKER_LOCATION = SERVER_URL + "/SystemBroker";
	
	if(!this.blackberry) {
		return; //nothing to dispatch
	}

	this.blackberry.system = {
		//Override the delegates for each namespace method
		dispatcher : {
			"model" : function() {
				return getTextValueSync(MINI_BROKER_LOCATION+ "/model");
			},
			"scriptApiVersion" : function() {
				return getTextValueSync(MINI_BROKER_LOCATION+ "/scriptApiVersion");
			},
			"softwareVersion" : function() {
				return getTextValueSync(MINI_BROKER_LOCATION+ "/softwareVersion");
			},
			"hasCapability" : function(capability) {
				return getTextValueSync(MINI_BROKER_LOCATION+ "/hasCapability?capability=" + capability);
			},
			"hasDataCoverage" : function() {
				return getTextValueSync(MINI_BROKER_LOCATION+ "/hasDataCoverage");
			},
			"hasPermission" : function(module) {
				return getTextValueSync(MINI_BROKER_LOCATION+ "/hasPermission?module=" + module);
			},
			"isMassStorageActive" : function() {
				return getTextValueSync(MINI_BROKER_LOCATION+ "/isMassStorageActive");
			},
			"setHomeScreenBackground" : function(filePath) {
				return getTextValueSync(MINI_BROKER_LOCATION+ "/setHomeScreenBackground?filePath" + filePath);
			}
		}
	};	
})();