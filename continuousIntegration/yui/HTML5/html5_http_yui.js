(function() {               
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases["suiteName"] = "HTTP and XHR tests";

		//-------------------------------------------
		function loadXMLString(txt) {
			if (window.DOMParser) {
				parser = new DOMParser();
				xmlDoc = parser.parseFromString(txt, "text/xml");
			}
			else // Internet Explorer
			{
				xmlDoc = new ActiveXObject("Microsoft.http");
				xmlDoc.async = "false";
				xmlDoc.loadXML(txt);
			}
			return xmlDoc;
		}

		//-------------------------------------------
		function loadXMLDoc(dname) {
			if (window.XMLHttpRequest) {
				xhttp = new XMLHttpRequest();
			}
			else {
				xhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			xhttp.open("get", dname, false);
			xhttp.send(null);
			return xhttp.responseXML;
		}
		
		//---------------------------------------------------------------------
		// XML http and xhr tests
		//---------------------------------------------------------------------			

		testCases[0] = new Y.Test.Case({
			name: "HTTP and XHR tests",

			setUp : function () {
				//Setup code goes here
				
			},
			 
			tearDown : function () {
				//Teardown code goes here
				
			},
			
			"http get should pass" : function() {
				var rt = false;
				var xmlhttp;
				var url = "html5/http/testHttp.aspx";

				xmlhttp = null;
				if (window.XMLHttpRequest) {// code for IE7, Firefox, Opera, etc.
					xmlhttp = new XMLHttpRequest();
				}
				else if (window.ActiveXObject) {// code for IE6, IE5
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				if (xmlhttp != null) {
					xmlhttp.onreadystatechange = function() {

						if (xmlhttp.readyState == 4) {// 4 = "loaded"
							if (xmlhttp.status == 200) {// 200 = "OK"
								
								if (xmlhttp.responseText == "GET") {
									rt = true;
								}
								else {
									rt = false; Assert.isTrue(rt);
								}
							}
							else {
								rt = false; Assert.isTrue(rt);
							}
						}
						else {
							rt = false; Assert.isTrue(rt);
						}
					}

					xmlhttp.open("GET", url, false);
					xmlhttp.send(null);   
				}
				else {
				   rt = false; Assert.isTrue(rt);
				}   
				Assert.isTrue(rt);
			},

			"http post should pass" : function() {
				var rt = false;
				var xmlhttp;
				var url = "html5/http/testHttp.aspx";

				xmlhttp = null;
				if (window.XMLHttpRequest) {// code for IE7, Firefox, Opera, etc.
					xmlhttp = new XMLHttpRequest();
				}
				else if (window.ActiveXObject) {// code for IE6, IE5
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				if (xmlhttp != null) {
					xmlhttp.onreadystatechange = function() {

						if (xmlhttp.readyState == 4) {// 4 = "loaded"
							if (xmlhttp.status == 200) {// 200 = "OK"
								
								if (xmlhttp.responseText == "POST") {
									rt = true;
								}
								else {
									rt = false; Assert.isTrue(rt);
								}
							}
							else {
								rt = false; Assert.isTrue(rt);
							}
						}
						else {
							rt = false; Assert.isTrue(rt);
						}
					}
					xmlhttp.open("post", url, false);
					xmlhttp.send(null);   
				}
				else {
				   rt = false; Assert.isTrue(rt);
				}   
				Assert.isTrue(rt);
			},

			"http put should pass" : function() {
				var rt = false;
				var xmlhttp;
				var url = "html5/http/testHttp.aspx";

				xmlhttp = null;
				if (window.XMLHttpRequest) {// code for IE7, Firefox, Opera, etc.
					xmlhttp = new XMLHttpRequest();
				}
				else if (window.ActiveXObject) {// code for IE6, IE5
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				if (xmlhttp != null) {
					xmlhttp.onreadystatechange = function() {
						if (xmlhttp.readyState == 4) {// 4 = "loaded"
							if (xmlhttp.status == 200) {// 200 = "OK"
								if (xmlhttp.responseText == "PUT") {
									rt = true;
								}
								else {
									rt = false; Assert.isTrue(rt);
								}
							}
							else {
								rt = false; Assert.isTrue(rt);
							}
						}
						else {
							rt = false; Assert.isTrue(rt);
						}
					}
					xmlhttp.open("PUT", url, false);
					xmlhttp.send(null);   
				}
				else {
				   rt = false; Assert.isTrue(rt);
				}   
				Assert.isTrue(rt);
			},

			"http delete should pass" : function() {
				var rt = false;
				var xmlhttp;
				var url = "html5/http/testHttp.aspx";

				xmlhttp = null;
				if (window.XMLHttpRequest) {// code for IE7, Firefox, Opera, etc.
					xmlhttp = new XMLHttpRequest();
				}
				else if (window.ActiveXObject) {// code for IE6, IE5
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				if (xmlhttp != null) {
					xmlhttp.onreadystatechange = function() {

						if (xmlhttp.readyState == 4) {// 4 = "loaded"
							if (xmlhttp.status == 200) {// 200 = "OK"
								
								if (xmlhttp.responseText == "DELETE") {
									rt = true;
								}
								else {
									//alert("The responseText for delete is:"+xmlhttp.responseText);
									rt = false; Assert.isTrue(rt);
								}
							}
							else {
								//alert(xmlhttp.responseText+"222");
								rt = false; Assert.isTrue(rt);
							}
						}
						else {
							//alert(xmlhttp.responseText+"333-delete");
							rt = false; Assert.isTrue(rt);
						}
					}
					xmlhttp.open("delete", url, false);
					xmlhttp.send(null);   
				}
				else {
					//alert(xmlhttp.responseText+" is null");
				   rt = false; Assert.isTrue(rt);
				}   
				Assert.isTrue(rt);
			},

			"http options should pass" : function() {
				var rt = false;
				var xmlhttp;
				var url = "html5/http/testHttp.aspx";

				xmlhttp = null;
				if (window.XMLHttpRequest) {// code for IE7, Firefox, Opera, etc.
					xmlhttp = new XMLHttpRequest();
				}
				else if (window.ActiveXObject) {// code for IE6, IE5
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				if (xmlhttp != null) {
					xmlhttp.onreadystatechange = function() {

						if (xmlhttp.readyState == 4) {// 4 = "loaded"
							if (xmlhttp.status == 200) {// 200 = "OK"
								
								if (xmlhttp.responseText == "OPTIONS") {
									rt = true;
								}
								else {
									//alert("The responseText for options is:"+xmlhttp.responseText);
									rt = false; Assert.isTrue(rt);
								}
							}
							else {
								rt = false; Assert.isTrue(rt);
							}
						}
						else {
							//alert(xmlhttp.responseText+"333-options");
							rt = false; Assert.isTrue(rt);
						}
					}
					xmlhttp.open("options", url, false);
					xmlhttp.send(null);   
				}
				else {
				   rt = false; Assert.isTrue(rt);
				}   
				Assert.isTrue(rt);
			},

			"http head should pass" : function() {
				var rt = false;
				var xmlhttp;
				var url = "html5/http/testHttp.aspx";

				xmlhttp = null;
				if (window.XMLHttpRequest) {// code for IE7, Firefox, Opera, etc.
					xmlhttp = new XMLHttpRequest();
				}
				else if (window.ActiveXObject) {// code for IE6, IE5
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				if (xmlhttp != null) {
					xmlhttp.onreadystatechange = function() {

						if (xmlhttp.readyState == 4) {// 4 = "loaded"
							if (xmlhttp.status == 200) {// 200 = "OK"
								var s = xmlhttp.getAllResponseHeaders();
								var s1 = xmlhttp.responseText;
								if ((s.search("text/html")>0) && (s.search("ASP.NET")>0) && (s1 == "")) {
									rt = true;
								}
								else {
									rt = false; Assert.isTrue(rt);
								}
							}
							else {
								rt = false; Assert.isTrue(rt);
							}
						}
						else {
							rt = false; Assert.isTrue(rt);
						}
					}
					xmlhttp.open("head", url, false);
					xmlhttp.send(null);   
				}
				else {
				   rt = false; Assert.isTrue(rt);
				}   
				Assert.isTrue(rt);
			},

			"should be able to be access large response text by http get" : function(){
				var rt = false;
				var xmlhttp;
				var url = "html5/http/testHttpResponse.aspx";

				xmlhttp = null;
				if (window.XMLHttpRequest) {// code for IE7, Firefox, Opera, etc.
					xmlhttp = new XMLHttpRequest();
				}
				else if (window.ActiveXObject) {// code for IE6, IE5
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				if (xmlhttp != null) {
					xmlhttp.onreadystatechange = function() {

						if (xmlhttp.readyState == 4) {// 4 = "loaded"
							if (xmlhttp.status == 200) {// 200 = "OK"
								var s1 = xmlhttp.responseText;
								var s = loadXMLString(s1);
								var len = s.getElementsByTagName("test").length;
								if(len == 1638){
									rt = true;
								}
								else{
									rt = false; Assert.isTrue(rt);
								}
							}
							else {
								rt = false; Assert.isTrue(rt);
							}
						}
						else {
							rt = false; Assert.isTrue(rt);
						}
					}
					xmlhttp.open("get", url, false);
					xmlhttp.send(null);   
				}
				else {
				   rt = false; Assert.isTrue(rt);
				}   
				Assert.isTrue(rt);
			},

			"should be able to be access large response text by http post" : function(){
				var rt = false;
				var xmlhttp;
				var url = "html5/http/testHttpResponse.aspx";

				xmlhttp = null;
				if (window.XMLHttpRequest) {// code for IE7, Firefox, Opera, etc.
					xmlhttp = new XMLHttpRequest();
				}
				else if (window.ActiveXObject) {// code for IE6, IE5
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				if (xmlhttp != null) {
					xmlhttp.onreadystatechange = function() {

						if (xmlhttp.readyState == 4) {// 4 = "loaded"
							if (xmlhttp.status == 200) {// 200 = "OK"
								var s1 = xmlhttp.responseText;
								var s = loadXMLString(s1);
								var len = s.getElementsByTagName("test").length;
								if(len == 1638){
									rt = true;
								}
								else{
									rt = false; Assert.isTrue(rt);
								}
							}
							else {
								rt = false; Assert.isTrue(rt);
							}
						}
						else {
							rt = false; Assert.isTrue(rt);
						}
					}
					xmlhttp.open("post", url, false);
					xmlhttp.send(null);   
				}
				else {
				   rt = false; Assert.isTrue(rt);
				}   
				Assert.isTrue(rt);
			},

			"should be able to access xml file by XHR" : function(){
				var rt = false;
				var xmlhttp = loadXMLDoc("html5/http/books.xml");
				var len = xmlhttp.getElementsByTagName("book").length;
				if(len == 4){
					rt = true;
				}
				else{
					rt = false; Assert.isTrue(rt);
				}
				Assert.isTrue(rt);
			},

			"should be able to set request header by XHR" : function(){
				var rt = false;
				var xmlhttp;
				var url = "html5/http/send_post.aspx";

				xmlhttp = null;
				if (window.XMLHttpRequest) {// code for IE7, Firefox, Opera, etc.
					xmlhttp = new XMLHttpRequest();
				}
				else if (window.ActiveXObject) {// code for IE6, IE5
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				if (xmlhttp != null) {
					xmlhttp.onreadystatechange = function() {

						if (xmlhttp.readyState == 4) {// 4 = "loaded"
							if (xmlhttp.status == 200) {// 200 = "OK"
								var s1 = xmlhttp.responseText;
								if(s1 == "HenryFord"){
									rt = true;
								}
								else{
									rt = false; Assert.isTrue(rt);
								}
							}
							else {
								rt = false; Assert.isTrue(rt);
							}
						}
						else {
							rt = false; Assert.isTrue(rt);
						}
					}
					xmlhttp.open("POST", url, false);
					xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					xmlhttp.send("fname=Henry&lname=Ford"); 
				}
				else {
				   rt = false; Assert.isTrue(rt);
				}   
				Assert.isTrue(rt);
			},

			"should be able to send text by url" : function(){
				var rt = false;
				var xmlhttp;
				var url = "html5/http/send_get.aspx?fname=Henry&lname=Ford";

				xmlhttp = null;
				if (window.XMLHttpRequest) {// code for IE7, Firefox, Opera, etc.
					xmlhttp = new XMLHttpRequest();
				}
				else if (window.ActiveXObject) {// code for IE6, IE5
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				if (xmlhttp != null) {
					xmlhttp.onreadystatechange = function() {

						if (xmlhttp.readyState == 4) {// 4 = "loaded"
							if (xmlhttp.status == 200) {// 200 = "OK"
								var s1 = xmlhttp.responseText;
								if(s1 == "HenryFord"){
									rt = true;
								}
								else{
									rt = false; Assert.isTrue(rt);
								}
							}
							else {
								rt = false; Assert.isTrue(rt);
							}
						}
						else {
							rt = false; Assert.isTrue(rt);
						}
					}
					xmlhttp.open("get", url, false);
					xmlhttp.send(null); 
				}
				else {
				   rt = false; Assert.isTrue(rt);
				}   
				Assert.isTrue(rt);
			},
			
		});

		return testCases;
	}
})();
