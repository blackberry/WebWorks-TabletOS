(function() {               
	var framework = YUI.framework;
	var testDomain = ""
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		
		testCases["suiteName"] = "webDatabase Manual tests";
		
		//---------------------------------------------------------------------
		// webDB tests
		//---------------------------------------------------------------------			


		testCases[0] = new Y.Test.Case({
			
			name: "webDatabase Manual tests",

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

//#32
						
			"MANUAL webDB refresh_test should work": function(){
				
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource("HTML5/WebDB/notes.html");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},

		});	
		return testCases;
	}
})();
