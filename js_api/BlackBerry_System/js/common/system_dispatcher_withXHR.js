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
	var SYSTEM_API_URL = "blackberry/system";
	
	function makeCall(toFunction, functionArgs) {
		var request = new blackberry.transport.RemoteFunctionCall(SYSTEM_API_URL + "/" + toFunction);
		
		if(functionArgs) {
			for(var name in functionArgs) {
				request.addParam(name, functionArgs[name]);
			}
		}
		
		return request.makeSyncCall(); //don't care about the return value
	}

	function SystemDispatcher() {
	};

	SystemDispatcher.prototype.__defineGetter__("model", function() { makeCall("model"); });
	SystemDispatcher.prototype.__defineGetter__("scriptApiVersion", function() { makeCall("scriptApiVersion"); });
	SystemDispatcher.prototype.__defineGetter__("softwareVersion", function() { makeCall("softwareVersion"); });
	
	SystemDispatcher.prototype.hasCapability = function(desiredCapability) {
		return makeCall("hasCapability", {capability : desiredCapability}); 
	};
	
	SystemDispatcher.prototype.hasDataCoverage = function() {
		return makeCall("hasDataCoverage");
	};
	
	SystemDispatcher.prototype.hasPermission = function(desiredModule) {
		return makeCall("hasPermission", {module : desiredModule}); 
	};
	
	SystemDispatcher.prototype.isMassStorageActive = function() {
		return makeCall("isMassStorageActive");
	};
	
	blackberry.Loader.javascriptLoaded("blackberry.system", SystemDispatcher);
})();