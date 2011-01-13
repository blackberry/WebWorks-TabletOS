(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;

        testCases[0] = new Y.Test.Case({
            name: "blackberry.invoke Main Tests",
			
			_should: {
                error: {
                    "blackberry.invoke.APP_ADDRESSBOOK should return invalid type when passed undefined" : "Invalid type: 'args'",
					"blackberry.invoke.APP_BROWSER should return invalid type when passed undefined" : "Invalid type: 'args'",
					"blackberry.invoke.APP_CALENDAR should return invalid type when passed undefined" : "Invalid type: 'args'",
					"blackberry.invoke.APP_CAMERA should return invalid type when passed undefined" : "Invalid type: 'args'",					
					"blackberry.invoke.APP_JAVA should return invalid type when passed undefined" : "Invalid type: 'args'",
					"blackberry.invoke.APP_MAPS should return invalid type when passed undefined" : "Invalid type: 'args'",
					"blackberry.invoke.APP_MEMO should return invalid type when passed undefined" : "Invalid type: 'args'",
					"blackberry.invoke.APP_MESSAGE should return invalid type when passed undefined" : "Invalid type: 'args'",				
					"blackberry.invoke.APP_PHONE should return invalid type when passed undefined" : "Invalid type: 'args'",
					"blackberry.invoke.APP_SEARCH should return invalid type when passed undefined" : "Invalid type: 'args'",
					"blackberry.invoke.APP_TASK should return invalid type when passed undefined" : "Invalid type: 'args'",									
					"blackberry.invoke.APP_JAVA should return undefined" : "Missing required argument: 'args'",
					"blackberry.invoke.APP_JAVA should return undefined" : "",
                }                
            },
			
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
			
			"blackberry.invoke should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke);
			},
			
			"blackberry.invoke.APP_ADDRESSBOOK should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_ADDRESSBOOK);
				Assert.areSame(blackberry.invoke.APP_ADDRESSBOOK, 0);
			},
			
			"blackberry.invoke.APP_BLUETOOTH_CONFIG should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_BLUETOOTH_CONFIG);
				Assert.areSame(blackberry.invoke.APP_BLUETOOTH_CONFIG, 1);
			},
			
			"blackberry.invoke.APP_CALCULATOR should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_CALCULATOR);
				Assert.areSame(blackberry.invoke.APP_CALCULATOR, 2);
			},
			
			"blackberry.invoke.APP_CALENDAR should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_CALENDAR);
				Assert.areSame(blackberry.invoke.APP_CALENDAR, 3);
			},
			
			"blackberry.invoke.APP_CAMERA should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_CAMERA);
				Assert.areSame(blackberry.invoke.APP_CAMERA, 4);
			},
			
			"blackberry.invoke.APP_MAPS should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_MAPS);
				Assert.areSame(blackberry.invoke.APP_MAPS, 5);
			},
			
			"blackberry.invoke.APP_MEMOPAD should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_MEMOPAD);
				Assert.areSame(blackberry.invoke.APP_MEMOPAD, 6);
			},
			
			"blackberry.invoke.APP_MESSAGES should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_MESSAGES);
				Assert.areSame(blackberry.invoke.APP_MESSAGES, 7);
			},
			
			"blackberry.invoke.APP_PHONE should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_PHONE);
				Assert.areSame(blackberry.invoke.APP_PHONE, 8);
			},
			
			"blackberry.invoke.APP_SEARCH should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_SEARCH);
				Assert.areSame(blackberry.invoke.APP_SEARCH, 9);
			},
			
			"blackberry.invoke.APP_TASKS should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_TASKS);
				Assert.areSame(blackberry.invoke.APP_TASKS, 10);
			},
			
			"blackberry.invoke.APP_BROWSER should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_BROWSER);
				Assert.areSame(blackberry.invoke.APP_BROWSER, 11);
			},
			
			"blackberry.invoke.APP_JAVA should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_JAVA);
				Assert.areSame(blackberry.invoke.APP_JAVA, 12);
			},
	
			//Attempt to open up the address book when passing a undefined
			"blackberry.invoke.APP_ADDRESSBOOK should return invalid type when passed undefined": function() {
				try {
					blackberry.invoke.invoke(blackberry.invoke.APP_ADDRESSBOOK, undefined);
				} catch (err) {
					throw new Error(err);
				}
			},	
			
			//Attempt to open up the browser when passing a undefined
			"blackberry.invoke.APP_BROWSER should return invalid type when passed undefined": function() {
				try {
					blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, undefined);
				} catch (err) {
					throw new Error(err);
				}
			},
			
			//Attempt to open up the calendar when passing a undefined
			"blackberry.invoke.APP_CALENDAR should return invalid type when passed undefined": function() {
				try {
					blackberry.invoke.invoke(blackberry.invoke.APP_CALENDAR, undefined);
				} catch (err) {
					throw new Error(err);
				}
			},
			
			//Attempt to open up the camera when passing a undefined
			"blackberry.invoke.APP_CAMERA should return invalid type when passed undefined": function() {
				try {
					blackberry.invoke.invoke(blackberry.invoke.APP_CAMERA, undefined);
				} catch (err) {
					throw new Error(err);
				}
			},
			
			//Attempt to open up the java application when passing a undefined
			"blackberry.invoke.APP_JAVA should return invalid type when passed undefined": function() {
				try {
					blackberry.invoke.invoke(blackberry.invoke.APP_JAVA, undefined);
				} catch (err) {
					throw new Error(err);
				}
			},
			
			//Attempt to open up the maps when passing a undefined
			"blackberry.invoke.APP_MAPS should return invalid type when passed undefined": function() {
				try {
					blackberry.invoke.invoke(blackberry.invoke.APP_MAPS, undefined);
				} catch (err) {
					throw new Error(err);
				}
			},
			
			//Attempt to open up the memo when passing a undefined
			"blackberry.invoke.APP_MEMO should return invalid type when passed undefined": function() {
				try {
					blackberry.invoke.invoke(blackberry.invoke.APP_MEMOPAD, undefined);
				} catch (err) {
					throw new Error(err);
				}
			},
			
			//Attempt to open up the message when passing a undefined
			"blackberry.invoke.APP_MESSAGE should return invalid type when passed undefined": function() {
				try {
					blackberry.invoke.invoke(blackberry.invoke.APP_MESSAGES, undefined);
				} catch (err) {
					throw new Error(err);
				}
			},
			
			//Attempt to open up the phone when passing a undefined
			"blackberry.invoke.APP_PHONE should return invalid type when passed undefined": function() {
				try {
					blackberry.invoke.invoke(blackberry.invoke.APP_PHONE, undefined);
				} catch (err) {
					throw new Error(err);
				}
			},
			
			//Attempts to open up Search when passing a undefined
			"blackberry.invoke.APP_SEARCH should return invalid type when passed undefined": function() {
				try {
					blackberry.invoke.invoke(blackberry.invoke.APP_SEARCH, undefined);
				} catch (err) {
					throw new Error(err);
				}
			},
			
			//Attempts to open up Task when passing a undefined
			"blackberry.invoke.APP_TASK should return invalid type when passed undefined": function() {
				try {
					blackberry.invoke.invoke(blackberry.invoke.APP_TASKS, undefined);
				} catch (err) {
					throw new Error(err);
				}
			},
			
			//Attempts to invoke basic APP_JAVA without parameters
			"blackberry.invoke.APP_JAVA should return undefined": function() {
				try {
					blackberry.invoke.invoke(blackberry.invoke.APP_JAVA);
				} catch (err) {
					throw new Error(err);
				}
			},
			
			//Attempts to invoke basic APP_JAVA with null
			"blackberry.invoke.APP_JAVA should return undefined when passed a null": function() {
				try {
					blackberry.invoke.invoke(blackberry.invoke.APP_JAVA, null);
				} catch (err) {
					throw new Error(err);
				}
			},
			
			//Manual tests here for invoke just opens up basic applications without passing parameters
			//Passing parameters are tests that will be run in other invoke YUI js files
		
			//Invoke Basic Addressbook
			"Manual Test 1 should invoke addressbook": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("");
				
				alert("Will attempt to invoke the Addressbook application");
				blackberry.invoke.invoke(blackberry.invoke.APP_ADDRESSBOOK);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Basic Bluetooth Config
			"Manual Test 2 should invoke Bluetooth Config": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("");
				
				alert("Will attempt to invoke the Bluetooth Config screen application");
				blackberry.invoke.invoke(blackberry.invoke.APP_BLUETOOTH_CONFIG);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Basic Calculator
			"Manual Test 3 should invoke Calculator": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("");
				
				alert("Will attempt to invoke the Calculator application");
				blackberry.invoke.invoke(blackberry.invoke.APP_CALCULATOR);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Basic Calendar
			"Manual Test 4 should invoke Calendar": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("");
				
				alert("Will attempt to invoke the Calendar application");
				blackberry.invoke.invoke(blackberry.invoke.APP_CALENDAR);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Basic Maps
			"Manual Test 5 should invoke Maps": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("");
				
				alert("Will attempt to invoke the Maps application");
				blackberry.invoke.invoke(blackberry.invoke.APP_MAPS);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Basic Memopad
			"Manual Test 6 should invoke Memopad": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("");
				
				alert("Will attempt to invoke the Memopad application");
				blackberry.invoke.invoke(blackberry.invoke.APP_MEMOPAD);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Basic Messages
			"Manual Test 7 should invoke Messages": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("");
				
				alert("Will attempt to invoke the Messages application");
				blackberry.invoke.invoke(blackberry.invoke.APP_MESSAGES);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Basic Phone
			"Manual Test 8 should invoke Phone": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("");
				
				alert("Will attempt to invoke the Phone application");
				blackberry.invoke.invoke(blackberry.invoke.APP_PHONE);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Basic Search
			"Manual Test 9 should invoke Search": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("");
				
				alert("Will attempt to invoke the Search application");
				blackberry.invoke.invoke(blackberry.invoke.APP_SEARCH);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Basic Tasks
			"Manual Test 10 should invoke Tasks": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("");
				
				alert("Will attempt to invoke the Tasks application");
				blackberry.invoke.invoke(blackberry.invoke.APP_TASKS);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Basic Browser
			"Manual Test 11 should invoke Browser": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("");
				
				alert("Will attempt to invoke the Browser application");
				blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},								
			
			//Open up the address book when passing a null
			"Manual Test 1 should invoke Address Book when parameter is a null": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be address book opening up");
				
				alert("Will attempt to invoke address book with a null");
				blackberry.invoke.invoke(blackberry.invoke.APP_ADDRESSBOOK, null);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Open up the browser when passing a null
			"Manual Test 2 should invoke Browser when parameter is a null": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be browser opening up but not going anywhere");
				
				alert("Will attempt to invoke browser and pass a null");
				blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, null);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Open up the calendar when passing a null
			"Manual Test 3 should invoke Calendar when parameter is a null": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be calendar opening up");
				
				alert("Will attempt to invoke Calendar and pass a null");
				blackberry.invoke.invoke(blackberry.invoke.APP_CALENDAR, null);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Open up the camera when passing a null
			"Manual Test 3 should invoke Calendar when parameter is a null": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be camera opening up");
				
				alert("Will attempt to invoke Calendar and pass a null");
				blackberry.invoke.invoke(blackberry.invoke.APP_CALENDAR, null);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Open up the camera when passing a null
			"Manual Test 4 should invoke Camera when parameter is a null": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be camera opening up");
				
				alert("Will attempt to invoke Camera and pass a null");
				blackberry.invoke.invoke(blackberry.invoke.APP_CAMERA, null);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Open up the maps when passing a null
			"Manual Test 5 should invoke Maps when parameter is a null": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be Maps opening up");
				
				alert("Will attempt to invoke Maps and pass a null");
				blackberry.invoke.invoke(blackberry.invoke.APP_MAPS, null);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Open up the memo when passing a null
			"Manual Test 6 should invoke Memo when parameter is a null": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be memo opening up");
				
				alert("Will attempt to invoke Memo and pass a null");
				blackberry.invoke.invoke(blackberry.invoke.APP_MEMOPAD, null);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Open up the message when passing a null
			"Manual Test 7 should invoke Message when parameter is a null": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be message opening up");
				
				alert("Will attempt to invoke Messages and pass a null");
				blackberry.invoke.invoke(blackberry.invoke.APP_MESSAGES, null);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},		
			
			//Open up the phone when passing a null
			"Manual Test 8 should invoke Phone when parameter is a null": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be phone opening up");
				
				alert("Will attempt to invoke Phone and pass a null");
				blackberry.invoke.invoke(blackberry.invoke.APP_PHONE, null);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Open up the search when passing a null
			"Manual Test 9 should invoke Search when parameter is a null": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be search opening up");
				
				alert("Will attempt to invoke Search and pass a null");
				blackberry.invoke.invoke(blackberry.invoke.APP_SEARCH, null);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Open up the task when passing a null
			"Manual Test 10 should invoke Tasks when parameter is a null": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be task opening up");
				
				alert("Will attempt to invoke Task and pass a null");
				blackberry.invoke.invoke(blackberry.invoke.APP_TASKS, null);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
		
		});

        return testCases;
    }
})();