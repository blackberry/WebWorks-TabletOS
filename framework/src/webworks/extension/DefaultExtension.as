package webworks.extension
{
	import flash.errors.IllegalOperationError;
	import flash.utils.Dictionary;
	
	import json.JSON;
	
	import qnx.media.QNXStageWebView;
	
	public class DefaultExtension implements IApiExtension {	
		
		private var _enviro:Dictionary;
		private var _query:String;
		
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
		
		public function invokeFunction(method:String, parameters:String = ""):Object {
			var myReturn:Object = "";
			_query = parameters;
			
			var keyValuePairs : Array = getParameterArrayFromQuery(parameters);
			var valueParams : Array = getValueArray(keyValuePairs);
			
			try{	
				myReturn = this[method].apply(this, valueParams);				
			}
			catch(e:ReferenceError) {
				trace(e);			
			}
			
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
		
		protected function evalJavaScriptEvent(id:String,params:Array) : void {
			var javaScript:String = "blackberry.events.getHandlerById("+id+")(";
			
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
		
		private function getValueArray(keyValuePairs : Array) : Array {
			var values : Array = new Array();
			
			for (var i : int = 0; i < keyValuePairs.length; i++) {
			
				var decompParam : Array = keyValuePairs[i].split("=");				
				values.push(decompParam[1]);				
			}
			
			return values;
		}
		
		private function getParameterArrayFromQuery(parameters : String) : Array {
			return parameters.length > 0 ? _query.split("&") : [];
		}		
	}
}