(function() {  
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		
		testCases["suiteName"] = "blackberry.identity TestSuite"; 
	
		testCases[0] = new Y.Test.Case({
			name: "blackberry.identity Test",
			
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


			"blackberry.identity should exist": function() {
				Assert.isNotUndefined(blackberry.identity);
			},
			 
			"blackberry.identity.getDefaultService should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.identity.getDefaultService );
			},
			
			"blackberry.identity.getServiceList should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.identity.getServiceList );
			},
			
			"blackberry.identity.getTransportList should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.identity.getTransportList );
			},
			
			"blackberry.identity.IMEI should exist and is readonly String": function() {
				Assert.isString( blackberry.identity.IMEI );
				var _IMEI = blackberry.identity.IMEI;
				blackberry.identity.IMEI = "123456789";
				Assert.areSame( blackberry.identity.IMEI, _IMEI);
			},
			
			"blackberry.identity.IMSI should exist and is String": function() {
				Assert.isString( blackberry.identity.IMSI );
				var _IMSI = blackberry.identity.IMSI;
				blackberry.identity.IMSI = "8888";
				Assert.areSame( blackberry.identity.IMSI, _IMSI);
       		},
			
			"blackberry.identity.PIN should exist and is String": function() {
				Assert.isString( blackberry.identity.PIN );
				var _PIN = blackberry.identity.PIN;
                blackberry.identity.PIN = "2000008X";
                Assert.areSame( blackberry.identity.PIN, _PIN);
			},
		   	 
		   	"blackberry.identity.phone.getLineIds should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.identity.phone.getLineIds );
			},
		   	
		    "blackberry.identity.phone.getLineLabel should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.identity.phone.getLineLabel );
			},
			
			"blackberry.identity.phone.getLineNumber should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.identity.phone.getLineNumber );
			},
			
			"blackberry.identity.phone.getLineType should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.identity.phone.getLineType );
			},

            "blackberry.identity.TYPE_EMAIL should exist and is Number": function() {
				Assert.isString( blackberry.identity.TYPE_EMAIL );
				Assert.areSame( 0, blackberry.identity.Service.TYPE_EMAIL );
			},
			
			"blackberry.identity.TYPE_CALENDAR should exist and is Number": function() {
				Assert.isString( blackberry.identity.TYPE_CALENDAR );
				Assert.areSame( 1, blackberry.identity.Service.TYPE_EMAIL );
			},
			
			"blackberry.identity.TYPE_CONTACT should exist and is Number": function() {
				Assert.isString( blackberry.identity.TYPE_CALENDAR );
				Assert.areSame( 2, blackberry.identity.Service.TYPE_CONTACT );
			},
			
			"blackberry.identity.emailaddress(Service) should exist and is String and readonly": function() {
			    Assert.isNotUndefined( blackberry.identity.Service.emailAddress );
				
				var service = blackberry.identity.getServiceList();
    			var emailAddress = service[0].emailAddress;
    			Assert.isString( emailAddress );
				service.emailAddress = "changed@rim.com";
				Assert.areSame(service[0].emailAddress, emailAddress);
			},
		
			"blackberry.identity.isDefault(Service) should exist and is Boolean and readonly": function() {
				Assert.isNotUndefined( blackberry.identity.Service.isDefault );
				var service = blackberry.identity.getServiceList();
    			var defaultvalue = service[0].isDefault;
    			Assert.isBoolean( defaultvalue );
				service.isDefault = "2";
				Assert.areSame( service[0].isDefault, deafultvalue);
			},	
			
			"blackberry.identity.name(Service) should exist and is String and readonly": function() {
				Assert.isNotUndefined( blackberry.identity.Service.name );
				var service = blackberry.identity.getServiceList();
    			var name1 = service[0].name;
				Assert.isString( service[0].name );
				service.name = "servicename";
				Assert.areSame( service[0].name, name1);
			},
			
			"blackberry.identity.type(Service) should exist and is Number and readonly": function() {
				Assert.isNotUndefined( blackberry.identity.Service.type );
				var service = blackberry.identity.getServiceList();
				var type1 = service[0].type;
				Assert.isNumber( service[0].type );
				service.type = 5;
				Assert.areSame( service[0].type, type1);
			},

            "blackberry.identity.name(Transport) should exist and is String and readonly": function() {
				Assert.isNotUndefined( blackberry.identity.Transport.name );
				var transports = blackberry.identity.getTransportList();
    			var name1 = service.name;
				Assert.isString( transports[0].name );
				transports[0].name = "servicename";
				Assert.areSame( transports[0].name, name1);
			},
			
			"blackberry.identity.type(Transport) should exist and is String and readonly": function() {
				Assert.isNotUndefined( blackberry.identity.Transport.type );
				var transports = blackberry.identity.getTransportList();
				var type1 = transports[0].type;
				Assert.isString( type1 );
				transports[0].type = "test transport";
				Assert.areSame( transports[0].type, type1);
			},
			
			"blackberry.identity changeIdentity_Properties should exist and is String and readonly": function() {
				Assert.isNotUndefined( blackberry.identity.Transport.type );
				var transports = blackberry.identity.getTransportList();
				var type1 = transports[0].type;
				Assert.isString( type1 );
				transports[0].type = "test transport";
				Assert.areSame( transports[0].type, type1);
			},

