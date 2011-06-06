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
        private var _javaScriptOnPurchaseSuccess:String = "";
        private var _javaScriptOnPurchaseFailure:String = "";
        private var _javaScriptOnExistingPurchasingSuccess:String = "";
        private var _javaScriptOnExistingPurchasingFailure:String = "";
        private var _developmentMode:Boolean = false;
        private var _ps:PaymentSystem = new PaymentSystem();

        public function Payment()
        {
        }

        public override function loadFeature(feature:String, version:String):void
        {
            _ps = new PaymentSystem();
            _ps.setConnectionMode(PaymentSystem.CONNECTION_MODE_NETWORK);
        }

        public override function unloadFeature():void
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
                _ps.setConnectionMode(PaymentSystem.CONNECTION_MODE_LOCAL);
                _developmentMode = true;
            }
            else if (mode === "false")
            {
                _ps.setConnectionMode(PaymentSystem.CONNECTION_MODE_NETWORK);
                _developmentMode = false;
            }
        }

        public function purchase(options:String, callbackOnSuccess:String, callbackOnFailure:String):void
        {
            var data:Object = JSON.decode(options, true);

            _javaScriptOnPurchaseSuccess = callbackOnSuccess;
            _javaScriptOnPurchaseFailure = callbackOnFailure;

            _ps.addEventListener(PaymentSuccessEvent.PURCHASE_SUCCESS, onPurchaseSuccess);
            _ps.addEventListener(PaymentErrorEvent.PURCHASE_ERROR, onPurchaseFail);

            _ps.purchase(data.digitalGoodID, data.digitalGoodSKU, data.digitalGoodName, data.metaData, data.purchaseAppName, data.purchaseAppIcon);
        }

        public function onPurchaseSuccess(event:PaymentSuccessEvent):void
        {
            var param:Array = new Array(1);
            var purch:Object = new PurchaseData(event.purchase.transactionID, event.purchase.digitalGoodID, event.purchase.date.time.toString(), event.purchase.digitalGoodSKU, event.purchase.licenseKey, event.purchase.metaData);

            param[0] = JSON.encode(purch);

            this.evalJavaScriptEvent(_javaScriptOnPurchaseSuccess, param);

            _ps.removeEventListener(PaymentSuccessEvent.PURCHASE_SUCCESS, onPurchaseSuccess);
            _ps.removeEventListener(PaymentErrorEvent.PURCHASE_ERROR, onPurchaseFail);
        }

        public function onPurchaseFail(event:PaymentErrorEvent):void
        {
            var param:Array = new Array(2);
            param[0] = JSON.encode(event.text);
            param[1] = JSON.encode(event.errorID);
            this.evalJavaScriptEvent(_javaScriptOnPurchaseFailure, param);

            _ps.removeEventListener(PaymentSuccessEvent.PURCHASE_SUCCESS, onPurchaseSuccess);
            _ps.removeEventListener(PaymentErrorEvent.PURCHASE_ERROR, onPurchaseFail);
        }

        public function getExistingPurchases(refresh:String, callbackOnSuccess:String, callbackOnFailure:String):void
        {

            _javaScriptOnExistingPurchasingSuccess = callbackOnSuccess;
            _javaScriptOnExistingPurchasingFailure = callbackOnFailure;

            _ps.addEventListener(PaymentSuccessEvent.GET_EXISTING_PURCHASES_SUCCESS, onGetExistingPurchasesSuccess);
            _ps.addEventListener(PaymentErrorEvent.GET_EXISTING_PURCHASES_ERROR, onGetExistingPurchasesFailure);
            _ps.getExistingPurchases(refresh === "true");
        }

        public function onGetExistingPurchasesSuccess(event:PaymentSuccessEvent):void
        {
            var param:Array = new Array(1);
            var purchaseArray:Array = new Array(event.existingPurchases.length);


            for (var i:Number = 0; i < event.existingPurchases.length; i++)
            {
                var purchase:Purchase = event.existingPurchases[i];

                purchaseArray[i] = new PurchaseData(purchase.transactionID, purchase.digitalGoodID, purchase.date.time.toString(), purchase.digitalGoodSKU, purchase.licenseKey, purchase.metaData);
            }

            param[0] = JSON.encode(purchaseArray);

            this.evalJavaScriptEvent(_javaScriptOnExistingPurchasingSuccess, param);

            _ps.removeEventListener(PaymentSuccessEvent.GET_EXISTING_PURCHASES_SUCCESS, onGetExistingPurchasesSuccess);
            _ps.removeEventListener(PaymentErrorEvent.GET_EXISTING_PURCHASES_ERROR, onGetExistingPurchasesFailure);
        }

        public function onGetExistingPurchasesFailure(event:PaymentErrorEvent):void
        {
            var param:Array = new Array(2);
            param[0] = JSON.encode(event.text);
            param[1] = JSON.encode(event.errorID);
            this.evalJavaScriptEvent(_javaScriptOnExistingPurchasingFailure, param);

            _ps.removeEventListener(PaymentSuccessEvent.GET_EXISTING_PURCHASES_SUCCESS, onGetExistingPurchasesSuccess);
            _ps.removeEventListener(PaymentErrorEvent.GET_EXISTING_PURCHASES_ERROR, onGetExistingPurchasesFailure);
        }
    }
}
