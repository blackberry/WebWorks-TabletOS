(function() {  
	var testing = blackberryNew.YUItests;
	var test;
	
	testing.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases["suiteName"] = "blackberry manual tests prototype";
		
		//---------------------------------------------------------------------
		// Test methods - names must begin with "test"
		// or to contain the word "should" when a "friendly name" is used
		//---------------------------------------------------------------------
		
		//---------------------------------------------------------------------
		// Manual Tests prototype
		//---------------------------------------------------------------------
		
		testCases[0] = new Y.Test.Case({
			name: "Manual Test Case 1",

			setUp : function () {
				//Setup code goes here
				var body = document.getElementsByTagName("body")[0];
				
				//Create a Pass button if it doesn't already exist, otherwise show it
				if (!document.getElementById('pass')){
					var p = document.createElement('button');
					p.setAttribute('id', 'pass');
					p.setAttribute('onclick', "blackberryNew.YUItests.pass()");
					p.innerHTML = "Pass";
					body.appendChild(p);
				}
				else
					document.getElementById('pass').style.visibility = "visible";
				
				//Create a Fail button if it doesn't already exist, otherwise show it
				if (!document.getElementById('fail')){
					var f = document.createElement('button');
					f.setAttribute('id', 'fail');
					f.setAttribute('onclick', 'blackberryNew.YUItests.fail()');
					f.innerHTML = "Fail";
					body.appendChild(f);
				}
				else
					document.getElementById('fail').style.visibility = "visible";
					
				
				//Create an instructions div if it doesn't already exist
				if (!document.getElementById('instructions')){
					var i = document.createElement('div');
					i.setAttribute('id', 'instructions');
					body.appendChild(i);
				}
				
				//Create an iframe everytime since we want to destroy all webcontent after each test
				var i = document.createElement('iframe');
				i.setAttribute('id', 'iFrameView');
				i.setAttribute('src', '');
				i.setAttribute('width', "100%");
				i.setAttribute('height', "50%");
				i.style.visibility = "hidden"; //hidden by default, test must make it visible before using it
				body.appendChild(i);
			},
			
			tearDown : function () {
				//Hide the pass/fail/instructions
				document.getElementById('instructions').innerHTML = "";
				document.getElementById('fail').style.visibility = "hidden";
				document.getElementById('pass').style.visibility = "hidden";
				document.getElementsByTagName("body")[0].removeChild(document.getElementById('iFrameView'));
			},
			
			"Manual Test 1 should present a standard ask dialog": function () {
				test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "Instructions for Manual Test 1";
				
				//do some manual test output
				var t = blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_OK, "Are you Ok?", 0, true);
				alert(t);
				
				test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			
			"Manual Test 2 should present a standard ask dialog": function () {
				test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "Instructions for Manual Test 2";
				
				//do some manual test output
				var t= blackberry.ui.dialog.standardAsk(blackberry.ui.dialog.D_SAVE, "Do you want to SAVE or DISGARD?");
				alert(t);
				
				test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"Manual Test 3 should load a media test URL in an iFrame": function () {
				test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "Instructions for Manual Test 3";
				
				//do some manual test output
				var frame = document.getElementById('iFrameView');
				frame.style.visibility = "visible";
				frame.setAttribute('src', 'http://192.168.101.57/html/6.0.0/html5_audio/tagTypesMP3.html');
				
				test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
		});
		
		return testCases;
	}
	
	//Called when a manual test passes, the test variable should be set by each manual test
	testing.pass = function(){
		test.resume();
	};
	
	//Called when a manual test fails, the test variable should be set by each manual test
	testing.fail = function(){
		test.resume(function (){
			testing.Y.Assert.fail("Tester indicated test failed");
		});
	};	
})();