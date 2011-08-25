(function() {  
    alert("loading system");
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases["suiteName"] = "blackberry.system Tests";
		
	    testCases[0] = new Y.Test.Case({
			name: "blackberry.system Test",
//exsitence test			
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
                    "blackberry.system.setHomeScreenBackground should not support local protocol": "Expected result: should not support local",
                       }               
            },
			
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
			
			"blackberry.system.hasCapability input.keyboard.issuretype should return boolean" : function() {
			    Assert.isTypeOf('function',blackberry.system.hasCapability);
				Assert.isBoolean(blackberry.system.hasCapability("input.keyboard.issuretype"));
			},
			
			"blackberry.system.hasDataCoverage should be a function" : function() {
				Assert.isTypeOf('function', blackberry.system.hasDataCoverage);
				Assert.isBoolean(blackberry.system.hasDataCoverage ());
			},
			
			"blackberry.system.hasPermission should be a function" : function() {
				Assert.isTypeOf('function', blackberry.system.hasPermission);
				Assert.areEqual(blackberry.system.hasPermission("blackberry.system"), blackberry.system.ALLOW);
			},
			
			"blackberry.system.isMassStorageActive should be a function" : function() {
				Assert.isTypeOf('function', blackberry.system.isMassStorageActive);
				Assert.isBoolean(blackberry.system.isMassStorageActive());
			},
			
			"blackberry.system.setHomeScreenBackground should be a function" : function() {
				Assert.isTypeOf('function', blackberry.system.setHomeScreenBackground);
			},
			
			"blackberry.system.model should be existed" : function() {
				Assert.isNotUndefined(blackberry.system.model);
				var orig = blackberry.system.model;
				blackberry.system.model = "abcdefghijabcdefghijabcdefghij";
				Assert.areEqual(orig, blackberry.system.model);
			},
			
			"blackberry.system.scriptApiVersion should be existed" : function() {
				Assert.isNotUndefined(blackberry.system.scriptApiVersion);
				var orig = blackberry.system.scriptApiVersion;
				blackberry.system.scriptApiVersion = "abcdefghijabcdefghijabcdefghij";
				Assert.areEqual(orig, blackberry.system.scriptApiVersion);
			},
			
			"blackberry.system.softwareVersion should be existed" : function() {
				Assert.isNotUndefined(blackberry.system.softwareVersion);
				var orig = blackberry.system.softwareVersion;
				blackberry.system.softwareVersion = "abcdefghijabcdefghijabcdefghij";
				Assert.areEqual(orig, blackberry.system.softwareVersion);
			},
			
			
			
			
			"blackberry.system.setHomeScreenBackground doesn't support local protocol" : function() {
				blackberry.system.setHomeScreenBackground("local:///img/pic1.jpg");
                alert("Home Screen Background has been set!");
			},                 

//system manual test 	
		
			"blackberry.system.setHomeScreenBackground should work when images from SDCard/store" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions( "In order to run this test successfully, you should have pic1.jpg in device SDCard<br />Pass this test if this is true.  Otherwise, fail.");
			    blackberry.system.setHomeScreenBackground("file:///SDCard/pic1.jpg");
                alert("Home Screen Background has been set!");
				framework.test.wait(24*60*60*1000); 
			},
			
			"blackberry.system.model should return device mode" : function() {
				framework.test = this; 
				alert(blackberry.system.model);
				framework.test.wait(24*60*60*1000); 
			},	
				
			"blackberry.system.hasCapability all return values should be boolean" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions( "please check the value they should all be boolean.<br />Pass this test if this is true.  Otherwise, fail.");
			    var txtCapability = "";			
			    txtCapability += "input.keyboard.issuretype: " + blackberry.system.hasCapability("input.keyboard.issuretype") + "\n";
                txtCapability += "input.touch: " + blackberry.system.hasCapability("input.touch") + "\n";
                txtCapability += "media.audio.capture: " + blackberry.system.hasCapability("media.audio.capture") + "\n";
                txtCapability += "media.video.capture: " + blackberry.system.hasCapability("media.video.capture") + "\n";
                txtCapability += "media.recording: " + blackberry.system.hasCapability("media.recording") + "\n";
                txtCapability += "location.gps: " + blackberry.system.hasCapability("location.gps") + "\n";
                txtCapability += "location.maps: " + blackberry.system.hasCapability("location.maps") + "\n";
                txtCapability += "storage.memorycard: " + blackberry.system.hasCapability("storage.memorycard") + "\n";
                txtCapability += "network.bluetooth: " + blackberry.system.hasCapability("network.bluetooth") + "\n";
                txtCapability += "network.wlan: " + blackberry.system.hasCapability("network.wlan") + "\n";
                txtCapability += "network.3gpp: " + blackberry.system.hasCapability("network.3gpp") + "\n";
                txtCapability += "network.cdma: " + blackberry.system.hasCapability("network.cdma") + "\n";
                txtCapability += "network.iden: " + blackberry.system.hasCapability("network.iden") + "\n";
				alert(txtCapability);
			    framework.test.wait(24*60*60*1000);   
			},
			
		    
	
