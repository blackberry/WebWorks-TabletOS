package webworks.extension
{
	import flash.utils.Dictionary;
	
	import json.JSON;
	
	import qnx.media.QNXStageWebView;
	
	public class DefaultExtension implements IApiExtension{	
		
		private var _enviro:Dictionary;
		private var _query:String;
		
		private var _features : Array;
		
		public function DefaultExtension(){
			_features = new Array(); //initialize with empty array to avoid null pointers
		}
		
		public function register(environmentVarialbes:Dictionary):void{
			_enviro = environmentVarialbes;
		}
		
		public function loadFeature(feature:String, version:String):void{
		}
		
		public function unloadFeature():void{
		}
		
		public function getFeatureList():Array{
			return _features;
		}
		
		public function set featureList(featureList : Array) : void {
			_features = featureList;
		}
		
		public function invokeFunction(method:String, parameters:String = ""):Object{
			
			var myReturn:Object = new Object();
			try{
				_query = parameters;
				myReturn = this[method]();				
			}
			catch(e:ReferenceError) {
				trace(e);
				return null;				
			}
			return JSON.encode(myReturn);
		}
		
		public function get query() : String {
			return _query;
		}
		
		public function get environment() : Dictionary {
			return _enviro;
		}
		
		/*
		public function get webView():QNXStageWebView{
			return _enviro["webview"];	
		}
		*/
		
		/**
		 * illegal index will return null to handle optional parameters
		 */
		public function getParameterByIndex(index:Number):Object{
			var splits:Array = _query.split("&");
			
			if(splits.length <= index){
				return null;
			}
			return JSON.decode(splits[index].split("=")[1]);
		}
		/**
		 * illegal name will return null to handle optional parameters
		 */
		public function getParameterByName(name:String):Object{
			
			var splits:Array = _query.split("&");
			for (var i:Number=0; i<splits.length;i++){
				
				var key:String = splits[i].split("=")[0];
				if(key == name){
					return JSON.decode(splits[i].split("=")[1]);
				}
			}			
			return null;
			
		}
		
		public function evalJavaScriptEvent(id:String,params:Array) : void {
			
			var javaScript:String = "blackberry.events.getHandlerById("+id+")(";
			
			
			for (var i:Number=0; i<params.length;i++){
				if(i== 0){
					javaScript += params[i];
				}else{
					javaScript += ","+ params[i];					
				}				
			}
					
			javaScript += ");";
	
			//getWebView().executeJavaScript(javaScript);			
			
		}
		
	}
}