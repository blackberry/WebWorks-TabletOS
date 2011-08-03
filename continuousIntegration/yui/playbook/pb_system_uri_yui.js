(function(){
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	
	function contain(a, obj) {         
            var i = a.length;
            while (i--) {
            if (a[i] === obj) {
                        return true;
            }
            }
            return false;
      }
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		

		
		testCases[0] = new Y.Test.Case({
			name: "blackberry.system URL Based Test",
			
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
					//"blackberry.system.model should exist and be read-only" : "setting a property that has only a getter",
				}
			},

			
			//existence test
			
			"get should exist" : function() {
			framework.test = this;
                $.ajax({
						type: "get",
						url: "webworks://blackberry/system/get",
						success: function(msg){                             
								framework.test.resume(function (){
									Assert.isNotUndefined(JSON.parse(msg).data);
								});               
						}
                });

								
				framework.test.wait(function(){
					Assert.fail("blackberry/system/get failed");
				}, 5*60*1000);

			}, 

	
			"hasCapability(media.audio.capture) should return true" : function() {
				framework.test = this;
                $.ajax({
						type: "get",
						url: "webworks://blackberry/system/get",
						success: function(msg){                             
								framework.test.resume(function (){
				                   Assert.areEqual(contain(JSON.parse(msg).data.hasCapability, "media.audio.capture"), true);
								});               
						}
                });		

				framework.test.wait(function(){
					Assert.fail("hasCapability_media.audio.capture failed");
				}, 5*60*1000);				
			},
			
			"hasCapability(media.video.capture) should return true" : function() {
						framework.test = this;
                $.ajax({
						type: "get",
						url: "webworks://blackberry/system/get",
						success: function(msg){                             
								framework.test.resume(function (){
				                   Assert.areEqual(contain(JSON.parse(msg).data.hasCapability, "media.video.capture"), true);
								});               
						}
                });	

				framework.test.wait(function(){
					Assert.fail("hasCapability_media.video.capture failed");
				}, 5*60*1000);				
			},
			
			"hasCapability(media.recording) should return true" : function() {
						framework.test = this;
               $.ajax({
						type: "get",
						url: "webworks://blackberry/system/get",
						success: function(msg){                             
								framework.test.resume(function (){
				                   Assert.areEqual(contain(JSON.parse(msg).data.hasCapability, "media.recording"), true);
								});               
						}
                });		

				framework.test.wait(function(){
					Assert.fail("hasCapability_media.recording failed");
				}, 5*60*1000);				
			},
			
			
			"hasCapability(location.gps) should return true" : function() {
						framework.test = this;
              $.ajax({
						type: "get",
						url: "webworks://blackberry/system/get",
						success: function(msg){                             
								framework.test.resume(function (){
				                   Assert.areEqual(contain(JSON.parse(msg).data.hasCapability, "location.gps"), true);
								});               
						}
                });			

				framework.test.wait(function(){
					Assert.fail("hasCapability_location.gps failed");
				}, 5*60*1000);				
			},
		
			"hasCapability(network.bluetooth) should return true" : function() {	
			framework.test = this;			
              $.ajax({
						type: "get",
						url: "webworks://blackberry/system/get",
						success: function(msg){                             
								framework.test.resume(function (){
				                   Assert.areEqual(contain(JSON.parse(msg).data.hasCapability, "network.bluetooth"), true);
								});               
						}
                });			

				framework.test.wait(function(){
					Assert.fail("hasCapability_network.bluetooth failed");
				}, 5*60*1000);				
			},
			
			"hasCapability(network.wlan) should return true" : function() {
						framework.test = this;
             $.ajax({
						type: "get",
						url: "webworks://blackberry/system/get",
						success: function(msg){                             
								framework.test.resume(function (){
				                   Assert.areEqual(contain(JSON.parse(msg).data.hasCapability, "network.wlan"), true);
								});               
						}
                });	
				
				framework.test.wait(function(){
					Assert.fail("hasCapability_network.wlan failed");
				}, 5*60*1000);				
			},
			
			
			"hasDataCoverage should return true" : function() {
						framework.test = this;
             $.ajax({
						type: "get",
						url: "webworks://blackberry/system/get",
						success: function(msg){                             
								framework.test.resume(function (){
									Assert.isNotUndefined(JSON.parse(msg).data.hasDataCoverage);
									Assert.areSame(JSON.parse(msg).data.hasDataCoverage,true);
									Assert.areSame(JSON.parse(msg).data.hasDataCoverage,blackberry.system.hasDataCoverage());
								});               
						}
                });					

				
				framework.test.wait(function(){
					Assert.fail("hasDataCoverage failed");
				}, 5*60*1000);				
			},
			
			"hasPermission(blackberry.app) should return ALLOW" : function() {
						framework.test = this;
             $.ajax({
						type: "get",
						url: "webworks://blackberry/system/get",
						success: function(msg){                             
								framework.test.resume(function (){							   
				                   Assert.areEqual(contain(JSON.parse(msg).data.hasPermission, "blackberry.app"), true);
								});               
						}
                });				


				framework.test.wait(function(){
					Assert.fail("hasPermission_blackberry.app failed");
				}, 5*60*1000);				
			},
			
			"hasPermission(blackberry.app.event) should return ALLOW" : function() {
						framework.test = this;
             $.ajax({
						type: "get",
						url: "webworks://blackberry/system/get",
						success: function(msg){                             
								framework.test.resume(function (){
				                   Assert.areEqual(contain(JSON.parse(msg).data.hasPermission, "blackberry.app.event"), true);
								});               
						}
                });	


				framework.test.wait(function(){
					Assert.fail("hasPermission_blackberry.app.event failed");
				}, 5*60*1000);
			},
			
			"hasPermission(blackberry.system) should return ALLOW" : function() {
						framework.test = this;
             $.ajax({
						type: "get",
						url: "webworks://blackberry/system/get",
						success: function(msg){                             
								framework.test.resume(function (){
				                   Assert.areEqual(contain(JSON.parse(msg).data.hasPermission, "blackberry.system"), true);
							   });               
						}
                });	
				
				
				framework.test.wait(function(){
					Assert.fail("hasPermission_blackberry.system failed");
				}, 5*60*1000);
			},
			
			"hasPermission(blackberry.system.event) should return ALLOW" : function() {
						framework.test = this;
             $.ajax({
						type: "get",
						url: "webworks://blackberry/system/get",
						success: function(msg){                             
								framework.test.resume(function (){
				                   Assert.areEqual(contain(JSON.parse(msg).data.hasPermission, "blackberry.system.event"), true);
								   });               
						}
                });	
				
				framework.test.wait(function(){
					Assert.fail("hasPermission_blackberry.system.event failed");
				}, 5*60*1000);				
			},
			
			"hasPermission(blackberry.ui.dialog) should return ALLOW" : function() {
						framework.test = this;
             $.ajax({
						type: "get",
						url: "webworks://blackberry/system/get",
						success: function(msg){                             
								framework.test.resume(function (){
				                   Assert.areEqual(contain(JSON.parse(msg).data.hasPermission, "blackberry.ui.dialog"), true);
						   });               
						}
                });	
				
				framework.test.wait(function(){
					Assert.fail("hasPermission_blackberry.ui.dialog failed");
				}, 5*60*1000);				
			},
			
			"hasPermission(blackberry.invoke) should return ALLOW" : function() {
						framework.test = this;
             $.ajax({
						type: "get",
						url: "webworks://blackberry/system/get",
						success: function(msg){                             
								framework.test.resume(function (){
				                   Assert.areEqual(contain(JSON.parse(msg).data.hasPermission, "blackberry.invoke"), true);
								   });               
						}
                });	
				
				framework.test.wait(function(){
					Assert.fail("hasPermission_blackberry.invoke failed");
				}, 5*60*1000);				
			},
			
			//blackberry.utils Added
			"hasPermission(blackberry.utils) should return ALLOW" : function() {
						framework.test = this;
             $.ajax({
						type: "get",
						url: "webworks://blackberry/system/get",
						success: function(msg){                             
								framework.test.resume(function (){
				                   Assert.areEqual(contain(JSON.parse(msg).data.hasPermission, "blackberry.utils"), true);
								   });               
						}
                });	
				
				framework.test.wait(function(){
					Assert.fail("hasPermission_blackberry.invoke failed");
				}, 5*60*1000);				
			},
	
			"isMassStorageActive should return false" : function() {
						framework.test = this;
             $.ajax({
						type: "get",
						url: "webworks://blackberry/system/get",
						success: function(msg){                             
								framework.test.resume(function (){
									Assert.isNotUndefined(JSON.parse(msg).data.isMassStorageActive);
									Assert.areSame(JSON.parse(msg).data.isMassStorageActive,false);
									Assert.areSame(JSON.parse(msg).data.isMassStorageActive,blackberry.system.isMassStorageActive());
								});               
						}
                });		
				
				framework.test.wait(function(){
					Assert.fail("isMassStorageActive failed");
				}, 5*60*1000);				
			},
	
			
			"model should exist" : function() {
						framework.test = this;
                $.ajax({
						type: "get",
						url: "webworks://blackberry/system/get",
						success: function(msg){                             
								framework.test.resume(function (){
									Assert.isNotUndefined(JSON.parse(msg).data.model);
									Assert.areEqual(JSON.parse(msg).data.model,blackberry.system.model);
								});               
						}
                });
				
				framework.test.wait(function(){
					Assert.fail("model failed");
				}, 5*60*1000);				
			},
			
			"scriptApiVersion should exist" : function() {
						framework.test = this;
                $.ajax({
						type: "get",
						url: "webworks://blackberry/system/get",
						success: function(msg){                             
								framework.test.resume(function (){
									Assert.isNotUndefined(JSON.parse(msg).data.scriptApiVersion);
									Assert.areSame(JSON.parse(msg).data.scriptApiVersion,"1.0.0.0");
									Assert.areSame(JSON.parse(msg).data.scriptApiVersion,blackberry.system.scriptApiVersion);
								});               
						}
                });
				
				framework.test.wait(function(){
					Assert.fail("scriptApiVersion failed");
				}, 5*60*1000);
			},
			
			"softwareVersion should exist" : function() {
						framework.test = this;
                $.ajax({
							type: "get",
							url: "webworks://blackberry/system/get",
							success: function(msg){                             
										framework.test.resume(function (){
											Assert.isNotUndefined(JSON.parse(msg).data.softwareVersion);
											Assert.areEqual(JSON.parse(msg).data.softwareVersion,blackberry.system.softwareVersion);//blackberry.system.softwareVersion or 'QNX'
										});               
							}
                });
				
				framework.test.wait(function(){
					Assert.fail("softwareVersion failed");
				}, 5*60*1000);				
			},

		});
		return testCases;
	}
})();