//system.event exsitence	
			
			"blackberry.system.event namespace should exist" : function() {
				Assert.isNotUndefined(blackberry.system.event);
				Assert.areEqual(blackberry.system.event.KEY_BACK, 0);
			},  

			"blackberry.system.event.KEY_BACK should exist" : function() {
				Assert.isNotUndefined(blackberry.system.event.KEY_BACK);
				Assert.areEqual(blackberry.system.event.KEY_MENU, 1);
			},  
			
			"blackberry.system.event.KEY_CONVENIENCE_1 should exist" : function() {
				Assert.isNotUndefined(blackberry.system.event.KEY_CONVENIENCE_1);
				Assert.areEqual(blackberry.system.event.KEY_CONVENIENCE_1, 2);
			},  			

			
			"blackberry.system.event.KEY_CONVENIENCE_2 should exist" : function() {
				Assert.isNotUndefined(blackberry.system.event.KEY_CONVENIENCE_2);
				Assert.areEqual(blackberry.system.event.KEY_CONVENIENCE_2, 3);
			},  			

			
			"blackberry.system.event.KEY_STARTCALL should exist" : function() {
				Assert.isNotUndefined(blackberry.system.event.KEY_STARTCALL);
				Assert.areEqual(blackberry.system.event.KEY_STARTCALL, 4);
			},  			

			
			"blackberry.system.event.KEY_ENDCALL should exist" : function() {
				Assert.isNotUndefined(blackberry.system.event.KEY_ENDCALL);
				Assert.areEqual(blackberry.system.event.KEY_ENDCALL, 5);
			},  			

			
			"blackberry.system.event.KEY_VOLUMEDOWN should exist" : function() {
				Assert.isNotUndefined(blackberry.system.event.KEY_VOLUMEDOWN);
				Assert.areEqual(blackberry.system.event.KEY_VOLUMEDOWN, 6);
			},  			

			
			"blackberry.system.event.KEY_VOLUMEUP should exist" : function() {
				Assert.isNotUndefined(blackberry.system.event.KEY_VOLUMEUP);
				Assert.areEqual(blackberry.system.event.KEY_VOLUMEUP, 7);
			},  			

			"blackberry.system.onCoverageChange should be a function" : function() {
				Assert.isTypeOf('function', blackberry.system.onCoverageChange(function(){var s = 0;}));
			},
			
			"blackberry.system.onHardwareKey should be a function" : function() {
				Assert.isTypeOf('function', blackberry.system.onHardwareKey(7, function(){var s = 7;}));
			},
			
	
			
		           
			"blackberry.system.handle_KEY_BACK should work" : function() {
				framework.test = this;
				framework.setInstructions("click on KEY_BACK will pop up message.<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.system.event.onHardwareKey(0, function(){alert("KEY_BACK");});
                alert("Register KEY_BACK");
               	framework.test.wait(24*60*60*1000); 
			},
			
			"blackberry.system.KEY_BACK unregistry should work" : function() {
				framework.test = this;
				framework.setInstructions("un-register KEY_BACK<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.system.event.onHardwareKey(0, null);
                alert("UnRegister KEY_BACK");
				framework.test.wait(24*60*60*1000); 
			},
			
			"blackberry.system.handle_KEY_MENU should work" : function() {
				framework.test = this;
				framework.setInstructions("click on KEY_MENU will pop up message.<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.system.event.onHardwareKey(1, function(){alert("KEY_MENU");});
                alert("Register KEY_MENU");
				framework.test.wait(24*60*60*1000);
			},
			
			"blackberry.system.KEY_MENU unregistry should work" : function() {
				framework.test = this;
				framework.setInstructions("un-register KEY_MENU<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.system.event.onHardwareKey(1, null);
                alert("UnRegister KEY_MENU");
				framework.test.wait(24*60*60*1000); 
			},

			
			"blackberry.system.handle_KEY_CONVENIENCE_1 should work" : function() {
				framework.test = this;
				framework.setInstructions("click on KEY_CONVENIENCE_1 will pop up message.<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.system.event.onHardwareKey(2, function(){alert("KEY_CONVENIENCE_1");});
                alert("Register KEY_CONVENIENCE_1");
				framework.test.wait(24*60*60*1000);
			},
			
			"blackberry.system.KEY_CONVENIENCE_1 unregistry should work" : function() {
				framework.test = this;
				framework.setInstructions("un-register KEY_CONVENIENCE_1<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.system.event.onHardwareKey(2, null);
                alert("UnRegister KEY_CONVENIENCE_1");
				framework.test.wait(24*60*60*1000); 
			},

			
			"blackberry.system.handle_KEY_CONVENIENCE_2 should work" : function() {
				framework.test = this;
				framework.setInstructions("click on KEY_CONVENIENCE_2 will pop up message.<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.system.event.onHardwareKey(3, function(){alert("KEY_CONVENIENCE_2");});
                alert("Register KEY_CONVENIENCE_2");
				framework.test.wait(24*60*60*1000);
			},
			
			"blackberry.system.KEY_CONVENIENCE_2 unregistry should work" : function() {
				framework.test = this;
				framework.setInstructions( "un-register KEY_CONVENIENCE_2<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.system.event.onHardwareKey(3, null);
                alert("UnRegister KEY_CONVENIENCE_2");
				framework.test.wait(24*60*60*1000); 
			},
			
			"blackberry.system.handle_KEY_STARTCALL should work" : function() {
				framework.test = this;
				framework.setInstructions("click on KEY_STARTCALL will pop up message.<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.system.event.onHardwareKey(4, function(){alert("KEY_STARTCALL");});
                alert("Register KEY_STARTCALL");
				framework.test.wait(24*60*60*1000);
			},
			
			"blackberry.system.KEY_STARTCALL unregistry should work" : function() {
				framework.test = this;
				framework.setInstructions("un-register KEY_STARTCALL<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.system.event.onHardwareKey(4, null);
                alert("UnRegister KEY_STARTCALL");
				framework.test.wait(24*60*60*1000); 
			},
			
			"blackberry.system.handle_KEY_ENDCALL should work" : function() {
				
				framework.test = this;
				framework.setInstructions( "click on KEY_ENDCALL will pop up message.<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.system.event.onHardwareKey(5, function(){alert("KEY_ENDCALL");});
                alert("Register KEY_ENDCALL");
				framework.test.wait(24*60*60*1000);
				
			},
			
			"blackberry.system.KEY_ENDCALL unregistry should work" : function() {
				framework.test = this;
				framework.setInstructions("un-register KEY_ENDCALL<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.system.event.onHardwareKey(5, null);
                alert("UnRegister KEY_ENDCALL");
				framework.test.wait(24*60*60*1000); 
			},
			
			"blackberry.system.handle_KEY_VOLUMEDOWN should work" : function() {
				framework.test = this;
				document.getElementById('instructions').innerHTML = "click on KEY_VOLUMEDOWN will pop up message.<br />Pass this test if this is true.  Otherwise, fail.";
				blackberry.system.event.onHardwareKey(6, function(){alert("KEY_VOLUMEDOWN");});
                alert("Register KEY_VOLUMEDOWN");
				framework.test.wait(24*60*60*1000);
				
			},
			
			"blackberry.system.KEY_VOLUMEDOWN unregistry should work" : function() {
				framework.test = this;
				framework.setInstructions("un-register KEY_VOLUMEDOWN<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.system.event.onHardwareKey(6, null);
                alert("UnRegister KEY_VOLUMEDOWN");
				framework.test.wait(24*60*60*1000); 
			},
			
			"blackberry.system.handle_KEY_VOLUMEUP should work" : function() {
				framework.test = this;
				framework.setInstructions( "click on KEY_VOLUMEUP will pop up message.<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.system.event.onHardwareKey(7, function(){alert("KEY_VOLUMEUP");});
                alert("Register KEY_VOLUMEUP");
				framework.test.wait(24*60*60*1000);
    		},
    		
    		"blackberry.system.KEY_VOLUMEUP unregistry should work" : function() {
				framework.test = this;
				framework.setInstructions( "un-register KEY_VOLUMEUP<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.system.event.onHardwareKey(7, null);
                alert("UnRegister KEY_VOLUMEUP");
				framework.test.wait(24*60*60*1000); 
			},
			
			"blackberry.system.onCoverageChange() should work" : function() {
			    framework.test = this;
				framework.setInstructions( "open WI-Fi network, will pop up message.<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.system.event.onCoverageChange(function(){alert("CoverageChanged");});
                alert("Register Coverage Changed");
				framework.test.wait(24*60*60*1000);
  			},	
  			

                  
  	    });

        return testCases;
    }
})();