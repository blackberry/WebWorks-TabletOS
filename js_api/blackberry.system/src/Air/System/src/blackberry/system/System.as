/*
* Copyright 2010-2011 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package blackberry.system 
{	
	import flash.net.NetworkInfo;
	import flash.net.NetworkInterface;
	
	import qnx.system.Device;
	
	import webworks.access.Access;
	import webworks.config.ConfigData;
	import webworks.extension.DefaultExtension;
	
	
	public class System extends DefaultExtension {
		
		private const FEATURE_ID:Array = new Array ("blackberry.system");
		
		private const MASS_STORAGE_ACTIVE : Boolean = false;
		private const SCRIPT_API_VERSION:String = "1.0.0.0";
		
		private const ALLOW_STRING:String = "ALLOW";
		private const ALLOW_VALUE:int = 0;
		
		private const DENY_STRING:String = "DENY";
		private const DENY_VALUE:int = 1;
		
		private const SOFTWARE_VERSION_STRING:String 		= "softwareVersion";
		private const SCRIPT_API_VERSION_STRING:String 		= "scriptApiVersion";
		private const MODEL_STRING:String 					= "model";
		private const IS_MASS_STORAGE_ACTIVE_STRING:String 	= "isMassStorageActive";
		private const HAS_DATA_COVERAGE_STRING:String 		= "hasDataCoverage";
		private const HAS_CAPABILITY_STRING:String 			= "hasCapability";
		private const HAS_PERMISSION_STRING:String 			= "hasPermission";
		
		
		
		
		private const SUPPORTED_CAPABILITIES:Array = new Array("input.touch","location.gps", "media.audio.capture","media.video.capture",
			"media.recording","network.bluetooth","network.wlan");
		
		override public function getFeatureList():Array {
			return FEATURE_ID;
		}
		
		public function model():int {
			return Device.device.hardwareID;
		}
		
		/* scriptApiVersion will be retrieved from config.xml file */
		
		public function scriptApiVersion():String {
			return SCRIPT_API_VERSION;
		} 
		
		public function softwareVersion():String {
			return Device.device.os;  
		}
		
		/*
		* Possible values are:
		* 
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
		*/
		public function hasCapability(capability : String):Boolean {
			return SUPPORTED_CAPABILITIES.indexOf(capability) != -1;
		}
		
		/*
		* hasPermission() function
		*/
		public function hasPermission(module : String):int {
			return (getHasPermission().indexOf(module) >= 0)? ALLOW_VALUE: DENY_VALUE;
		}
		
		private function getHasPermission():Array {
						
			var returnPermissions:Array = new Array();
			var permissionsAtLocation:Access = ConfigData.getInstance().getAccessByUrl(webView.location);
			
			if(permissionsAtLocation != null) {
				var features:Array = permissionsAtLocation.getFeatures();
				for(var i:int = 0; i< features.length; i++) {
					returnPermissions.push(features[i].getID());
				}
			}
			
			return returnPermissions;
		}
		
		public function hasDataCoverage():Boolean {
			var haveCoverage : Boolean = false;
			
			NetworkInfo.networkInfo.findInterfaces().every(
				function callback(item:NetworkInterface, index:int, vector:Vector.<NetworkInterface>):Boolean {
					haveCoverage = item.active || haveCoverage;
					
					return !haveCoverage;
				}, this);
			
			return haveCoverage;
		}
		
		public function isMassStorageActive() : Boolean {
			return MASS_STORAGE_ACTIVE; //never active
		}
		
		public function get():Object {
			var dataObject:Object = new Object();			
			
			dataObject[SOFTWARE_VERSION_STRING] = softwareVersion();
			dataObject[SCRIPT_API_VERSION_STRING] = scriptApiVersion();
			dataObject[MODEL_STRING] = model();
			dataObject[IS_MASS_STORAGE_ACTIVE_STRING] = isMassStorageActive();
			dataObject[HAS_DATA_COVERAGE_STRING] = hasDataCoverage();
			dataObject[HAS_CAPABILITY_STRING] = SUPPORTED_CAPABILITIES;
			dataObject[HAS_PERMISSION_STRING] = getHasPermission();
			
			var returnObject:Object = {
				"code" : 0,
				"msg" : null,
				"data" : dataObject
			};
			
			return returnObject;
		}
	}
}