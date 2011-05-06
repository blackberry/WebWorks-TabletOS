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
package webworks.extension
{
	import flash.errors.IllegalOperationError;
	import flash.utils.Dictionary;
	
	import json.JSON;
	
	import qnx.media.QNXStageWebView;
	
	public class DefaultExtension implements IApiExtension {	
		
		private var _paramKeys : Array;
		private var _paramValues : Array;
		
		private var _enviro : Dictionary;
		private var _query : String;
		
		public function register(environmentVarialbes:Dictionary):void{
			_enviro = environmentVarialbes;
		}
		
		public function loadFeature(feature:String, version:String):void{
		}
		
		public function unloadFeature():void{
		}
		
		public function getFeatureList():Array{
			throw new IllegalOperationError("No features defined. Method must be overriden in implementing extension.");
		}
		
		public function invokeFunction(method:String, parameters:String = ""):String {
			var myReturn:Object = "";
			_query = parameters;
			
			var keyValuePairs : Array = getParameterArrayFromQuery(parameters);
			_paramKeys = getParamKVArray(keyValuePairs)[0];
			_paramValues = getParamKVArray(keyValuePairs)[1];			
			
			//If a "method" that does not exist is called a reference error will be thrown,  
			// we will catch this in the WebWorksAppTemplate
			myReturn = this[method].apply(this, _paramValues);		
		
			return JSON.encode(myReturn);
		}
		
		protected function get query() : String {
			return _query;
		}
		
		protected function get environment() : Dictionary {
			if(_enviro == null) {
				throw new IllegalOperationError("Extension has not been registered.");
			}
			
			return _enviro; 
		}
		
		
		protected function get webView():QNXStageWebView{
			return _enviro["webview"];	 
		} 
		
		protected function getParameterByIndex(index : int) : Object {
			if(index < 0 || index >= _paramValues.length) {
				throw new IllegalOperationError("Index must be between 0 and " + (_paramValues.length - 1));
			}
			return _paramValues[index];
		}
		
		protected function getParameterByName(name : String) : Object {
			var index : int = _paramKeys.indexOf(name);
			
			return (index < 0) ? null : _paramValues[index];
		}
		
		protected function evalJavaScriptEvent(id:String,params:Array) : void {
			var javaScript:String = "blackberry.events.getEventHandler("+id+")(";
			
			for (var i:Number=0; i<params.length;i++){
				if(i== 0){
					javaScript += params[i];
				}else{
					javaScript += ","+ params[i];					
				}				
			}
			
			javaScript += ");";
			
			this.webView.executeJavaScript(javaScript);			 
		} 
		
		protected function encodeEventParams(params:Array):Array
		{
			var jsonParams:Array = [];
			
			for each (var p:Object in params)
			{
				jsonParams.push(JSON.encode(p));
			}
			
			return jsonParams;
		}
		
		private function getParamKVArray(keyValuePairs : Array) : Array {
			var keys : Array = new Array();
			var values : Array = new Array();
			
			for (var i : int = 0; i < keyValuePairs.length; i++) {
			
				var decompParam : Array = keyValuePairs[i].split("=");
				keys.push(decompParam[0]);
				values.push(unescape(decompParam[1]));				
			}
			
			return [keys, values];
		}
		
		private function getParameterArrayFromQuery(parameters : String) : Array {
			return parameters.length > 0 ? _query.split("&") : [];
		}
	}
}