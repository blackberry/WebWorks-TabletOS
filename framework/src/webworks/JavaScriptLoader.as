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
	import flash.utils.Dictionary;
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
			
			var tempFilesNames:Dictionary = new Dictionary();
						
			var sortedFiles:Array = new Array(files.length);
			
			for(var index:String in files){
				
				
				var js:File = files[index];
				if ( js != null && js.type == ".js" ){
					var url:String = js.url;
					var split:Array = js.url.split("/");									
					var name1:String = split[split.length-1];//using name variable name gives a warning because its defined in parent.	
					tempFilesNames[name1] = js.url;
				}
				
			}
			
			sortedFiles = extractKeysFrom(tempFilesNames);
			sortedFiles.sort();
			
			for each(var name : * in sortedFiles){
								
				var url1:String = tempFilesNames[name];//using url variable name gives a warning because its defined in parent.				
				loadJavaScriptFile(url1, webkitControl);				
			}		

		}
		
		private function extractKeysFrom(source : Dictionary) : Array{
			var output : Array = [];
			
			// Note that Dictionary’s Keys are untyped as they can contain
			// any value.
			for (var prop : * in source)
			{
				output.push(prop);
			}
			return output;
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
