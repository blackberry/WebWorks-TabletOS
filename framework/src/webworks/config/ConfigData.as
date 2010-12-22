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
package webworks.config
{
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.events.IEventDispatcher;
	import flash.sensors.Accelerometer;
	import flash.utils.Dictionary;
	
	import webworks.access.Access;
	import webworks.access.Feature;
	import webworks.errors.AccessError;
	import webworks.extension.IApiExtension;
	import webworks.policy.WidgetPolicy;
	
	public class ConfigData extends EventDispatcher
	{
		//-------------------------------------
		//  properties
		//-------------------------------------
		private static var _instance:ConfigData = null; 
		
		private var _properties:Dictionary; // fake comments		
		
		public function ConfigData(blocker:SingletonEnforcer, target:IEventDispatcher=null)
		{
			if (blocker != null)
			{			
				
				//TODO: implement function
				super(target);
				
				// initialization
				init();
				
				// load config.xml data
				loadCustomConfig();	
			}
			else
			{
				throw new Error("Error: Instantiation failed: Use ConfigData.getInstance()");
			}			
			
		}
		
		public function get properties():Dictionary {
			if (_properties == null)
				_properties = new Dictionary();
			
			return _properties;
		}
		
		private function init():void {
			for (var i:String in Globals.defaultValues) {
				setProperty(i, Globals.defaultValues[i]);
			}
		}
		
		private function loadCustomConfig():void {
			for (var i:String in CustomData.values) {
				setProperty(i, CustomData.values[i]);
			}
			//generate featuretables properties			
			var featureList:Object = new Object();
			var feature:Feature;
			var accessList:Array = getProperty(ConfigConstants.ACCESSLIST);
			var access:Access;
			for(var accessKey:String in accessList)
			{
				access = accessList[accessKey] as Access;
				if ( access == null )
					continue;
                var accessFeatures:Array = access.getFeatures();
				for(var featureKey:String in accessFeatures)
				{
      				feature = accessFeatures[featureKey];
					//loop extensions to find match
					var widgetExtensions:Array = getProperty(ConfigConstants.WIDGETEXTENSIONS);
     				for(var key:String in widgetExtensions)
	     			{
			     		var extension:IApiExtension = widgetExtensions[key][ConfigConstants.ENTRYCLASS] 
							as IApiExtension;
						if ( extension != null )
						{
							var features:Array = extension.getFeatureList();
							for(var index:String in features)
							{
								if ( feature.getID() == features[index] )
 								    featureList[feature.getID()] = widgetExtensions[key];
							}
						}
					}
				}
			}
			setProperty(ConfigConstants.FEATURETABLE, featureList);
		}	
		
		//-----------------------------------------------------------------------------
		//
		//  Methods
		//
		//-----------------------------------------------------------------------------
		//check the color format is #rrggbb, if not return 0x000000
		public function getLoadingScreenColor():uint
		{
			var color:String = getProperty(ConfigConstants.LOADINGSCREENCOLOR) as String;
			var reg:RegExp = new RegExp(/^#[A-Fa-f0-9]{6}$/);
			if ( reg.test(color) )
			{
				color = color.replace(/^#/, "0x");
				return parseInt(color);
			}
			return 0x000000;
		}
		
		public function loadCustomData(data:Object):void {
			
			init();
			
			for (var i:String in data) {
				setProperty(i, data[i]);
			}
		}
		
		public function setProperty(name:String, value:*):void {
			if (properties[name] == value)
				return;
			
			properties[name] = value;
			
			dispatchChangeEvent();
		}
		
		public function getProperty(name:String):* {
			return properties[name];
		}
		
		//find extension which implements the feature
		public function getExtension(featureId:String):IApiExtension
		{
			var widgetExt:Object = getWidgetExtension(featureId);
			return widgetExt[ConfigConstants.ENTRYCLASS] as IApiExtension;
		}
		
		public function getWidgetExtension(featureId:String):Object
		{
			var features:Object = getProperty(ConfigConstants.FEATURETABLE);
			if ( features != null )
				return features[featureId];
			else
				return null;
		}
		
		public function getAccessList():Array
		{
			return getProperty(ConfigConstants.ACCESSLIST);
		}
		
		public function getAccessByUrl(url:String):Access 
		{
			return WidgetPolicy.instance.getElement(url, getAccessList());
		}
		
		public function isFeatureAllowed(featureId:String, url:String):Boolean
		{
			var access:Access = getAccessByUrl(url);
			if ( access != null )
			{
				var features:Array = access.getFeatures();
				for(var index:String in features)
				{
					var feature:Feature = features[index];
					if ( feature != null && feature.getID() == featureId )
						return true;
				}
			}
			return false; 
		}
		
		protected function dispatchChangeEvent():void {
			var event:Event = new Event(Event.CHANGE);	
			dispatchEvent(event);
		}		
		
		public static function getInstance():ConfigData {
			if(_instance == null)
				_instance = new ConfigData(new SingletonEnforcer());
			
			return _instance; 
		}
		
		public static function createInstance():ConfigData {
			_instance = new ConfigData(new SingletonEnforcer());
			return _instance;
		}
	}
}

internal class SingletonEnforcer {};
	
