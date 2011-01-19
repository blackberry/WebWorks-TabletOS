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
	import flash.events.EventDispatcher;
	import flash.events.IOErrorEvent;
	import flash.filesystem.File;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.utils.Dictionary;
	import flash.utils.getTimer;
	
	import qnx.events.WebViewEvent;
	
	import webworks.access.Access;
	import webworks.access.Feature;
	import webworks.config.ConfigConstants;
	import webworks.config.ConfigData;
	import webworks.extension.IApiExtension;
	import webworks.policy.WidgetPolicy;
	import webworks.webkit.WebkitControl;
	import webworks.webkit.WebkitEvent;

	public class JavaScriptLoader extends  EventDispatcher
	{
		private static var globalSharedJSFolder:String = "js/sharedglobal/";
		
		private var webkitControl:WebkitControl;
		private var jsfiles:Array;
		private var fileToLoad:String;
		private var index:int = 0;
		private var event:WebViewEvent;
		
		public function JavaScriptLoader(webkitcontrol:WebkitControl)
		{
			webkitControl = webkitcontrol;
		}
				
		//register javascript file for features required by the url
		public function registerJavaScript(url:String, e:WebViewEvent):void
		{
			event = e;
			jsfiles = getCommonJSFiles();
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
						jsfiles = jsfiles.concat(paths);
					}
				}
			}
			
			if ( jsfiles.length > 0 )
				loadJavaScriptFiles();
		}
		
		//Load common JavaScript files
		private function getCommonJSFiles():Array
		{
			//loop through the js folder and load all the files
			var file:File = File.applicationDirectory.resolvePath(globalSharedJSFolder);
			var files:Array = file.getDirectoryListing();
			//sort the array based on the "url" field in default way, case-sensitive Z precedes a, ascending a preceds b, 1 preceds 2
			files.sortOn("url");
			var urls:Array = new Array();
			for(var index:String in files){
				var js:File = files[index];
				if ( js != null && js.type == ".js" ){
					var url:String = js.url;
  				    urls.push(js.url);
				}
			}
			return urls;
		}
		
		//start loading js files in files, start with element at index
		private function loadJavaScriptFiles():void {
			index = 0;
			loadJavaScriptFile();
		}
		
		private function loadJavaScriptFile():void {
			if ( index >= jsfiles.length ){
				dispatchEvent(event);
				return;
			}
			
			fileToLoad = jsfiles[index];
			
			var myTextLoader:URLLoader = new URLLoader();			
			myTextLoader.addEventListener(Event.COMPLETE, onJavaScriptFileLoaded,false);		
			myTextLoader.addEventListener(IOErrorEvent.IO_ERROR, onJavaScriptFileError,false);
			
			myTextLoader.load(new URLRequest(fileToLoad));

			trace("Loading JavaScript file: " + fileToLoad);			
		}
		
		private function onJavaScriptFileLoaded(e:Event):void {
			//trace("start loading JS file: " + filename);
			var start:int = getTimer();
			webkitControl.executeJavaScript(e.target.data);
			trace("single call to .executeJavaScript() time:" + ( getTimer() - start) + "ms");
			trace("Loaded JavaScript file: " + fileToLoad);
			index++;
			loadJavaScriptFile();
		}
		
		private function onJavaScriptFileError(e:Event):void {
			trace("ERROR: Unable to load JavaScript file: " + fileToLoad + " message: " + e.toString());
			index++;
			loadJavaScriptFile();			
		}		
	}
}
