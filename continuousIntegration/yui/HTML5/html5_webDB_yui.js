(function() {               

	var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		
		{ 
			string: navigator.userAgent,
			subString: "BlackBerry",
            identity: "BlackBerry"
		},
		
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		},
		
		{ 
			string: navigator.userAgent,
			subString: "Browzr",
                        identity: "BlackBerry"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
	BrowserDetect.init();
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
	

	var framework = YUI.framework;
	var testDomain = ""
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		
		testCases["suiteName"] = "HTML5 webDatabase tests";
		
		//---------------------------------------------------------------------
		// webDB tests
		//---------------------------------------------------------------------			


		testCases[0] = new Y.Test.Case({
			
			name: "HTML5 webDatabase tests",

			setUp : function () {
				//Setup
			},
			
			tearDown : function () {
				//tearDown
			},

//#1
			
			"webDatabase openDatabase should be recognized as defined": function () {
	
				function WebDatabase_openDatabase_ifDefined() {
		  
		     			if(typeof openDatabase == "undefined") {  
			    
						throw "openDatabase is not defined";
			 		}
             				else
			   			return true;
		    
		  		} 
				Y.Assert.isTrue(WebDatabase_openDatabase_ifDefined());
			},

//#2

			"webDatabase openDatabase should work": function(){
				function WebDatabase_openDatabase() {
             		     
			 		var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
			
			 		if((typeof db) ==  "object")
                				return true;
			 		else
			    		return false;
          			}
				Y.Assert.isTrue(WebDatabase_openDatabase());
			},

//#3
					  
			"webDatabase openDatabase's Callback function should be called": function(){
				var test = this;
			  	var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
				var passed = false;
				var t = new Date();
				var dbName = ""+ t.getMonth()+ t.getDate()+t.getHours()+ t.getMinutes()+t.getSeconds();
		  		var db = openDatabase("Todo_"+dbName,"1.0","sample todo",2*1024*1024,function (db){
					//success
					passed=true;
				});
				test.wait(function(){
					Y.Assert.isTrue(passed);
				}, 600);  
		  },
		
//#4

			"webDatabase openDatabase with empty name should work": function(){
				function WebDatabase_openDatabase_dbName_empty() {
		
		       			// it does not throw exception in on Chrome
               				var db = openDatabase("","1.0","test db",2*1024*1024);
               
			   		if(db != undefined)
                   				return true;			   
			   		else 
				   		return false;
			  	}
				Y.Assert.isTrue(WebDatabase_openDatabase_dbName_empty());
			},

//#5
			
	  		"webDatabase Database version should work": function(){
				function WebDatabase_Database_version() {
			 		var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
			
			 		if(db.version == '1.0')
                				return true;
					else
			    			return false;
          			}
				Y.Assert.isTrue(WebDatabase_Database_version());
			},

//#6
			
			"webDatabase Change Database version should be defined": function(){
				function WebDatabase_changeVersion_ifDefined() {
		       			var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
			   
			   		if(typeof db.changeVersion == "undefined") {
			   			return false;
			   		}
			   		else
			   			return true;
				}
				Y.Assert.isTrue(WebDatabase_changeVersion_ifDefined());
			},
			
//#7
			
			"webDatabase Database version should be changed": function(){
				function WebDatabase_changeVersion() {
		     		var t = new Date();
			 		var dbName = ""+ t.getMonth()+ t.getDate()+t.getHours()+ t.getMinutes()+t.getSeconds();
			 		var db = openDatabase("testdb_"+ dbName,"1.0","sample todo",2*1024*1024);
		 			db.changeVersion("1.0","2.0");
			
			 		if(db.version == "2.0")
                				return true;
			 		else
			    			return false;
				}
				Y.Assert.isTrue(WebDatabase_changeVersion(), "Database version did not change");
			},
		
//#8
					  
			 "webDatabase Table should be created": function(){
					var test = this;
			  		var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
					var passed = false;
						db.transaction(function (tx){
							//Y.Assert.fail("I can't fail you here");
							tx.executeSql('CREATE TABLE IF NOT EXISTS Notes(title TEXT, body TEXT)',[],
								function (tx,results){
									//pass
									passed = true;
								},
								function (tx,err){
									// error happened
									passed = false;
								});
						});
					test.wait(function(){
						Y.Assert.isTrue(passed);
					}, 600); 
			},

//#9
			
			"webDatabase Database transaction should be recognized as defined": function () {

    				function WebDatabase_transaction_ifDefined() {
		       
            				var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
              

			   		if(typeof db.transaction == "undefined") {  
			    
						throw "readTransaction is not defined";
			 		}
             				else
			   			return true;
		      		}
				Y.Assert.isTrue(WebDatabase_transaction_ifDefined());
			},
		  		  
//#10
					  
			"webDatabase Database transaction success callback should run": function(){
				var test = this;
			  	var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
				var passed = false;
				var errorM = "";
				db.transaction(function (tx){
					tx.executeSql('DROP TABLE IF EXISTS Notes',[]);
					tx.executeSql('CREATE TABLE IF NOT EXISTS Notes (id unique,title TEXT, body TEXT)',[]);
					tx.executeSql('INSERT INTO Notes (id,title, body) VALUES (1,"note1", "my memo")',[]);
					},
					function (err){ 
						// error occured
						errorM = err.message;
					},
					function(){
						// void success callback
						passed = true;;
					}
				);
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 600);  
		  },
		  		  
//#11
					  
			"webDatabase Database transaction error callback should run": function(){
				var test = this;
			  	var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
				var passed = false;
				var errorM = "";
				db.transaction(function (tx){
					tx.executeSql('DROP TABLE IF EXISTS Notes',[]);
					tx.executeSql('CREATE TABLE IF NOT EXISTS Notes (id unique,title TEXT, body TEXT)',[]);
					tx.executeSql('INSERT INTO Notes (id,title, body) VALUES (1,"note1", "my memo","extra")',[]); // sql error here
					},
					function (err){ 
						// error occured properly
						passed = true;
					},
					function(){
						// void success callback
						errorM = err.message;
					}
				);
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 600);  
		  },

//#12
		
			"webDatabase Database no parameter transaction should throw error": function(){
          			function WebDatabase_transaction_noParameter_nega() {
              				
					var WebDatabase_errorChecker = html5.errors.webdatabase;
			  		try{
			      			var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
				  		db.transaction(); // it should throw exception here
			      			throw new Error ("transaction without any parameter should throw an exception");			  
			  		}
					catch(err){			     
				  		if(!WebDatabase_errorChecker.transaction_noParameter(err)) 
						// if(err != "Error: TYPE_MISMATCH_ERR: DOM Exception 17")
				 		throw new Error (err);
			  		}
			  		return true;
			  	}
				Y.Assert.isTrue(WebDatabase_transaction_noParameter_nega());
			},

//#13
				
			"webDatabase Database null parameter transaction should throw error": function(){
					function WebDatabase_transaction_null_nega() {
              
					var WebDatabase_errorChecker = html5.errors.webdatabase;
			  			try{
			      				var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
				  			db.transaction(null); // it should throw exception here
			      				throw "the first parameter of transaction can not be null";
			  
			  			}
						catch(err) {
			     				if(!WebDatabase_errorChecker.readTransaction_null(err))  // same exception with readTransaction
				
                					// if(err != "Error: TYPE_MISMATCH_ERR: DOM Exception 17") 
							throw new Error (err);
			  
			  			}
			  
			  			return true;
			  
          				}
					Y.Assert.isTrue(WebDatabase_transaction_null_nega());
			},

//#14
		
			"webDatabase readTransaction should be recognized as defined": function () {

				function WebDatabase_readTransaction_ifDefined() {
		       
            				var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
              

			   		if(typeof db.readTransaction == "undefined") {  
			    
						throw "readTransaction is not defined";
			 		}
             				else
			   			return true;
		  		}
				Y.Assert.isTrue(WebDatabase_readTransaction_ifDefined());
			},
		  		  
//#15
						  
			"webDatabase readTransaction success callback should run": function(){
				var test = this;
			  	var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
				var passed = false;
				var errorM = "";
				db.transaction(function (tx){
					tx.executeSql('DROP TABLE IF EXISTS Notes',[]);
					tx.executeSql('CREATE TABLE IF NOT EXISTS Notes (id unique,title TEXT, body TEXT)',[]);
					tx.executeSql('INSERT INTO Notes (id,title, body) VALUES (1,"note1", "my memo")',[]);
					},
					function (err){ 
						// alert("WebDatabase_readTransaction - failed to prepare records:"+err.message);
					},
					function(){
						//
					}
				);
				db.readTransaction(function (tx){
						tx.executeSql('SELECT COUNT(*) AS c from Notes',[]);
					},
					function (err){
						errorM += err;
					},
					function (){
						passed=true; 
					}
				);
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 600);  
		  },
		  		  
//#16
					  
			"webDatabase readTransaction error callback should run": function(){
				var test = this;
			  	var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
				var passed = false;
				var errorM = "";
				db.transaction(function (tx){
					tx.executeSql('DROP TABLE IF EXISTS Notes',[]);
					tx.executeSql('CREATE TABLE IF NOT EXISTS Notes (id unique,title TEXT, body TEXT)',[]);
					tx.executeSql('INSERT INTO Notes (id,title, body) VALUES (1,"note1", "my memo")',[]);
					},
					function (err){ 
						// alert("WebDatabase_readTransaction - failed to prepare records:"+err.message);
					},
					function(){
						//
					}
				);
				db.readTransaction(function (tx){
						tx.executeSql('SELECT COUNT(*) AS c from Foo',[]);
					},
					function (err){
						passed = true;
					},
					function (){
						ErrorM = "invalid read occurred"; 
					}
				);
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 600);  
		  },

