(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;
		var add;
			
        testCases[0] = new Y.Test.Case({
            name: "blackberry.pim.Address Tests",
			
			/*
			 * Note: All pim.Address tests will be come via contact methods since Address object only has information
			 */
			
			setUp : function () {
				add = new blackberry.pim.Address();
			},
			
			"blackberry.pim.Address should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Address);
			},
			
			"blackberry.pim.Address.address1 should exist" : function() {
				Assert.isNotUndefined(add.address1);
				Assert.isString(add.address1);
			},
			
			"blackberry.pim.Address.address2 should exist" : function() {
				Assert.isNotUndefined(add.address2);
				Assert.isString(add.address2);
			},
			
			"blackberry.pim.Address.city should exist" : function() {
				Assert.isNotUndefined(add.city);
				Assert.isString(add.city);
			},
			
			"blackberry.pim.Address.country should exist" : function() {
				Assert.isNotUndefined(add.country);
				Assert.isString(add.country);
			},
			
			"blackberry.pim.Address.stateProvince should exist" : function() {
				Assert.isNotUndefined(add.stateProvince);
				Assert.isString(add.stateProvince);
			},
			
			"blackberry.pim.Address.zipPostal should exist" : function() {
				Assert.isNotUndefined(add.zipPostal);
				Assert.isString(add.zipPostal);
			},
	
        });    

        return testCases;
    }
})();