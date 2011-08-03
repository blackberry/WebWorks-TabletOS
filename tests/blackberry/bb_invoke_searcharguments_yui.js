(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;

        testCases[0] = new Y.Test.Case({
            name: "blackberry.invoke for Search",
			
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
		
			"blackberry.invoke.SearchArguments should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.SearchArguments);
			},
        
			//Invoke Search with no parameters defined
			"Manual Test 1 should invoke Search with empty SearchArguments": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be Search application opening up");
				
				alert("Will attempt to invoke search and passing empty SearchArguments");
				var args = new blackberry.invoke.SearchArguments();
                blackberry.invoke.invoke(blackberry.invoke.APP_SEARCH, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Search with text only
			"Manual Test 2 should invoke Search with SearchArguments with only text set": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be Search application opening up and text string appearing");
				
				alert("Will attempt to invoke search with SearchArguments with only text set");
				var args = new blackberry.invoke.SearchArguments('text', '');
                blackberry.invoke.invoke(blackberry.invoke.APP_SEARCH, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Search with name only
			"Manual Test 3 should invoke Search with SearchArguments with only name set": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be Search application opening up and name string appearing");
				
				alert("Will attempt to invoke search with SearchArguments with only name set");
				var args = new blackberry.invoke.SearchArguments('', 'name');
                blackberry.invoke.invoke(blackberry.invoke.APP_SEARCH, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			
			//Invoke Search with both text/name
			"Manual Test 4 should invoke Search with SearchArguments with text/name set": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be Search application opening up and text/name string appearing");
				
				alert("Will attempt to invoke search with SearchArguments with text/name set");
				var args = new blackberry.invoke.SearchArguments('text', 'name');
                blackberry.invoke.invoke(blackberry.invoke.APP_SEARCH, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
		
        });

        return testCases;
    }
})();