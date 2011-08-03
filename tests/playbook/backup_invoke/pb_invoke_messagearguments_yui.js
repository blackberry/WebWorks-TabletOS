(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;
		
        testCases[0] = new Y.Test.Case({
            name: "blackberry.invoke for Message",
			
			_should: {
                error: {
                    
                }                
            },
			
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
			
			"blackberry.invoke.MessageArguments should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.MessageArguments);
			},
			
			"blackberry.invoke.MessageArguments.VIEW_NEW should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.MessageArguments.VIEW_NEW);
				Assert.areSame(blackberry.invoke.MessageArguments.VIEW_NEW, 0);
			},
			
			"blackberry.invoke.MessageArguments.VIEW_DEFAULT should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.MessageArguments.VIEW_DEFAULT);
				Assert.areSame(blackberry.invoke.MessageArguments.VIEW_DEFAULT, 1);
			},
			
			"blackberry.invoke.MessageArguments.VIEW_SAVED should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.MessageArguments.VIEW_SAVED);
				Assert.areSame(blackberry.invoke.MessageArguments.VIEW_SAVED, 2);
			},
			
			"blackberry.invoke.MessageArguments.VIEW_SEARCH should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.MessageArguments.VIEW_SEARCH);
				Assert.areSame(blackberry.invoke.MessageArguments.VIEW_SEARCH, 3);
			},
			
			//Invoke Message with no parameters
			"Manual Test 1 should invoke Message with no parameters": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Message compose shows up");
				
				//alert("Will attempt to invoke Message using MessageArguments with no parameters");
				var args = new blackberry.invoke.MessageArguments();
				args.view = blackberry.invoke.MessageArguments.VIEW_NEW; // New
				blackberry.invoke.invoke(blackberry.invoke.APP_MESSAGES, args);  // New Message
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Message with paramaters
			"Manual Test 2 should invoke Message with parameters": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Message compose shows up with info filled in");
				
				//alert("Will attempt to invoke Message using MessageArguments with parameters");
				var args = new blackberry.invoke.MessageArguments('foo@domain.com', 'hello', 'world');
				args.view = blackberry.invoke.MessageArguments.VIEW_NEW; // New
				blackberry.invoke.invoke(blackberry.invoke.APP_MESSAGES, args);  // New Message
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Message with paramaters
			"Manual Test 3 should invoke Message with parameters and a different VIEW": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Message compose shows up with info filled in even with VIEW_DEFAULT");
				
				//alert("Will attempt to invoke Message using MessageArguments with parameters but different view");
				var args = new blackberry.invoke.MessageArguments('foo@domain.com', 'hello', 'world');
				args.view = blackberry.invoke.MessageArguments.VIEW_DEFAULT; // New
				blackberry.invoke.invoke(blackberry.invoke.APP_MESSAGES, args);  // New Message
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Message with VIEW_DEFAULT
			"Manual Test 4 should invoke Message with VIEW_DEFAULT": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Message Inbox shows up");
				
				//alert("Will attempt to invoke Message using MessageArguments with VIEW_DEFAULT");
				var args = new blackberry.invoke.MessageArguments();
				args.view = blackberry.invoke.MessageArguments.VIEW_DEFAULT;
				blackberry.invoke.invoke(blackberry.invoke.APP_MESSAGES, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Message with VIEW_SAVED
			"Manual Test 5 should invoke Message with VIEW_SAVED": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Message Saved folder shows up");
				
				//alert("Will attempt to invoke Message using MessageArguments with VIEW_SAVED");
				var args = new blackberry.invoke.MessageArguments();
				args.view = blackberry.invoke.MessageArguments.VIEW_SAVED;
				blackberry.invoke.invoke(blackberry.invoke.APP_MESSAGES, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Message with VIEW_SEARCH
			"Manual Test 6 should invoke Message with VIEW_SEARCH": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Message search view shows up");
				
				//alert("Will attempt to invoke Message using MessageArguments with VIEW_SEARCH");
				var args = new blackberry.invoke.MessageArguments();
				args.view = blackberry.invoke.MessageArguments.VIEW_SEARCH;
				blackberry.invoke.invoke(blackberry.invoke.APP_MESSAGES, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
        
        });
		
        return testCases;
    }
})();