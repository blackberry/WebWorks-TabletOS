(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;
		var rec;
			
        testCases[0] = new Y.Test.Case({
            name: "blackberry.pim.Recurrence Tests",
			
			/*
			 * Note: All pim.Recurrence tests will be come via Appointment methods since Recurrence object only has information
			 */
			
			setUp : function () {
				rec = new blackberry.pim.Recurrence();
			},
			
			"blackberry.pim.Recurrence should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence);
			},
			
			"blackberry.pim.Recurrence.NO_REPEAT should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.NO_REPEAT);
				Assert.areSame(0, blackberry.pim.Recurrence.NO_REPEAT);
			},
			
			"blackberry.pim.Recurrence.DAILY should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.DAILY);
				Assert.areSame(1, blackberry.pim.Recurrence.DAILY);
			},
			
			"blackberry.pim.Recurrence.WEEKLY should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.WEEKLY);
				Assert.areSame(2, blackberry.pim.Recurrence.WEEKLY);
			},
			
			"blackberry.pim.Recurrence.MONTHLY should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.MONTHLY);
				Assert.areSame(3, blackberry.pim.Recurrence.MONTHLY);
			},
			
			"blackberry.pim.Recurrence.YEARLY should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.YEARLY);
				Assert.areSame(4, blackberry.pim.Recurrence.YEARLY);
			},			
			
			"blackberry.pim.Recurrence.JANUARY should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.JANUARY);
				Assert.areSame(Number('0x20000'), blackberry.pim.Recurrence.JANUARY);
			},
			
			"blackberry.pim.Recurrence.FEBRUARY should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.FEBRUARY);
				Assert.areSame(Number('0x40000'), blackberry.pim.Recurrence.FEBRUARY);
			},
			
			"blackberry.pim.Recurrence.MARCH should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.MARCH);
				Assert.areSame(Number('0x80000'), blackberry.pim.Recurrence.MARCH);
			},
			
			"blackberry.pim.Recurrence.APRIL should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.APRIL);
				Assert.areSame(Number('0x100000'), blackberry.pim.Recurrence.APRIL);
			},
			
			"blackberry.pim.Recurrence.MAY should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.MAY);
				Assert.areSame(Number('0x200000'), blackberry.pim.Recurrence.MAY);
			},
			
			"blackberry.pim.Recurrence.JUNE should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.JUNE);
				Assert.areSame(Number('0x400000'), blackberry.pim.Recurrence.JUNE);
			},
			
			"blackberry.pim.Recurrence.JULY should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.JULY);
				Assert.areSame(Number('0x800000'), blackberry.pim.Recurrence.JULY);
			},
			
			"blackberry.pim.Recurrence.AUGUST should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.AUGUST);
				Assert.areSame(Number('0x1000000'), blackberry.pim.Recurrence.AUGUST);
			},
			
			"blackberry.pim.Recurrence.SEPTEMBER should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.SEPTEMBER);
				Assert.areSame(Number('0x2000000'), blackberry.pim.Recurrence.SEPTEMBER);
			},
			
			"blackberry.pim.Recurrence.OCTOBER should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.OCTOBER);
				Assert.areSame(Number('0x4000000'), blackberry.pim.Recurrence.OCTOBER);
			},
			
			"blackberry.pim.Recurrence.NOVEMBER should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.NOVEMBER);
				Assert.areSame(Number('0x8000000'), blackberry.pim.Recurrence.NOVEMBER);
			},
			
			"blackberry.pim.Recurrence.DECEMBER should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.DECEMBER);
				Assert.areSame(Number('0x10000000'), blackberry.pim.Recurrence.DECEMBER);
			},
		
			"blackberry.pim.Recurrence.FIRST should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.FIRST);
				Assert.areSame(Number('0x1'), blackberry.pim.Recurrence.FIRST);
			},
			
			"blackberry.pim.Recurrence.SECOND should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.SECOND);
				Assert.areSame(Number('0x2'), blackberry.pim.Recurrence.SECOND);
			},
			
			"blackberry.pim.Recurrence.THIRD should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.THIRD);
				Assert.areSame(Number('0x4'), blackberry.pim.Recurrence.THIRD);
			},
			
			"blackberry.pim.Recurrence.FOURTH should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.FOURTH);
				Assert.areSame(Number('0x8'), blackberry.pim.Recurrence.FOURTH);
			},
			
			"blackberry.pim.Recurrence.FIFTH should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.FIFTH);
				Assert.areSame(Number('0x10'), blackberry.pim.Recurrence.FIFTH);
			},
			
			"blackberry.pim.Recurrence.LAST should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.LAST);
				Assert.areSame(Number('0x20'), blackberry.pim.Recurrence.LAST);
			},
			
			"blackberry.pim.Recurrence.SECONDLAST should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.SECONDLAST);
				Assert.areSame(Number('0x40'), blackberry.pim.Recurrence.SECONDLAST);
			},
			
			"blackberry.pim.Recurrence.THIRDLAST should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.THIRDLAST);
				Assert.areSame(Number('0x80'), blackberry.pim.Recurrence.THIRDLAST);
			},
			
			"blackberry.pim.Recurrence.FOURTHLAST should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.FOURTHLAST);
				Assert.areSame(Number('0x100'), blackberry.pim.Recurrence.FOURTHLAST);
			},
			
			"blackberry.pim.Recurrence.FIFTHLAST should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.FIFTHLAST);
				Assert.areSame(Number('0x200'), blackberry.pim.Recurrence.FIFTHLAST);
			},
			
			"blackberry.pim.Recurrence.SUNDAY should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.SUNDAY);
				Assert.areSame(Number('0x10000'), blackberry.pim.Recurrence.SUNDAY);
			},
			
			"blackberry.pim.Recurrence.MONDAY should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.MONDAY);
				Assert.areSame(Number('0x8000'), blackberry.pim.Recurrence.MONDAY);
			},
			
			"blackberry.pim.Recurrence.TUESDAY should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.TUESDAY);
				Assert.areSame(Number('0x4000'), blackberry.pim.Recurrence.TUESDAY);
			},
			
			"blackberry.pim.Recurrence.WEDNESDAY should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.WEDNESDAY);
				Assert.areSame(Number('0x2000'), blackberry.pim.Recurrence.WEDNESDAY);
			},
			
			"blackberry.pim.Recurrence.THURSDAY should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.THURSDAY);
				Assert.areSame(Number('0x1000'), blackberry.pim.Recurrence.THURSDAY);
			},
			
			"blackberry.pim.Recurrence.FRIDAY should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.FRIDAY);
				Assert.areSame(Number('0x800'), blackberry.pim.Recurrence.FRIDAY);
			},
			
			"blackberry.pim.Recurrence.SATURDAY should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Recurrence.SATURDAY);
				Assert.areSame(Number('0x400'), blackberry.pim.Recurrence.SATURDAY);
			},
			
			"blackberry.pim.Recurrence.count should exist" : function() {
				Assert.isNotUndefined(rec.count);
				Assert.isNumber(rec.count);
			},
			
			"blackberry.pim.Recurrence.dayInMonth should exist" : function() {
				Assert.isNotUndefined(rec.dayInMonth);
				Assert.isNumber(rec.dayInMonth);
			},
			
			"blackberry.pim.Recurrence.dayInWeek should exist" : function() {
				Assert.isNotUndefined(rec.dayInWeek);
				Assert.isNumber(rec.dayInWeek);
			},
			
			"blackberry.pim.Recurrence.dayInYear should exist" : function() {
				Assert.isNotUndefined(rec.dayInYear);
				Assert.isNumber(rec.dayInYear);
			},
			
			"blackberry.pim.Recurrence.end should exist" : function() {
				Assert.isNotUndefined(rec.end);
			},
			
			"blackberry.pim.Recurrence.frequency should exist" : function() {
				Assert.isNotUndefined(rec.frequency);
				Assert.isNumber(rec.frequency);
			},
			
			"blackberry.pim.Recurrence.interval should exist" : function() {
				Assert.isNotUndefined(rec.interval);
				Assert.isNumber(rec.interval);
			},
			
			"blackberry.pim.Recurrence.monthInYear should exist" : function() {
				Assert.isNotUndefined(rec.monthInYear);
				Assert.isNumber(rec.monthInYear);
			},
			
			"blackberry.pim.Recurrence.weekInMonth should exist" : function() {
				Assert.isNotUndefined(rec.weekInMonth);
				Assert.isNumber(rec.weekInMonth);
			},
        
        });

        return testCases;
    }
})();