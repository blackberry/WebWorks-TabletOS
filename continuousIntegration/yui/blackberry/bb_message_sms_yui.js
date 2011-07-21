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
			name: "blackberry.message.sms existence Tests",

			setUp : function () {
				//Order is a stack, last object will appear first in DOM
				framework.setupFailButton();
				framework.setupPassButton();
				framework.setupInstructions();
			},
			
			tearDown : function () {
				framework.tearDownFailButton();
				framework.tearDownPassButton();
				framework.tearDownInstructions();
			},
			
			
			"blackberry.message.sms.isListeningForMessage should exist" : function() {
				Assert.isNotUndefined(blackberry.message.sms.isListeningForMessage);
			},
			"blackberry.message.sms.addReceiveListener() should exist" : function() {
				Assert.isNotUndefined(blackberry.message.sms.addReceiveListener);
			},
			"blackberry.message.sms.removeReceiveListener() should exist" : function() {
				Assert.isNotUndefined(blackberry.message.sms.removeReceiveListener);
			},
			"blackberry.message.sms.send() should exist" : function() {
				Assert.isNotUndefined(blackberry.message.sms.send);
			},
			
			
				
			
			
			
		/* 	"Manual Test 1 should do something": function () {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Instructions for Manual Test 1");
				
				//do some manual test output
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			} */
		
		});
		
		
		testCases[1] = new Y.Test.Case({
			name: "blackberry.message.sms manual Tests",

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
		
		 	"MANUAL - User should be able to send sms": function () {
				framework.test = this;
				framework.setInstructions("Type in the phone number in the textbox then click send button");
				
				framework.setIFrameSource("http://atg05-yyz.rim.net/webapiextension/Sms.htm");
				framework.showIFrame();


				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			} ,
			"MANUAL - User should be able to add receive listener": function () {
				framework.test = this;
				framework.setInstructions("Click isListeningForMessage button; Click addReceiveListener button, callback should be invoked when the device receive sms");
				
				framework.setIFrameSource("http://atg05-yyz.rim.net/webapiextension/Sms.htm");
				framework.showIFrame();


				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			"MANUAL - User should be able to remove receive listener": function () {
				framework.test = this;
				framework.setInstructions("callback function should not be invoked anymore after we click removeReceiveListener");
				
				framework.setIFrameSource("http://atg05-yyz.rim.net/webapiextension/Sms.htm");
				framework.showIFrame();


				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
             "MANUAL - User should be able to send multiple sms in a short time period": function () {
				framework.test = this;
				framework.setInstructions(" five sms will be sent after we click the Send 5 message in a loop button");
				
				framework.setIFrameSource("http://atg05-yyz.rim.net/webapiextension/Sms.htm");
				framework.showIFrame();


				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			} 			
		
		});
		
		
		return testCases;
	};
})();

