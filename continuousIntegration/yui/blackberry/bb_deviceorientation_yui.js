(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;		
		var eventLocal = new Object();
			
        testCases[0] = new Y.Test.Case({
            name: "Playbook DeviceOrientationEvent Tests",
		
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
			
			/*
			 * Existance Tests
			 */
			 
			"DeviceOrientationEvent alpha should exist" : function() {
				framework.test = this;
				var passed = false;
				var errorM = "";
		     	window.addEventListener("deviceorientation", function(event) {
					if (event.alpha != undefined) {
						passed = true;
					}
				}, true);
					
				framework.test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 500);  
				//Assert.isNotUndefined(event.alpha);
			},
			
			"DeviceOrientationEvent beta should exist" : function() {
				framework.test = this;
				var passed = false;
				var errorM = "";
		     	window.addEventListener("deviceorientation", function(event) {
					if (event.beta != undefined) {
						passed = true;
					}
				}, true);
					
				framework.test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 500);  
				//Assert.isNotUndefined(event.beta);
			},
			
			"DeviceOrientationEvent gamma should exist" : function() {
				framework.test = this;
				var passed = false;
				var errorM = "";
		     	window.addEventListener("deviceorientation", function(event) {
					if (event.gamma != undefined) {
						passed = true;
					}
				}, true);
					
				framework.test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 500);  
				//Assert.isNotUndefined(event.gamma);
			},
			
			"DeviceOrientationEvent absolute should exist" : function() {
				framework.test = this;
				var passed = false;
				var errorM = "";
		     	window.addEventListener("deviceorientation", function(event) {
					if (event.absolute != undefined) {
						passed = true;
					}
				}, true);
					
				framework.test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 500);  
				//Assert.isNotUndefined(event.absolute);
			},
			
			"DeviceOrientationEvent compassCalibrated should exist" : function() {
				framework.test = this;
				var passed = false;
				var errorM = "";
		     	window.addEventListener("deviceorientation", function(event) {
					if (event.compassCalibrated != undefined) {
						passed = true;
					}
				}, true);
					
				framework.test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 500);  
				//Assert.isNotUndefined(event.compassCalibrated);
			},			
			
			"DeviceOrientationEvent initDeviceOrientationEvent should exist" : function() {
				framework.test = this;
				var passed = false;
				var errorM = "";
		     	window.addEventListener("deviceorientation", function(event) {
					if (event.initDeviceOrientationEvent != undefined) {
						passed = true;
					}
				}, true);
					
				framework.test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 500);  
			},
			
			"Device Motion event_triggered should work": function () {
				framework.test = this;
				var passed = false;
				var errorM = "";
				window.addEventListener("devicemotion", function(event) {
					// Process event.acceleration, event.accelerationIncludingGravity,
					// event.rotationRate and event.interval
					if (event){passed = true;}
				}, true);
					
				framework.test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 500);  
			},
			
			"Device Motion event.acceleration should work": function () {
				framework.test = this;
				var passed = false;
				var errorM = "";
				window.addEventListener("devicemotion", function(event) {
					// Process event.acceleration, event.accelerationIncludingGravity,
					// event.rotationRate and event.interval
					if (event.acceleration){passed = true;}
				}, true);
					
				framework.test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 500);  
			},
			
			"Device Motion event.accelerationIncludingGravity should work": function () {
				framework.test = this;
				var passed = false;
				var errorM = "";
				window.addEventListener("devicemotion", function(event) {
					// Process event.acceleration, event.accelerationIncludingGravity,
					// event.rotationRate and event.interval
					if (event.accelerationIncludingGravity){passed = true;}
				}, true);
					
				framework.test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 500);  
			},
			
			"Device Motion event.rotationRate should work": function () {
				framework.test = this;
				var passed = false;
				var errorM = "";
				window.addEventListener("devicemotion", function(event) {
					// Process event.acceleration, event.accelerationIncludingGravity,
					// event.rotationRate and event.interval
					if (event.rotationRate){passed = true;}
				}, true);
					
				framework.test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 500);  
			},
			
			"Device Motion event.interval should work": function () {
				framework.test = this;
				var passed = false;
				var errorM = "";
				window.addEventListener("devicemotion", function(event) {
					// Process event.acceleration, event.accelerationIncludingGravity,
					// event.rotationRate and event.interval
					if (event.interval){passed = true;}
				}, true);
					
				framework.test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 500);  
			},
			
			/*
			 * Manual Tests
			 */
			
			"MANUAL 1 should show the device orientation": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("alpha, beta and gamma values should be changing appropriately");
				
				framework.setIFrameSource("HTML5/Motion/deviceOrientation.html");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click)
			},
			
			"MANUAL acceleration_0_while_still should work": function(){
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "Acceleration should read 0 lying flat on table";
				
				//do some manual test output
				framework.setIFrameSource("HTML5/Motion/LayDownAccel.html");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click)
			},
			
			"MANUAL accelerationGrav_9.8_while_still should work": function(){
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "Acceleration including gravity should read 9.8 lying flat on table";
				
				//do some manual test output
				framework.setIFrameSource("HTML5/Motion/LayDownAccel_Grav.html");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click)
			},
			
			"MANUAL rotation_rate should work": function(){
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "Rotation Rate should be measurable";
				
				//do some manual test output
				framework.setIFrameSource("HTML5/Motion/RotRate.html");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click)
			},
			
			"MANUAL motion_report_interval should work": function(){
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "Reporting interval should have a value";
				
				//do some manual test output
				framework.setIFrameSource("HTML5/Motion/Interval.html");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click)
			},
		
        });

        return testCases;
    }
})();