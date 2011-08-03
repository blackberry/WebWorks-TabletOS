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
			// Store the callback function into the Array of callback function
			setupFramework: function(testCBFunc){
				this.testCallBackFuncArray.push(testCBFunc);
			}, 
			
			// Run each callback function to get the TestCase Array
			generateTestCaseArray: function(Y) {
			
				blackberryNew.YUItests.Y = Y;
				for(var testCBFunc in this.testCallBackFuncArray) {
					var testCases = this.testCallBackFuncArray[testCBFunc](blackberryNew.YUItests.Y);
					// Pass it the global array
					//testcaseArr = testcaseArr.concat(testCases);
					this.testcaseArray = this.testcaseArray.concat(testCases);
				}
			},
			/*
			YUIReadyCallbackWrapper: function(Y) {
				//Save the test framework object for behind the scenes use
				blackberryNew.YUItests.Y = Y;
				
				//Call the user's callback with Y so they can set up their tests
				var testCases = blackberryNew.YUItests.testCallback(blackberryNew.YUItests.Y);
				alert(testCases["suiteName"]);
				// Pass it the global array
				testcaseArr = testcaseArr.concat(testCases);
				//Create the suite with specified name
			
			},
			*/
			createTestSuite: function(suiteName) {
				return new blackberryNew.YUItests.Y.Test.Suite(suiteName); 
			},
			
			runSuite : function(theSuite) {
				//Create a test runner object (Y.Test.Runner)
				var testObj = blackberryNew.YUItests.Y.Test;
				var testRunner = testObj.Runner;
				
				//Define a handler for the test completed event - probably for output purposes
			    function handleTestComplete(data) {
					var resultFormat = 'Y.Test.Format.TAP';
					/*
					Y.Test.Format.XML - YUI Test XML (default)
					Y.Test.Format.JSON - JSON
					Y.Test.Format.JUnitXML - JUnit XML
					Y.Test.Format.TAP - TAP
                    */
					var resultsXml = testRunner.getResults(testObj.Format.TAP);
				    
					displayResultsInPage(resultsXml);
				}
				
				function displayResultsInPage(results) {
					var msg = "<span>Test completed. Please check the Firebug console for results.</span>";
					
					//results = results.replace(/\nok/g, "<br/> PASS").replace(/\nnot ok/g, "<br/> FAIL").replace(/#/g, "<br/>#");
					
					document.getElementById("output").innerHTML = msg + "<br/>" + "<span>" + results + "</span>";
				}

				//Add our suite to the runner
				testRunner.add(theSuite);
				//Subscribe to the suite complete event
				testRunner.subscribe(testRunner.COMPLETE_EVENT, handleTestComplete);

				//run the tests
				testRunner.run();
			} 
		};
	}
	
})();
