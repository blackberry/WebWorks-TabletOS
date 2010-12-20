package blackberry.system.event {
	import qnx.events.DeviceBatteryEvent;
	import qnx.system.Device;
	
	import webworks.extension.DefaultExtension;
	
	public class SystemEvents extends DefaultExtension{
		
		internal var jsFunctionIDlevel:String;
		internal var jsFunctionIDstate:String;
		
		public function SystemEvents(){
			super();
		}		
		
		public override function getFeatureList():Array{
			return new Array("blackberry.system.event");
		}
		
		public function deviceBatteryLevelChange(param:String):void{ 
			jsFunctionIDlevel = param;
			var device:Device = Device.device;		
			device.addEventListener(DeviceBatteryEvent.LEVEL_CHANGE, batteryLevelChange);		
			device.batteryMonitoringEnabled = true;		
			
		}
		
		public function deviceBatteryStateChange(param:String):void{ 
			jsFunctionIDstate = param;
			var device:Device = Device.device;	 		
			device.addEventListener( DeviceBatteryEvent.STATE_CHANGE, batteryStateChange );	
			
			device.batteryMonitoringEnabled = true;		
		}
		
		private function batteryLevelChange( event:DeviceBatteryEvent ) : void{
			
			var level:Array = new Array(1);
			level[0] = event.batteryLevel;
			
			evalJavaScriptEvent(jsFunctionIDlevel, level);		
		}
		
		private function batteryStateChange( event:DeviceBatteryEvent ) : void{
			var level:Array = new Array(1);
			level[0] = event.batteryState;
			evalJavaScriptEvent(jsFunctionIDstate, level);				
		}
		
	}
}