//#17
			
			"webDatabase readTransaction no parameter should throw error": function(){
			
				var WebDatabase_errorChecker = html5.errors.webdatabase;
				function WebDatabase_readTransaction_noParameter_nega() {
				
				var WebDatabase_errorChecker = html5.errors.webdatabase;
              
			  		try{
			      			var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
				  		db.readTransaction(); // it should throw exception here
			      			throw "readTransaction without any parameter should throw an exception";
			  
			  		}
					catch(err) {
			     			if(!WebDatabase_errorChecker.readTransaction_noParameter(err))
				 
						//   if(err != "Error: TYPE_MISMATCH_ERR: DOM Exception 17")
				 
				 		throw new Error (err);
			  		}
	
			  		return true;
		          	}
				Y.Assert.isTrue(WebDatabase_readTransaction_noParameter_nega());
			},

//#18
			
			"webDatabase readTransaction null parameter should throw error": function(){
				   	function WebDatabase_readTransaction_null_nega() {
              
					var WebDatabase_errorChecker = html5.errors.webdatabase;
			  			try{
			      				var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
				  			db.readTransaction(null); // it should throw exception here
			      				throw "the first parameter of readTransaction can not be null";
			  
			  			}
						catch(err) {
			     				if(!WebDatabase_errorChecker.readTransaction_null(err))
				 			//if(err != "Error: TYPE_MISMATCH_ERR: DOM Exception 17")
				 			throw new Error(err);
			  
			  			}
			 			return true;
          				}
					Y.Assert.isTrue(WebDatabase_readTransaction_null_nega());
			},
		  		  
