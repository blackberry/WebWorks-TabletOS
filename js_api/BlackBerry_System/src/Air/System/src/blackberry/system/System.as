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
package blackberry.system 
{	
	import flash.net.NetworkInfo;
	import flash.net.NetworkInterface;
	
	import qnx.system.Device;
	
	import webworks.config.ConfigConstants;
	import webworks.extension.DefaultExtension;
	
	public class System extends DefaultExtension {
		
		private const MASS_STORAGE_ACTIVE : Boolean = false;
		private const SCRIPT_API_VERSION:String = "1.0.0.0";
		private const FEATURE_ID:Array = new Array ("blackberry.system");
		
		override public function getFeatureList():Array {
			return FEATURE_ID;
		}
		
		override public function invokeFunction(method:String, parameters:String=""):Object {
			return super.invokeFunction.apply(this, new Array(method, parameters));
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
			var supportedCapabilities:Array = new Array("location.gps", "media.audio.capture","media.video.capture",
							"media.recording","network.bluetooth","network.wlan");
			
			return supportedCapabilities.indexOf(capability) != -1;
		}

		/*
		* hasPermission() function
		*/
		public function hasPermission(module : String):int {
			var permission:int = 0; // if blackberry.denied, set to 0
			var accessList:Array = super.environment[ConfigConstants.ACCESSLIST];
			
			accessList.every(function callback(item:*, index:int, array:Array):Boolean {
					permission = uint(item.getURI() == module);
					var continueSearch:Boolean = (permission == 0);
					return continueSearch;
				}, this);

			return permission;
		}
		
		public function hasDataCoverage():String {
			var haveCoverage : Boolean = false;
			
			NetworkInfo.networkInfo.findInterfaces().every(
				function callback(item:NetworkInterface, index:int, vector:Vector.<NetworkInterface>):Boolean {
					haveCoverage = item.active || haveCoverage;
			
					return !haveCoverage;
				}, this);	
			
			return String(haveCoverage);
		}
		
		public function isMassStorageActive() : Boolean {
			return MASS_STORAGE_ACTIVE; //never active
		}
	}
}