//manual test
            
             "MANUAL 1 blackberry.identity.getDefaultService should return default service": function() {
                framework.test = this;
				framework.setInstructions( "Check if there is default service showing up, press Pass this test if this is true.  Otherwise, fail.");
				var t = blackberry.identity.getDefaultService();
				var textMsg = "Default Service" + defaultserviceArray.length + "\n";;
                for (i = 0; i < defaultserviceArray.length; i++) {
                    textMsg += "name= " + defaultserviceArray[i].name + "\n";
                    textMsg += "emailAddress= " + defaultserviceArray[i].emailAddress + "\n";
                    textMsg += "isDefault= " + defaultserviceArray[i].isDefault + "\n";
                    textMsg += "type= " + defaultserviceArray[i].type + "\n";
                    textMsg += "\n";
                }
                alert(textMsg);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
   
            "MANUAL 2 blackberry.identity.getServiceList should return all supported service list": function() {
                framework.test = this;
				framework.setInstructions( "Check if there is service list showing up, press Pass this test if this is true.  Otherwise, fail.");
		    	var servicesArray = blackberry.identity.getServiceList();
				var textMsg = "Service List: " + servicesArray.length + "\n";
                for (i = 0; i < servicesArray.length; i++) {
                    textMsg += "name= " + servicesArray[i].name + "\n";
                    textMsg += "emailAddress= " + servicesArray[i].emailAddress + "\n";
                    textMsg += "isDefault= " + servicesArray[i].isDefault + "\n";
                    textMsg += "type= " + servicesArray[i].type + "\n";
                    textMsg += "\n";
                }
                alert(textMsg);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
   
            "MANUAL 3 blackberry.identity.getTransportList should return all supported transport list": function() {
                framework.test = this;
				framework.setInstructions( "Check if there is transport list showing up, press Pass this test if this is true.  Otherwise, fail.");
		    	var transportsList = blackberry.identity.getTransportList();
				var textMsg = "transports List: " + transportsList.length + "\n";
                for (var i = 0; i < transportsList.length; i++) {
                    textMsg += "name= " + transportsList[i].name + "\n";
                    textMsg += "type= " + transportsList[i].type + "\n";
                    textMsg += "\n";
                }
                alert(textMsg);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
    
            "MANUAL 4 blackberry.identity.phone functions should all work": function() {
                framework.test = this;
				framework.setInstructions( "Check if there is transport list showing up, press Pass this test if this is true.  Otherwise, fail.");
		    	var linesList = blackberry.identity.phone.getLineIds();
				var textMsg = "linesList List: " + transportsList.length + "\n";
                for (var i = 0; i < linesList.length; i++) {
                    textMsg += "Line id : " + linesList[i] + "\n";
                    textMsg += "Line Number : " + blackberry.identity.phone.getLineNumber(linesList[i]) + "\n";
                    textMsg += "Line Label : " + blackberry.identity.phone.getLineLabel(linesList[i]) + "\n";
                    textMsg += "Line Type : " + blackberry.identity.phone.getLineType(linesList[i]) + "\n";
                    textMsg += "\n";
                    textMsg += "\n";
                }
                alert(textMsg);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
    
  
		});
		
		return testCases;
}
	
})();