//#19
					  
			"webDatabase readTransaction readOnly permission should throw error": function(){
				
				var WebDatabase_errorChecker = html5.errors.webdatabase;
				var test = this;
			  	var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
				var passed = false;
				var errorM = "";
				db.readTransaction(function (tx){
						// the following should fail 		   			 
						tx.executeSql('DROP TABLE IF EXISTS Notes',[],function(){},function(tx,err){});
						tx.executeSql('CREATE TABLE IF NOT EXISTS Notes (id unique,title TEXT, body TEXT)',[]);
						tx.executeSql('INSERT INTO Notes (id,title, body) VALUES (1,"note1", "my memo")',[]);
					},
					function (err){
						err.code = 10;
						err.message = "wrong";
						//alert(err.code+ err.message);
						if(!WebDatabase_errorChecker.readTransaction_readPermission(err.message))
							errorM += "Unexpected message:"+ err.message;
						else
							passed = true;			  
					},
					function (){
						errorM = "write action should fail using readTransaction";
					}
				);
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 600);  
		  },
		
//#20
			
			"webDatabase executeSQL should be recognized as defined": function(){		
	     				
					var test = this;
			  		var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
					var passed = false;
					var errorM = "";
					//Y.Assert.fail("I can fail you here");
					db.transaction(function (tx){
						//no running in here
						if(typeof tx.executeSql == "function"){
							passed=true;
						}
						else 
							errorM = "executeSQL is undefined";
						//Y.Assert.isTypeOf("function", tx.executeSql);
					});
					test.wait(function(){
						Y.Assert.isTrue(passed,errorM);
					}, 600);  
			},
		  		  
//#21
					  
			"webDatabase executeSQL success callback should run": function(){
				var test = this;
			  	var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
				var passed = false;
				var errorM = "";
				db.transaction(function (tx){
					tx.executeSql('CREATE TABLE IF NOT EXISTS Notes(title TEXT, body TEXT)',[],
						function (tx,results){
							// this function should be called
							passed = true;
						},
						function (tx,err){
							// error happend
							errorM = err.message;
						});
				});
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 600);  
		  },
		  		  
