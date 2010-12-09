(function () {
	if(!this.blackberry) {
		return;
	}
	
	var bb = this.blackberry;
	var disp = bb.events.dispatcher;
	
	function EventMap(){
		var handlers = [];
		
		this.getHandlerById = function(handlerId){
			return handlers[handlerId];
		};
		
		this.addHandler = function(handler){
			handlers.push(handler);
			return handlers.length - 1;
		};
		
		this.removeHandler = function(handlerId){
			if(handlerId > -1 && handlerId < handlers.length) {
				delete handlers[handlerId]; //cannot splice because all published IDs would refer to the wrong handler
			}
		};
		
	};
	
	bb.events = {
		eventsMap  : new EventMap(),
		
		sample : {
			registerNoParamEventHandler : function (callback) {
				var eventId = blackberry.events.eventsMap.addHandler(callback);
				disp.registerEvent(eventId);
			},
			
			registerParamEventHandler : function (callback) {
				var eventId = blackberry.events.eventsMap.addHandler(callback);
				disp.registerEvent(eventId, "parameterEvent");
			}
		}
	};
})();