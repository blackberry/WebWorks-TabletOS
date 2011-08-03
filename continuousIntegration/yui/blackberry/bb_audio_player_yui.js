(function() {  
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	var testDomain = "http://atg05-yyz.rim.net";
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		//---------------------------------------------------------------------
		// Test methods - names must begin with "test"
		// or to contain the word "should" when a "friendly name" is used
		//---------------------------------------------------------------------
		
		//---------------------------------------------------------------------
		// Manual Tests prototype
		//---------------------------------------------------------------------
		
		testCases[0] = new Y.Test.Case({
			name: "blackberry.audio Tests",

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
			
			
			"blackberry.audio.supportedContentTypes() should exist" : function() {
				Assert.isNotUndefined(blackberry.audio.supportedContentTypes);
			},
		    "blackberry.audio.supportedProtocols() should exist" : function() {
				Assert.isNotUndefined(blackberry.audio.supportedProtocols);
			},
			"blackberry.audio.supportedContentTypes('file') should return 11" : function() {
				
				
				Assert.areEqual(11, blackberry.audio.supportedContentTypes("file").length);
			},
			"blackberry.audio.supportedContentTypes('http') should return 11" : function() {
				
				
				Assert.areEqual(11, blackberry.audio.supportedContentTypes("http").length);
			},
			"blackberry.audio.supportedContentTypes('rtsp') should return 3" : function() {
				
				
				Assert.areEqual(3, blackberry.audio.supportedContentTypes("rtsp").length);
			},
			"blackberry.audio.supportedProtocols(null) should return 3" : function() {
				
				
				Assert.areEqual(3, blackberry.audio.supportedProtocols(null).length);
			},
		
		});
		
		testCases[1] = new Y.Test.Case({
			name: "blackberry.audio.Player tests",

			setUp : function () {
				//Order is a stack, last object will appear first in DOM
				framework.setupFailButton();
				framework.setupPassButton();
				framework.setupInstructions();
				// create a player
				
				
			},
			
			tearDown : function () {
				framework.tearDownFailButton();
				framework.tearDownPassButton();
				framework.tearDownInstructions();
			},
			
			
			"blackberry.audio.Player.TIME_UNKNOWN should exist and return -1" : function() {
				Assert.isNotUndefined(blackberry.audio.Player.TIME_UNKNOWN);
				Assert.areEqual(-1, blackberry.audio.Player.TIME_UNKNOWN);
			},
			"blackberry.audio.Player.CLOSED should exist and return 0" : function() {
				Assert.isNotUndefined(blackberry.audio.Player.CLOSED);
				Assert.areEqual(0, blackberry.audio.Player.CLOSED);
			},
				"blackberry.audio.Player.UNREALIZED should exist and return 100" : function() {
				Assert.isNotUndefined(blackberry.audio.Player.UNREALIZED);
				Assert.areEqual(100, blackberry.audio.Player.UNREALIZED);
			},
				"blackberry.audio.Player.REALIZED should exist and return 200" : function() {
				Assert.isNotUndefined(blackberry.audio.Player.REALIZED);
				Assert.areEqual(200, blackberry.audio.Player.REALIZED);
			},
				"blackberry.audio.Player.PREFETCHED should exist and return 300" : function() {
				Assert.isNotUndefined(blackberry.audio.Player.PREFETCHED);
				Assert.areEqual(300, blackberry.audio.Player.PREFETCHED);
			},
				"blackberry.audio.Player.STARTED should exist and return 400" : function() {
				Assert.isNotUndefined(blackberry.audio.Player.STARTED);
				Assert.areEqual(400, blackberry.audio.Player.STARTED);
			},
			
			
		
			
			
		
		});
		testCases[2] = new Y.Test.Case({
			name: "blackberry.audio manual Tests",

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
		
		 	"MANUAL - Player instance should be created using http protocol": function () {
				framework.test = this;
				framework.setInstructions("Pick up a media type in the dropdown list(#3),player should be created after we click blackberry.audio.Player(http://) button");
				
				framework.setIFrameSource("http://atg05-yyz.rim.net/webapiextension/audio.htm");
				framework.showIFrame();


				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			} ,
			"MANUAL - Player instance should be created using local protocol": function () {
				framework.test = this;
				framework.setInstructions("Pick up a media type in the dropdown list(#3),player should be created after we click blackberry.audio.Player(local:///) button");
				
				framework.setIFrameSource("http://atg05-yyz.rim.net/webapiextension/audio.htm");
				framework.showIFrame();


				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			} ,
			"MANUAL - Player instance should be created using file protocol": function () {
				framework.test = this;
				framework.setInstructions("Pick up a media type in the dropdown list(#3),player should be created after we click blackberry.audio.Player(file) button");
				
				framework.setIFrameSource("http://atg05-yyz.rim.net/webapiextension/audio.htm");
				framework.showIFrame();


				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			} ,
			"MANUAL - Player instance should be created using media file located on SDCard": function () {
				framework.test = this;
				framework.setInstructions("Pick up a media type in the dropdown list(#3),player should be created after we click blackberry.audio.Player(file_SDCard) button");
				
				framework.setIFrameSource("http://atg05-yyz.rim.net/webapiextension/audio.htm");
				framework.showIFrame();


				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			} ,
			"MANUAL - User should be able to play,pause,close music located on remote page": function () {
				framework.test = this;
				framework.setInstructions("play,pause,close the music after the payer instance is created using http protocol");
				
				framework.setIFrameSource("http://atg05-yyz.rim.net/webapiextension/audio.htm");
				framework.showIFrame();


				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			} ,
			"MANUAL - User should be able to play,pause,close music located inside the application": function () {
				framework.test = this;
				framework.setInstructions("play,pause,close the music after the payer instance is created using local protocol");
				
				framework.setIFrameSource("http://atg05-yyz.rim.net/webapiextension/audio.htm");
				framework.showIFrame();


				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			} ,
			"MANUAL - User should be able to play,pause,close music located in SDCard": function () {
				framework.test = this;
				framework.setInstructions("play,pause,close the music after the payer instance is created using the file existing in SDCard");
				
				framework.setIFrameSource("http://atg05-yyz.rim.net/webapiextension/audio.htm");
				framework.showIFrame();


				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			} ,
			
			"MANUAL - User should be able to add event listener for player": function () {
				framework.test = this;
				framework.setInstructions("Event callback should be invoked after we add the event listener(click the addPlayerListener button)");
				
				framework.setIFrameSource("http://atg05-yyz.rim.net/webapiextension/audio.htm");
				framework.showIFrame();


				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			} ,
			"MANUAL - User should be able to adjust volume level while playing": function () {
				framework.test = this;
				framework.setInstructions("set the volume level in section 6, volume should change correctly");
				
				framework.setIFrameSource("http://atg05-yyz.rim.net/webapiextension/audio.htm");
				framework.showIFrame();


				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			}
			
			
			
			
			
		
		});
		
		
		return testCases;
	};
})();

