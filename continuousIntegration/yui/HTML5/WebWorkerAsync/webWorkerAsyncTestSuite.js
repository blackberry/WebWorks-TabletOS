var workerScript = '';
var sharedWorkerScript = '';
function webWorkerAsyncTestSuite(submitLocation)
{
    try
    {
        // Initialize our test Suite
        this.submitLocation = submitLocation;
        this.util = new UnitUtil();
        this.util.setTestSuiteTitle("HTML5 Web Worker Asynchronous Tests");
        this.util.setTestSuiteDescription("These tests will cover all the asynchronous test case of the Web Worker");
        if ( getAutomatedSite() != null ) {
            workerScript = getResourceWithPrefix('../WebWorkerAsync/worker.js');
            sharedWorkerScript = getResourceWithPrefix('../WebWorkerAsync/sharedworker.js');
        } else {
            workerScript =  getResourceWithPrefix('WebWorkerAsync/worker.js');
            sharedWorkerScript = getResourceWithPrefix('WebWorkerAsync/sharedworker.js');
        }
        // Assign our unit tests
        webWorkerAsyncTestSuite.prototype.run =  webWorkerAsyncTestSuite_RunTests;
    }
    catch (err)
    {
        // Do nothing for now
        alert(err);
        return false;
    }
}

// General function that will run all of the tests
function  webWorkerAsyncTestSuite_RunTests()
{
    var testName;
   //********************************************************DedicatedWorker********************************************************   
   //1
    try {
       
        testName = "webworker_DedicatedWorker_createFromUrl_Relative_Async";
        if (webworker_DedicatedWorker_createFromUrl_Relative_Async(this.util)) {     
            this.util.testPassed(testName);
         }   
        else
            this.util.testFailed(testName, "UNKNOWN");
	    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
	//2
    try {
       
        testName = "webworker_DedicatedWorker_createFromUrl_Absolute_SameOrigin_Async";
        if (webworker_DedicatedWorker_createFromUrl_Absolute_SameOrigin_Async(this.util)) {
                   
            this.util.testPassed(testName);
         }   
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
	
    //3 
	try {
        testName = "webworker_DedicatedWorker_createFromUrl_Absolute_DiffOrigin_Async_Negative";
        if (webworker_DedicatedWorker_createFromUrl_Absolute_DiffOrigin_Async_Negative(this.util)) {
            //alert('pass');       
            this.util.testPassed(testName);
         }   
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
			this.util.testFailed(testName, err.toString());
        }
    }
    //4  
    try {
        testName = "webworker_DedicatedWorker_onerror_Async";
        if (webworker_DedicatedWorker_onerror_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
    //5
    try {
        testName = "webworker_DedicatedWorker_onmessage_Async";
        if (webworker_DedicatedWorker_onmessage_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
    //6
    try {
        testName = "webworker_DedicatedWorker_postMessage_String_Async";
        if (webworker_DedicatedWorker_postMessage_String_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
    //7
    try {
        testName = "webworker_DedicatedWorker_postMessage_Number_Async";
        if (webworker_DedicatedWorker_postMessage_Number_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
    //8
    try {
        testName = "webworker_DedicatedWorker_postMessage_Boolean_Async";
        if (webworker_DedicatedWorker_postMessage_Boolean_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
	
    //9
    try {
        testName = "webworker_DedicatedWorker_postMessage_Null_Async";
        if (webworker_DedicatedWorker_postMessage_Null_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
    //10
    try {
        testName = "webworker_DedicatedWorker_postMessage_Undefined_Async";
        if (webworker_DedicatedWorker_postMessage_Undefined_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
    //11
    try {
        testName = "webworker_DedicatedWorker_postMessage_Object_Async";
        if (webworker_DedicatedWorker_postMessage_Object_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }  
    //***************************************** DedicatedWorkerGlobalScope*************************************************
	//1
    try {
        testName = "webworker_DedicatedWorkerGlobalScope_postMessage_Async";
        if (webworker_DedicatedWorkerGlobalScope_postMessage_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
    //2
    try {
        testName = "webworker_DedicatedWorkerGlobalScope_onmessage_Async";
        if (webworker_DedicatedWorkerGlobalScope_onmessage_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
    //3 
    try {
       
        testName = "webworker_DedicatedWorkerGlobalScope_Attri_Self_Async";
        if (webworker_DedicatedWorkerGlobalScope_Attri_Self_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
    //4
    try {
        testName = "webworker_DedicatedWorkerGlobalScope_Attri_Location_Async";
        if (webworker_DedicatedWorkerGlobalScope_Attri_Location_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
	
    
    //***********************************************************SharedWorkerGlobalScope*******************************************************
	//1
	try {
        testName = "webworker_SharedWorkerGlobalScope_self_Async";
        if (webworker_SharedWorkerGlobalScope_self_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
	//2
	try {
        testName = "webworker_SharedWorkerGlobalScope_location_Async";
        if (webworker_SharedWorkerGlobalScope_location_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
	//3
    try {
        testName = "webworker_SharedWorkerGlobalScope_onconnect_Async";
        if (webworker_SharedWorkerGlobalScope_onconnect_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
    //4
    try {
        testName = "webworker_SharedWorkerGlobalScope_name_Async";
        if (webworker_SharedWorkerGlobalScope_name_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
    //5
	try {
        testName = "webworker_SharedWorkerGlobalScope_name_ReadOnly_Async";
        if (webworker_SharedWorkerGlobalScope_name_ReadOnly_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
	//6
	try {
        testName = "webworker_SharedWorkerGlobalScope_ApplicationCache_Async";
        if (webworker_SharedWorkerGlobalScope_ApplicationCache_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
	
    //******************************************************** SharedWorker **********************************************************************
  
	//0
    try {
        testName = "webworker_SharedWorker_Constructor_Absolute_SameOrigin_Async";
        if (webworker_SharedWorker_Constructor_Absolute_SameOrigin_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
	//1
    try {
        testName = "webworker_SharedWorker_Constructor_RelativeUrl_Async";
        if (webworker_SharedWorker_Constructor_RelativeUrl_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
    //2
    try {
        testName = "webworker_SharedWorker_Constructor_RelativeUrl_withName_Async";
        if (webworker_SharedWorker_Constructor_RelativeUrl_withName_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
    //3
    //onerror
    try {
        testName = "webworker_SharedWorker_onerror_Async";
        if (webworker_SharedWorker_onerror_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
	//4 Attribute port
	 try {
        testName = "webworker_SharedWorker_readOnly_Attribute_port_Async";
        if (webworker_SharedWorker_readOnly_Attribute_port_Async(this.util))
            this.util.testPassed(testName);
        else
            this.util.testFailed(testName, "UNKNOWN");
    }
    catch (err) {
        if (err.toString() != "Error: AsyncTestInProgress") {  // Ignore async errors
            this.util.testFailed(testName, err.toString());
        }
    }
	
	
    // No report path then return results as a string
    if (this.submitLocation == undefined)
        return this.util.getBodyDetails();
    // Submit results
    this.util.submitResults(this.submitLocation);
}

/******************************************************************* DedicatedWorkerGlobalScope*******************************************************************/
  //readonly attribute WorkerGlobalScope self;
  //void close();       *****************Not done******************
  //readonly attribute WorkerLocation location;
  //attribute Function onerror;     *****************Not done******************
  //void postMessage(in any message, in optional MessagePortArray ports);        ***************************** Haven't done for the optional MessagePortArray ports****************************
  //attribute Function onmessage;
/*****************************************************************************************************************************************************************/

// Customized test of WebWorker: DedicatedWorkerGlobalScope's postMessage() testing
function webworker_DedicatedWorkerGlobalScope_postMessage_Async(_utilObj) {
	//alert(this.constructor);
    var worker1 = new Worker(workerScript);
    var passData = "DedicatedWorkerGlobalScope_postMessage";
    worker1.onmessage = function (event) { 
        _utilObj.testAsyncPending('webworker_DedicatedWorkerGlobalScope_postMessage_Async'); 
		if (event.data == passData) {
            _utilObj.testAsyncPassed('webworker_DedicatedWorkerGlobalScope_postMessage_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_DedicatedWorkerGlobalScope_postMessage_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_DedicatedWorkerGlobalScope_postMessage_Async'); 
    worker1.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}

// Customized test of WebWorker: DedicatedWorkerGlobalScope's onmessage() testing
function webworker_DedicatedWorkerGlobalScope_onmessage_Async(_utilObj) {
    var worker1 = new Worker(workerScript);
    var passData = "DedicatedWorkerGlobalScope_onmessage_Async";
     worker1.onmessage = function (event) { 
		_utilObj.testAsyncPending('webworker_DedicatedWorkerGlobalScope_onmessage_Async');  
	    if (event.data == passData) {
            _utilObj.testAsyncPassed('webworker_DedicatedWorkerGlobalScope_onmessage_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_DedicatedWorkerGlobalScope_onmessage_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_DedicatedWorkerGlobalScope_onmessage_Async');  
    worker1.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}


// Customized test of WebWorker: DedicatedWorkerGlobalScope's readonly attribute self testing
// Currently this test case failed, because self.onerror is undefined
function webworker_DedicatedWorkerGlobalScope_Attri_Self_Async(_utilObj) {   
    var worker1 = new Worker(workerScript);
    var passData = "Attribute_self";
    worker1.onmessage = function (event) { 
		_utilObj.testAsyncPending('webworker_DedicatedWorkerGlobalScope_Attri_Self_Async');  
        //alert(event.data);
        if (event.data == 'Pass') {
            _utilObj.testAsyncPassed('webworker_DedicatedWorkerGlobalScope_Attri_Self_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_DedicatedWorkerGlobalScope_Attri_Self_Async', event.data);
        }       
    }
    //_utilObj.testAsyncPending('webworker_DedicatedWorkerGlobalScope_Attri_Self_Async');  
    worker1.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}

// Customized test of WebWorker: DedicatedWorkerGlobalScope's readonly attribute location testing
function webworker_DedicatedWorkerGlobalScope_Attri_Location_Async(_utilObj) {
    var worker1 = new Worker(workerScript);
    var passData = "Attribute_location";
    worker1.onmessage = function (event) { 
		_utilObj.testAsyncPending('webworker_DedicatedWorkerGlobalScope_Attri_Location_Async'); 
	    //alert(event.data);
		if (event.data == 'Pass') {
		   _utilObj.testAsyncPassed('webworker_DedicatedWorkerGlobalScope_Attri_Location_Async');
	    } else {
		   _utilObj.testAsyncFailed('webworker_DedicatedWorkerGlobalScope_Attri_Location_Async', event.data);
	    }
    }
    //_utilObj.testAsyncPending('webworker_DedicatedWorkerGlobalScope_Attri_Location_Async'); 
    worker1.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}
/******************************************************************* Dedicated Worker*******************************************************************/
 //AbstractWorker
 //attribute Function onerror; 
 //[Constructor(in DOMString scriptURL)]
 //interface Worker : AbstractWorker {
 // void terminate();   ( Only has sync test case )
 // void postMessage(in any message, in optional MessagePortArray ports);
 // attribute Function onmessage;

/********************************************************************************************************************************************************/

// Customized test of WebWorker: webworker_DedicatedWorker_createFromUrl_Relative_Async

function webworker_DedicatedWorker_createFromUrl_Relative_Async(_utilObj) {
    var worker1 = new Worker(workerScript);
    var passData = 'createWebWorkerFromUrl';
    worker1.onmessage = function (event) { 
       
		_utilObj.testAsyncPending('webworker_DedicatedWorker_createFromUrl_Relative_Async');

        //alert(event.data);
        if ( event.data == passData) {
	
            _utilObj.testAsyncPassed('webworker_DedicatedWorker_createFromUrl_Relative_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_DedicatedWorker_createFromUrl_Relative_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_DedicatedWorker_createFromUrl_Relative_Async');
    worker1.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}


// Customized test of WebWorker: webworker_DedicatedWorker_createFromUrl_Absolute_SameOrigin_Async

function webworker_DedicatedWorker_createFromUrl_Absolute_SameOrigin_Async(_utilObj) {

    var worker1;
    if ( getAutomatedSite() == true ) {
        worker1 = new Worker('http://bdt11-vmyyz.labyyz.testnet.rim.net/HTML5/TestPages/HTML5UnitTest/WebWorkerAsync/worker.js');
    } else {
        worker1 = new Worker(testDomain + '/html5/WebWorkerAsync/worker.js');
    }
    var passData = 'createWebWorkerFromUrl';
    worker1.onmessage = function (event) {
        _utilObj.testAsyncPending('webworker_DedicatedWorker_createFromUrl_Absolute_SameOrigin_Async');
        if ( event.data == passData) {
			//alert('pass!!');
            _utilObj.testAsyncPassed('webworker_DedicatedWorker_createFromUrl_Absolute_SameOrigin_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_DedicatedWorker_createFromUrl_Absolute_SameOrigin_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_DedicatedWorker_createFromUrl_Absolute_SameOrigin_Async');
    worker1.postMessage(passData);
    
    throw new Error('AsyncTestInProgress');
}


// Customized test of WebWorker: webworker_DedicatedWorker_createFromUrl_Absolute_DiffOrigin_Async_Negative 
function webworker_DedicatedWorker_createFromUrl_Absolute_DiffOrigin_Async_Negative(_utilObj) {
	try {
		var worker1 = new Worker('http://10.135.205.24/HTML5Test/worker.js');
		throw new Error('Security Error should be thrown out when creating a working from different origin');
	} catch (err) {
		//alert(err.toString());
		if (err.toString() == 'Error: SECURITY_ERR: DOM Exception 18'){
			return true;
		}
		else 
			throw err;
	}
  
}


// Customized test of WebWorker: onerror() testing
function webworker_DedicatedWorker_onerror_Async(_utilObj) {
    var worker1 = new Worker(workerScript);
    var passData = "onError";
    worker1.onerror = function (event) { 
		_utilObj.testAsyncPending('webworker_DedicatedWorker_onerror_Async');
        /*
		alert("event.message: " +  event.message);
		alert("event.filename: " + event.filename);
		alert("event.lineno: " + event.lineno);
		*/
        if ((event.message != undefined) && (event.filename != undefined)
                && (event.lineno != undefined)) {
            _utilObj.testAsyncPassed('webworker_DedicatedWorker_onerror_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_DedicatedWorker_onerror_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_DedicatedWorker_onerror_Async');
    worker1.postMessage(passData);   
    throw new Error('AsyncTestInProgress');
}
    
// Customized test of WebWorker: onmessage() testing
function webworker_DedicatedWorker_onmessage_Async(_utilObj) {
    var worker1 = new Worker(workerScript);
    var passData = 'onmessage testing';
    worker1.onmessage = function (event) { 
		_utilObj.testAsyncPending('webworker_DedicatedWorker_onmessage_Async');  
        if ( event.data == passData) {
            _utilObj.testAsyncPassed('webworker_DedicatedWorker_onmessage_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_DedicatedWorker_onmessage_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_DedicatedWorker_onmessage_Async');  
    worker1.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}



// Customized test of WebWorker: Using postMessage to pass primitive data type string
function webworker_DedicatedWorker_postMessage_String_Async(_utilObj) {
    var worker1 = new Worker(workerScript);
    var passData = 'string';
    worker1.onmessage = function (event) { 
        _utilObj.testAsyncPending('webworker_DedicatedWorker_postMessage_String_Async');  
        //alert(event.data);
        if ( event.data == passData) {
            _utilObj.testAsyncPassed('webworker_DedicatedWorker_postMessage_String_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_DedicatedWorker_postMessage_String_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_DedicatedWorker_postMessage_String_Async');  
    worker1.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}

// Customized test of WebWorker: Using postMessage to pass primitive data type number
function webworker_DedicatedWorker_postMessage_Number_Async(_utilObj) {
    var worker1 = new Worker(workerScript);
    var passData = 8888;
    worker1.onmessage = function (event) { 
        _utilObj.testAsyncPending('webworker_DedicatedWorker_postMessage_Number_Async');  
        //alert(event.data);
        if ( event.data == passData) {
            _utilObj.testAsyncPassed('webworker_DedicatedWorker_postMessage_Number_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_DedicatedWorker_postMessage_Number_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_DedicatedWorker_postMessage_Number_Async'); 
    worker1.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}

// Customized test of WebWorker: Using postMessage to pass primitive data type boolean
function webworker_DedicatedWorker_postMessage_Boolean_Async(_utilObj) {
    var worker1 = new Worker(workerScript);
    var passData = true;
    worker1.onmessage = function (event) { 
        _utilObj.testAsyncPending('webworker_DedicatedWorker_postMessage_Boolean_Async');  
        //alert(typeof event.data);
        if ( event.data == passData) {
            _utilObj.testAsyncPassed('webworker_DedicatedWorker_postMessage_Boolean_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_DedicatedWorker_postMessage_Boolean_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_DedicatedWorker_postMessage_Boolean_Async');  
    worker1.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}

// Customized test of WebWorker: Using postMessage to pass null
function webworker_DedicatedWorker_postMessage_Null_Async(_utilObj) {
    var worker1 = new Worker(workerScript);
    var passData = null;
    worker1.onmessage = function (event) { 
        _utilObj.testAsyncPending('webworker_DedicatedWorker_postMessage_Null_Async');  
        //alert(typeof event.data);
        if ( event.data == passData) {
            _utilObj.testAsyncPassed('webworker_DedicatedWorker_postMessage_Null_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_DedicatedWorker_postMessage_Null_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_DedicatedWorker_postMessage_Null_Async');
    worker1.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}

// Customized test of WebWorker: Using postMessage to pass undefined
function webworker_DedicatedWorker_postMessage_Undefined_Async(_utilObj) {
    var worker1 = new Worker(workerScript);
    var passData = undefined;
    worker1.onmessage = function (event) { 
        _utilObj.testAsyncPending('webworker_DedicatedWorker_postMessage_Undefined_Async');  
        //alert(typeof event.data);
        if ( event.data == passData) {
            _utilObj.testAsyncPassed('webworker_DedicatedWorker_postMessage_Undefined_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_DedicatedWorker_postMessage_Undefined_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_DedicatedWorker_postMessage_Undefined_Async'); 
    worker1.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}

// Customized test of WebWorker: Using postMessage to pass Object. Here we use obj.equal(obj) to compare two objects
function webworker_DedicatedWorker_postMessage_Object_Async(_utilObj) {
    var passObject = new Object();
    passObject.strField = 'string';
    passObject.numField = 20;    
    var worker1 = new Worker(workerScript);
    var passData = passObject;
    worker1.onmessage = function (event) {
		_utilObj.testAsyncPending('webworker_DedicatedWorker_postMessage_Object_Async');
        if ((event.data.strField == passData.strField) && (event.data.numField == passData.numField)) {
            _utilObj.testAsyncPassed('webworker_DedicatedWorker_postMessage_Object_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_DedicatedWorker_postMessage_Object_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_DedicatedWorker_postMessage_Object_Async');  
    worker1.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}





/******************************************************************* SharedWorkerGlobalScope*******************************************************************/
    //readonly attribute WorkerGlobalScope self;
    //readonly attribute WorkerLocation location;
    //void close(); ****************Not done******************
    //attribute Function onerror; ****************Not done******************
    
    //readonly attribute DOMString name;   
    //readonly attribute ApplicationCache applicationCache;
    //attribute Function onconnect;  **************positive case is done*******************
/**************************************************************************************************************************************************************/

// Customized test of SharedWorker: webworker_SharedWorkerGlobalScope_self_Async
function webworker_SharedWorkerGlobalScope_self_Async(_utilObj) {
   
    var worker1 = new SharedWorker(sharedWorkerScript,"test");
    var passData = 'Attribute_self';
    worker1.port.onmessage = function(event) { // note: not worker.onmessage!
        //alert(event.data);
		_utilObj.testAsyncPending('webworker_SharedWorkerGlobalScope_self_Async');
        if ( event.data == 'Pass') {
            _utilObj.testAsyncPassed('webworker_SharedWorkerGlobalScope_self_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_SharedWorkerGlobalScope_self_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_SharedWorkerGlobalScope_self_Async');
    worker1.port.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}

// Customized test of SharedWorker: webworker_SharedWorkerGlobalScope_location_Async
function webworker_SharedWorkerGlobalScope_location_Async(_utilObj) {
   
    var worker1 = new SharedWorker(sharedWorkerScript);
    var passData = 'Attribute_location';
    worker1.port.onmessage = function(event) { // note: not worker.onmessage!
        //alert(event.data);
		_utilObj.testAsyncPending('webworker_SharedWorkerGlobalScope_location_Async');
        if ( event.data == 'Pass') {
            _utilObj.testAsyncPassed('webworker_SharedWorkerGlobalScope_location_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_SharedWorkerGlobalScope_location_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_SharedWorkerGlobalScope_location_Async');
    worker1.port.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}


// Customized test of SharedWorker: webworker_SharedWorkerGlobalScope_onconnect_Async
function webworker_SharedWorkerGlobalScope_onconnect_Async(_utilObj) {
   
    var worker1 = new SharedWorker(sharedWorkerScript);
    var passData = 'onconnect testing';
    worker1.port.onmessage = function(event) { // note: not worker.onmessage!
        //alert(event.data);
		_utilObj.testAsyncPending('webworker_SharedWorkerGlobalScope_onconnect_Async');
        if ( event.data == passData) {
            _utilObj.testAsyncPassed('webworker_SharedWorkerGlobalScope_onconnect_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_SharedWorkerGlobalScope_onconnect_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_SharedWorkerGlobalScope_onconnect_Async');
    worker1.port.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}

// Customized test of SharedWorker: webworker_SharedWorkerGlobalScope_name_Async
function webworker_SharedWorkerGlobalScope_name_Async(_utilObj) {
    var sharedworkerName = 'sharedwork1';
    var worker1 = new SharedWorker(sharedWorkerScript,sharedworkerName);
    var passData = 'name testing';
    worker1.port.onmessage = function(event) { // note: not worker.onmessage!
        //alert(event.data);
		 _utilObj.testAsyncPending('webworker_SharedWorkerGlobalScope_name_Async');
        if ( event.data == sharedworkerName) {
            _utilObj.testAsyncPassed('webworker_SharedWorkerGlobalScope_name_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_SharedWorkerGlobalScope_name_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_SharedWorkerGlobalScope_name_Async');
    worker1.port.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}

// Customized test of SharedWorker: webworker_SharedWorkerGlobalScope_name_ReadOnly_Async
function webworker_SharedWorkerGlobalScope_name_ReadOnly_Async(_utilObj) {
    var sharedworkerName = 'sharedwork1';
    var worker1 = new SharedWorker(sharedWorkerScript,sharedworkerName);
    var passData = 'name readOnly testing';
    worker1.port.onmessage = function(event) { // note: not worker.onmessage!
        //alert(event.data);
		_utilObj.testAsyncPending('webworker_SharedWorkerGlobalScope_name_ReadOnly_Async');
        if ( event.data == 'Pass') {
            _utilObj.testAsyncPassed('webworker_SharedWorkerGlobalScope_name_ReadOnly_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_SharedWorkerGlobalScope_name_ReadOnly_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_SharedWorkerGlobalScope_name_ReadOnly_Async');
    worker1.port.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}

// Customized test of SharedWorker: webworker_SharedWorkerGlobalScope_ApplicationCache_Async
function webworker_SharedWorkerGlobalScope_ApplicationCache_Async(_utilObj) {
    var sharedworkerName = 'sharedwork1';
    var worker1 = new SharedWorker(sharedWorkerScript,sharedworkerName);
    var passData = 'ApplicationCache testing';
    worker1.port.onmessage = function(event) { // note: not worker.onmessage!
        //alert(event.data);
		_utilObj.testAsyncPending('webworker_SharedWorkerGlobalScope_ApplicationCache_Async');
        if ( event.data == 'Pass') {
            _utilObj.testAsyncPassed('webworker_SharedWorkerGlobalScope_ApplicationCache_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_SharedWorkerGlobalScope_ApplicationCache_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_SharedWorkerGlobalScope_ApplicationCache_Async');
    worker1.port.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}







/******************************************************************* SharedWorker*******************************************************************/
//  interface AbstractWorker {
//     attribute Function onerror;
//  };
//  [Constructor(in DOMString scriptURL, in optional DOMString name)]
//  interface SharedWorker : AbstractWorker {
//     readonly attribute MessagePort port;
//  };
    

/**************************************************************************************************************************************************************/

// Customized test of SharedWorker: createSharedWorkerFromUrl_Absolute_Async
function webworker_SharedWorker_Constructor_Absolute_SameOrigin_Async(_utilObj) {
	var worker1 = new SharedWorker(testDomain + '/html5/WebWorkerAsync/sharedworker.js');
	if (worker1!=null)
		return true;
    else 
		return false;
}

// Customized test of SharedWorker: createSharedWorkerFromUrl_Relative_Async
function webworker_SharedWorker_Constructor_RelativeUrl_Async(_utilObj) {
   
    var worker1 = new SharedWorker(sharedWorkerScript);
    var passData = 'createSharedWorkerFromUrl_Relative_Async';
    worker1.port.onmessage = function(event) { // note: not worker.onmessage!
        //alert(event.data);
		_utilObj.testAsyncPending('webworker_SharedWorker_Constructor_RelativeUrl_Async');
        if ( event.data == passData) {
            _utilObj.testAsyncPassed('webworker_SharedWorker_Constructor_RelativeUrl_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_SharedWorker_Constructor_RelativeUrl_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_SharedWorker_Constructor_RelativeUrl_Async');
    worker1.port.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}

// Customized test of SharedWorker: webworker_SharedWorker_Constructor_RelativeUrl_withName_Async 
function webworker_SharedWorker_Constructor_RelativeUrl_withName_Async(_utilObj) {
   
    var workName ="mySharedWorker";
    var worker1 = new SharedWorker(sharedWorkerScript, workName);
    var passData = 'webworker_SharedWorker_Constructor_RelativeUrl_withName_Async';
    worker1.port.onmessage = function(event) { // note: not worker.onmessage!
        //alert(event.data);
		_utilObj.testAsyncPending('webworker_SharedWorker_Constructor_RelativeUrl_withName_Async');
        if ( event.data == workName) {
            _utilObj.testAsyncPassed('webworker_SharedWorker_Constructor_RelativeUrl_withName_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_SharedWorker_Constructor_RelativeUrl_withName_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_SharedWorker_Constructor_RelativeUrl_withName_Async');
    worker1.port.postMessage(passData);
    throw new Error('AsyncTestInProgress');
}

// Customized test of SharedWorker: webworker_SharedWorker_onerror_Async
function webworker_SharedWorker_onerror_Async(_utilObj) {
    var worker1 = new SharedWorker(sharedWorkerScript);
    var passData = "onError";
    worker1.onerror = function (event) { 
		_utilObj.testAsyncPending('webworker_SharedWorker_onerror_Async');
        //alert(event.message +' '+ event.filename + ' ' + event.lineno);
        if ((event.message != undefined) && (event.filename != undefined)
                && (event.lineno != undefined)) {
            _utilObj.testAsyncPassed('webworker_SharedWorker_onerror_Async');
        } else {
            _utilObj.testAsyncFailed('webworker_SharedWorker_onerror_Async', event.data);
        }
    }
    //_utilObj.testAsyncPending('webworker_SharedWorker_onerror_Async');
    worker1.port.postMessage(passData);   
    throw new Error('AsyncTestInProgress');
		
}

// Customized test of SharedWorker: webworker_SharedWorker_readOnly_Attribute_port_Async
/*
interface MessagePort {
  void postMessage(in any message, in optional MessagePortArray ports);
  void start();
  void close();
  // event handlers
  attribute Function onmessage;
};
MessagePort implements EventTarget;
*/
function webworker_SharedWorker_readOnly_Attribute_port_Async(_utilObj) {
    var worker1 = new SharedWorker(sharedWorkerScript);
	var preValue = worker1.port;
	worker1.port = "new value";
	if (worker1.port !=  preValue) {
		throw new Error('Attribute port should be readOnly');	
	} else {
		if (worker1.port.postMessage && worker1.port.start && worker1.port.close)
			return true
		else
			throw new Error('Some functions are undefined');	
    }		
}

// Customized test of SharedWorker: test_SharedWorker_port_readOnly_Async
function webworker_SharedWorker_port_readOnly_Async(_utilObj) {
}
