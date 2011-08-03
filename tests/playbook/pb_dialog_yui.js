(function(){
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases[0] = new Y.Test.Case({
			name: "blackberry.ui.dialog Test",
			
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
			
			"blackberry.ui.dialog.standardAsk should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.standardAsk);
			},
			
			"blackberry.ui.dialog.customAsk should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.customAsk);
			},
			
			"blackberry.ui.dialog.standardAsk should be a function" : function() {
				Assert.isTypeOf('function', blackberry.ui.dialog.standardAsk);
			},
			
			"blackberry.ui.dialog.customAsk should be a function" : function() {
				Assert.isTypeOf('function', blackberry.ui.dialog.customAsk); 
			},
			
			"blackberry.ui.dialog.D_OK should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.D_OK);
				Assert.isNumber(blackberry.ui.dialog.D_OK);
				Assert.areEqual(blackberry.ui.dialog.D_OK, 0);
				
			},
			
			"blackberry.ui.dialog.D_SAVE should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.D_SAVE);
				Assert.isNumber(blackberry.ui.dialog.D_SAVE);
				Assert.areEqual(blackberry.ui.dialog.D_SAVE, 1);
			},
			
			"blackberry.ui.dialog.D_DELETE should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.D_DELETE);
				Assert.isNumber(blackberry.ui.dialog.D_DELETE);
				Assert.areEqual(blackberry.ui.dialog.D_DELETE, 2);
			},
			
			"blackberry.ui.dialog.D_YES_NO should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.D_YES_NO);
				Assert.isNumber(blackberry.ui.dialog.D_YES_NO);
				Assert.areEqual(blackberry.ui.dialog.D_YES_NO ,3);
			},
			
			"blackberry.ui.dialog.D_OK_CANCEL should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.D_OK_CANCEL);
				Assert.isNumber(blackberry.ui.dialog.D_OK_CANCEL);
				Assert.areEqual(blackberry.ui.dialog.D_OK_CANCEL, 4);
			},
			
			"blackberry.ui.dialog.BOTTOM should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.BOTTOM);
				Assert.isString(blackberry.ui.dialog.BOTTOM);
				Assert.areEqual(blackberry.ui.dialog.BOTTOM, "bottomCenter");
			},
			
			"blackberry.ui.dialog.CENTER should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.CENTER);
				Assert.isString(blackberry.ui.dialog.CENTER);
				Assert.areEqual(blackberry.ui.dialog.CENTER, "middleCenter");
			},
			
			"blackberry.ui.dialog.TOP should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.TOP);
				Assert.isString(blackberry.ui.dialog.TOP);
				Assert.areEqual(blackberry.ui.dialog.TOP, "topCenter");
			},
			
			"blackberry.ui.dialog.SIZE_FULL should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.SIZE_FULL);
				Assert.isString(blackberry.ui.dialog.SIZE_FULL);
				Assert.areEqual(blackberry.ui.dialog.SIZE_FULL, "full");
			},
			
			"blackberry.ui.dialog.SIZE_LARGE should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.SIZE_LARGE);
				Assert.isString(blackberry.ui.dialog.SIZE_LARGE);
				Assert.areEqual(blackberry.ui.dialog.SIZE_LARGE, "large");
			},
			
			"blackberry.ui.dialog.SIZE_MEDIUM should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.SIZE_MEDIUM);
				Assert.isString(blackberry.ui.dialog.SIZE_MEDIUM);
				Assert.areEqual(blackberry.ui.dialog.SIZE_MEDIUM, "medium");
			},
			
			"blackberry.ui.dialog.SIZE_SMALL should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.SIZE_SMALL);
				Assert.isString(blackberry.ui.dialog.SIZE_SMALL);
				Assert.areEqual(blackberry.ui.dialog.SIZE_SMALL, "small");
			},
			
			"blackberry.ui.dialog.SIZE_TALL should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.SIZE_TALL);
				Assert.isString(blackberry.ui.dialog.SIZE_TALL);
				Assert.areEqual(blackberry.ui.dialog.SIZE_TALL, "tall");
			},
			
			//blackberry.ui.dialog manual test
			"standardAsk D_OK_noOptions should pop up message OK button only": function() {
				framework.test = this;
				framework.setInstructions( "standardAsk OK dialog with globalStatus=true.<br />Pass this test if this is true.  Otherwise, fail.");
				//alert("st_D_OK_noOptions");
				blackberry.ui.dialog.standardAsk("Are you Ok?", blackberry.ui.dialog.D_OK, function(result){
					alert (result);
				});
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			 "standardAsk Save dialog (Save, Disgard, Cancel) should work": function() {
				framework.test = this;
				framework.setInstructions("standardAsk OK dialog with globalStatus=true.<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.ui.dialog.standardAsk("Do you want to SAVE or DISGARD?", blackberry.ui.dialog.D_SAVE, function(result){
					alert (result);
				});
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"standardAsk DELETE dialog (Delete, Cancel) should work": function() {
				framework.test = this;
				framework.setInstructions("standardAsk DELETE dialog   (Delete, Cancel).<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.ui.dialog.standardAsk("Do you want to DELETE or CANCEL?", blackberry.ui.dialog.D_DELETE, function(result){
					alert (result);
				});
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"standardAsk YES_NO dialog (YES, NO) should work": function() {
				framework.test = this;
				framework.setInstructions("standardAsk YES_NO dialog (YES, NO).<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.ui.dialog.standardAsk("Do you like basketball?", blackberry.ui.dialog.D_YES_NO, function(result){
					alert (result);
				});
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"standardAsk OK_CANCEL dialog (OK, CANCEL) should work": function() {
				framework.test = this;
				framework.setInstructions("standardAsk OK_CANCEL dialog   (OK, CANCEL).<br />Pass this test if this is true.  Otherwise, fail.");
				blackberry.ui.dialog.standardAsk("Would you like some water?", blackberry.ui.dialog.D_OK_CANCEL, function(result){
					alert (result);
				});
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//"blackberry.ui.dialog settings tests",playbook only
			"blackberry.ui.dialog.standardAsk should appear at the bottom" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = {position : blackberry.ui.dialog.BOTTOM};
				blackberry.ui.dialog.standardAsk("Pass this test if the dialog appears at the bottom", blackberry.ui.dialog.D_OK, function(result){
					alert (result);
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.standardAsk should appear at the top" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = {position : blackberry.ui.dialog.TOP};
				blackberry.ui.dialog.standardAsk("Pass this test if the dialog appears at the top", blackberry.ui.dialog.D_OK, function(result){
					alert (result);
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.standardAsk should appear in the middle" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = {position : blackberry.ui.dialog.CENTER};
				blackberry.ui.dialog.standardAsk("Pass this test if the dialog appears in the middle", blackberry.ui.dialog.D_OK, function(result){
					alert (result);
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.standardAsk should appear full sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = {size : blackberry.ui.dialog.SIZE_FULL};
				blackberry.ui.dialog.standardAsk("Pass this test if the dialog appears full sized", blackberry.ui.dialog.D_OK, function(result){
					alert (result);
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.standardAsk should appear large sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = {size : blackberry.ui.dialog.SIZE_LARGE};
				blackberry.ui.dialog.standardAsk("Pass this test if the dialog appear large sized", blackberry.ui.dialog.D_OK, function(result){
					alert (result);
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.standardAsk should appear medium sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = {size : blackberry.ui.dialog.SIZE_MEDIUM};
				blackberry.ui.dialog.standardAsk("Pass this test if the dialog appear medium sized", blackberry.ui.dialog.D_OK, function(result){
					alert (result);
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.standardAsk should appear small sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = {size : blackberry.ui.dialog.SIZE_SMALL};
				blackberry.ui.dialog.standardAsk("Pass this test if the dialog appear small sized", blackberry.ui.dialog.D_OK, function(result){
					alert (result);
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.standardAsk should appear tall sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = {size : blackberry.ui.dialog.SIZE_TALL};
				blackberry.ui.dialog.standardAsk("Pass this test if the dialog appear tall sized", blackberry.ui.dialog.D_OK, function(result){
					alert (result);
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.customAsk should appear at the bottom" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = {title : "The Title", size : blackberry.ui.dialog.SIZE_MEDIUM, position : blackberry.ui.dialog.BOTTOM};
				var choices = new Array("Ferrari", "BMW", "Mercedes");
				blackberry.ui.dialog.customAsk("Pass this test if the dialog appears at the bottom", choices, function(result){
					alert (result);
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.customAsk should appear at the top" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = {position : blackberry.ui.dialog.TOP};
				var choices = new Array("Ferrari", "BMW", "Mercedes");
				blackberry.ui.dialog.customAsk("Pass this test if the dialog appears at the top", choices, function(result){
					alert (result);
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.customAsk should appear in the middle" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = {position : blackberry.ui.dialog.CENTER};
				var choices = new Array("Ferrari", "BMW", "Mercedes");
				blackberry.ui.dialog.customAsk("Pass this test if the dialog appears in the middle", choices, function(result){
					alert (result);
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.customAsk should appear full sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = {size : blackberry.ui.dialog.SIZE_FULL};
				var choices = new Array("Ferrari", "BMW", "Mercedes");
				blackberry.ui.dialog.customAsk("Pass this test if the dialog appears full sized", choices, function(result){
					alert (result);
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.customAsk should appear large sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = {size : blackberry.ui.dialog.SIZE_LARGE};
				var choices = new Array("Ferrari", "BMW", "Mercedes");
				blackberry.ui.dialog.customAsk("Pass this test if the dialog appear large sized", choices, function(result){
					alert (result);
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.customAsk should appear medium sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = {size : blackberry.ui.dialog.SIZE_MEDIUM};
				var choices = new Array("Ferrari", "BMW", "Mercedes");
				blackberry.ui.dialog.customAsk("Pass this test if the dialog appear medium sized", choices, function(result){
					alert (result);
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.customAsk should appear small sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = {size : blackberry.ui.dialog.SIZE_SMALL};
				var choices = new Array("Ferrari", "BMW", "Mercedes");
				blackberry.ui.dialog.customAsk("Pass this test if the dialog appear small sized", choices, function(result){
					alert (result);
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.customAsk should appear tall sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = {size : blackberry.ui.dialog.SIZE_TALL};
				var choices = new Array("Ferrari", "BMW", "Mercedes");
				blackberry.ui.dialog.customAsk("Pass this test if the dialog appear tall sized", choices, function(result){
					alert (result);
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
		});
		return testCases;
	}
})();
