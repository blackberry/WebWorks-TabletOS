(function() {               
	var framework = YUI.framework;
	var testDomain = ""
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		
		testCases["suiteName"] = "webDB tests";
		
		//---------------------------------------------------------------------
		// webDB tests
		//---------------------------------------------------------------------			


		testCases[0] = new Y.Test.Case({
			
			name: "ManifestCache tests",

			setUp : function () {
				//Setup
			},
			
			tearDown : function () {
				//tearDown
			},

//#1
			
			"ApplicationCache_ifDefined should work": function () {
	
				var errorM = "";
				function ApplicationCache_ifDefined() {
		      		var cache = window.applicationCache
					if(cache == undefined) {
					errorM+= "window.applicationCache was not defined";
						return false;
					}
					else {
						return true;
					}
		    	} 
				Y.Assert.isTrue(ApplicationCache_ifDefined(),errorM);
			},

//#2
			
			"ApplicationCache_UNCACHED_const should work": function () {
	
				var errorM = "";
				function ApplicationCache_UNCACHED_const() {
		      		if(window.applicationCache.UNCACHED != 0) {
						errorM+= "found constant of " + window.applicationCache.UNCACHED + ", should be 0";
						return false;
					}
					else {
						return true;
					}
		    	} 
				Y.Assert.isTrue(ApplicationCache_UNCACHED_const(), errorM);
			},

//#3
			
			"ApplicationCache_IDLE_const should work": function () {
	
				var errorM = "";
				function ApplicationCache_IDLE_const() {
		      		if(window.applicationCache.IDLE != 1) {
						errorM+= "found constant of " + window.applicationCache.IDLE + ", should be 1";
						return false;
					}
					else {
						return true;
					}
		    	} 
				Y.Assert.isTrue(ApplicationCache_IDLE_const(),errorM);
			},

//#4
			
			"ApplicationCache_CHECKING_const should work": function () {
	
				var errorM = "";
				function ApplicationCache_CHECKING_const() {
		      		if(window.applicationCache.CHECKING != 2) {
						errorM+= "found constant of " + window.applicationCache.CHECKING + ", should be 2";
						return false;
					}
					else {
						return true;
					}
		    	} 
				Y.Assert.isTrue(ApplicationCache_CHECKING_const(),errorM);
			},

//#5
			
			"ApplicationCache_DOWNLOADING_const should work": function () {
	
				var errorM = "";
				function ApplicationCache_DOWNLOADING_const() {
		      		if(window.applicationCache.DOWNLOADING != 3) {
						errorM+= "found constant of " + window.applicationCache.DOWNLOADING + ", should be 3";
						return false;
					}
					else {
						return true;
					}
		    	} 
				Y.Assert.isTrue(ApplicationCache_DOWNLOADING_const(),errorM);
			},

//#6
			
			"ApplicationCache_UPDATEREADY_const should work": function () {
	
				var errorM = "";
				function ApplicationCache_UPDATEREADY_const() {
		      		if(window.applicationCache.UPDATEREADY != 4) {
						errorM+= "found constant of " + window.applicationCache.UPDATEREADY + ", should be 4";
						return false;
					}
					else {
						return true;
					}
		    	} 
				Y.Assert.isTrue(ApplicationCache_UPDATEREADY_const(),errorM);
			},

//#7
			
			"ApplicationCache_OBSOLETE_const should work": function () {
	
				var errorM = "";
				function ApplicationCache_OBSOLETE_const() {
		      		if(window.applicationCache.OBSOLETE != 5) {
						errorM+= "found constant of " + window.applicationCache.OBSOLETE + ", should be 5";
						return false;
					}
					else {
						return true;
					}
		    	} 
				Y.Assert.isTrue(ApplicationCache_OBSOLETE_const(),errorM);
			},
			

//#8
			
			"ApplicationCache_status_ifDefined should work": function () {
	
				var errorM = "";
				function ApplicationCache_status_ifDefined() {
		      		if(window.applicationCache.status == undefined) {
					errorM+= "window.applicationCache.status was not defined";
						return false;
					}
					else {
						return true;
					}
		    	} 
				Y.Assert.isTrue(ApplicationCache_status_ifDefined(),errorM);
			},

//#9
			
			"ApplicationCache_update_ifDefined should work": function () {
	
				var errorM = "";
				function ApplicationCache_update_ifDefined() {
		      		if(window.applicationCache.update == undefined) {
					errorM+= "window.applicationCache.update was not defined";
						return false;
					}
					else {
						return true;
					}
		    	} 
				Y.Assert.isTrue(ApplicationCache_update_ifDefined(),errorM);
			},

//#10
			
			"ApplicationCache_swapCache_ifDefined should work": function () {
	
				var errorM = "";
				function ApplicationCache_swapCache_ifDefined() {
		      		if(window.applicationCache.swapCache == undefined) {
					errorM+= "window.applicationCache.swapCache was not defined";
						return false;
					}
					else {
						return true;
					}
		    	} 
				Y.Assert.isTrue(ApplicationCache_swapCache_ifDefined(),errorM);
			},
			
			
		});		
/*		
		testCases[1] = new Y.Test.Case({
			
			name: "Manifest Manual tests",

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

//#32
						
			"MANUAL Manifest refresh_test should work": function(){
				
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource("http://10.135.220.111/html5/manifestfileandcache/");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},

		});	
*/			
		return testCases;
	}
})();
