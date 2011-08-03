(function(){
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases[0] = new Y.Test.Case({
			name: "blackberry.system Test",
			
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
					//"blackberry.system.model should exist and be read-only" : "setting a property that has only a getter",
				}
			},
			
			//existence test
			
			"blackberry.system.ALLOW should exist" : function() {
				Assert.isNotUndefined(blackberry.system.ALLOW);
				Assert.areEqual(blackberry.system.ALLOW, 0);
			}, 
			
			"blackberry.system.DENY should exist" : function() {
				Assert.isNotUndefined(blackberry.system.DENY);
				Assert.areEqual(blackberry.system.DENY, 1);
			},
			
			"blackberry.system.PROMPT should exist" : function() {
				Assert.isNotUndefined(blackberry.system.PROMPT);
				Assert.areEqual(blackberry.system.PROMPT, 2);
			},
			
			"blackberry.system.hasCapability should be a function" : function() {
				Assert.isTypeOf('function',blackberry.system.hasCapability);
				Assert.isBoolean(blackberry.system.hasCapability("location.gps"));
			},
			
			"blackberry.system.hasCapability('input.keyboard.issuretype') should return false" : function() {
				Assert.areSame(blackberry.system.hasCapability("input.keyboard.issuretype"), false);
			},
			
			"blackberry.system.hasCapability('input.touch') should return true" : function() {
				Assert.areSame(blackberry.system.hasCapability("input.touch"), true);
			},
			
			"blackberry.system.hasCapability('media.audio.capture') should return true" : function() {
				Assert.areSame(blackberry.system.hasCapability("media.audio.capture"), true);
			},
			
			"blackberry.system.hasCapability('media.video.capture') should return true" : function() {
				Assert.areSame(blackberry.system.hasCapability("media.video.capture"), true);
			},
			
			"blackberry.system.hasCapability('media.recording') should return true" : function() {
				Assert.areSame(blackberry.system.hasCapability("media.recording"), true);
			},
			
			"blackberry.system.hasCapability('location.gps') should return true" : function() {
				Assert.areSame(blackberry.system.hasCapability("location.gps"), true);
			},
			
			"blackberry.system.hasCapability('location.maps') should return false" : function() {
				Assert.areSame(blackberry.system.hasCapability("location.maps"), false);
			},
			
			"blackberry.system.hasCapability('storage.memorycard') should return false" : function() {
				Assert.areSame(blackberry.system.hasCapability("storage.memorycard"), false);
			},
			
			"blackberry.system.hasCapability('network.bluetooth') should return true" : function() {
				Assert.areSame(blackberry.system.hasCapability("network.bluetooth"), true);
			},
			
			"blackberry.system.hasCapability('network.wlan') should return true" : function() {
				Assert.areSame(blackberry.system.hasCapability("network.wlan"), true);
			},
			
			"blackberry.system.hasCapability('network.3gpp') should return false" : function() {
				Assert.areSame(blackberry.system.hasCapability("network.3gpp"), false);
			},
			
			"blackberry.system.hasCapability('network.cdma') should return false" : function() {
				Assert.areSame(blackberry.system.hasCapability("network.cdma"), false);
			},
			
			"blackberry.system.hasCapability('network.iden') should return false" : function() {
				Assert.areSame(blackberry.system.hasCapability("network.iden"), false);
			},
			
			"blackberry.system.hasDataCoverage should be a function" : function() {
				Assert.isTypeOf('function', blackberry.system.hasDataCoverage);
				Assert.isBoolean(blackberry.system.hasDataCoverage ());
			},
			
			"blackberry.system.hasPermission('blackberry.app') should return blackberry.system.ALLOW" : function() {
				Assert.isTypeOf('function', blackberry.system.hasPermission);
				Assert.areEqual(blackberry.system.hasPermission('blackberry.app'), blackberry.system.ALLOW);
			},
			
			"blackberry.system.hasPermission('blackberry.app.event') should return blackberry.system.ALLOW" : function() {
				Assert.isTypeOf('function', blackberry.system.hasPermission);
				Assert.areEqual(blackberry.system.hasPermission('blackberry.app.event'), blackberry.system.ALLOW);
			},
			
			"blackberry.system.hasPermission('blackberry.system') should return blackberry.system.ALLOW" : function() {
				Assert.isTypeOf('function', blackberry.system.hasPermission);
				Assert.areEqual(blackberry.system.hasPermission('blackberry.system'), blackberry.system.ALLOW);
			},
			
			"blackberry.system.hasPermission('blackberry.system.event') should return blackberry.system.ALLOW" : function() {
				Assert.isTypeOf('function', blackberry.system.hasPermission);
				Assert.areEqual(blackberry.system.hasPermission('blackberry.system.event'), blackberry.system.ALLOW);
			},
			
			"blackberry.system.hasPermission('blackberry.ui.dialog') should return blackberry.system.ALLOW" : function() {
				Assert.isTypeOf('function', blackberry.system.hasPermission);
				Assert.areEqual(blackberry.system.hasPermission('blackberry.ui.dialog'), blackberry.system.ALLOW);
			},
			
			"blackberry.system.hasPermission('blackberry.invoke') should return blackberry.system.ALLOW" : function() {
				Assert.isTypeOf('function', blackberry.system.hasPermission);
				Assert.areEqual(blackberry.system.hasPermission('blackberry.invoke'), blackberry.system.ALLOW);
			},
			
			"blackberry.system.hasPermission('blackberry.utils') should return blackberry.system.ALLOW" : function() {
				Assert.isTypeOf('function', blackberry.system.hasPermission);
				Assert.areEqual(blackberry.system.hasPermission('blackberry.utils'), blackberry.system.ALLOW);
			},
			
			"blackberry.system.hasPermission('blackberry.pim') should return blackberry.system.DENY" : function() {
				Assert.isTypeOf('function', blackberry.system.hasPermission);
				Assert.areEqual(blackberry.system.hasPermission('blackberry.pim'), blackberry.system.DENY);
			},
			
			"blackberry.system.isMassStorageActive should be a function" : function() {
				Assert.isTypeOf('function', blackberry.system.isMassStorageActive);
				Assert.isBoolean(blackberry.system.isMassStorageActive());
			},
			
			"blackberry.system.setHomeScreenBackground should not exist" : function() {
				Assert.isUndefined(blackberry.system.setHomeScreenBackground);
			},
			
			"blackberry.system.model should exist and be read-only" : function() {
				Assert.isNotUndefined(blackberry.system.model);
				var orig = blackberry.system.model;
				try{
					blackberry.system.model = "abcdefghijabcdefghijabcdefghij";
				}
				catch (e){
				}
				Assert.areEqual(orig, blackberry.system.model);
			},
			
			"blackberry.system.scriptApiVersion should exist and be read-only" : function() {
				Assert.isNotUndefined(blackberry.system.scriptApiVersion);
				var orig = blackberry.system.scriptApiVersion;
				try{
					blackberry.system.scriptApiVersion = "abcdefghijabcdefghijabcdefghij";
				}
				catch (e){}
				Assert.areEqual(orig, blackberry.system.scriptApiVersion);
			},
			
			"blackberry.system.softwareVersion should exist and be read-only" : function() {
				Assert.isNotUndefined(blackberry.system.softwareVersion);
				var orig = blackberry.system.softwareVersion;
				try{
					blackberry.system.softwareVersion = "abcdefghijabcdefghijabcdefghij";
				}
				catch (e){}
				Assert.areEqual(orig, blackberry.system.softwareVersion);
			},
			
			"blackberry.system.model should return the device model" : function() {
				framework.test = this; 
				var orig = blackberry.system.model;
				Assert.areEqual(blackberry.system.model, orig);
			},
			
			//system.event exsitence
			"blackberry.system.event namespace should exist" : function() {
				Assert.isNotUndefined(blackberry.system.event);
			},  
			
			"blackberry.system.event.KEY_BACK should not exist" : function() {
				Assert.isUndefined(blackberry.system.event.KEY_BACK);
			},  
			
			"blackberry.system.event.KEY_MENU should not exist" : function() {
				Assert.isUndefined(blackberry.system.event.KEY_MENU);
			},  
			
			"blackberry.system.event.KEY_CONVENIENCE_1 should not exist" : function() {
				Assert.isUndefined(blackberry.system.event.KEY_CONVENIENCE_1);
			},
			
			"blackberry.system.event.KEY_CONVENIENCE_2 should not exist" : function() {
				Assert.isUndefined(blackberry.system.event.KEY_CONVENIENCE_2);
			},
			
			"blackberry.system.event.KEY_STARTCALL should not exist" : function() {
				Assert.isUndefined(blackberry.system.event.KEY_STARTCALL);
			},
			
			"blackberry.system.event.KEY_ENDCALL should not exist" : function() {
				Assert.isUndefined(blackberry.system.event.KEY_ENDCALL);
			},
			
			"blackberry.system.event.KEY_VOLUMEDOWN should not exist" : function() {
				Assert.isUndefined(blackberry.system.event.KEY_VOLUMEDOWN);
			},
			
			"blackberry.system.event.KEY_VOLUMEUP should not exist" : function() {
				Assert.isUndefined(blackberry.system.event.KEY_VOLUMEUP);
			},
			
			"blackberry.system.onCoverageChange should not exist" : function() {
				Assert.isUndefined(blackberry.system.onCoverageChange);
			},
			
			"blackberry.system.onHardwareKey should not exist" : function() {
				Assert.isUndefined(blackberry.system.onHardwareKey);
			},
			
			//system.evert.battery
			"blackberry.system.event.deviceBatteryLevelChange should exist" : function() {
				Assert.isNotUndefined(blackberry.system.event.deviceBatteryLevelChange);
			},
			
			"blackberry.system.event.deviceBatteryStateChange should exist" : function() {
				Assert.isNotUndefined(blackberry.system.event.deviceBatteryStateChange);
			},
			
			"MANUAL blackberry.system.event.deviceBatteryLevelChange should return a level change event": function () {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Do some Battery draining tasks on the playbook, some examples are playing HD video and browsing at the same time, you should not need to pass/fail this test, it should auto pass/fail (timeout is 5 mins till auto fail)");
				
				blackberry.system.event.deviceBatteryLevelChange(function (level){
					framework.test.resume(function (){
						Assert.areNotEqual(level, "-1");
					}); 
				});
				
				framework.test.wait(function(){
					Assert.fail("Battery level did not change");
				}, 5*60*1000);
			},
			
			"MANUAL blackberry.system.event.deviceBatteryStateChange should return a level change event": function () {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Change the state of playbook charging by either plugging in or unplugging the playbook, wait for a few mins, you should not need to pass/fail this test manually, it should auto pass/fail (timeout is 5 mins till auto fail)");
				
				blackberry.system.event.deviceBatteryStateChange(function (state){
					framework.test.resume(function (){
						Assert.areNotEqual(state, "-1");
					});
				});
				
				framework.test.wait(function(){
					Assert.fail("Battery level did not change");
				}, 5*60*1000);
			},
			
		});
		return testCases;
	}
})();