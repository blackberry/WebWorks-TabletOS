(function() {               
	var framework = YUI.framework;
	var testDomain = "http://10.135.220.111"
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases["suiteName"] = "CSS tests";
		
		//---------------------------------------------------------------------
		// CSS tests
		//---------------------------------------------------------------------			

		testCases[0] = new Y.Test.Case({
			name: "CSS manual tests",

			setUp : function () {
				//Order is a stack, last object will appear first in DOM
				framework.setupIFrame();
				framework.setupFailButton();
				framework.setupPassButton();
				framework.setupInstructions();
			},
			
			tearDown : function () {
				framework.tearDownIFrame();
				framework.tearDownFailButton();
				framework.tearDownPassButton();
				framework.tearDownInstructions();
			},
			
			"css font family should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "At least true type font should work";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/fontFamily.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css font style should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "css font style should work";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/fontStyle.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css font size should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "should see different font size";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/fontSize.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css font weight should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "should see different font weight";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/fontWeight.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css background image should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "should see background image at the centre";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/background.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css background repeat should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "should see repeat backgroud image all direction";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/bgRepeat.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},

			"css box model should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/boxModel.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css box absolute offset should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/boxOffsetAbsolute.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css border should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/border.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css border color should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/borderColor.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css color should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/color.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css line height should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/lineHeight.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css text align should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/textAlign.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css text decoration should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/textDecoration.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css text indent should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/textIndent.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},

			"css text transform should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/textTransform.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},

			"css counter increment should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/counterIncrement.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},

			"css hover change layout should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/hoverChangeLayout.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css pseudo element after should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/pseudoElementAfter.htm");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css first child should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/firstChild.htm");
				framework.showIFrame();				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css first letter should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/firstLetter.htm");
				framework.showIFrame();				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css first line should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/firstLine.htm");
				framework.showIFrame();				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css table spacing should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/borderSpacing.htm");
				framework.showIFrame();				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css empty cells should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/emptyCells.htm");
				framework.showIFrame();				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css table layout should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/tableLayout.htm");
				framework.showIFrame();				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css list style type should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/listStyleType.htm");
				framework.showIFrame();				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css list style image position and type should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/listStyle.htm");
				framework.showIFrame();				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css top bottom left right should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/cssPosition.htm");
				framework.showIFrame();				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css float image should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/floatImages.htm");
				framework.showIFrame();				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css image gallery should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/imageGallery.htm");
				framework.showIFrame();				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css overflow should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/overflow.htm");
				framework.showIFrame();				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css fixed text should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/positionFixedText.htm");
				framework.showIFrame();				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},

			"css z index should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/zIndex.htm");
				framework.showIFrame();				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css margin should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/margin.htm");
				framework.showIFrame();				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			"css padding should work": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "according to the instruction on the test page";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/webplatform/css/padding.htm");
				framework.showIFrame();				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
		});		
		

/*		
		testCases[1] = new Y.Test.Case({
			name: "blackberry.app.author Test",

			setUp : function () {
				//Setup code goes here
				
			},
			 
			tearDown : function () {
				//Teardown code goes here
				
			},
			
			"Manual Test 1 should do something": function () {
				framework.test = this; //so pass() and fail() can access this test
				document.getElementById('instructions').innerHTML = "Instructions for Manual Test 4";
				
				//do some manual test output
				framework.setIFrameSource(testDomain +"/html/6.0.0/html5_audio/tagTypesMP3.html");
				framework.showIFrame();
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
		});
*/		
		return testCases;
	}
})();
