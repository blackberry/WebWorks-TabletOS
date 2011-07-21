(function() {               
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases["suiteName"] = "XSLT tests";
		
		//-------------------------------------------
		//      help functions:
		//-------------------------------------------

		function loadXMLDoc(dname) {
			if (window.XMLHttpRequest)
			{
				xhttp=new XMLHttpRequest();
			}
			else
			{
				xhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xhttp.open("get",dname,false);
			xhttp.send(null);
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
		
		//---------------------------------------------------------------------
		// XML DOM tests
		//---------------------------------------------------------------------			

		testCases[0] = new Y.Test.Case({
			name: "XSLT Tests",

			setUp : function () {
				//Setup code goes here
				
			},
			 
			tearDown : function () {
				//Teardown code goes here
				
			},

			"xslt select should work" : function() {
				var rt = false;
				var str;
				
				var xml=loadXMLDoc("html5/xslt/cdcatalog.xml");
				var xsl=loadXMLDoc("html5/xslt/select.xsl");
				
				// code for IE
				if (window.ActiveXObject)
				{
					str = xml.transformNode(xsl);
				}
				// code for Mozilla, Firefox, Opera, etc.
				else if (document.implementation && document.implementation.createDocument)
				{
					var xsltProcessor = new XSLTProcessor();
					xsltProcessor.importStylesheet(xsl);
					str = xsltProcessor.transformToFragment(xml,document);
					
					try{
						str = str.childNodes[0].getElementsByTagName("body")[0].childNodes[0].nodeValue;
					}catch(err){
						str = str.childNodes[0]. nodeValue;
					}
				}

				if(str == "Empire BurlesqueBob Dylan"){
					rt = true;
				}
				Assert.isTrue(rt);
			},

			"xslt sort should work" : function() {
				var rt = false;
				var str;
				
				var xml=loadXMLDoc("html5/xslt/cdcatalog.xml");
				var xsl=loadXMLDoc("html5/xslt/sort.xsl");
				// code for IE
				
				if (window.ActiveXObject)
				{
					str = xml.transformNode(xsl);
				}
				// code for Mozilla, Firefox, Opera, etc.
				else if (document.implementation && document.implementation.createDocument)
				{
					var xsltProcessor = new XSLTProcessor();
					xsltProcessor.importStylesheet(xsl);
					str = xsltProcessor.transformToFragment(xml,document);
					try{
						str = str.childNodes[0].getElementsByTagName("body")[0].childNodes[0].nodeValue;
					}catch(err){
						str = str.childNodes[0]. nodeValue;
					}
				}

				if(str == "Andrea BocelliBee GeesBob DylanBonnie TylerCat StevensDolly PartonDr.HookEros RamazzottiGary MooreJoe CockerJorn HoelKenny RogersKim LarsenLuciano PavarottiManyOtis ReddingPercy SledgeRod StewartSam BrownSavage RoseSimply RedT`PauThe CommunardsTina TurnerVan MorrisonWill Smith"){
					rt = true;
				}
				Assert.isTrue(rt);
			},

			"xslt if should work" : function() {
				var rt = false;
				var str;
				
				var xml=loadXMLDoc("html5/xslt/cdcatalog.xml");
				var xsl=loadXMLDoc("html5/xslt/ifx.xsl");
				// code for IE
				
				if (window.ActiveXObject)
				{
					str = xml.transformNode(xsl);
				}
				// code for Mozilla, Firefox, Opera, etc.
				else if (document.implementation && document.implementation.createDocument)
				{
					var xsltProcessor = new XSLTProcessor();
					xsltProcessor.importStylesheet(xsl);
					str = xsltProcessor.transformToFragment(xml,document);
					try{
						str = str.childNodes[0].getElementsByTagName("body")[0].childNodes[0].nodeValue;
					}catch(err){
						str = str.childNodes[0]. nodeValue;
					}
				}

				if(str == "Empire BurlesqueBob DylanStill got the bluesGary MooreOne night onlyBee GeesRomanzaAndrea BocelliBlack angelSavage Rose1999 Grammy NomineesMany"){
					rt = true;
				}
				Assert.isTrue(rt);
			},

			"xslt applyTemplates should work" : function() {
				var rt = false;
				var str;
				var len = 0;
				
				var xml=loadXMLDoc("html5/xslt/cdcatalog.xml");
				var xsl=loadXMLDoc("html5/xslt/applyTemplates02.xsl");
				// code for IE
				
				if (window.ActiveXObject)
				{
					str = xml.transformNode(xsl);
				}
				// code for Mozilla, Firefox, Opera, etc.
				else if (document.implementation && document.implementation.createDocument)
				{
					var xsltProcessor = new XSLTProcessor();
					xsltProcessor.importStylesheet(xsl);
					str = xsltProcessor.transformToFragment(xml,document);
					try{
					len = str.childNodes[0].getElementsByTagName("span").length;
					str = str.childNodes[0].getElementsByTagName("span")[51].childNodes[0].nodeValue;
					}catch(err){
						str = str.childNodes[103].childNodes[0].nodeValue;
					}
				}
				
				if(str == "Joe Cocker"){
					rt = true;
				}
				Assert.isTrue(rt);
			},

			"xslt foreach should work" : function() {
				var rt = false;
				var str;
				var len = 0;
				
				var xml=loadXMLDoc("html5/xslt/cdcatalog.xml");
				var xsl=loadXMLDoc("html5/xslt/foreach.xsl");
				// code for IE
				
				if (window.ActiveXObject)
				{
					str = xml.transformNode(xsl);
				}
				// code for Mozilla, Firefox, Opera, etc.
				else if (document.implementation && document.implementation.createDocument)
				{
					var xsltProcessor = new XSLTProcessor();
					xsltProcessor.importStylesheet(xsl);
					str = xsltProcessor.transformToFragment(xml,document);
					try{
						str = str.childNodes[0].getElementsByTagName("body")[0].childNodes[0].nodeValue;
					}catch(err){
						str = str.childNodes[0]. nodeValue;
					}
				}
				
				if(str == "Empire BurlesqueBob DylanHide your heartBonnie TylerGreatest HitsDolly PartonStill got the bluesGary MooreErosEros RamazzottiOne night onlyBee GeesSylvias MotherDr.HookMaggie MayRod StewartRomanzaAndrea BocelliWhen a man loves a womanPercy SledgeBlack angelSavage Rose1999 Grammy NomineesManyFor the good timesKenny RogersBig Willie styleWill SmithTupelo HoneyVan MorrisonSoulsvilleJorn HoelThe very best ofCat StevensStopSam BrownBridge of SpiesT`PauPrivate DancerTina TurnerMidt om nattenKim LarsenPavarotti Gala ConcertLuciano PavarottiThe dock of the bayOtis ReddingPicture bookSimply RedRedThe CommunardsUnchain my heartJoe Cocker"){
					rt = true;
				}
				Assert.isTrue(rt);
			},

			

		});
		
		return testCases;
	}
})();
