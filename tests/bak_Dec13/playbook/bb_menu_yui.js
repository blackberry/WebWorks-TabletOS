(function() {               
	//console.log('loading bb_menu_yui.js is beginning');
	var testing = blackberryNew.YUItests;
	
	testing.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases["suiteName"] = "blackberry.ui.menu TestSuite"; 
		
		//---------------------------------------------------------------------
		// Test cases for blackberry.ui.menu
		//---------------------------------------------------------------------
		testCases[0] = new Y.Test.Case({
			name: "blackberry.ui.menu Tests",
		    
			// blackberry.ui.menu should exist
			"blackberry.ui.menu should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.menu);
			},
		    // function blackberry.ui.menu.addMenuItem 
			"blackberry.ui.menu.addMenuItem should exist and be a type of Function" : function() {
				Assert.isNotUndefined(blackberry.ui.menu.addMenuItem);
				Assert.isFunction(blackberry.ui.menu.addMenuItem );
			},
			
			// function blackberry.ui.menu.clearMenuItems 
			"blackberry.ui.menu.clearMenuItems should exist and be a type of Function" : function() {
				Assert.isNotUndefined(blackberry.ui.menu.clearMenuItems);
				Assert.isFunction(blackberry.ui.menu.clearMenuItems);
			},
			
			// function blackberry.ui.menu.getMenuItems  
			"blackberry.ui.menu.getMenuItems should exist and be a type of Function" : function() {
				Assert.isNotUndefined(blackberry.ui.menu.getMenuItems);
				Assert.isFunction(blackberry.ui.menu.getMenuItems);
			},
			
			// function blackberry.ui.menu.hasMenuItem   
			"blackberry.ui.menu.hasMenuItem should exist and be a type of Function" : function() {
				Assert.isNotUndefined(blackberry.ui.menu.hasMenuItem);
				Assert.isFunction(blackberry.ui.menu.hasMenuItem);
			},
			
			// function blackberry.ui.menu.open    
			"blackberry.ui.menu.open should exist and be a type of Function" : function() {
				Assert.isNotUndefined(blackberry.ui.menu.open);
				Assert.isFunction(blackberry.ui.menu.open);
			},
	
			// function blackberry.ui.menu.removeMenuItem     
			"blackberry.ui.menu.removeMenuItem should exist and be a type of Function" : function() {
				Assert.isNotUndefined(blackberry.ui.menu.removeMenuItem );
				Assert.isFunction(blackberry.ui.menu.removeMenuItem );
			},
			
			// function blackberry.ui.menu.setDefaultMenuItem      
			"blackberry.ui.menu.setDefaultMenuItem should exist and be a type of Function" : function() {
				Assert.isNotUndefined(blackberry.ui.menu.setDefaultMenuItem  );
				Assert.isFunction(blackberry.ui.menu.setDefaultMenuItem  );
			}
           		
		     		
		});
		
		
		
		return testCases;
	}
	//console.log('loading bb_app_yui.js is done');
})();
