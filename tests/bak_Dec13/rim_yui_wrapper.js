//attach ourselves in a new namespace
(function() {

	if (!window.blackberryNew) {
        blackberryNew = {};
    }
    if (!blackberryNew.YUItests) {
		blackberryNew.YUItests = {
			// Array of callback function of all testing JS files
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
				//console.log("In setupFramework " + this.testCallBackFuncArray.length);
			}, 
		
			// Run each callback function to get the TestCase Array
			generateTestCaseArray: function(Y) {
				
				blackberryNew.YUItests.Y = Y;
				//console.log('in generateTestCaseArray' + this.testCallBackFuncArray.length);
				for(var testCBFunc in this.testCallBackFuncArray) {
					var testCases = this.testCallBackFuncArray[testCBFunc](blackberryNew.YUItests.Y);
					// Pass it the global array
					this.testcaseArray = this.testcaseArray.concat(testCases);
				}
			},
	
			createTestSuite: function(suiteName) {
				return new blackberryNew.YUItests.Y.Test.Suite(suiteName); 
			},
			/*
			setResultFormat: function(_format) {
				this.resultFormat = _format;
			},
			*/
			runSuite : function(theSuite) {
				//Create a test runner object (Y.Test.Runner)
				var testObj = blackberryNew.YUItests.Y.Test;
				var testRunner = testObj.Runner;		
				//Define a handler for the test completed event - probably for output purposes
			    function handleTestComplete(data) {
					// get object of testing results
					blackberryNew.YUItests.testingResultObj =  testRunner.getResults();   
					var testingResultString = testObj.Format[blackberryNew.YUItests.resultFormat](blackberryNew.YUItests.testingResultObj);
					blackberryNew.YUItests.displayResultsInPage(testingResultString);
				}
				//Add our suite to the runner
				testRunner.add(theSuite);
				//Subscribe to the suite complete event
				testRunner.subscribe(testRunner.COMPLETE_EVENT, handleTestComplete);
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
					var testingResultString = blackberryNew.YUItests.Y.Test.Format[_format](_testingResultObj);
					//alert(testingResultString);
					return testingResultString;
				}
			},
			
			displayResultsInPage : function (results) {
				var msg = "<span>Test completed. Please check the Firebug //console for results.</span>";
				//results = results.replace(/\nok/g, "<br/> PASS").replace(/\nnot ok/g, "<br/> FAIL").replace(/#/g, "<br/>#");		
				//document.getElementById("output").innerHTML = msg + "<br/>" + "<span>" + results + "</span>";
				document.getElementById("txtareaResult").value =  results ;
			},
			
			sendReport: function() {
				/*
				try{
					var reporter = new blackberryNew.YUItests.Y.Test.Reporter("http://atg05-yyz.rim.net/WebAPI_UnitTest/submit.aspx");			
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
                
				
			}
			
		};
	}
	
})();
