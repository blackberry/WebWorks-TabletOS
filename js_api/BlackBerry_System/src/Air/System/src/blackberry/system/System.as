package blackberry.system 
{	
	import flash.net.NetworkInfo;
	import flash.net.NetworkInterface;
	
	import qnx.system.Device;
	
	import webworks.config.ConfigConstants;
	import webworks.extension.DefaultExtension;
	
	public class System extends DefaultExtension {
		
		private const SCRIPT_API_VERSION:String = "1.0.0.0";
		private const FEATURE_ID:Array = new Array ("blackberry.system");
		
		override public function getFeatureList():Array {
			return FEATURE_ID;
		}
		
		protected function model():String {	
			return String(Device.device.hardwareID);
		}
		
		/* scriptApiVersion will be retrieved from config.xml file */
		
		protected function scriptApiVersion():String {
			return SCRIPT_API_VERSION;
		} 
		
		protected function softwareVersion():String {
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
		
		protected function hasCapability():Boolean {
			var requestedCapability : String = String(super.getParameterByName("capability"));
			var supportedCapabilities:Array = new Array("media.audio.capture","media.video.capture",
							"media.recording","network.bluetooth","network.wlan");
			
			return supportedCapabilities.indexOf(requestedCapability) != -1;
		}

		/*
		* hasPermission() function
		*/

		protected function hasPermission():int {
			var requestedPermission : String = String(super.getParameterByName("module"));
	
			var permission:int = 0; // if blackberry.denied, set to 0
			var accessList:Array = super._enviro[ConfigConstants.ACCESSLIST];
			
			accessList.every(function callback(item:*, index:int, array:Array):Boolean {
					permission = uint(item.getURI() == requestedPermission);
					var continueSearch:Boolean = (permission == 0);
					return continueSearch;
				}, this);

			return permission;
		}
		
		protected function hasDataCoverage():String {
			var haveCoverage : Boolean = false;
			
			NetworkInfo.networkInfo.findInterfaces().every(
				function callback(item:NetworkInterface, index:int, vector:Vector.<NetworkInterface>):Boolean {
					haveCoverage = item.active || haveCoverage;
			
					return !haveCoverage;
				}, this);	
			
			return String(haveCoverage);
		}
		
		protected function isMassStorageActive():String {
			var noActive:Boolean = false;
			return String(noActive);
		}
	}
}