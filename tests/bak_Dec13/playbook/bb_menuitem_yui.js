(function() {               
	//console.log('loading bb_menuitem_yui.js is beginning');
	var testing = blackberryNew.YUItests;
	
	testing.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases["suiteName"] = "blackberry.ui.menu.MenuItem TestSuite"; 
		
		//---------------------------------------------------------------------
		// Test cases for blackberry.ui.menu
		//---------------------------------------------------------------------
		testCases[0] = new Y.Test.Case({
			name: "blackberry.ui.menu.MenuItemTests",
		    
			// blackberry.ui.menu.MenuItem should exist
			"blackberry.ui.menu.MenuItem should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.menu);
			},
		    // Constructor blackberry.ui.menu.MenuItem  
			"blackberry.ui.menu.addMenuItem should exist and be a type of Function" : function() {
				Assert.isNotUndefined(blackberry.ui.menu.addMenuItem);
				Assert.isFunction(blackberry.ui.menu.addMenuItem );
			},
			
			
           		
		     		
		});
		
		
		
		return testCases;
	}
	//console.log('loading bb_app_yui.js is done');
})();
