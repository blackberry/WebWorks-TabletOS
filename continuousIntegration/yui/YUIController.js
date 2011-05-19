// a global var for the root of the generated treeview
var root;
var framework = YUI.framework;
/**
 *  load each testing js file defined in  
 *  testingJSFile.js, then run its callback function to create the
 *  TestCase array and create a treeview for them
 */
function loadYuiTestsToRunJS() {
	for(var testJSFile in framework.yuiTestsToRunArray) {
		loadJS(framework.yuiTestsToRunArray[testJSFile]);
	}
	
	//Setup the runname, based on the platform determined at loadtime in YUITestsToRun.js
	document.getElementById("tbRunName").value = "WebWorksAPI_" + framework.device + "_v1.0.0.";
	
	// Run the callback function to generate the Test Case array
	YUI({useBrowserConsole: true
	}).use("test", generateTestCaseArray);
	
	// Display the Test Case array in the treeview
	createTreeViewForTestCases();
}

function runContinuousIntegrationTesting (){
	console.log("YUI.framework.bundle_version=" + YUI.framework.bundle_version);
	
	//No not include manual tests, do not report to QC, ensure all tests are selected
	var cbIncludeManualTests = document.getElementById("cbIncludeManualTests");
	cbIncludeManualTests.checked = false;
	
	var cbReportQC = document.getElementById("cbReportQC");
	cbReportQC.checked = false;
	
	setStatusForAllTests(1);
	
	//run the tests
	run_selectedTests();	
}

function continuousIntegrationTestingComplete (){
	console.log("continuousIntegrationTestingComplete");
	var results = YUI.framework.displayResultByFormat('JUnitXML');
	//console.log ("results=" + results);
	
	$.ajax({
		type: 'POST',
		url: YUI.framework.testDomain + "/report?buildId="+YUI.framework.bundle_version,
		data: results,
		success: function(data){console.log("success: " + data);},
		failure: function(data){console.log("failure: " + data);},
		dataType: "xml"
	});
}

function generateTestCaseArray(Y) {
	framework.generateTestCaseArray(Y);
}

function loadJS(jsFileName) {
	var xhrObj = new XMLHttpRequest();
	xhrObj.open('GET', jsFileName, false);
	xhrObj.send('');
	
	var scrptE = document.createElement("script");
	scrptE.setAttribute("type", "text/javascript");
	scrptE.setAttribute("language", "JavaScript");
	scrptE.text = xhrObj.responseText;
	
	var hdEl = document.getElementsByTagName("head")[0];
	if (hdEl.childNodes.length > 1) {
		hdEl.removeChild(hdEl.lastChild);
		hdEl.appendChild(scrptE);
	}
	
}

/**
 *  Generate a treeview for testcases based on the testcase Array
 *  and display it.
 */
function createTreeViewForTestCases() {
	try{
		YUI().use('gallery-treeview', function(Y) {
			//Associate the YAHOO variable with and instance of Dav Glass's Port utility:
			var YAHOO = Y.Port();
			
			var treeviewTestCases = new YAHOO.widget.TreeView("treeDiv1");
			// Save the root for the generated treeview
			root = treeviewTestCases.getRoot();
			for (var tc in framework.testcaseArray) {
				generateTree_TestCase(root, framework.testcaseArray[tc], YAHOO);
			}
			treeviewTestCases.setNodesProperty('propagateHighlightUp',true);
			treeviewTestCases.setNodesProperty('propagateHighlightDown',true);
			treeviewTestCases.subscribe('clickEvent',treeviewTestCases.onEventToggleHighlight);	
			treeviewTestCases.render();
		});
	}
	catch(err){
		alert(err);
	}
}

/**
 *  Generate the node for each testcase
 *  
 */
