(function() {  
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		
		testCases["suiteName"] = "blackberry.ui.menu TestSuite"; 
	
		testCases[0] = new Y.Test.Case({
			name: "blackberry.ui.menu Test",
			
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


			"blackberry.ui.menu should exist": function() {
				Assert.isNotUndefined(blackberry.ui.menu);
			},
			 
			"blackberry.ui.menu.clearMenuItems should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.ui.menu.clearMenuItems );
			},
			
			"blackberry.ui.menu.getMenuItems should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.ui.menu.getMenuItems );
			},
			
			"blackberry.ui.menu.hasMenuItem should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.ui.menu.hasMenuItem );
			},
			
			"blackberry.ui.menu.open should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.ui.menu.open );
			},
			
			"blackberry.ui.menu.removeMenuItem should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.ui.menu.removeMenuItem );
			},
			
			"blackberry.ui.menu.setDefaultMenuItem should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.ui.menu.setDefaultMenuItem );
			},
			
			"blackberry.ui.menu.MenuItem should exist and is constructor": function() {
				Assert.isNotUndefined(blackberry.ui.menu.MenuItem );
            },
			
			"blackberry.ui.menu.menuItem(Constructor)should create a new menuItem object": function() {
				var item = new blackberry.ui.menu.MenuItem(false, 3, "Ordinal", function(){alert("Ordinal Menu Added");});
                Assert.areSame( item.isSeparator, false );
			},

			 "blackberry.ui.menu.hasMenuItem should return boolean": function() {
                var tempItem = new blackberry.ui.menu.MenuItem(false, 6, "Temp Item");
                blackberry.ui.menu.addMenuItem(tempItem);
                var result = blackberry.ui.menu.hasMenuItem(tempItem);
                Assert.areSame( result, true );
            },
			"MANUAL blackberry.ui.menu.caption should exist and is String and read/write": function() {
				framework.test = this;
				framework.setInstructions( "If (World) menuitem shows in menu, please Pass this test if this is true.  Otherwise, fail.");
				var item = new blackberry.ui.menu.MenuItem(false, 1, "Hello", function(){alert("Hello Menu Added");});
                blackberry.ui.menu.addMenuItem(item);
                item.caption = "World"
                Assert.areSame( item.caption, "World" );
   		    	framework.test.wait(24*60*60*1000);
			},
			
			"MANUAL blackberry.ui.menu.isDefault should exist and is readonly": function() {
				framework.test = this;
				framework.setInstructions( "If (DefaultItem) menuitem highlighted, please Pass this test if this is true.  Otherwise, fail.");
				var item = new blackberry.ui.menu.MenuItem(false, 2, "DefaultItem", function(){alert("DefaultItem Menu Added");});
                blackberry.ui.menu.addMenuItem(item);
                blackberry.ui.menu.setDefaultMenuItem(item);
                var result = item.isDefault;
                Assert.isBoolean( result );
                item.isDefault = !result;
                Assert.areSame( item.isDefault, result);
                framework.test.wait(24*60*60*1000);
			},

            "MANUAL blackberry.ui.menu.isSeparator should exist and is readonly": function() {
				framework.test = this;
				framework.setInstructions( "If (Separator) shows up, please Pass this test if this is true.  Otherwise, fail.");
				var item = new blackberry.ui.menu.MenuItem( true, 3, "Seprator" );
                blackberry.ui.menu.addMenuItem(item);
                var result = item.isSeparator;
                alert(result + " isSeparator" );
                Assert.areSame( result, true );
                item.isSeparator = !result;
                alert(item.isSeparator + " changed");
                Assert.areSame( item.isSeparator, result);
                framework.test.wait(24*60*60*1000);
			},

            "MANUAL blackberry.ui.menu.ordinal should exist and is Number and read/write": function() {
				framework.test = this;
				framework.setInstructions( "If (Ordinal) menuitem shows in menu, please Pass this test if this is true.  Otherwise, fail.");
				var item = new blackberry.ui.menu.MenuItem(false, 0, "Ordinal", function(){alert("Ordinal Menu Added");});
                blackberry.ui.menu.addMenuItem(item);
                item.ordinal = 4;
                Assert.areSame( item.ordinal, 4 );
   		    	framework.test.wait(24*60*60*1000);
			},

            
			     
            "MANUAL blackberry.ui.menu.addmenuItem should add a new menuItem": function() {
                framework.test = this;
				framework.setInstructions( "If (Click Item1) menuitem shows in menu, please Pass this test if this is true.  Otherwise, fail.");
    			var newitem1 = new blackberry.ui.menu.MenuItem(false, 1, "Click Item1", function(){alert("Click Item1 added");});
                blackberry.ui.menu.addMenuItem(newitem1);
                var newitem2 = new blackberry.ui.menu.MenuItem(false, 2, "Click Item2");
                blackberry.ui.menu.addMenuItem(newitem2);
                itemTobeRemoved = new blackberry.ui.menu.MenuItem(false, 3, "To be removed");
                blackberry.ui.menu.addMenuItem(itemTobeRemoved);
                framework.test.wait(24*60*60*1000);
            },
            
            "MANUAL blackberry.ui.menu.getmenuItems should return a list of menuItems": function() {
                framework.test = this;
				framework.setInstructions( "If pops up a list of menuitem, please Pass this test if this is true.  Otherwise, fail.");
				var menuItemArray = blackberry.ui.menu.getMenuItems();
				alert("The length of menuItemArray is " + menuItemArray.length);
				var i = 0;
				var textMsg = menuItemArray.length + " menu items: \n\n";
				for (i = 0; i < menuItemArray.length; i++) {
					textMsg += "Caption : " + menuItemArray[i].caption + "\n";
					textMsg += "Ordinal : " + menuItemArray[i].ordinal + "\n";
					textMsg += "isDefault : " + menuItemArray[i].isDefault + "\n";
					textMsg += "isSeparator : " + menuItemArray[i].isSeparator + "\n";
					textMsg += "\n";
				}
				alert(textMsg);
				framework.test.wait(24*60*60*1000);
            },
            
            "MANUAL blackberry.ui.menu.open should open all customized menu in a window": function() {
                framework.test = this;
                blackberry.ui.menu.open();
   				framework.setInstructions( "if there is menu pop-up window, Pass this test if this is true.  Otherwise, fail.");
                framework.test.wait(24*60*60*1000);
            },
            
            "MANUAL blackberry.ui.menu.removeMenuItem should remove specified menuitem": function() {
                framework.test = this;
				framework.setInstructions( "Item To be removed doesn, Pass this test if this is true.  Otherwise, fail.");
                blackberry.ui.menu.removeMenuItem(itemTobeRemoved);
                framework.test.wait(24*60*60*1000);
            },
            

            "MANUAL blackberry.ui.menu.clearmenuItems should clear all customized menuitems": function() {
                framework.test = this;
				framework.setInstructions( "if there is no menu items, Pass this test if this is true.  Otherwise, fail.");
                blackberry.ui.menu.clearMenuItems();
                alert("please check menu items");
                framework.test.wait(24*60*60*1000);
            },
			
            
       
 
		});
		
		return testCases;
}
	
})();
