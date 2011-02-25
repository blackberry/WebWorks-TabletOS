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
	//We will not attach ourselves if the blackberry namespace doesn't exist
	if(!this.blackberry) {
		return;
	}
	
	var bb = this.blackberry;
	var disp = this.blackberry.system.dispatcher;
	
	if(!this.blackberry.system) {
		this.blackberry.system = {};
	}
	
	var oldSystem = this.blackberry.system;
	
	this.blackberry.system = {
		/*
		 * The function will check the capability String passed through the capability argument. The possible capabilities are:
		 * input.keyboard.issuretype 
		 * input.touch 
		 * media.audio.capture 
		 * media.video.capture 
		 * media.recording
		 * location.gps
		 * location.maps 
		 * storage.memorycard
		 * network.bluetooth
		 * network.wlan (WLAN wireless family includes 802.11, 802.11a, 802.11b, 802.11g)
		 * network.3gpp (3GPP wireless family includes GPRS, EDGE, UMTS, GERAN, UTRAN, and GAN)
		 * network.cdma (CDMA wireless family includes CDMA1x and EVDO) 
		 * network.iden
		 * 
		 * @param {String} capability The capability to check for.
		 * @return {Boolean} Returns true if the capability is supported.
		 */
			
		hasCapability : disp.hasCapability,
		
		hasDataCoverage : disp.hasDataCoverage,
		
		hasPermission : disp.hasPermission,
		
		isMassStorageActive : disp.isMassStorageActive,
		
		//Temporary fix for sync function call - to be removed
		dataCoverage : false,
		
		//Temporary fix for sync function call - to be removed
		accessList : []
		
	};
	
	if(oldSystem) {
		this.blackberry.system.event = oldSystem.event;
	}
	
	/*
	 * Define constants that will be returned by the hasPermission() method. 
	 */
	bb.system.__defineGetter__("ALLOW", function() { return 0; });
	bb.system.__defineGetter__("DENY", function() { return 1; });
	bb.system.__defineGetter__("PROMPT", function() { return 2; });
	bb.system.__defineGetter__("NOT_SET", function() { return 3; });
	
	/*
	 * Getters for read-only properties
	 */
	bb.system.__defineGetter__("model", disp.model);
	bb.system.__defineGetter__("scriptApiVersion", disp.scriptApiVersion);
	bb.system.__defineGetter__("softwareVersion", disp.softwareVersion);
	
	
})();
