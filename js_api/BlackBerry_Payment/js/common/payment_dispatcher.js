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
(function () {
	var PAYMENT_URL = "blackberry/payment";
	var PAYMENT_PURCHASE = "purchase";
	var PAYMENT_EXISTING_PURCHACES = "getExistingPurchases";
	var GET_CONNECTION_MODE = "getConnectionMode";
	var SET_CONNECTION_MODE = "setConnectionMode";
	
	function PaymentDispatcher() {
	}
	
	function addEvent(onClickHandler) {
		
		return blackberry.events.registerEventHandler("onClick", onClickHandler);
	}
	
	function makeGetExistingPurchasesCall(eventType, onClickHandlerId1, onClickHandlerId2 , refresh){
		var request = new blackberry.transport.RemoteFunctionCall(PAYMENT_URL + "/" +  eventType); //don't care about the return value
		request.addParam("refresh",refresh);
		request.addParam("callbackOnSuccess",onClickHandlerId1);
		request.addParam("callbackonFailure",onClickHandlerId2);
		
		request.makeAsyncCall();
	}
	
	function makePurchaseCall(eventType,onClickHandlerId1, onClickHandlerId2, options){
		
		var request = new blackberry.transport.RemoteFunctionCall(PAYMENT_URL + "/" +  eventType); //don't care about the return value
		
		request.addParam("options",options);
		request.addParam("callbackOnSuccess",onClickHandlerId1);
		request.addParam("callbackOnFailure",onClickHandlerId2);
		
		request.makeAsyncCall();
	}
	
	function makeGetConnectionModeCall() {
		var recall = new blackberry.transport.RemoteFunctionCall(PAYMENT_URL + "/" + GET_CONNECTION_MODE);
		return recall.makeSyncCall();
	}
	
	function makeSetConnectionModeCall(mode) {
		var recall = new blackberry.transport.RemoteFunctionCall(PAYMENT_URL + "/" + SET_CONNECTION_MODE);
		recall.addParam("mode", mode);
		recall.makeSyncCall();
	}
	
	
	PaymentDispatcher.prototype.purchase = function (options, callbackOnSuccess, callbackOnFailure) {
		var onClickHandlerId1 = addEvent(callbackOnSuccess);
		var onClickHandlerId2 = addEvent(callbackOnFailure);
		makePurchaseCall(PAYMENT_PURCHASE,onClickHandlerId1,onClickHandlerId2,options);
	};
	
	PaymentDispatcher.prototype.getExistingPurchases = function (refresh, callbackOnSuccess, callbackOnFailure) {
		var onClickHandlerId1 = addEvent(callbackOnSuccess);
		var onClickHandlerId2 = addEvent(callbackOnFailure);
		makeGetExistingPurchasesCall(PAYMENT_EXISTING_PURCHACES,onClickHandlerId1, onClickHandlerId2, refresh);
	};
	
	PaymentDispatcher.prototype.getConnectionMode = function(){
		return makeGetConnectionModeCall();
	};
	
	PaymentDispatcher.prototype.setConnectionMode = function(mode){
		return makeSetConnectionModeCall(mode);
	};
	
	blackberry.Loader.javascriptLoaded("blackberry.payment", PaymentDispatcher);
	
})();