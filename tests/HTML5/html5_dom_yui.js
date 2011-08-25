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

			"prefix should work properly on the xml dom" : function xml_dom_prefix() {
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

			"isSameNode should be supported by xml dom" : function xml_dom_isSameNode() {
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
