package blackberry.ui.dialog
{
	import flash.events.Event;
	import flash.utils.*;
	
	import json.JSON;
	
	import qnx.dialog.AlertDialog;
	import qnx.dialog.DialogAlign;
	import qnx.dialog.DialogSize;
	import qnx.media.QNXStageWebView;
	
	import webworks.extension.IApiExtension;
	import webworks.access.Feature;
	
	/**
	 * 
	 * Dialog extension for creating a dialog.
	 * Two JavaScript APIs are currently supported by this extension
	 * 
	 * 	static  void   customAsk ( message : String ,  choices : string[] ,  onClick: String)
	 * 	static  void   standardAsk ( type : Number ,  message : String ,  onClick :String ) 
	 * 
	 * author - Nukul Bhasin (Software Developer - Research in Motion)
	 * 
	 */
	public class Dialog implements IApiExtension
	{	
		private static const D_OK:int = 0;
		private static const D_SAVE:int = 1;
		private static const D_DELETE:int = 2;
		private static const D_YES_NO:int = 3;
		private static const D_OK_CANCEL:int = 4;
		private static const BOTTOM:String = "bottomCenter"; 
		private static const CENTER:String = "middleCenter";
		private static const TOP:String = "topCenter";
		private static const SIZE_FULL:String = "full";
		private static const SIZE_LARGE:String = "large";
		private static const SIZE_MEDIUM:String = "medium";
		private static const SIZE_SMALL:String = "small";
		private static const SIZE_TALL:String = "tall";
		
		private var javaScript:String = "";
		
		private var _enviro:Dictionary;
		
		
		public function Dialog()
		{
		}
		
		public function register(environmentVarialbes:Dictionary):void
		{
			_enviro = environmentVarialbes;
		}
		
		public function loadFeature(feature:String, version:String):void
		{
		}
		
		public function unloadFeature():void
		{
		}
		
		public function getFeatureList():Array
		{
			return new Array("blackberry.ui.dialog");
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
		private function standardAsk(query:String):void
		{	
			
			var splits:Array = query.split("&");
			
			var standardType:Object = splits[0].split("=")[1];
			var message:Object = splits[1].split("=")[1];
			javaScript = JSON.decode(splits[2].split("=")[1]);
			
			var eMessage:String = JSON.decode(message.toString());
			var eStandardType:Number = JSON.decode(standardType.toString());
			var eButtons:Array = new Array(2);
			if(eStandardType == D_DELETE){
				eButtons[0] = "Delete";
				eButtons[1] = "Cancel";
				createDialog(eMessage,eButtons);
			}else if(eStandardType == D_OK){
				eButtons = new Array(1);
				eButtons[0] = "OK";
				createDialog(eMessage,eButtons);
			}else if(eStandardType == D_OK_CANCEL){				
				eButtons[0] = "OK";
				eButtons[1] = "Cancel";
				createDialog(eMessage,eButtons);
			}else if(eStandardType == D_SAVE){				
				eButtons[0] = "Save";
				eButtons[1] = "Cancel";
				createDialog(eMessage,eButtons);
			}else if(eStandardType == D_YES_NO){				
				eButtons[0] = "Yes";
				eButtons[1] = "No";
				createDialog(eMessage,eButtons);
			}
			
		}
		
		private function customAsk(query:String):void
		{				
			var splits:Array = query.split("&");
			var i:Number = splits.length;
			
			var message:Object = splits[0].split("=")[1];
			var buttons:Object = splits[1].split("=")[1];
			var onclick:Object = splits[2].split("=")[1];
			var options:Object = new Object();	
			
			if (i > 3){
				options = splits[3].split("=")[1];
				javaScript = JSON.decode(splits[3].split("=")[1]);
			} else {
				options = null;
				javaScript = JSON.decode(splits[2].split("=")[1]);
			}
			
			var eMessage:String = JSON.decode(message.toString());
			var eButtons:Array = JSON.decode(buttons.toString());
			var eOptions:Dictionary = new Dictionary();
			
			var title:String = new String();
			var size:String = new String();
			var position:String = new String();
			
			eOptions["title"] = "";
			eOptions["size"] = "";
			eOptions["position"] = "";
			
			if (i >3){
				eOptions["title"] = JSON.decode(options.toString())[0];
				eOptions["size"] = JSON.decode(options.toString())[1];
				eOptions["position"] = JSON.decode(options.toString())[2];
				createDialog(eMessage, eButtons, eOptions);	
			} else {
				createDialog(eMessage, eButtons);
			}
			
		}
		
		private function createDialog(eMessage:String,eButtons:Array,eOptions:Dictionary = null):void {
			
			var alertDialog:AlertDialog = new AlertDialog();
			alertDialog.message = eMessage;
			
			for (var i:Number=0; i<eButtons.length;i++){
				alertDialog.addButton(eButtons[i]);
			}
			
			if (eOptions == null) {
				alertDialog.title = "";
				alertDialog.dialogSize = SIZE_MEDIUM;
				alertDialog.align = CENTER;	
			} else {
				alertDialog.title = eOptions["title"];
				alertDialog.dialogSize = eOptions["size"];
				alertDialog.align = eOptions["position"];
			}	
			
			alertDialog.addEventListener(Event.SELECT, alertButtonClicked);
			alertDialog.show();
			
		}
		
		private function alertButtonClicked(event:Event):void{
			
			var webView:QNXStageWebView;
			
			webView = _enviro["webview"];
			webView.executeJavaScript(javaScript + "("+ JSON.encode(event.target.selectedIndex) + ");");
			
		}
		
		
	}
}