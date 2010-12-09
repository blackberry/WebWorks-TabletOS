package webworks.extension
{
	import flash.utils.Dictionary;
	
	import json.JSON;
	
	import qnx.media.QNXStageWebView;
	
	public class DefaultExtension implements IApiExtension{	
		
		protected var _enviro:Dictionary;
		protected var _query:String;
		
		public function DefaultExtension(){
		}
		
		public function register(environmentVarialbes:Dictionary):void{
			_enviro = environmentVarialbes;
		}
		
		public function loadFeature(feature:String, version:String):void{
		}
		
		public function unloadFeature():void{
		}
		
		public function getFeatureList():Array{
			return null;
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
		
		
		protected function getWebView():QNXStageWebView{
			return _enviro["webview"];	
		}
		
		/**
		 * illegal index will return null to handle optional parameters
		 */
		protected function getParameterByIndex(index:Number):Object{
			var splits:Array = _query.split("&");
			
			if(splits.length <= index){
				return null;
			}
			return JSON.decode(splits[index].split("=")[1]);
		}
		/**
		 * illegal name will return null to handle optional parameters
		 */
		protected function getParameterByName(name:String):Object{
			
			var splits:Array = _query.split("&");
			for (var i:Number=0; i<splits.length;i++){
				
				var key:String = splits[i].split("=")[0];
				if(key == name){
					return JSON.decode(splits[i].split("=")[1]);
				}
			}			
			return null;
			
		}
		
		
		protected static function evalJavaScriptEvent(id:String,params:Array){
			
			javaScript:String = "blackberry.events.getHandlerById("+id+")(";
			
			
			for (var i:Number=0; i<params.length;i++){
				if(i== 0){
					javaScript += param;
				}else{
					javaScript += ","+ param;					
				}				
			}
					
			javaScript += ");";
			
			getWebView().executeJavaScript(javaScript);			
			
		}
		
	}
}