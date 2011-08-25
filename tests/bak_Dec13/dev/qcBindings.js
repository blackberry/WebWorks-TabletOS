(function() {  
	var framework = YUI.framework;
	
	framework.QCBindings = {
		bindings : [], 
		
		"add" : function (t, p, i){
			framework.QCBindings.bindings[t] = {
				id : i,
				path: p,
			};
		},
		
		"find": function(test){
			return framework.QCBindings.bindings[test];
		},
   };   
})();

