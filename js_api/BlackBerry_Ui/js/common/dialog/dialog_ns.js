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
	
	function Dialog(disp) {
		this.constructor.prototype.customAskAsync = function(message, buttons, onClickHandler, settings) { return disp.customAskAsync(message, buttons, onClickHandler, settings); };
		
		this.constructor.prototype.standardAskAsync = function(message, dialogType, onClickHandler, settings) { return disp.standardAskAsync(message, dialogType, onClickHandler, settings); };
	}
	
	Dialog.prototype.__defineGetter__("D_OK", function() { return 0; });
	Dialog.prototype.__defineGetter__("D_SAVE", function() { return 1; });
	Dialog.prototype.__defineGetter__("D_DELETE", function() { return 2; });
	Dialog.prototype.__defineGetter__("D_YES_NO", function() { return 3; });
	Dialog.prototype.__defineGetter__("D_OK_CANCEL", function() { return 4; });
	Dialog.prototype.__defineGetter__("BOTTOM", function() { return "bottomCenter"; });
	Dialog.prototype.__defineGetter__("CENTER", function() { return "middleCenter"; });
	Dialog.prototype.__defineGetter__("TOP", function() { return "topCenter"; });
	Dialog.prototype.__defineGetter__("SIZE_FULL", function() { return "full"; });
	Dialog.prototype.__defineGetter__("SIZE_LARGE", function() { return "large"; });
	Dialog.prototype.__defineGetter__("SIZE_MEDIUM", function() { return "medium"; });
	Dialog.prototype.__defineGetter__("SIZE_SMALL", function() { return "small"; });
	Dialog.prototype.__defineGetter__("SIZE_TALL", function() { return "tall"; });
	
	blackberry.Loader.javascriptLoaded("blackberry.ui.dialog", Dialog);
})();
