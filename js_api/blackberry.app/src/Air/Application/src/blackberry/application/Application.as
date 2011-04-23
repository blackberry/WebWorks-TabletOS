/*
* Copyright 2010-2011 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package blackberry.application
{
	import flash.desktop.NativeApplication;
	import flash.utils.describeType;
	
	import webworks.config.ConfigConstants;
	import webworks.extension.DefaultExtension;
	 
	
	public class Application extends DefaultExtension
	{
		private const FEATUREID:Array = new Array ("blackberry.app");
		
		private const JSON_DATA_STRING:String = "data";
		
		
		public function Application()
		{	
			super();
		}
		
		override public function getFeatureList():Array
		{
			return FEATUREID;
		}
		
		public function author():String
		{ 	
			return environment[ConfigConstants.AUTHOR];
		}
		
		public function authorURL():String
		{
			return environment[ConfigConstants.AUTHORURL];
		}
		
		public function authorEmail():String
		{
			return environment[ConfigConstants.AUTHOREMAIL];
		}
		
		public function description():String
		{
			return environment[ConfigConstants.DESCRIPTION];
		}
		
		public function copyright():String
		{
			return environment[ConfigConstants.COPYRIGHT];
		}
		
		public function id():String
		{
			return environment[ConfigConstants.ID];
		}
		
		public function version():String
		{
			return environment[ConfigConstants.VERSION];
		}
		
		public function license():String
		{
			return environment[ConfigConstants.LICENSE];
		}
		
		public function licenseURL():String
		{
			return environment[ConfigConstants.LICENSEURL];
		} 
		
		public function name():String
		{
			return environment[ConfigConstants.NAME];
		}
		
		public function exit():void
		{
			NativeApplication.nativeApplication.exit();
		}
		
		public function get():Object
		{
			var returnObject:Object = new Object();
			var dataObject:Object = new Object();
			var description:XML = describeType(this);
			
			var methods:XMLList = description.method.(@declaredBy=="blackberry.application::Application");
			
			methods = methods.(@returnType=="String");
			for (var i:int = 0; i < methods.length(); i++)
			{
				dataObject[methods[i].@name] = this[methods[i].@name]();
			}
			
			returnObject[JSON_DATA_STRING] = dataObject;
			
			return returnObject;
		}
	}
}