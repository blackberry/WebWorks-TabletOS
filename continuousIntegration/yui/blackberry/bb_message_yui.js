(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;
		var testMessage;
			
        testCases[0] = new Y.Test.Case({
            name: "blackberry.message.Message Tests",
			
			/*
			 * Message should be testing message, identity and find
			 */
			 
			setUp : function () {
				testMessage = new blackberry.message.Message();
			},
			
			"blackberry.message.Message should exist" : function() {
				Assert.isNotUndefined(blackberry.message.Message);
			},
			
			"blackberry.message.Message.STATUS_UNKNOWN should exist" : function() {
				Assert.isNotUndefined(blackberry.message.Message.STATUS_UNKNOWN);
				Assert.areSame(-1, blackberry.message.Message.STATUS_UNKNOWN);
			},
			
			"blackberry.message.Message.STATUS_SAVED should exist" : function() {
				Assert.isNotUndefined(blackberry.message.Message.STATUS_SAVED);
				Assert.areSame(0, blackberry.message.Message.STATUS_SAVED);
			},
			
			"blackberry.message.Message.STATUS_DRAFT should exist" : function() {
				Assert.isNotUndefined(blackberry.message.Message.STATUS_DRAFT);
				Assert.areSame(1, blackberry.message.Message.STATUS_DRAFT);
			},
			
			"blackberry.message.Message.STATUS_SENT should exist" : function() {
				Assert.isNotUndefined(blackberry.message.Message.STATUS_SENT);
				Assert.areSame(2, blackberry.message.Message.STATUS_SENT);
			},
			
			"blackberry.message.Message.STATUS_ERROR_OCCURED should exist" : function() {
				Assert.isNotUndefined(blackberry.message.Message.STATUS_ERROR_OCCURED);
				Assert.areSame(3, blackberry.message.Message.STATUS_ERROR_OCCURED);
			},
			
			"blackberry.message.Message.PRIORITY_HIGH should exist" : function() {
				Assert.isNotUndefined(blackberry.message.Message.PRIORITY_HIGH);
				Assert.areSame(0, blackberry.message.Message.PRIORITY_HIGH);
			},
			
			"blackberry.message.Message.PRIORITY_MEDIUM should exist" : function() {
				Assert.isNotUndefined(blackberry.message.Message.PRIORITY_MEDIUM);
				Assert.areSame(1, blackberry.message.Message.PRIORITY_MEDIUM);
			},
			
			"blackberry.message.Message.PRIORITY_LOW should exist" : function() {
				Assert.isNotUndefined(blackberry.message.Message.PRIORITY_LOW);
				Assert.areSame(2, blackberry.message.Message.PRIORITY_LOW);
			},
			
			"blackberry.message.Message.FOLDER_INBOX should exist" : function() {
				Assert.isNotUndefined(blackberry.message.Message.FOLDER_INBOX);
				Assert.areSame(0, blackberry.message.Message.FOLDER_INBOX);
			},
			
			"blackberry.message.Message.FOLDER_SENT should exist" : function() {
				Assert.isNotUndefined(blackberry.message.Message.FOLDER_SENT);
				Assert.areSame(1, blackberry.message.Message.FOLDER_SENT);
			},
			
			"blackberry.message.Message.FOLDER_DRAFT should exist" : function() {
				Assert.isNotUndefined(blackberry.message.Message.FOLDER_DRAFT);
				Assert.areSame(2, blackberry.message.Message.FOLDER_DRAFT);
			},
			
			"blackberry.message.Message.FOLDER_OUTBOX should exist" : function() {
				Assert.isNotUndefined(blackberry.message.Message.FOLDER_OUTBOX);
				Assert.areSame(3, blackberry.message.Message.FOLDER_OUTBOX);
			},
			
			"blackberry.message.Message.FOLDER_DELETED should exist" : function() {
				Assert.isNotUndefined(blackberry.message.Message.FOLDER_DELETED);
				Assert.areSame(4, blackberry.message.Message.FOLDER_DELETED);
			},
			
			"blackberry.message.Message.FOLDER_OTHER should exist" : function() {
				Assert.isNotUndefined(blackberry.message.Message.FOLDER_OTHER);
				Assert.areSame(5, blackberry.message.Message.FOLDER_OTHER);
			},
			
			"blackberry.message.Message.bccRecipients should exist" : function() {
				Assert.isNotUndefined(testMessage.bccRecipients);
				Assert.isString(testMessage.bccRecipients);
			},

			"blackberry.message.Message.body should exist" : function() {
				Assert.isNotUndefined(testMessage.body);
				Assert.isString(testMessage.body);
			},
			
			"blackberry.message.Message.ccRecipients should exist" : function() {
				Assert.isNotUndefined(testMessage.ccRecipients);
				Assert.isString(testMessage.ccRecipients);
			},
			
			"blackberry.message.Message.folder should exist" : function() {
				Assert.isNotUndefined(testMessage.folder);
				Assert.isNumber(testMessage.folder);
			},
			
			"blackberry.message.Message.from should exist" : function() {
				Assert.isNotUndefined(testMessage.from);
				Assert.isString(testMessage.from);
			},
			
			"blackberry.message.Message.priority should exist" : function() {
				Assert.isNotUndefined(testMessage.priority);
				Assert.isNumber(testMessage.priority);
			},
			
			"blackberry.message.Message.replyTo should exist" : function() {
				Assert.isNotUndefined(testMessage.replyTo);
				Assert.isString(testMessage.replyTo);
			},
			
			"blackberry.message.Message.status should exist" : function() {
				Assert.isNotUndefined(testMessage.status);
				Assert.isNumber(testMessage.status);
			},
			
			"blackberry.message.Message.subject should exist" : function() {
				Assert.isNotUndefined(testMessage.subject);
				Assert.isString(testMessage.subject);
			},
			
			"blackberry.message.Message.toRecipients should exist" : function() {
				Assert.isNotUndefined(testMessage.toRecipients);
				Assert.isString(testMessage.toRecipients);
			},
			
			"blackberry.message.Message.uid should exist" : function() {
				Assert.isNotUndefined(testMessage.uid);
				Assert.isNumber(testMessage.uid);
			},			
			
			"blackberry.message.Message.remove should exist" : function() {
				Assert.isNotUndefined(testMessage.remove);
			},
			
			"blackberry.message.Message.save should exist" : function() {
				Assert.isNotUndefined(testMessage.save);
			},
			
			"blackberry.message.Message.send should exist" : function() {
				Assert.isNotUndefined(testMessage.send);
			},			
			
			//Create/Save Draft Message
			"blackberry.message.Message.save should create and save a message" : function() {
				var totalMsgs = blackberry.message.Message.find().length;
				var message = new blackberry.message.Message();
                message.toRecipients = "rhan@rim.com";
                message.subject = "[Draft]Functional Testing for Message Class";
                message.body = "[Draft]Hello World";
                message.folder = blackberry.message.Message.FOLDER_DRAFT;
                message.save();
				
				var filter = new blackberry.find.FilterExpression("uid", "==", message.uid);
				var res = blackberry.message.Message.find(filter); 
				
				Assert.isTrue(message.uid != "" && message.uid != undefined);
				Assert.areSame(2, res.length);
				Assert.areSame("[Draft]Functional Testing for Message Class", res[0].subject);
				Assert.areSame("[Draft]Hello World", res[0].body);
				//Assert.areSame(blackberry.message.Message.find().length, totalMsgs + 1);
			},
			
			//Modify Message
			"blackberry.message.Message.save should save an existing message" : function() {
				var message = new blackberry.message.Message();
                message.toRecipients = "rhan@rim.com";
                message.subject = "[Draft]Functional Testing for Message Class";
                message.body = "[Draft]Hello World";
                message.folder = blackberry.message.Message.FOLDER_DRAFT;
                message.save();
				
				message.toRecipients = "penguyen@rim.com";
				message.subject = "Modified Message";
				message.save();
				
				var fe = new blackberry.find.FilterExpression("uid", "==", message.uid);
				var res = blackberry.message.Message.find(fe); //Returns 1 item array
				
				Assert.areSame(2, res.length);
				Assert.areSame(res[0].toRecipients, "penguyen@rim.com");
				Assert.areSame(res[0].subject, "Modified Message");
			},
			
			//Send Message
			"blackberry.message.Message.send should send a message" : function() {
				var message = new blackberry.message.Message();
				message.toRecipients = "penguyen@rim.com";
				message.ccRecipients = "atg08-29@labyyz.testnet.rim.net";
				message.bccRecipients = "atg08-66@labyyz.testnet.rim.net";
				message.priority = blackberry.message.Message.PRIORITY_LOW;         
				message.subject = "Functional Testing for Message Class";
				message.body = "Hello World";
				message.folder = blackberry.message.Message.FOLDER_SENT;         
				message.send();
				
				//This is set to unknown because we don't know if it is sent yet
				Assert.areSame(blackberry.message.Message.STATUS_UNKNOWN, message.status);
				
				//Attempt to find the same message again
				var filter = new blackberry.find.FilterExpression("uid", "==", message.uid);
				var res = blackberry.message.Message.find(filter);
				
				Assert.areSame(1, res.length);
				Assert.areSame("Functional Testing for Message Class", res[0].subject);
				Assert.areSame(blackberry.message.Message.STATUS_SENT, res[0].status);
			},
			
			//Delete Message
			"blackberry.message.Message.remove should delete a message" : function() {				
				var message = new blackberry.message.Message();
                message.toRecipients = "rhan@rim.com";
                message.subject = "[Draft]Functional Testing for Message Class";
                message.body = "[Draft]Hello World";
                message.folder = blackberry.message.Message.FOLDER_DRAFT;
                message.save();
				var totalMsgsBefore = blackberry.message.Message.find().length;
				message.remove(); //For now, this will fail the test case
				
				Assert.areSame(totalMsgsBefore - 2, blackberry.message.Message.find().length);
			},
		
			"blackberry.message.Message.find should find email with subject filter" : function() {			 
				var filter = new blackberry.find.FilterExpression("subject", "==", "test find with filters");
				var found = blackberry.message.Message.find(filter);
				for (var i=0;i < found.length; i++) {
					found[i].remove();
				}
			  
				var msg = new blackberry.message.Message();
				msg.toRecipients = "penguyen@rim.com";
				msg.subject = "test find with filters";
				msg.body = "test";			  
				msg.send();
			  
				if (msg.uid == 0 || msg.uid == -1) {
					Y.Assert.fail("Message was not created due to some error.");
				}
			  
				found = blackberry.message.Message.find(filter);
			  
				Assert.areSame(1, found.length);
				Assert.areSame("test find with filters", found[0].subject);
			  			 
				for (var i=0;i < found.length; i++) {
					found[i].remove();
				}
			},	
			
			"blackberry.message.Message.find should return proper maxReturn emails" : function() {
				var filter = new blackberry.find.FilterExpression("body", "==", "test find");
				var found = blackberry.message.Message.find();
				for (var i=0;i < found.length; i++) {
					found[i].remove();
				}
			  
				var msg = new blackberry.message.Message();
				msg.toRecipients = "rhan@rim.com";
				msg.subject = "test1";
				msg.body = "test find";
				msg.save();
			  
				var msg2 = new blackberry.message.Message();
				msg2.toRecipients = "rhan@rim.com";
				msg2.subject = "test2";
				msg2.body = "test find";
				msg2.save();
			  
				if (msg.uid == 0 || msg.uid == -1) {
					Y.Assert.fail("Message was not created due to some error.");
				}
			  
				found = blackberry.message.Message.find(filter,1);
			  
				Assert.areSame(1, found.length);

				for (var i=0;i < found.length; i++) {
					found[i].remove();
				}
			},	
			
			"blackberry.message.Message.find should be able to use regular expressions" : function() {			  
				var filter = new blackberry.find.FilterExpression("subject", "REGEX", "test[a-zA-Z]*");
				var found = blackberry.message.Message.find(filter);
				for (var i=0;i < found.length; i++) {
					found[i].remove();
				}
			  
				var msg = new blackberry.message.Message();
				msg.toRecipients = "penguyen@rim.com";
				msg.subject = "testingEmail";
				msg.body = "test";
				msg.send();
				
				if (msg.uid == 0 || msg.uid == -1) {
					Y.Assert.fail("Message was not created due to some error.");
				}
			  
				var msg2 = new blackberry.message.Message();
				msg2.toRecipients = "penguyen@rim.com";
				msg2.subject = "testingMessage";
				msg2.body = "test find";
				msg2.send();			 
				
				found = blackberry.message.Message.find(filter);
			  
				Assert.areSame(2, found.length);
			  
				for (var i=0;i < found.length; i++) {
					found[i].remove();
				}
			},	
			
        });

        return testCases;
    }
})();