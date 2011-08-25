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
                    "blackberry.app.requestBackground should return an error" : "Too many arguments",
					"blackberry.app.requestForeground should return an error" : "Too many arguments",
					"blackberry.app.setHomeScreenIcon should return an error" : "Argument is not nullable",
					"blackberry.app.setHomeScreenName should return an error" : "Required argument missing",
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
			
			"blackberry.app.isForeground should exist" : function() {
				Assert.isNotUndefined(blackberry.app.isForeground);
				Assert.isBoolean(blackberry.app.isForeground);
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
            
            "blackberry.app.exit should return an error": function() {
                try {
                    blackberry.app.exit("ppp");          
                } catch (err) {
                    throw new Error(err);   
                }
            },
            
            "blackberry.app.requestBackground should return an error": function() {
				try {
					blackberry.app.requestBackground("ppp");
				} catch (err) {
					throw new Error(err);
				}
            },			
            
            "blackberry.app.requestForeground should return an error": function() {
				try {
					blackberry.app.requestForeground("ppp");
				} catch (err) {
					throw new Error(err);
				}
            },
            
            "blackberry.app.setHomeScreenIcon should return an error": function() {
				try {
					blackberry.app.setHomeScreenIcon(null);
				} catch (err) {
					throw new Error(err);
				}  
            },
            
            "blackberry.app.setHomeScreenName should return an error": function() {
				try {      
					blackberry.app.setHomeScreenName();
				} catch (err) {
					throw new Error(err);
				}
            },

			"blackberry.app properties should be readonly": function() {
				var readOnly = false;
				
				var author = blackberry.app.author;
				var authorEmail = blackberry.app.authorEmail;
				var copyright = blackberry.app.copyright;
				var description = blackberry.app.description;
				var id = blackberry.app.id;
				var isForeground = blackberry.app.isForeground;
				var license = blackberry.app.license;
				var licenseURL = blackberry.app.licenseURL;
				var name = blackberry.app.name;
				var version = blackberry.app.version;
				
				blackberry.app.author = "Incorrect Author";
				blackberry.app.authorEmail = "incorrect@email.com";
				blackberry.app.copyright = "1234";
				blackberry.app.description = "Incorrect Description";
				blackberry.app.id = "incorrect id";
				blackberry.app.isForeground = false;
				blackberry.app.license = "Incorrect License";
				blackberry.app.licenseURL = "IncorrectLicenseUrl";
				blackberry.app.name = "Incorrect Name";
				blackberry.app.version = "9.9.9";
				
				if (author == blackberry.app.author && authorEmail == blackberry.app.authorEmail &&
				copyright == blackberry.app.copyright && description == blackberry.app.description &&
				id == blackberry.app.id && isForeground == blackberry.app.isForeground &&
				license == blackberry.app.license && licenseURL == blackberry.app.licenseURL &&
				name == blackberry.app.name && version == blackberry.app.version) {
					readOnly = true;
				}				
				
				Assert.isTrue(readOnly)
            },
			
			//app.exit() function will not work as it closes the widget					
			
			//requestBackground
			"Manual Test 1 should put application into the background": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Application should have gone into the background.<br />Pass this test if this is true.  Otherwise, fail.");
				
				alert("Application is going to call app.requestBackground and send application into background");
				blackberry.app.requestBackground();
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//requestForeground
			"Manual Test 2 should put application into the background and then foreground": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Application will go into background and then foreground.<br />Pass this test if this is true.  Otherwise, fail.");
				
				alert("Application is going to background for 3 seconds and then call app.requestForeground and go back into foreground");
				blackberry.app.requestBackground();
				setTimeout('blackberry.app.requestForeground()', 3000);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//setHomeScreenIcon (Local)
			"Manual Test 3 should set the homescreen icon to a local image": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Sets homescreen icon to local image.<br />Pass this test if this is true.  Otherwise, fail.");
				var uri = "local:///img/sample2.gif";
				alert("Will attempt to set homescreen icon to local image");
				blackberry.app.setHomeScreenIcon(uri);
				alert("HomeScreenIcon has been set");
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//setHomeScreenIcon (External)
			"Manual Test 4 should set the homescreen icon to an external image": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Sets homescreen icon to an external image.<br />Pass this test if this is true.  Otherwise, fail.");
				var uri = "http://www.rim.com/images/layout/new_layout/topleft.gif";
				alert("Will attempt to set homescreen icon to external image");
				blackberry.app.setHomeScreenIcon(uri);
				alert("HomeScreenIcon has been set");
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//setHomeScreenIcon (hover)
			"Manual Test 5 should set the homescreen icon hover to an image": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Sets homescreen icon hover to an image.<br />Pass this test if this is true.  Otherwise, fail.");
				var uri = "http://www.rim.com/images/layout/new_layout/home_infoarea_smartphones.jpg";
				alert("Will attempt to set homescreen icon hover to image");
				blackberry.app.setHomeScreenIcon(uri, true);
				alert("HomeScreenIcon hover has been set");
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//setHomeScreenName
			"Manual Test 6 should set the homescreen name to Hello World": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Sets homescreen name to 'Hello World'<br />Pass this test if this is true.  Otherwise, fail.");
				alert("Will attempt to set homescreen name to 'Hello World'");
				blackberry.app.setHomeScreenName("Hello World");
				alert("HomeScreenName has been set");
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Show all Properties
			"Manual Test 7 should show all the application properties": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Shows all application properties<br />Pass this test if this is true.  Otherwise, fail.");
				alert("Will attempt to show all blackberry.app properties");
				alert('author='+ blackberry.app.author);
				alert('authorEmail=' + blackberry.app.authorEmail);
				alert('authorURL=' + blackberry.app.authorURL);
				alert('copyright=' + blackberry.app.copyright);
				alert('description=' + blackberry.app.description);
				alert('id=' + blackberry.app.id);
				alert('isForeground=' + blackberry.app.isForeground);
				alert('license=' + blackberry.app.license);
				alert('licenseURL=' + blackberry.app.licenseURL);
				alert('name=' + blackberry.app.name);
				alert('version=' + blackberry.app.version);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//app.event.onExit() (set and unset) - will not work as it closes the widget and kills YUI - needs to be tested manually
			
			//onBackground (set)
			"blackberry.app.event onBackground event should trigger when application is set to background": function() {
				
				//Sets flag and makes sure the application is in the foreground to start the test
				var eventFlag = false;
				blackberry.app.requestForeground();				
				
				//Sets onBackground event to function that sets a flag to be true
				//Then puts application into the background
				blackberry.app.event.onBackground(function() { eventFlag = true; });
				blackberry.app.requestBackground();
				setTimeout('Assert.isTrue(eventFlag)', 500);
            },
			
			//onBackground (unset)
			"blackberry.app.event onBackground event should not trigger when application is set to background": function() {
				
				//Sets flag and makes sure the application is in the foreground to start the test
				var eventFlag = false;
				blackberry.app.requestForeground();
				
				//Sets onBackground event to something and then unsets it
				//Then puts application into the background
				blackberry.app.event.onBackground(function() { eventFlag = true; });
				blackberry.app.event.onBackground(null);
				blackberry.app.requestBackground();				
				
				//eventFlag should remain false since event function has nothing in it
				setTimeout('Assert.isFalse(eventFlag)', 500);
            },
			
			//onForeground (set)
			"blackberry.app.event onForeground event should trigger when application is set to foreground": function() {
				
				//Sets flag and makes sure the application is in the foreground to start the test
				var eventFlag = false;
				blackberry.app.requestForeground();
				
				
				//Sets onForeground event to function that sets a flag to be true
				//Puts application into background, waits 3 seconds and puts application in foreground
				blackberry.app.event.onForeground(function() { eventFlag = true; });
				blackberry.app.requestBackground();
				setTimeout('blackberry.app.requestForeground()', 3000);								
				setTimeout('Assert.isTrue(eventFlag)', 500);
            },
			
			//onForeground (unset)
			"blackberry.app.event onForeground event should not trigger when application is set to foreground": function() {
				
				//Sets flag and makes sure the application is in the foreground to start the test
				var eventFlag = false;
				blackberry.app.requestForeground();
				
				//Sets onForeground event to something and then unsets it
				//Puts application into background, waits 3 seconds and puts application in foreground				
				blackberry.app.event.onForeground(function() { eventFlag = true; });
				blackberry.app.event.onForeground(null);
				blackberry.app.requestBackground();
				setTimeout('blackberry.app.requestForeground()', 3000);								
				
				//eventFlag should remain false since event function has nothing in it
				setTimeout('Assert.isFalse(eventFlag)', 500);
            },

        });

        return testCases;
    }
})();