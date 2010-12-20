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

package blackberry.ui.dialog
{
	import flash.events.Event;
	import flash.utils.*;
	
	import json.JSON;
	
	import qnx.dialog.AlertDialog;
	import qnx.media.QNXStageWebView;
	
	import webworks.extension.DefaultExtension;
	
	/**
	 * 
	 * Dialog extension for creating a dialog.
	 * Two JavaScript APIs are currently supported by this extension
	 * 
	 * 	static  void   customAsk ( message : String ,  buttons : String[] ,  onClick: String , [settings : String[] )
	 * 	static  void   standardAsk ( message : String , type : Number , onClick :String, [settings: String[] )) 
	 * 
	 * author - Nukul Bhasin * Carolina Pinzon (Software Developers - Research in Motion)
	 * 
	 */
	public class Dialog extends DefaultExtension
	{	
		private static const D_OK:int = 0;
		private static const D_SAVE:int = 1;
		private static const D_DELETE:int = 2;
		private static const D_YES_NO:int = 3;
		private static const D_OK_CANCEL:int = 4;
		
		private static const LOC_BOTTOM:String = "bottomCenter"; 
		private static const LOC_CENTER:String = "middleCenter";
		private static const LOC_TOP:String = "topCenter";
		
		private static const SIZE_FULL:String = "full";
		private static const SIZE_LARGE:String = "large";
		private static const SIZE_MEDIUM:String = "medium";
		private static const SIZE_SMALL:String = "small";
		private static const SIZE_TALL:String = "tall";
		
		private const FEATUREID:Array = new Array ("blackberry.ui.dialog");
		
		private var jsCallbackID:String = "";
		
		public function Dialog() {
			super();
		}
		
		override public function getFeatureList():Array {
			return FEATUREID;
		}
	
		public function standardAsk(eMessage:String,eStandardType:int,eOnClick:String,eSettings:Array = null):void {	
			
			jsCallbackID = eOnClick;
			var eNewSettings:Dictionary = null;
			if (eSettings != null){
				eNewSettings = dialogProperties(eSettings);
			}
			var myDialog:AlertDialog = createDialog(eMessage, standardButtons(eStandardType), eNewSettings);
			myDialog.show();	
		}
		
		public function customAsk(eMessage:String,eButtons:Array,eOnClick:String,eSettings:Array = null):void {
			
			jsCallbackID = eOnClick;
			var eNewSettings:Dictionary = null;
			if (eSettings != null){
				eNewSettings = dialogProperties(eSettings);
			}
			var myDialog:AlertDialog = createDialog(eMessage, eButtons, eNewSettings);
			myDialog.show();
		}
		
		private function createDialog(eMessage:String,eButtons:Array,eSettings:Dictionary = null):AlertDialog {
			
			var alertDialog:AlertDialog = new AlertDialog();
			alertDialog.message = eMessage;
			
			for (var i:Number=0; i<eButtons.length;i++){
				alertDialog.addButton(eButtons[i]);
			}
			
			if (eSettings == null) {
				alertDialog.title = "";
				alertDialog.dialogSize = SIZE_MEDIUM;
				alertDialog.align = LOC_CENTER;	
			} else {
				alertDialog.title = eSettings["title"];
				alertDialog.dialogSize = eSettings["size"];
				alertDialog.align = eSettings["position"];
			}	
			
			alertDialog.addEventListener(Event.SELECT, alertButtonClicked);
			
			return alertDialog;
		}
		
		private function alertButtonClicked(event:Event):void {
			
			evalJavaScriptEvent(jsCallbackID, event.target.selectedIndex);
		}
		
		private function dialogProperties (decodedProperties:Array):Dictionary {
			var settings:Dictionary = new Dictionary();
			settings["title"] = decodedProperties[0];
			settings["size"] = decodedProperties[1];
			settings["position"] = decodedProperties[2];
			
			return settings;
		}
		
		private function standardButtons (standardType:int):Array {
			var standardOps:Array = new Array;
			
			standardOps[D_OK] = new Array("0K");
			standardOps[D_SAVE] = new Array("Save","Cancel");
			standardOps[D_DELETE] = new Array("Delete","Cancel");
			standardOps[D_YES_NO] = new Array("Yes","No");
			standardOps[D_OK_CANCEL] = new Array("OK","Cancel");
			
			return standardOps[standardType];
		}
		
	}
}