self.onmessage = function(event){
//onmessage = function(event){  

  
	if (event.data == 'onError') {
        throw 'An simulated error';
    } else if (event.data == 'Attribute_self') {   
        if (typeof self  == 'object' && typeof self.location == 'object' && typeof self.close == 'function'  && 
		   typeof self.onmessage == 'function' && typeof self.onerror == 'function' && typeof self.postMessage == 'function') {
		
			// test Readonly 
			var preVal1 = self;
			self = 'temp';
			if (self == preVal1)
				this.postMessage('Pass');
			else
                this.postMessage('Failed, readonly attribute should not be changed');  			
		}	
		else
		    this.postMessage('Failed, self.onerror is undefined');
    } else if (event.data == 'Attribute_location') {   
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
		// Note this test case may vary on different server
		if ((typeof location == "object" ) &&(location.href == testDomain + "/html5/WebWorkerAsync/worker.js") 
		&& (location.protocol == "http:") && (location.pathname == "/html5/WebWorkerAsync/worker.js") && (location.host == "atg05-yyz.rim.net")
		&&(location.hostname == "atg05-yyz.rim.net") && (location.port == "") && (location.search == "") && (location.hash == "") ) {	
			// test Readonly 
			/*
			var preVal2 = location;
			location = 'temp';
			if (location == preVal2)
				this.postMessage('Pass');
			else
                this.postMessage('Failed, readonly attribute should not be changed');  			
		    */
			this.postMessage('Pass');
		}
		else
		    this.postMessage('Failed, some properpies of location are not correct');   
    } else { //send message back to the page
        this.postMessage(event.data);
    }
};

onerror = function(event) {
}

