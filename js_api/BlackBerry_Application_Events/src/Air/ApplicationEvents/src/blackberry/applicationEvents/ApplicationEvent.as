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
package blackberry.applicationEvents
{
	import flash.events.Event;
	import flash.utils.*;
	
	import webworks.extension.DefaultExtension;
	
	
	/**
	 * This extension provides support for Application events
	 * 
	 * 	static  void   onBackground  ( callback : OnAppEvent )
	 * 	static  void   onForeground ( callback : OnAppEvent )  
	 * 
	 * Noteworthy - This onForeground callback will not get called when the Application is first 
	 * loaded.
	 * 
	 * Author - Nukul Bhasin (Software Developer - Research In Motion)
	 */
	public class ApplicationEvent extends DefaultExtension
	{	
		private var javaScriptOnForeground:String = "";
		private var javaScriptOnBackground:String = "";
		
		
		public function ApplicationEvent(){
		}
		
		
		public override function loadFeature(feature:String, version:String):void
		{
		}
		
		public override function unloadFeature():void{
			
			webView.removeEventListener(Event.ACTIVATE,activate);
			webView.removeEventListener(Event.DEACTIVATE,deactivate);
		}
		
		public override function getFeatureList():Array{
			
			return new Array("blackberry.app.event");
		}
		
		
		public function onForeground(param:String):void{
			javaScriptOnForeground = param; 						
			webView.addEventListener(Event.ACTIVATE,activate);		
		}
		
		public function onBackground(param:String):void{
			javaScriptOnBackground = param;			
			webView.addEventListener(Event.DEACTIVATE,deactivate);
			
		}
		
		public function activate(event:Event):void{
			this.evalJavaScriptEvent(javaScriptOnForeground,new Array());
		}
		
		public function deactivate(event:Event):void{
			this.evalJavaScriptEvent(javaScriptOnBackground,new Array());
		}
		
	}
}