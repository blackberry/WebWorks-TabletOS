(function() {  
    alert("loading dialog");
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		
		testCases["suiteName"] = "blackberry.ui.dialog TestSuite"; 
	
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

			"blackberry.ui.dialog should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.standardAsk);
			},

			"blackberry.ui.dialog should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.customAsk);
			},
			
			"blackberry.ui.dialog should exist" : function() {
				Assert.isTypeOf('function', blackberry.ui.dialog.standardAsk );
			},
			
			"blackberry.ui.dialog should exist" : function() {
				Assert.isTypeOf('function', blackberry.ui.dialog.customAsk ); 
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
			
			"blackberry.ui.dialog.C_CANCEL should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.C_CANCEL);
				Assert.isNumber(blackberry.ui.dialog.C_CANCEL);
				Assert.areEqual(blackberry.ui.dialog.C_CANCEL, -1);
			},
			
			"blackberry.ui.dialog.C_OK should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.C_OK);
				Assert.isNumber(blackberry.ui.dialog.C_OK);
				Assert.areEqual(blackberry.ui.dialog.C_OK, 0);
			},
			
			"blackberry.ui.dialog.C_SAVE should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.C_SAVE);
				Assert.isNumber(blackberry.ui.dialog.C_SAVE);
				Assert.areEqual(blackberry.ui.dialog.C_SAVE, 1);
			},
			
			"blackberry.ui.dialog.C_DISCARD should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.C_DISCARD);
				Assert.isNumber(blackberry.ui.dialog.C_DISCARD);
				Assert.areEqual(blackberry.ui.dialog.C_DISCARD, 2);
			},
			
			"blackberry.ui.dialog.C_DELETE should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.C_DELETE);
				Assert.isNumber(blackberry.ui.dialog.C_DELETE);
				Assert.areEqual(blackberry.ui.dialog.C_DELETE, 3);
			},
			
			"blackberry.ui.dialog.C_YES should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.C_YES);
				Assert.isNumber(blackberry.ui.dialog.C_YES);
				Assert.areEqual(blackberry.ui.dialog.C_YES, 4);
			},
			
			"blackberry.ui.dialog.C_NO should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.C_NO);
				Assert.isNumber(blackberry.ui.dialog.C_NO);
				Assert.areEqual(blackberry.ui.dialog.C_NO, -1);
			},
		
			
     
//blackberry.ui.dialog manual test			
             "standardAsk D_OK_noOptions should pop up message OK button only": function() {
                framework.test = this;
				framework.setInstructions( "standardAsk OK dialog with globalStatus=true.<br />Pass this test if this is true.  Otherwise, fail.");
				alert("st_D_OK_noOptions");
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_OK, "Are you Ok?");
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			 "standardAsk Save dialog (Save, Disgard, Cancel) should work": function() {
                framework.test = this;
				framework.setInstructions("standardAsk OK dialog with globalStatus=true.<br />Pass this test if this is true.  Otherwise, fail.");
				var t= blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_SAVE, "Do you want to SAVE or DISGARD?");
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"standardAsk Save dialog with default choice C_DISCARD should work": function() {
                framework.test = this;
				framework.setInstructions("standardAsk Save dialog with default choice C_DISCARD.<br />Pass this test if this is true.  Otherwise, fail.");
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_SAVE, "Do you want to SAVE or DISGARD?", blackberry.ui.dialog.C_DISCARD);
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"standardAsk DELETE dialog   (Delete, Cancel) should work": function() {
                framework.test = this;
				framework.setInstructions("standardAsk DELETE dialog   (Delete, Cancel).<br />Pass this test if this is true.  Otherwise, fail.");
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_DELETE, "Do you want to DELETE or CANCEL?");
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"standardAsk DELETE dialog with default choice C_DELETE should work": function() {
                framework.test = this;
				framework.setInstructions("standardAsk DELETE dialog with default choice C_DELETE.<br />Pass this test if this is true.  Otherwise, fail.");
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_DELETE, "Do you want to DELETE or CANCEL?", blackberry.ui.dialog.C_DELETE);
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"standardAsk YES_NO dialog   (YES, NO) should work": function() {
                framework.test = this;
				framework.setInstructions("standardAsk YES_NO dialog   (YES, NO).<br />Pass this test if this is true.  Otherwise, fail.");
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_YES_NO, "Do you like basketball?");
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"standardAsk YES_NO dialog with default choise NO should work": function() {
                framework.test = this;
				framework.setInstructions("standardAsk YES_NO dialog   (YES, NO).<br />Pass this test if this is true.  Otherwise, fail.");
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_YES_NO, "Do you like basketball?", blackberry.ui.dialog.C_NO);
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"standardAsk OK_CANCEL dialog   (OK, CANCEL) should work": function() {
                framework.test = this;
				framework.setInstructions( "standardAsk OK_CANCEL dialog   (OK, CANCEL).<br />Pass this test if this is true.  Otherwise, fail.");
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_OK_CANCEL, "Would you like some water?");
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"standardAsk OK_CANCEL dialog with choise CANCEL should work": function() {
                framework.test = this;
				framework.setInstructions("standardAsk OK_CANCEL dialog with choise CANCEL.<br />Pass this test if this is true.  Otherwise, fail.");
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_OK_CANCEL, "Would you like some water?", blackberry.ui.dialog.C_CANCEL);
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
		
			
			"customAsk_withoutOptions() should work": function() {
                framework.test = this;
				var carArr = new Array("Focus", "Volvo", "BMW");
				framework.setInstructions("customAsk_withoutOptions().<br />Pass this test if this is true.  Otherwise, fail.");
				var result = blackberry.ui.dialog.customAsk("Select your favorite car", carArr, 0);
                alert(result);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			
			"customAsk_SecondOption() should work": function() {
                framework.test = this;
				var carArr = new Array("Focus", "Volvo", "BMW");
				framework.setInstructions("customAsk_SecondOption().<br />Pass this test if this is true.  Otherwise, fail.");
				var result = blackberry.ui.dialog.customAsk("Select your favorite car", carArr, 1);
                alert(result);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"customAsk_SecondOption_true() should work": function() {
                framework.test = this;
				var carArr = new Array("Focus", "Volvo", "BMW");
				framework.setInstructions("customAsk_SecondOption_true().<br />Pass this test if this is true.  Otherwise, fail.");
				var result = blackberry.ui.dialog.customAsk("Select your favorite car", carArr, 1, true);
                alert(result);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"undefinded - Timeout afer pops up dialog should work": function() {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "customAsk_SecondOption_true().<br />Pass this test if this is true.  Otherwise, fail.";
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_YES_NO, "Do you like basketball?");
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"undefinded - pops up dialog with setting to background apps should work": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("customAsk_SecondOption_true().<br />Pass this test if this is true.  Otherwise, fail.");
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_YES_NO, "Do you like basketball?");
				blackberry.app.requestBackground();
				setTimeout('blackberry.app.requestForeground()', 31000);
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},

			"undefinded - background apps only should work": function() {
				//need add tests for this one
			},
			
		

		});
		
		return testCases;
}
	
})();
