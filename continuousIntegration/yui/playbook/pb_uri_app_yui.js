(function() {
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	
	
	
/*	
	var json_data={
	"data":{
		"author":"Lev",
		"name":"invoked3.1.5step1",
		"authorEmail":"lev@lev.com",
		"authorURL":"www.lev.com",
		"description":"My app",
		"license":"balh",
		"id":"888",
		"version":"1.0",
		"copyright":"Levy copy",
		"licenseURL":"blah.com"
	}
};
*/
	var result;
	
	
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y) {
		var testCases = new Array();
		var Assert = Y.Assert;
			
			testCases[0] = new Y.Test.Case({
			name: "blackberry.app (URI based) Tests",
			
			setUp : function () {
				//Order is a stack, last object will appear first in DOM
				framework.setupFailButton();
				framework.setupPassButton();
				framework.setupInstructions();
				
				if(result == undefined)
				{
					var test = this;	
					$.ajax({
					type: "get",
					url: "webworks://blackberry/app/get",			    		    
					success: function(msg){	
					result = JSON.parse(msg).data;
					test.resume(function (){});
					}
					});
					test.wait(
					function(){
						alert("can't contact uri blackberry.app");
					}, 3100);
					
			
				}
			},
			
			tearDown : function () {
				framework.tearDownFailButton();
				framework.tearDownPassButton();
				framework.tearDownInstructions();
			},
			
			_should: {
				error: {
					"blackberry.app.exit (URI based) should return an error" : "Too many arguments"
				}                
			},
			
			
			

			//app object returned
			"webworks://blackberry/app/get should exist" : function() {
			Assert.isNotUndefined(result);		
			},
			
			//check data in json
			
			//check author
		    "URI based  author  should exist" : function() {
			//alert(result.author);
				Assert.isNotUndefined(result.author);
			
			},
			
			//check name
		    "URI based  name  should exist" : function() {
				Assert.isNotUndefined(result.name);
			
			},
			
			//check authorEmail
		    "URI based  authorEmail  should exist" : function() {
				Assert.isNotUndefined(result.authorEmail);
			},
			
			//check authorURL
		    "URI based  authorURL  should exist" : function() {
				Assert.isNotUndefined(result.authorURL);
			},
			
			//check description
		    "URI based  description  should exist" : function() {
				Assert.isNotUndefined(result.description);
			},
			
			//check license
		    "URI based   license should exist" : function() {
				Assert.isNotUndefined(result.license);
			},
		
		//check id
		    "URI based   id should exist" : function() {
				Assert.isNotUndefined(result.id);
			},
		//check version
		    "URI based   version should exist" : function() {
				Assert.isNotUndefined(result.version);
			},
		
	    //check copyright
		    "URI based   copyright should exist" : function() {
				Assert.isNotUndefined(result.copyright);
			},
	
		//check licenseURL
		    "URI based   licenseURL should exist" : function() {
				Assert.isNotUndefined(result.licenseURL);
			},
		//////////////////////////check URI API against JS API	
		//check author
		    "URI based  author and blackberry.app.author  should be Equal" : function() {
			//alert(result.author);
				Assert.areEqual(result.author, blackberry.app.author);
			
			},
			
		//check name
		    "URI based  name  and blackberry.app.name should be Equal" : function() {
				Assert.areEqual(result.name,blackberry.app.name);
			
			},
			
		//check authorEmail
		    "URI based  authorEmail  and blackberry.app.authorEmail should be Equal" : function() {
				Assert.areEqual(result.authorEmail,blackberry.app.authorEmail);
			},
			
		//check authorURL
		    "URI based  authorURL and blackberry.app.authorURL should be Equal" : function() {
				Assert.areEqual(result.authorURL,blackberry.app.authorURL);
			},
			
		//check description
		    "URI based  description and blackberry.app.description  should be Equal" : function() {
				Assert.areEqual(result.description,blackberry.app.description);
			},
			
		//check license
		    "URI based   license and blackberry.app.license should be Equal" : function() {
				Assert.areEqual(result.license,blackberry.app.license);
			},
		
		//check id
		    "URI based   id and blackberry.app.id should be Equal" : function() {
				Assert.areEqual(result.id,blackberry.app.id);
			},
		//check version
		    "URI based   version and blackberry.app.version should be Equal" : function() {
				Assert.areEqual(result.version,blackberry.app.version);
			},
		
		//check copyright
		    "URI based   copyright and blackberry.app.copyright should be Equal" : function() {
				Assert.areEqual(result.copyright,blackberry.app.copyright);
			},
	
		//check licenseURL
		    "URI based   licenseURL and blackberry.app.licenseURL should be Equal" : function() {
				Assert.areEqual(result.licenseURL,blackberry.app.licenseURL);
			},
					
	"MANUAL Test - should show all the application properties from uri based call": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Shows all application properties<br />Pass this test if this is true.  Otherwise, fail.");
				alert("Will attempt to show all blackberry.app properties");
				alert('author='+ result.author);
				alert('authorEmail=' + result.authorEmail);
				alert('authorURL=' + result.authorURL);
				alert('copyright=' + result.copyright);
				alert('description=' + result.description);
				alert('id=' + result.id);
				//alert('isForeground=' + blackberry.app.isForeground);
				alert('license=' + result.license);
				alert('licenseURL=' + result.licenseURL);
				alert('name=' + result.name);
				alert('version=' + result.version);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			}
		
		});
		
		return testCases;
	}
})();