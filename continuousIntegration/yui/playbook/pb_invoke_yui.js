(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;

        testCases[0] = new Y.Test.Case({
            name: "blackberry.invoke Tests",
			
			_should: {
                error: {
					"blackberry.invoke.APP_BROWSER should return invalid type when passed undefined" : "Invalid type: 'args'",
					"blackberry.invoke.APP_CAMERA should return invalid type when passed undefined" : "Invalid type: 'args'",					
					"blackberry.invoke.APP_MAPS should return invalid type when passed undefined" : "Invalid type: 'args'"
					//"blackberry.invoke.APP_JAVA should return invalid type when passed undefined" : "Invalid type: 'args'",
					//"blackberry.invoke.APP_ADDRESSBOOK should return invalid type when passed undefined" : "Invalid type: 'args'",
					//"blackberry.invoke.APP_CALENDAR should return invalid type when passed undefined" : "Invalid type: 'args'",
					//"blackberry.invoke.APP_MEMO should return invalid type when passed undefined" : "Invalid type: 'args'",
					//"blackberry.invoke.APP_MESSAGE should return invalid type when passed undefined" : "Invalid type: 'args'",					
					//"blackberry.invoke.APP_PHONE should return invalid type when passed undefined" : "Invalid type: 'args'",
					//"blackberry.invoke.APP_SEARCH should return invalid type when passed undefined" : "Invalid type: 'args'",
					//"blackberry.invoke.APP_TASK should return invalid type when passed undefined" : "Invalid type: 'args'",					
					//"blackberry.invoke.APP_JAVA should return undefined" : "Missing required argument: 'args'",
					//"blackberry.invoke.APP_JAVA should return undefined" : ""
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
		
	        
			/* PLAYBOOK SPECIFIC TESTS 
				const Number  APP_CAMERA  = 4 
				const Number  APP_MAPS  = 5 
				const Number  APP_BROWSER  = 11 
				const Number  APP_MUSIC  = 13 
				const Number  APP_PHOTOS  = 14 
				const Number  APP_VIDEOS  = 15 
				const Number  APP_APPWORLD  = 16 
				const Number  APP_UPDATE  = 17  
			*/
	
			"blackberry.invoke.APP_CAMERA should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_CAMERA);
				Assert.areSame(blackberry.invoke.APP_CAMERA, 4);
			},
			
			"blackberry.invoke.APP_MAPS should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_MAPS);
				Assert.areSame(blackberry.invoke.APP_MAPS, 5);
			},
			
			"blackberry.invoke.APP_BROWSER should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_BROWSER);
				Assert.areSame(blackberry.invoke.APP_BROWSER, 11);
			},
			
			"blackberry.invoke.APP_MUSIC should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_MUSIC);
				Assert.areSame(blackberry.invoke.APP_MUSIC, 13);
			},
			
			"blackberry.invoke.APP_PHOTOS should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_PHOTOS);
				Assert.areSame(blackberry.invoke.APP_PHOTOS, 14);
			},
		
			"blackberry.invoke.APP_VIDEOS should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_VIDEOS);
				Assert.areSame(blackberry.invoke.APP_VIDEOS, 15);
			},
			
			"blackberry.invoke.APP_APPWORLD should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.APP_APPWORLD);
				Assert.areSame(blackberry.invoke.APP_APPWORLD, 16);
			},
		
			"blackberry.invoke.APP_UPDATE should NOT exist" : function() {
				Assert.isUndefined(blackberry.invoke.APP_UPDATE);
			},

			/* END PLAYBOOK SPECIFIC TESTS */
            
	
		

	        /*
			 * PLAYBOOK SPECIFIC TESTS
			 */
			
			//MANUAL tests here for invoke just opens up basic applications without passing parameters
			//Passing parameters are tests that will be run in other invoke YUI js files
		
			//Invoke Basic Browser
			"MANUAL Test1 - should invoke Browser": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("The Browser application should be invoked.<br />Pass this test if this is true.  Otherwise, fail.");	
				try{
					blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER);
				}catch(e){
					alert(e);
				}
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Basic Camera
			"MANUAL Test2 - should invoke Camera": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("The Camera application should be invoked.<br />Pass this test if this is true.  Otherwise, fail.");			
				try{
					blackberry.invoke.invoke(blackberry.invoke.APP_CAMERA);
				}catch(e){
					alert(e);
				}
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Basic Music
			"MANUAL Test3 - should invoke Music": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("The Music application should be invoked.<br />Pass this test if this is true.  Otherwise, fail.");	
				//alert("Will attempt to invoke the Music application");
				try{
					blackberry.invoke.invoke(blackberry.invoke.APP_MUSIC);
				}catch(e){
					alert(e);
				}
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Basic Photos
			"MANUAL Test4 - should invoke Photos": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("The Photo application should be invoked.<br />Pass this test if this is true.  Otherwise, fail.");
				//alert("Will attempt to invoke the Photos application");
				
				try{
					blackberry.invoke.invoke(blackberry.invoke.APP_PHOTOS);
				}catch(e){
					alert(e);
				}
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Basic Videos
			"MANUAL Test5 - should invoke Videos": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("The Video application should be invoked.<br />Pass this test if this is true.  Otherwise, fail.");			
				//alert("Will attempt to invoke the Videos application");
				
				try{
					blackberry.invoke.invoke(blackberry.invoke.APP_VIDEOS);
				}catch(e){
					alert(e);
				}
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Basic AppWorld
			"MANUAL Test6 - should invoke AppWorld": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("The AppWorld application should be invoked.<br />Pass this test if this is true.  Otherwise, fail.");		
				//alert("Will attempt to invoke the AppWorld application");
				
				try{
					blackberry.invoke.invoke(blackberry.invoke.APP_APPWORLD);
				}catch(e){
					alert(e);
				}
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Basic Maps
			"MANUAL Test7 - should invoke Maps": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("The Maps application should be invoked.<br />Pass this test if this is true.  Otherwise, fail.");
				//alert("Will attempt to invoke the Maps application");
				try{
					blackberry.invoke.invoke(blackberry.invoke.APP_MAPS);
				}catch(e){
					alert(e);
				}
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Basic Update
			"MANUAL Test8 - should NOT invoke Update": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("The Update application should NOT be invoked.<br />Pass this test if this is true.  Otherwise, fail.");
				try{
					blackberry.invoke.invoke(blackberry.invoke.APP_UPDATE);
				}catch(e){
					alert(e);
				}
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			/*
			 * END PLAYBOOK SPECIFIC TESTS
			 */
			
				
			//Open up the browser when passing a null
			"MANUAL Test9 - should invoke Browser when parameter is a null": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be browser opening up but not going anywhere");
				
				blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, null);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
					
            //Open up the Music when passing a null
			"MANUAL Test10 - should invoke Music when parameter is a null": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be Music opening up");
				blackberry.invoke.invoke(blackberry.invoke.APP_MUSIC, null);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},			
			
			//Open up the camera when passing a null
			"MANUAL Test11 - should invoke Camera when parameter is a null": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be camera opening up");
				
				//alert("Will attempt to invoke Camera and pass a null");
				blackberry.invoke.invoke(blackberry.invoke.APP_CAMERA, null);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
		
			//Open up the maps when passing a null
			"MANUAL Test12 - should invoke Maps when parameter is a null": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be Maps opening up");
				blackberry.invoke.invoke(blackberry.invoke.APP_MAPS, null);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Open up the VIDEOS when passing a null
			"MANUAL Test13 - should invoke VIDEOS when parameter is a null": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be VIDEOS opening up");
				blackberry.invoke.invoke(blackberry.invoke.APP_VIDEOS, null);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Open up the application APPWORLD when passing a null
			"MANUAL Test14 - should invoke APPWORLD when parameter is a null": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be APPWORLD opening up");
				blackberry.invoke.invoke(blackberry.invoke.APP_APPWORLD, null);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Open up the application UPDATE when passing a null
			"MANUAL Test15 - should NOT invoke UPDATE when parameter is a null": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be UPDATE NOT opening up");
				try{
					blackberry.invoke.invoke(blackberry.invoke.APP_UPDATE, null);
				}catch(e){
					alert(e);
				}
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Open up the application Photo when passing a null
			"MANUAL Test16 - should invoke Photo when parameter is a null": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be Photo opening up");
				blackberry.invoke.invoke(blackberry.invoke.APP_PHOTOS, null);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			}
			
            /*		    
			
			//Attempt to open up the browser when passing a undefined
			"blackberry.invoke.APP_BROWSER should return invalid type when passed undefined": function() {
				try {
					blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, undefined);
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
			
			
			//Attempt to open up the maps when passing a undefined
			"blackberry.invoke.APP_MAPS should return invalid type when passed undefined": function() {
				try {
					blackberry.invoke.invoke(blackberry.invoke.APP_MAPS, undefined);
				} catch (err) {
					throw new Error(err);
				}
			},
			*/
		
			
		});

        return testCases;
    }
})();