//#22
					  
			"webDatabase executeSQL error callback should run": function(){
				var test = this;
			  	var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
				var passed = false;
				var errorM = "";
				db.transaction(function (tx){
					tx.executeSql('DROP TABLE nonexists',[],
						function (tx,results){
							errorM = "errorCallback is not invoked";
						},
						function (tx,err){
							// this function should be invoked because the table does not exists
							passed = true;
						});
				});
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 600);  
		  },
		  		  
//#23
					  
			"webDatabase executeSQL no parameter should throw error": function(){
				
				var WebDatabase_errorChecker = html5.errors.webdatabase;
				var test = this;
			  	var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
				var passed = false;
				var errorM = "";
				db.transaction(function (tx){
						try{
							tx.executeSql();
							_utilObj.testAsyncFailed('WebDatabase_executeSql_noParameter_nega',"executeSql without any parameter should throws exception");   
						}
						catch(err) {
							if(!WebDatabase_errorChecker.executeSql_noParameter(err))
								//  if(err != "Error: SYNTAX_ERR: DOM Exception 12")
								errorM += err;
							else
								passed = true;
						}
				});
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 600);  
		  },
		  		  
//#24
					  
			"webDatabase executeSQL null parameter should throw error": function(){
				var test = this;
			  	var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
				var passed = false;
				var errorM = "";
				db.transaction(function (tx){
					try{
						tx.executeSql(null);
					    passed=true;
					}
					catch(err) {
						errorM = err;
					}
				});
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 600);  
		  },
		  		  
//#25
					  
			"webDatabase resultSet should have the correct insertID": function(){
				var test = this;
			  	var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
				var passed = false;
				var errorM = "";
				db.transaction(function (tx){
					tx.executeSql('DROP TABLE IF EXISTS Notes',[]);
					tx.executeSql('CREATE TABLE  IF NOT EXISTS Notes (title TEXT, body TEXT)',[]);
					tx.executeSql('INSERT INTO Notes (title, body) VALUES ("note", "my memo")',[],
					function (tx,result){
						//_utilObj.testAsyncPassed('WebDatabase_resultSet_insertID');
						if(result.insertId == undefined)  
							errorM = "insertId is undefined";
						if(result.insertId == 1) 
							passed = true;
						else 
							errorM = "insertId is wrong:"+ result.insertId;
					},
					function (tx,err){
						errorM = err.message;
					});				
				},
				function (err){ 
					errorM = err.message;
				},
				function(){
				});
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 600);  
			},
		  		  
//#26
					  
			"webDatabase resultSet should have the correct num of rows": function(){
				var test = this;
			  	var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
				var passed = false;
				var errorM = "";
				db.transaction(function (tx){
					tx.executeSql('DROP TABLE IF EXISTS Notes',[]);
					tx.executeSql('CREATE TABLE IF NOT EXISTS Notes (title TEXT, body TEXT)',[]);
					tx.executeSql('INSERT INTO Notes (title, body) VALUES ("note", "my memo")',[]);
					tx.executeSql('select * from Notes',[],
						function (tx,result){
							if(result.rows.length == 1) {
								var r = result.rows.item(0);
								if(r['title'] == 'note') {
									passed = true;
								}
								else
									errorM =  "title is not correct, got '"+r['title']+"', expected 'note'"; 
							}
							else {
								errorM = "length is not correct: Rows="+result.rows.length+",should be 1"; 
							}				   
						},
						function (tx,err){
							errorM = err.message;
						});
				},
				function (err){ 
						errorM = err.message;
			    },
				function(){
			    });
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 600);  
		  },
		  		  
//#27
						  
			"webDatabase resultSet should have the correct num of rows affected": function(){
				var test = this;
			  	var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
				var passed = false;
				var errorM = "";
				db.transaction(function (tx){
					tx.executeSql('DROP TABLE IF EXISTS Notes',[]);
					tx.executeSql('CREATE TABLE IF NOT EXISTS Notes (title TEXT, body TEXT)',[]);
					tx.executeSql('INSERT INTO Notes (title, body) VALUES ("note1", "my memo")',[]);
					tx.executeSql('INSERT INTO Notes (title, body) VALUES ("note2", "my memo 2")',[],
					function (tx,result){	    
						if(result.rowsAffected == 1)					
							passed=true;
						else
							errorM = err.message;
					},
					function (tx,err){
						errorM = err.message;
					});
				},
				function (err){ 
						errorM = err.message;
			    },
				function(){
			    });
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 600);  
		  },
		  		  
