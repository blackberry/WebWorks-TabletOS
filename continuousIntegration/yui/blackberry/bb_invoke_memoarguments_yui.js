(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;
			
        testCases[0] = new Y.Test.Case({
            name: "blackberry.invoke for Memo",
			
			_should: {
                error: {
                    
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
			
			"blackberry.invoke.MemoArguments should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.MemoArguments);
			},
			
			"blackberry.invoke.MemoArguments.VIEW_NEW should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.MemoArguments.VIEW_NEW);
				Assert.areSame(0, blackberry.invoke.MemoArguments.VIEW_NEW);
			},
			
			"blackberry.invoke.MemoArguments.VIEW_EDIT should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.MemoArguments.VIEW_EDIT);
				Assert.areSame(1, blackberry.invoke.MemoArguments.VIEW_EDIT);
			},	    
			
			//Invoke Memo with no parameters and VIEW_NEW
			"MANUAL 1 should invoke memo with no parameters and VIEW_NEW": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Memo compose shows up");
				
				alert("Will attempt to invoke Memo using MemoArguments with no parameters and VIEW_NEW");
				var args = new blackberry.invoke.MemoArguments();
				args.view = blackberry.invoke.MemoArguments.VIEW_NEW;
				blackberry.invoke.invoke(blackberry.invoke.APP_MEMOPAD, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Memo with parameters and VIEW_NEW
			"MANUAL 2 should invoke memo with parameters and VIEW_NEW": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Memo compose shows up with parameters");
				
				alert("Will attempt to invoke Memo using MemoArguments with parameters and VIEW_NEW");
				var memo = new blackberry.pim.Memo();
				memo.title = 'Oranges I like';
				memo.note = 'Sunkist';
				var args = new blackberry.invoke.MemoArguments(memo);
				args.view = 0;
				blackberry.invoke.invoke(blackberry.invoke.APP_MEMOPAD, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Memo with parameters and VIEW_EDIT
			"MANUAL 3 should invoke memo with parameters and VIEW_EDIT": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Memo compose shows up with parameters");
				
				alert("Will attempt to invoke Memo using MemoArguments with parameters and VIEW_EDIT");
				var memo = new blackberry.pim.Memo();
				memo.title = 'Saved Memo Title';
				memo.note = 'Saved Memo Note';
				memo.save();
				var args = new blackberry.invoke.MemoArguments(memo);
				args.view = 1;   
				blackberry.invoke.invoke(blackberry.invoke.APP_MEMOPAD, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
		
			//Negative Cases - null, undefined, empty, view=-1, view=string
        
        });
		
        return testCases;
    }
})();