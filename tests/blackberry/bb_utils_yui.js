(function() {  
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases["suiteName"] = "blackberry.utils TestSuite"; 
		
     

		testCases[0] = new Y.Test.Case({
			name: "blackberry.utils Test",
//blackberry.utils Existence Test
			"blackberry.utils should exist" : function() {
				Assert.isNotUndefined(blackberry.utils);
			},
			
			"blackberry.utils.blobToString should exist and is a function" : function() {
				Assert.isTypeOf('function', blackberry.utils.blobToString);
			},
			
			"blackberry.utils.generateUniqueId should exist and is a function" : function() {
				Assert.isTypeOf('function', blackberry.utils.generateUniqueId );
				var id1 = blackberry.utils.generateUniqueId();
				var id2 = blackberry.utils.generateUniqueId();
				Assert.isNumber( id1 );
				Assert.areNotSame( id1, id2 );
			},
			
			
			"blackberry.utils.documentToBlob should exist and is a function" : function() {
				Assert.isTypeOf('function', blackberry.utils.documentToBlob ); 
			},
			
			"blackberry.utils.parseURL should exist and is a function" : function() {
				Assert.isTypeOf('function', blackberry.utils.parseURL );  
			},
			
			"blackberry.utils.stringToBlob should exist and is a function" : function() {
				Assert.isTypeOf('function', blackberry.utils.stringToBlob ); 
			},
			
			"blackberry.utils.getURLParameter should exist and is a function" : function() {
				Assert.isTypeOf('function', blackberry.utils.getURLParameter ); 
			},
			
			"blackberry.utils.getURLParameterByIndex should exist and is a function" : function() {
				Assert.isTypeOf('function', blackberry.utils.getURLParameterByIndex );
			},
			
			"blackberry.utils.host should exist" : function() {
				Assert.isNotUndefined(blackberry.utils.host);
				var host = blackberry.utils.host;
				blackberry.utils.host = "bbtools_win7_01";
				Assert(blackberry.utils.host == host, "blackberry.utils.host is readonly");
			},
			
			"blackberry.utils.port should exist" : function() {
				Assert.isNotUndefined(blackberry.utils.port);
				var port = blackberry.utils.port;
				blackberry.utils.port = "5675";
				Assert(blackberry.utils.port == port, "blackberry.utils.port is readonly");
			},
			
		
			
//blackberry.utils Functional test
		
			
			"blackberry.utils.stringToBlob and BlobToString should work" : function() {
				var globalBlob;
                var globalString = "Hello Playbook";
                globalBlob = blackberry.utils.stringToBlob(globalString, "UTF-8");
                Assert( blackberry.utils.blobToString(globalBlob) == globalString, "blackberry.utils.stringToBlob function doesn't work properly!");
                
			},
		
		    "blackberry.utils.parseURL - http explicitly define port should work" : function() {
				var url = blackberry.utils.parseURL("http://www.yui.com:998/index.html?COUNTER=8&FOO='HoHo'" );
                Assert.isSame( url.port, 998);
                Assert.isSame( url.host, "www.yui.com");
                Assert.isSame( url.getURLParameterByIndex(0), 8 );
                Assert.isSame( url.getURLParameter("FOO"), "HoHo" );
				         
			},
				
			"blackberry.utils.parseURL - https explicitly define port should work" : function() {
				var url = blackberry.utils.parseURL("https://www.yui.com:998/index.html?COUNTER=8&FOO='HoHo'" );
                Assert.isSame( url.port, 998);
                Assert.isSame( url.host, "www.yui.com");
                Assert.isSame( url.getURLParameterByIndex(0), 8 );
                Assert.isSame( url.getURLParameter("FOO"), "HoHo" );
				         
			},				
			
			"blackberry.utils.parseURL - http implicitly define port should work" : function() {
				var url = blackberry.utils.parseURL("http://www.guoguo.com/index.html?COUNTER=3&FOO=BAR");
				Assert.isNumber( url.port );
                Assert.isSame( url.port, 80);
                Assert.isSame( url.host, "www.guoguo.com");
                Assert.isSame( url.getURLParameterByIndex(0), 3 );
                Assert.isSame( url.getURLParameter("FOO"), "BAR" );
				         
			},	
				   
			"blackberry.utils.parseURL - https implicitly define port should work" : function() {
				var url = blackberry.utils.parseURL("https://www.guoguo.com/index.html?COUNTER=3&FOO=BAR");
				Assert.isNumber( url.port );
                Assert.isSame( url.port, 80);
                Assert.isSame( url.host, "www.guoguo.com");
                Assert.isSame( url.getURLParameterByIndex(0), 3 );
                Assert.isSame( url.getURLParameter("FOO"), "BAR" );
				         
			},	
		/*	
			"blackberry.utils.parseURL - local implicitly define port should work" : function() {
				var url = blackberry.utils.parseURL("local:///images/bear.gif");
				Assert.isNumber( url.port );
                Assert.isSame( url.port, 0);
                Assert.isSame( url.host, "images");
			},	    
		
		    "blackberry.utils.parseURL - local implicitly define port should work" : function() {
				var url = blackberry.utils.parseURL("file:///SDCard/pic1.jpg");
				Assert.isNumber( url.port );
                Assert.isSame( url.port, 0);
                Assert.isSame( url.host, "SDCard");
			},	
		*/	//will add more tests here if needed

      
	
//blackberry.utils Negative test
     
			
			"blackberry.utils.parseURL - abc:// implicitly define port should work" : function() {
				var url = blackberry.utils.parseURL("abc://www.guoguo.com/index.html?COUNTER=3&FOO=BAR");
				Assert.isNumber( url.port );
                Assert.isSame( url.port, 80);
                Assert.isSame( url.host, "www.guoguo.com");
                Assert.isSame( url.getURLParameterByIndex(0), 3 );
                Assert.isSame( url.getURLParameter("FOO"), "BAR" );
				         
			},	

			
			});

	
		
		
		alert("Finished loading utils");
		return testCases;
}
	
})();
