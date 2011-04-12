(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;
		var taskTest;
			
        testCases[0] = new Y.Test.Case({
            name: "blackberry.pim.Task Tests",
			
			/*
			 * Tasks should be testing Task, Recurrence, Reminder and find
			 */
			
			setUp : function () {
				taskTest = new blackberry.pim.Task();
			},
			
			"blackberry.pim.Task should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Task);
			},
			
			"blackberry.pim.Task.NOT_STARTED should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Task.NOT_STARTED);
				Assert.areSame(0, blackberry.pim.Task.NOT_STARTED);
			},
			
			"blackberry.pim.Task.IN_PROGRESS should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Task.IN_PROGRESS);
				Assert.areSame(1, blackberry.pim.Task.IN_PROGRESS);
			},
			
			"blackberry.pim.Task.COMPLETED should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Task.COMPLETED);
				Assert.areSame(2, blackberry.pim.Task.COMPLETED);
			},
			
			"blackberry.pim.Task.WAITING should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Task.WAITING);
				Assert.areSame(3, blackberry.pim.Task.WAITING);
			},
			
			"blackberry.pim.Task.DEFERRED should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Task.DEFERRED);
				Assert.areSame(4, blackberry.pim.Task.DEFERRED);
			},
			
			"blackberry.pim.Task.PRIORITY_HIGH should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Task.PRIORITY_HIGH);
				Assert.areSame(0, blackberry.pim.Task.PRIORITY_HIGH);
			},
			
			"blackberry.pim.Task.PRIORITY_NORMAL should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Task.PRIORITY_NORMAL);
				Assert.areSame(1, blackberry.pim.Task.PRIORITY_NORMAL);
			},
			
			"blackberry.pim.Task.PRIORITY_LOW should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Task.PRIORITY_LOW);
				Assert.areSame(2, blackberry.pim.Task.PRIORITY_LOW);
			},
			
			"blackberry.pim.Task.categories should exist" : function() {
				Assert.isNotUndefined(taskTest.categories);
			},
			
			"blackberry.pim.Task.due should exist" : function() {
				Assert.isNotUndefined(taskTest.due);
			},
			
			"blackberry.pim.Task.note should exist" : function() {
				Assert.isNotUndefined(taskTest.note);
				Assert.isString(taskTest.note)
			},
			
			"blackberry.pim.Task.priority should exist" : function() {
				Assert.isNotUndefined(taskTest.priority);
				Assert.isNumber(taskTest.priority);
			},
			
			"blackberry.pim.Task.recurrence should exist" : function() {
				Assert.isNotUndefined(taskTest.recurrence);
			},
			
			"blackberry.pim.Task.reminder should exist" : function() {
				Assert.isNotUndefined(taskTest.reminder);
			},
			
			"blackberry.pim.Task.status should exist" : function() {
				Assert.isNotUndefined(taskTest.status);
				Assert.isNumber(taskTest.status);
			},
			
			"blackberry.pim.Task.summary should exist" : function() {
				Assert.isNotUndefined(taskTest.summary);
				Assert.isString(taskTest.summary);
			},
			
			"blackberry.pim.Task.uid should exist" : function() {
				Assert.isNotUndefined(taskTest.uid);
				Assert.isString(taskTest.uid);
			},			
			
			//Create/Save a task
			"blackberry.pim.Task.save should create and save a task" : function() {
				var totalTasks = blackberry.pim.Task.find().length;
				var task = new blackberry.pim.Task();
				task.summary = "Task Summary";
				task.note = "Task Note";
				task.status = blackberry.pim.Task.IN_PROGRESS;
				task.priority = blackberry.pim.Task.PRIORITY_HIGH;
				task.save();
				
				Assert.isTrue(task.uid != "" && task.uid != undefined);
				Assert.areSame(totalTasks + 1, blackberry.pim.Task.find().length);
			},
			
			//Modify a task
			"blackberry.pim.Task.save should modify and save an existing task" : function() {
				var task = new blackberry.pim.Task();
				task.summary = "Task Summary";
				task.note = "Task Note";
				task.status = blackberry.pim.Task.IN_PROGRESS;
				task.priority = blackberry.pim.Task.PRIORITY_HIGH;
				task.save();
				
				task.summary = "Modified Task Summary";
				task.note = "Modified Task Note";
				task.save();
				
				var fe = new blackberry.find.FilterExpression("uid", "==", task.uid);
				var res = blackberry.pim.Task.find(fe); //Returns 1 item array
				
				Assert.areSame(res.length, 1);
				Assert.areSame("Modified Task Summary", res[0].summary);
				Assert.areSame("Modified Task Note", res[0].note);				
			},
			
			//Delete a task
			"blackberry.pim.Task.remove should delete a task" : function() {
				var task = new blackberry.pim.Task();
				task.summary = "Test Summary To Delete"; 
				task.note = "Test Note To Delete";
				task.save();
				var totalTasksBefore = blackberry.pim.Task.find().length;
				task.remove();
				
				Assert.areSame(totalTasksBefore - 1, blackberry.pim.Task.find().length);
			},
			
			//Create a task with recurrence
			"blackberry.pim.Task should be able to be saved with recurrence object" : function() {
				var obj = new blackberry.pim.Task();
				obj.summary = "test Recurrence object";
				
				var rec = new blackberry.pim.Recurrence();
				rec.frequency = blackberry.pim.Recurrence.DAILY;			
				rec.monthInYear = blackberry.pim.Recurrence.APRIL;
				rec.interval = 2;				

				var d = new Date();
				d.setFullYear(2012,10,1);
				rec.end = d;  
			
				obj.due = d;
				obj.recurrence = rec;
				obj.save();
			
				var filter = new blackberry.find.FilterExpression("uid","==",obj.uid);				
				var found = blackberry.pim.Task.find(filter);
				obj.remove();
				
			    Assert.areSame(1, found.length);
				Assert.areSame(blackberry.pim.Recurrence.DAILY, found[0].recurrence.frequency);
				Assert.areSame(2,  found[0].recurrence.interval);
			},
		
			//Create a task with reminder
			"blackberry.pim.Task should be able to be saved with reminder object" : function() {
				var obj = new blackberry.pim.Task();
				obj.summary = "test Reminder object";
				
				var rem = new blackberry.pim.Reminder();
				rem.type = blackberry.pim.Reminder.RELATIVE;
				rem.relativeHours = 24; 
				obj.reminder = rem;
				obj.save();
				
				Assert.areSame(blackberry.pim.Reminder.RELATIVE, obj.reminder.type);
				Assert.areSame(24, obj.reminder.relativeHours);

				obj.remove();
			},
			
			//Find a task
			"blackberry.pim.Task.find should find with maxReturn" : function() {
				var filter = new blackberry.find.FilterExpression("note", "==", "secret keyword");
				var found = blackberry.pim.Task.find(filter);
				for (var i=0;i < found.length; i++) {
					found[i].remove();
				}
				
				var obj1 = new blackberry.pim.Task();
				obj1.summary = "sample summary1";
				obj1.note = "secret keyword";
				obj1.save(); 

				var obj2 = new blackberry.pim.Task();
				obj2.summary = "sample summary2";
				obj2.note = "secret keyword";
				obj2.save();    

				var filter = new blackberry.find.FilterExpression("note","==","secret keyword");
				var found = blackberry.pim.Task.find(filter,"",1);

				Assert.areSame(1, found.length);
				Assert.areSame("secret keyword", found[0].note);
				
				obj1.remove();
				obj2.remove(); 
			},
			
			"blackberry.pim.Task.find should find with negation" : function() {
				var filter = new blackberry.find.FilterExpression("note", "==", "secret keyword");
				var found = blackberry.pim.Task.find(filter);
				for (var i=0;i < found.length; i++) {
					found[i].remove();
				}
				
				var obj1 = new blackberry.pim.Task();
				obj1.summary = "sample summary1";
				obj1.note = "secret keyword";
				obj1.save(); 

				var obj2 = new blackberry.pim.Task();
				obj2.summary = "sample summary2";
				obj2.note = "secret keyword";
				obj2.save();    

				var filter = new blackberry.find.FilterExpression("note","!=","secret keyword",true);
				var found = blackberry.pim.Task.find(filter);

				Assert.areSame(2, found.length);
				Assert.areSame("secret keyword", found[0].note);
				Assert.areSame("secret keyword", found[1].note);
				
				obj1.remove();
				obj2.remove();			
			},
			
			"blackberry.pim.Task.find should find with regular expressions" : function() {
				var filter = new blackberry.find.FilterExpression("note", "==", "secret keyword");
				var found = blackberry.pim.Task.find(filter);
				for (var i=0;i < found.length; i++) {
					found[i].remove();
				}
				
				var obj1 = new blackberry.pim.Task();
				obj1.summary = "Testing-sample summary1";
				obj1.note = "secret keyword";
				obj1.save(); 

				var obj2 = new blackberry.pim.Task();
				obj2.summary = "Testing-sample summary2";
				obj2.note = "secret keyword";
				obj2.save();    

				var filter = new blackberry.find.FilterExpression("summary","REGEX","Testing-sample [a-zA-Z_0-9]*");
				var found = blackberry.pim.Task.find(filter);

				Assert.areSame(2, found.length);

				obj1.remove();
				obj2.remove();
			},
			
			"blackberry.pim.Task.find should find with orderBy" : function() {
				var filter = new blackberry.find.FilterExpression("note", "==", "hello");
				var found = blackberry.pim.Task.find(filter);
				for (var i=0;i < found.length; i++) {
					found[i].remove();
				}
				
				var obj1 = new blackberry.pim.Task();
				obj1.summary = "c: sample summary1";
				obj1.note = "hello";
				obj1.save(); 

				var obj2 = new blackberry.pim.Task();
				obj2.summary = "b: sample summary2";
				obj2.note = "hello";				
				obj2.save();    

				var obj3 = new blackberry.pim.Task();
				obj3.summary = "a: sample summary3";
				obj3.note = "hello";			   
				obj3.save();         

				var filter = new blackberry.find.FilterExpression("note","==","hello");                           
				var found = blackberry.pim.Task.find(filter,"summary",20,true);
				var found2 = blackberry.pim.Task.find(filter,"summary",20,false);
			 
				Assert.areSame(3, found.length);
				Assert.areSame("a: sample summary3", found[0].summary);
				Assert.areSame("b: sample summary2", found[1].summary);
				Assert.areSame("c: sample summary1", found[2].summary);
				
				Assert.areSame(3, found2.length);
				Assert.areSame("c: sample summary1", found2[0].summary);
				Assert.areSame("b: sample summary2", found2[1].summary);
				Assert.areSame("a: sample summary3", found2[2].summary);
			 
				obj1.remove();
				obj2.remove();
				obj3.remove();
			},
	
        });
        
        return testCases;
    }
})();