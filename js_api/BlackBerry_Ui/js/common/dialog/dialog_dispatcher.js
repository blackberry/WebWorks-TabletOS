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
	var DIALOG_API_URL = "blackberry/ui/dialog";
	
	var ARGS_MESSAGE = "message";
	var ARGS_BUTTONS = "buttons";
	var ARGS_TITLE = "title";
	var ARGS_SIZE = "size";
	var ARGS_POSITION = "position";
	
	var ARGS_ON_CLICK_HANDLER_ID = "onClickHandlerId";
	
	function getButtonsForDialogType(dialogType) {
		switch(dialogType) {
			case blackberry.ui.dialog.D_OK : return ["Ok"];
			case blackberry.ui.dialog.D_SAVE : return ["Save", "Discard"];
			case blackberry.ui.dialog.D_DELETE : return ["Delete", "Cancel"];
			case blackberry.ui.dialog.D_YES_NO : return ["Yes", "No"];
			case blackberry.ui.dialog.D_OK_CANCEL : return ["Ok", "Cancel"];
			default: throw new Error("Invalid dialog type: " + dialogType);
		}
	}
	
	function validateRequiredParameters(message, buttons) {
		if(!message) {
			throw new Error("Required argument missing: message.");
		}
		
		if(!buttons) {
			throw new Error("Required argument missing: buttons[].");
		}
		
		if(buttons.size == 0) {
			throw new Error("Dialog requires at least one button, " + buttons.size + " provided.");
		}
	}
	
	function generateCommaSeparatedButtonList(buttonArray) {
		var buttonList = "";
		for(var i = 0; i < buttonArray.length; i++) {
			if(i > 0) {
				buttonList += ",";
			}
			buttonList += buttonArray[i];
		}
		
		return buttonList;
	}
	
	function generateRequest(message, buttonList, onClickHandlerId, settings) {
		var remoteCall = new blackberry.transport.RemoteFunctionCall(DIALOG_API_URL + "/ask");
		remoteCall.addParam(ARGS_MESSAGE, message); 
		remoteCall.addParam(ARGS_BUTTONS, buttonList);
		remoteCall.addParam(ARGS_ON_CLICK_HANDLER_ID, onClickHandlerId);

		if(settings) {
			if(settings[ARGS_TITLE]) {
				remoteCall.addParam(ARGS_TITLE, settings[ARGS_TITLE]);
			}
			
			if(settings[ARGS_SIZE]) {
				remoteCall.addParam(ARGS_SIZE, settings[ARGS_SIZE]);
			}
			
			if(settings[ARGS_POSITION]) {
				remoteCall.addParam(ARGS_POSITION, settings[ARGS_POSITION]);
			}
		}
				
	    return remoteCall;
	}
	
	function requestDialog(message, buttons, onClickHandler, settings) {
		validateRequiredParameters(message, buttons);
		
		var onClickId = blackberry.events.registerEventHandler("onClick", onClickHandler);
		var buttonList = generateCommaSeparatedButtonList(buttons);
		
		return generateRequest(message, buttonList, onClickId, settings);
	}
	
	function DialogDispatcher() {
	}
	
	DialogDispatcher.prototype.customAsk = function(message, buttons, onClickHandler, settings) {
		requestDialog(message, buttons, onClickHandler, settings).makeAsyncCall();
	};
			
	DialogDispatcher.prototype.standardAsk = function(message, dialogType, onClickHandler, settings) {
		var buttons = getButtonsForDialogType(dialogType);
		requestDialog(message, buttons, onClickHandler, settings).makeAsyncCall();
	}

	blackberry.Loader.javascriptLoaded("blackberry.ui.dialog", DialogDispatcher);	
})();