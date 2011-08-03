(function() {               
	//console.log('loading bb_invoke_yui.js is beginning');
	var testing = blackberryNew.YUItests;
	
	testing.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases["suiteName"] = "blackberry.invoke.MenuItem TestSuite"; 
		
		//---------------------------------------------------------------------
		// Test cases for blackberry.invoke
		//---------------------------------------------------------------------
		testCases[0] = new Y.Test.Case({
			name: "blackberry.invoke Tests",
		    
			// blackberry.invoke should exist
			"blackberry.invoke should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke);
			},
		    // function blackberry.invoke.invoke   
			"blackberry.invoke.invoke  should exist and be a type of Function" : function() {
				Assert.isNotUndefined(blackberry.invoke.invoke);
				Assert.isFunction(blackberry.invoke.invoke);
			},
			
			const Number  APP_ADDRESSBOOK  = 0 
			const Number  APP_BLUETOOTH_CONFIG  = 1 
			const Number  APP_CALCULATOR  = 2 
			const Number  APP_CALENDAR  = 3 
			const Number  APP_CAMERA  = 4 
			const Number  APP_MAPS  = 5 
			const Number  APP_MEMOPAD  = 6 
			const Number  APP_MESSAGES  = 7 
			const Number  APP_PHONE  = 8 
			const Number  APP_SEARCH  = 9 
			const Number  APP_TASKS  = 10 
			const Number  APP_BROWSER  = 11 
			const Number  APP_JAVA  = 12  
           		
		     		
		});
		
		
		
		return testCases;
	}
	//console.log('loading bb_app_yui.js is done');
})();
