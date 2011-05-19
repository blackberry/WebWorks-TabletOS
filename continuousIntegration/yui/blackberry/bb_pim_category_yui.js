(function() {
    var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

    //We're passing in the Y parameter and expecting back an array of test cases
    function generateTestCaseCallback(Y) {
        var testCases = new Array();
        var Assert = Y.Assert;
		
        testCases[0] = new Y.Test.Case({
            name: "blackberry.pim.category Tests",
			
			_should: {
                error: {
                    "blackberry.pim.category.addCategory should throw error when given wrong parameter (Integer)": "Invalid type - class java.lang.Integer",
					"blackberry.pim.category.deleteCategory should throw error when given wrong parameter (Integer)": "Invalid type - class java.lang.Integer",
                }                
            },
			
			"blackberry.pim.category should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.category);
			},
			
			"blackberry.pim.category.addCategory should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.category.addCategory);
			},
			
			"blackberry.pim.category.deleteCategory should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.category.deleteCategory);
			},
			
			"blackberry.pim.category.getCategories should exist" : function() {
				Assert.isNotUndefined(blackberry.pim.category.getCategories);
			},
			
			"blackberry.pim.category.getCategories should return a String array" : function() {
				var numCat = blackberry.pim.category.getCategories();
				Assert.isArray(numCat);
			},
			
			"blackberry.pim.category.addCategory should add a category" : function() {
				var categories = blackberry.pim.category.getCategories();
				var numCategories = categories.length;
				var newCategoryName = 'Test new category';
					
				//Try to add a new category		
				blackberry.pim.category.addCategory(newCategoryName);				
				categories = blackberry.pim.category.getCategories();
				Y.assert(categories.length == numCategories + 1);
				
				var found = false;
				numCategories = categories.length;
				for (var i = 0; i < numCategories; i++) {
					if (categories[i] == newCategoryName) {
						found = true;
						break;
					}
				}
				
				Assert.isTrue(found);
			},
			
			"blackberry.pim.category.deleteCategory should delete a category" : function() {
				var categories = blackberry.pim.category.getCategories();
				var numCategories = categories.length;
				var newCategoryName = 'Test new category';
					
				//Try to add a new category		
				blackberry.pim.category.addCategory(newCategoryName);
				numCategories = blackberry.pim.category.getCategories().length;

				//Try to delete the category just added
				blackberry.pim.category.deleteCategory(newCategoryName);
				Y.assert(blackberry.pim.category.getCategories().length == numCategories - 1)			
				
				var found = true;
				numCategories = categories.length;
				for (var i = 0; i < numCategories; i++) {
					if (categories[i] == newCategoryName) {
						found = false;
						break;
					}
				}
				
				Assert.isFalse(found);
			},
			
			"blackberry.pim.category.addCategory should throw error when given wrong parameter (Integer)" : function() {
				try {
					blackberry.pim.category.addCategory(0);
				} catch (err) {
					throw new Error(err);
				}
			},
			
			"blackberry.pim.category.deleteCategory should throw error when given wrong parameter (Integer)" : function() {
				try {
					blackberry.pim.category.deleteCategory(0);
				} catch (err) {
					throw new Error(err);
				}
			},
			
			"blackberry.pim.category.deleteCategory should do nothing when category does not exist" : function() {
				try {
					blackberry.pim.category.deleteCategory("doesNotExist");					
				} catch (err) {
					Y.Assert.fail("deleteCategory threw an error when deleting non-existant category when it should not.");
				}
			},
	
        });

        return testCases;
    }
})();