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
			"MANUAL Test1 - should invoke Browser and go to a website by using BrowserArguments": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Browser should have opened and went to the RIM website");
				try{
				var link = "http://www.rim.com";
				var args = new blackberry.invoke.BrowserArguments(link);
				blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
				} catch(e){
				alert(e);
				}
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},					
			
			//Open up the browser and go to a site
			"MANUAL Test2 - should invoke Browser with a query string URL and go to a website by using BrowserArguments": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Browser should have opened and went to the RIM website");
				var link = "http://www.wolframalpha.com/input/?i=RIM";
				var args = new blackberry.invoke.BrowserArguments(link);
				blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},	
						
		    //Open up the browser and go to a site
			"MANUAL Test3 - should invoke Browser and go to a website by using a URL BrowserArguments without protocol": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Browser should have opened and went to the RIM website");
				try{
				var link = "www.rim.com";
				var args = new blackberry.invoke.BrowserArguments(link);
				blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
				} catch(e){
				alert(e);
				}
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},		
			
			//Open up the browser and go to a site
			"MANUAL Test4 - should invoke Browser and go to a website by using a URL BrowserArguments using HTTPS protocol": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Browser should have opened and went to the TD website");
				try{
				var link = "https://easyweb.tdcanadatrust.com/";
				var args = new blackberry.invoke.BrowserArguments(link);
				blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
				} catch(e){
				alert(e);
				}
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},		
			
			//Open up the browser and go to a site
			"MANUAL Test5 - should invoke Browser and go to a website by using a URL BrowserArguments using HTTPS protocol and port": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Browser should have opened and went to the TD website");
				try{
				var link = "https://easyweb.tdcanadatrust.com:443/";
				var args = new blackberry.invoke.BrowserArguments(link);
				blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
				} catch(e){
				alert(e);
				}
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},	
			//Open up the browser and go to a site
			"MANUAL Test6 - should invoke Browser and go to a website by using a URL BrowserArguments using HTTP protocol and port": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Browser should have opened and went to the atg05-yyz.rim.net:380/gears/default.htm");
				try{
				var link = "http://atg05-yyz.rim.net:380/gears/default.htm";
				var args = new blackberry.invoke.BrowserArguments(link);
				blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
				} catch(e){
				alert(e);
				}
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},		
			
			
			
        });

        return testCases;
    }
})();