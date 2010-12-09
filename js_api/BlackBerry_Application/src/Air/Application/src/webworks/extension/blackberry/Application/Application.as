package webworks.extension.blackberry.Application
{
	import flash.utils.Dictionary;
	
	import webworks.config.ConfigConstants;
	import webworks.extension.IApiExtension;
	 
	
	public class Application implements IApiExtension
	{
		private var _enviro:Dictionary;		
		private const FEATUREID:Array = new Array ("blackberry.app");
		
		
		public function Application()
		{						
		}
		
		public function register(environmentVariables:Dictionary):void
		{
			_enviro = environmentVariables;
		}
		
		public function loadFeature(feature:String, version:String):void
		{
		}
		
		public function unloadFeature():void
		{
		}
		
		public function getFeatureList():Array
		{
			return FEATUREID;		
		}
		
		public function invokeFunction(method:String, query:String):Object
		{		
			var myReturn:Object;
			try{			
				myReturn = this[method](query);				
			}
			catch(e:ReferenceError) {
				trace(e);
				myReturn = null;				
			}
			return myReturn;
		}
		
		private function author(parameters:String):Object
		{			
			return _enviro[ConfigConstants.AUTHOR];			  
		}
		
		private function authorURL(parameters:String):Object
		{
			return _enviro[ConfigConstants.AUTHORURL];			
		}		
		
		private function authorEmail(parameters:String):Object
		{
			return _enviro[ConfigConstants.AUTHOREMAIL];			
		}		
		
		private function getDescription(parameters:String):Object
		{
			return _enviro[ConfigConstants.DESCRIPTION];			
		}
		
		private function copyright(parameters:String):Object
		{
			return _enviro[ConfigConstants.COPYRIGHT];			
		}
		
		private function id(parameters:String):Object
		{
			return _enviro[ConfigConstants.ID];
		}
		
		private function version(parameters:String):Object
		{			
			return _enviro[ConfigConstants.VERSION];			
		}		
		
		private function license(parameters:String):Object
		{
			return _enviro[ConfigConstants.LICENSE];			
		}		
		
		private function licenseURL(parameters:String):Object
		{
			return _enviro[ConfigConstants.LICENSEURL];			
		}
		
		private function name(parameters:String):Object
		{
			return _enviro[ConfigConstants.NAME];			
		}		
	}
}