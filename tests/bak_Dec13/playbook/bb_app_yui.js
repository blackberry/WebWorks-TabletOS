(function() {               
	//alert('loading bb_app_yui.js is beginning');
	var testing = blackberryNew.YUItests;
	
	testing.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases["suiteName"] = "blackberry.app TestSuite";
		
		//---------------------------------------------------------------------
		// Test static properties
		//---------------------------------------------------------------------

		testCases[0] = new Y.Test.Case({
			name: "blackberry.app.name Test",

			"blackberry.app.name should exist" : function() {
				Assert.isNotUndefined(blackberry.app.name);
			},
			
			"blackberry.app.name should be a type of String": function() {
				Assert.isNumber(blackberry.app.name);
			},
				
			"blackberry.app.name should be readOnly": function() {
				var app_name = blackberry.app.name;
				blackberry.app.name = "changed name";
				Assert.areSame(app_name, blackberry.app.name, "blackberry.app.name cannot be changed."); 

			}
		});
		
		testCases[1] = new Y.Test.Case({
			name: "blackberry.app.author Test",
		
			"blackberry.app.author should exist" : function() {
				Assert.isNotUndefined(blackberry.app.author);
			},
			
			"blackberry.app.author should be a type of String": function() {
				Assert.isString(blackberry.app.author);
			},
				
			"blackberry.app.author should be readOnly": function() {
				var app_author = blackberry.app.author;
				blackberry.app.author = "changed author";
				Assert.areSame(app_author, blackberry.app.author, "blackberry.app.author cannot be changed."); 

			}
		});
		
		testCases[2] = new Y.Test.Case({
			name: "blackberry.app.authorEmail Test",
			"blackberry.app.authorEmail should exist" : function() {
				Assert.isNotUndefined(blackberry.app.authorEmail);
			},
			
			"blackberry.app.authorEmail should be a type of String": function() {
				Assert.isString(blackberry.app.authorEmail);
			},
				
			"blackberry.app.authorEmail should be readOnly": function() {
				var app_authorEmail = blackberry.app.authorEmail;
				blackberry.app.authorEmail = "changed authorEmail";
				Assert.areSame(app_authorEmail, blackberry.app.authorEmail, "blackberry.app.authorEmail cannot be changed."); 

			}
		});	

		testCases[3] = new Y.Test.Case({
			name: "blackberry.app.event.onForeground Test",
			
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
			
			_should: {
				error: {
					"blackberry.app.event.onForeground() should throw an exception" : "java.lang.IllegalArgumentException: Required argument missing",
					"blackberry.app.event.onForeground(undefined) should throw an exception" : "TypeError: Invalid type",
					
				}
			},
			
			"blackberry.app.event.onForeground should exist" : function(){
				Assert.isNotUndefined(blackberry.app.event.onForeground);
			},
			
			"blackberry.app.event.onForeground() should throw an exception" : function(){
				try {
					blackberry.app.event.onForeground();
				}
				catch (e){
					throw new Error (e);
				}
			},
			
			"blackberry.app.event.onForeground(undefined) should throw an exception" : function(){
				try {
					blackberry.app.event.onForeground(undefined);
				}
				catch (e){
					throw new Error (e);
				}
			},
			
			"blackberry.app.event.onForeground should fire the callback when a foreground event occurs" : function(){
				var test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "Send the application to the background and then bring it back to the foreground (5 seconds until the test fails)";
			
				blackberry.app.event.onForeground(function(){
					test.resume();
				});
				
				test.wait(function(){
					Assert.fail("onForeground callback was not invoked within the 5 second window");
				}, 5000);
			},
		});	

		testCases[4] = new Y.Test.Case({
			name: "blackberry.app.event.onBackground Test",
			
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
			
			_should: {
				error: {
					"blackberry.app.event.onBackground() should throw an exception" : "java.lang.IllegalArgumentException: Required argument missing",
					"blackberry.app.event.onBackground(undefined) should throw an exception" : "TypeError: Invalid type",
					
				}
			},
			
			"blackberry.app.event.onBackground should exist" : function(){
				Assert.isNotUndefined(blackberry.app.event.onBackground);
			},
			
			"blackberry.app.event.onBackground() should throw an exception" : function(){
				try {
					blackberry.app.event.onBackground();
				}
				catch (e){
					throw new Error (e);
				}
			},
			
			"blackberry.app.event.onBackground(undefined) should throw an exception" : function(){
				try {
					blackberry.app.event.onBackground(undefined);
				}
				catch (e){
					throw new Error (e);
				}
			},
			
			"blackberry.app.event.onBackground should fire the callback when a background event occurs" : function(){
				var test = this; 
				document.getElementById('instructions').innerHTML = "Send the application to the background (5 seconds until the test fails)";
				
				blackberry.app.event.onBackground(function(){
					test.resume();
				});
				
				test.wait(function(){
					Assert.fail("onBackground callback was not invoked within the 5 second window");
				}, 5000);
			},
		});	
		//alert('loading bb_app_yui.js is done');
		return testCases;
	}
})();
