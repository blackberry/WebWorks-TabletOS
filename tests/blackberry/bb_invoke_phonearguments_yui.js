(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;

        testCases[0] = new Y.Test.Case({
            name: "blackberry.invoke for Phone",
			
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
			
			_should: {
                error: {
					
                }                
            },
			
			"blackberry.invoke.PhoneArguments should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.PhoneArguments);
			},
			
			"blackberry.invoke.PhoneArguments.VIEW_CALL should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.PhoneArguments.VIEW_CALL);
				Assert.areSame(blackberry.invoke.PhoneArguments.VIEW_CALL, 0);
			},
			
			"blackberry.invoke.PhoneArguments.VIEW_VOICEMAIL should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.PhoneArguments.VIEW_VOICEMAIL);
				Assert.areSame(blackberry.invoke.PhoneArguments.VIEW_VOICEMAIL, 1);
			},
	
			/*
			//Still errors for some reason
			//Invoke Phone with PhoneArguments with bad parameters
			"blackberry.invoke.PhoneArguments should throw error on bad parameter types" : function() {
				try {
					var args = new blackberry.invoke.PhoneArguments(false, 'notBoolean', 'notNumber');
					args.view = blackberry.invoke.PhoneArguments.VIEW_CALL;     
					blackberry.invoke.invoke(blackberry.invoke.APP_PHONE, args);  
				} catch (err) {
					throw new Error(err);
				}
			},
			
			//Still errors for some reason
			//Invoke Phone with PhoneArguments with lineID set and VIEW_VOICEMAIL
			"blackberry.invoke.PhoneArguments should throw error on lineID set and VIEW_VOICEMAIL" : function() {
				try {
					var args = new blackberry.invoke.PhoneArguments('555-555-5555', true, 0);
					args.view = blackberry.invoke.PhoneArguments.VIEW_VOICEMAIL;     
					blackberry.invoke.invoke(blackberry.invoke.APP_PHONE, args);  
				} catch (err) {
					throw new Error(err);
				}
			},
			*/
			
			//Invoke Phone with no parameters defined
			"Manual Test 1 should invoke Phone with empty PhoneArguments": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be Phone application opening up");
				
				alert("Will attempt to invoke phone and passing empty PhoneArguments");
				var args = new blackberry.invoke.PhoneArguments();
                blackberry.invoke.invoke(blackberry.invoke.APP_PHONE, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Phone with no PhoneArguments with VIEW_CALL
			"Manual Test 2 should invoke Phone with PhoneArguments and VIEW_CALL": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be Phone application opening up");
				
				alert("Will attempt to invoke phone and passing PhoneArguments with VIEW_CALL");
				var args = new blackberry.invoke.PhoneArguments('555-555-5555', true);
				args.view = blackberry.invoke.PhoneArguments.VIEW_CALL; 
                blackberry.invoke.invoke(blackberry.invoke.APP_PHONE, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Phone with no PhoneArguments with VIEW_VOICEMAIL
			"Manual Test 3 should invoke Phone with PhoneArguments and VIEW_VOICEMAIL": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be Phone application opening up");
				
				alert("Will attempt to invoke phone and passing PhoneArguments with VIEW_VOICEMAIL");
				var args = new blackberry.invoke.PhoneArguments('555-555-5555', true);
				args.view = blackberry.invoke.PhoneArguments.VIEW_VOICEMAIL;
                blackberry.invoke.invoke(blackberry.invoke.APP_PHONE, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
        });

        return testCases;
    }
})();