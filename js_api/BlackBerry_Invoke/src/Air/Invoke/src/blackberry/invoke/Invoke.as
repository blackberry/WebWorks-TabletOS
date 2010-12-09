
package webworks.extension.blackberry.Invoke
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
		
		public function invoke():Object
		{
			var uri:String = "";
			
			uri = getParameterByIndex(0).toString();
			
			trace(uri);
			navigateToURL(new URLRequest(uri));
			return true;
		}			
	}
}