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
package webworks.extension
{
	import flash.events.Event;
	import flash.events.TouchEvent;
	import flash.events.TransformGestureEvent;
	import flash.utils.*;
	
	import json.JSON;
	
	import qnx.media.QNXStageWebView;
	
	import webworks.access.Feature;

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
	public class ApplicationEvent implements IApiExtension
	{	
		private var javaScriptOnForeground:String = "";
		private var javaScriptOnBackground:String = "";
		private var _enviro:Dictionary;
		
		public function ApplicationEvent(){
		}
		
		public function register(environmentVarialbes:Dictionary):void{
			_enviro = environmentVarialbes;
		}
		
		public function loadFeature(feature:String, version:String):void
		{
		}
		
		public function unloadFeature():void{
			
			var webView:QNXStageWebView;		
			webView = _enviro["webview"];			
			webView.removeEventListener(Event.ACTIVATE,activate);
			webView.removeEventListener(Event.DEACTIVATE,deactivate);
		}
		
		public function getFeatureList():Array
		{

			return new Array("blackberry.app.event");
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
			return true;
		}
		
		public function onForeground(query:String):void{
			javaScriptOnForeground = JSON.decode(query.split("=")[1]);
			var webView:QNXStageWebView;		
			webView = _enviro["webview"];			
			webView.addEventListener(Event.ACTIVATE,activate);
			
		
		}
		
		private function onTouchBegin(e:TouchEvent):void
		{
			trace("START TOUCH");
		}
		
		private function onTouchEnd(e:TouchEvent):void
		{
			trace("END TOUCH");
		}
		
		private function onTouchMove(e:TouchEvent):void
		{
			trace("Move");
		}
		
		private function onZoom(e:TransformGestureEvent):void
		{
			trace("onZoom");
		}
		
		
		public function onBackground(query:String):void{
			javaScriptOnBackground = JSON.decode(query.split("=")[1]);
			var webView:QNXStageWebView;
			webView = _enviro["webview"];
			webView.addEventListener(Event.DEACTIVATE,deactivate);
			
		}
		
		public function activate(event:Event):void{
			var webView:QNXStageWebView;
			
			webView = _enviro["webview"];
			webView.executeJavaScript(javaScriptOnForeground + "("+  ");");
		}
		
		public function deactivate(event:Event):void{
			var webView:QNXStageWebView;
			
			webView = _enviro["webview"];
			webView.executeJavaScript(javaScriptOnBackground + "(" + ");");
		}
		
	}
}