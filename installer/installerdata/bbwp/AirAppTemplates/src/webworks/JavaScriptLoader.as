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
package webworks
{
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.filesystem.File;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.utils.getTimer;
	
	import webworks.access.Access;
	import webworks.access.Feature;
	import webworks.config.ConfigConstants;
	import webworks.config.ConfigData;
	import webworks.extension.IApiExtension;
	import webworks.policy.WidgetPolicy;
	import webworks.webkit.WebkitControl;

	public class JavaScriptLoader
	{
		private static var globalSharedJSFolder:String = "js/sharedglobal/";
		
		private var webkitControl:WebkitControl;
		public function JavaScriptLoader(webkitcontrol:WebkitControl)
		{
			webkitControl = webkitcontrol;
		}
		
		//register javascript file for features required by the url
		public function registerJavaScript(url:String):void
		{
			loadCommonJSFiles();
			//insert js needed for feautes specified by the access
			var access:Access = ConfigData.getInstance().getAccessByUrl(url);			
			if ( access != null )
			{
				var features:Array = access.getFeatures();
				var extension:IApiExtension;
				var paths:Array;
				for(var index:String in features)
				{
					var feature:Feature = features[index] as Feature;
					if ( feature == null )
						continue;
					var widgetExt:Object = ConfigData.getInstance().getWidgetExtension(feature.getID());
					if ( widgetExt != null )
					{
						//call loadFeature() of the extension
						extension = widgetExt[ConfigConstants.ENTRYCLASS] as IApiExtension;
						if ( extension != null )
							extension.loadFeature(feature.getID(), feature.getVersion());
						//register js files for the feature
						paths = widgetExt[ConfigConstants.REQUIREDJSFILES] as Array;
						for(var pathIndex:String in paths)
						{
							loadJavaScriptFile(paths[pathIndex], webkitControl);
						}
					}
				}
			}			
		}
		
		//Load common JavaScript files
		private function loadCommonJSFiles():void
		{
			//loop through the js folder and load all the files
			var file:File = File.applicationDirectory.resolvePath(globalSharedJSFolder);
			var files:Array = file.getDirectoryListing();
			for(var index:String in files)
			{
				var js:File = files[index];
				if ( js != null && js.type == ".js" )
					loadJavaScriptFile(js.url, webkitControl);				
			}
		}

		//load the js file and execute
		private function loadJavaScriptFile(filename:String, webWindow:WebkitControl):void {			
			
			var myTextLoader:URLLoader = new URLLoader();			
			myTextLoader.addEventListener(Event.COMPLETE, onJavaScriptFileLoaded);		
			myTextLoader.addEventListener(IOErrorEvent.IO_ERROR, onJavaScriptFileError);
			
			myTextLoader.load(new URLRequest(filename));
			
			trace("Loading JavaScript file: " + filename);
			
			function onJavaScriptFileLoaded(e:Event):void {
				
				trace("start loading JS file: " + filename);
				var start:int = getTimer();
				webWindow.executeJavaScript(e.target.data);
				trace("single call to .executeJavaScript() time:" + ( getTimer() - start) + "ms");
				trace("Loaded JavaScript file: " + filename);				
			}
			
			function onJavaScriptFileError(e:Event):void {
				trace("ERROR: Unable to load JavaScript file: " + filename + " message: " + e.toString());
			}	
		}		
	}
}
