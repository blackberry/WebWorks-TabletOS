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
	var SYSTEM_URL = "blackberry/system";
	
	if(!this.blackberry) {
		return; //nothing to dispatch
	}
	
	function makeCall(toFunction, functionArgs) {
		var request = new blackberry.transport.RemoteFunctionCall(SYSTEM_URL + "/" + toFunction);
		
		if(functionArgs) {
			for(var name in functionArgs) {
				request.addParam(name, functionArgs[name]);
			}
		}
		
		return request.makeSyncCall(); //don't care about the return value
	}

	this.blackberry.system = {
		//Override the delegates for each namespace method
		dispatcher : {
			"model" : function() {
				return makeCall("model");
			},
			"scriptApiVersion" : function() {
				return makeCall("scriptApiVersion");
			},
			"softwareVersion" : function() {
				return makeCall("softwareVersion"); 
			},
			"hasCapability" : function(desiredCapability) {
				return makeCall("hasCapability", {capability : desiredCapability}); 
			},
			"hasDataCoverage" : function() {
				return makeCall("hasDataCoverage");
			},
			"hasPermission" : function(desiredModule) {
				return makeCall("hasPermission", {module : desiredModule}); 
			},
			"isMassStorageActive" : function() {
				return makeCall("isMassStorageActive");
			}
		}
	};	
})();