(function() {               
	//alert('loading bb_app_yui.js is beginning');
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases["suiteName"] = "HTML5 WebStorage Tests";
		
		function my_delay(millis){
			var date = new Date();
			var curDate = null;
			//alert(millis);
			do { curDate = new Date(); } 
			while(curDate-date < millis);
		}


		//---------------------------------------------------------------------
		// Test sessionStorage
		//---------------------------------------------------------------------	
		
		testCases[0] = new Y.Test.Case({
			name: "HTML5 sessionStorage tests",
			
			"sessionStorage: String item should be added" : function(){
				var re = false;
				var myStorage = sessionStorage;
				var name = "rim";
				var data = "research in motion%!@#$&^-+=_.,*;'<>?/|\`~\"1234567890:";
				myStorage.setItem(name, data);
				var data01 = myStorage.getItem(name);
				//document.writeln(data01);
				myStorage.clear();
				if (data == data01) {
					re = true;
				}
				else {
					re = false;
				}				
				Assert.isTrue(re);
			},
			
			"sessionStorage: float item should be added" : function(){
				var re = false;
				var myStorage = sessionStorage;
				var name = "x";
				var data = 912345678.00123456789;
				myStorage.setItem(name, data);
				var data01 = myStorage.getItem(name);
				//document.writeln(data01);
				myStorage.clear();
				if (data == data01) {
					re = true;
				}
				else {
					re = false;
				}				
				Assert.isTrue(re);
			},	

			"sessionStorage: int item should be added" : function(){
				var re = false;
				var myStorage = sessionStorage;
				var name = "y";
				var data = 999999999999999999999999999999999999999;
				myStorage.setItem(name, data);
				var data01 = myStorage.getItem(name);
				//document.writeln(data01);
				myStorage.clear();
				if (data == data01) {
					re = true;
				}
				else {
					re = false;
				}			
				Assert.isTrue(re);
			},
			
			"sessionStorage: Date item should be added" : function() {
				var re = false;
				var name = "date";
				var data = new Date();
				var myStorage = sessionStorage;
				myStorage.setItem(name, data);
				var data01 = myStorage.getItem(name);
				//document.writeln(data01);
				myStorage.clear();
				if (data == data01) {
					re = true;
				}
				else {
					re = false;
				}
				Assert.isTrue(re);
			},
			
			"sessionStorage: Array item should be added" : function() {
				var re = false;
				var name = "mycars";
				var myStorage = sessionStorage;
				var data = new Array();
				data[0] = "Saab";
				data[1] = "Volvo";
				data[2] = "BMW";
				data[3] = 0.001;

				myStorage.setItem(name, data);
				data01 = myStorage.getItem(name);
				//document.writeln(data);
				//document.writeln(data01);
				myStorage.clear();
				if (data01 == "Saab,Volvo,BMW,0.001") {
					re = true;
				}
				else {
					re = false;
				}
				Assert.isTrue(re);
			},
			
			"sessionStorage: Boolean item should be added" : function() {
				var re = false;
				var myStorage = sessionStorage;
				var name = "boolean01";
				var data = new Boolean(true);
				myStorage.setItem(name, data);
				name = "boolean02";
				data = new Boolean(false);
				myStorage.setItem(name, data);
				name = "boolean03";
				data = new Boolean("true");
				myStorage.setItem(name, data);
				name = "boolean04";
				data = new Boolean("false");
				myStorage.setItem(name, data);
				name = "boolean05";
				data = new Boolean(null);
				myStorage.setItem(name, data);

				var data01 = myStorage.getItem("boolean01");
				var data02 = myStorage.getItem("boolean02");
				var data03 = myStorage.getItem("boolean03");
				var data04 = myStorage.getItem("boolean04");
				var data05 = myStorage.getItem("boolean05");
				myStorage.clear();
				if ((data01 == "true") && (data03 == "true") &&
					(data02 == "false") && (data04 == "true") &&
					(data05 == "false")) {
					re = true;
				}
				else {
					re = false;
				}
				Assert.isTrue(re);
			},
			
			"sessionStorage: item should be updated" : function() {
				var re = false;
				var data01;
				var name = "date";
				var myStorage = sessionStorage;
				var data = new Date();
				myStorage.setItem(name, data);
				myStorage.setItem(name, 123456789);
				myStorage.setItem(name, false);
				data02 = new Boolean();
				data02 = myStorage.getItem(name);
				//document.writeln(data02);
				if (data02 != "false") {
					re = false;
					Assert.isTrue(re);
				}
				myStorage.setItem(name, "How are u");
				myStorage.setItem(name, 0.123456789);
				data01 = myStorage.getItem(name);
				//document.writeln(data01);
				if (data01 != 0.123456789) {
					re = false;
					Assert.isTrue(re);
				}
				var myCars = new Array("Saab", "Volvo", "BMW");
				myStorage.setItem(name, myCars);
				myStorage.setItem(name, "pass");
				data01 = myStorage.getItem(name);
				//document.writeln(data01);
				myStorage.clear();
				if (data01 == "pass") {
					re = true;
				}
				else {
					re = false;
				}
				Assert.isTrue(re);
			},

			"sessionStorage: item should be able to be removed" : function() {
				var re = false;
				var name = "item01";
				var data = new Date();
				var data_bak = data;
				var my_storage = sessionStorage;
				my_storage.setItem(name, data);

				name = "item02";
				data = "value02";
				my_storage.setItem(name, data);

				name = "item03";
				data = 333.333;
				my_storage.setItem(name, data);

				name = "item04";
				data = true;
				my_storage.setItem(name, data);

				my_storage.removeItem("item04");
				if (my_storage.getItem("item04")) {
					re = false;
					Assert.isTrue(re);
				}

				my_storage.removeItem("item03");
				if (my_storage.getItem("item03")) {
					re = false;
					Assert.isTrue(re);
				}

				my_storage.removeItem("item02");
				if (my_storage.getItem("item02")) {
					re = false;
					Assert.isTrue(re);
				}

				var data01 = my_storage.getItem("item01");
				//document.writeln(data01);
				my_storage.clear();

				if (data01 == data_bak) {
					re = true;
				}
				else {
					re = false;
				}
				Assert.isTrue(re);
			},
			
			"sessionStorage: item should be able to be cleared" : function() {
				var re = false;
				var name = "item01";
				var data = new Date();
				var data_bak = data;
				var my_storage = sessionStorage;
				my_storage.setItem(name, data);

				name = "item02";
				data = "value02";
				my_storage.setItem(name, data);

				name = "item03";
				data = 333.333;
				my_storage.setItem(name, data);

				name = "item04";
				data = true;
				my_storage.setItem(name, data);

				my_storage.clear();

				//document.writeln(my_storage.getItem("item01"));
				//document.writeln(my_storage.getItem("item04"));

				if (my_storage.getItem("item04")) {
					re = false;
					Assert.isTrue(re);
				}


				if (my_storage.getItem("item03")) {
					re = false;
					Assert.isTrue(re);
				}


				if (my_storage.getItem("item02")) {
					re = false;
					Assert.isTrue(re);
				}

				if (my_storage.getItem("item01")) {
					re = false;
					Assert.isTrue(re);
				}
				re = true;
				Assert.isTrue(re);
			},
			
			"sessionStorage: getKey should work" : function(){
				var re = false;
				var name = "date";
				var data = new Date();
				var myStorage = sessionStorage;
				myStorage.setItem(name, data);

				name = "school";
				data = "York University";
				myStorage.setItem(name, data);

				var data01 = myStorage.key(0);
				var data02 = myStorage.key(1);

				myStorage.clear();
				if ((data01 == "date") && (data02 == "school")) {
					re = true;
				}
				else {
					re = false;
				}
				Assert.isTrue(re);						
			},
			
			"sessionStorage: getLength should work" : function(){
				var re = false;
				var name = "date";
				var data = new Date();
				var myStorage = sessionStorage;
				myStorage.setItem(name, data);

				name = "school";
				data = "York University";
				myStorage.setItem(name, data);

				var data01 = myStorage.length;
				
				myStorage.clear();
				if (data01 == 2){
					re = true;
				}
				else {
					re = false;
				}				
				Assert.isTrue(re);
			},
			
			"sessionStorage: sessionStorage instance should exist" : function(){
				var re = false;
				var myStorage = sessionStorage;

				if (myStorage instanceof Storage) {
					re = true;
				}
				else {
					re = false;
				}				
				Assert.isTrue(re);
			},
			
		});
/*		
		testCases[1] = new Y.Test.Case({
			name: "blackberry.app.author Test",
		
			"blackberry.app.author should exist" : function() {
				Assert.isNotUndefined(blackberry.app.author);
			},
		});
*/		
		return testCases;
	}
})();
