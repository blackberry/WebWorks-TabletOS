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
})();
