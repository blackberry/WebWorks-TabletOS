(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;
		var contactTest;
			
        testCases[0] = new Y.Test.Case({
            name: "blackberry.pim.Contact Tests",
			
			setUp : function () {
				contactTest = new blackberry.pim.Contact();
			
				//Order is a stack, last object will appear first in DOM
				//framework.setupFailButton();
				//framework.setupPassButton();
				//framework.setupInstructions();
				
				/*
				function handlePicture(fullPath, blobData) {
					try { 
						contactPic.setPicture(blobData);
					} catch (err) {
						alert(err);
					}
				}
				*/
			},
			
			tearDown : function () {
				//framework.tearDownFailButton();
				//framework.tearDownPassButton();
				//framework.tearDownInstructions();
			},
			
			/*
			 * Contact should be testing Contact, Address and find
			 */
			
			"blackberry.pim.Contact should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Contact);
			},
			
			"blackberry.pim.Contact.anniversary should exist" : function() {
				Assert.isNotUndefined(contactTest.anniversary);
			},
			
			"blackberry.pim.Contact.birthday should exist" : function() {
				Assert.isNotUndefined(contactTest.birthday);
			},
			
			"blackberry.pim.Contact.categories should exist" : function() {
				Assert.isNotUndefined(contactTest.categories);
			},
			
			"blackberry.pim.Contact.company should exist" : function() {
				Assert.isNotUndefined(contactTest.company);
				Assert.isString(contactTest.company);
			},
			
			"blackberry.pim.Contact.email1 should exist" : function() {
				Assert.isNotUndefined(contactTest.email1);
				Assert.isString(contactTest.email1);
			},
			
			"blackberry.pim.Contact.email2 should exist" : function() {
				Assert.isNotUndefined(contactTest.email2);
				Assert.isString(contactTest.email2);
			},
			
			"blackberry.pim.Contact.email3 should exist" : function() {
				Assert.isNotUndefined(contactTest.email3);
				Assert.isString(contactTest.email3);
			},
			
			"blackberry.pim.Contact.faxPhone should exist" : function() {
				Assert.isNotUndefined(contactTest.faxPhone);
				Assert.isString(contactTest.faxPhone);
			},
			
			"blackberry.pim.Contact.firstName should exist" : function() {
				Assert.isNotUndefined(contactTest.firstName);
				Assert.isString(contactTest.firstName);
			},
			
			"blackberry.pim.Contact.homeAddress should exist" : function() {
				Assert.isNotUndefined(contactTest.homeAddress);
			},
			
			"blackberry.pim.Contact.homePhone should exist" : function() {
				Assert.isNotUndefined(contactTest.homePhone);
				Assert.isString(contactTest.homePhone);
			},
			
			"blackberry.pim.Contact.homePhone2 should exist" : function() {
				Assert.isNotUndefined(contactTest.homePhone2);
				Assert.isString(contactTest.homePhone2);
			},
			
			"blackberry.pim.Contact.jobTitle should exist" : function() {
				Assert.isNotUndefined(contactTest.jobTitle);
				Assert.isString(contactTest.jobTitle);
			},
			
			"blackberry.pim.Contact.lastName should exist" : function() {
				Assert.isNotUndefined(contactTest.lastName);
				Assert.isString(contactTest.lastName);
			},
			
			"blackberry.pim.Contact.mobilePhone should exist" : function() {
				Assert.isNotUndefined(contactTest.mobilePhone);
				Assert.isString(contactTest.mobilePhone);
			},
			
			"blackberry.pim.Contact.note should exist" : function() {
				Assert.isNotUndefined(contactTest.note);
				Assert.isString(contactTest.note);
			},
			
			"blackberry.pim.Contact.otherPhone should exist" : function() {
				Assert.isNotUndefined(contactTest.otherPhone);
				Assert.isString(contactTest.otherPhone);
			},
			
			"blackberry.pim.Contact.pagerPhone should exist" : function() {
				Assert.isNotUndefined(contactTest.pagerPhone);
				Assert.isString(contactTest.pagerPhone);
			},
			
			"blackberry.pim.Contact.picture should exist" : function() {
				Assert.isNotUndefined(contactTest.picture);
				Assert.isString(contactTest.picture);
			},
			
			"blackberry.pim.Contact.pin should exist" : function() {
				Assert.isNotUndefined(contactTest.pin);
				Assert.isString(contactTest.pin);
			},
			
			"blackberry.pim.Contact.title should exist" : function() {
				Assert.isNotUndefined(contactTest.title);
				Assert.isString(contactTest.title);
			},
			
			"blackberry.pim.Contact.uid should exist" : function() {
				Assert.isNotUndefined(contactTest.uid);
				Assert.isString(contactTest.uid);
			},
			
			"blackberry.pim.Contact.user1 should exist" : function() {
				Assert.isNotUndefined(contactTest.user1);
				Assert.isString(contactTest.user1);
			},
			
			"blackberry.pim.Contact.user2 should exist" : function() {
				Assert.isNotUndefined(contactTest.user2);
				Assert.isString(contactTest.user2);
			},
			
			"blackberry.pim.Contact.user3 should exist" : function() {
				Assert.isNotUndefined(contactTest.user3);
				Assert.isString(contactTest.user3);
			},
			
			"blackberry.pim.Contact.user4 should exist" : function() {
				Assert.isNotUndefined(contactTest.user4);
				Assert.isString(contactTest.user4);
			},
			
			"blackberry.pim.Contact.webpage should exist" : function() {
				Assert.isNotUndefined(contactTest.webpage);
				Assert.isString(contactTest.webpage);
			},
			
			"blackberry.pim.Contact.workAddress should exist" : function() {
				Assert.isNotUndefined(contactTest.workAddress);
			},
			
			"blackberry.pim.Contact.workPhone should exist" : function() {
				Assert.isNotUndefined(contactTest.workPhone);
				Assert.isString(contactTest.workPhone);
			},
			
			"blackberry.pim.Contact.workPhone2 should exist" : function() {
				Assert.isNotUndefined(contactTest.workPhone2);
				Assert.isString(contactTest.workPhone2);
			},
			
			//Create/Save Contact
			"blackberry.pim.Contact.save should create and save a contact" : function() {
				var totalContacts = blackberry.pim.Contact.find().length;
				var contactObj = new blackberry.pim.Contact();           
				
				var date1 = new Date();
				date1.setFullYear(2008, 5, 5);
				contactObj.anniversary = date1;

				var date2 = new Date();
				date2.setFullYear(1979, 1, 1);				
				contactObj.birthday = date2;
				
				contactObj.company = "RIM";    
				contactObj.email1 = "rhan@rim.com";
				contactObj.email2 = "email2@rim.com";
				contactObj.email3 = "email3@rim.com";
				contactObj.faxPhone = "905-629-4869";
				contactObj.firstName = "Ruihua";
				contactObj.lastName = "Han";
				contactObj.homeAddress = new blackberry.pim.Address();
				contactObj.homeAddress.country = "CA";
				contactObj.homeAddress.city = "Scarborough";
				contactObj.homeAddress.address1 = "UTSC";
				contactObj.homeAddress.address2 = "UT";
				contactObj.homeAddress.stateProvince = "ON";
				contactObj.homeAddress.zipPostal = "M5H3E4";       
				contactObj.homePhone = "647-297-6303";
				contactObj.homePhone2 = "647-297-6303";
				contactObj.jobTitle = "Software Tester";
				contactObj.mobilePhone = "647-297-6303";
				contactObj.note = "sample note";
				contactObj.otherPhone = "647-000-0000";
				contactObj.pagerPhone = "6470001000";
				contactObj.pin = "20632E83";
				contactObj.title = "Mr.";
				contactObj.user1 = "sample user1";
				contactObj.user2 = "sample user2";
				contactObj.user3 = "sample user3";
				contactObj.user4 = "sample user4";
				contactObj.webpage = "www.rim.com";
				contactObj.workAddress = new blackberry.pim.Address();
				contactObj.workAddress.country = "CA";
				contactObj.workAddress.city = "Mississagua";
				contactObj.workAddress.address1 = "Commerce";
				contactObj.workAddress.address2 = "Tahoe";
				contactObj.workAddress.stateProvince = "ON";
				contactObj.workAddress.zipPostal = "L4W5P3";                        
				contactObj.workPhone = "(905) 629-4746";
				contactObj.workPhone2 = "(905) 629-4746 ext. 15562";
				contactObj.save();
				
				Assert.isTrue(contactObj.uid != "" && contactObj.uid != undefined);
				Assert.areSame(totalContacts + 1, blackberry.pim.Contact.find().length);
			},
			
			//Modify Contact
			"blackberry.pim.Contact.save should save and existing contact" : function() {
				var c = new blackberry.pim.Contact();
                c.firstName = "Tom";
				c.lastName = "Sawyer";
                c.save();
				
                c.firstName = "Mike";
				c.lastName = "Chen";
				c.save();
				
				var fe = new blackberry.find.FilterExpression("uid", "==", c.uid);
				var res = blackberry.pim.Contact.find(fe); //Returns 1 item array
				
				Assert.areSame(1, res.length);
				Assert.areSame("Mike", res[0].firstName);
				Assert.areSame("Chen", res[0].lastName);
			},				
		
			//Delete Contact
			"blackberry.pim.Contact.remove should deleting an existing contact" : function() {
				var c = new blackberry.pim.Contact();
                c.firstName = "Tom";
				c.lastName = "Sawyer";
                c.save();
				var totalContactsBefore = blackberry.pim.Contact.find().length;			
				c.remove();
			
				Assert.areSame(totalContactsBefore - 1, blackberry.pim.Contact.find().length);
			},
		
			//Create Contact with Address object (homeAddress)
			"blackberry.pim.Contact.homeAddress should be able to hold nested elements" : function() {
				var c = new blackberry.pim.Contact();
				var homeAdd = new blackberry.pim.Address();
				homeAdd.city = "Toronto";
				homeAdd.country = "CA";
				homeAdd.zipPostal = "L4J1C5";
				c.homeAddress = homeAdd;
				
				Assert.isNotUndefined(c.homeAddress);
				Assert.areSame("Toronto", c.homeAddress.city);
				Assert.areSame("CA", c.homeAddress.country);
				Assert.areSame("L4J1C5", c.homeAddress.zipPostal);
			},
		
			//Create Contact with Address object (workAddress)
			"blackberry.pim.Contact.workAddress should be able to hold nested elements" : function() {
				var c = new blackberry.pim.Contact();
				var workAdd = new blackberry.pim.Address();
				workAdd.city = "Mississauga";
				workAdd.country = "CA";
				workAdd.zipPostal = "M3A4H6";
				c.workAddress = workAdd;
				
				Assert.isNotUndefined(c.workAddress);
				Assert.areSame("Mississauga", c.workAddress.city);
				Assert.areSame("CA", c.workAddress.country);
				Assert.areSame("M3A4H6", c.workAddress.zipPostal);
			},
		
			//find Contacts
			"blackberry.pim.Contact.find should find with filters" : function() {
				var found = blackberry.pim.Contact.find();
				for (var i = 0; i < found.length; i++) {
					if (found[i].jobTitle == "Secret Agent")
						found[i].remove();
				}
			
				var contact1 = new blackberry.pim.Contact();							  
				contact1.firstName = "Tom123";
				contact1.lastName = "Cruise";
				contact1.jobTitle = "Secret Agent";			   
				contact1.save();
				
				Assert.isNotUndefined(contact1);			  
				Assert.isFalse(contact1.uid == "" || contact1.uid == null);
			   
				var contact2 = new blackberry.pim.Contact();			   
				contact2.firstName = "Tom123";
				contact2.lastName = "Hanks";
				contact2.jobTitle = "Secret Agent";			   
				contact2.save();
			   
				Assert.isNotUndefined(contact2.uid);			  
				Assert.isFalse(contact2.uid == "" || contact2.uid == null);
			
				var firstName_filter = new blackberry.find.FilterExpression("firstName", "==", "Tom123");	
				var jobTitle_filter = new blackberry.find.FilterExpression("jobTitle", "==", "Secret Agent");	
				var AND1 = new blackberry.find.FilterExpression(firstName_filter, "AND", jobTitle_filter);			   
				var contacts = blackberry.pim.Contact.find(AND1);
			   
				Assert.areSame(2, contacts.length);
				
				contact1.remove();
				contact2.remove();
			},
			
			"blackberry.pim.Contact.find should find with nested fields" : function() {
				var found = blackberry.pim.Contact.find();
				for (var i = 0; i < found.length; i++) {
					if (found[i].jobTitle == "Secret Agent")
						found[i].remove();
				}
				
				var contact1 = new blackberry.pim.Contact();
				contact1.firstName = "Tom123";
				contact1.lastName = "Cruise";
				contact1.jobTitle = "Secret Agent";			   			   
				var address = new blackberry.pim.Address();
				address.city = "Mississauga123";
				address.country = "Canada";
				contact1.workAddress = address;    			   
				contact1.save();
			   
				Assert.isNotUndefined(contact1);
				Assert.isFalse(contact1.uid == "" || contact1.uid == null);
			   
				var contact2 = new blackberry.pim.Contact();
				contact2.firstName = "Tom123";
				contact2.lastName = "Hanks";
				contact2.jobTitle = "Secret Agent";
				var address2 = new blackberry.pim.Address();
				address2.city = "Toronto123";
				address2.country = "Canada";
				contact2.homeAddress = address2;
				contact2.save();
			
				var address_filter = new blackberry.find.FilterExpression("workAddress.city", "==", "Mississauga123");	
				var address_filter2 = new blackberry.find.FilterExpression("homeAddress.city", "==", "Toronto123");	
				var OR_filter = new blackberry.find.FilterExpression(address_filter,"OR",address_filter2);
				var contacts = blackberry.pim.Contact.find(OR_filter);
				
				Assert.areSame(2,  contacts.length);
				
				contact1.remove();
				contact2.remove();
			},
			
			"blackberry.pim.Contact.find should return with MaxReturn set" : function() {
				var found = blackberry.pim.Contact.find();
				for (var i = 0; i < found.length; i++) {
					if (found[i].firstName == "Will123")
						found[i].remove();
				}
				
				var contact1 = new blackberry.pim.Contact();
				contact1.firstName = "Will123";
				contact1.firstName = "Smith123";			   
				contact1.save();
			   
				Assert.isNotUndefined(contact1);
				Assert.isFalse(contact1.uid == "" || contact1.uid == undefined);
			   
				var contact2 = new blackberry.pim.Contact();
				contact2.firstName = "Will123";
				contact2.save();
				
				Assert.isNotUndefined(contact2);
				Assert.isFalse(contact2.uid == "" || contact2.uid == undefined);
				
				var fe = new blackberry.find.FilterExpression("firstName", "==", "Will123");				   
				var contacts = blackberry.pim.Contact.find(fe,null,1);  
				
				Assert.areSame(1, contacts.length);
				
				contact1.remove();
				contact2.remove();			   
			},
			
			"blackberry.pim.Contact.find should find with negation" : function() {				
				var found = blackberry.pim.Contact.find();
				for (var i = 0; i < found.length; i++) {
					if (found[i].jobTitle == "Secret Agent")
						found[i].remove();
				}
				
				var c1 = new blackberry.pim.Contact();
				c1.firstName = "a1";
				c1.lastName = "a1";
				c1.save();

				var c2 = new blackberry.pim.Contact();
				c2.firstName = "b1";
				c2.save();

				var c3 = new blackberry.pim.Contact();
				c3.firstName = "c1";
				c3.save();

				var c4 = new blackberry.pim.Contact();
				c4.firstName = "d1";
				c4.save();

				var c5 = new blackberry.pim.Contact();
				c5.firstName = "e1";
				c5.save();

				var filter1 = new blackberry.find.FilterExpression("firstName", "!=", "a1",true);
				var filter2 = new blackberry.find.FilterExpression("jobTitle","==","TESTING");
				var filter = new blackberry.find.FilterExpression(filter1,"OR",filter2);
				var res = blackberry.pim.Contact.find(filter,"firstName",5,null,true);

				Assert.areSame(1, res.length);
               
				c1.remove();
				c2.remove();
				c3.remove();
				c4.remove();
				c5.remove();                                          
			},
			
			"blackberry.pim.Contact.find should find and sort in ascending order" : function() {
				var filter1 = new blackberry.find.FilterExpression("firstName", "REGEX", "[a-z]222");
				var found = blackberry.pim.Contact.find(filter1);
				for (var i = 0; i < found.length; i++) {
					found[i].remove();
				}
				
				var c1 = new blackberry.pim.Contact();
				c1.firstName = "a222";
				c1.lastName = "a2";
				c1.save();

				var c2 = new blackberry.pim.Contact();
				c2.firstName = "b222";
				c2.save();

				var c3 = new blackberry.pim.Contact();
				c3.firstName = "c222";
				c3.save();

				var c4 = new blackberry.pim.Contact();
				c4.firstName = "d222";
				c4.save();

				var c5 = new blackberry.pim.Contact();
				c5.firstName = "e222";
				c5.save();
            
				var res = blackberry.pim.Contact.find(filter1,"firstName",5,null,true);

				c1.remove();
				c2.remove();
				c3.remove();
				c4.remove();
				c5.remove();
                
				Assert.areSame(5, res.length);
				Assert.areSame("a222", res[0].firstName);
				Assert.areSame("b222", res[1].firstName);
				Assert.areSame("c222", res[2].firstName);
				Assert.areSame("d222", res[3].firstName);
				Assert.areSame("e222", res[4].firstName);
			},
			
			"blackberry.pim.Contact.find should find using regular expressions" : function() {
				var filter1 = new blackberry.find.FilterExpression("firstName", "REGEX", "[a-z]222");
				var found = blackberry.pim.Contact.find(filter1);
				for (var i = 0; i < found.length; i++) {
					found[i].remove();
				}
				
				var c1 = new blackberry.pim.Contact();
				c1.firstName = "a222";
				c1.lastName = "a2";
				c1.save();

				var c2 = new blackberry.pim.Contact();
				c2.firstName = "b222";
				c2.save();

				var c3 = new blackberry.pim.Contact();
				c3.firstName = "c222";
				c3.save();

				var c4 = new blackberry.pim.Contact();
				c4.firstName = "d222";
				c4.save();

				var c5 = new blackberry.pim.Contact();
				c5.firstName = "e222";
				c5.save();
            
				var res = blackberry.pim.Contact.find(filter1,"firstName",5,null,false);

				c1.remove();
				c2.remove();
				c3.remove();
				c4.remove();
				c5.remove();
                
				Assert.areSame(5, res.length);
				Assert.areSame("e222", res[0].firstName);
				Assert.areSame("d222", res[1].firstName);
				Assert.areSame("c222", res[2].firstName);
				Assert.areSame("b222", res[3].firstName);
				Assert.areSame("a222", res[4].firstName);
			},
			
			
			/*
			//setPicture for Contact
			"Manual Test 1: blackberry.pim.Contact.picture should be set and seen from the contact screen" : function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Check the picture for contact: Test Contact and see if there is a picture.  If so, pass.  Otherwise, fail.");
				
				//Set local picture here...
				alert("This is a picture test that grabs a picture called 1.jpg from the local SDCard.");
				var contactPic = new blackberry.pim.Contact();
				var path = "file:///SDCard/1.jpg";
				if (blackberry.io.file.exists(path)) {
                    blackberry.io.file.readFile(path,handlePicture,true);                 
                } else {
                    alert("Skipped: picture does not exists");
                }
				
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},*/
	
        });
        
        return testCases;
    }
})();