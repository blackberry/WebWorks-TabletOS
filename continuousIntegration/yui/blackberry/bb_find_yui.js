(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;		
		var filterTest;
			
        testCases[0] = new Y.Test.Case({
            name: "blackberry.find Existance Tests",
			
			/*
			 * Note: find tests are used individually in pim and message APIs.
			 */
			 
			setUp : function () {
				filterTest = new blackberry.find.FilterExpression("firstName", "==", "Eric");
			},
			
			"blackberry.find should exist" : function() {
				Assert.isNotUndefined(blackberry.find);
			},
		
			"blackberry.find.leftField should exist" : function() {
				Assert.isNotUndefined(filterTest.leftField);
			},
			
			"blackberry.find.operator should exist" : function() {
				Assert.isNotUndefined(filterTest.operator);
			},
			
			"blackberry.find.rightField should exist" : function() {
				Assert.isNotUndefined(filterTest.rightField);
			},
			
			"blackberry.find.negate should exist" : function() {
				Assert.isNotUndefined(filterTest.negate);
			},
			
        });

        return testCases;
    }
})();