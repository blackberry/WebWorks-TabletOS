(function() {               
	//console.log('loading blackberry_ui_dialog_yui.js is beginning');
	var testing = blackberryNew.YUItests;
	
	testing.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases["suiteName"] = "blackberry.ui.dialog TestSuite"; 
		
		//---------------------------------------------------------------------
		// Test cases for blackberry.ui.dialog
		//---------------------------------------------------------------------
		
	
		testCases[0] = new Y.Test.Case({
			name: "blackberry.ui.dialog Tests",
			
			setUp : function () {
				//Setup code goes here
				var body = document.getElementsByTagName("body")[0];
				
				//Create an instructions div if it doesn't already exist
				if (!document.getElementById('instructions')){
					var i = document.createElement('div');
					i.setAttribute('id', 'instructions');
					body.appendChild(i);
				}
			},
			
			tearDown : function () {
				//Reset the instructions after each test
				document.getElementById('instructions').innerHTML = "";
			},
			
	
		    // blackberry.ui.dialog should exist
			"blackberry.ui.dialog should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog);
			},
		    // function blackberry.ui.dialog.customAsk
			"blackberry.ui.dialog.customAsk should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.customAsk);
			},
			
			"blackberry.ui.dialog.customAsk should be a type of Function": function() {
				Assert.isFunction(blackberry.ui.dialog.customAsk);
			},
				
			// function blackberry.ui.dialog.standardAsk
			"blackberry.ui.dialog.standardAsk should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.standardAsk);
			},
			
			"blackberry.ui.dialog.standardAsk should be a type of Function": function() {
				Assert.isFunction(blackberry.ui.dialog.standardAsk);
			},
                       	
            "blackberry.ui.dialog.standardAsk(message: String, type: Number, callbackFunc) should work correctly": function() {
				var test = this;
				document.getElementById('instructions').innerHTML = "Click the OK button (3 seconds until the test fails)";
				blackberry.ui.dialog.standardAsk('Test', blackberry.ui.dialog.D_OK, function(ret) {
					Y.Assert.areEqual(ret, blackberry.ui.dialog.C_OK);  
					test.resume();
				});
				test.wait(function(){
					Assert.fail("OK button was not clicked within the 3 second window");
				}, 3000);
			},
			

			
			// const Number  D_OK  = 0 
			"blackberry.ui.dialog.D_OK should be a type of Number, with value 0": function() {
				Assert.isNumber(blackberry.ui.dialog.D_OK);
				Y.Assert.areEqual(0, blackberry.ui.dialog.D_OK, "D_OK should be 0");

			},
			//const Number  D_SAVE  = 1 
			"blackberry.ui.dialog.D_SAVE should be a type of Number, with value 1": function() {
				Assert.isNumber(blackberry.ui.dialog.D_SAVE);
				Y.Assert.areEqual(1, blackberry.ui.dialog.D_SAVE, "D_SAVE should be 1");

			},	
			//const Number  D_DELETE  = 2 
			"blackberry.ui.dialog.D_DELETE should be a type of Number, with value 2": function() {
				Assert.isNumber(blackberry.ui.dialog.D_DELETE);
				Y.Assert.areEqual(2, blackberry.ui.dialog.D_DELETE, "D_DELETE should be 2");

			},
			//const Number  D_YES_NO  = 3 
			"blackberry.ui.dialog.D_YES_NO should be a type of Number, with value 3": function() {
				Assert.isNumber(blackberry.ui.dialog.D_YES_NO);
				Y.Assert.areEqual(3, blackberry.ui.dialog.D_YES_NO, "D_YES_NO should be 3");

			},
			//const Number  D_OK_CANCEL  = 4 
			"blackberry.ui.dialog.D_OK_CANCEL should be a type of Number, with value 4": function() {
				Assert.isNumber(blackberry.ui.dialog.D_OK_CANCEL);
				Y.Assert.areEqual(4, blackberry.ui.dialog.D_OK_CANCEL, "D_OK_CANCEL should be 4");

			},
			//const Number  C_CANCEL  = -1 
			"blackberry.ui.dialog.C_CANCEL should be a type of Number, with value -1": function() {
				Assert.isNumber(blackberry.ui.dialog.C_CANCEL);
				Y.Assert.areEqual(-1, blackberry.ui.dialog.C_CANCEL, "C_CANCEL should be -1");

			},
			//const Number  C_OK  = 0 
			"blackberry.ui.dialog.C_OK should be a type of Number, with value 0": function() {
				Assert.isNumber(blackberry.ui.dialog.C_OK);
				Y.Assert.areEqual(0, blackberry.ui.dialog.C_OK, "C_OK should be 0");

			},
			//const Number  C_SAVE  = 1 
			"blackberry.ui.dialog.C_SAVE should be a type of Number, with value 1": function() {
				Assert.isNumber(blackberry.ui.dialog.C_SAVE);
				Y.Assert.areEqual(1, blackberry.ui.dialog.C_SAVE, "C_SAVE should be 1");

			},
			//const Number  C_DISCARD  = 2 
			"blackberry.ui.dialog.C_DISCARD should be a type of Number, with value 2": function() {
				Assert.isNumber(blackberry.ui.dialog.C_DISCARD);
				Y.Assert.areEqual(2, blackberry.ui.dialog.C_DISCARD, "C_DISCARD should be 2");

			},
			//const Number  C_DELETE  = 3 
			"blackberry.ui.dialog.C_DELETE should be a type of Number, with value 3": function() {
				Assert.isNumber(blackberry.ui.dialog.C_DELETE);
				Y.Assert.areEqual(3, blackberry.ui.dialog.C_DELETE, "C_DELETE should be 3");

			},
			//const Number  C_YES  = 4 
			"blackberry.ui.dialog.C_YES should be a type of Number, with value 4": function() {
				Assert.isNumber(blackberry.ui.dialog.C_YES);
				Y.Assert.areEqual(4, blackberry.ui.dialog.C_YES, "C_YES should be 4");

			},
			//const Number  C_NO  = -1  	
			"blackberry.ui.dialog.C_NO should be a type of Number, with value -1": function() {
				Assert.isNumber(blackberry.ui.dialog.C_NO);
				Y.Assert.areEqual(-1, blackberry.ui.dialog.C_NO, "C_NO should be -1");

			},
		     		
			/*	
			"blackberry.app.author should be readOnly": function() {
				var app_author = blackberry.app.author;
				blackberry.app.author = "changed author";
				Assert.areSame(app_author, blackberry.app.author, "blackberry.app.author cannot be changed."); 

			}
			*/
		});
		
		
		
		return testCases;
	}
	//console.log('loading bb_app_yui.js is done');
})();
