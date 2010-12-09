/*Must be run after the namespace has been attached since it counts on the namespace being available to modify the prototype*/
(function () {
	var MINI_BROKER_LOCATION = SERVER_URL + "/UtilsBroker/Utilities/Utils";
	
	if(!this.blackberry) {
		return; //nothing to dispatch
	}

	if(this.blackberry.Utilities) {
		//Override the delegates for each namespace method
		var parent = this.blackberry.Utilities;
		
		if(parent.Utils) {
			parent.Utils.constructor.prototype.generateUniqueId = function() {
				var idJson = getTextValueSync(MINI_BROKER_LOCATION+ "/generateUniqueId");
				return parseInt(idJson.value, 16);
			};
		}
	}
	
})();
