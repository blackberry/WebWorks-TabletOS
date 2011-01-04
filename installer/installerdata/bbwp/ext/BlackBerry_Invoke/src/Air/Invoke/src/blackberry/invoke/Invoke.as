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
package blackberry.invoke
{
	import flash.net.URLRequest;
	import flash.net.navigateToURL;
	
	import webworks.extension.DefaultExtension;

	
	public class Invoke extends DefaultExtension
	{
		
		/*
		All the currently available applications to launch 
		navigateToURL(new URLRequest("map://"));									//Doesnt work
		navigateToURL(new URLRequest("update://"));									//Doesnt work
		navigateToURL(new URLRequest("appworld://"));			//Works
		navigateToURL(new URLRequest("http://www.google.com"));	//Works but does not go to google
		navigateToURL(new URLRequest("videos://"));				//Works
		navigateToURL(new URLRequest("music://"));				//Works
		navigateToURL(new URLRequest("photos://"));				//Works			
		navigateToURL(new URLRequest("camera://video"));							//Doesn't work
		navigateToURL(new URLRequest("camera://"));									//Doesn't work
		*/
		
		/* Example of how to xhr will look. This launchs the video camera
		* device://blackberry/Invoke/invoke?appType=camera://&p2=video
		*/ 
		
		private const FEATUREID:Array = new Array ("blackberry.invoke");		
		
		public function Invoke()
		{
			 
		}		
		
		override public function getFeatureList():Array
		{
			return FEATUREID;
		}		 
		
		public function invoke(appType:String):void
		{	
			navigateToURL(new URLRequest(appType));			
		}			
	}
}