(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;
			
        testCases[0] = new Y.Test.Case({
            name: "blackberry.invoke for AddressBook",
			
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
                    "blackberry.invoke.APP_ADDRESSBOOK should throw an error when trying to VIEW_COMPOSE with a contact" : "Invalid argument.",
					"blackberry.invoke.APP_ADDRESSBOOK should throw an error when trying to VIEW_DISPLAY without contact" : "Invalid argument. Please use one of ARG_COMPOSE or ARG_NEW.",
                }                
            },
						
			"blackberry.invoke.AddressBookArguments should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.AddressBookArguments);
			},
			
			"blackberry.invoke.AddressBookArguments.VIEW_NEW should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.AddressBookArguments.VIEW_NEW);
				Assert.areSame(0, blackberry.invoke.AddressBookArguments.VIEW_NEW);
			},
			
			"blackberry.invoke.AddressBookArguments.VIEW_COMPOSE should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.AddressBookArguments.VIEW_COMPOSE);
				Assert.areSame(1, blackberry.invoke.AddressBookArguments.VIEW_COMPOSE);
			},
			
			"blackberry.invoke.AddressBookArguments.VIEW_DISPLAY should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.AddressBookArguments.VIEW_DISPLAY);
				Assert.areSame(2, blackberry.invoke.AddressBookArguments.VIEW_DISPLAY);
			},			
           	
			//Attempt to pass a contact with VIEW_COMPOSE
			"blackberry.invoke.APP_ADDRESSBOOK should throw an error when trying to VIEW_COMPOSE with a contact": function() {
				try {
					var contact = new blackberry.pim.Contact();
					contact.firstName = "firstName";
					contact.lastName = "lastName";
					var args = new blackberry.invoke.AddressBookArguments(contact);
					args.view = blackberry.invoke.AddressBookArguments.VIEW_COMPOSE;
					blackberry.invoke.invoke(blackberry.invoke.APP_ADDRESSBOOK, args);
				} catch (err) {
					throw new Error(err);
				}
			},
			
			//Attempt to VIEW_DISPLAY without passing a contact
			"blackberry.invoke.APP_ADDRESSBOOK should throw an error when trying to VIEW_DISPLAY without contact" : function() {
				try {
					var args = new blackberry.invoke.AddressBookArguments();
					args.view = blackberry.invoke.AddressBookArguments.VIEW_DISPLAY;
					blackberry.invoke.invoke(blackberry.invoke.APP_ADDRESSBOOK, args);
				} catch (err) {
					throw new Error(err);
				}
			},
			
			//Invoke Addressbook with no contact and VIEW_NEW
			"MANUAL 1 should invoke Address Book with no contact and VIEW_NEW": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be address book opening up with new contact screen");
				
				alert("Will attempt to invoke address book passing empty AddressBookArguments with VIEW_NEW");
				var args = new blackberry.invoke.AddressBookArguments();
                args.view = blackberry.invoke.AddressBookArguments.VIEW_NEW;
                blackberry.invoke.invoke(blackberry.invoke.APP_ADDRESSBOOK, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Addressbook with contact and VIEW_NEW
			"MANUAL 2 should invoke Address Book with contact and VIEW_NEW": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be address book opening up with new contact screen with first name/last name");
				
				alert("Will attempt to invoke address book passing AddressBookArguments with Contact and VIEW_NEW");
				var contact = new blackberry.pim.Contact();
                contact.firstName = "firstName";
                contact.lastName = "lastName";
                var args = new blackberry.invoke.AddressBookArguments(contact);
                args.view = blackberry.invoke.AddressBookArguments.VIEW_NEW;
                blackberry.invoke.invoke(blackberry.invoke.APP_ADDRESSBOOK, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},			
			
			//Invoke Addressbook with no contact and VIEW_COMPOSE
			"MANUAL 3 should invoke Address Book with no contact and VIEW_COMPOSE": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be address book opening up to contact search screen");
				
				alert("Will attempt to invoke address book and empty AddressBookArguments and VIEW_COMPOSE");
				var args = new blackberry.invoke.AddressBookArguments();
                args.view = blackberry.invoke.AddressBookArguments.VIEW_COMPOSE;
                blackberry.invoke.invoke(blackberry.invoke.APP_ADDRESSBOOK, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Addressbook with contact and VIEW_DISPLAY
			"MANUAL 4 should invoke Address Book with contact and VIEW_DISPLAY": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Result should be address book opening up to information of created contact");
				
				alert("Will attempt to invoke address book and pass AddressBookArguments with contact and VIEW_DISPLAY");
				var contact = new blackberry.pim.Contact();
                contact.firstName = "Ruihua";
                contact.lastName = "Han";
                contact.save();
                var args = new blackberry.invoke.AddressBookArguments(contact);
                args.view = blackberry.invoke.AddressBookArguments.VIEW_DISPLAY;
                blackberry.invoke.invoke(blackberry.invoke.APP_ADDRESSBOOK, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
        });

        return testCases;
    }
})();