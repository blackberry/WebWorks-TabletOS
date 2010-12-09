(function () {
	if(!this.blackberry) {
		return;
	}
	Object.prototype.isEmpty = function() {
		    for (var prop in this) {
		        if (this.hasOwnProperty(prop)) return false;
		    }
		    return true;
	};
	this.blackberry.transport = {
		"RemoteFunctionCall" : function(functionUri) {
			/*
			 * Private members
			 */
			var uri = functionUri;
			var params = {};
			var composeUri = function() {
				//SERVER_URL is defined in constants.js and is assumed to have already been attached
				var uri = SERVER_URL + functionUri;
				
				//If we have parameters, let's append them 
				if(!params.isEmpty()) {
					//start the query string with an '?'
					uri += "?";					

					var paramCount = 1;
					for(param in params) {
						if(params.hasOwnProperty(param)) {						
							//If it's not the first parameter, prepend the '&' separator
							if(paramCount != 1) {
								uri += "&";
							}
							uri += param + "=" + params[param];
							paramCount++;
						}
					}
				}

				
				return uri;
			};
			
			/*
			 * Public members
			 */
			this.addParam = function(name, value) {
				params[name] = JSON.stringify(value);
			};
			this.makeSyncCall = function() {
				var requestUri = composeUri();				
				return JSON.parse(qnx.callExtensionMethod(requestUri)); //retrieve result as an XML object	
			};

			this.makeAsyncCall = function(responseCallback) {
				var requestUri = composeUri();				
				qnx.callExtensionMethod(requestUri); //retrieve result as an XML object	
				
			};
			
		},
	
		//TODO: Dead function, to be replaced by RemoteFunctionCall.makeSyncCall() on refactor
		"registerEventHandler" : function(fromUrl, responseCallback) {
				var request = new XMLHttpRequest();
				
			request.open("POST", fromUrl, true);
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			
			request.onreadystatechange = function() {
				// continue if the process is completed
				if (request.readyState == 4 && request.status == 200) {
			         // retrieve the response
			         var response = JSON.parse(request.responseText);
			         responseCallback(response.Response); //call the client code with the parsed response
				}
			};
		
			request.send();		
		},
		
		//TODO: Dead function, to be replaced by RemoteFunctionCall.makeSyncCall() on refactor
 		"getTextValueSync" : function(fromUrl) { 	
		
			return JSON.parse(qnx.callExtensionMethod(fromUrl)); //retrieve result as an XML object	
  
  		}
	};

})();