(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;
		
        testCases[0] = new Y.Test.Case({
            name: "blackberry.invoke for Task",
			
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
			
			"blackberry.invoke.TaskArguments should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.TaskArguments);
			},
			
			"blackberry.invoke.TaskArguments.VIEW_NEW should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.TaskArguments.VIEW_NEW);
				Assert.areSame(blackberry.invoke.TaskArguments.VIEW_NEW, 0);
			},
			
			"blackberry.invoke.TaskArguments.VIEW_EDIT should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.TaskArguments.VIEW_EDIT);
				Assert.areSame(blackberry.invoke.TaskArguments.VIEW_EDIT, 1);
			},
			
			//Invoke Task with TaskArguments with no parameters defined
			"Manual Test 1 should invoke Task with empty TaskArguments": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be Task application opening up");
				
				//alert("Will attempt to invoke task and passing empty TaskArguments");
				var args = new blackberry.invoke.TaskArguments();
                blackberry.invoke.invoke(blackberry.invoke.APP_TASKS, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Task with TaskArgument-VIEW_NEW-Summary
			"Manual Test 2 should invoke Task with TaskArguments with VIEW_NEW and Summary": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be Task application opening up");
				
				//alert("Will attempt to invoke task and passing TaskArguments with VIEW_NEW");
				var task = new blackberry.pim.Task();
				task.summary = 'Summary and New';
				var args = new blackberry.invoke.TaskArguments(task);
				args.view = 0;
                blackberry.invoke.invoke(blackberry.invoke.APP_TASKS, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Task with TaskArgument-VIEW_EDIT-Summary
			"Manual Test 3 should invoke Task with TaskArguments with VIEW_EDIT and Summary": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be Task application opening up");
				
				//alert("Will attempt to invoke task and passing TaskArguments with VIEW_EDIT");
				var task = new blackberry.pim.Task();
				task.summary = 'Summary and Edit';
				task.save();
				var args = new blackberry.invoke.TaskArguments(task);
				args.view = 1;
                blackberry.invoke.invoke(blackberry.invoke.APP_TASKS, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
	
        });
		
        return testCases;
    }
})();