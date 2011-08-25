(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;
		
        testCases[0] = new Y.Test.Case({
            name: "blackberry.invoke for Maps",
			
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
			
			"blackberry.invoke.MapsArguments should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.MapsArguments);
			},
		
			//Invoke Maps with empty MapsArguments
			"Manual Test 1 should invoke Maps with empty MapsArguments": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Maps shoulds show up with default view");
				
				//alert("Will attempt to invoke Maps with empty MapsArgument");
				var args = new blackberry.invoke.MapsArguments();
				blackberry.invoke.invoke(blackberry.invoke.APP_MAPS,args);   
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Maps with lat/long MapsArguments
			"Manual Test 2 should invoke Maps with lat/long MapsArguments": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Maps shoulds show up with proper coordinates");
				
				//alert("Will attempt to invoke Maps with lat/long MapsArgument");
				var args = new blackberry.invoke.MapsArguments(43.67750, -80.73390);
				blackberry.invoke.invoke(blackberry.invoke.APP_MAPS,args);   
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
        
			//Invoke Maps with Document MapsArguments (5.0 Test)
			"Manual Test 3 [5.0] should invoke Maps with Document MapsArguments": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Maps shoulds show up with proper coordinates");
				
				//alert("[5.0 ONLY] Will attempt to invoke Maps with Document MapsArgument");
				var parser = new DOMParser();               
                var doc = parser.parseFromString("<lbs id='Lake Conservation'><location  lat='43.67750' lon='-80.73390'  label='Lake conservation' description='Go Leafs Go!' zoom='6'/></lbs>", "text/xml");                
                var args = new blackberry.invoke.MapsArguments(doc);
                blackberry.invoke.invoke(blackberry.invoke.APP_MAPS, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Maps with Document(String) MapsArguments (6.0 Test)
			"Manual Test 4 [6.0] should invoke Maps with Document(String) MapsArguments": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Maps shoulds show up with proper coordinates");
				
				//alert("[6.0 ONLY] Will attempt to invoke Maps with Document(String) MapsArgument");
				var xmlString = "<lbs id='Lake Conservation'><location  lat='4367750' lon='-8073390'  label='Lake conservation' description='Go Leafs Go!' zoom='6'/></lbs>";
                var args = new blackberry.invoke.MapsArguments(xmlString);
                blackberry.invoke.invoke(blackberry.invoke.APP_MAPS, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Maps with Address MapsArguments
			"Manual Test 5 should invoke Maps with Address MapsArguments": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Maps shoulds show up with proper coordinates of Address");
				
				//alert("Will attempt to invoke Maps with Address MapsArgument");
				var workAddress = new blackberry.pim.Address();
                workAddress.country = "Canada";
                workAddress.city = "Mississauga";
                workAddress.address1 = "Tahoe Blvd";
                workAddress.stateProvince = "Ontario";
                var args = new blackberry.invoke.MapsArguments(workAddress);
                blackberry.invoke.invoke(blackberry.invoke.APP_MAPS, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Negative Cases?
		
        });

        return testCases;
    }
})();