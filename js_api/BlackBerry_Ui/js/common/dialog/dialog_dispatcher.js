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

	var MINI_BROKER_LOCATION = "blackberry/ui/dialog";
	
	var CUSTOM_ASK = "customAsk";
	var STANDARD_ASK = "standardAsk";
	
	var DIALOG_SIZES = ['small','full','large','medium','tall'];
	var DIALOG_LOCS = ['bottomCenter','middleCenter','topCenter'];
	
	var ARGS_MESSAGE = "message";
	var ARGS_BUTTONS = "buttons";
	var ARGS_NUMBER = "number";
	var ARGS_SETTINGS = "settings";
	
	var SETTNGS_LENGTH = 3;
	
	var ONCLICKHANDLERID = "onClickHandlerId";
	
	
	if(!this.blackberry) {
		return; //nothing to dispatch
	}
	
	if(!this.blackberry.ui) {
		this.blackberry.ui = {};
	}	
	
	function validateParametersExist(message, buttons) {
		if(!message) {
			throw new Error("Required argument missing: message.");
		}
		
		if(!buttons) {
			throw new Error("Required argument missing: buttons[].");
		}
	}
	
	function validateSettingsArray(settings) {
	
		var i= 0;
		
		if(settings.length != SETTNGS_LENGTH){
			throw new Error("Settings argument length should be" + SETTINGS_LENGTH);
		}

		for (i=0; i<DIALOG_SIZES.length; i++){
			if (settings[1] == DIALOG_SIZES[i]) {
			  break;
			}
		}

		if (i == (DIALOG_SIZES.length - 1)){
		    throw new Error("Size argument required once, at the second index");
		}

		for (i=0; i<DIALOG_LOCS.length; i++){
			if (settings[2] == DIALOG_LOC[i]) {
				break;
			}
		}

		if (i == (DIALOG_LOCS.length - 1)){
		    throw new Error("Location argument required once, at the third index");
		} 
	}
	
	function requestDialog(type, message, buttons, onClickHandler, settings) {
		validateParametersExist(message, buttons);
		
		var onClickHandlerId = blackberry.events.registerEventHandler("onClick", onClickHandler);
		
		var url = MINI_BROKER_LOCATION + "/" + type;
						
		var recall = new blackberry.transport.RemoteFunctionCall(url);
		
	    recall.addParam(ARGS_MESSAGE, message);
				
		if(type == "customAsk"){
			recall.addParam(ARGS_BUTTONS,buttons);
		}
		else {
			recall.addParam(ARGS_NUMBER,buttons);
		}
			
	    recall.addParam(ONCLICKHANDLERID, onClickHandlerId);

		if(settings) {
			validateSettingsArray(settings);
			recall.addParam(ARGS_SETTINGS, settings);
		}
				
	    return recall.makeAsyncCall();
		
	}
	
	this.blackberry.ui.dialog = {
		//Override the delegates for each namespace method
		dispatcher : {
		
			"customAsk" : function(message, buttons, onClickHandler, settings) {
				requestDialog(CUSTOM_ASK, message, buttons, onClickHandler, settings);
			},
			
			"standardAsk" : function(message, buttons, onClickHandler,settings) {
				requestDialog(STANDARD_ASK, message, buttons, onClickHandler, settings);
			}
		}
	};	
})();