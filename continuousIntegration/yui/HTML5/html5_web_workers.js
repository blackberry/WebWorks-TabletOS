(function() {               
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	var workerScript = 'html5/WebWorkerAsync/worker.js';
    var sharedWorkerScript = 'html5/WebWorkerAsync/sharedworker.js';
    var workerSyncScript = 'html5/WebWorkerSync/worker.js';
    var resultFromTest = false;
    
    var testDomain = 'http://10.137.42.57/YUI/HTML5/';//http://10.137.42.57/YUI/index.htm
    
    var eWorkers = {"eRegWorker" : 0, "eShrdWorker" : 1,"eTmpWorker" : 2,"eNamedSharedWorker" : 3};
    var workerArray = new Array(4);
    var sharedworkerName = 'sharedwork1';
    workerArray[eWorkers.eRegWorker] = new Worker(workerScript); 
    workerArray[eWorkers.eShrdWorker] = new SharedWorker(sharedWorkerScript);
	workerArray[eWorkers.eNamedSharedWorker] = new SharedWorker(sharedWorkerScript,sharedworkerName);
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		
		testCases["suiteName"] = "HTML5 Web Workers Tests";
		
		//---------------------------------------------------------------------
		// Web Workers tests
		//---------------------------------------------------------------------			

    testCases[0] = new Y.Test.Case({
			name: "HTML5 Web Worker Asynchronous Tests",

			setUp : function () {
			
			
			},
			 
			tearDown : function () {
				//Teardown code goes here
		
				
			},
			
			//3 webworker_DedicatedWorker_createFromUrl_Absolute_DiffOrigin_Async_Negative	
			"webWorkers create dedicatedWorker from absolute path different origin should fail properly" : function(){
			resultFromTest = false;//always initialize to false
			var test = this;
			//URL OK
    
            try{
                
		        workerArray[eWorkers.eTmpWorker] = new Worker('http://10.135.205.24/HTML5Test/worker.js');
		        throw new Error('Security Error should be thrown out when creating a working from different origin');
	           } 
	        catch (err){
		           
		            resultFromTest = (err.toString() == 'Error: SECURITY_ERR: DOM Exception 18');
		            Assert.isTrue(resultFromTest);
	            }            
 			},
 			
			"webWorkers create dedicatedWorker from relative path should work" : function() {
			//1 webworker_DedicatedWorker_createFromUrl_Relative_Async
		    
		    resultFromTest = false;//always initialize to false
            var passData = 'createWebWorkerFromUrl';
            var test = this;
            

            workerArray[eWorkers.eRegWorker].onmessage = function (event) { 
            resultFromTest = (event.data == passData); // should be true if test passed 
            test.resume(function (){Assert.isTrue(resultFromTest);});	
            }
            
                
            
            workerArray[eWorkers.eRegWorker].postMessage(passData);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker: webworker_DedicatedWorker_createFromUrl_Relative_Async fails!");	
					}, 3100);
			
			},
		
			"webWorkers create dedicatedWorker from absolute path same origin should work" : function(){
			//2 webworker_DedicatedWorker_createFromUrl_Absolute_SameOrigin_Async 
			resultFromTest = false;//always initialize to false
			var test = this;
			
			//NOTE !!!! IS THE URL CORRECT For Worker????
			//var worker1 = new Worker(testDomain+ '/WebWorkerAsync/worker.js');
            workerArray[eWorkers.eTmpWorker] = new Worker(testDomain+ '/WebWorkerAsync/worker.js');
            
            
            var passData = 'createWebWorkerFromUrl';
            workerArray[eWorkers.eTmpWorker].onmessage = function (event) { 
  
                resultFromTest = (event.data == passData); // should be true if test passed 
                //alert("Test Result 2:"+resultFromTest);
                workerArray[eWorkers.eTmpWorker].terminate();
                var relSta = delete workerArray[eWorkers.eTmpWorker];
                //alert("Delete returns " + relSta);               
                test.resume(function (){Assert.isTrue(resultFromTest);});	                             
            }
            
            workerArray[eWorkers.eTmpWorker].postMessage(passData);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker:webworker_DedicatedWorker_createFromUrl_Absolute_SameOrigin_Async fails!");
					}, 3100);								
			},
			
			
			
			
		    //4 webworker_DedicatedWorker_onerror_Async
			
			"webWorkers dedicatedWorker onError should work" : function(){
			 
			resultFromTest = false;//always initialize to false
			
			//NOTE !!!! IS THE URL CORRECT For Worker????
			
            var passErrorData = "onError";
            var test = this;
            
            workerArray[eWorkers.eRegWorker].onerror = function (event) { 
            
                resultFromTest = ((event.message != undefined) && (event.filename != undefined)
                && (event.lineno != undefined)); // should be true if test passed 
                test.resume(function (){Assert.isTrue(resultFromTest);});	
            }
           
            workerArray[eWorkers.eRegWorker].postMessage(passErrorData);
			test.wait(
					function(){
	
						Assert.fail("HTML5 Web Worker:webworker_DedicatedWorker_onerror_Async fails!");						
					}, 3100);								
			},
	
			//5 webworker_DedicatedWorker_onmessage_Async
			"webWorkers dedicatedWorker onMessage should work" : function() {
		    
		    resultFromTest = false;//always initialize to false
			
			var passData = 'onmessage testing';
			var test = this;
           
            
            workerArray[eWorkers.eRegWorker].onmessage = function (event) { 
            //alert(event.data);
                resultFromTest = ( event.data == passData); // should be true if test passed             
                test.resume(function (){Assert.isTrue(resultFromTest);});	     
            }
            
            workerArray[eWorkers.eRegWorker].postMessage(passData);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker: webworker_DedicatedWorker_onmessage_Async fails!");				    
					}, 3100);
			
			},
						
			//6 webworker_DedicatedWorker_postMessage_String_Async
			"webWorkers dedicatedWorker postMessage String should work" : function() {
				    
		    resultFromTest = false;//always initialize to false
			
            var passData = 'string';
            var test = this;
            
            workerArray[eWorkers.eRegWorker].onmessage = function (event) { 
            //alert(event.data);
                resultFromTest = ( event.data == passData); // should be true if test passed 
                test.resume(function (){Assert.isTrue(resultFromTest);});	            
            }
            
            workerArray[eWorkers.eRegWorker].postMessage(passData);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker: webworker_DedicatedWorker_postMessage_String_Async fails!");					    
					}, 3100);
			
			},
			
			
			
			//7 webworker_DedicatedWorker_postMessage_Number_Async
			"webWorkers dedicatedWorker postMessage Number should work" : function() {
			
		    resultFromTest = false;//always initialize to false
			
            var passData = 8888;
            var test = this;
            
            workerArray[eWorkers.eRegWorker].onmessage = function (event) { 
            
                resultFromTest = ( event.data == passData); // should be true if test passed 
           
                test.resume(function (){Assert.isTrue(resultFromTest);});	
 
            }
            
            workerArray[eWorkers.eRegWorker].postMessage(passData);
			test.wait(
					function(){
	//				    worker1.postMessage("STOP!");
						Assert.fail("HTML5 Web Worker: webworker_DedicatedWorker_postMessage_Number_Async fails!");				    
					}, 3100);
			
			},
			
			
			//8 "webworker_DedicatedWorker_postMessage_Boolean_Async"
			"webWorkers dedicatedWorker postMessage Boolean should work" : function() {
			
		    resultFromTest = false;//always initialize to false
			
            var passData = true;
            var test = this;
            
            workerArray[eWorkers.eRegWorker].onmessage = function (event) { 
            
                resultFromTest = ( event.data == passData); // should be true if test passed 

                test.resume(function (){Assert.isTrue(resultFromTest);});	
           
           
           
         
            }
             
            workerArray[eWorkers.eRegWorker].postMessage(passData);
			test.wait(
					function(){
					 //   worker1.postMessage("STOP!");
						Assert.fail("HTML5 Web Worker: webworker_DedicatedWorker_postMessage_Boolean_Async fails!");
					    
					}, 3100);
			
			},
			
			
			//9 "webworker_DedicatedWorker_postMessage_Null_Async";
			
			"webWorkers dedicatedWorker postMessage Null should work" : function() {
			
		    resultFromTest = false;//always initialize to false
			
            var passData = null;
            var test = this;
            
            workerArray[eWorkers.eRegWorker].onmessage = function (event) { 
            
               resultFromTest = ( event.data == passData); // should be true if test passed 
               test.resume(function (){Assert.isTrue(resultFromTest);});	
             
            }
            
            workerArray[eWorkers.eRegWorker].postMessage(passData);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker: webworker_DedicatedWorker_postMessage_Null_Async fails!");
					}, 3100);
			
			},
			
			
			
			
			//10 webworker_DedicatedWorker_postMessage_Undefined_Async
			"webWorkers dedicatedWorker postMessage Undefined should work" : function() {
			
		    resultFromTest = false;//always initialize to false
			
            var passData = undefined;
            var test = this;
            
            workerArray[eWorkers.eRegWorker].onmessage = function (event) { 
            
                resultFromTest = ( event.data == passData); // should be true if test passed 
                test.resume(function (){Assert.isTrue(resultFromTest);});	
            }
            
            workerArray[eWorkers.eRegWorker].postMessage(passData);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker: webworker_DedicatedWorker_postMessage_Undefined_Async fails!");
					}, 3100);
			
			},
			
			//11 webworker_DedicatedWorker_postMessage_Object_Async
			"webWorkers dedicatedWorker postMessage Object should work" : function() {
			
		    resultFromTest = false;//always initialize to false
			
            var passObject = new Object();
            passObject.strField = 'string';
            passObject.numField = 20;
            var test = this;    
            
            workerArray[eWorkers.eRegWorker].onmessage = function (event) { 
            
                resultFromTest = ((event.data.strField == passObject.strField) && (event.data.numField == passObject.numField)); // should be true if test passed 
                test.resume(function (){Assert.isTrue(resultFromTest);});	
            }
            
            workerArray[eWorkers.eRegWorker].postMessage(passObject);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker: webworker_DedicatedWorker_postMessage_Object_Async fails!");
					}, 3100);
			
			},
			
			
			
			//***************************************** DedicatedWorkerGlobalScope*************************************************
	        //1 "webworker_DedicatedWorkerGlobalScope_postMessage_Async"
	       
			"webWorkers dedicatedWorkerGlobalScope postMessage should work" : function() {
			
		    resultFromTest = false;//always initialize to false
			//var worker1 = new Worker(workerScript);
            var passData = "DedicatedWorkerGlobalScope_postMessage";
            var test = this;    
            
            workerArray[eWorkers.eRegWorker].onmessage = function (event) { 
            //alert(event.data);
                resultFromTest = (event.data == passData); // should be true if test passed 
                test.resume(function (){Assert.isTrue(resultFromTest);});	
            }
            
            workerArray[eWorkers.eRegWorker].postMessage(passData);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker: webworker_DedicatedWorkerGlobalScope_postMessage_Async fails!");
					}, 3100);
			
			},
	        	        
	        //2 webworker_DedicatedWorkerGlobalScope_onmessage_Async
	        "webWorkers dedicatedWorkerGlobalScope onMessage should work" : function() {
			
		    resultFromTest = false;//always initialize to false
			//var worker1 = new Worker(workerScript);
            var passData = "DedicatedWorkerGlobalScope_onmessage_Async";
            var test = this;    
            
            workerArray[eWorkers.eRegWorker].onmessage = function (event) { 
            //alert(event.data);
                resultFromTest = (event.data == passData); // should be true if test passed 
                test.resume(function (){Assert.isTrue(resultFromTest);});	
            }
            
            workerArray[eWorkers.eRegWorker].postMessage(passData);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker: webworker_DedicatedWorkerGlobalScope_onmessage_Async fails!");
					}, 3100);
			
			},
	        //3 webworker_DedicatedWorkerGlobalScope_Attri_Self_Async
	        "webWorkers dedicatedWorkerGlobalScope Attribute-Self should work" : function() {
			
		    resultFromTest = false;//always initialize to false
			//var worker1 = new Worker(workerScript);
            var passData = "Attribute_self";
            var test = this;    
            
            workerArray[eWorkers.eRegWorker].onmessage = function (event) { 
            //alert(event.data);
                resultFromTest = (event.data == 'Pass'); // should be true if test passed 
                test.resume(function (){Assert.isTrue(resultFromTest);});	
            }
           
            workerArray[eWorkers.eRegWorker].postMessage(passData);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker: webworker_DedicatedWorkerGlobalScope_Attri_Self_Async fails!");
					}, 6100);
			
			},
	               
	        //4 webworker_DedicatedWorkerGlobalScope_Attri_Location_Async
	        "webWorkers dedicatedWorkerGlobalScope Attribute-Location should work" : function() {
			
		    resultFromTest = false;//always initialize to false
			//var worker1 = new Worker(workerScript);
            var passData = "Attribute_location";
            var test = this;    
             
            workerArray[eWorkers.eRegWorker].onmessage = function (event) { 
            //alert(event.data);
                resultFromTest = (event.data == 'Pass'); // should be true if test passed 
                test.resume(function (){Assert.isTrue(resultFromTest);});	
            }
            
            workerArray[eWorkers.eRegWorker].postMessage(passData);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker: webworker_DedicatedWorkerGlobalScope_Attri_Location_Async fails!");
					}, 18100);
			
			},
	        
	       
	        //***********************************SharedWorkerGlobalScope*******************************************************
	        //1 webworker_SharedWorkerGlobalScope_self_Async
	        "webWorkers sharedWorkerGlobalScope Attribute-Self should work" : function() {
			
		    resultFromTest = false;//always initialize to false
			workerArray[eWorkers.eTmpWorker] = new SharedWorker(sharedWorkerScript,"test");
            var passData = 'Attribute_self';
            var test = this;    
            
            
            workerArray[eWorkers.eTmpWorker].port.onmessage = function (event) { 
            
                resultFromTest = (event.data == 'Pass'); // should be true if test passed
                workerArray[eWorkers.eTmpWorker].terminate();
                delete workerArray[eWorkers.eTmpWorker]; 
                test.resume(function (){Assert.isTrue(resultFromTest);});	
            }
            
            workerArray[eWorkers.eTmpWorker].port.postMessage(passData);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker: webworker_SharedWorkerGlobalScope_self_Async fails!");
					}, 3100);
			
			},
	            
	        //2 webworker_SharedWorkerGlobalScope_location_Async
	        "webWorkers sharedWorkerGlobalScope Attribute-Location should work" : function() {
			
		    resultFromTest = false;//always initialize to false
			
            var passData = 'Attribute_location';
            var test = this;    
            
            workerArray[eWorkers.eShrdWorker].port.onmessage = function (event) { 
            
                resultFromTest = (event.data == 'Pass'); // should be true if test passed 
                test.resume(function (){Assert.isTrue(resultFromTest);});	
            }
            
            workerArray[eWorkers.eShrdWorker].port.postMessage(passData);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker: webworker_SharedWorkerGlobalScope_location_Async fails!");
					}, 18100);
			
			},
	             
	        //3 webworker_SharedWorkerGlobalScope_onconnect_Async
	        "webWorkers sharedWorkerGlobalScope onConnect should work" : function() {
			
		    resultFromTest = false;//always initialize to false
			
            var passData = 'onconnect testing';
            var test = this;    
            
            workerArray[eWorkers.eShrdWorker].port.onmessage = function (event) { 
            
                resultFromTest = (event.data == passData); // should be true if test passed 
                test.resume(function (){Assert.isTrue(resultFromTest);});	
            }
            
            workerArray[eWorkers.eShrdWorker].port.postMessage(passData);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker: webworker_SharedWorkerGlobalScope_onconnect_Async fails!");
					}, 3100);
			
			},
		        
	        //4 webworker_SharedWorkerGlobalScope_name_Async
	        "webWorkers sharedWorkerGlobalScope name should work" : function() {
			
		    resultFromTest = false;//always initialize to false
			var passData = 'name testing';
            var test = this;    
            
            workerArray[eWorkers.eNamedSharedWorker].port.onmessage = function (event) { 
            
                resultFromTest = (event.data == sharedworkerName); // should be true if test passed 
                test.resume(function (){Assert.isTrue(resultFromTest);});	
            }
            
            workerArray[eWorkers.eNamedSharedWorker].port.postMessage(passData);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker: webworker_SharedWorkerGlobalScope_name_Async fails!");
					}, 38100);
			
			},
	        
	        //5 webworker_SharedWorkerGlobalScope_name_ReadOnly_Async
	        "webWorkers sharedWorkerGlobalScope name readOnly should work" : function() {
			
		    resultFromTest = false;//always initialize to false
			
            var passData = 'name readOnly testing';
            var test = this;    
            
            workerArray[eWorkers.eNamedSharedWorker].port.onmessage = function (event) { 
            
                resultFromTest = (event.data == 'Pass'); // should be true if test passed 
                test.resume(function (){Assert.isTrue(resultFromTest);});	
            }
            
            workerArray[eWorkers.eNamedSharedWorker].port.postMessage(passData);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker: webworker_SharedWorkerGlobalScope_name_ReadOnly_Async fails!");
					}, 3100);
			
			},
	        //6 webworker_SharedWorkerGlobalScope_ApplicationCache_Async   
	        "webWorkers sharedWorkerGlobalScope ApplicationCache should work" : function() {
			
		    resultFromTest = false;//always initialize to false
			
            var passData = 'ApplicationCache testing';
            var test = this;    
            
            workerArray[eWorkers.eNamedSharedWorker].port.onmessage = function (event) { 
            
                resultFromTest = (event.data == 'Pass'); // should be true if test passed 
                test.resume(function (){Assert.isTrue(resultFromTest);});	
               
            }
            
            workerArray[eWorkers.eNamedSharedWorker].port.postMessage(passData);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker: webworker_SharedWorkerGlobalScope_ApplicationCache_Async fails!");
					}, 3100);
			
			},
			 
	        //******************************************************** SharedWorker **********************************************************************
  
	        //1 webworker_SharedWorker_Constructor_Absolute_SameOrigin_Async
	        "webWorkers create sharedWorker from absolute path same origin should work" : function() {
			workerArray[eWorkers.eTmpWorker]= null;
			workerArray[eWorkers.eTmpWorker] = new SharedWorker(testDomain + '/html5/WebWorkerAsync/sharedworker.js');
	        resultFromTest = false;
	        if (workerArray[eWorkers.eTmpWorker]!=null){ 
	        
	        resultFromTest = true;	        
	        delete workerArray[eWorkers.eTmpWorker];
	        }
            Assert.isTrue(resultFromTest);				
			},
	        
	        //2 webworker_SharedWorker_Constructor_RelativeUrl_Async
	        "webWorkers create sharedWorker from relative path should work" : function() {
			
		    resultFromTest = false;//always initialize to false
            var passData = 'createSharedWorkerFromUrl_Relative_Async';
            var test = this;    
            
            workerArray[eWorkers.eShrdWorker].port.onmessage = function (event) { 
            
                resultFromTest = (event.data == passData); // should be true if test passed 
                test.resume(function (){Assert.isTrue(resultFromTest);});	
            }
            
            workerArray[eWorkers.eShrdWorker].port.postMessage(passData);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker: webworker_SharedWorker_Constructor_RelativeUrl_Async fails!");
					}, 3100);
			
			},
	        //3 webworker_SharedWorker_Constructor_RelativeUrl_withName_Async
	        "webWorkers create sharedWorker with name from relative path should work" : function() {
			
		    resultFromTest = false;//always initialize to false
			var workName ="mySharedWorker";
            workerArray[eWorkers.eTmpWorker] = new SharedWorker(sharedWorkerScript, workName);
            var passData = 'webworker_SharedWorker_Constructor_RelativeUrl_withName_Async';
            var test = this;    
            
            workerArray[eWorkers.eTmpWorker].port.onmessage = function (event) { 
            
                resultFromTest = (event.data == workName); // should be true if test passed 
                workerArray[eWorkers.eTmpWorker].terminate();
                delete workerArray[eWorkers.eTmpWorker];
                test.resume(function (){Assert.isTrue(resultFromTest);});	
            }
            
            workerArray[eWorkers.eTmpWorker].port.postMessage(passData);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker: webworker_SharedWorker_Constructor_RelativeUrl_withName_Async fails!");
					}, 3100);
			
			},
	        //4 webworker_SharedWorker_onerror_Async
	        "webWorkers sharedWorker onError should work" : function() {
			
		    resultFromTest = false;//always initialize to false
            var test = this;
            
            var passData = "onError";
            
            workerArray[eWorkers.eShrdWorker].onerror = function (event){ 
            
                resultFromTest = ((event.message != undefined) && (event.filename != undefined)
                && (event.lineno != undefined)); // should be true if test passed 
                test.resume(function (){Assert.isTrue(resultFromTest);});	
            }
            
            workerArray[eWorkers.eShrdWorker].port.postMessage(passData);
			test.wait(
					function(){
						Assert.fail("HTML5 Web Worker: webworker_SharedWorker_onerror_Async fails!");
					}, 18100);
			
			},
	        //5 webworker_SharedWorker_readOnly_Attribute_port_Async
	        "webWorkers sharedWorker readOnly Attribute-Port should work" : function() {
			
		    
	        var preValue = workerArray[eWorkers.eShrdWorker].port;
	        workerArray[eWorkers.eShrdWorker].port = "new value";
	        resultFromTest = false;//always initialize to false
	        
	        
	        resultFromTest = (workerArray[eWorkers.eShrdWorker].port == preValue);// && (worker1.port.postMessage && worker1.port.start && worker1.port.close));
	        Assert.isTrue(resultFromTest);	
			},
	        
	      "webWorkers test suite cleanup should work" : function() {
	            
	            for(i=0; i<workerArray.length; i++)
	            {
	                delete workerArray[i];
	            }
	            //alert("Cleanup Done!!!");
			    Assert.isTrue(true);	
			},
			
			
		});
			
		


		return testCases;
	}
})();
