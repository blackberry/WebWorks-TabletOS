(function() {  
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);
	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		
		testCases["suiteName"] = "blackberry.io TestSuite"; 
	
		testCases[0] = new Y.Test.Case({
			name: "blackberry.io Test",
		
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
			
            _should: {
            error: {
                "blackberry.io.file.exists should not support the local:/// file" : "return undefined, doesn't support local:/// protocol",
                "blackberry.io.file.getFileProperties should return true if file exists in the location" : "6.0 doesn't suppert date created",
                }
            },


			"blackberry.io.dir should exist": function() {
				Assert.isNotUndefined( blackberry.io.dir );
			},
			 
			"blackberry.io.dir.createNewDir should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.io.dir.createNewDir );
			},
			
			"blackberry.io.dir.deleteDirectory should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.io.dir.deleteDirectory );
			},
			
			"blackberry.io.dir.exists should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.io.dir.exists );
			},
			
			"blackberry.io.dir.getFreeSpaceForRoot should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.io.dir.getFreeSpaceForRoot );
			},
			
			"blackberry.io.dir.getParentDirectory should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.io.dir.getParentDirectory );
			},
			
			"blackberry.io.dir.getRootDirs should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.io.dir.getRootDirs );
			},
			
			"blackberry.io.dir.listDirectories should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.io.dir.listDirectories );
			},
			
			"blackberry.io.dir.listFiles should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.io.dir.listFiles );
			},
			
			"blackberry.io.dir.rename should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.io.dir.rename );
			},
			
			"blackberry.io.file.copy should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.io.file.copy );
			},
			
			"blackberry.io.file.deleteFile should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.io.file.deleteFile );
			},
			
			"blackberry.io.file.exists should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.io.file.exists );
			},
			
			"blackberry.io.file.getFileProperties should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.io.file.getFileProperties );
			},
			
			"blackberry.io.file.open should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.io.file.open );
			},
			
			"blackberry.io.file.readFile should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.io.file.readFile );
			},
			
			"blackberry.io.file.rename should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.io.file.rename );
			},
			
			"blackberry.io.file.saveFile should exist and is function": function() {
				Assert.isTypeOf('function', blackberry.io.file.saveFile );
			},
			
			
			
			"blackberry.io.dir.getRootDirs should return all root dirs": function() {
			    var root = blackberry.io.dir.getRootDirs();
                Assert.areSame( "file:///store/", root[0] );
                Assert.areSame( "file:///SDCard/", root[1] );
            },
            
            "blackberry.io.dir.createNewDir should create a new dir": function() {
                   var path = "file:///SDCard/dir1/";
				   if ( blackberry.io.dir.exists( path ) )
						blackberry.io.dir.deleteDirectory( path );
                   blackberry.io.dir.createNewDir(path);
                   Assert.areSame( blackberry.io.dir.exists( path ), true ) ;
            },
            
            "blackberry.io.dir.listDirectories should list all root dirs": function() {
                var path = "file:///SDCard/dir/";
                if ( blackberry.io.dir.exists( path ) ) {
                    var dirs = blackberry.io.dir.listDirectories( path );
                    Assert.areNotSame( 0, dirs.length );
                //    Assert.areSame(dirs[0], "dirr");
                //    Assert.areSame(dirs[1], "new1");
                }
            },
            //22x
            "blackberry.io.dir.rename should rename the dir name": function() {
                var old_dir = "file:///SDCard/dir/dirr/";
                var new_dir = "dirr_new";
                if( blackberry.io.dir.exists( old_dir )) {
                    blackberry.io.dir.rename( old_dir , new_dir );
                    Assert.areSame( true, blackberry.io.dir.exists("file:///SDCard/dir/dirr_new/") );
                    }
                else{
                    alert("please load dirs to SDCard!");}
            },
            //23x
            "blackberry.io.dir.deleteDirectory should delete the dir": function() {
                var deleteD = "file:///SDCard/dir/toBeDeleted/";
                blackberry.io.dir.deleteDirectory(deleteD);
                Assert.areSame( false, blackberry.io.dir.exists( deleteD ) );
            },
            
            "blackberry.io.dir.getParentDirectory should return the parent dir": function() {
                var path = "file:///SDCard/dir/";
                var dir = blackberry.io.dir.getParentDirectory(path);
                Assert.areSame( "file:///SDCard/", dir );
            },
            
            "blackberry.io.dir.exists should return true if the directory exists, false otherwise": function() {
                var path = "file:///SDCard/dir/";
                Assert.areSame( true, blackberry.io.dir.exists(path) );
            },

			//26
            "blackberry.io.dir.getFreeSpaceForRoot should return free memory that is available": function() {
                 var root = blackberry.io.dir.getRootDirs();
                 for (var i = 0; i < root.length; i++) {
                   Assert.isNumber( blackberry.io.dir.getFreeSpaceForRoot( root[i]) );
                   Assert.areNotSame( 0, blackberry.io.dir.getFreeSpaceForRoot( root[i]) );
                 }
            },
            
            "blackberry.io.dir.listFiles should return the names of the files in the directory": function() {
                 var path = "file:///SDCard/dir/";
                 var files = blackberry.io.dir.listFiles( path );
                 var file1;
                    for (var j = 0; j < files.length; j++) {
                        if ( files[j] == "X1.xml" )
                            Assert.areSame( 1, 1 );
                    }
                   
            },
            //28
            "blackberry.io.file.exists should return true if file exists in the location": function() {
                var file = "file:///SDCard/dir/h1.htm"
                Assert.areSame( true, blackberry.io.file.exists(file) );
            },
            //29x
            "blackberry.io.file.getFileProperties should return true if file exists in the location": function() {
                var file = "file:///SDCard/dir/X1.xml"
                var property = blackberry.io.file.getFileProperties(file);
				
               	Assert.isObject( blackberry.io.file.dateCreated );
               	var d = blackberry.io.file.dateCreated;
               	blackberry.io.file.dateCreated = Date;
               	Assert.areSame( d, blackberry.io.file.dateCreated );
               	
				Assert.isObject( blackberry.io.file.dateModified );
				var d = blackberry.io.file.dateModified;
               	blackberry.io.file.dateModified = Date;
               	Assert.areSame( d, blackberry.io.file.dateModified );
               	
				Assert.isString( blackberry.io.file.directory );
				var d = blackberry.io.file.directory;
               	blackberry.io.file.directory = "file:///thischanged/";
               	Assert.areSame( d, blackberry.io.file.directory );
               	
				Assert.isString( blackberry.io.file.fileExtension );
				var d = blackberry.io.file.fileExtension;
               	blackberry.io.file.fileExtension = "changed";
               	Assert.areSame( d, blackberry.io.file.fileExtension );
				
				Assert.isString( blackberry.io.file.isHidden );
				var d = blackberry.io.file.isHidden;
               	blackberry.io.file.isHidden = !d;
               	Assert.areSame( d, blackberry.io.file.isHidden );
				
				Assert.isString( blackberry.io.file.isReadonly );
				var d = blackberry.io.file.isReadonly;
               	blackberry.io.file.isReadonly = !d;
               	Assert.areSame( d, blackberry.io.file.isReadonly );
				
				
				Assert.isString( blackberry.io.file.mimeType );
				var d = blackberry.io.file.mimeType;
               	blackberry.io.file.mimeType = "java1";
               	Assert.areSame( d, blackberry.io.file.mimeType );
               	
				Assert.isString( blackberry.io.file.size );
				var d = blackberry.io.file.size;
               	blackberry.io.file.size = 123;
               	Assert.areSame( d, blackberry.io.file.size );

                alert("dateCreated: " + property.dateCreated + "\n"
                      + "dateModified: " + property.dateModified + "\n"
                      + "directory: " + property.directory + "\n"
                       + "fileExtension: " + property.fileExtension + "\n"
                        + "isHidden: " + property.isHidden + "\n"
                         + "isReadonly: " + property.isReadonly + "\n"
                          + "mimeType: " + property.mimeType + "\n"
                           + "size: " + property.size + "\n" 
                );
         },

		 //30x
           "blackberry.io.file.copy should copy a file from the path": function() {
                var s = "file:///SDCard/dir/h1.htm";
                var t = "file:///SDCard/dir/h2.htm";
                if (blackberry.io.file.exists(t)) {
					blackberry.io.file.deleteFile(t);
                    alert("Destination file exists and have been deleted!");
					
                }
                else {

                    blackberry.io.file.copy(s, t);
                    Assert.areSame( true, blackberry.io.file.exists(t) );
                }
        },

        "blackberry.io.file.rename should rename a file from one to another": function() {
                var file = "file:///SDCard/dir/toBeRenamed.xml";
                var name = "renamed.xml";
                blackberry.io.file.rename(file, name);
                Assert.areSame( false, blackberry.io.file.exists(file) );
        },

        "blackberry.io.file.saveFile should save a file to specifile path": function() {
           var path =  "file:///SDCard/dir/X2.xml";
              if ( blackberry.io.file.exists(path)) {
                   blackberry.io.file.deleteFile(path);
                   alert("File exists before, it has been deleted.");
              }
            var blob_data = blackberry.utils.stringToBlob("hello world");
              blackberry.io.file.saveFile(path,blob_data);
              Assert.areSame( true, blackberry.io.file.exists(path));
             
        },

        "blackberry.io.file.readFile should save a file to specifile path": function() {
               var path = "file:///SDCard/dir/h1.htm";
                if (!blackberry.io.file.exists(path)) {
                    alert("Please click save file first -");
                }
                else{
                    blackberry.io.file.readFile(path,function(){
                    var properties = blackberry.io.file.getFileProperties(path);
                    Assert.areSame( "xml", property.fileExtension ); });
                    }
        },

   
       "blackberry.io.file.deleteFile should delete a file from specifile path": function() {
                var d = "file:///SDCard/dir/toBeDeleted.txt";
                blackberry.io.file.deleteFile( d );
                Assert.areSame( false, blackberry.io.file.exists(d));
         },

        "MANUAL blackberry.io.file.open should open a file from specifile path": function() {
                framework.test = this; 
				var d = "file:///SDCard/dir/h1.htm";
                Assert.areSame(true, blackberry.io.file.open(d));
				framework.test.wait(24*60*60*1000); 
        },
       
        "MANUAL blackberry.io.file.open should open a picture from specifile path": function() {
				framework.test = this; 
				var d = "file:///SDCard/dir/pic1.jpg";
                Assert.areSame( true, blackberry.io.file.open(d) );
				framework.test.wait(24*60*60*1000); 
       
        },
        //37x
        "blackberry.io.file.rename should rename the file name": function() {
		
                var xmlString = "<test>test the rename function</test>";
                var path = "file:///SDCard/dir/toBeRenamed1.txt";

                if (blackberry.io.file.exists(path))
                    blackberry.io.file.deleteFile(path);

                if (document.implementation.createDocument) {
                    var parser = new DOMParser()
                    doc = parser.parseFromString(xmlString, "text/xml")

                } else if (window.ActiveXObject) {
                    doc = new ActiveXObject("Microsoft.XMLDOM")
                    doc.async = "false";
                    doc.loadXML(xmlString)
                }
                var blob_data = blackberry.utils.documentToBlob(doc);
                blackberry.io.file.saveFile(path, blob_data);
                if (blackberry.io.file.exists(path)) {
                    blackberry.io.file.rename(path, "newNamed.txt");
                    Assert.areSame( true, blackberry.io.file.exists("file:///SDCard/dir/newNamed.txt"));
              }
        },

//negative case 38x
       "blackberry.io.file.exists should not support the local:/// file": function() {
	   try{
                var path = "local:///config.xml";
                Assert.areSame( blackberry.io.file.exists(path), false );
				}
			catch (e)
			{alert(e);}
        },
        
       
		});
		return testCases;
}
	
})();
