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
	import flash.filesystem.*;
	import flash.net.NetworkInfo;
	import flash.net.NetworkInterface;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.utils.Dictionary;
	import flash.utils.getTimer;
	
	import qnx.events.WebViewEvent;
	
	import webworks.access.Access;
	import webworks.access.Feature;
	import webworks.config.ConfigConstants;
	import webworks.config.ConfigData;
	import webworks.extension.AppNameSpaceGenerator;
	import webworks.extension.IApiExtension;
	import webworks.extension.SystemNameSpaceGenerator;
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
			//Temp workaround code
			webkitControl.addEventListener(Event.NETWORK_CHANGE, onNetworkChange);

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
						paths.sort();
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
					trace(url);					
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
			while(index < jsfiles.length)
			{			
				fileToLoad = jsfiles[index];
				
				var myTextLoader:URLLoader = new URLLoader();
				
				var myPattern:RegExp = /app:\//;
				
				var file:File = File.applicationDirectory;
				
				//Check to see if the file to load has 'app:/' at the begining of the path
				// if so remove it 
				file = file.resolvePath(fileToLoad.replace(myPattern, ""));				
				
				//Synchronous Read the file
				var fs:FileStream = new FileStream();
				fs.open(file, FileMode.READ);
				var data:String = fs.readUTFBytes(fs.bytesAvailable);
				
				webkitControl.executeJavaScript(data);
				trace("Loaded: " + file.name);		
				
				fs.close();
				index++;
			}
			
			//Now that all of the original js has been loaded,
			// load the workaround js
			loadWorkarounds();
			
			dispatchEvent(event);
		
		}
		
		private function loadWorkarounds():void
		{
			if (ConfigData.getInstance().isFeatureAllowed("blackberry.app", webkitControl.qnxWebView.location)) {				
				attachAppJsWorkaround();
			}
			
			if (ConfigData.getInstance().isFeatureAllowed("blackberry.system", webkitControl.qnxWebView.location)) {
				attachSystemJsWorkaround();
			}
			
			trace(event.toString());			
		}
		
		private function onNetworkChange(event:Event):void {
			saveDataConnectionStateJs(areNetworkInterfacesActive());
		}
		
		
		private function areNetworkInterfacesActive():Boolean{
			var areActive : Boolean = false;
			
			NetworkInfo.networkInfo.findInterfaces().every(
				function callback(item:NetworkInterface, index:int, vector:Vector.<NetworkInterface>):Boolean {
					areActive = item.active || areActive;
					
					return !areActive;
				}, this);
			
			return areActive;
		}
		
		private function saveDataConnectionStateJs(haveConnection : Boolean):void {
			var haveCoverageJs : String = "blackberry.system.dataCoverage = " + haveConnection + ";";
			trace(haveCoverageJs);
			webkitControl.executeJavaScript(haveCoverageJs);
		}
		
		private function saveAccessListJs():void {
			var sysNSGen:SystemNameSpaceGenerator = new SystemNameSpaceGenerator(webkitControl.qnxWebView.location);
			var accessListInitJs : String = "blackberry.system.accessList = " + sysNSGen.accessListJson + ";";
			trace(accessListInitJs);
			webkitControl.executeJavaScript(accessListInitJs);
		}
		
		private function attachSystemJsWorkaround():void{
			saveAccessListJs();
			saveDataConnectionStateJs(areNetworkInterfacesActive());
		}
		
		private function attachAppJsWorkaround():void{
			var appNSGen:AppNameSpaceGenerator = new AppNameSpaceGenerator(ConfigData.getInstance().properties);
			var workaround:String = appNSGen.appNamespaceWorkaround;	
			
			trace(workaround);
			
			webkitControl.executeJavaScript(workaround);
		}
	}
}
