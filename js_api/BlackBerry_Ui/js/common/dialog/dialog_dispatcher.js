(function () {
	var MINI_BROKER_LOCATION = SERVER_URL + "/ui/dialog";
	
	if(!this.blackberry) {
		return; //nothing to dispatch
	}
	
	if(!this.blackberry.ui) {
		this.blackberry.ui = {};
	}
	
	function validateParametersExist(message, choices, settings) {
		if(!message) {
			throw new Error("Required argument missing: message.");
		}
		
		if(!choices) {
			throw new Error("Required argument missing: choices[].");
		}
	}
	
	function requestDialog(dialogType, message, dialogOptions, settings, onClickHandler) {
		validateParametersExist(message, dialogOptions);
		
		var onClickHandlerId = blackberry.events.registerEventHandler("onClick", onClickHandler);
		var url = MINI_BROKER_LOCATION+ "/" + dialogType 
						+ "?message=" + JSON.stringify(message) 
						+ "&options=" + JSON.stringify(choices) 
						+ "onClickHandlerId=" + JSON.stringify(onClickHandlerId)
						+ "&settings=" + JSON.stringify(settings);
		
		getTextValueSync(url); //don't care about the return value
	}
	
	this.blackberry.ui.dialog = {
		//Override the delegates for each namespace method
		dispatcher : {
			"customAsk" : function(message, choices, settings, onClickHandler) {
				requestDialog("customAsk", message, choices, settings, onClickHandler);
			},
			
			"standardAsk" : function(message, dialogType, settings, onClickHandler) {
				requestDialog("standardAsk", message, choices, onClickHandler);
			}
		}
	};	
})();