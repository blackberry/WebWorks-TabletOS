package webworks.extension
{
	import flash.utils.Dictionary;
	
	import json.JSONEncoder;
	
	import webworks.config.ConfigData;

	public class AppNameSpaceGenerator
	{
		private var _appData:Object;
		private var _jsonAppData:String;
		
		private const keys:Array = ["author","authorEmail","authorURL","copyright","description","id","isForeground","license","licenseURL","version","name"]; 
		
		public function AppNameSpaceGenerator(appData:Dictionary)
		{
			_appData = new Object();
			
			for (var i:int = 0; i < keys.length; i++)
			{
				_appData[keys[i]] = appData[keys[i]];
			}			
			_jsonAppData = (new json.JSONEncoder(_appData)).getString(); 
		}
		
		public function get appDataJson():String
		{
			return _jsonAppData;
		}	
		
	}
}