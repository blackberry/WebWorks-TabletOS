(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;
		var remind;
			
        testCases[0] = new Y.Test.Case({
            name: "blackberry.pim.Reminder Tests",
			
			/*
			 * Note: All pim.Reminder tests will be come via appointment/task methods since Reminder object only has information
			 */
			
			setUp : function () {
				remind = new blackberry.pim.Reminder();
			},
			
			"blackberry.pim.Reminder should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Reminder);
			},
			
			"blackberry.pim.Reminder.DATE should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Reminder.DATE);
				Assert.areSame(blackberry.pim.Reminder.DATE, 0);
			},
			
			"blackberry.pim.Reminder.RELATIVE should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Reminder.RELATIVE);
				Assert.areSame(blackberry.pim.Reminder.RELATIVE, 1);
			},
			
			"blackberry.pim.Reminder.date object should exist" : function() {
				Assert.isNotUndefined(remind.date);
			},
			
			"blackberry.pim.Reminder.relativeHours should exist" : function() {
				Assert.isNotUndefined(remind.relativeHours);
				Assert.isNumber(remind.relativeHours);
			},
			
			"blackberry.pim.Reminder.type should exist" : function() {
				Assert.isNotUndefined(remind.type);
				Assert.isNumber(remind.type);
			},
	
        });

        return testCases;
    }
})();