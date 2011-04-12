(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;
		var onlyAttendee;
			
        testCases[0] = new Y.Test.Case({
            name: "blackberry.pim.Attendee Tests",
			
			/*
			 * Note: All pim.Attendee tests will be come via Appointment methods since Attendee object only has information
			 */
			
			setUp : function () {
				onlyAttendee = new blackberry.pim.Attendee();
			},
			
			"blackberry.pim.Attendee should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Attendee);
			},
			
			/* Note: Undefined areas of Attendee because we are unable to decouple this part of the API
			 * Test case will fail on onDevice APIs.
			 * Test case will pass on decoupled APIs.
			 */
			 
			"blackberry.pim.Attendee.ORGANIZER should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Attendee.ORGANIZER);
			},
			
			"blackberry.pim.Attendee.INVITED should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Attendee.INVITED);
			},
			
			"blackberry.pim.Attendee.ACCEPTED should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Attendee.ACCEPTED);
			},
			
			"blackberry.pim.Attendee.DECLINED should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Attendee.DECLINED);
			},
			
			"blackberry.pim.Attendee.TENTATIVE should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Attendee.TENTATIVE);
			},
			
			//Note:  There is one for DELEGATE - but I do not see it on the APIs but it is in the decoupled API constraints
			
			"blackberry.pim.Attendee.address should exist" : function() {
				Assert.isNotUndefined(onlyAttendee.address);
			},
			
			"blackberry.pim.Attendee.type should exist" : function() {
				Assert.isNotUndefined(onlyAttendee.type);
			},
	
        });

        return testCases;
    }
})();