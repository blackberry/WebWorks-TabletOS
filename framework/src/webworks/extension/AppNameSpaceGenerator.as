package webworks.extension
{
	import flash.desktop.NativeApplication;
	import flash.utils.Dictionary;
	import flash.utils.setInterval;
	import flash.utils.setTimeout;
	
	import json.JSONEncoder;
	
	import webworks.config.ConfigData;

	public class AppNameSpaceGenerator
	{
		private var _getters:Array;
		
		private const APP_PROPERTIES:Array = ["author","authorEmail","authorURL","copyright","description","id","license","licenseURL","version","name"]; 
		
		public function AppNameSpaceGenerator(appConfigData:Dictionary)
		{
			_getters = new Array();
			
			for (var i:int = 0; i < APP_PROPERTIES.length; i++) {
				_getters.push(generatePropertyGetter(APP_PROPERTIES[i], appConfigData[APP_PROPERTIES[i]]));
			} 
		}
		
		public function get appNamespaceWorkaround():String
		{
			return generateExecutableScript();
		}
		
		private function generateExecutableScript() : String {
			var js : String = "(function() { if(!blackberry.app){ blackberry.app = {}; }";
			
			for each(var getter : String in _getters) {
				js += getter;
			}
			
			js += "})();"
			
			return js;
		}
		
		private function generatePropertyGetter(prop : String, value : String) : String {
			//Sample: blackberry.app.__defineGetter__("author", disp.author);
			return "blackberry.app.__defineGetter__('" + prop + "', function(){return unescape('" + escape(value) + "');});";
		}
		
	}
}