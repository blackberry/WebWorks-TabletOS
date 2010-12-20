(function () {
	//We will not attach ourselves if the blackberry namespace doesn't exist
	if(!this.blackberry) {
		return;
	}
	
	var bb = this.blackberry;
	
	if(!this.blackberry.system) {
		this.blackberry.system = {};
	}
	
	var event = this.blackberry.system.event;
	var disp = this.blackberry.system.event.dispatcher;
	
	this.blackberry.system.event = {
		deviceBatteryLevelChange : disp.deviceBatteryLevelChange,
		
		deviceBatteryStateChange : disp.deviceBatteryStateChange
	};
	

})();