function generateTree_TestCase(root, _testCase, YAHOO) {
	try{
		var testCaseName = _testCase["name"];
		var nodeTestCase = new YAHOO.widget.TextNode(testCaseName, root, false);
		for(var propName in _testCase) {
			//ignore property _should 
			if((propName != '_should') && (propName.indexOf('should') >= 0)){
				// add each test into tree by looking for the friendly name
				var nodeTest = new YAHOO.widget.TextNode(propName, nodeTestCase, true);
				// The default status of the test node is set to checked
				nodeTest.highlightState = 1;
			}
		}
		// The default status of the testcase node is set to checked
		nodeTestCase.highlightState = 1;
	}
	catch(err){
		alert(err);
	}
}

/**
 *  Go through each TestCase node in the tree and 
 *  get all the unselected tests and add them into _should.ignore 
 *  property of the TeasCase object respectively
 *
 */ 
function add_UnSelectedTestsToShould_ignore() {
	// all the TestCase Node and put them to array
	var includeManualTests = document.getElementById("cbIncludeManualTests").checked;
	var testcaseNodeArr= root.children;
	var numTCNode = testcaseNodeArr.length;
	for (var index =0; index <= numTCNode-1; index++) {
		var testcaseNode = testcaseNodeArr[index];
		var testNodeArr = testcaseNode.children;
		for(var testNode in testNodeArr) {
			// if the testnode is not selected(not highlighted), then add the test 
			//  to the should_ignore property of the testcase object
			if (testNodeArr[testNode].highlightState == 0)
				should_ignore(framework.testcaseArray[index],testNodeArr[testNode].label);
			else if (includeManualTests == false && testNodeArr[testNode].label.substring(0,6) == "MANUAL")
				should_ignore(framework.testcaseArray[index],testNodeArr[testNode].label);
		}
	}
}

/**
 *  Adding the give test to the _should.ignore property of the testcase object
 *  to ignore the test when executing the testcase
 */ 
function should_ignore(_testCase, testName) {
	if (_testCase["_should"] == undefined) 
		_testCase["_should"] = {};
	if (_testCase["_should"]["ignore"] == undefined) 
		_testCase["_should"]["ignore"] = {};
	_testCase["_should"]["ignore"][testName] = true;
}

/**
 *  Empty _should.ignore property of every testcase object
 *  
 */ 
function set_default_should_igore() {
	for (var tc in framework.testcaseArray) {
		var testCase = framework.testcaseArray[tc];
		if (testCase["_should"] == undefined) 
			testCase["_should"] = {};
		testCase["_should"]["ignore"] = {};	
	}
}


/**
 *  Adding the selected testcases to the testsuite
 *  and run it
 */
function run_selectedTests() {
	
	set_default_should_igore();
	add_UnSelectedTestsToShould_ignore();
	//alert(framework.testcaseArray["suiteName"]);
	//var suite = framework.createTestSuite(framework.testcaseArray["suiteName"]);
	var suite = framework.createTestSuite("WebWorks Testing for Playbook" + new Date());
	for (var tc in framework.testcaseArray) {
		suite.add(framework.testcaseArray[tc]);
	}
	framework.runSuite(suite);
	//enable the four display button
	document.getElementById('btnXML').style.display = 'inline';
	document.getElementById('btnTAP').style.display = 'inline';
	document.getElementById('btnTAPWOI').style.display = 'inline';
	document.getElementById('btnJUnitXML').style.display = 'inline';
	document.getElementById('btnJSON').style.display = 'inline';
	document.getElementById('btnSendReport').style.display = 'inline';
}

/**
 *  Select all the tests in the treeview
 */
function setStatusForAllTests(_status) {
	root.setNodesProperty ("highlightState", _status, true); 
}	

/**
 *  Display the testing result using the specified format
 */
function displayResultByFormat(_format) {
    if (_format == "TAPWOI") {
        framework.displayIgnored = false;
        _format = 'TAP';
    }
    framework.displayResultByFormat(_format);
    framework.displayIgnored = true; 
}

/**
 *  Send the report to atg05
 */
function sendReport() {
	 framework.sendReport(); 
}