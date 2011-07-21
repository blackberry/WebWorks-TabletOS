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
				
		//---------------------------------------------------------------------
		// XML DOM tests
		//---------------------------------------------------------------------			

		testCases[0] = new Y.Test.Case({
			name: "XML DOM tests",
			
			setUp : function () {
				//Setup code goes here
				
			},
			 
			tearDown : function () {
				//Teardown code goes here
				
			},
		//1
			"createDocument in DOMImplementation should be supported by xml dom" : function() 
			{
				var rt = false;			
				var doc = document.implementation.createDocument ('http://www.w3.org/1999/xhtml', 'html', null);  
				var body = document.createElementNS('http://www.w3.org/1999/xhtml', 'body');  
				body.setAttribute('id', 'abc');  
				doc.documentElement.appendChild(body);  
				//alert(doc.getElementById('abc')); // [object HTMLBodyElement]
				var e01 = doc.getElementById('abc').id;
				
				if((e01 == "abc") && (doc.nodeType == 9)){
					rt = true;
				}
				else{
					rt = false;
				}
				Assert.isTrue(rt);
			},

		//2
			"createDocumentType in DOMImplementation should be supported by xml dom" : function()
			{
				var rt = false;
				var dt = document.implementation.createDocumentType('svg:svg', '-//W3C//DTD SVG 1.1//EN', 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd');  
				var d = document.implementation.createDocument('http://www.w3.org/2000/svg', 'svg:svg', dt);  
				//alert(d.doctype.publicId); // -//W3C//DTD SVG 1.1//EN 
				var e01 = d.doctype.publicId;
				
				if((e01 == "-//W3C//DTD SVG 1.1//EN") && (dt.nodeType == 10) ){
					rt = true;
				}
				else{
					rt = false;
				}	
				Assert.isTrue(rt);
			},
//3
			"loadXmlDocument in parser should be supported by xml dom" : function() {
				var rt = false;
				if (window.XMLHttpRequest) {
					xhttp = new XMLHttpRequest();
				}
				else // for older IE 5/6
				{
					xhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				xhttp.open("GET", "html5/DOM/books.xml", false);
				xhttp.send("");
				
				try{
					xmlDoc = xhttp.responseXML;
				} 
				catch (err) {
					rt = false;
					Assert.isTrue(rt);
				}
				
				if (xmlDoc == null) {
					rt = false;
					Assert.isTrue(rt);
				}
				
				var e01 = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue.toString();
				if (e01 == "Everyday Italian") {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},
//4
			"loadXmlString in parser should be supported by xml dom" : function() {
				var rt = false;
				text = "<bookstore><book>";
				text = text + "<title>Everyday Italian I</title>";
				text = text + "<author>Giada De Laurentiis</author>";
				text = text + "<year>2005</year>";
				text = text + "</book></bookstore>";
				if (window.DOMParser) {
					parser = new DOMParser();
					try {
						xmlDoc = parser.parseFromString(text, "text/xml");
					}
					catch (err) {
						rt = false;
						Assert.isTrue(rt);
					}
				}
				else // Internet Explorer
				{
					xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
					xmlDoc.async = "false";
					try{
						xmlDoc.loadXML(text);
					}
					catch (err) {
						rt = false;
						Assert.isTrue(rt);
					}
				}

				if (xmlDoc == null) {
					rt = false;
					Assert.isTrue(rt);
				}   
				
				var e01 = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue.toString();
				if (e01 == "Everyday Italian I") {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},
//5
			"getElementsByTagName should be supported by xml dom" : function() {
				var rt = false;				
				try {
				    xmlDoc = loadXMLDoc("html5/DOM/books.xml");
					x = xmlDoc.getElementsByTagName("title");
				}
				catch (err) {
					rt = false;
					Assert.isTrue(rt);
				}
				   
				var e01 = x[0].childNodes[0].nodeValue;

				if (e01 == "Everyday Italian") {
					rt = true;
				}
				else{
					rt = false;
				}

				Assert.isTrue(rt);
			},

			"Should be able to access node by index on xml dom": function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/DOM/books.xml");

				try {
					x = xmlDoc.getElementsByTagName("title");
				}
				catch (err) {
					rt = false;
					Assert.isTrue(rt);
				}

				var e01 = x[3].childNodes[0].nodeValue;

				if (e01 == "Learning XML") {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"length property should work on xml dom": function() {
				var rt = false;

				xmlDoc = loadXMLDoc("html5/DOM/books.xml");

				var allPrices = new Array(30.00, 29.99, 49.99, 39.95);

				x = xmlDoc.getElementsByTagName("price");
				for (i = 0; i < x.length; i++) {
					var val = x[i].childNodes[0].nodeValue;
					if (allPrices[i] == val) {
						rt = true;
					}
					else {
						rt = false; Assert.isTrue(rt);
					}
				}    
				Assert.isTrue(rt);
			},

			"nodeName and nodeType should work in documentElement" : function() {    //documentElement is root element.
				var rt = false;
				xmlDoc = loadXMLDoc("html5/DOM/books.xml");

				var e01 = xmlDoc.documentElement.nodeName;
				var e02 = xmlDoc.documentElement.nodeType;

				if ((e01 == "bookstore") && e02 == 1) {
					rt = true;
				}
				else {
					rt = false;
				}
				
				Assert.isTrue(rt);
			},

			"should be able to loop through the element nodes on xml dom" : function() {
				var rt = false;

				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.documentElement.childNodes;
				for (i = 0; i < x.length; i++) {
					if (x[i].nodeType == 1) {//Process only element nodes (type 1)
						if (x[i].nodeName == "book") {
							rt = true;
						}
						else {
							rt = false;
							Assert.isTrue(rt);
						}
					}
				}
				Assert.isTrue(rt);
			},

			"childNodes firstChild and nextSibling should work on xml dom" : function() {
				var rt = false;
				var my_array = new Array("title", "author", "author", "author", "author", "author", "year", "price","html");
				var j = 0;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("book")[2].childNodes;
				y = xmlDoc.getElementsByTagName("book")[2].firstChild;
				for (i = 0; i < x.length; i++) {
					if (y.nodeType == 1) {//Process only element nodes (type 1)
						var e01 = new String(y.nodeName);
						if (e01 == my_array[j]) {
							rt = true;
						}
						else {
							rt = false;
							Assert.isTrue(rt);
						}
						j += 1;
					}
					y = y.nextSibling;
				}       
				Assert.isTrue(rt);
			},

			"should be able to change nodeValue in text node" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				var x = xmlDoc.getElementsByTagName("title")[1].childNodes[0];
				x.nodeValue = "Easy Cooking, hahahahahhahahahahha!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";

				x = xmlDoc.getElementsByTagName("title")[1].childNodes[0];
				txt = x.nodeValue;
				if (txt == "Easy Cooking, hahahahahhahahahahha!!!!!!!!!!!!!!!!!!!!!!!!!!!!!") {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"should be able to traverse attribute list on xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/DOM/books.xml");

				var my_array = new Array("cooking", "children", "web", "web");

				x = xmlDoc.getElementsByTagName("book");

				for (i = 0; i < x.length; i++) {

					var e01 = x[i].attributes.getNamedItem("category").nodeValue;
					if (e01 == my_array[i]) {
						rt = true;
					}
					else {
						rt = false;
						Assert.isTrue(rt);
					}
				}

				x1 = xmlDoc.getElementsByTagName("title");
				var e02 = x1[0].attributes.getNamedItem("lang").nodeValue;
				var e03 = x1[1].attributes.getNamedItem("c:lang").nodeValue
				if ((e02 == "en") && (e03 == "en")) {
					rt = true;
				}
				else {
					rt = false;
					Assert.isTrue(rt);
				}        
				Assert.isTrue(rt);
			},

			"should be able to traverse the node tree on xml dom" : function() {
				var rt = false;
				var text = "<book>";
				text = text + "<title>Everyday Italian</title>";
				text = text + "<author>Giada De Laurentiis</author>";
				text = text + "<year>2005</year>";
				text = text + "</book>";

				var my_array = new Array("title: Everyday Italian", "author: Giada De Laurentiis", "year: 2005");

				xmlDoc = loadXMLString(text);

				// documentElement always represents the root node
				x = xmlDoc.documentElement.childNodes;

				for (i = 0; i < x.length; i++) {
					var e01 = x[i].nodeName + ": " + x[i].childNodes[0].nodeValue;
					if (e01 == my_array[i]) {
						rt = true;
					}
					else {
						rt = false;
						Assert.isTrue(rt);
					}
				}
				Assert.isTrue(rt);
			},

			"parentNode should work" : function() {
				var rt = false;

				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("book")[0];
				if (x.parentNode.nodeName == "bookstore") {
					rt = true;
				}
				else {
					rt = false;
					Assert.isTrue(rt);
				}

				Assert.isTrue(rt);
			},

			"should be able to get first child" : function() {
				var rt = false;

				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = get_firstChild(xmlDoc.getElementsByTagName("book")[0]);

				if (x.nodeName == "title") {
					rt = true;
				}
				else {
					rt = false;
				}

				Assert.isTrue(rt);
			},

			"should be able to access last child" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = get_lastChild(xmlDoc.getElementsByTagName("book")[0]);
				if (x.nodeName == "html") {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"should be able to access next sibling": function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = get_nextSibling(xmlDoc.getElementsByTagName("title")[0]);
				if (x.nodeName == "author") {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"should be able to access the previous sibling" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = get_previousSibling(xmlDoc.getElementsByTagName("price")[0]);
				if (x.nodeName == "year") {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"getAttribute should work on xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				txt = xmlDoc.getElementsByTagName("title")[0].getAttribute("lang");

				if (txt == "en") {
					rt = true;
				}
				else {
					rt = false;
					Assert.isTrue(rt);
				}

				txt = xmlDoc.getElementsByTagName("book")[3].getAttribute("cover");

				if (txt == "paperback") {
					rt = true;
				}
				else {
					rt = false;
					Assert.isTrue(rt);
				}
				Assert.isTrue(rt);    
			},

			"getAttributeNode should work on xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/DOM/books.xml");

				x = xmlDoc.getElementsByTagName("title")[0].getAttributeNode("lang");
				txt = x.nodeValue;
				if ((txt == 'en') && (x.nodeType == 2) ) {
					rt = true;
				}
				else {
					rt = false;
					Assert.isTrue(rt);
				}

				x1 = xmlDoc.getElementsByTagName("book")[3].getAttributeNode("cover");
				txt = x1.nodeValue;
				if (txt == 'paperback') {
					rt = true;
				}
				else {
					rt = false;
					Assert.isTrue(rt);
				}   
				
				Assert.isTrue(rt);
			},

			"setAttribute should work on the xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName('book');

				x[0].setAttribute("category", "food");

				if (x[0].getAttribute("category") == "food") {
					rt = true;
				}
				else {
					rt = false;
					Assert.isTrue(rt);
				}

				x = xmlDoc.getElementsByTagName('book');

				x[3].setAttribute("cover", "hahahaha");

				if (x[3].getAttribute("cover") == "hahahaha") {
					rt = true;
				}
				else {
					rt = false;
					Assert.isTrue(rt);
				}

				x = xmlDoc.getElementsByTagName('title');

				x[3].setAttribute("lang", "cn");

				if (x[3].getAttribute("lang") == "cn") {
					rt = true;
				}
				else {
					rt = false;
					Assert.isTrue(rt);
				}    
				  
				Assert.isTrue(rt);
			},

			"xml attribute should be able to be changed by nodeValue" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("book")[0]
				y = x.getAttributeNode("category");
				y.nodeValue = "food9999999999999999999999999999999999999999999999999999999999";

				if (y.nodeValue == "food9999999999999999999999999999999999999999999999999999999999") {
					rt = true;
				}
				else {
					rt = false;
					Assert.isTrue(rt);
				}

				x = xmlDoc.getElementsByTagName("book")[3]
				y = x.getAttributeNode("cover");
				y.nodeValue = "food9999999999999999999999999999999999999999999999999999999999bbb";

				if (y.nodeValue == "food9999999999999999999999999999999999999999999999999999999999bbb") {
					rt = true;
				}
				else {
					rt = false;
					Assert.isTrue(rt);
				}
				
				Assert.isTrue(rt);
			},

			"should be able to remove an xml element node" : function() {
				var rt = false;

				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				y = xmlDoc.getElementsByTagName("book")[0];
				xmlDoc.documentElement.removeChild(y);

				var e01 = xmlDoc.getElementsByTagName('book').length;

				if (e01 == 3) {
					rt = true;
				}
				else {
					rt = false;
					Assert.isTrue(rt);
				}

				var v1 = xmlDoc.getElementsByTagName('title')[0].childNodes[0].nodeValue;
				if (v1 == "Harry Potter") {
					rt = true;
				}
				else {
					rt = false;
					Assert.isTrue(rt);
				}
				
				Assert.isTrue(rt);
			},

			"should be able to remove current xml node" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("author")[0]
				x.parentNode.removeChild(x);

				if (xmlDoc.getElementsByTagName("author").length == 7) {
					rt = true;
				}
				else {
					rt = false;
					Assert.isTrue(rt);
				}

				var v1 = xmlDoc.getElementsByTagName("author")[0].childNodes[0].nodeValue;
				if (v1 == 'J K. Rowling') {
					rt = true;
				}
				else {
					rt = false;
					Assert.isTrue(rt);
				}
				
				Assert.isTrue(rt);
			},

			"should be able to remove a xml text node" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");


				x = xmlDoc.getElementsByTagName("title")[0];

				y = x.childNodes[0];
				x.removeChild(y);

				if (x.childNodes.length == 0) {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"should be able to remove an xml attribute node by name" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName('book');
				x[0].removeAttribute('category');

				var v1 = new String(x[0].getAttribute('category'));
				if (v1 == 'null') {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"should be able to remove xml attributes by object" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				var my_array = new Array("category: cooking", "xmlns:c: http://www.w3schools.com/children/", "category: web", "xmlns:x: http://www.w3schools.com/xml/");

				x = xmlDoc.getElementsByTagName('book');

				for (i = 0; i < x.length; i++) {
					
					attnode = x[i].attributes[0];
					old_att = x[i].removeAttributeNode(attnode);

					var str = old_att.nodeName + ": " + old_att.nodeValue;
					
					if (str == my_array[i]) {
						rt = true;
					}
					else {
						rt = false;
						Assert.isTrue(rt);
					}
				}
				
				if (x[3].attributes[1].nodeValue != "paperback") {
					rt = false;
					Assert.isTrue(rt);
				}
				
				Assert.isTrue(rt);
			},

			"should be able to replace a xml element node" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.documentElement;

				//create a book element, title element and a text node
				newNode = xmlDoc.createElement("book");
				newTitle = xmlDoc.createElement("title");
				newText = xmlDoc.createTextNode("Yong Yu's Notebook");

				//add the text node to the title node,
				newTitle.appendChild(newText);
				//add the title node to the book node
				newNode.appendChild(newTitle);

				y = xmlDoc.getElementsByTagName("book")[0]
				//replace the first book node with the new node
				x.replaceChild(newNode, y);

				z = xmlDoc.getElementsByTagName("title");

				if (z[0].childNodes[0].nodeValue == "Yong Yu's Notebook") {
					rt = true;
				}
				else {
					rt = false;
				}
			 
				Assert.isTrue(rt);
			},

			//The replaceData()has three parameters:
			//offset - Where to begin replacing characters. Offset value starts at zero
			//length - How many characters to replace
			//string - The string to insert
			"replaceData should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("title")[0].childNodes[0];
				x.replaceData(0, 0, "Easy");
				if (x.nodeValue == "EasyEveryday Italian") {
					rt = true;
				}
				else {
					rt = false;
					Assert.isTrue(rt);
				}

				x.replaceData(4, 8, " easy");
				if (x.nodeValue == "Easy easy Italian") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}

				x.replaceData(9, 8, "");
				if (x.nodeValue != "Easy easy") {
					rt = false; Assert.isTrue(rt);
				}
				Assert.isTrue(rt);
			},

			//The replaceData()has three parameters:
			//offset - Where to begin replacing characters. Offset value starts at zero
			//length - How many characters to replace
			//string - The string to insert
			"exception should be thrown if index is out of range in replaceData" : function() {
				var rt = false; 
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("title")[0].childNodes[0];
				try{
					x.replaceData(19, 0, "Easy");
				}
				catch (err) {
					if (err.toString() == "Error: INDEX_SIZE_ERR: DOM Exception 1") {
						rt = true;
					}
					else {
						rt = false;
					}
				}

				Assert.isTrue(rt);
			},

			"exception should be thrown if negative index is in replaceData" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("title")[0].childNodes[0];
				try {
					x.replaceData(-1, 0, "Easy");
				}
				catch (err) {
					if (err.toString() == "Error: INDEX_SIZE_ERR: DOM Exception 1") {
						rt = true;
					}
					else {
						rt = false;
					}
				}

				Assert.isTrue(rt);
			},

			"exception should be thrown if negative length is in replaceData" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("title")[0].childNodes[0];
				try {
					x.replaceData(0, -1, "Easy");
				}
				catch (err) {
					if (err.toString() == "Error: INDEX_SIZE_ERR: DOM Exception 1") {
						rt = true;
					}
					else {
						rt = false;
					}
				}

				Assert.isTrue(rt);
			},

			"appendChild should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				newel = xmlDoc.createElement("edition");

				x = xmlDoc.getElementsByTagName("book")[0];
				x.appendChild(newel);
				if (x.getElementsByTagName("edition")[0].nodeName == "edition") {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"should be able to create and set a new xml attribute node" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				newatt = xmlDoc.createAttribute("edition");
				newatt.nodeValue = "first";

				x = xmlDoc.getElementsByTagName("title");
				x[0].setAttributeNode(newatt);

				if ((x[0].getAttribute("edition") == "first") && (newatt.nodeType == 2)) {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"should be able to create a xml attribute using setAttribute" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("title");

				x[0].setAttribute("edition", "first");

				if (x[0].getAttribute("edition") == "first") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}

				if (x[0].getAttribute("lang") != "en") {
					rt = false; Assert.isTrue(rt);
				}
				Assert.isTrue(rt);
			},

			"createTextNode should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				newel = xmlDoc.createElement("edition");
				newtext = xmlDoc.createTextNode("first");
				newel.appendChild(newtext);

				x = xmlDoc.getElementsByTagName("book")[0];
				x.appendChild(newel);

				if ((x.getElementsByTagName("edition")[0].childNodes[0].nodeValue == "first") && (x.getElementsByTagName("edition")[0].childNodes[0].nodeType == 3)) {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"createCDATASection should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				newCDATA = xmlDoc.createCDATASection("Special Offer & Book Sale");

				x = xmlDoc.getElementsByTagName("book")[0];
				x.appendChild(newCDATA);

				if ((x.lastChild.nodeValue == "Special Offer & Book Sale") && (x.lastChild.nodeType == 4)) {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"createComment should be supported by xml dom" : function() {
				var rt = true;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				newComment = xmlDoc.createComment("Revised April 2008");

				x = xmlDoc.getElementsByTagName("book")[0];
				x.appendChild(newComment);

				if ((x.lastChild.nodeValue == "Revised April 2008") && (x.lastChild.nodeType == 8)) {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"insertBefore should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				newNode = xmlDoc.createElement("book");
				x = xmlDoc.documentElement;
				newNode.setAttribute("yu", "hello");
				y = xmlDoc.getElementsByTagName("book")[3];
				x.insertBefore(newNode, y);
				var y1 = xmlDoc.getElementsByTagName("book");   
				if (y1.length == 5) {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				if (y1[3].getAttribute("yu") != "hello") {
					rt = false; Assert.isTrue(rt);
				}
				else {
					rt = true;
				}

				newNode = xmlDoc.createElement("book");
				x = xmlDoc.documentElement;
				newNode.setAttribute("yu01", "hello yu01");
				y = xmlDoc.getElementsByTagName("book")[0];
				x.insertBefore(newNode, y);
				var y1 = xmlDoc.getElementsByTagName("book");
				if (y1.length == 6) {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				if (y1[0].getAttribute("yu01") != "hello yu01") {
					rt = false; Assert.isTrue(rt);
				}
				else {
					rt = true;
				}

				newNode = xmlDoc.createElement("book");
				x = xmlDoc.documentElement;
				newNode.setAttribute("yu02", "hello yu02");
				try{
					y = xmlDoc.getElementsByTagName("book")[10];
					x.insertBefore(newNode, y);
				}
				catch(err){
					alert(err.toString());
					rt = false; Assert.isTrue(rt);
				}
				var y1 = xmlDoc.getElementsByTagName("book");
				if (y1.length == 7) {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				if (y1[6].getAttribute("yu02") != "hello yu02") {
					rt = false; Assert.isTrue(rt);
				}
				else {
					rt = true;
				}    
				
				Assert.isTrue(rt);
			},

			"insertData should be supported by xml dom" : function() {
				var rt = false;
				
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("title")[0].childNodes[0];
				x.insertData(0, "Easy ");
				if (x.nodeValue == "Easy Everyday Italian") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				x.insertData(4, " easy");
				if (x.nodeValue == "Easy easy Everyday Italian") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				x.insertData(26, "!!!!");

				Assert.isTrue(rt);
			},

			"exception should be thrown if index is out of range in insertData" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("title")[0].childNodes[0];
				try {
					x.insertData(17, "Easy ");
				}
				catch (err) {
					if (err.toString() == "Error: INDEX_SIZE_ERR: DOM Exception 1") {
						rt = true;
					}
					else {
						rt = false;
					}
				}
				Assert.isTrue(rt);
			},

			"exception should be thrown if negative index is in insertData" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("title")[0].childNodes[0];
				try {
					x.insertData(-1, "Easy ");
				}
				catch (err) {
					if (err.toString() == "Error: INDEX_SIZE_ERR: DOM Exception 1") {
						rt = true;
					}
					else {
						rt = false;
					}
				}
				Assert.isTrue(rt);
			},

			"cloneNode should work according to true condition on xml dom" : function() {
				var rt = false;
				var my_array = new Array("Everyday Italian", "Harry Potter", "XQuery Kick Start", "Learning XML", "Everyday Italian");
				var my_array01 = new Array("title", "author", "year", "price", "html");
				var my_array02 = new Array("Everyday Italian", "Giada De Laurentiis", "2005", "30.00", "<b>Stunning!</b>");
				
				xmlDoc = loadXMLDoc("html5/dom/books.xml");
				x = xmlDoc.getElementsByTagName('book')[0];
				cloneNode = x.cloneNode(true);
				xmlDoc.documentElement.appendChild(cloneNode);

				//Output all titles
				y = xmlDoc.getElementsByTagName("title");
				for (i = 0; i < y.length; i++) {
					if (y[i].childNodes[0].nodeValue == my_array[i]) {
						rt = true;
					}
					else {
						rt = false; Assert.isTrue(rt);
					}
				}
				
				var y1 = xmlDoc.getElementsByTagName("book")[4].childNodes;
				var j = 0;
				var i = 0;
				for (i = 0; i < y1.length; i++) {
					if (y1[i].nodeType == 1) {
						if (y1[i].nodeName == my_array01[j]) {
							rt = true;
							if (y1[i].childNodes[0].nodeValue == my_array02[j]) {
								rt = true;
							}
							else {
								rt = false; Assert.isTrue(rt);
							}
						}
						else {
							rt = false; Assert.isTrue(rt);
						}
						j = j + 1;  
					}
				}
				
				var e01 = xmlDoc.getElementsByTagName("book")[4].getAttribute("category");
				if (e01 != "cooking") {
					rt = false; Assert.isTrue(rt);
				}
				
				Assert.isTrue(rt);
			},

			"cloneNode should work according to false condition on xml dom" : function() {
				var rt = false;
				var my_array = new Array("Everyday Italian", "Harry Potter", "XQuery Kick Start", "Learning XML", "Everyday Italian");
				var my_array01 = new Array("title", "author", "year", "price");
				var my_array02 = new Array("Everyday Italian", "Giada De Laurentiis", "2005", "30.00");

				xmlDoc = loadXMLDoc("html5/dom/books.xml");
				x = xmlDoc.getElementsByTagName('book')[0];
				cloneNode = x.cloneNode(false);
				xmlDoc.documentElement.appendChild(cloneNode);

				y = xmlDoc.getElementsByTagName("book");
				
				for (i = 0; i < y.length; i++) {
					if (y[i].nodeName == "book") {
						rt = true;
					}
					else {
						rt = false; Assert.isTrue(rt);
					}
				}
				var e01 = xmlDoc.getElementsByTagName("book")[4].getAttribute("category");
				
				if (e01 != "cooking") {
					rt = false; Assert.isTrue(rt);
				}

				var y1 = xmlDoc.getElementsByTagName("book")[4].childNodes;
				if (y1.length != 0) {
					rt = false; Assert.isTrue(rt);
				}
				
				Assert.isTrue(rt);
			},

			"XMLHttpRequest should be supported by xml dom" : function() {
				var rt = false;
				var xmlhttp;
				var url = "html5/dom/books.xml"

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
								if (xmlhttp.responseText != null) {
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

			"document nodeType should be 9 on xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				if (xmlDoc.nodeType == 9) {
					rt = true;
				}
				else {
					rt = false;
				}
				
				Assert.isTrue(rt);
			},

			"prefix should work properly on the xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");
				x = xmlDoc.getElementsByTagName('title');

				if ((x.item(1).prefix == "c") && (x.item(3).prefix == "x")) {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				Assert.isTrue(rt);
			},

			"localName should work properly on the xml dom" : function() {
				var rt = false;
				var xmlDoc = loadXMLDoc("html5/dom/books.xml");
				var x = xmlDoc.getElementsByTagName('title');
				for (i = 0; i < x.length; i++) {
					if (x.item(i).localName == "title") {
						rt = true;
					}
					else {
						rt = false; Assert.isTrue(rt);
					}
				}
				Assert.isTrue(rt);
			},

			"namespaceURI should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");
				x = xmlDoc.getElementsByTagName('title');

				if ((x.item(1).namespaceURI == "http://www.w3schools.com/children/") && (x.item(3).namespaceURI == "http://www.w3schools.com/xml/")) {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				Assert.isTrue(rt);
			},

			"baseURI should be supported by xml dom" : function() {
				var rt = false;
				var xmlDoc = loadXMLDoc("html5/dom/books.xml");
				var x = xmlDoc.getElementsByTagName('title');
				for (i = 0; i < x.length; i++) {
					var str = new String(x.item(i).baseURI);
					if (str.search("html5/dom/books.xml")) {
						rt = true;
					}
					else {
						rt = false; Assert.isTrue(rt);
					}
				}
				Assert.isTrue(rt);
			},

			"ownerDocument should be supported by xml dom" : function() { //something is delayed by x.nodeType
				var rt = false;
				
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				var x = xmlDoc.getElementsByTagName("book")[0].ownerDocument;
			  
				if ((x.nodeName == "#document") && (x.nodeType == 9)) {
					rt = true;
				}
				else {
					rt = false;
				}
				
				Assert.isTrue(rt);
			},

			"textContent should be supported by xml dom" : function() {
				var rt = false;
				var my_array = new Array("\nEveryday Italian\nGiada De Laurentiis\n2005\n30.00\n<b>Stunning!</b>\n\n", "\nHarry Potter\nJ K. Rowling\n2005\n29.99\n<i>Magic! Six stars!</i>\n\n", "\nXQuery Kick Start\nJames McGovern\nPer Bothner\nKurt Cagle\nJames Linn\nVaidyanathan Nagarajan\n2003\n49.99\n<a href=\"http://www.w3schools.com/xquery\">Learn XQuery</a>\n\n", "\nLearning XML\nErik T. Ray\n2003\n39.95\n<a href=\"http://www.w3schools.com/xml\">Learn XML</a>\n\n");
				xmlDoc = loadXMLDoc("html5/dom/books.xml");
				x = xmlDoc.getElementsByTagName('book');
				var i = 0;
				for (i = 0; i < x.length; i++) {
					var str = new String(x.item(i).textContent);
					
					if (str == my_array[i]) {
						rt = true;
						x.item(i).textContent = "hello"
						var str01 = x.item(i).textContent;
						if (str01 == "hello") {
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
				Assert.isTrue(rt);
			},

			"compareDocumentPosition should be supported by xml dom" : function() {
				var rt =false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName('book')[0];
				y = xmlDoc.getElementsByTagName('book')[2];

				if (x.compareDocumentPosition(y) == 4) {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"hasChildNodes should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");
				x = xmlDoc.getElementsByTagName("book")[0];

				if (x.hasChildNodes()) {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"hasAttributes should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");
				var all_books = xmlDoc.getElementsByTagName('book')

				for (i = 0; i < all_books.length; i++) {
					if (all_books[i].hasAttributes) {
						rt = true;
					}
					else {
						rt = false; Assert.isTrue(rt);
					}
				}

				x = xmlDoc.getElementsByTagName('book')[0];
				if (x.hasAttributes()) {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				y = xmlDoc.getElementsByTagName('book')[1];
				if (y.hasAttributes()) {
					rt = true;
				}
				else {
					rt = false;
				}    
				Assert.isTrue(rt);
			},

			"getElementsByTagNameNS should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");
				var e0 = xmlDoc.getElementsByTagNameNS("http://www.w3schools.com/children/", 'title');
				if (e0[0].childNodes[0].nodeValue == "Harry Potter") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				e0 = xmlDoc.getElementsByTagNameNS("http://www.w3schools.com/children/", 'author');
				if (e0[0].childNodes[0].nodeValue == "J K. Rowling") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				e0 = xmlDoc.getElementsByTagNameNS("http://www.w3schools.com/children/", 'year');
				if (e0[0].childNodes[0].nodeValue == "2005") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				e0 = xmlDoc.getElementsByTagNameNS("http://www.w3schools.com/children/", 'price');
				if (e0[0].childNodes[0].nodeValue == "29.99") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				} 
				
				Assert.isTrue(rt);
			},


			"isEqualNode should be supported by xml dom" : function() {
				var rt = false;

				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("book")[1];
				y = xmlDoc.getElementsByTagName("book")[2];
				z = xmlDoc.getElementsByTagName("book")[1];

				if (!x.isEqualNode(y)) {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}

				if (x.isEqualNode(z)) {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}

				cloneNode = x.cloneNode(true);
				xmlDoc.documentElement.appendChild(cloneNode);
				if (x.isEqualNode(cloneNode)) {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}    

				Assert.isTrue(rt);
			},

			"isSameNode should be supported by xml dom" : function() {
				var rt = false;

				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("book")[1];
				y = xmlDoc.getElementsByTagName("book")[2];
				z = xmlDoc.getElementsByTagName("book")[1];

				if (!x.isSameNode(y)) {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}

				if (x.isSameNode(z)) {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}

				cloneNode = x.cloneNode(true);
				xmlDoc.documentElement.appendChild(cloneNode);
				if (!x.isSameNode(cloneNode)) {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}

				Assert.isTrue(rt);
			},

			"lookupNamespaceURI should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("book")[3];
				if (x.lookupNamespaceURI("x") == "http://www.w3schools.com/xml/") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				Assert.isTrue(rt);
			},

			"lookupPrefix should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("book")[3];
				if (x.lookupPrefix("http://www.w3schools.com/xml/") == "x") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				Assert.isTrue(rt);
			},

			"should be able to traverse node list by item on xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.documentElement.childNodes;

				for (i = 0; i < x.length; i++) {
					//Display only element nodes
					if (x.item(i).nodeType == 1) {
						if (x.item(i).nodeName == "book") {
							rt = true;
						}
						else {
							rt = false; Assert.isTrue(rt);
						}
					}
				}
				Assert.isTrue(rt);
			},

			"should be able to access attributes length on xml dom" : function() {
				var rt = false;
				var x = xmlDoc.getElementsByTagName("book");
				if (x.item(3).attributes.length == 3) {
					rt = true;
				}
				else {
					rt = false;
				}
				
				Assert.isTrue(rt);
			},

			"removeNamedItem should be supported by xml dom" : function() {
				var rt = false;
				x = xmlDoc.getElementsByTagName('book');
				x.item(3).attributes.removeNamedItem("category");
				x.item(3).attributes.removeNamedItem("cover");
				if (x.item(3).attributes.length == 1) {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				if (x[3].getAttribute("xmlns:x") == "http://www.w3schools.com/xml/") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				x.item(3).attributes.removeNamedItem("xmlns:x");
				if (x.item(3).attributes.length == 0) {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}     
				Assert.isTrue(rt);
			},
			//------------------------------------------
			//    CDATA
			//------------------------------------------
			"data property should be supported on CDATA by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");
				var my_array = new Array("<b>Stunning!</b>", "<i>Magic! Six stars!</i>", "<a href=\"http://www.w3schools.com/xquery\">Learn XQuery</a>", "<a href=\"http://www.w3schools.com/xml\">Learn XML</a>");

				x = xmlDoc.getElementsByTagName("html");

				for (i = 0; i < x.length; i++) {
					if (x[i].childNodes[0].data == my_array[i]) {
						rt = true;
					}
					else {
						rt = false; Assert.isTrue(rt);
					}
				}

				Assert.isTrue(rt);
			},

			"appendData should be supported on CDATA by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");
				x = xmlDoc.getElementsByTagName("html")[0].childNodes[0];
				x.appendData(" Wonderful!");
				if (x.data == "<b>Stunning!</b> Wonderful!") {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"deleteData should be supported on CDATA by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("html")[0].childNodes[0];

				x.deleteData(0, 4);
				if (x.data == "tunning!</b>") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				x.deleteData(0,100);
				if (x.data == "") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				Assert.isTrue(rt);
			},

			"insertData should be supported on CDATA by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("html")[0].childNodes[0];

				x.insertData(3, "Wonderful and ");
				if (x.data == "<b>Wonderful and Stunning!</b>") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				x.insertData(30, "----RIM");
				Assert.isTrue(rt);
			},

			"CDATA insertData should throw exception if index is out of range" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("html")[0].childNodes[0];
				try {
					x.insertData(3, "Wonderful and ");
					if (x.data == "<b>Wonderful and Stunning!</b>") {
						rt = true;
					}
					else {
						rt = false; Assert.isTrue(rt);
					}
					x.insertData(31, "----RIM");
				}
				catch (err) {
					if (err.toString() == "Error: INDEX_SIZE_ERR: DOM Exception 1") {
						rt = true;
					}
					else {
						rt = false; Assert.isTrue(rt);
					}
				}
				
				Assert.isTrue(rt);
			},

			"replaceData should be supported on CDATA by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("html")[0].childNodes[0];
				x.replaceData(3, 8, "Fantastic");
				if (x.data == "<b>Fantastic!</b>") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}

				x.replaceData(3, 100, "RIM");
				if (x.data == "<b>RIM") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}   
				Assert.isTrue(rt);
			},

			"CDATA spliteText should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				var x = xmlDoc.getElementsByTagName("html")[0].childNodes[0];
				var y = x.splitText(8);
				if ((x.nodeValue == "<b>Stunn") && (y.nodeValue == "ing!</b>")) {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				x.appendData("ing!</b>");
				var x1 = xmlDoc.getElementsByTagName("html")[0].childNodes[0];
				var y1 = x1.splitText(0);
				if((x1.data == "") && (y1.data == "<b>Stunning!</b>")){
					rt = true;
				}
				else{
					rt = false; Assert.isTrue(rt);
				}
				x.appendData("<b>Stunning!</b>");
				x1 = xmlDoc.getElementsByTagName("html")[0].childNodes[0];
				y1 = x1.splitText(16);
				if ((x1.data == "<b>Stunning!</b>") && (y1.data == "")) {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				Assert.isTrue(rt);
			},

			"CDATA spliteData should throw exception when index is out of range" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");
				var x = xmlDoc.getElementsByTagName("html")[0].childNodes[0];
				try {
					var y = x.splitText(17);
				}
				catch (err) {
					if (err.toString() == "Error: INDEX_SIZE_ERR: DOM Exception 1") {
						rt = true;
					}
					else {
						rt = false;
					}
				}
				Assert.isTrue(rt);
			},

			"CDATA substringData should be supported by xml dom" : function() {      //CDATANode.substringData(start,length)
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");
				x = xmlDoc.getElementsByTagName("html")[0].childNodes[0]
				y = x.substringData(3, 4);
				if (y == "Stun") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				try {
					y = x.substringData(3, 100);
				}
				catch (err) {
					rt = false; Assert.isTrue(rt);
				}
				if (y == "Stunning!</b>") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				} 
				Assert.isTrue(rt);
			},

			//--------------------------------------------------
			//     Comment Object: The Comment object represents 
			//     the content of comment nodes in a document.
			//--------------------------------------------------
			"comment data proterty should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("book")[0].childNodes;

				for (i = 0; i < x.length; i++) {
					if (x[i].nodeType == 8) {
						//Process only comment nodes
						if (x[i].data == "125 Simple and Delicious Recipes (Hardcover)") {
							rt = true;
						}
						else {
							rt = false;
						}
					}
				}
				Assert.isTrue(rt);
			},

			"comment length property should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("book")[3].childNodes;

				for (i = 0; i < x.length; i++) {
					if (x[i].nodeType == 8) {
						//Process only comment nodes
						if (x[i].length == 27) {
							rt = true;
						}
						else {
							rt = false;
						}
					}
				}
				Assert.isTrue(rt);
			},

			"comment appendData should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("book")[0].childNodes;

				for (i = 0; i < x.length; i++) {
					if (x[i].nodeType == 8) {
						//Process only comment nodes
						x[i].appendData(" Special Offer");
						if (x[i].data == "125 Simple and Delicious Recipes (Hardcover) Special Offer") {
							rt = true;
						}
						else {
							rt = false;
						}
					}
				}
				Assert.isTrue(rt);
			},

			"comment deleteData should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("book")[0].childNodes;

				for (i = 0; i < x.length; i++) {
					if (x[i].nodeType == 8) {
						//Process only comment nodes
						x[i].deleteData(0, 33);
						if (x[i].data == "(Hardcover)") {
							rt = true;
						}
						else {
							rt = false;
						}
					}
				}
				Assert.isTrue(rt);
			},

			"comment insertData should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("book")[0].childNodes;

				for (i = 0; i < x.length; i++) {
					if (x[i].nodeType == 8) {
						//Process only comment nodes
						x[i].insertData(25, "Italian ");
						if (x[i].data == "125 Simple and Delicious Italian Recipes (Hardcover)") {
							rt = true;
						}
						else {
							rt = false;
						}
					}
				}
				Assert.isTrue(rt);    
			},

			"comment replaceData should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("book")[0].childNodes;

				for (i = 0; i < x.length; i++) {
					if (x[i].nodeType == 8) {
						//Process only comment nodes
						x[i].replaceData(4, 6, "Easy");
						if (x[i].data == "125 Easy and Delicious Recipes (Hardcover)") {
							rt = true;
						}
						else {
							rt = false;
						}
					}
				}
				Assert.isTrue(rt);
			},

			"comment substringData should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("book")[0].childNodes;

				for (i = 0; i < x.length; i++) {
					if (x[i].nodeType == 8) {
						//Process only comment nodes
						y = x[i].substringData(33, 11);
						if (y == "(Hardcover)") {
							rt = true;
						}
						else {
							rt = false;
						}
					}
				}
				Assert.isTrue(rt);
			},

			//-----------------------------------------------
			"setAttributeNS method should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc=loadXMLDoc("html5/dom/books.xml");

				x=xmlDoc.getElementsByTagName("book")[0];
				ns="http://www.w3schools.com/edition/";
				x.setAttributeNS(ns,"edition","first");
				if (x.getAttributeNS(ns, "edition") == "first") {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"hasAttributeNS method should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("title")[3];
				ns = "http://www.w3schools.com/xml/";

				if (x.hasAttributeNS(ns, "lang")) {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"removeAttributeNS method should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("title")[1];
				ns = "http://www.w3schools.com/children/";

				x.removeAttributeNS(ns, "lang");
				if (!x.hasAttributeNS(ns, "lang")) {
					rt = true;
				}
				else {
					rt = false;
				}

				Assert.isTrue(rt);
			},

			"getAttributeNodeNS method should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("title")[1];
				ns = "http://www.w3schools.com/children/";

				y = x.getAttributeNodeNS(ns, "lang");

				if ((y.nodeName == "c:lang") && y.nodeValue == "en") {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"tagName property should be supported by xml dom" : function() {
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName("title")[0];
				if (x.tagName == "title") {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"implementation property should be supported by xml dom" : function() { //The implementation property returns the DOMImplementation object that handles the document.
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");
				if (xmlDoc.implementation == "[object DOMImplementation]") {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"xmlEncoding property should be supported by xml dom" : function() {
				var rt = false;
				var xmlDoc = loadXMLDoc("html5/dom/books.xml");
				if (xmlDoc.xmlEncoding == "ISO-8859-1") {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},
/*
			"xmlVersion property should be supported by xml dom" : function() {
				var rt = false;
				var xmlDoc = loadXMLDoc("html5/dom/books.xml");
				if (xmlDoc.xmlVersion == "1.0") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				xmlDoc.xmlVersion = "4.5";
				if (xmlDoc.xmlVersion == "4.5") {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}      
				Assert.isTrue(rt);
			},
*/
			"xmlStandalone should be supported by xml dom" : function() {
				var rt = false;
				var xmlDoc = loadXMLDoc("html5/dom/books.xml");
				if (xmlDoc.xmlStandalone == false) {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				xmlDoc.xmlStandalone = true;
				if (xmlDoc.xmlStandalone == true) {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				
				Assert.isTrue(rt);
			},

			"doctype and its name should be supported by xml dom" : function() { //The DocumentType object provides an interface to the entities defined for an XML document.
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");
				if (xmlDoc.doctype.name == "note") {
					rt = true;
				}
				else {
					rt = false;
				}
				Assert.isTrue(rt);
			},

			"ownerElement should be supported by xml dom" : function() {  //The ownerElement property returns the element node the attribute is attached to.
				var rt = true;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");
				var x = xmlDoc.getElementsByTagName('book');
				var e01 = x.item(0).attributes[0].ownerElement;
				if((e01.nodeName == "book") && (e01.nodeType == 1)){
					rt = true;
				}
				else{
					rt = false; Assert.isTrue(rt);
				}
				x = xmlDoc.getElementsByTagName('title');
				e01 = x.item(0).attributes[0].ownerElement;
				if ((e01.nodeName == "title") && (e01.nodeType == 1)) {
					rt = true;
				}
				else {
					rt = false; Assert.isTrue(rt);
				}
				Assert.isTrue(rt);
			},

			"specified should be supported by xml dom": function() { //The specified property returns true if the attribute 
										   //value is set in the document, and false if it's a 
										   //default value in a DTD/Schema.
				var rt = false;
				xmlDoc = loadXMLDoc("html5/dom/books.xml");

				x = xmlDoc.getElementsByTagName('book');
				for (i = 0; i < x.length; i++) {
					if (x.item(i).attributes[0].specified == true) {
						rt = true;
					}
					else {
						rt = false; Assert.isTrue(rt);
					}
				}
				Assert.isTrue(rt);
			},

			
		});
		
		return testCases;
	}
})();
