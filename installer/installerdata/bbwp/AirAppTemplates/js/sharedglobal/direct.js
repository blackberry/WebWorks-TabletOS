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
			
			/*
			 * Public members
			 */
			this.addParam = function(name, value) {
				params[name] = encodeURIComponent(value);
			};
			this.makeSyncCall = function() {
				var requestUri = composeUri();
				return JSON.parse(qnx.callExtensionMethod(requestUri)); //retrieve result as an XML object	
			};

			this.makeAsyncCall = function(responseCallback) {
				var requestUri = composeUri();				
				qnx.callExtensionMethod(requestUri); //retrieve result as an XML object	
				
			};
			
		}
	};

})();