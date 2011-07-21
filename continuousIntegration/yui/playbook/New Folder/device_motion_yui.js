(function() {               
	var framework = YUI.framework;
	var testDomain = ""
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		
		testCases["suiteName"] = "Device Motion tests";
		
			
		
		testCases[0] = new Y.Test.Case({
			
			name: "Device Motion tests",

			setUp : function () {
				//Setup
			},
			
			tearDown : function () {
				//tearDown
			},

//#1
			
			"Device Motion event_triggered should work": function () {
	
					var test = this;
					var passed = false;
					var errorM = "";
		     			window.addEventListener("devicemotion", function(event) {
							// Process event.acceleration, event.accelerationIncludingGravity,
							// event.rotationRate and event.interval
							if (event){passed = true;}
						}, true);
						
					
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 500);  
			},

//#2
			
			"Device Motion event.acceleration should work": function () {
	
					var test = this;
					var passed = false;
					var errorM = "";
		     			window.addEventListener("devicemotion", function(event) {
							// Process event.acceleration, event.accelerationIncludingGravity,
							// event.rotationRate and event.interval
							if (event.acceleration){passed = true;}
						}, true);
						
					
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 500);  
			},

//#3
			
			"Device Motion event.accelerationIncludingGravity should work": function () {
	
					var test = this;
					var passed = false;
					var errorM = "";
		     			window.addEventListener("devicemotion", function(event) {
							// Process event.acceleration, event.accelerationIncludingGravity,
							// event.rotationRate and event.interval
							if (event.accelerationIncludingGravity){passed = true;}
						}, true);
						
					
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 500);  
			},

//#4
			
			"Device Motion event.rotationRate should work": function () {
	
					var test = this;
					var passed = false;
					var errorM = "";
		     			window.addEventListener("devicemotion", function(event) {
							// Process event.acceleration, event.accelerationIncludingGravity,
							// event.rotationRate and event.interval
							if (event.rotationRate){passed = true;}
						}, true);
						
					
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 500);  
			},

//#5
			
			"Device Motion event.interval should work": function () {
	
					var test = this;
					var passed = false;
					var errorM = "";
		     			window.addEventListener("devicemotion", function(event) {
							// Process event.acceleration, event.accelerationIncludingGravity,
							// event.rotationRate and event.interval
							if (event.interval){passed = true;}
						}, true);
						
					
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 500);  
			},
		});
			
			
			
		testCases[1] = new Y.Test.Case({
			
			name: "Device Motion Manual tests",

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

//#6
						
			"MANUAL acceleration_0_while_still should work": function(){

				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "Acceleration should read 0 lying flat on table";
				
				//do some manual test output
				framework.setIFrameSource("HTML5/Motion/LayDownAccel.html");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},

//#7
						
			"MANUAL accelerationGrav_9.8_while_still should work": function(){

				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "Acceleration including gravity should read 9.8 lying flat on table";
				
				//do some manual test output
				framework.setIFrameSource("HTML5/Motion/LayDownAccel_Grav.html");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},


//#8
						
			"MANUAL rotation_rate should work": function(){

				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "Rotation Rate should be measurable";
				
				//do some manual test output
				framework.setIFrameSource("HTML5/Motion/RotRate.html");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},


//#9
						
			"MANUAL motion_report_interval should work": function(){

				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "Reporting interval should have a value";
				
				//do some manual test output
				framework.setIFrameSource("HTML5/Motion/Interval.html");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},


		});	
			
		return testCases;
	}
})();
