(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;
		var memoTest;
			
        testCases[0] = new Y.Test.Case({
            name: "blackberry.pim.Memo Tests",			
			
			/*
			 * Memo should be testing Memo and find
			 */
			
			setUp : function () {
				memoTest = new blackberry.pim.Memo();
			},
			
			"blackberry.pim.Memo should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Memo);
			},
			
			"blackberry.pim.Memo.find should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.Memo.find);
			},
			
			"blackberry.pim.Memo.remove should exist" : function() {
				Assert.isNotUndefined(memoTest.remove);
			},
			
			"blackberry.pim.Memo.save should exist" : function() {
				Assert.isNotUndefined(memoTest.save);
			},
			
			"blackberry.pim.Memo.categories should exist" : function() {
				Assert.isNotUndefined(memoTest.categories);
			},
			
			"blackberry.pim.Memo.note should exist" : function() {
				Assert.isNotUndefined(memoTest.note);
			},
			
			"blackberry.pim.Memo.title should exist" : function() {
				Assert.isNotUndefined(memoTest.title);
			},
			
			"blackberry.pim.Memo.uid should exist" : function() {
				Assert.isNotUndefined(memoTest.uid);
			},			
			
			//Create/Save a Memo
			"blackberry.pim.Memo.save should create and save a Memo" : function() {
				var totalMemos = blackberry.pim.Memo.find().length;
				var memo = new blackberry.pim.Memo();
				memo.title = "Test Title"; 
				memo.note = "Test Note";
				memo.save();
				Assert.isTrue(memo.uid != "" && memo.uid != undefined);
				Assert.areSame(totalMemos + 1, blackberry.pim.Memo.find().length);		
			},
			
			//Modify a Memo
			"blackberry.pim.Memo.save should modify and save an existing Memo" : function() {			
				var memo = new blackberry.pim.Memo();
				memo.title = "Test Title"; 
				memo.note = "Test Note";
				memo.save();
				
				memo.title = "Modified Title";
				memo.note = "Modified Note";
				memo.save();
				
				var fe = new blackberry.find.FilterExpression("uid", "==", memo.uid);
				var res = blackberry.pim.Memo.find(fe); //Returns 1 item array
				
				Assert.areSame(1, res.length);
				Assert.areSame("Modified Title", res[0].title);
				Assert.areSame("Modified Note", res[0].note);
			},
			
			//Delete a Memo
			"blackberry.pim.Memo.delete should delete an existing Memo" : function() {
				var memo = new blackberry.pim.Memo();
				memo.title = "Test Title To Delete"; 
				memo.note = "Test Note To Delete";
				memo.save();
				var totalMemosBefore = blackberry.pim.Memo.find().length;
				memo.remove();
				
				Assert.areSame(totalMemosBefore - 1, blackberry.pim.Memo.find().length);
			},
				
			"blackberry.pim.Memo.find should return proper MaxReturn result" : function() {
				var memos = blackberry.pim.Memo.find();

				for (var i = 0; i < memos.length; i++) {
					if (memos[i].note == "secret keyword" || memos[i].title == "sample title1" || memos[i].title == "sample title2")
						memos[i].remove();
				}

				var object1 =  new blackberry.pim.Memo();
				object1.title = "sample title1";
				object1.note = "secret keyword";
				object1.save();

				var object2 =  new blackberry.pim.Memo();
				object2.title = "sample title2";
				object2.note = "secret keyword";
				object2.save();

				var filter = new blackberry.find.FilterExpression("note","==","secret keyword");
				var found =  blackberry.pim.Memo.find(filter,"",2);			 
				Assert.isTrue(found[0].note == "secret keyword" || found[1].note == "secret keyword");
			
				object1.remove();
				object2.remove();
			},
			
			"blackberry.pim.Memo.find should return empty array with MaxReturn=0" : function() {
				var memos = blackberry.pim.Memo.find();
				for (var i = 0; i < memos.length; i++) {
					if (memos[i].note == "secret keyword" || memos[i].title == "sample title1")
						memos[i].remove();
				}

			    var object1 = new blackberry.pim.Memo();
				object1.title = "sample title1";
				object1.note = "secret keyword";
				object1.save();

				var filter = new blackberry.find.FilterExpression("note","==","secret keyword");
				var found =  blackberry.pim.Memo.find(filter,"",0);

				Assert.areSame(0, found.length);
				object1.remove();				
			},
			
			"blackberry.pim.Memo.find should return array with nested expressions (AND)" : function() {
				var memos = blackberry.pim.Memo.find();
				for(var i = 0; i < memos.length; i++) {
					if (memos[i].note == "secret keyword" || memos[i].title == "sample title1" || memos[i].title == "sample title2" || memos[i].title == "sample title3")
					memos[i].remove();
				}

				var object1 =  new blackberry.pim.Memo();
				object1.title = "sample title1";
				object1.note = "secret keyword";
				object1.save();

				var object2 =  new blackberry.pim.Memo();
				object2.title = "sample title2";
				object2.note = "secret keyword";
				object2.save();
				
				var object3 =  new blackberry.pim.Memo();
				object3.title = "sample title3";
				object3.note = "secret keyword";
				object3.save();
				
				var filter1 = new blackberry.find.FilterExpression("note","==","secret keyword");
				var filter2 = new blackberry.find.FilterExpression("title","==", "sample title1");			
				var andFilter = new blackberry.find.FilterExpression(filter1, "AND", filter2);			  
				var found =  blackberry.pim.Memo.find(andFilter);

				Assert.areSame(1, found.length);
				Assert.areSame("sample title1", found[0].title);
			   
				object1.remove();
				object2.remove();
				object3.remove();
			},
			
			"blackberry.pim.Memo.find should return array with negated nested expressions (AND)" : function() {
				var memos = blackberry.pim.Memo.find();
				for(var i = 0; i < memos.length; i++) {
					if (memos[i].note == "secret keyword" || memos[i].title == "sample title1" || memos[i].title == "sample title2" || memos[i].title == "sample title3")
						memos[i].remove();
				}

				var object1 =  new blackberry.pim.Memo();
				object1.title = "sample title1";
				object1.note = "secret keyword";
				object1.save();

				var object2 =  new blackberry.pim.Memo();
				object2.title = "sample title2";
				object2.note = "secret keyword";
				object2.save();
				
				var object3 =  new blackberry.pim.Memo();
				object3.title = "sample title3";
				object3.note = "secret keyword";
				object3.save();			

				var filter1 = new blackberry.find.FilterExpression("note","==","secret keyword");
				var filter2 = new blackberry.find.FilterExpression("title","==", "sample title1", true);			 
				var andFilter = new blackberry.find.FilterExpression(filter1, "AND", filter2);			  
				var found =  blackberry.pim.Memo.find(andFilter);
				
				Assert.areSame(2, found.length);
				
				object1.remove();
				object2.remove();
				object3.remove();
			},
			
			"blackberry.pim.Memo.find should order in ascending order" : function() {
				var memos = blackberry.pim.Memo.find();
				for(var i = 0; i < memos.length; i++) {
					if (memos[i].note == "secret keyword" || memos[i].title == "a: sample title1" || memos[i].title == "b: sample title2" || memos[i].title == "c: sample title3")
					memos[i].remove();
				}

				var object2 =  new blackberry.pim.Memo();
				object2.title = "b: sample title2";
				object2.note = "secret keyword";
				object2.save();
				
				var object3 =  new blackberry.pim.Memo();
				object3.title = "c: sample title3";
				object3.note = "secret keyword";
				object3.save();
			
				var object1 =  new blackberry.pim.Memo();
				object1.title = "a: sample title1";
				object1.note = "secret keyword";
				object1.save();

				var filter1 = new blackberry.find.FilterExpression("note","==","secret keyword");			  			  
				var found = blackberry.pim.Memo.find(filter1,"title",10,true); //ascending
				
				Assert.areSame(3, found.length);
				Assert.areSame("a: sample title1", found[0].title);
				Assert.areSame("b: sample title2", found[1].title);
				Assert.areSame("c: sample title3", found[2].title);

			  	object1.remove();
				object2.remove();
				object3.remove();
			},
			
			"blackberry.pim.Memo.find should order in descending order" : function() {
				var memos = blackberry.pim.Memo.find();
				for(var i = 0; i < memos.length; i++) {
					if (memos[i].note == "secret keyword" || memos[i].title == "a" || memos[i].title == "b" || memos[i].title == "c")
						memos[i].remove();
				}

				var object2 =  new blackberry.pim.Memo();
				object2.title = "b";
				object2.note = "secret keyword";
				object2.save();
				
				var object3 =  new blackberry.pim.Memo();
				object3.title = "c";
				object3.note = "secret keyword";
				object3.save();
			
				var object1 =  new blackberry.pim.Memo();
				object1.title = "a";
				object1.note = "secret keyword";
				object1.save();

				var filter1 = new blackberry.find.FilterExpression("note","==","secret keyword");			  			
				var found = blackberry.pim.Memo.find(filter1,"title",10,false); //descending
				
				Assert.areSame(3, found.length);
				Assert.areSame("c", found[0].title);
				Assert.areSame("b", found[1].title);
				Assert.areSame("a", found[2].title);
			},
	
        });    

        return testCases;
    }
})();