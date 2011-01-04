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