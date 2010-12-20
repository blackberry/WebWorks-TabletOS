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
	
	if(!this.blackberry.ui) {
		this.blackberry.ui = {};
	}
	
	var dialog = this.blackberry.ui.dialog;
	var disp = this.blackberry.ui.dialog.dispatcher;
	
	blackberry.ui.dialog = {
		customAsk : disp.customAsk,
		
		standardAsk : disp.standardAsk
	};
	
	blackberry.ui.dialog.__defineGetter__("D_OK", function() { return 0; });
	blackberry.ui.dialog.__defineGetter__("D_SAVE", function() { return 1; });
	blackberry.ui.dialog.__defineGetter__("D_DELETE", function() { return 2; });
	blackberry.ui.dialog.__defineGetter__("D_YES_NO", function() { return 3; });
	blackberry.ui.dialog.__defineGetter__("D_OK_CANCEL", function() { return 4; });
    blackberry.ui.dialog.__defineGetter__("BOTTOM", function() { return "bottomCenter"; });
	blackberry.ui.dialog.__defineGetter__("CENTER", function() { return "middleCenter"; });
	blackberry.ui.dialog.__defineGetter__("TOP", function() { return "topCenter"; });
	blackberry.ui.dialog.__defineGetter__("SIZE_FULL", function() { return "full"; });
	blackberry.ui.dialog.__defineGetter__("SIZE_LARGE", function() { return "large"; });
	blackberry.ui.dialog.__defineGetter__("SIZE_MEDIUM", function() { return "medium"; });
	blackberry.ui.dialog.__defineGetter__("SIZE_SMALL", function() { return "small"; });
	blackberry.ui.dialog.__defineGetter__("SIZE_TALL", function() { return "tall"; });
})();
