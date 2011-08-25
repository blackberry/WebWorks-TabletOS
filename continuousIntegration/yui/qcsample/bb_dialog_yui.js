(function() {               
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases["suiteName"] = "blackberry.ui.dialog TestSuite"; 
	
		testCases[0] = new Y.Test.Case({
			name: "blackberry.ui.dialog existence Test",

			"blackberry.ui.dialog should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.standardAsk);
			},

			"blackberry.ui.dialog should exist" : function() {
				Assert.isNotUndefined(blackberry.ui.dialog.customAsk);
			},
			
			"blackberry.ui.dialog should exist" : function() {
				Assert(typeof(blackberry.ui.dialog.standardAsk) == 'function', "blackberry.ui.dialog.standardAsk is not a function");
			},
			
			"blackberry.ui.dialog should exist" : function() {
				Assert(typeof(blackberry.ui.dialog.customAsk) == 'function', "blackberry.ui.dialog.customAsk is not a function");
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
		});
		
		//blackberry.ui.dialog Functional test
		testCases[1] = new Y.Test.Case({
			name: "blackberry.ui.dialog Functional Test",
			
			//will add more tests here if needed
		});
		
		//blackberry.ui.dialog Negative test
		testCases[2] = new Y.Test.Case({
			name: "blackberry.ui.dialog manual Test",
			//will add more tests if needed
			
			
		});
		
		//blackberry.ui.dialog manual test			
		testCases[3] = new Y.Test.Case({
			name: "blackberry.ui.dialog manual Test",
			
			setUp: function() {		
				//Setup code goes here
				var body = document.getElementsByTagName("body")[0].firstChild;
				
				//Create a Pass button if it doesn't already exist, otherwise show it
				if (!document.getElementById('pass')){
					var p = document.createElement('button');
					p.setAttribute('id', 'pass');
					p.setAttribute('onclick', "YUI.framework.pass()");
					p.innerHTML = "Pass";
					body.parentNode.insertBefore(p, body.nextSibling);
				}
				else
					document.getElementById('pass').style.visibility = "visible";
				
				//Create a Fail button if it doesn't already exist, otherwise show it
				if (!document.getElementById('fail')){
					var f = document.createElement('button');
					f.setAttribute('id', 'fail');
					f.setAttribute('onclick', 'YUI.framework.fail()');
					f.innerHTML = "Fail";
					body.parentNode.insertBefore(f, body.nextSibling);
				}
				else
					document.getElementById('fail').style.visibility = "visible";
					
				
				//Create an instructions div if it doesn't already exist
				if (!document.getElementById('instructions')){
					var i = document.createElement('div');
					i.setAttribute('id', 'instructions');
					body.parentNode.insertBefore(i, body.nextSibling);
				}
				
				//Create an iframe everytime since we want to destroy all webcontent after each test
				var i = document.createElement('iframe');
				i.setAttribute('id', 'iFrameView');
				i.setAttribute('src', '');
				i.setAttribute('width', "100%");
				i.setAttribute('height', "50%");
				i.style.visibility = "hidden"; //hidden by default, test must make it visible before using it
				body.parentNode.insertBefore(i, body.nextSibling);
				
			},
			
			tearDown: function() {
				//Hide the pass/fail/instructions
				document.getElementById('instructions').innerHTML = "";
				document.getElementById('fail').style.visibility = "hidden";
				document.getElementById('pass').style.visibility = "hidden";
				document.getElementsByTagName("body")[0].removeChild(document.getElementById('iFrameView'));
			},
			
			"st_D_OK_noOptions should pop up message OK button only": function() {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "standardAsk OK dialog with globalStatus=true.<br />Pass this test if this is true.  Otherwise, fail.";
				alert("st_D_OK_noOptions");
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_OK, "Are you Ok?");
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			 "standardAsk Save dialog (Save, Disgard, Cancel) should work": function() {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "standardAsk OK dialog with globalStatus=true.<br />Pass this test if this is true.  Otherwise, fail.";
				var t= blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_SAVE, "Do you want to SAVE or DISGARD?");
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"standardAsk Save dialog with default choice C_DISCARD should work": function() {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "standardAsk Save dialog with default choice C_DISCARD.<br />Pass this test if this is true.  Otherwise, fail.";
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_SAVE, "Do you want to SAVE or DISGARD?", blackberry.ui.dialog.C_DISCARD);
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"standardAsk DELETE dialog   (Delete, Cancel) should work": function() {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "standardAsk DELETE dialog   (Delete, Cancel).<br />Pass this test if this is true.  Otherwise, fail.";
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_DELETE, "Do you want to DELETE or CANCEL?");
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"standardAsk DELETE dialog with default choice C_DELETE should work": function() {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "standardAsk DELETE dialog with default choice C_DELETE.<br />Pass this test if this is true.  Otherwise, fail.";
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_DELETE, "Do you want to DELETE or CANCEL?", blackberry.ui.dialog.C_DELETE);
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"standardAsk YES_NO dialog   (YES, NO) should work": function() {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "standardAsk YES_NO dialog   (YES, NO).<br />Pass this test if this is true.  Otherwise, fail.";
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_YES_NO, "Do you like basketball?");
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"standardAsk YES_NO dialog with default choise NO should work": function() {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "standardAsk YES_NO dialog   (YES, NO).<br />Pass this test if this is true.  Otherwise, fail.";
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_YES_NO, "Do you like basketball?", blackberry.ui.dialog.C_NO);
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"standardAsk OK_CANCEL dialog   (OK, CANCEL) should work": function() {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "standardAsk OK_CANCEL dialog   (OK, CANCEL).<br />Pass this test if this is true.  Otherwise, fail.";
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_OK_CANCEL, "Would you like some water?");
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"standardAsk OK_CANCEL dialog with choise CANCEL should work": function() {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "standardAsk OK_CANCEL dialog with choise CANCEL.<br />Pass this test if this is true.  Otherwise, fail.";
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_OK_CANCEL, "Would you like some water?", blackberry.ui.dialog.C_CANCEL);
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
		
			
			"customAsk_withoutOptions() should work": function() {
				framework.test = this; //so pass() and fail() can access this test
				var carArr = new Array("Focus", "Volvo", "BMW");
				document.getElementById('instructions').innerHTML = "customAsk_withoutOptions().<br />Pass this test if this is true.  Otherwise, fail.";
				var result = blackberry.ui.dialog.customAsk("Select your favorite car", carArr, 0);
                alert(result);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			
			"customAsk_SecondOption() should work": function() {
				framework.test = this; //so pass() and fail() can access this test
				var carArr = new Array("Focus", "Volvo", "BMW");
				document.getElementById('instructions').innerHTML = "customAsk_SecondOption().<br />Pass this test if this is true.  Otherwise, fail.";
				var result = blackberry.ui.dialog.customAsk("Select your favorite car", carArr, 1);
                alert(result);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"customAsk_SecondOption_true() should work": function() {
				framework.test = this; //so pass() and fail() can access this test
				var carArr = new Array("Focus", "Volvo", "BMW");
				document.getElementById('instructions').innerHTML = "customAsk_SecondOption_true().<br />Pass this test if this is true.  Otherwise, fail.";
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
				document.getElementById('instructions').innerHTML = "customAsk_SecondOption_true().<br />Pass this test if this is true.  Otherwise, fail.";
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_YES_NO, "Do you like basketball?");
				blackberry.app.requestBackground();
				setTimeout('blackberry.app.requestForeground()', 3000);
                alert(t);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},

			"undefinded - background apps only should work": function() {
				//need add tests for this one
			},
			
		});
		
		testCases[4] = new Y.Test.Case({
			name: "blackberry.ui.dialog settings tests",
			
			setUp: function() {		
				//Setup code goes here
				var body = document.getElementsByTagName("body")[0].firstChild;
				
				//Create a Pass button if it doesn't already exist, otherwise show it
				if (!document.getElementById('pass')){
					var p = document.createElement('button');
					p.setAttribute('id', 'pass');
					p.setAttribute('onclick', "YUI.framework.pass()");
					p.innerHTML = "Pass";
					body.parentNode.insertBefore(p, body.nextSibling);
				}
				else
					document.getElementById('pass').style.visibility = "visible";
				
				//Create a Fail button if it doesn't already exist, otherwise show it
				if (!document.getElementById('fail')){
					var f = document.createElement('button');
					f.setAttribute('id', 'fail');
					f.setAttribute('onclick', 'YUI.framework.fail()');
					f.innerHTML = "Fail";
					body.parentNode.insertBefore(f, body.nextSibling);
				}
				else
					document.getElementById('fail').style.visibility = "visible";
					
				
				//Create an instructions div if it doesn't already exist
				if (!document.getElementById('instructions')){
					var i = document.createElement('div');
					i.setAttribute('id', 'instructions');
					body.parentNode.insertBefore(i, body.nextSibling);
				}
				
				//Create an iframe everytime since we want to destroy all webcontent after each test
				var i = document.createElement('iframe');
				i.setAttribute('id', 'iFrameView');
				i.setAttribute('src', '');
				i.setAttribute('width', "100%");
				i.setAttribute('height', "50%");
				i.style.visibility = "hidden"; //hidden by default, test must make it visible before using it
				body.parentNode.insertBefore(i, body.nextSibling);
				
            },
			
			tearDown: function() {
                //Hide the pass/fail/instructions
				document.getElementById('instructions').innerHTML = "";
				document.getElementById('fail').style.visibility = "hidden";
				document.getElementById('pass').style.visibility = "hidden";
				document.getElementsByTagName("body")[0].removeChild(document.getElementById('iFrameView'));
            },

			"blackberry.ui.dialog.standardAsk should appear at the bottom" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = new Array(blackberry.ui.dialog.BOTTOM);
				blackberry.ui.dialog.standardAsk("Pass this test if the dialog appears at the bottom", blackberry.ui.dialog.D_OK, 0, settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.standardAsk should appear at the top" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = new Array(blackberry.ui.dialog.TOP);
				blackberry.ui.dialog.standardAsk("Pass this test if the dialog appears at the top", blackberry.ui.dialog.D_OK, 0, settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.standardAsk should appear in the middle" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = new Array(blackberry.ui.dialog.CENTER);
				blackberry.ui.dialog.standardAsk("Pass this test if the dialog appears in the middle", blackberry.ui.dialog.D_OK, 0, settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.standardAsk should appear full sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = new Array(blackberry.ui.dialog.SIZE_FULL);
				blackberry.ui.dialog.standardAsk("Pass this test if the dialog appears full sized", blackberry.ui.dialog.D_OK, 0, settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.standardAsk should appear large sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = new Array(blackberry.ui.dialog.SIZE_LARGE);
				blackberry.ui.dialog.standardAsk("Pass this test if the dialog appear large sized", blackberry.ui.dialog.D_OK, 0, settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.standardAsk should appear medium sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = new Array(blackberry.ui.dialog.SIZE_MEDIUM);
				blackberry.ui.dialog.standardAsk("Pass this test if the dialog appear medium sized", blackberry.ui.dialog.D_OK, 0, settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.standardAsk should appear small sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = new Array(blackberry.ui.dialog.SIZE_SMALL);
				blackberry.ui.dialog.standardAsk("Pass this test if the dialog appear small sized", blackberry.ui.dialog.D_OK, 0, settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.standardAsk should appear tall sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = new Array(blackberry.ui.dialog.SIZE_TALL);
				blackberry.ui.dialog.standardAsk("Pass this test if the dialog appear tall sized", blackberry.ui.dialog.D_OK, 0, settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.customAsk should appear at the bottom" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = new Array(blackberry.ui.dialog.BOTTOM);
				var choices = new Array("Ferrari", "BMW", "Mercedes");
				blackberry.ui.dialog.customAsk("Pass this test if the dialog appears at the bottom", choices, 0, settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.customAsk should appear at the top" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = new Array(blackberry.ui.dialog.TOP);
				blackberry.ui.dialog.customAsk("Pass this test if the dialog appears at the top", choices, 0, settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.customAsk should appear in the middle" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = new Array(blackberry.ui.dialog.CENTER);
				var choices = new Array("Ferrari", "BMW", "Mercedes");
				blackberry.ui.dialog.customAsk("Pass this test if the dialog appears in the middle", choices, 0, settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.customAsk should appear full sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = new Array(blackberry.ui.dialog.SIZE_FULL);
				var choices = new Array("Ferrari", "BMW", "Mercedes");
				blackberry.ui.dialog.customAsk("Pass this test if the dialog appears full sized", choices, 0, settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.customAsk should appear large sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = new Array(blackberry.ui.dialog.SIZE_LARGE);
				var choices = new Array("Ferrari", "BMW", "Mercedes");
				blackberry.ui.dialog.customAsk("Pass this test if the dialog appear large sized", choices, 0, settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.customAsk should appear medium sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = new Array(blackberry.ui.dialog.SIZE_MEDIUM);
				var choices = new Array("Ferrari", "BMW", "Mercedes");
				blackberry.ui.dialog.customAsk("Pass this test if the dialog appear medium sized", choices, 0, settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.customAsk should appear small sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = new Array(blackberry.ui.dialog.SIZE_SMALL);
				var choices = new Array("Ferrari", "BMW", "Mercedes");
				blackberry.ui.dialog.customAsk("Pass this test if the dialog appear small sized", choices, 0, settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"blackberry.ui.dialog.customAsk should appear tall sized" : function() {
				framework.test = this; //so pass() and fail() can access this test
				var settings = new Array(blackberry.ui.dialog.SIZE_TALL);
				var choices = new Array("Ferrari", "BMW", "Mercedes");
				blackberry.ui.dialog.customAsk("Pass this test if the dialog appear tall sized", choices, 0, settings);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
		});
		return testCases;
	}
})();
