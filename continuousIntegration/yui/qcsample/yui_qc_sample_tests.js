(function() {  
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		//---------------------------------------------------------------------
		// Test methods - names must begin with "test"
		// or to contain the word "should" when a "friendly name" is used
		//---------------------------------------------------------------------
		
		//---------------------------------------------------------------------
		// Manual Tests prototype
		//---------------------------------------------------------------------
		
		testCases[0] = new Y.Test.Case({
			name: "Sample YUI QC Tests",

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
			
			"Manual Test 1 should do something": function () {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Instructions for Manual Test 1");
				
				//do some manual test output
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"Manual Test 2 should do something": function () {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Instructions for Manual Test 2");
				
				//do some manual test output
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"Manual Test 3 should do something": function () {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Instructions for Manual Test 3");
				
				//do some manual test output
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"Manual Test 4 should load a media test URL in an iFrame": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "Instructions for Manual Test 4";
				
				//do some manual test output
				framework.setIFrameSource("http://192.168.101.57/html/6.0.0/html5_audio/tagTypesMP3.html");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
		});
		return testCases;
	};
})();

