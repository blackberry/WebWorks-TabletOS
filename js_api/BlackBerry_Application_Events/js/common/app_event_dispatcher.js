(function () {
	var MINI_BROKER_LOCATION = SERVER_URL + "/app/events";
	
	if(!this.blackberry) {
		return; //nothing to dispatch
	}
	
	if(!this.blackberry.app) {
		this.blackberry.app = {};
	}	

	
	function addEvent(eventType, onClickHandler) {
		
		var onClickHandlerId = blackberry.events.registerEventHandler("onClick", onClickHandler);
		var url = MINI_BROKER_LOCATION+ "/" + eventType 
						+ "?callback=" + JSON.stringify(onClickHandlerId);

		
		getTextValueSync(url).value; //don't care about the return value
	}
	
	this.blackberry.app.events = {
		//Override the delegates for each namespace method
		dispatcher : {
			"onBackground" : function(onClickHandler) {
				addEvent("onBackground",onClickHandler);
			},
			
			"onForeground" : function(onClickHandler) {
				addEvent("onForeground",onClickHandler);
			}
		}
	};	
})();