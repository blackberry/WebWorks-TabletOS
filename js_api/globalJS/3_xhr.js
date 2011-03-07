/*
 * Copyright 2010 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function () {
	if(!this.blackberry) {
		return;
	}
	
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
				var paramCount = 1;
				for(param in params) {
					if(params.hasOwnProperty(param)) {						
						//If it's not the first parameter, prepend the '&' separator
						if(paramCount == 1) {
							//start the query string with an '?'
							uri += "?";	
						} else {
							uri += "&";
						}
						uri += param + "=" + params[param];
						paramCount++;
					}
				}
				
				return uri;
			};
			
			var createXhrRequest = function(uri, isAsync) {
				var request = new XMLHttpRequest();
				
				request.open("POST", uri, isAsync);
				request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				
				return request;
			};
			
			/*
			 * Public members
			 */
			this.addParam = function(name, value) {
				
				params[name] = encodeURIComponent(JSON.stringify(value));
			};
			
			this.makeSyncCall = function() {
				var requestUri = composeUri();
				var request = createXhrRequest(requestUri, false);
				
				try {
					request.send();
				} catch(e) {}
		
				return JSON.parse(request.responseText); //retrieve result encoded as JSON
			};
			
			this.makeAsyncCall = function(responseCallback) {
				var requestUri = composeUri();
				var request = createXhrRequest(requestUri, true);
				
				request.onreadystatechange = function() {
					// continue if the process is completed
					if (request.readyState == 4 && request.status == 200) {
				         // retrieve the response
				         var response = JSON.parse(request.responseText);
				         responseCallback(response.Response); //call the client code with the parsed response
					}
				};				
				
				try {
					request.send();	
				} catch(e) {}
			};
		}
	};
})();