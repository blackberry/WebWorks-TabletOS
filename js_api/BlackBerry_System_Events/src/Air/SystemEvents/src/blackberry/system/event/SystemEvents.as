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

package blackberry.system.event {
	import qnx.events.DeviceBatteryEvent;
	import qnx.system.Device;
	
	import webworks.extension.DefaultExtension;
	
	public class SystemEvents extends DefaultExtension{
		
		internal var jsFunctionIDlevel:Array;
		internal var jsFunctionIDstate:Array;
		
		public function SystemEvents(){
			super();
			jsFunctionIDlevel = new Array();
			jsFunctionIDstate = new Array();
		}		
		
		public override function getFeatureList():Array{
			return new Array("blackberry.system.event");
		}
		
		public function deviceBatteryLevelChange(param:String):void{ 
			jsFunctionIDlevel[jsFunctionIDlevel.length] = param;
			var device:Device = Device.device;		
			device.addEventListener(DeviceBatteryEvent.LEVEL_CHANGE, batteryLevelChange);		
			device.batteryMonitoringEnabled = true;		
			
		}
		
		public function deviceBatteryStateChange(param:String):void{ 
			jsFunctionIDstate[jsFunctionIDstate.length] = param;
			var device:Device = Device.device;	 		
			device.addEventListener( DeviceBatteryEvent.STATE_CHANGE, batteryStateChange );	
			
			device.batteryMonitoringEnabled = true;		
		}
		
		private function batteryLevelChange( event:DeviceBatteryEvent ) : void{
			
			var level:Array = new Array(1);
			level[0] = event.batteryLevel;
			for (var i:Number=0; i<jsFunctionIDlevel.length ; i++){
				evalJavaScriptEvent(jsFunctionIDlevel[i], level);
			}
	
		}
		
		private function batteryStateChange( event:DeviceBatteryEvent ) : void{
			var level:Array = new Array(1);
			level[0] = event.batteryState;
			for (var i:Number=0; i<jsFunctionIDstate.length ; i++){
				evalJavaScriptEvent(jsFunctionIDstate[i], level);
			}
						
		}
		
	}
}