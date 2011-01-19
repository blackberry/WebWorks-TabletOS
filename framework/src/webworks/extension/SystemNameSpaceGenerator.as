package webworks.extension
{
	import json.JSONEncoder;
	
	import webworks.access.Access;
	import webworks.config.ConfigData;
	
	public class SystemNameSpaceGenerator
	{
		private var _jsonAccessList:String;
		
		public function SystemNameSpaceGenerator()
		{
			var permissions : Access = ConfigData.getInstance().getAccessByUrl("http://rim.net");
			var permissionList:Array = [];
			if ( permissions != null ) {
			    var features:Array = permissions.getFeatures();
			    for(var i:int = 0; i< features.length; i++) {
				    permissionList.push(features[i].getID());
			    }
			}
			_jsonAccessList = (new json.JSONEncoder(permissionList)).getString(); 
		}
		
		public function get accessListJson():String
		{
			return _jsonAccessList;
		}	

	}
}		
