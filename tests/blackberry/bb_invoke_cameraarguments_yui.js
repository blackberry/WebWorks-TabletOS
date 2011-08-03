(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;

        testCases[0] = new Y.Test.Case({
            name: "blackberry.invoke for Camera",
			
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
                    "blackberry.invoke.CameraArguments should return error if invoked with bad integer value" : "Invalid view for CameraArgumentsObject.",
                }                
            },
			
			"blackberry.invoke.CameraArguments should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.CameraArguments);
			},
			
			"blackberry.invoke.CameraArguments.VIEW_CAMERA should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.CameraArguments.VIEW_CAMERA);
				Assert.areSame(blackberry.invoke.CameraArguments.VIEW_CAMERA, 0);
			},
			
			"blackberry.invoke.CameraArguments.VIEW_RECORDER should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.CameraArguments.VIEW_RECORDER);
				Assert.areSame(blackberry.invoke.CameraArguments.VIEW_RECORDER, 1);
			},						
        
			"blackberry.invoke.CameraArguments should return error if invoked with bad integer value" : function() {
				try {
					var args = new blackberry.invoke.CameraArguments();
					args.view = 2; //Bad value
					blackberry.invoke.invoke(blackberry.invoke.APP_CAMERA,args);
				} catch (err) {
					throw new Error(err);
				}
			},
		
			//Open up camera with VIEW_CAMERA
			"Manual Test 1 should invoke Camera and go to camera mode": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Camera should open and be in camera mode");
				
				alert("Will attempt to invoke camera with VIEW_CAMERA");
				var args = new blackberry.invoke.CameraArguments();
                args.view = 0;
                blackberry.invoke.invoke(blackberry.invoke.APP_CAMERA,args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Open up camera with VIEW_RECORDER
			"Manual Test 2 should invoke Camera and go to recorder mode": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Camera should open and be in recorder mode");
				
				alert("Will attempt to invoke camera with VIEW_RECORDER");
				var args = new blackberry.invoke.CameraArguments();
                args.view = 1;
                blackberry.invoke.invoke(blackberry.invoke.APP_CAMERA,args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Open up camera with view set to a string
			"Manual Test 3 should invoke Camera with a string and go to default camera mode": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Default camera mode should open up");
				
				alert("Will attempt to invoke camera with view=string");
				var args = new blackberry.invoke.CameraArguments();
                args.view = 'Test';
                blackberry.invoke.invoke(blackberry.invoke.APP_CAMERA,args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
		
        });
	
        return testCases;
    }
})();