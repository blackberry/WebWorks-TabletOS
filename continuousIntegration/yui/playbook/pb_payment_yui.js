(function(){
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases[0] = new Y.Test.Case({
			name: "blackberry.payment Test",
			
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
			
			"blackberry.payment should exist" : function() {
				Assert.isNotUndefined(blackberry.payment);
			},
			/*
			"blackberry.payment.connectionMode should exist" : function() {
				Assert.isNotUndefined(blackberry.payment.connectionMode);
			},
			*/
			
			"blackberry.payment.developmentMode should exist and be type of boolean" : function() {
				Assert.isNotUndefined(blackberry.payment.developmentMode);
				Assert.isTypeOf("boolean", blackberry.payment.developmentMode);
			},
			
			"blackberry.payment.getExistingPurchases() should exist" : function() {
				Assert.isNotUndefined(blackberry.payment.getExistingPurchases);
			},
			
			"blackberry.payment.purchase() should exist" : function() {
				Assert.isNotUndefined(blackberry.payment.purchase);
			},
			
			"MANUAL blackberry.payment.purchase() with developmentMode setting to true should work": function() {
				framework.test = this;
				framework.setInstructions("1. if you see PASS, then it means this test case is passing");
				// developmentMode setting to true
				try{
					blackberry.payment.developmentMode =  true;
					alert('purchase');
					blackberry.payment.purchase( 
						{"digitalGoodID":"123",
						"digitalGoodSKU":"someSKU",
						"digitalGoodName":"SomeName",
						"metaData":"metadata",
						"purchaseAppName":"WebWorks APP",
						"purchaseAppIcon":null}, callbackOnSuccess,callbackOnFailure);
				
				}catch(err){
					alert(err);
				}
				function callbackOnSuccess(purchase) {
					alert ("success called:"+ JSON.stringify(purchase));
					framework.test.resume();
                }				
				
				function callbackOnFailure(error) {
					alert ("failure called with error code:"+ error);
					Assert.fail(" blackberry.payment.purchase() failed");
					framework.test.resume();
                }
				
				framework.test.wait(function(){
					Assert.fail(" blackberry.payment.purchase() failed");
				}, 5*60*1000);	
		    },
			
			
			"MANUAL blackberry.payment.getExistingPurchases with developmentMode setting to true should work": function() {
				framework.test = this;
				framework.setInstructions("1. if you see PASS, then it means this test case is passing");
				blackberry.payment.getExistingPurchases(false, callbackOnSuccess, callbackOnFailure);

				function callbackOnSuccess(data) {
					alert ("success called:"+ JSON.stringify(data));
					framework.test.resume();
                }				
				
				function callbackOnFailure(error) {
					alert ("failure called with error code:"+ error);
					Assert.fail(" blackberry.payment.purchase() failed");
					framework.test.resume();
                }
				
				framework.test.wait(function(){
					Assert.fail(" blackberry.payment.purchase() failed");
				}, 5*60*1000);	
		    },
			
			/*
			"blackberry.payment.getExistingPurchases() should not return any purchases" : function(){
			blackberry.payment.connectionMode = "local";
				blackberry.payment.getExistingPurchases(false, function (purchases){
					framework.test.resume(function (){
						Assert.areSame (purchases.length, 0);
					});
				});
			},
			*/
			/*
			"MANUAL blackberry.payment.purchase()1": function() {
				framework.test = this;
				framework.setInstructions("");
				
				blackberry.payment.purchase(
					function(purchase){
						//success
						framework.test.resume(function (){
							//purchase should be a JSON key-value for each blackberry.payment.Purchase
							Assert.isTypeOf("date", purchase.date);
							Assert.isTypeOf("string", purchase.digitalGoodID);
							Assert.isTypeOf("string", purchase.digitalGoodSKU);
							Assert.isTypeOf("string", purchase.licenseKey);
							Assert.isTypeOf("string", purchase.metaData);
							Assert.isTypeOf("string", purchase.transactionID);
						});
					},
					function(error){
						//failure
						framework.test.resume(function (){
							Assert.fail("blackberry.payment.purchase() callbackOnFailure occured unexpectedly with error code: " + error);
						}
					},
					{
						//metaData
						"metaData" : "someMeta",
						"purchaseAppName" : "the app name",
						"purchaseAppIcon" : "the app icon"
					}, 
					"someID", 
					"someSKU");
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			I*/
		});
		
		//CAN I HAVE DEPENDENT TESTS? THIS TEST WOULD DEPEND ON THE PREVIOUS TEST BEING RUN, AND PASSING
		/*
		"blackberry.payment.getExistingPurchases() should return the purchase made before this" : function(){
			blackberry.payment.connectionMode = "local";
				blackberry.payment.getExistingPurchases(false, function (purchases){
					framework.test.resume(function (){
						for (var purchase in purchases){
							//purchase should be a JSON key-value for each blackberry.payment.Purchase
							Assert.isTypeOf("date", purchase.date);
							Assert.isTypeOf("string", purchase.digitalGoodID);
							Assert.isTypeOf("string", purchase.digitalGoodSKU);
							Assert.isTypeOf("string", purchase.licenseKey);
							Assert.isTypeOf("string", purchase.metaData);
							Assert.isTypeOf("string", purchase.transactionID);
						}
					});
				});
				
			},
		*/	
	
		return testCases;
	}
})();
