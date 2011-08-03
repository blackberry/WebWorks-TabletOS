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
			
			"blackberry.ui.dialog.standardAskAsync should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.standardAskAsync);
			},
			
			"blackberry.ui.dialog.customAskAsync should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.customAskAsync);
			},
			
			"blackberry.ui.dialog.standardAskAsync should be a function" : function() {
				Assert.isTypeOf('function', blackberry.ui.dialog.standardAskAsync);
			},
			
			"blackberry.ui.dialog.customAskAsync should be a function" : function() {
				Assert.isTypeOf('function', blackberry.ui.dialog.customAskAsync); 
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
			"MANUAL standardAskAsync D_OK_noOptions should pop up message OK button only": function() {
				framework.test = this;
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				blackberry.ui.dialog.standardAskAsync("Press the OK button", blackberry.ui.dialog.D_OK, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				});
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			 "MANUAL standardAskAsync Save dialog (Save, Disgard, Cancel) should work": function() {
				framework.test = this;
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				blackberry.ui.dialog.standardAskAsync("Press the Save button", blackberry.ui.dialog.D_SAVE, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				});
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"MANUAL standardAskAsync DELETE dialog (Delete, Cancel) should work": function() {
				framework.test = this;
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				blackberry.ui.dialog.standardAskAsync("Press the Cancel button", blackberry.ui.dialog.D_DELETE, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 1); //asserting button pressed as per instructions above
					});
				});
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"MANUAL standardAskAsync YES_NO dialog (YES, NO) should work": function() {
				framework.test = this;
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				blackberry.ui.dialog.standardAskAsync("Press the NO button", blackberry.ui.dialog.D_YES_NO, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 1); //asserting button pressed as per instructions above
					});
				});
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"MANUAL standardAskAsync OK_CANCEL dialog (OK, CANCEL) should work": function() {
				framework.test = this;
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				blackberry.ui.dialog.standardAskAsync("Press the OK button", blackberry.ui.dialog.D_OK_CANCEL, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				});
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//"blackberry.ui.dialog settings tests",playbook only
			"MANUAL blackberry.ui.dialog.standardAskAsync should appear at the bottom" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				var settings = {position : blackberry.ui.dialog.BOTTOM};
				blackberry.ui.dialog.standardAskAsync("Press the OK button if this dialog appears at the bottom, otherwise press cancel", blackberry.ui.dialog.D_OK_CANCEL, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"MANUAL blackberry.ui.dialog.standardAskAsync should appear at the top" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				var settings = {position : blackberry.ui.dialog.TOP};
				blackberry.ui.dialog.standardAskAsync("Press the OK button if this dialog appears at the top, otherwise press cancel", blackberry.ui.dialog.D_OK_CANCEL, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"MANUAL blackberry.ui.dialog.standardAskAsync should appear in the middle" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				var settings = {position : blackberry.ui.dialog.CENTER};
				blackberry.ui.dialog.standardAskAsync("Press the OK button if this dialog appears in the middle, otherwise press cancel", blackberry.ui.dialog.D_OK_CANCEL, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"MANUAL blackberry.ui.dialog.standardAskAsync should appear full sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				var settings = {size : blackberry.ui.dialog.SIZE_FULL};
				blackberry.ui.dialog.standardAskAsync("Press the OK button if this dialog appears full sized, otherwise press cancel", blackberry.ui.dialog.D_OK_CANCEL, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"MANUAL blackberry.ui.dialog.standardAskAsync should appear large sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				var settings = {size : blackberry.ui.dialog.SIZE_LARGE};
				blackberry.ui.dialog.standardAskAsync("Press the OK button if this dialog appears large sized, otherwise press cancel", blackberry.ui.dialog.D_OK_CANCEL, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"MANUAL blackberry.ui.dialog.standardAskAsync should appear medium sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				var settings = {size : blackberry.ui.dialog.SIZE_MEDIUM};
				blackberry.ui.dialog.standardAskAsync("Press the OK button if this dialog appears medium sized, otherwise press cancel", blackberry.ui.dialog.D_OK_CANCEL, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"MANUAL blackberry.ui.dialog.standardAskAsync should appear small sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				var settings = {size : blackberry.ui.dialog.SIZE_SMALL};
				blackberry.ui.dialog.standardAskAsync("Press the OK button if this dialog appears small sized, otherwise press cancel", blackberry.ui.dialog.D_OK_CANCEL, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"MANUAL blackberry.ui.dialog.standardAskAsync should appear tall sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				var settings = {size : blackberry.ui.dialog.SIZE_TALL};
				blackberry.ui.dialog.standardAskAsync("Press the OK button if this dialog appears tall sized, otherwise press cancel", blackberry.ui.dialog.D_OK_CANCEL, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"MANUAL blackberry.ui.dialog.customAskAsync should appear at the bottom" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				var settings = {title : "A Great Title", size : blackberry.ui.dialog.SIZE_MEDIUM, position : blackberry.ui.dialog.BOTTOM};
				var choices = new Array("OK", "Incorrect Title", "Incorrect Position", "Incorrect Size");
				blackberry.ui.dialog.customAskAsync("Press the OK button if this dialog appears medium sized, has a title, 'A Great Title' and appears at the bottom, otherwise indicate failure", choices, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"MANUAL blackberry.ui.dialog.customAskAsync should appear at the top" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				var settings = {position : blackberry.ui.dialog.TOP};
				var choices = new Array("Pass", "Fail", "Epic Fail");
				blackberry.ui.dialog.customAskAsync("Press the Pass button if this dialog appears at the top, otherwise press Fail", choices, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"MANUAL blackberry.ui.dialog.customAskAsync should appear in the middle" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				var settings = {position : blackberry.ui.dialog.CENTER};
				var choices = new Array("Pass", "Fail", "Epic Fail");
				blackberry.ui.dialog.customAskAsync("Press the Pass button if this dialog appears in the middle, otherwise press Fail", choices, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"MANUAL blackberry.ui.dialog.customAskAsync should appear full sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				var settings = {size : blackberry.ui.dialog.SIZE_FULL};
				var choices = new Array("Pass", "Fail", "Epic Fail");
				blackberry.ui.dialog.customAskAsync("Press the Pass button if this dialog appears full sized, otherwise press Fail", choices, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"MANUAL blackberry.ui.dialog.customAskAsync should appear large sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				var settings = {size : blackberry.ui.dialog.SIZE_LARGE};
				var choices = new Array("Pass", "Fail", "Epic Fail");
				blackberry.ui.dialog.customAskAsync("Press the Pass button if this dialog appears large sized, otherwise press Fail", choices, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"MANUAL blackberry.ui.dialog.customAskAsync should appear medium sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				var settings = {size : blackberry.ui.dialog.SIZE_MEDIUM};
				var choices = new Array("Pass", "Fail", "Epic Fail");
				blackberry.ui.dialog.customAskAsync("Press the Pass button if this dialog appears medium sized, otherwise press Fail", choices, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"MANUAL blackberry.ui.dialog.customAskAsync should appear small sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				var settings = {size : blackberry.ui.dialog.SIZE_SMALL};
				var choices = new Array("Pass", "Fail", "Epic Fail");
				blackberry.ui.dialog.customAskAsync("Press the Pass button if this dialog appears small sized, otherwise press Fail", choices, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"MANUAL blackberry.ui.dialog.customAskAsync should appear tall sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Follow the instructions in the dialog, if no dialog appears fail this test");
				var settings = {size : blackberry.ui.dialog.SIZE_TALL};
				var choices = new Array("Pass", "Fail", "Epic Fail");
				blackberry.ui.dialog.customAskAsync("Press the Pass button if this dialog appears tall sized, otherwise press Fail", choices, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			

			"MANUAL blackberry.ui.dialog.standardAskAsync system should not exit" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Exit application without closing the dialog, if Exit applies then fail this test");
				var settings = {global:true};
				//blackberry.ui.dialog.standardAskAsync("Large_Bottom?", blackberry.ui.dialog.D_OK, 0, settings);
				blackberry.ui.dialog.standardAskAsync("Press the OK button if application couldn't exit, otherwise press cancel",blackberry.ui.dialog.D_OK_CANCEL, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			

			"MANUAL blackberry.ui.dialog.customAskAsync system should not exit" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Exit application without closing the dialog, if Exit applies then fail this test");
				var settings = {global:true};
				var choices = new Array("Pass", "Fail");
				blackberry.ui.dialog.customAskAsync("Press the Pass button if application couldn't exit, otherwise press Fail", choices, function(result){
					framework.test.resume(function (){
						Assert.areEqual(result, 0); //asserting button pressed as per instructions above
					});
				},
				settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
		});
		return testCases;
	}
})();
