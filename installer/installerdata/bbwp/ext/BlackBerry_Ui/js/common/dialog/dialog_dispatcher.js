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

	var DIALOG_URL = "blackberry/ui/dialog";
	
	var CUSTOM_ASK = "customAsk";
	var STANDARD_ASK = "standardAsk";
	
	var ARGS_MESSAGE = "message";
	var ARGS_BUTTONS = "buttons";
	var ARGS_DIALOG_TYPE = "type";
	
	var ON_CLICK_HANDLER_ID = "onClickHandlerId";
	
	
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
	
	function requestDialog(type, message, buttons, onClickHandler, settings) {
		var onClickId = blackberry.events.registerEventHandler("onClick", onClickHandler);
		
		var remoteCall = new blackberry.transport.RemoteFunctionCall(DIALOG_URL + "/" + type);
		
	    remoteCall.addParam(ARGS_MESSAGE, message);
				
		if(type == "customAsk"){
			validateParametersExist(message, buttons);
			
			var buttonList = "";
			for(var i = 0; i < buttons.length; i++) {
				if(i > 0) {
					buttonList += ",";
				}
				buttonList += buttons[i];
			}
			remoteCall.addParam(ARGS_BUTTONS,buttonList);
		}
		else {
			remoteCall.addParam(ARGS_DIALOG_TYPE,buttons);
		}
			
	    remoteCall.addParam(ON_CLICK_HANDLER_ID, onClickId);

		if(settings) {
			//Temporarily add the known settings in pre-defined order. If they are not defined, add them as empty to preserve ordering
			remoteCall.addParam("title", settings["title"] ? settings["title"] : "");
			
			remoteCall.addParam("size", settings["size"] ? settings["size"] : "");
			
			remoteCall.addParam("position", settings["position"] ? settings["position"] : "");
		}
				
	    return remoteCall.makeAsyncCall();	
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