(function() {               
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

	
	// add iframe in body section                                      
	var newdiv = document.createElement('div');
	var divIdName = "div_messaging_01";
	newdiv.setAttribute('id_mss_div',divIdName);
	newdiv.innerHTML = '<iframe src="html5/Messaging/iframe.htm" id="iframe1_mss" height=0 width=0 style="visibility:hidden"></iframe><iframe src="http://yoyu-xp/html5work/Messaging/iframe_remote.htm" id="iframe2_mss" height=0 width=0 style="visibility:hidden"></iframe>';
	var o = document.getElementsByTagName('body')[0];
	o.appendChild(newdiv);

	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases["suiteName"] = "html5 Messaging tests";
		
		//---------------------------------------------------------------------
		// XML DOM tests
		//---------------------------------------------------------------------			

		testCases[0] = new Y.Test.Case({
			name: "HTML5 Web Messaging tests",

			setUp : function () {
				//Setup code goes here
				
			},
			 
			tearDown : function () {
				//Teardown code goes here
				
			},
							
			"same domain messaging should work" : function()
			{

				var my_path;
				var myiframe;
				var test = this;
				my_path = "http://" + document.location.host;
				addEventListener('message', function(e) {
					var str = new String(e.origin);
					if (str.search(document.location.host) >= 0) {
                        
						if (e.data == "hello Yong Yu") {
							test.resume(
								function (){
									Assert.isTrue(true);
								}
							);	
						}
					}

				}, true);
					

				myiframe = document.getElementById("iframe1_mss");

				var win = myiframe.contentWindow;
				win.postMessage('Yong Yu local', my_path);
				
				test.wait(
					function(){
						Assert.fail("same domain messaging test fails!");
					}, 3100);
			},

			"cross domain messaging should work" : function(){

//				var my_path = "http://bdt11-vmyyz";
//				var my_path01 = "http://bdt11-vmyyz.labyyz.testnet.rim.net";
//				var my_path02 = "http://10.135.205.24";
				var my_path03 = "http://yoyu-xp/html5work/Messaging/";
				var test = this;
									
				addEventListener('message', function(e){			
					if(e.data == "hello Yong Yu from remote") {
						test.resume(
							function (){
								Assert.isTrue(true);
							}
						);    

					}

				}, true);
					
				var myiframe = document.getElementById("iframe2_mss");
				var win = myiframe.contentWindow;
//				win.postMessage("Yong Yu remote", my_path02);
				win.postMessage("Yong Yu remote", my_path03);
				test.wait(
					function(){
						Assert.fail("cross domain messaging fails!");
					}, 3100);

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
			
			"blackberry.app.author should exist" : function() {
				Assert.isNotUndefined(blackberry.app.author);
			},
		});
*/		
		return testCases;
	}
})();
