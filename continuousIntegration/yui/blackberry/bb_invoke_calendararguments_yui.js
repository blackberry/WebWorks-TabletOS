(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;
			
        testCases[0] = new Y.Test.Case({
            name: "blackberry.invoke for Calendar",
			
			_should: {
                error: {
                    
                }                
            },
			
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
			
			"blackberry.invoke.CalendarArguments should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.CalendarArguments);
			},
			
			"blackberry.invoke.CalendarArguments.VIEW_NEW should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.CalendarArguments.VIEW_NEW);
				Assert.areSame(0, blackberry.invoke.CalendarArguments.VIEW_NEW);
			},
			
			"blackberry.invoke.CalendarArguments.VIEW_VIEW should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.CalendarArguments.VIEW_VIEW);
				Assert.areSame(1, blackberry.invoke.CalendarArguments.VIEW_VIEW);
			},
			
			"blackberry.invoke.CalendarArguments.VIEW_AGENDA should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.CalendarArguments.VIEW_AGENDA);
				Assert.areSame(2, blackberry.invoke.CalendarArguments.VIEW_AGENDA);
			},
			
			"blackberry.invoke.CalendarArguments.VIEW_DAY should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.CalendarArguments.VIEW_DAY);
				Assert.areSame(3, blackberry.invoke.CalendarArguments.VIEW_DAY);
			},
			
			"blackberry.invoke.CalendarArguments.VIEW_DEFAULT should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.CalendarArguments.VIEW_DEFAULT);
				Assert.areSame(4, blackberry.invoke.CalendarArguments.VIEW_DEFAULT);
			},
			
			"blackberry.invoke.CalendarArguments.VIEW_MONTH should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.CalendarArguments.VIEW_MONTH);
				Assert.areSame(5, blackberry.invoke.CalendarArguments.VIEW_MONTH);
			},
			
			"blackberry.invoke.CalendarArguments.VIEW_WEEK should exist" : function() {
				Assert.isNotUndefined(blackberry.invoke.CalendarArguments.VIEW_WEEK);
				Assert.areSame(6, blackberry.invoke.CalendarArguments.VIEW_WEEK);
			},
			
			//Invoke Calendar with empty CalendarArguments
			"MANUAL 1 should invoke Calendar with empty CalendarArguments": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Calendar application should show up.");
				
				alert("Will attempt to invoke Calendar using empty CalendarArguments");
				var args = new blackberry.invoke.CalendarArguments();
				blackberry.invoke.invoke(blackberry.invoke.APP_CALENDAR, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Calendar with VIEW_NEW CalendarArguments
			"MANUAL 2 should invoke Calendar with VIEW_NEW CalendarArguments": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Calendar application should show up with compose.");
				
				alert("Will attempt to invoke Calendar using VIEW_NEW CalendarArguments");
				var args = new blackberry.invoke.CalendarArguments();
				args.view = blackberry.invoke.CalendarArguments.VIEW_NEW;
				blackberry.invoke.invoke(blackberry.invoke.APP_CALENDAR, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Calendar with VIEW_VIEW CalendarArguments
			"MANUAL 3 should invoke Calendar with VIEW_VIEW CalendarArguments": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Calendar application should show up with view.");
				
				alert("Will attempt to invoke Calendar using VIEW_VIEW CalendarArguments");
				var args = new blackberry.invoke.CalendarArguments();
				args.view = blackberry.invoke.CalendarArguments.VIEW_VIEW;
				blackberry.invoke.invoke(blackberry.invoke.APP_CALENDAR, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Calendar with VIEW_AGENDA CalendarArguments
			"MANUAL 4 should invoke Calendar with VIEW_AGENDA CalendarArguments": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Calendar application should show up with agenda.");
				
				alert("Will attempt to invoke Calendar using VIEW_AGENDA CalendarArguments");
				var args = new blackberry.invoke.CalendarArguments();
				args.view = blackberry.invoke.CalendarArguments.VIEW_AGENDA;
				blackberry.invoke.invoke(blackberry.invoke.APP_CALENDAR, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Calendar with VIEW_DAY CalendarArguments
			"MANUAL 5 should invoke Calendar with VIEW_DAY CalendarArguments": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Calendar application should show up with day.");
				
				alert("Will attempt to invoke Calendar using VIEW_DAY CalendarArguments");
				var args = new blackberry.invoke.CalendarArguments();
				args.view = blackberry.invoke.CalendarArguments.VIEW_DAY;
				blackberry.invoke.invoke(blackberry.invoke.APP_CALENDAR, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Calendar with VIEW_DEFAULT CalendarArguments
			"MANUAL 6 should invoke Calendar with VIEW_DEFAULT CalendarArguments": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Calendar application should show up with default.");
				
				alert("Will attempt to invoke Calendar using VIEW_DEFAULT CalendarArguments");
				var args = new blackberry.invoke.CalendarArguments();
				args.view = blackberry.invoke.CalendarArguments.VIEW_DEFAULT;
				blackberry.invoke.invoke(blackberry.invoke.APP_CALENDAR, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},			
			
			//Invoke Calendar with VIEW_MONTH CalendarArguments
			"MANUAL 7 should invoke Calendar with VIEW_MONTH CalendarArguments": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Calendar application should show up with month.");
				
				alert("Will attempt to invoke Calendar using VIEW_MONTH CalendarArguments");
				var args = new blackberry.invoke.CalendarArguments();
				args.view = blackberry.invoke.CalendarArguments.VIEW_MONTH;
				blackberry.invoke.invoke(blackberry.invoke.APP_CALENDAR, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Calendar with VIEW_WEEK CalendarArguments
			"MANUAL 8 should invoke Calendar with VIEW_WEEK CalendarArguments": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Calendar application should show up with week.");
				
				alert("Will attempt to invoke Calendar using VIEW_WEEK CalendarArguments");
				var args = new blackberry.invoke.CalendarArguments();
				args.view = blackberry.invoke.CalendarArguments.VIEW_WEEK;
				blackberry.invoke.invoke(blackberry.invoke.APP_CALENDAR, args);
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Calendar with view=7 CalendarArguments
			"MANUAL 9 should invoke Calendar with CalendarArguments with view=7": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Calendar application should show up with default.");
				
				alert("Will attempt to invoke Calendar using CalendarArguments with view=7");
				var args = new blackberry.invoke.CalendarArguments();
                args.view = 7;
                blackberry.invoke.invoke(blackberry.invoke.APP_CALENDAR,args);           
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Calendar with view=string CalendarArguments
			"MANUAL 10 should invoke Calendar with CalendarArguments with view=string": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Calendar application should show up with default.");
				
				alert("Will attempt to invoke Calendar using CalendarArguments with view=string");
				var args = new blackberry.invoke.CalendarArguments();
                args.view = 'String';
                blackberry.invoke.invoke(blackberry.invoke.APP_CALENDAR,args);                        
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Calendar with Date object
			"MANUAL 11 should invoke Calendar with CalendarArguments with Date object": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Calendar application should show up with default on the correct date.");
				
				alert("Will attempt to invoke Calendar using CalendarArguments with date (01/01/12)");
                var date = new Date("01/01/12");
                var args = new blackberry.invoke.CalendarArguments(date);
                args.view = 4;
                blackberry.invoke.invoke(blackberry.invoke.APP_CALENDAR, args);                  
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
			//Invoke Calendar with Appointment object
			"MANUAL 12 should invoke Calendar with CalendarArguments with Appointment Object": function() {
				framework.test = this; //so pass() and fail() can access this test
				framework.setInstructions("Calendar application should show up with default and appointment page.");
				
				alert("Will attempt to invoke Calendar using CalendarArguments with Appointment object");
                var appt = new blackberry.pim.Appointment();
                var date = new Date();                
                appt.summary = "Appointment Summary";
                appt.start = date;
                var end = new Date();
                end.setHours(date.getHours() + 2);
                appt.end = end;
                appt.save();
                
                var args = new blackberry.invoke.CalendarArguments(appt);
                args.view = 4;
                blackberry.invoke.invoke(blackberry.invoke.APP_CALENDAR, args);                    
				framework.test.wait(24*60*60*1000); //wait until user inputs the test result (via button click) *24hr wait since wait() has a bug*
			},
			
        });
		
        return testCases;
    }
})();