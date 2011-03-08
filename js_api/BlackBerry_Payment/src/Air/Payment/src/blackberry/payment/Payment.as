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
package blackberry.payment
{	
	import flash.events.Event;
	import flash.utils.*;
	
	import json.JSON;
	
	import net.rim.blackberry.events.PaymentErrorEvent;
	import net.rim.blackberry.events.PaymentSuccessEvent;
	import net.rim.blackberry.payment.PaymentSystem;
	import net.rim.blackberry.payment.Purchase;
	
	import webworks.extension.DefaultExtension;
	
	
	public class Payment extends DefaultExtension
	{
		private var javaScriptOnPurchaseSuccess:String = "";
		private var javaScriptOnPurchaseFailure:String = "";
		private var javaScriptOnExistingPurchasingSuccess:String = "";
		private var javaScriptOnExistingPurchasingFailure:String = "";
		private var connectionMode:String = PaymentSystem.CONNECTION_MODE_NETWORK;
		private var ps:PaymentSystem = new PaymentSystem();
		
		private static const digitalGoodNotFound:int 	= 0;
		private static const paymentError:int 			= 1;
		private static const paymentServerError:int 	= 2;
		private static const userCancelled:int 			= 3;
		
		private static const CONNECTION_MODE_LOCAL:String = "local";
		
		public function Payment(){
		}
		
		
		public override function loadFeature(feature:String, version:String):void{
			ps = new PaymentSystem();
		}
		
		public override function unloadFeature():void{
			
			
		}
		
		public override function getFeatureList():Array{
			
			return new Array("blackberry.payment");
		}
		
		
		public function setConnectionMode(mode:String):void{
			//default the network connection to Network
			if(mode == CONNECTION_MODE_LOCAL){
				ps.setConnectionMode(PaymentSystem.CONNECTION_MODE_LOCAL);
			}
		}
		
		public function purchase(options:String, callbackOnSuccess:String, callbackOnFailure:String):void{
			
			var data:Object = JSON.decode(options,true);
			
			javaScriptOnPurchaseSuccess = callbackOnSuccess;
			javaScriptOnPurchaseFailure = callbackOnFailure;
			//TODO:Remove this line.
			ps.setConnectionMode(PaymentSystem.CONNECTION_MODE_LOCAL);
			
			ps.addEventListener(PaymentSuccessEvent.PURCHASE_SUCCESS, onPurchaseSuccess);
			ps.addEventListener(PaymentErrorEvent.PURCHASE_ERROR, onPurchaseFail);
			
			ps.purchase(data.digitalGoodID, data.digitalGoodSKU, data.digitalGoodName, data.metaData, data.purchaseAppName , data.purchaseAppIcon);
			
		}

		
		public function getExistingPurchases(refresh:String, callbackOnSuccess:String, callbackOnFailure:String):void{
			
			javaScriptOnExistingPurchasingSuccess = callbackOnSuccess;
			javaScriptOnExistingPurchasingFailure = callbackOnFailure;
			
			//TODO: Remove this line.
			ps.setConnectionMode(PaymentSystem.CONNECTION_MODE_LOCAL);
			
			ps.addEventListener(PaymentSuccessEvent.GET_EXISTING_PURCHASES_SUCCESS, handleGetExistingPurchasesSuccess);
			ps.addEventListener(PaymentErrorEvent.GET_EXISTING_PURCHASES_ERROR, handleGetExistingPurchasesFailure);
			var refreshBoolean:Boolean = true;
			if(refresh == "false"){
				refreshBoolean = false;
			}
			ps.getExistingPurchases(refreshBoolean);
		}
		
		public function onPurchaseSuccess(event:PaymentSuccessEvent):void{
			var param:Array = new Array(1);
			
			param[0] = JSON.encode(new PurchaseData(event.purchase.transactionID,event.purchase.digitalGoodID,
														event.purchase.date.time.toString(),event.purchase.digitalGoodSKU,
																	event.purchase.licenseKey,event.purchase.metaData));
			
			this.evalJavaScriptEvent(javaScriptOnPurchaseSuccess,param);
			
			ps.removeEventListener(PaymentSuccessEvent.PURCHASE_SUCCESS, onPurchaseSuccess);
			ps.removeEventListener(PaymentErrorEvent.PURCHASE_ERROR, onPurchaseFail);
			
		}
		
		public function handleGetExistingPurchasesSuccess(event:PaymentSuccessEvent):void{
			var param:Array = new Array(1);
			var purchaseArray:Array = new Array(event.existingPurchases.length);
			
			
			for (var i:Number=0; i< event.existingPurchases.length ; i++){
				var purchase:Purchase = event.existingPurchases[i];
				
				purchaseArray[i] = new PurchaseData(purchase.transactionID,purchase.digitalGoodID,
					purchase.date.time.toString(),purchase.digitalGoodSKU,
					purchase.licenseKey,purchase.metaData);
				
			}
			
			param[0] = JSON.encode(purchaseArray);
			
			this.evalJavaScriptEvent(javaScriptOnExistingPurchasingSuccess,param);
			
			ps.removeEventListener(PaymentSuccessEvent.GET_EXISTING_PURCHASES_SUCCESS, handleGetExistingPurchasesSuccess);
			ps.removeEventListener(PaymentErrorEvent.GET_EXISTING_PURCHASES_ERROR, handleGetExistingPurchasesFailure);
		}
		
		public function handleGetExistingPurchasesFailure(event:PaymentErrorEvent):void{
			var param:Array = new Array(2);
			param[0] = JSON.encode(event.text);
			param[1] = JSON.encode(event.errorID);
			this.evalJavaScriptEvent(javaScriptOnExistingPurchasingSuccess,param);
			
			ps.removeEventListener(PaymentSuccessEvent.GET_EXISTING_PURCHASES_SUCCESS, handleGetExistingPurchasesSuccess);
			ps.removeEventListener(PaymentErrorEvent.GET_EXISTING_PURCHASES_ERROR, handleGetExistingPurchasesFailure);
		}
		
		public function onPurchaseFail(event:PaymentErrorEvent):void{
			var param:Array = new Array(2);
			param[0] = JSON.encode(event.text);
			param[1] = JSON.encode(event.errorID);
			this.evalJavaScriptEvent(javaScriptOnPurchaseFailure,param);
			
			ps.removeEventListener(PaymentSuccessEvent.PURCHASE_SUCCESS, onPurchaseSuccess);
			ps.removeEventListener(PaymentErrorEvent.PURCHASE_ERROR, onPurchaseFail);
			
		}
		
	}
}