//#28
						  
			"webDatabase SQL Error properties should be correct": function(){
				var test = this;
			  	var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
				var passed = false;
				var errorM = "";
				db.transaction(function (tx){
					tx.executeSql('DROP TABLE nonexists',[],
						function (tx,results){
							_utilObj.testAsyncFailed('WebDatabase_SQLError_Properties', "this should fail" );
						},
						function (tx,err){
							// this function should be invoked because the table does not exists
							// we would like to check the error properties
							if(err.code == 1 && err.message =="no such table: nonexists" )
								passed=true;
							else
								errorM = "actual error code:"+err.code+" actual message:"+err.message;
						});
				});
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 600);  
			},
		  
//#29

			"webDatabase opening Database with multiple versions should throw error": function(){
				var test = this;
				var passed = false;
				var errorM = "";
				var WebDatabase_errorChecker = html5.errors.webdatabase;
				try{
					var db = openDatabase("Todo","1.0","sample todo",2*1024*1024);
					db = openDatabase("Todo","2.0","sample todo",2*1024*1024);
					errorM += "openDatabase with different version should throw an exception";
				}
				catch(err) {
					if(!WebDatabase_errorChecker.openDatabase_multipleVersion(err))
						errorM += "Unexpected exception:" + err;
					else 
						passed = true;
				}
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 600);  			
			},
			
//#30
			
			"webDatabase Database RollBack should work properly": function(){
				var test = this;
				var passed = false;
				var errorM = "";				
				var db = openDatabase('rollbackDB', '1.0', 'foo', 2 * 1024);
				db.transaction(function (tx) {			 
						tx.executeSql('DROP TABLE IF EXISTS foo');
						tx.executeSql('CREATE TABLE IF NOT EXISTS foo (id unique, text)');                             
						tx.executeSql('INSERT INTO foo (id, text) VALUES (1, "foobar")');
					},
					function (err){
						errorM += 'failed to open transaction ' +err;
					});
				db.transaction(function (tx) {
						tx.executeSql('DROP TABLE foo');
  						// known to fail - so should rollback the DROP statement
						tx.executeSql('INSERT INTO foo (id, text) VALUES (2, "foobar2")');
					}, 
					function (err) {
						// this function will be called because of the second executeSql
					});
				db.transaction(function (tx) {
						tx.executeSql('SELECT * FROM foo', [], function (tx, results) {
						// the length should be 1
							if(results.rows.length ==1) {
								passed=true;
							}
							else{
								errorM += 'failed to roll back. row number is '+results.rows.length;
							}
              
						}, 
						function (tx, err) {
                 		});
             
				});
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 600);  	
			
			},
			
//#31
			
			"webDatabase Database largeNumberOfRecords stress test should work": function(){
				var test = this;
				var passed = false;
				var errorM = "";				
				var db = openDatabase('rollbackDB', '1.0', 'foo', 2 * 1024);
				var db = openDatabase('stressTest', '1.0', 'foo', 2 * 1024);
				db.transaction(function (tx) {
						tx.executeSql('DROP TABLE IF EXISTS foo');
						tx.executeSql('CREATE TABLE IF NOT EXISTS foo (id unique, text)'); 
							for(var i = 0;i<500;i++) {
								tx.executeSql('INSERT INTO foo (id, text) VALUES (?, "foobar")',[i]);
							}
			   				tx.executeSql('select * from foo ',[],function (tx,result){
								// normal callback
								if(result.rows.length == 500) {
									passed=true;	
								}
								else {
									errorM += "total records found:" + result.rows.length;
								}
							},
							function (tx,err){
								//error callback
								errorM += err.message;			   
							});             
					},
					function (err){			    
						errorM += 'failed to open transaction:' +err.message;
					});
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 600);  	
			
			},
		/*	
//#32
			
			"webDB openDatabase_worker should work": function(){
				var test = this;
				var passed = false;
				var errorM = "";				
				
				var worker1 = new Worker("worker.js");
				var passData = 'openDatabase_basic';
				worker1.onmessage = function (event) { 
		            if (typeof event.data == "object") {
						passed= true;
					} 
					else {
						errorM += event.data;
					}
				}
    
				worker1.postMessage(passData);
				test.wait(function(){
					Y.Assert.isTrue(passed, errorM);
				}, 2000);  
			},
			*/
			
		});		
			
		return testCases;
	}
})();
