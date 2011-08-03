   self.onmessage = function(event){
     
        
		if(event.data == "openDatabase_basic")
		{
		  var db = openDatabase("Todo","1.0","sample todo",10*1024*1024);
		  this.postMessage(db);
        }
   
   }
  
  