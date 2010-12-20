(function () {
	var MINI_BROKER_LOCATION = "blackberry/system/event";
	
	if(!this.blackberry) {
		return; //nothing to dispatch
	}
	
	if(!this.blackberry.system) {
		this.blackberry.system = {};
	}	

	
	function addEvent(eventType, onClickHandler) {
		
		var onClickHandlerId = blackberry.events.registerEventHandler("onClick", onClickHandler);
		
		var request = new blackberry.transport.RemoteFunctionCall(MINI_BROKER_LOCATION + "/" +  eventType); //don't care about the return value
		request.addParam("callback",onClickHandlerId);
		request.makeSyncCall();
	}
	
	
	
	this.blackberry.system.event = {
		//Override the delegates for each namespace method
		dispatcher : {
			"deviceBatteryLevelChange" : function(onClickHandler) {
				addEvent("deviceBatteryLevelChange",onClickHandler);
			},
			
			"deviceBatteryStateChange" : function(onClickHandler) {
				addEvent("deviceBatteryStateChange",onClickHandler);
			}
		}
	};	
})();