(function () {
 
	var isBlackBerryBrowser =  (BrowserDetect.browser == 'BlackBerry');
	
	//you can add checking for other Browsers
    
	if(typeof html5 == 'undefined'){
	   html5 = {};
	}
	if(!html5.errors) {
        html5.errors = {};
    }
    
     if(!html5.errors.webdatabase) {
        html5.errors.webdatabase = {};
                
        var e = html5.errors.webdatabase;
        
        e.transaction_noParameter = function(error) {
            
            return (isBlackBerryBrowser 
                ? error == "Error: TYPE_MISMATCH_ERR: DOM Exception 17"
                : error == 'SyntaxError: Transaction callback is required.');
        };
		
		e.readTransaction_noParameter = function(error) {
            
            return (isBlackBerryBrowser 
                ? error == "Error: TYPE_MISMATCH_ERR: DOM Exception 17" 
                : error == 'SyntaxError: Transaction callback is required.');
        };
	    
		
		e.readTransaction_null = function(error) {
            
            return (isBlackBerryBrowser 
                ? error == "Error: TYPE_MISMATCH_ERR: DOM Exception 17" 
                : error == 'TypeError: Transaction callback must be of valid type.');
        };
		
		e.readTransaction_readPermission = function(error) {
            
            return (isBlackBerryBrowser 
                ? error == 'not authorized' 
                : error == 'not authorized');
        };
		
		
		e.openDatabase_multipleVersion = function(error) {
            
            return (isBlackBerryBrowser 
                ? error == 'Error: INVALID_STATE_ERR: DOM Exception 11' 
                : error == 'Error: INVALID_STATE_ERR: DOM Exception 11');
        };
		

		
		e.executeSql_noParameter = function(error) {
            
            return (isBlackBerryBrowser 
                ? error == "Error: SYNTAX_ERR: DOM Exception 12" 
                : error == 'SyntaxError: SQL statement is required.');
        };

    }
}
)();