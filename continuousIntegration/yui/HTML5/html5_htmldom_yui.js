(function() {               

	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases["suiteName"] = "html5 DOM tests";

		//-------------------------------------------
		//      help functions:
		//-------------------------------------------
		function get_lastChild(n) {
			y = n.lastChild;
			while (y.nodeType != 1) {
				y = y.previousSibling;
			}
			return y;
		}

		//-------------------------------------------
		//check if the first node is an element node
		function get_firstChild(n) {
			y = n.firstChild;
			while (y.nodeType != 1) {
				y = y.nextSibling;
			}
			return y;
		}

		//-------------------------------------------
		function get_nextSibling(n) {
			y = n.nextSibling;
			while (y.nodeType != 1) {
				y = y.nextSibling;
			}
			return y;
		}
		//-------------------------------------------
		function get_previousSibling(n) {
			y = n.previousSibling;
			while (y.nodeType != 1) {
				y = y.previousSibling;
			}
			return y;
		}
		//-------------------------------------------
		function loadXMLString(txt) {
			if (window.DOMParser) {
				parser = new DOMParser();
				xmlDoc = parser.parseFromString(txt, "text/xml");
			}
			else // Internet Explorer
			{
				xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
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
			xhttp.open("GET", dname, false);
			xhttp.send("");
			return xhttp.responseXML;
		}

		//-------------------------------------------
		function my_delay(millis) {
			var date = new Date();
			var curDate = null;
			//alert(millis);
			do { curDate = new Date(); }
			while (curDate - date < millis);
		}
		
		var rtt = false;
		function dom_click_me() {
		    //alert("yes");
			rtt = true;
		}
				

//-----------------------------------------------
//          HTML DOM tests
//-----------------------------------------------		
		
		testCases[1] = new Y.Test.Case({
			name: "HTML DOM tests",
			
			"document anchors len property should be supported by html dom" : function() //must set name to anchors.
			{
				var rt = false;
				var e1 = document.createElement("a");
				var e2 = document.createElement("a");
				var e3 = document.createElement("a");
				e1.setAttribute("name", "html");
				e2.setAttribute("name", "css");
				e3.setAttribute("name", "xml");
				e1.innerHTML = "HTML Tutorial";
				e2.innerHTML = "CSS Tutorial";
				e3.innerHTML = "XML Tutorial";
				document.body.appendChild(e1);
				document.body.appendChild(e2);
				document.body.appendChild(e3);
				var len = document.anchors.length;
				document.body.removeChild(e1);
				document.body.removeChild(e2);
				document.body.removeChild(e3);
				if (len == 3) {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"document anchors innerHTML should be supported by html dom" : function() {
				var rt = false;
				var e1 = document.createElement("a");
				var e2 = document.createElement("a");
				var e3 = document.createElement("a");
				e1.setAttribute("name", "html");
				e2.setAttribute("name", "css");
				e3.setAttribute("name", "xml");
				e1.innerHTML = "HTML Tutorial";
				e2.innerHTML = "CSS Tutorial";
				e3.innerHTML = "XML Tutorial";
				document.body.appendChild(e1);
				document.body.appendChild(e2);
				document.body.appendChild(e3);
				var h1 = document.anchors[0].innerHTML;
				var h2 = document.anchors[1].innerHTML;
				var h3 = document.anchors[2].innerHTML;
				document.body.removeChild(e1);
				document.body.removeChild(e2);
				document.body.removeChild(e3);
				if ((h1 == "HTML Tutorial") &&
					(h2 == "CSS Tutorial") &&
					(h3 == "XML Tutorial")) {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"document forms length should be supported by html dom" : function() {
				var rt = false;
				var e1 = document.createElement('form');
				var e2 = document.createElement('form');
				var e3 = document.createElement('form');
				e1.setAttribute("name", "Form01");
				e2.setAttribute("name", "Form02");
				document.body.appendChild(e1);
				document.body.appendChild(e2);
				document.body.appendChild(e3);
				var len = document.forms.length;
				document.body.removeChild(e1);
				document.body.removeChild(e2);
				document.body.removeChild(e3);
				if (len == 3) {
					rt = true;
				}  
				Assert.isTrue(rt);
			},

			"document forms name should be supported by html dom" : function() {
				var rt = false;
				var e1 = document.createElement('form');
				var e2 = document.createElement('form');
				var e3 = document.createElement('form');
				e1.setAttribute("name", "Form01");
				e2.setAttribute("name", "Form02");
				document.body.appendChild(e1);
				document.body.appendChild(e2);
				document.body.appendChild(e3);
				var n1 = document.forms[0].name;
				var n2 = document.forms[1].name;
				var n3 = document.forms[2].name;
				document.body.removeChild(e1);
				document.body.removeChild(e2);
				document.body.removeChild(e3);
				if ((n1 == "Form01") && 
					(n2 == "Form02") &&
					(n3 == "")) {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"document images length should be supported by html dom" : function() {
				var rt = false;
				var v1 = document.createElement('div');
				var v2 = document.createElement('div');
				document.body.appendChild(v1);
				document.body.appendChild(v2);
				v1.innerHTML = '<img border="0" src="html5/dom/klematis.jpg" width="150" height="113" />';
				v2.innerHTML = '<img border="0" src="html5/dom/klematis2.jpg" width="152" height="128" />';
				if (document.images.length == 2) {
					rt = true;
				}
				document.body.removeChild(v1);
				document.body.removeChild(v2);
				Assert.isTrue(rt);
			},

			"document images id should be supported by html dom" : function() {
				var rt = false;
				var v1 = document.createElement('div');
				var v2 = document.createElement('div');
				document.body.appendChild(v1);
				document.body.appendChild(v2);
				v1.innerHTML = '<img id="klematis lilac" border="0" src="html5/dom/klematis.jpg" width="150" height="113" />';
				v2.innerHTML = '<img id="klematis pink" border="0" src="html5/dom/klematis2.jpg" width="152" height="128" />';
				if ((document.images[0].id == "klematis lilac") &&
					(document.images[1].id == "klematis pink")) {
					rt = true;
				}
				document.body.removeChild(v1);
				document.body.removeChild(v2);
				Assert.isTrue(rt);
			},

			"document links length property should be supported by html dom" : function() {
				var rt = false;
				var v1 = document.createElement('div');
				var v2 = document.createElement('div');
				document.body.appendChild(v1);
				document.body.appendChild(v2);
				v1.innerHTML = '<img src ="planets.gif" width="145" height="126" alt="Planets" usemap ="#planetmap" />' +
				'<map name="planetmap">' +
				'<area id="sun" shape="rect" coords="0,0,82,126" href="sun.htm" alt="Sun" />' +
				'<area id="mercury" shape="circle" coords="90,58,3" href="mercur.htm" alt="Mercury" />' +
				'<area id="venus" shape="circle" coords="124,58,8" href="venus.htm" alt="Venus" />' +
				'</map><p><a id="javascript" href="/js/">JavaScript Tutorial</a></p>';
				var len = document.links.length;
				document.body.removeChild(v1);
				document.body.removeChild(v2); 
				if (len > 4) {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"document links id should be supported by html dom" : function() {
				var rt = false;
				var v1 = document.createElement('div');
				var v2 = document.createElement('div');
				document.body.appendChild(v1);
				document.body.appendChild(v2);
				v1.innerHTML = '<img src ="planets.gif" width="145" height="126" alt="Planets" usemap ="#planetmap" />' +
				'<map name="planetmap">' +
				'<area id="sun" shape="rect" coords="0,0,82,126" href="sun.htm" alt="Sun" />' +
				'<area id="mercury" shape="circle" coords="90,58,3" href="mercur.htm" alt="Mercury" />' +
				'<area id="venus" shape="circle" coords="124,58,8" href="venus.htm" alt="Venus" />' +
				'</map><p><a id="javascript" href="/js/">JavaScript Tutorial</a></p>';
				var len = document.links.length;
				var id01 = document.links[len-4].id;
				var id02 = document.links[len-1].id;
				document.body.removeChild(v1);
				document.body.removeChild(v2);
				if ((id01 == "sun") && (id02 == "javascript")) {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"document cookie should be supported by html dom" : function() {
				var rt = false;
				document.cookie = "xibeigongyedaxue=my home";
				if (document.cookie.search("my home") == 17) {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"document domain property should be supported by html dom" : function() { //only works in atg05-yyz.rim.net
				var rt = false;
				var dm = String(document.domain);
				
				if ((dm.search("yoyu-xp") >= 0) || (dm.search("atg05-yyz") >= 0) || (dm.search("10.135.219.21") >= 0)) {
					rt = true;
				}
				else {
					rt  = false;  Assert.isTrue(rt);
				}   
				Assert.isTrue(rt);
			},

			"document readyState should be supported by html dom" : function() {   
				var rt = false;
				var rs = document.readyState;
				if (rs == "complete" || rs == "loaded" || rs == "loading") {
					rt = true;
				}
				else {
					rt  = false;  Assert.isTrue(rt);
				}
				Assert.isTrue(rt);
			},

			"document title property should be supported by html dom" : function() {
				var rt = false;
				var tt = document.title;   
				if ((tt == "htmlDom Manual Test Suite") || (tt == "HTML5 Unit Test")) {
					rt = true;
				}
				var e01 = document.getElementsByTagName("title")[0].childNodes[0].nodeValue;
				if (tt == e01) {
					rt = true;
				}
				Assert.isTrue(rt);
			},

			"document url should be supported by html dom" : function() {
				var rt = false;
				var url = document.URL;
				var url01 = "yoyu-xp";
				var url02 = "atg05-yyz";
				var url03 = "YUI_UnitTest";
				
				if ((url.search(url01) >= 0) || (url.search(url02) >= 0) || url.search(url03) >= 0) {
					rt = true;
				} else {
					rt = false;
				}  
				Assert.isTrue(rt);
			},

			"document getElementById should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				newDiv.setAttribute("id", "div1");
				newDiv.setAttribute("class","div01");
				var newForm = document.createElement("form");
				newForm.setAttribute("id", "form1");
				newForm.setAttribute("class","form01");
				var newButton = document.createElement("button");
				newButton.setAttribute("id", "button1");
				newButton.innerHTML = "Submit!";

				var b1 = document.getElementsByTagName("body")[0];
				b1.appendChild(newDiv);
				newDiv.appendChild(newForm);
				newForm.appendChild(newButton);

				div001 = document.getElementById("div1");
				if (div001.getAttribute('class') == "div01") {
					rt = true;
				}
				else {
					rt  = false;  Assert.isTrue(rt);
				}

				form001 = document.getElementById("form1");
				if (form001.getAttribute('class') == "form01") {
					rt = true;
				}
				else {
					rt  = false;  Assert.isTrue(rt);
				}
				button001 = document.getElementById("button1");
				if (button001.innerHTML == "Submit!") {
					rt = true;
				}
				else {
					rt  = false;  Assert.isTrue(rt);
				}
				b1.removeChild(div001);
				Assert.isTrue(rt);
			},

			"document getElementsByName should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement('div');
				var b1 = document.getElementsByTagName('body')[0];
				b1.appendChild(newDiv);
				var newForm = document.createElement('form');
				newForm.setAttribute("id", "form_id1");
				newForm.setAttribute("name", "name1");
				newDiv.appendChild(newForm);
				var newButton = document.createElement("button");
				newButton.setAttribute("id", "button_id1");
				newButton.setAttribute("name", "name1");
				newButton.innerHTML = "Submit!";
				newForm.appendChild(newButton);
				var newInputText = document.createElement('input');
				newInputText.setAttribute("id", "input_id1");
				newInputText.setAttribute("type","text");
				newInputText.setAttribute("name", "name1");
				var newInputText2 = document.createElement('input');
				newInputText2.setAttribute("id", "input_id2");
				newInputText2.setAttribute("type", "file");
				newInputText2.setAttribute("name", "name2");
				newForm.appendChild(newInputText);
				newForm.appendChild(newInputText2);

				var e01 = document.getElementsByName("name1");
				if (e01.length == 3) {
					rt = true;
				}
				else {
					rt  = false;  Assert.isTrue(rt);
				}

				if (e01.item(0).id != "form_id1") {
					rt  = false;  Assert.isTrue(rt);
				}
				var e02 = document.getElementsByName("name2");
				if (e02.length == 1) {
					rt = true;
				}
				else {
					rt  = false;  Assert.isTrue(rt);
				}

				if (e02.item(0).id != "input_id2") {
					rt  = false;  Assert.isTrue(rt);
				}    
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"element className should be supported by html dom" : function() {
				var rt = false;
				var b01 = document.body;
				b01.setAttribute("class", "b01");
				var newDiv = document.createElement('div');
				newDiv.setAttribute("class", "div01");
				newDiv.setAttribute("id", "div_id01");
				b01.appendChild(newDiv);
				var newInputText = document.createElement('input');
				newInputText.setAttribute("id", "input_id1");
				newInputText.setAttribute("type", "file");
				newInputText.setAttribute("class", "input01");
				newDiv.appendChild(newInputText);

				var b_01 = document.getElementsByTagName('body')[0];
				if (b_01.className == "b01") {
					rt = true;
				}
				else {
					rt  = false;  Assert.isTrue(rt);
				}

				var div_01a = document.getElementById('div_id01');
				if (div_01a.className != "div01") {
					rt  = false;  Assert.isTrue(rt);
				}

				var input_01 = document.getElementById("input_id1");
				if (input_01.className != "input01") {
					rt  = false;  Assert.isTrue(rt);
				}
				b_01.removeChild(div_01a);
				Assert.isTrue(rt);
			},

			"element dir set and get should be supported by html dom" : function() {
				var rt = false;

				var div1 = document.createElement("div");
				var div2 = document.createElement("div");
				div1.setAttribute("id", "id1");
				div2.setAttribute("id", "id2");

				var b1 = document.body;
				b1.appendChild(div1);
				b1.appendChild(div2);

				div1.innerHTML = '<form id="id11">'+
				'<label id="id1a">left to right!!!???$$$</label><br />'+
				'<button id="id1b">right to left!!!???$$$</button>'+
				'</form>';

				div2.innerHTML = '<div id="id22">' +
				'<input type="text" id="id2a"/ value="left to right!!!???$$$"><br />' +
				'<input type="text" id="id2b" value="right to left!!!???$$$" />' +
				'</div>';

				b1.dir = "rtl";
				div1.dir = "ltr";
				div2.dir = "ltr";
				var form11 = document.getElementById("id11");
				var div22 = document.getElementById("id22");
				var e01a = document.getElementById("id1a");
				var e01b = document.getElementById("id1b");
				var e02a = document.getElementById("id2a");
				var e02b = document.getElementById("id2b");
				form11.dir = "rtl";
				div22.dir = "rtl";
				e01a.dir = "ltr";
				e02a.dir = "ltr";

				if (b1.dir == "rtl") {
					rt = true;
				}
				else {
					rt  = false;  Assert.isTrue(rt);
				}

				if (div1.dir != "ltr") {rt  = false;  Assert.isTrue(rt);}
				if (div2.dir != "ltr") {rt  = false;  Assert.isTrue(rt);}
				if (form11.dir != "rtl") {rt  = false;  Assert.isTrue(rt);}
				if (div22.dir != "rtl") {rt  = false;  Assert.isTrue(rt);}
				if (e01a.dir != "ltr") {rt  = false;  Assert.isTrue(rt);}    
				if (e01b.dir != "") {rt  = false;  Assert.isTrue(rt);} 
				if (e02a.dir != "ltr") {rt  = false;  Assert.isTrue(rt);}
				if (e02b.dir != "") {rt  = false;  Assert.isTrue(rt);}

				b1.dir = "ltr";
				b1.removeChild(div1);
				b1.removeChild(div2);
				
				Assert.isTrue(rt);
			},

			"element disabled should be supported by html dom" : function() {
				var rt = false;
				var newButton = document.createElement('button');
				newButton.setAttribute('id', 'myButton');
				newButton.innerHTML = "this is a button!";
				var b1 = document.getElementsByTagName('body')[0];
				b1.appendChild(newButton);
				var e01 = document.getElementById("myButton").disabled;
				if (e01 == false) {
					rt = true;
				}
				else {
					rt  = false;  Assert.isTrue(rt);
				}
				document.getElementById("myButton").disabled = true;
				e01 = document.getElementById("myButton").disabled;
				if (e01 != true) {rt  = false;  Assert.isTrue(rt);}
				b1.removeChild(newButton);
				Assert.isTrue(rt);
			},

			"element id should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement();
				var b1 = document.getElementsByTagName('body')[0];
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<p><a id="myAnchor" href="http://www.w3schools.com">Visit W3Schools.com</a></p>';
				var myAnchor = document.getElementById('myAnchor');
				if (myAnchor.innerHTML == "Visit W3Schools.com") {
					rt = true;
				}
				else {
					rt  = false;  Assert.isTrue(rt);
				}
				myAnchor.id = "id1";
				var myAn = document.getElementById('id1');
				if (myAn.innerHTML != "Visit W3Schools.com") {rt  = false;  Assert.isTrue(rt);}
				if (myAnchor.id != "id1") {rt  = false;  Assert.isTrue(rt);}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"element innerHTML should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement();
				var b1 = document.getElementsByTagName('body')[0];
				b1.appendChild(newDiv);
				var str1 = '<form><p><a id="myAnchor" href="http://www.w3schools.com">Visit W3Schools.com</a></p>';
				var str2 = '<button id="myButton" type="submit">Submit!</button></form>';
				newDiv.innerHTML = str1 + str2;
				var an01 = document.getElementById("myAnchor");
				var btn01 = document.getElementById("myButton");
				btn01.innerHTML = "This a submit button!";
				an01.innerHTML = "go to w3schools!"

				an01 = document.getElementById("myAnchor");
				btn01 = document.getElementById("myButton");

				if (an01.innerHTML == "go to w3schools!") {
					rt = true;
				}
				else {
					rt  = false;  Assert.isTrue(rt);
				}
				if (btn01.innerHTML != "This a submit button!") {
					rt  = false;  Assert.isTrue(rt);
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"element lang should be supported by html dom" : function() {
				var rt = false;
				var b1 = document.body;
				b1.lang = "en-us";
				if (document.getElementsByTagName("body")[0].lang == "en-us") {
					rt = true;
				}
				Assert.isTrue(rt);
			},

			"element tabIndex should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement('div');
				var b1 = document.getElementsByTagName('body')[0];
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<button type="button" id="idx1">Button01</button><br />' +
					'<button type="button" id="idx2">Button02</button><br />' +
					'<button type="button" id="idx3">Button03</button><br />';
				
				document.getElementById('idx1').tabIndex = "13";
				document.getElementById('idx2').tabIndex = "12";
				document.getElementById('idx3').tabIndex = "11";

				var e01 = document.getElementById('idx1').tabIndex;
				var e02 = document.getElementById('idx2').tabIndex;
				var e03 = document.getElementById('idx3').tabIndex;

				if ((e01 == 13) && (e02 == 12) && (e03 == 11)) {
					rt = true;
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"element tagName should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement('div');
				var b1 = document.getElementsByTagName('body')[0];
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<button type="button" id="idx1">Button01</button><br />' +
					'<button type="button" id="idx2">Button02</button><br />' +
					'<button type="button" id="idx3">Button03</button><br />';
				var e01 = document.getElementById('idx1');
				var e02 = document.getElementById('idx2');
				var e03 = document.getElementById('idx3');
				if ((b1.tagName == "BODY") && (e01.tagName == "BUTTON")) {
					rt = true;
				}
				b1.removeChild(newDiv); 
				Assert.isTrue(rt);
			},

			"element title should be supported by html dom" : function() {
				var rt = false;

				var newDiv = document.createElement('div');
				var b1 = document.getElementsByTagName('body')[0];
				b1.title = "tt1";
				newDiv.title = "tt2";
				newDiv.id = "div1";
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<button type="button" id="idx1">Button01</button><br />' +
					'<button type="button" id="idx2">Button02</button><br />' +
					'<button type="button" id="idx3">Button03</button><br />';
				var e01 = document.getElementById('idx1');
				var e02 = document.getElementById('idx2');
				var e03 = document.getElementById('idx3'); 
				e01.title = "tt3";
				e02.title = "tt4";
				e03.title = "tt5";
				
				var t01 = document.body;
				var t02 = document.getElementById("div1");
				var t03 = document.getElementById("idx1");
				var t04 = document.getElementById('idx2');
				var t05 = document.getElementById('idx3');

				if ((t01.title == "tt1") &&
				   (t02.title == "tt2") &&
				   (t03.title == "tt3") &&
				   (t04.title == "tt4") &&
				   (t05.title == "tt5")) {
					rt = true;
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},
/*
			"element click should be supported by html dom" : function() {
				rtt = false;
				var newButton = document.createElement('button');
				newButton.setAttribute("type", "button");
				newButton.innerHTML= "Click on me!";
				newButton.id = "button123";
				newButton.setAttribute("onclick",'dom_click_me()');
				var b1 = document.body;
				b1.appendChild(newButton);
				
				newButton.click();
				b1.removeChild(newButton); 
				Assert.isTrue(rtt);
			},
*/

			"anchor charset should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<a id="w3s" charset="ISO-8859-1" href="http://www.w3schools.com/">W3Schools</a><br />';
				var e01 = document.getElementById("w3s");
				if (e01.charset == "ISO-8859-1") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.charset = "utf-8";
				var e01 = document.getElementById("w3s");
				if (e01.charset == "utf-8") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}    
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"anchor href should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<a id="w3s" charset="ISO-8859-1" href="http://www.w3schools.com/">W3Schools</a><br />';
				var e01 = document.getElementById("w3s");
				if (e01.href == "http://www.w3schools.com/") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.href = "http://www.rim.com/";
				var e01 = document.getElementById("w3s");
				if (e01.href == "http://www.rim.com/") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"anchor hreflang should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<a id="w3s" hreflang="us-en" charset="ISO-8859-1" href="http://www.w3schools.com/">W3Schools</a><br />';
				var e01 = document.getElementById("w3s");
				if (e01.hreflang == "us-en") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.hreflang = "no";
				var e01 = document.getElementById("w3s");
				if (e01.hreflang == "no") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"anchor name should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<a id="w3s" name="w3schools" hreflang="us-en" charset="ISO-8859-1" href="http://www.w3schools.com/">W3Schools</a><br />';
				var e01 = document.getElementById("w3s");
				if (e01.name == "w3schools") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.name = "w3";
				var e01 = document.getElementById("w3s");
				if (e01.name == "w3") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"anchor rel and rev should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<a id="w3s" name="w3schools" hreflang="us-en" charset="ISO-8859-1" href="http://www.w3schools.com/" rel="alternate" rev="friend">W3Schools</a><br />';
				var e01 = document.getElementById("w3s");
				if ((e01.rel == "alternate") && (e01.rev == "friend")) {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.rel = "stylesheet";
				e01.rev = "tag";
				var e01 = document.getElementById("w3s");
				if ((e01.rel == "stylesheet") && (e01.rev == "tag")) {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.rel = "start";
				e01.rev = "licence";
				var e01 = document.getElementById("w3s");
				if ((e01.rel == "start") && (e01.rev == "licence")) {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.rel = "next";
				e01.rev = "nofollow";
				var e01 = document.getElementById("w3s");
				if ((e01.rel == "next") && (e01.rev == "nofollow")) {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.rel = "prev";
				e01.rev = "bookmark";
				var e01 = document.getElementById("w3s");
				if ((e01.rel == "prev") && (e01.rev == "bookmark")) {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"anchor target should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<a id="w3s" name="w3schools" hreflang="us-en" charset="ISO-8859-1" href="http://www.w3schools.com/" target="_blank">W3Schools</a><br />';
				var e01 = document.getElementById("w3s");
				if (e01.target == "_blank") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.target = "_self";
				var e01 = document.getElementById("w3s");
				if (e01.target == "_self") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.target = "_parent";
				var e01 = document.getElementById("w3s");
				if (e01.target == "_parent") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.target = "_top";
				var e01 = document.getElementById("w3s");
				if (e01.target == "_top") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}    
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"anchor type should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<a id="w3s" name="w3schools" hreflang="us-en" charset="ISO-8859-1" href="http://www.w3schools.com/" type="text/html">W3Schools</a><br />';
				var e01 = document.getElementById("w3s");
				if (e01.type == "text/html") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.type = "text/javascript";
				var e01 = document.getElementById("w3s");
				if (e01.type == "text/javascript") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"area alt should be supported by html dom" : function html_dom_area_alt() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<map name="planetmap"><area id="venus" shape="circle" coords="124,58,8" alt="The planet Venus" href="venus.htm" /></map>';
				var e01 = document.getElementById("venus");
				if (e01.alt == "The planet Venus") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.alt = "hello world!";
				var e01 = document.getElementById("venus");
				if (e01.alt == "hello world!") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"area coords should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<map name="planetmap"><area id="venus" shape="circle" coords="124,58,8" alt="The planet Venus" href="venus.htm" /></map>';
				var e01 = document.getElementById("venus");
				if (e01.coords == "124,58,8") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.coords = "155,55,555,55,555,55,555,55,555,55,555,155,55,555,55,555,55,555,55,555,55,555";
				var e01 = document.getElementById("venus");
				if (e01.coords == "155,55,555,55,555,55,555,55,555,55,555,155,55,555,55,555,55,555,55,555,55,555") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"area hash should be supported by html dom" : function() {  //The hash property sets or returns the anchor part of the href attribute value.
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<map name="planetmap"><area id="venus" shape="circle" coords="124,58,8" alt="The planet Venus" href="venus.htm#description" /></map>';
				var e01 = document.getElementById("venus");
				if (e01.hash == "#description") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.href = 'venus.htm#haha';
				var e01 = document.getElementById("venus");  
				if (e01.hash == "#haha") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"area host should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<map name="planetmap"><area id="venus" shape="circle" coords="124,58,8" alt="The planet Venus" href="venus.htm" /></map>';
				var e01 = document.getElementById("venus");
				var str_host = new String(e01.host);
				if ((str_host.search("yoyu-xp") >= 0) || (str_host.search("atg05-yyz") >= 0) || (str_host.search("10.135.219.21") >= 0)) {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"area hostname should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<map name="planetmap"><area id="venus" shape="circle" coords="124,58,8" alt="The planet Venus" href="http://atg05-yyz.rim.net/html5/html_dom/venus.htm" /></map>';
				var e01 = document.getElementById("venus");
				var str_hostname = new String(e01.hostname);
				if (str_hostname == "atg05-yyz.rim.net") {
					rt = true;
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"area pathname should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<map name="planetmap"><area id="venus" shape="circle" coords="124,58,8" alt="The planet Venus" href="http://atg05-yyz.rim.net/html5/html_dom/venus.htm" /></map>';
				var e01 = document.getElementById("venus");
				//alert(e01.pathname);
				if (e01.pathname == "/html5/html_dom/venus.htm") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.href = "index.htm";
				str01 = new String(e01.pathname);
				
				if (str01.search("index.htm") > 4){
					rt = true;
				}
				else{
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"area protocol should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<map name="planetmap"><area id="venus" shape="circle" coords="124,58,8" alt="The planet Venus" href="ftp://atg05-yyz.rim.net/html5/html_dom/venus.htm" /></map>';
				var e01 = document.getElementById("venus");
				var str_p = new String(e01.protocol);
				if (str_p == "ftp:") {
					rt = true;
				}
				e01.protocol = "http:";
				var e01 = document.getElementById("venus");
				if (e01.protocol != "ftp:") {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.href = "index.htm";
				var e01 = document.getElementById("venus");
				if (e01.protocol != "http:") {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}        
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"area search should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<map name="planetmap"><area id="venus" shape="circle" coords="124,58,8" alt="The planet Venus" href="index.htm?id=venus" /></map>';
				var e01 = document.getElementById("venus");
				var str_hostname = new String(e01.search);
				if (str_hostname == "?id=venus") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.href = "http://www.w3schools.com/jsref/venus.htm?id=hello";
				var e01 = document.getElementById("venus");
				var str_hostname = new String(e01.search);
				if (str_hostname == "?id=hello") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}    
				b1.removeChild(newDiv);    
				Assert.isTrue(rt);
			},

			"area shape should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<map name="planetmap"><area id="venus" shape="circle" coords="124,58,8" alt="The planet Venus" href="http://atg05-yyz.rim.net/html5/html_dom/venus.htm" /></map>';
				var e01 = document.getElementById("venus");
				var str_s = new String(e01.shape);
				if (str_s == "circle") {
					rt = true;
				}
				else {
					rt  = false;  Assert.isTrue(rt);
				}
				e01.shape = "line";
				var e01 = document.getElementById("venus");
				if (e01.shape != "line") {
					rt  = false;  Assert.isTrue(rt);
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"area target should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<map name="planetmap"><area id="venus" shape="circle" coords="124,58,8" alt="The planet Venus" href="http://atg05-yyz.rim.net/html5/html_dom/venus.htm" target="_blank" /></map>';
				var e01 = document.getElementById("venus");
				if (e01.target == "_blank") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.target = "_self";
				var e01 = document.getElementById("venus");
				if (e01.target == "_self") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.target = "_parent";
				var e01 = document.getElementById("venus");
				if (e01.target == "_parent") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.target = "_top";
				var e01 = document.getElementById("venus");
				if (e01.target == "_top") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}    
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"base href should be supported by html dom" : function() {
				var rt = false;
				var hd = document.getElementsByTagName('head')[0];
				var base = document.createElement("base");
				base.setAttribute("id", "base_id01");
				base.setAttribute("href", "http://www.w3schools.com/jsref/");
				base.setAttribute("target","_blank");
				hd.appendChild(base);
				var e01 = document.getElementById("base_id01");
				if (e01.href == "http://www.w3schools.com/jsref/") {
					rt = true;
				}
				else {
					hd.removeChild(base);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.href = "http://atg05-yyz.rim.net/html5/html_dom/";
				var e01 = document.getElementById("base_id01");
				if (e01.href == "http://atg05-yyz.rim.net/html5/html_dom/") {
					rt = true;
				}
				else {
					hd.removeChild(base);
					rt  = false;  Assert.isTrue(rt);
				}    
				hd.removeChild(base);
				Assert.isTrue(rt);
			},

			"base target should be supported by html dom" : function() {
				var rt = false;
				var hd = document.getElementsByTagName('head')[0];
				var base = document.createElement("base");
				base.setAttribute("id", "base_id01");
				base.setAttribute("href", "http://www.w3schools.com/jsref/");
				base.setAttribute("target", "_blank");
				hd.appendChild(base);
				var e01 = document.getElementById("base_id01");
				if (e01.target == "_blank") {
					rt = true;
				}
				else {
					hd.removeChild(base);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.target = "_parent";
				var e01 = document.getElementById("base_id01");
				if (e01.target == "_parent") {
					rt = true;
				}
				else {
					hd.removeChild(base);
					rt  = false;  Assert.isTrue(rt);
				}
				hd.removeChild(base);
				Assert.isTrue(rt);
			},

			"body link alink and vlink should be supported by html dom" : function() {
				var rt = false;
				var b1 = document.body;
				b1.link = "blue";
				b1.alink = "green";
				b1.vlink = "#FF0000"
				b1 = document.getElementsByTagName("body")[0];
				if ((b1.link == "blue") && (b1.alink == "green") && (b1.vlink == "#FF0000")) {
					rt = true;
				}   
				Assert.isTrue(rt);
			},

			"body background should be supported by html dom" : function() {
				var rt = false;
				var b1 = document.body;
				b1.background = "/html_dom/w3ss.png";
				b1 = document.getElementsByTagName("body")[0];
				if (b1.background == "/html_dom/w3ss.png") {
					rt = true;
				}
				b1.removeAttribute("background");
				Assert.isTrue(rt);
			},

			"body bgColor should be supported by html dom" : function() {
				var rt = false;
				var b1 = document.body;
				b1.bgColor = '#E6E6FA';
				var b2 = document.getElementsByTagName("body")[0];
				if (b2.bgColor == "#E6E6FA") {
					rt = true;
				}
				b1.removeAttribute("bgcolor");
				Assert.isTrue(rt);
			},

			"body text should be supported by html dom" : function() {
				var rt = false;
				var b1 = document.body;
				b1.text = "#0000FF";
				b1 = document.getElementsByTagName("body")[0];
				if (b1.text == "#0000FF") {
					rt = true;
				}
				b1.removeAttribute("text");
				Assert.isTrue(rt);
			},

			"button form should be supported by html dom" : function() {
				var rt = false;
				var b1 = document.body;
				var newForm = document.createElement("form");
				newForm.id = "form01";
				b1.appendChild(newForm);
				var newButton = document.createElement("button");
				newButton.id = "button01";
				newForm.appendChild(newButton);

				var bt01 = document.getElementById("button01");
				var e01 = bt01.form.id;
				if (e01 == "form01") {
					rt = true;
				}
				b1.removeChild(newForm);
				Assert.isTrue(rt);
			},

			"button name should be supported by html dom" : function() {
				var rt = false;
				var b1 = document.body;
				var newBt = document.createElement("button");
				newBt.name = "button090";
				newBt.id = "id001";
				b1.appendChild(newBt);
				var bt01 = document.getElementsByName("button090")[0];
				if (bt01.id == "id001") {
					rt = true;
				}
				b1.removeChild(newBt);  
				Assert.isTrue(rt);
			},

			"button type should be supported by html dom" : function() {
				var rt = false;
				var b1 = document.body;
				var newBt = document.createElement("button");
				newBt.name = "button090";
				newBt.id = "id001";
				newBt.setAttribute("type","button");
				//newBt.type = "button";
				b1.appendChild(newBt);
				var bt01 = document.getElementsByName("button090")[0];
				if (bt01.type == "button") {
					rt = true;
				}
				else {
					b1.removeChild(newBt);
					rt  = false;  Assert.isTrue(rt);
				}
				//newBt.type = "reset";
				newBt.setAttribute("type","reset");
				var bt01 = document.getElementsByName("button090")[0];
				if (bt01.type != "reset") {
					b1.removeChild(newBt);
					rt  = false;  Assert.isTrue(rt);
				}    
				b1.removeChild(newBt);
				Assert.isTrue(rt);
			},

			"button value should be supported by html dom" : function() {
				var rt = false;
				var b1 = document.body;
				var newBt = document.createElement("button");
				newBt.name = "button090";
				newBt.id = "id001";
				newBt.value = "This is a button";
				b1.appendChild(newBt);
				var bt01 = document.getElementsByName("button090")[0];
				if (bt01.value == "This is a button") {
					rt = true;
				}
				b1.removeChild(newBt);    
				Assert.isTrue(rt);
			},

			"form elements should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<form id="frm1" action="form_action.asp">' +
								   'First name: <input type="text" name="fname" value="Donald" /><br />' +
								   'Last name: <input type="text" name="lname" value="Duck" /><br />' +
								   '<input type="submit" value="Submit" /></form>';
				var x = document.getElementById("frm1");
				var list = x.elements;
				if ((list.length == 3) && (list[2].value == "Submit")) {
					rt = true;
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"form acceptCharset should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<form id="frm1" action="form_action.asp" accept-charset="ISO-8859-1">' +
								   'First name: <input type="text" name="fname" value="Donald" /><br />' +
								   'Last name: <input type="text" name="lname" value="Duck" /><br />' +
								   '<input type="submit" value="Submit" /></form>';
				var e01 = document.getElementById("frm1").acceptCharset;
				if (e01 == "ISO-8859-1") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				var form01 = document.getElementById("frm1");
				form01.acceptCharset = "UTF-8";

				var form01 = document.getElementById("frm1");
				if ((form01.acceptCharset != "UTF-8")) {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}    
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"form length should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<form id="frm1" action="form_action.asp">' +
								   'First name: <input type="text" name="fname" value="Donald" /><br />' +
								   'Last name: <input type="text" name="lname" value="Duck" /><br />' +
								   '<input type="submit" value="Submit" /></form>';
				var x = document.getElementById("frm1");
				var len = x.length;
				if (len == 3) {
					rt = true;
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);    
			},

			"form action should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<form id="frm1" action="form_action.asp" accept-charset="ISO-8859-1">' +
								   'First name: <input type="text" name="fname" value="Donald" /><br />' +
								   'Last name: <input type="text" name="lname" value="Duck" /><br />' +
								   '<input type="submit" value="Submit" /></form>';
				var e01 = document.getElementById("frm1").action;	
				if (e01.search("form_action.asp") >= 0) {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				var form01 = document.getElementById("frm1");
				form01.action = "rim.com";

				var form01 = document.getElementById("frm1");
				var e02 = form01.action;
				if (e02.search("rim.com") <= 0) {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"form target should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<form id="frm1" action="form_action.asp" accept-charset="ISO-8859-1" target="_blank">' +
								   'First name: <input type="text" name="fname" value="Donald" /><br />' +
								   'Last name: <input type="text" name="lname" value="Duck" /><br />' +
								   '<input type="submit" value="Submit" /></form>';
				var e01 = document.getElementById("frm1").target;
				if (e01 == "_blank") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				var form01 = document.getElementById("frm1");
				form01.target = "_self";

				var form01 = document.getElementById("frm1");
				if ((form01.target != "_self")) {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"form name should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<form id="frm1" action="form_action.asp" accept-charset="ISO-8859-1" target="_blank" name="form001">' +
								   'First name: <input type="text" name="fname" value="Donald" /><br />' +
								   'Last name: <input type="text" name="lname" value="Duck" /><br />' +
								   '<input type="submit" value="Submit" /></form>';
				var e01 = document.getElementById("frm1").name;
				if (e01 == "form001") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				var form01 = document.getElementById("frm1");
				form01.name = "_self";

				var form01 = document.getElementById("frm1");
				if ((form01.name != "_self")) {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"iframe align should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<p>This is some text. This is some text. This is some text.' +
								   '<iframe id="myframe" src="index.htm">' +
								   '<p>Your browser does not support iframes.</p>' +
								   '</iframe>' +
								   'This is some text. This is some text. This is some text.</p>';
				var if1 = document.getElementById("myframe");
				if1.align = "right";
				var if1 = document.getElementById("myframe");
				if (if1.align == "right") {
					rt = true;
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"image align should be supported by html dom" : function() {
				var rt = false;
				var newDiv = document.createElement("div");
				var b1 = document.body;
				b1.appendChild(newDiv);
				newDiv.innerHTML = '<img id="image01" src="image101.gif" align="right" />';
				var e01 = document.getElementById("image01");
				if (e01.align == "right") {
					rt = true;
				}
				else {
					b1.removeChild(newDiv);
					rt  = false;  Assert.isTrue(rt);
				}
				e01.align = "middle";
				e01 = document.getElementById("image01");
				if (e01.align != "middle") {
					rt = false;
				}
				b1.removeChild(newDiv);
				Assert.isTrue(rt);
			},

			"eval test should be passed at this html dom test" : function(){
				var rt = false;
				var e01 = eval("x = 10; y = 20; x*y");
				if(e01 == 200) {
					rt = true;
				}
				else{
					rt = false;
					Assert.isTrue(rt);
				}
				e01 = eval("2+2");
				if(e01 == 4){
					rt = true;
				}
				else{
					rt = false;
					Assert.isTrue(rt);
				}
				e01 = eval("x+17");
				if(e01 == 27){
					rt = true;
				}
				else{
					rt = false;
					Assert.isTrue(rt);
				}
				Assert.isTrue(rt);
			},

			"boolean test should be passed at this html dom test" : function(){
				var rt = false;
				
				var myBoolean=new Boolean();
				if(myBoolean == false){
				   rt = true;
				}
				else{
				   rt = false;
				   Assert.isTrue(rt);
				}
				
				myBoolean=new Boolean(0);
				if(myBoolean == false){
					rt = true;
				}
				else{
					rt = false;
					Assert.isTrue(rt);
				}
				
				myBoolean=new Boolean(null);
				if(myBoolean == false){
					rt = true;
				}
				else{
					rt = false;
					Assert.isTrue(rt);
				}

				i++;

				myBoolean=new Boolean("");

				if(myBoolean == false){

				   rt = true;

				}
				else{

				   rt = false; Assert.isTrue(rt);

				}

				myBoolean=new Boolean(false);

				if(myBoolean == false){

				   rt = true;

				}
				else{

				   rt = false; Assert.isTrue(rt);

				}


				myBoolean=new Boolean(NaN);

				if(myBoolean == false){

				   rt = true;

				}
				else{

				   rt = false; Assert.isTrue(rt);

				}


				myBoolean=new Boolean(1);

				if(myBoolean == true){

				   rt = true;

				}
				else{

				   rt = false; Assert.isTrue(rt);

				}


				myBoolean=new Boolean(true);

				if(myBoolean == true){

				   rt = true;

				}
				else{

				   rt = false; Assert.isTrue(rt);

				}

				myBoolean=new Boolean("true");
				if(myBoolean == true){
				   rt = true;
				}
				else{

				   rt = false; Assert.isTrue(rt);

				}

				myBoolean=new Boolean("false");

				if(myBoolean == true){

				   rt = true;

				}
				else{

				   rt = false; Assert.isTrue(rt);

				}

				myBoolean=new Boolean("Richard");

				if(myBoolean == true){

				   rt = true;

				}
				else{

				   rt = false; Assert.isTrue(rt);

				}
				Assert.isTrue(rt);			
			},

			
		});
		
		return testCases;
	}
})();
