(function() {  
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		
        
        
		//end of variable definition
		
		testCases["suiteName"] = "blackberry.push TestSuite"; 
	
		testCases[0] = new Y.Test.Case({
			name: "blackberry.push Test",
			
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

            _should: {
            error: {
              //  "blackberry.ui.menu.caption should exist and is String and read/write" : "caption should be read/write",
              //  "blackberry.identity.getServiceList(undefined) should throw an error" : "java.lang.IllegalArgumentException: Too many arguments",
                }
            },


			"blackberry.push should exist": function() {
				Assert.isNotUndefined( blackberry.push );
			},
			
			"blackberry.push.closePushListener should exist and is function": function() {
				Assert.isTypeOf( "function", blackberry.push.closePushListener );
			},
			
			"blackberry.push.openPushListener should exist and is function": function() {
				Assert.isTypeOf( "function", blackberry.push.openPushListener );
			},
		
            "MANUAL register to BIS server should work properly": function() {
                framework.test = this;
			framework.setInstructions( "Check if there is 200 showing up, press Pass this test if this is true.  Otherwise, fail.");
			//variables for push
			var payload, isE;
			var data2;
			var myXHR;
			var encryptedParam;
			var params;
			var BBP_SERVER = "http://pushapi.eval.blackberry.com";
        	var serviceid = "46-55re2RM55eh2M5";
        	var osversion = blackberry.system.softwareVersion; //"5.0.0.92"
			alert(osversion);
        	var model = blackberry.system.model; //"9530"
                params = "/mss/PD_subReg?serviceid=" + serviceid + "&osversion=" + osversion + "&model=" + model;
				alert("1:" + params);
                try {
                    myXHR = new XMLHttpRequest();
                    myXHR.open("POST", BBP_SERVER + params, true);
                } catch (err) {
                    alert(err);
                }
                myXHR.onreadystatechange = function()
                {
					alert( myXHR.status );
                    if (myXHR.readyState == 4) 
					{
                        if (myXHR.status == 200) 
						{
						test.resume(function(){
                             encryptedParam = myXHR.responseText;
							 alert( encryptedParam );
                             params = "/mss/PD_subReg?osversion=" + osversion + "&model=" + model + "&" + encryptedParam;
							 alert("2: " +  params );
                                try {
                                    myXHR = new XMLHttpRequest();
                                    myXHR.open("POST", BBP_SERVER + params, true);
                                } catch (err) {
                                    alert(err);
                                }
                                myXHR.onreadystatechange = function()
                                {
                                    if (myXHR.readyState == 4) {
                                        if (myXHR.status == 200) {
										 test.resume(
											function (){
                                
                                            alert("myXHR.status == 200");
                                            alert(myXHR.responseText);
											});
                                        }
                                        else {
                                            var message = myXHR.getResponseHeader("911");
                                            if ((message.length == null) || (message.length <= 0)) {
                                                var ErrorString = "Error!\nStatus: " + myXHR.status;
                                                ErrorString += "\nDescription: " + myXHR.statusText;
                                                alert(ErrorString);
                                            } else {
                                                alert(message);
                                            }
                                        }
                                    }
                                };
                                myXHR.send();
								}	);
                        }
                       
                   }
				   test.wait(
                function(){
                    Assert.fail("XHR did not return response quickly enough.");
                }, 3000);

                };
                myXHR.send();
			
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
		},
            
        
            "MANUAL blackberry.push.openPushlistener(isChannelEncrypted/payload/ACCEPT/DECLINE_) should work properly and readonly": function() {
                framework.test = this;
				framework.setInstructions( "open listener, wait for response message, \n press Pass this test if this is true.  Otherwise, fail.");
                try {
                    blackberry.push.openPushListener( function(){
                        alert("Getting into handleMyReturnData");
                        if (data1 != null) 
                        {
                            var result2 = data1.payload;
                            data1.payload = "changed text";
                            Assert.areSame( data1.payload, result2 );
                            Assert.isBoolean( data1.isChannelEncrypted );
                            result = data1.isChannelEncrypted;
                            data1.isChannelEncrypted = !result;
                            Assert.areSame( data1.isChannelEncrypted, result );
		                    alert("Blob length is " + data1.payload.length);
		                    var _result =  blackberry.utils.blobToString(data1.payload, "UTF-8");
		                    alert("String length is " + _result.length);
                            alert(blackberry.utils.blobToString( data1.payload ));
                            var textmsg = "";
                            textmsg += _result + "\n";
                            textmsg += "HeaderField= " + data1.getHeaderField(2) + "\n";
                            textmsg += "RequestURI= " + data1.getRequestURI() + "\n";
                            textmsg += "Source= " + data1.getSource() + "\n";
                            textmsg += "isChannelEncrypted= " + data1.isChannelEncrypted + "\n";
                            Assert.isString( data1.getHeaderField(2) );
                            Assert.isString( data1.getHeaderField("model") );
                            Assert.isString( data1.getRequestURI() );
                            Assert.isString( data1.getSource() );
                            Assert.areSame( data1.ACCEPT, 0 );
                            Assert.areSame( data1.DECLINE_USERDCR, 1 );
                            Assert.areSame( data1.DECLINE_USERDCU, 2 );
                            Assert.areSame( data1.DECLINE_USERPND, 3 );
                            Assert.areSame( data1.DECLINE_USERREQ, 4 );
                            Assert.areSame( data1.DECLINE_USERRFS, 5 );
                       }
                        else {
                            alert("No data from the push");
                        }                    
                    }, 153 );
                    alert("Open push listener on port " + 153 );
                }
                catch (err) {
                    alert(err);
                }     
                
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*


			},
			
			
			
			"MANUAL Un-register to BIS server should work properly": function() {
//put something here!
                
			},

            "MANUAL blackberry.push.closePushlistener should work properly": function() {
                framework.test = this;
				framework.setInstructions( "Check if there is default service showing up, press Pass this test if this is true.  Otherwise, fail.");
                blackberry.push.closePushListener(153);
                alert("Close push listener on port " + 153);
                framework.test.wait(24*60*60*1000);
			},

		});
		
		return testCases;
}
	
})();
