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
			    var url = blackberry.utils.parseURL("local://leihu:90/index.html?COUNTER=3&FOO=BAR");
				Assert.isTypeOf('function', url.getURLParameter ); 
			},
			
			"blackberry.utils.getURLParameterByIndex should exist and is a function" : function() {
			    var url = blackberry.utils.parseURL("local://leihu:90/index.html?COUNTER=3&FOO=BAR");
				Assert.isTypeOf('function', url.getURLParameterByIndex );
			},
			
			"blackberry.utils.host should exist and is readonly" : function() {
				var url = blackberry.utils.parseURL("local://leihu:90/index.html?COUNTER=3&FOO=BAR");
				Assert.isNotUndefined(url.host);
				var host = url.host;
				url.host = "bbtools_win7_01";
				Assert.areSame(url.host, host);
			},
			
			"blackberry.utils.port should exist and is readonly" : function() {
				var url = blackberry.utils.parseURL("local://leihu:90/index.html?COUNTER=3&FOO=BAR");
				Assert.isNumber(url.port);
				var port = url.port;
				url.port = "5675";
				Assert.areSame(url.port, port);
			},
			
		
			
//blackberry.utils Functional test
		
			
			"blackberry.utils.stringToBlob and BlobToString should work" : function() {
				var globalBlob;
                var globalString = "Hello Playbook";
                globalBlob = blackberry.utils.stringToBlob(globalString, "UTF-8");
                Assert.areSame( blackberry.utils.blobToString(globalBlob), globalString );
                
			},
		//12
		    "blackberry.utils.parseURL - http explicitly define port should work" : function() {
				var url = blackberry.utils.parseURL("http://www.yui.com:998/index.html?COUNTER=8&FOO='HoHo'" );
                Assert.areSame( url.port, 998 );
                Assert.areSame( url.host, "www.yui.com");
                Assert.areSame( url.getURLParameterByIndex(0), "8" );
                Assert.areSame( url.getURLParameter("FOO"), "'HoHo'" );
				         
			},
		//13		
			"blackberry.utils.parseURL - https explicitly define port should work" : function() {
				var url = blackberry.utils.parseURL("https://www.yui.com:998/index.html?COUNTER=8&FOO='HoHo'" );
                Assert.areSame( url.port, 998);
                Assert.areSame( url.host, "www.yui.com");
                Assert.areSame( url.getURLParameterByIndex(0), "8" );
                Assert.areSame( url.getURLParameter("FOO"), "'HoHo'" );
				         
			},				
		//14	
			"blackberry.utils.parseURL - http implicitly define port should work" : function() {
				var url = blackberry.utils.parseURL("http://www.guoguo.com/index.html?COUNTER=3&FOO=BAR");
                Assert.areSame( url.port, 80);
                Assert.areSame( url.host, "www.guoguo.com");
                Assert.areSame( url.getURLParameterByIndex(0), "3" );
                Assert.areSame( url.getURLParameter("FOO"), "BAR" );
				         
			},	
				   
			"blackberry.utils.parseURL - https implicitly define port should work" : function() {
				var url = blackberry.utils.parseURL("https://www.guoguo.com/index.html?COUNTER=3&FOO=BAR");
                Assert.areSame( url.port, 443);
                Assert.areSame( url.host, "www.guoguo.com");
                Assert.areSame( url.getURLParameterByIndex(0), "3" );
                Assert.areSame( url.getURLParameter("FOO"), "BAR" );
				         
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
                Assert.areSame( url.port, 0);
                Assert.areSame( url.host, "www.guoguo.com");
                Assert.areSame( url.getURLParameterByIndex(0), "3" );
                Assert.areSame( url.getURLParameter("FOO"), "BAR" );
				         
			},	

			
			});

	
		
		
		return testCases;
}
	
})();
