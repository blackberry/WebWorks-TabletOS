(function() {  
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		//---------------------------------------------------------------------
		// Test methods - names must begin with "test"
		// or to contain the word "should" when a "friendly name" is used
		//---------------------------------------------------------------------
		
		//---------------------------------------------------------------------
		// Manual Tests prototype
		//---------------------------------------------------------------------
		
		testCases[0] = new Y.Test.Case({
			name: "blackberry.phone.Phone Tests",

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
			
			       "blackberry.phone namespace should exist" : function(){
						Assert.isNotUndefined(blackberry.phone);				
			       },
                   "blackberry.phone.Phone namespace should be defined" : function(){
						Assert.isNotUndefined(blackberry.phone.Phone);			
			       },
                   "blackberry.phone.Phone.CB_CALL_INITIATED should exist and return 0" : function(){
						Assert.areEqual(blackberry.phone.Phone.CB_CALL_INITIATED, 0);			
				   },

					"blackberry.phone.Phone.CB_CALL_WAITING should exist and return 1" : function(){
						Assert.areEqual(blackberry.phone.Phone.CB_CALL_WAITING, 1);			
					},

					"blackberry.phone.Phone.CB_CALL_INCOMING should exist and return 2" : function(){
						Assert.areEqual(blackberry.phone.Phone.CB_CALL_INCOMING, 2);			
					},

					"blackberry.phone.Phone.CB_CALL_ANSWERED should exist and return 3" : function(){
						Assert.areEqual(blackberry.phone.Phone.CB_CALL_ANSWERED, 3);			
					},

					"blackberry.phone.Phone.CB_CALL_CONNECTED should exist and return 4" : function(){
						Assert.areEqual(blackberry.phone.Phone.CB_CALL_CONNECTED, 4);			
					},

					"blackberry.phone.Phone.CB_CALL_CONFERENCECALL_ESTABLISHED should exist and return 5" : function(){
						Assert.areEqual(blackberry.phone.Phone.CB_CALL_CONFERENCECALL_ESTABLISHED, 5);			
					},

					"blackberry.phone.Phone.CB_CONFERENCECALL_DISCONNECTED should exist and return 6" : function(){
						Assert.areEqual(blackberry.phone.Phone.CB_CONFERENCECALL_DISCONNECTED, 6);			
					},

					"blackberry.phone.Phone.CB_CALL_DISCONNECTED should exist and return 7" : function(){
						Assert.areEqual(blackberry.phone.Phone.CB_CALL_DISCONNECTED, 7);			
					},

					"blackberry.phone.Phone.CB_CALL_DIRECTCONNECT_CONNECTED should exist and return 8" : function(){
						Assert.areEqual(blackberry.phone.Phone.CB_CALL_DIRECTCONNECT_CONNECTED, 8);			
					},

					"blackberry.phone.Phone.CB_CALL_DIRECTCONNECT_DISCONNECTED should exist and return 9" : function(){
						Assert.areEqual(blackberry.phone.Phone.CB_CALL_DIRECTCONNECT_DISCONNECTED, 9);			
					},

					"blackberry.phone.Phone.CB_CALL_ENDED_BYUSER should exist and return 10" : function(){
						Assert.areEqual(blackberry.phone.Phone.CB_CALL_ENDED_BYUSER, 10);			
					},

					"blackberry.phone.Phone.CB_CALL_FAILED should exist and return 11" : function(){
						Assert.areEqual(blackberry.phone.Phone.CB_CALL_FAILED, 11);			
					},

					"blackberry.phone.Phone.CB_CALL_RESUMED should exist and return 12" : function(){
						Assert.areEqual(blackberry.phone.Phone.CB_CALL_RESUMED, 12);			
					},

					"blackberry.phone.Phone.CB_CALL_HELD should exist and return 13" : function(){
						Assert.areEqual(blackberry.phone.Phone.CB_CALL_HELD, 13);			
					},

					"blackberry.phone.Phone.CB_CALL_ADDED should exist and return 14" : function(){
						Assert.areEqual(blackberry.phone.Phone.CB_CALL_ADDED, 14);			
					},

					"blackberry.phone.Phone.CB_CALL_REMOVED should exist and return 15" : function(){
						Assert.areEqual(blackberry.phone.Phone.CB_CALL_REMOVED, 15);			
					},

					"blackberry.phone.Phone.CALL_ERROR_SUBSCRIBER_BUSY should exist and return 1" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_SUBSCRIBER_BUSY, 1);			
					},

					"blackberry.phone.Phone.CALL_ERROR_CONGESTION should exist and return 2" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_CONGESTION, 2);			
					},

					"blackberry.phone.Phone.CALL_ERROR_RADIO_PATH_UNAVAILABLE should exist and return 3" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_RADIO_PATH_UNAVAILABLE, 3);			
					},

					"blackberry.phone.Phone.CALL_ERROR_NUMBER_UNOBTAINABLE should exist and return 4" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_NUMBER_UNOBTAINABLE, 4);			
					},

					"blackberry.phone.Phone.CALL_ERROR_AUTHORIZATION_FAILURE should exist and return 5" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_AUTHORIZATION_FAILURE, 5);			
					},

					"blackberry.phone.Phone.CALL_ERROR_EMERGENCY_CALLS_ONLY should exist and return 6" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_EMERGENCY_CALLS_ONLY, 6);			
					},

					"blackberry.phone.Phone.CALL_ERROR_HOLD_ERROR should exist and return 7" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_HOLD_ERROR, 7);			
					},

					"blackberry.phone.Phone.CALL_ERROR_OUTGOING_CALLS_BARRED should exist and return 8" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_OUTGOING_CALLS_BARRED, 8);			
					},

					"blackberry.phone.Phone.CALL_ERROR_GENERAL should exist and return 9" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_GENERAL, 9);			
					},

					"blackberry.phone.Phone.CALL_ERROR_MAINTENANCE_REQUIRED should exist and return 10" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_MAINTENANCE_REQUIRED, 10);			
					},

					"blackberry.phone.Phone.CALL_ERROR_SERVICE_NOT_AVAILABLE should exist and return 11" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_SERVICE_NOT_AVAILABLE, 11);			
					},

					"blackberry.phone.Phone.CALL_ERROR_DUE_TO_FADING should exist and return 12" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_DUE_TO_FADING, 12);			
					},

					"blackberry.phone.Phone.CALL_ERROR_LOST_DUE_TO_FADING should exist and return 13" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_LOST_DUE_TO_FADING, 13);			
					},

					"blackberry.phone.Phone.CALL_ERROR_TRY_AGAIN should exist and return 14" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_TRY_AGAIN, 14);			
					},

					"blackberry.phone.Phone.CALL_ERROR_FDN_MISMATCH should exist and return 15" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_FDN_MISMATCH, 15);			
					},

					"blackberry.phone.Phone.CALL_ERROR_CONNECTION_DENIED_BY_NETWORK should exist and return 16" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_CONNECTION_DENIED_BY_NETWORK, 16);			
					},

					"blackberry.phone.Phone.CALL_ERROR_NUMBER_NOT_IN_SERVICE should exist and return 17" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_NUMBER_NOT_IN_SERVICE, 17);			
					},

					"blackberry.phone.Phone.CALL_ERROR_PLEASE_TRY_LATER should exist and return 18" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_PLEASE_TRY_LATER, 18);			
					},

					"blackberry.phone.Phone.CALL_ERROR_SERVICE_CONFLICT should exist and return 19" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_SERVICE_CONFLICT, 19);			
					},

					"blackberry.phone.Phone.CALL_ERROR_SYSTEM_BUSY_TRY_LATER should exist and return 20" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_SYSTEM_BUSY_TRY_LATER, 20);			
					},

					"blackberry.phone.Phone.CALL_ERROR_USER_BUSY_IN_PRIVATE should exist and return 21" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_USER_BUSY_IN_PRIVATE, 21);			
					},

					"blackberry.phone.Phone.CALL_ERROR_USER_BUSY_IN_DATA should exist and return 22" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_USER_BUSY_IN_DATA, 22);			
					},

					"blackberry.phone.Phone.CALL_ERROR_USER_NOT_AUTHORIZED should exist and return 23" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_USER_NOT_AUTHORIZED, 23);			
					},

					"blackberry.phone.Phone.CALL_ERROR_USER_NOT_AVAILABLE should exist and return 24" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_USER_NOT_AVAILABLE, 24);			
					},

					"blackberry.phone.Phone.CALL_ERROR_USER_UNKNOWN should exist and return 25" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_USER_UNKNOWN, 25);			
					},

					"blackberry.phone.Phone.CALL_ERROR_USER_NOT_REACHABLE should exist and return 26" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_USER_NOT_REACHABLE, 26);			
					},

					"blackberry.phone.Phone.CALL_ERROR_INCOMING_CALL_BARRED should exist and return 27" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_INCOMING_CALL_BARRED, 27);			
					},

					"blackberry.phone.Phone.CALL_ERROR_CALL_REPLACED_BY_STK should exist and return 28" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_CALL_REPLACED_BY_STK, 28);			
					},

					"blackberry.phone.Phone.CALL_ERROR_STK_CALL_NOT_ALLOWED should exist and return 29" : function(){
						Assert.areEqual(blackberry.phone.Phone.CALL_ERROR_STK_CALL_NOT_ALLOWED, 29);			
					},
                   "blackberry.phone.Phone.activeCalls() should exist and return array of 0 calls" : function(){
						Assert.isNotUndefined(blackberry.phone.Phone.activeCalls);
						Assert.isArray(blackberry.phone.Phone.activeCalls());			
						Assert.areEqual(blackberry.phone.Phone.activeCalls().length, 0);
					},

					"blackberry.phone.Phone.inActiveCall() should exist and return false" : function(){
						Assert.isNotUndefined(blackberry.phone.Phone.inActiveCall);
						Assert.isBoolean(blackberry.phone.Phone.inActiveCall());			
						Assert.areEqual(blackberry.phone.Phone.inActiveCall(), false);
					},

					"blackberry.phone.Phone.addPhoneListener() should exist and accept callback function" : function() {
						Assert.isNotUndefined(blackberry.phone.Phone.addPhoneListener);
						var func = function(callId, reason) {
							// dummy callback
						};						
						Assert.isBoolean(blackberry.phone.Phone.addPhoneListener(func, blackberry.phone.Phone.CB_CALL_CONNECTED), true);
					}											
		
		
		});
		
		testCases[1] = new Y.Test.Case({
			name: "blackberry.phone.PhoneLogs existenceTests",

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
			
			"blackberry.phone.PhoneLogs namespace should be defined" : function(){
						Assert.isNotUndefined(blackberry.phone.PhoneLogs);			
					},
            "blackberry.phone.PhoneLogs.FOLDER_MISSED_CALLS should exist and return 0" : function() {
						Assert.areEqual(blackberry.phone.PhoneLogs.FOLDER_MISSED_CALLS, 0);
					},

					"blackberry.phone.PhoneLogs.FOLDER_NORMAL_CALLS should exist and return 1" : function() {
						Assert.areEqual(blackberry.phone.PhoneLogs.FOLDER_NORMAL_CALLS, 1);
					},

					"blackberry.phone.PhoneLogs.numberOfCalls() should exist and return 0" : function() {
						Assert.isNotUndefined(blackberry.phone.PhoneLogs.numberOfCalls);
						Assert.areEqual(blackberry.phone.PhoneLogs.numberOfCalls(blackberry.phone.PhoneLogs.FOLDER_MISSED_CALLS), 0);
					},

					"blackberry.phone.PhoneLogs.callAt() should exist" : function() {
						Assert.isNotUndefined(blackberry.phone.PhoneLogs.callAt);
					},

					"blackberry.phone.PhoneLogs.deleteCallAt() should exist" : function() {
						Assert.isNotUndefined(blackberry.phone.PhoneLogs.deleteCallAt);
					},										

					"blackberry.phone.PhoneLogs.addPhoneLogListener should exist and accept callback function" : function() {
						Assert.isNotUndefined(blackberry.phone.PhoneLogs.addPhoneLogListener);
						var onCallLogAdded = function(addedCallLog) {
							// dummy callback
						};

						var onCallLogRemoved = function(removedCallLog) {
							// dummy callback
						};

						var onCallLogReset = function() {
							// dummy callback
						};

						var onCallLogUpdated = function(newCallLog, oldCallLog) {
							// dummy callback
						};
												
						Assert.isBoolean(blackberry.phone.PhoneLogs.addPhoneLogListener(onCallLogAdded, onCallLogRemoved, onCallLogUpdated, onCallLogReset), true);						
					}					
		
		
		});
		
		testCases[2] = new Y.Test.Case({
					name : "blackberry.phone.Find and blackberry.phone.Find.FilterExpression test",
					
					setUp : function() {
						this.fe = new blackberry.phone.Find.FilterExpression("duration", "<=", 100);						
					},

					tearDown : function() {
						delete this.fe;
					},

					"blackberry.phone.Find.FilterExpression leftField should exist and return 'duration'" : function() {
						Assert.isNotUndefined(this.fe.leftField);
						Assert.areEqual(this.fe.leftField, "duration");
					},

					"blackberry.phone.Find.FilterExpression rightField should exist and return 100" : function() {
						Assert.isNotUndefined(this.fe.rightField);
						Assert.areEqual(this.fe.rightField, 100);
					},

					"blackberry.phone.Find.FilterExpression operator should exist" : function() {
						Assert.isNotUndefined(this.fe.operator);
						//Assert.areEqual(this.fe.operator, "<=");
					},

					"blackberry.phone.Find.FilterExpression negate should exist and return false" : function() {
						Assert.isNotUndefined(this.fe.negate);
						Assert.isBoolean(this.fe.negate);
						Assert.areEqual(this.fe.negate, false);
					},

					"blackberry.phone.PhoneLogs.find() should exist and return array 0 calls" : function() {
						Assert.isNotUndefined(blackberry.phone.PhoneLogs.find);
						var results = blackberry.phone.PhoneLogs.find(this.fe, blackberry.phone.PhoneLogs.FOLDER_NORMAL_CALLS, "duration", 0, false);
						Assert.isArray(results);
						//Assert.areEqual(results.length, 0);
					}
				});	


         testCases[3] = new Y.Test.Case({
			name: "blackberry.phone manual Tests",

			setUp : function () {
				//Order is a stack, last object will appear first in DOM
				framework.setupIFrame();

				framework.setupFailButton();
				framework.setupPassButton();
				framework.setupInstructions();
			
				
			},
			
			tearDown : function () {
			    framework.tearDownIFrame();

				framework.tearDownFailButton();
				framework.tearDownPassButton();
				framework.tearDownInstructions();
			},
		
		 	"MANUAL - activeCalls should return all active calls from the Phone": function () {
				framework.test = this;
				framework.setInstructions("click the activeCalls button, all active calls should be displayed.");
				
				framework.setIFrameSource("http://atg05-yyz.rim.net/webapiextension/Phone.htm");
				framework.showIFrame();


				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			} ,
			"MANUAL - inActiveCall should return true when the phone is connected": function () {
				framework.test = this;
				framework.setInstructions("While the phone is active, click the inActiveCall button, it should return true");
				
				framework.setIFrameSource("http://atg05-yyz.rim.net/webapiextension/Phone.htm");
				framework.showIFrame();


				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			} ,
            "MANUAL - User should be able to add listener for various event type": function () {
				framework.test = this;
				framework.setInstructions("pick up event type from the dropdown list, then click the  addPhoneListener button, verify event callback is invoked when event occurs.");
				
				framework.setIFrameSource("http://atg05-yyz.rim.net/webapiextension/Phone.htm");
				framework.showIFrame();


				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			} , 
			"MANUAL - User should be able to add listener for all phone log event": function () {
				framework.test = this;
				framework.setInstructions("click the addPhoneLogListener(ALL) button, callback is invoked when the add,remove,update phone log event occurs");
				
				framework.setIFrameSource("http://atg05-yyz.rim.net/webapiextension/Phone.htm");
				framework.showIFrame();


				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			} ,
			"MANUAL - User should be able search phone logs using different operator": function () {
				framework.test = this;
				framework.setInstructions("correct logs should be returned when we search the call logs using different operator");
				
				framework.setIFrameSource("http://atg05-yyz.rim.net/webapiextension/Phone.htm");
				framework.showIFrame();


				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			} 
             });	
				
		
		return testCases;
	};
})();

