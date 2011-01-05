package webworks.extension
{
	import flash.utils.Dictionary;
	
	import json.JSONEncoder;
	
	import webworks.access.Access;
	import webworks.access.Feature;
	import webworks.config.ConfigConstants;
	import webworks.config.ConfigData;
	
	public class SystemNameSpaceGenerator
	{
		private var _jsonAccessList:String;
		
		public function SystemNameSpaceGenerator()
		{
			var permissions : Access = ConfigData.getInstance().getAccessByUrl("http://rim.net");
			var permissionList:Array = [];
			
			var features:Array = permissions.getFeatures();
			for(var i:int = 0; i< features.length; i++) {
				permissionList.push(features[i].getID());
			}
			
			_jsonAccessList = (new json.JSONEncoder(permissionList)).getString(); 
		}
		
		public function get accessListJson():String
		{
			return _jsonAccessList;
		}	

	}
}		
