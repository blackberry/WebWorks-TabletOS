onconnect = function(event) {
  var port = event.ports[0];
  port.onmessage = function(event) {
   
  
    if ( event.data == 'webworker_SharedWorker_Constructor_RelativeUrl_withName_Async')
        port.postMessage(name);
	else if (event.data == 'Attribute_self') { 
		
		/*
		this.postMessage ("typeof self: " + typeof self);
		this.postMessage ("self.location: " + typeof self.location);
		this.postMessage ("self.close: " + typeof self.close);
		this.postMessage ("self.name: " +  typeof self.name);
		this.postMessage ("self.applicationCache: " + typeof self.applicationCache);
		this.postMessage ("self.onerror: " + typeof self.onerror);
		this.postMessage ("self.onconnect: " + typeof self.onconnect);
        */ 
	
		
        if (typeof self  == 'object' && typeof self.location == 'object' && typeof self.close == 'function'  && typeof self.name =='string' && 
		   typeof self.onerror == 'function' && typeof self.onconnect == 'function' &&  typeof self.applicationCache == 'object') {
			// test Readonly 
			var preVal1 = self;
			self = 'temp';
			if (self == preVal1)
				port.postMessage('Pass');
			else
                port.postMessage('Failed, readonly attribute should not be changed');  			
		}	
		else
		    port.postMessage('Failed, self.applicationCache is undefined');
    }else if (event.data == 'Attribute_location') {   
        
		/*
		this.postMessage (typeof location);
		this.postMessage (location.href);
		this.postMessage (location.protocol);
		this.postMessage (location.pathname);
		this.postMessage (location.host);
		this.postMessage (location.hostname);
		this.postMessage (location.port);
		this.postMessage (location.search);
		this.postMessage (location.hash);
		*/
		if ((typeof location == "object" ) &&(location.href == testDomain + "/html5/WebWorkerAsync/sharedworker.js") 
		&& (location.protocol == "http:") && (location.pathname == "/html5/WebWorkerAsync/sharedworker.js") && (location.host == "atg05-yyz.rim.net")
		&&(location.hostname == "atg05-yyz.rim.net") && (location.port == "") && (location.search == "") && (location.hash == "")) {	
			// test Readonly 
			/*
			var preVal2 = location;
			location = 'temp';
			if (location == preVal2)
				port.postMessage('Pass');
			else
                port.postMessage('Failed, readonly attribute should not be changed');  			
			*/	
			port.postMessage('Pass');
		}
		else
		    port.postMessage('Failed, some properpies of location are not correct');  		
	}
    else if (event.data == 'onError')  
        throw 'An simulated error';  
    else if(event.data == 'name testing')
        port.postMessage(name);
	else if(event.data == 'name readOnly testing') {
	    var pre_Name = name;
		name = 'changed';
		if (name == pre_Name)
			port.postMessage('Pass');	
		else
		    port.postMessage('Failed');
	}
	else if(event.data == 'ApplicationCache testing') {
		if (this.applicationCache)  
			port.postMessage('Pass');	
		else
		    port.postMessage('Failed. applicationCache is undefined');
	}
    else
        port.postMessage(event.data); // not event.ports[0].postMessage!
    
  }
}

onerror = function(event) {
}
