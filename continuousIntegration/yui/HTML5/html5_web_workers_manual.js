(function() {               
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	 var testDomain = 'http://10.137.42.57/YUI/HTML5/';
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		
		testCases["suiteName"] = "HTML5 Web Workers Manual Tests";
		
		//---------------------------------------------------------------------
		// Web Workers tests
		//---------------------------------------------------------------------			

   
		
        testCases[0] = new Y.Test.Case({
			name: "HTML5 Web Worker Manual Tests ",

			setUp : function () {
				//Order is a stack, last object will appear first in DOM
				framework.setupIFrame();
				framework.setupFailButton();
				framework.setupPassButton();
				framework.setupInstructions();
			},
			
			tearDown : function () {
				framework.tearDownIFrame();
				framework.tearDownFailButton();
				framework.tearDownPassButton();
				framework.tearDownInstructions();
			},
			//1  Worker Sync Test:function terminate()
			"Worker Manual  Async Test: function terminate test case should work" : function() {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "Stop(Terminate Web Worker) should stop the counter";
				//load test page
				framework.setIFrameSource(testDomain +"WebWorkerAsync/Terminate_testing_manual/DedicatedWorker_Terminate_testing.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			
			},
			"Worker Worker Manual Stress Test: function stress test case should work" : function() {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "Selected number of WebWorkers should run";
				
				//load test page
				framework.setIFrameSource(testDomain +"WebWorkerStress/index.html");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			
			},
			"Worker Shared worker Manual  Test:  Two shared Workers share connection  should work" : function() {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "The connection number count  is shared and should be higher then 1 in log text after you press test button";
				
				//load test page
				framework.setIFrameSource(testDomain +"WebWorkerAsync/Sharedworker_testing_manual/sharedworker1.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			
			},
		
			
			
		});	
			



		return testCases;
	}
})();
