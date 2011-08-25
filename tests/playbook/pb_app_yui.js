(function() {
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y) {
		var testCases = new Array();
		var Assert = Y.Assert;
			
			testCases[0] = new Y.Test.Case({
			name: "blackberry.app Tests",
			
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
			
			_should: {
				error: {
					"blackberry.app.exit should return an error" : "Too many arguments",
				}                
			},
			
			"blackberry.app should exist" : function() {
				Assert.isNotUndefined(blackberry.app);
			},
			
			"blackberry.app.event should exist" : function() {
				Assert.isNotUndefined(blackberry.app.event);
			},
			
			"blackberry.app.author should exist" : function() {
				Assert.isNotUndefined(blackberry.app.author);
				Assert.isString(blackberry.app.author);
			},
			
			"blackberry.app.authorEmail should exist" : function() {
				Assert.isNotUndefined(blackberry.app.authorEmail);
				Assert.isString(blackberry.app.authorEmail);
			},
			
			"blackberry.app.authorURL should exist" : function() {
				Assert.isNotUndefined(blackberry.app.authorURL);
				Assert.isString(blackberry.app.authorURL);
			},
			
			"blackberry.app.copyright should exist" : function() {
				Assert.isNotUndefined(blackberry.app.copyright);
				Assert.isString(blackberry.app.copyright);
			},
			
			"blackberry.app.description should exist" : function() {
				Assert.isNotUndefined(blackberry.app.description);
				Assert.isString(blackberry.app.description);
			},
			
			"blackberry.app.id should exist" : function() {
				Assert.isNotUndefined(blackberry.app.id);
				Assert.isString(blackberry.app.id);
			},
			"blackberry.app.license should exist" : function() {
				Assert.isNotUndefined(blackberry.app.license);
				Assert.isString(blackberry.app.license);
			},
			
			"blackberry.app.licenseURL should exist" : function() {
				Assert.isNotUndefined(blackberry.app.licenseURL);
				Assert.isString(blackberry.app.licenseURL);
			},
			
			"blackberry.app.name should exist" : function() {
				Assert.isNotUndefined(blackberry.app.name);
				Assert.isString(blackberry.app.name);
			},
			
			"blackberry.app.version should exist" : function() {
				Assert.isNotUndefined(blackberry.app.version);
				Assert.isString(blackberry.app.version);
			},						
			
		
			"blackberry.app.exit should exist and be type of function": function() {
			    Assert.isNotUndefined(blackberry.app.exit);
				Assert.isFunction(blackberry.app.exit);  
			
			},
			
			
			"blackberry.app properties should be readonly": function() {
				var readOnly = false;
				
				var author = blackberry.app.author;
				var authorEmail = blackberry.app.authorEmail;
				var copyright = blackberry.app.copyright;
				var description = blackberry.app.description;
				var id = blackberry.app.id;
				//var isForeground = blackberry.app.isForeground;
				var license = blackberry.app.license;
				var licenseURL = blackberry.app.licenseURL;
				var name = blackberry.app.name;
				var version = blackberry.app.version;
				try{
				blackberry.app.author = "Incorrect Author";
				blackberry.app.authorEmail = "incorrect@email.com";
				blackberry.app.copyright = "1234";
				blackberry.app.description = "Incorrect Description";
				blackberry.app.id = "incorrect id";
				//blackberry.app.isForeground = false;
				blackberry.app.license = "Incorrect License";
				blackberry.app.licenseURL = "IncorrectLicenseUrl";
				blackberry.app.name = "Incorrect Name";
				blackberry.app.version = "9.9.9";
				}catch(e){
				}
				if (author == blackberry.app.author && authorEmail == blackberry.app.authorEmail &&
				copyright == blackberry.app.copyright && description == blackberry.app.description &&
				id == blackberry.app.id && 
				license == blackberry.app.license && licenseURL == blackberry.app.licenseURL &&
				name == blackberry.app.name && version == blackberry.app.version) {
					readOnly = true;
				}				
				
				Assert.isTrue(readOnly)
            },
			
			
			//Show all Properties
			"Manual Test - should show all the application properties": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Shows all application properties<br />Pass this test if this is true.  Otherwise, fail.");
				alert("Will attempt to show all blackberry.app properties");
				alert('author='+ blackberry.app.author);
				alert('authorEmail=' + blackberry.app.authorEmail);
				alert('authorURL=' + blackberry.app.authorURL);
				alert('copyright=' + blackberry.app.copyright);
				alert('description=' + blackberry.app.description);
				alert('id=' + blackberry.app.id);
				//alert('isForeground=' + blackberry.app.isForeground);
				alert('license=' + blackberry.app.license);
				alert('licenseURL=' + blackberry.app.licenseURL);
				alert('name=' + blackberry.app.name);
				alert('version=' + blackberry.app.version);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
		
			//onBackground (set)
			"Manual Test - blackberry.app.event onBackground event should trigger when application is set to background": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("1. Manually move the application to background \n  2. Move the application to foreground again");
				//Sets flag and makes sure the application is in the foreground to start the test
				var eventFlag = false;
				//Sets onBackground event to function that sets a flag to be true
				//Then puts application into the background
				blackberry.app.event.onBackground(function() { 
				                                 eventFlag = true; 
												 framework.test.resume(function (){ Assert.areEqual(eventFlag, true); blackberry.app.event.onBackground(null);});
                                                 });												 
				framework.test.wait(function(){
					Assert.fail(" blackberry.app.event onBackground event failed");
				}, 5*60*1000);								
			},
			
			//onForeground (set)
			"Manual Test - blackberry.app.event onForeground event should trigger when application is set to foreground": function() {
				//alert('ppp');
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("1. Manually move the application to background  2. Move the application to foreground again");
				//Sets flag and makes sure the application is in the foreground to start the test
				var eventFlag1 = false;
				//Sets onForeground event to function that sets a flag to be true
				//Then puts application into the background
				blackberry.app.event.onForeground(function() { 
				                                 eventFlag1 = true; 
												 framework.test.resume(function (){ Assert.areEqual(eventFlag1, true); blackberry.app.event.onForeground(null);});
                                                 });												 
				framework.test.wait(function(){
					Assert.fail(" blackberry.app.event onForeground event failed");
				}, 5*60*1000);		
			}
			
		});
		
		return testCases;
	}
})();