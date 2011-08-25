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
package blackberry.payment
{
    import flash.utils.*;

    import json.JSON;

    import net.rim.blackberry.events.PaymentErrorEvent;
    import net.rim.blackberry.events.PaymentSuccessEvent;
    import net.rim.blackberry.payment.PaymentSystem;
    import net.rim.blackberry.payment.Purchase;

    import webworks.extension.DefaultExtension;

    public class Payment extends DefaultExtension
    {
        private static const GENERAL_PAYMENT_SYSTEM_ERROR:int = 3;
        private var _developmentMode:Boolean = false;

        public function Payment()
        {
        }

        public override function getFeatureList():Array
        {
            return new Array("blackberry.payment");
        }

        public function getConnectionMode():Boolean
        {
            return _developmentMode;
        }

        public function setConnectionMode(mode:String):void
        {
            if (mode === "true")
            {
                _developmentMode = true;
            }
            else if (mode === "false")
            {
                _developmentMode = false;
            }
        }

        // Applies current connection mode to the PaymentSystem instance.
        private function setConnecionModeToPSObject(ps:PaymentSystem):void
        {
            if (ps)
            {
                if (_developmentMode)
                {
                    ps.setConnectionMode(PaymentSystem.CONNECTION_MODE_LOCAL);
                }
                else
                {
                    ps.setConnectionMode(PaymentSystem.CONNECTION_MODE_NETWORK);
                }
            }
        }

        public function purchase(options:String, onnSuccessCallbackId:String, onFailureCallbackId:String):void
        {
            var data:Object = JSON.decode(options, true);
            var onPurchaseSuccess:Function = new Function;
            var onPurchaseFail:Function = new Function;
            var ps:PaymentSystem = new PaymentSystem();
            setConnecionModeToPSObject(ps);

            try
            {
                ps.addEventListener(PaymentSuccessEvent.PURCHASE_SUCCESS, onPurchaseSuccess = function(event:PaymentSuccessEvent):void
                {
                    var param:Array = new Array(1);
                    var purch:Object = new PurchaseData(event.purchase.transactionID, event.purchase.digitalGoodID, event.purchase.date.time.toString(), event.purchase.digitalGoodSKU, event.purchase.licenseKey, event.purchase.metaData);

                    param[0] = JSON.encode(purch);
                    evalJavaScriptEvent(onnSuccessCallbackId, param);

                    ps.removeEventListener(PaymentSuccessEvent.PURCHASE_SUCCESS, onPurchaseSuccess);
                    ps.removeEventListener(PaymentErrorEvent.PURCHASE_ERROR, onPurchaseFail);
                });
                ps.addEventListener(PaymentErrorEvent.PURCHASE_ERROR, onPurchaseFail = function(event:PaymentErrorEvent):void
                {
                    var param:Array = new Array(2);
                    param[0] = event.text;
                    param[1] = event.errorID;
                    evalJavaScriptEvent(onFailureCallbackId, param);

                    ps.removeEventListener(PaymentSuccessEvent.PURCHASE_SUCCESS, onPurchaseSuccess);
                    ps.removeEventListener(PaymentErrorEvent.PURCHASE_ERROR, onPurchaseFail);
                });

                ps.purchase(data.digitalGoodID, data.digitalGoodSKU, data.digitalGoodName, data.metaData, data.purchaseAppName, data.purchaseAppIcon);
            }
            catch (e:Error)
            {
                var param:Array = new Array(2);
                param[0] = "Error occured when calling purchase method: " + e.message;
                param[1] = GENERAL_PAYMENT_SYSTEM_ERROR;
                evalJavaScriptEvent(onFailureCallbackId, param);
            }
        }

        public function getExistingPurchases(refresh:String, onSuccessCallbackId:String, onFailureCallbackId:String):void
        {
            var onGetExistingPurchasesSuccess:Function = new Function;
            var onGetExistingPurchasesFailure:Function = new Function;
            var ps:PaymentSystem = new PaymentSystem();
            setConnecionModeToPSObject(ps);

            try
            {
                ps.addEventListener(PaymentSuccessEvent.GET_EXISTING_PURCHASES_SUCCESS, onGetExistingPurchasesSuccess = function(event:PaymentSuccessEvent):void
                {
                    var param:Array = new Array(1);
                    var purchaseArray:Array = new Array(event.existingPurchases.length);


                    for (var i:Number = 0; i < event.existingPurchases.length; i++)
                    {
                        var purchase:Purchase = event.existingPurchases[i];

                        purchaseArray[i] = new PurchaseData(purchase.transactionID, purchase.digitalGoodID, purchase.date.time.toString(), purchase.digitalGoodSKU, purchase.licenseKey, purchase.metaData);
                    }

                    param[0] = JSON.encode(purchaseArray);
                    evalJavaScriptEvent(onSuccessCallbackId, param);

                    ps.removeEventListener(PaymentSuccessEvent.GET_EXISTING_PURCHASES_SUCCESS, onGetExistingPurchasesSuccess);
                    ps.removeEventListener(PaymentErrorEvent.GET_EXISTING_PURCHASES_ERROR, onGetExistingPurchasesFailure);
                });
                ps.addEventListener(PaymentErrorEvent.GET_EXISTING_PURCHASES_ERROR, onGetExistingPurchasesFailure = function(event:PaymentErrorEvent):void
                {
                    var param:Array = new Array(2);
                    param[0] = event.text;
                    param[1] = event.errorID;
                    evalJavaScriptEvent(onFailureCallbackId, param);

                    ps.removeEventListener(PaymentSuccessEvent.GET_EXISTING_PURCHASES_SUCCESS, onGetExistingPurchasesSuccess);
                    ps.removeEventListener(PaymentErrorEvent.GET_EXISTING_PURCHASES_ERROR, onGetExistingPurchasesFailure);

                });
                ps.getExistingPurchases(refresh === "true");
            }
            catch (e:Error)
            {
                var param:Array = new Array(2);
                param[0] = "Error occured when calling getExistingPurchases method: " + e.message;
                param[1] = GENERAL_PAYMENT_SYSTEM_ERROR;
                evalJavaScriptEvent(onFailureCallbackId, param);
            }
        }
    }
}
