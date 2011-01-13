(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;
			
        testCases[0] = new Y.Test.Case({
            name: "blackberry.invoke for BrowserArguments",
			
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
			
			"blackberry.invoke.BrowserArguments should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.BrowserArguments);
			},
			
			//Open up the browser and go to a site
			"Manual Test - should invoke Browser and go to a website": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Browser should have opened and went to the RIM website");
				
				//alert("Will attempt to invoke browser and go to RIM website");
				var link = "http://www.rim.com";
				var args = new blackberry.invoke.BrowserArguments(link);
				blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},					
			
        });

        return testCases;
    }
})();