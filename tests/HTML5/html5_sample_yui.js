(function() {               
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases["suiteName"] = "html5 DOM tests";
		
		//---------------------------------------------------------------------
		// XML DOM tests
		//---------------------------------------------------------------------			


/*		
		testCases[1] = new Y.Test.Case({
			name: "blackberry.app.author Test",

			setUp : function () {
				//Setup code goes here
				
			},
			 
			tearDown : function () {
				//Teardown code goes here
				
			},
			
			"blackberry.app.author should exist" : function() {
				Assert.isNotUndefined(blackberry.app.author);
			},
		});
*/		
		return testCases;
	}
})();
