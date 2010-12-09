(function () {
	//We will not attach ourselves if the blackberry namespace doesn't exist
	if(!this.blackberry) {
		return;
	}
	
	var bb = this.blackberry;
	
	if(!this.blackberry.app) {
		this.blackberry.app = {};
	}
	
	var events = this.blackberry.app.events;
	var disp = this.blackberry.app.events.dispatcher;
	
	events = {
		onBackground : disp.onBackground,
		
		onForeground : disp.onForeground
	};
	

})();
