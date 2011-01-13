//formaller rim_yui_wrapper.js
//attach ourselves in a new namespace
(function() {
	if (!window.YUI) {
		YUI = {};
	}
	
	if (!YUI.framework) {
		YUI.framework = {
			// Current test, used by manual tests to invoke pass/fail buttons
			test: null,
			//The location of test website
			testDomain: "http://atg05-yyz.rim.net",
			// Array of callback function of testsToRun.js
			testCallBackFuncArray: new Array(),
			// Array of all the testcases defined in the user defined tesing JS files
			testcaseArray : new Array(),
		    /** 
			 *   Format of the testing result, 
			 *   Y.Test.Format.XML 
    		 *	 Y.Test.Format.JSON - JSON
			 *	 Y.Test.Format.JUnitXML - JUnit XML
			 *   Y.Test.Format.TAP - TAP (default)
             */			
			resultFormat : 'TAP',
			
			testingResultObj : null,
			
			// Store the callback function into the Array of callback function
			setupFramework: function(testCBFunc){
				this.testCallBackFuncArray.push(testCBFunc);
			}, 
		
			// Run each callback function to get the TestCase Array
			generateTestCaseArray: function(Y) {
				
				YUI.framework.Y = Y;
				for(var testCBFunc in this.testCallBackFuncArray) {
					var testCases = this.testCallBackFuncArray[testCBFunc](YUI.framework.Y);
					// Pass it the global array
					this.testcaseArray = this.testcaseArray.concat(testCases);
				}
			},
	
			createTestSuite: function(suiteName) {
				//alert(suiteName);
				return new YUI.framework.Y.Test.Suite(suiteName); 
			},
			/*
			setResultFormat: function(_format) {
				this.resultFormat = _format;
			},
			*/
			runSuite : function(theSuite) {
				//Create a test runner object (Y.Test.Runner)
				var testObj = YUI.framework.Y.Test;
				var testRunner = testObj.Runner;		
				//Define a handler for the test completed event - probably for output purposes
			    function handleTestComplete(data) {
					// get object of testing results
					YUI.framework.testingResultObj =  testRunner.getResults();   
					var testingResultString = testObj.Format[YUI.framework.resultFormat](YUI.framework.testingResultObj);
					YUI.framework.displayResultsInPage(testingResultString);
					
					if (document.getElementById("cbReportQC").checked && document.getElementById("tbUserName").value && document.getElementById("tbPassword").value){
						var username = document.getElementById("tbUserName").value;
						var password = document.getElementById("tbPassword").value;
						var runname = document.getElementById("tbRunName").value;
						var json = JSON.stringify({"results": YUI.framework.results,"runName":runname, "userName":username, "password":password});
						$.ajax({
							type: "POST",
							url: YUI.framework.testDomain + "/YUI/QC.aspx/ReportResults",
							data: json,
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							success: function(data, textStatus, XMLHttpRequest) {
								if (data.d == "Success")
									alert ("Results successfully reported to QC");
								else
									alert ("Report Failure:" + data.d);
							},
							failure: function(errMsg) {
								alert ("Reporting Failure:" + errMsg);
							},
						});
					}
				}
				
				function handleTestResult(data){
					var bindings = YUI.framework.QCBindings;
					var test = bindings.find(data.testName);
					
					if (test.id){						
						var result = -1;
						switch(data.type) {
							case testRunner.TEST_FAIL_EVENT:
								result = 0;
								break;
							case testRunner.TEST_PASS_EVENT:
								result = 1;
								break;
						}
						if (result != -1){
							var r = {};
							r.id = test.id;
							r.path = test.path;
							r.result = result;
							YUI.framework.results.push(r);
						}
					}
					else{
						alert ("Test named '" + data.testName + "' does not have a QC binding");
					}
				}
				
				//Add our suite to the runner
				// added by Lei Jan 11, 2010 to fix the bug of running multiple times
				testRunner.clear();
				testRunner.add(theSuite);
				//Subscribe to the suite complete event
				testRunner.subscribe(testRunner.COMPLETE_EVENT, handleTestComplete);
				if (document.getElementById("cbReportQC").checked){
				    testRunner.subscribe(testRunner.TEST_PASS_EVENT, handleTestResult);
				    testRunner.subscribe(testRunner.TEST_FAIL_EVENT , handleTestResult);
				    testRunner.subscribe(testRunner.TEST_IGNORE_EVENT , handleTestResult);
				}
				YUI.framework.results = new Array();
				//Run the tests
				testRunner.run();
				
			}, 
			
			// Display the testing result using the specified format 
			displayResultByFormat : function(_format) {
				// Invoking the one of the functions Y.Test.Format.JSON(),  Y.Test.Format.TAP(), Y.Test.Format.XML(), and Y.Test.Format.JUnitXML() 
				// with the testing result object to get the formatted test results  
				var formattedTestingResultStr = getFormattedTestResult(_format, this.testingResultObj);
				this.displayResultsInPage(formattedTestingResultStr);
				function getFormattedTestResult (_format, _testingResultObj) {
					var testingResultString = YUI.framework.Y.Test.Format[_format](_testingResultObj);
					return testingResultString;
				}
			},
			
			displayResultsInPage : function (results) {
				var msg = "<span>Tests completed.</span>";
				results = results.replace(/\nok/g, "<br/> <span style='color:green'>PASS</span>").replace(/\nnot ok/g, "<br/> <span style='color:red'>FAIL</span>").replace(/#/g, "<br/>#");		
				document.getElementById("output").innerHTML = msg + "<br/>" + "<span>" + results + "</span>";
				//document.getElementById("txtareaResult").value =  results;
			},
			
			sendReport: function() {
				/*
				try{
					var reporter = new YUI.framework.Y.Test.Reporter("http://atg05-yyz.rim.net/WebAPI_UnitTest/submit.aspx");			
					reporter.report(this.testingResultObj);
				}catch(err){
					alert(err);
				}
				*/
			
				var _xhr;
				try {
					_xhr = new XMLHttpRequest();				   
					var params = document.getElementById("txtareaResult").value;
					_xhr.open("POST", "http://atg05-yyz.rim.net/WebAPI_UnitTest/resultdisplay.aspx", true);
					//Send the proper header information along with the request
					_xhr.setRequestHeader("Content-type", "text/xml");
                     _xhr.setRequestHeader("build", "1.0.0.1");
					_xhr.setRequestHeader("Content-length", params.length);
					_xhr.setRequestHeader("Connection", "close");
					_xhr.send(params);
					alert("Report has been sent!");
				} catch (err) {
					alert(err);
				}
			},
			
			//Called when a manual test passes, the test variable should be set by each manual test
			pass: function(){
				framework.test.resume();
			},
			
			//Called when a manual test fails, the test variable should be set by each manual test
			fail: function(){
				framework.test.resume(function (){
					framework.Y.Assert.fail("Tester indicated test failed");
				});
			},
			
			setupPassButton: function(){
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
			},
			
			setupFailButton: function(){
				var body = document.getElementsByTagName("body")[0].firstChild;
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
			},
			
			setupInstructions: function(){
				var body = document.getElementsByTagName("body")[0].firstChild;
				//Create an instructions div if it doesn't already exist
				if (!document.getElementById('instructions')){
					var i = document.createElement('div');
					i.setAttribute('id', 'instructions');
					body.parentNode.insertBefore(i, body.nextSibling);
				}
			},
			
			setupIFrame: function(){
				var body = document.getElementsByTagName("body")[0].firstChild;
				//Create an iframe if it doesn't already exist
				if (!document.getElementById('iFrameView')){
					var i = document.createElement('iframe');
					i.setAttribute('id', 'iFrameView');
					i.setAttribute('src', '');
					i.setAttribute('width', "100%");
					i.setAttribute('height', "50%");
					i.style.visibility = "hidden"; //hidden by default, test must make it visible before using it
					body.parentNode.insertBefore(i, body.nextSibling);
				}
			},
			
			includeLibrary: function(libraryPath){
				var head = document.getElementsByTagName("head")[0];
				var scripts = head.getElementsByTagName("script");
				var exists = false;
				for (var i = 0; i < scripts.length; i++) {   
					var src = scripts[i].getAttribute("src");
					if (src && src == libraryPath){
						exists = true;
					}
				}
				
				if (!exists){
					var newScript = document.createElement("script");
					newScript.setAttribute("type", "text/javascript");
					newScript.setAttribute("src", libraryPath);
					head.appendChild(newScript);
				}
			},
			
			setInstructions: function(v){
				if (document.getElementById('instructions')){
					document.getElementById('instructions').innerHTML = v;
				}
			},
			
			setIFrameSource: function(src){
				if (document.getElementById('iFrameView')){
					document.getElementById('iFrameView').setAttribute('src', src);
				}
			},
			
			showIFrame: function(){
				if (document.getElementById('iFrameView')){
					document.getElementById('iFrameView').style.visibility = "visible";
				}
			},
			
			hideIFrame: function(){
				if (document.getElementById('iFrameView')){
					document.getElementById('iFrameView').style.visibility = "hidden";
				}
			},
			
			tearDownPassButton: function(){
				if (document.getElementById('pass'))
					document.getElementById('pass').style.visibility = "hidden";
			},
			
			tearDownFailButton: function(){
				if (document.getElementById('fail'))
					document.getElementById('fail').style.visibility = "hidden";
			},
			
			tearDownInstructions: function(){
				if (document.getElementById('instructions'))
					document.getElementById('instructions').innerHTML = "";
			},
			
			tearDownIFrame: function(){
				if (document.getElementById('iFrameView'))
					document.getElementsByTagName("body")[0].removeChild(document.getElementById('iFrameView'));
			},
			
		};
	}
})();
