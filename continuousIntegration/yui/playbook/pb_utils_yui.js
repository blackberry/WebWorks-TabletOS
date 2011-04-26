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
            //1
			"blackberry.utils should exist" : function() {
				Assert.isNotUndefined(blackberry.utils);
			},	
            //2			
			"blackberry.utils.generateUniqueId should exist and is a function" : function() {
				Assert.isTypeOf('function', blackberry.utils.generateUniqueId );
				var id1 = blackberry.utils.generateUniqueId();
				var id2 = blackberry.utils.generateUniqueId();
				Assert.isNumber( id1 );
				Assert.areNotSame( id1, id2 );
			},
			//3
			"blackberry.utils.parseURL should exist and is a function" : function() {
				Assert.isTypeOf('function', blackberry.utils.parseURL );  
			},
			
			//4 Changed by Lei on Jan. 4th. 2011 
			"For a blackberry.utils.URL object, getURLParameter should exist and is a function" : function() {
			    var url = blackberry.utils.parseURL("local:///leihu/index.html?COUNTER=3&FOO=BAR");
				Assert.isTypeOf('function', url.getURLParameter ); 
				
			},
			//5 Changed by Lei on Jan. 4th. 2011 
			"For a blackberry.utils.URL object, getURLParameterByIndex should exist and is a function" : function() {
			    var url = blackberry.utils.parseURL("http://leihu:90/index.html?COUNTER=3&FOO=BAR");
				Assert.isTypeOf('function', url.getURLParameterByIndex );
			},
			//6 Changed by Lei on Jan. 4th. 2011 
			"For a blackberry.utils.URL object, property host should exist and be readOnly" : function() {
				var url = blackberry.utils.parseURL("http://leihu:90/index.html?COUNTER=3&FOO=BAR");
				//alert(url.port);
				Assert.isNotUndefined(url.host);
				var host = url.host;
				try{
					url.host = "changed host";
				}catch(e){
					
				}		
				Assert.areSame(url.host, host);
			},
			//7 Changed by Lei on Jan. 4th. 2011 
			"For a blackberry.utils.URL object, property port should exist and be type of Number and readOnly" : function() {
				var url = blackberry.utils.parseURL("http://leihu:90/index.html?COUNTER=3&FOO=BAR");
				//alert(url.port);
				Assert.isNumber(url.port);
				var port = url.port;
				try{
					url.port = "5675";
				}catch(e){
				}
				Assert.areSame(url.port, port);
			},
			
			//stringToBlob comment it for now
			/*
			"blackberry.utils.stringToBlob should exist and is a function" : function() {
				Assert.isTypeOf('function', blackberry.utils.stringToBlob ); 
			},
			*/
			
			//blobToString comment it for now
			/*
			"blackberry.utils.blobToString should exist and is a function" : function() {
				Assert.isTypeOf('function', blackberry.utils.blobToString);
			},
			*/
			
		
//blackberry.utils Functional test
		
		
		//8
		    "blackberry.utils.parseURL - http explicitly define port should work" : function() {
				var url = blackberry.utils.parseURL("http://www.yui.com:998/index.html?COUNTER=8&FOO='HoHo'" );
                Assert.areSame( url.port, 998 );
                Assert.areSame( url.host, "www.yui.com");
                Assert.areSame( url.getURLParameterByIndex(0), "8" );
                Assert.areSame( url.getURLParameter("FOO"), "'HoHo'" );
				         
			},
		//9		
			"blackberry.utils.parseURL - https explicitly define port should work" : function() {
				var url = blackberry.utils.parseURL("https://www.yui.com:998/index.html?COUNTER=8&FOO='HoHo'" );
                Assert.areSame( url.port, 998);
                Assert.areSame( url.host, "www.yui.com");
                Assert.areSame( url.getURLParameterByIndex(0), "8" );
                Assert.areSame( url.getURLParameter("FOO"), "'HoHo'" );
				         
			},				
		//10	
			"blackberry.utils.parseURL - http implicitly define port should work" : function() {
				var url = blackberry.utils.parseURL("http://www.guoguo.com/index.html?COUNTER=3&FOO=BAR");
                Assert.areSame( url.port, 80);
                Assert.areSame( url.host, "www.guoguo.com");
                Assert.areSame( url.getURLParameterByIndex(0), "3" );
                Assert.areSame( url.getURLParameter("FOO"), "BAR" );
				         
			},	
		//11		   
			"blackberry.utils.parseURL - https implicitly define port should work" : function() {
				var url = blackberry.utils.parseURL("https://www.guoguo.com/index.html?COUNTER=3&FOO=BAR");
                Assert.areSame( url.port, 443);
                Assert.areSame( url.host, "www.guoguo.com");
                Assert.areSame( url.getURLParameterByIndex(0), "3" );
                Assert.areSame( url.getURLParameter("FOO"), "BAR" );
				         
			},	
		//12
			"blackberry.utils.parseURL - local protocal should work on getURLParameterByIndex" : function() {
				var url = blackberry.utils.parseURL("local:///leihu/index.html?COUNTER=3&FOO=BAR");
				Assert.areSame( url.getURLParameterByIndex(0), "3" );
			},	 
        //13
			"blackberry.utils.parseURL - local protocal should work on getURLParameter" : function() {
				var url = blackberry.utils.parseURL("local:///leihu/index.html?COUNTER=3&FOO=BAR");
                Assert.areSame( url.getURLParameter("FOO"), "BAR" );
			},	 
			
			
		//14 comment it for now
			/*
			"blackberry.utils.stringToBlob and BlobToString should work" : function() {
				var globalBlob;
                var globalString = "Hello Playbook";
                globalBlob = blackberry.utils.stringToBlob(globalString, "UTF-8");
                Assert.areSame( blackberry.utils.blobToString(globalBlob), globalString );
                
			},
            */			
        //blackberry.utils Negative test
		/*	
			"blackberry.utils.parseURL - abc:// implicitly define port should work" : function() {
				var url = blackberry.utils.parseURL("abc://www.guoguo.com/index.html?COUNTER=3&FOO=BAR");
                Assert.areSame( url.port, 80);
                Assert.areSame( url.host, "www.guoguo.com");
                Assert.areSame( url.getURLParameterByIndex(0), "3" );
                Assert.areSame( url.getURLParameter("FOO"), "BAR" );
				         
			}	
		*/	
			});

	
		return testCases;
}
	
})();
