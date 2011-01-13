(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;
			
        testCases[0] = new Y.Test.Case({
            name: "blackberry.invoke for Java",
			
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
			
			"blackberry.invoke.JavaArguments should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.JavaArguments);
			},
		
			//Invoke Java (Memo)
			"Manual Test 1 should invoke Search with SearchArguments with only appName": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Memo application should show up.");
				
				//alert("Will attempt to invoke Memo using JavaArguments");
				var args = new blackberry.invoke.JavaArguments('net_rim_bb_memo_app');
				blackberry.invoke.invoke(blackberry.invoke.APP_JAVA, args);  // Java
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"Manual Test 2 should invoke Java Application with JavaArguments and entrypoint": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("No test steps yet");
				
				//alert("Will attempt to invoke Memo using JavaArguments with entrypoint [NO TEST CASE YET]");
				//var args = new blackberry.invoke.JavaArguments('net_rim_bb_memo_app');
				//blackberry.invoke.invoke(blackberry.invoke.APP_JAVA, args);  // Java
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"Manual Test 3 should invoke Java Application with JavaArguments and entrypoint with parameters": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("No test steps yet");
				
				//alert("Will attempt to invoke Memo using JavaArguments with entrypoint/parameters [NO TEST CASE YET]");
				//var args = new blackberry.invoke.JavaArguments('net_rim_bb_memo_app');
				//blackberry.invoke.invoke(blackberry.invoke.APP_JAVA, args);  // Java
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
        
        });

        return testCases;
    }
})();