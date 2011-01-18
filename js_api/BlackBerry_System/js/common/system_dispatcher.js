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
	
	var oldSystem = this.blackberry.system;

	this.blackberry.system = {
		//Override the delegates for each namespace method
		dispatcher : {
					
			"model" : function() {
				return "0";
			},
			"scriptApiVersion" : function() {
				return "1.0.0.0";
			},
			"softwareVersion" : function() {
				return "QNX";
			},
			"hasCapability" : function(desiredCapability) {
				var supportedCapabilities = ["location.gps","media.audio.capture","media.video.capture",
				"media.recording","network.bluetooth","network.wlan"];
				for (i in supportedCapabilities) {
				       if (supportedCapabilities[i] == desiredCapability) return true;
				   }
				return false;
				
			},
			"hasDataCoverage" : function() {
				return blackberry.system.dataCoverage;
			},
			"hasPermission" : function(desiredModule) {
				var al = blackberry.system.accessList;				
				var permission = 1; // if blackberry.denied, set to 1			
								
				for (var i in al){
					permission = (al[i] == desiredModule) ? 0 : 1;		
					if(!permission)
						break;
				}
				
				return permission;			
			
			},
			"isMassStorageActive" : function() {
				return false;
			}
		}
	};
	
	if(oldSystem) {
		this.blackberry.system.event = oldSystem.event;
	}
})();