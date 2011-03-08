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
	var APPLICATION_EVENTS_URL = "blackberry/app/event";
	
	function addEvent(eventType, onClickHandler) {
		var onClickHandlerId = blackberry.events.registerEventHandler("onClick", onClickHandler);
		
		var request = new blackberry.transport.RemoteFunctionCall(APPLICATION_EVENTS_URL + "/" + eventType);
		request.addParam("onClick", onClickHandlerId);
		request.makeAsyncCall(); //don't care about the return value
	}
	
	function ApplicationEventsDispatcher() {
	}
		
	ApplicationEventsDispatcher.prototype.onBackground = function(onClickHandler) {
		addEvent("onBackground",onClickHandler);
	};
		
	ApplicationEventsDispatcher.prototype.onForeground = function(onClickHandler) {
		addEvent("onForeground",onClickHandler);
	};
	
	ApplicationEventsDispatcher.prototype.onSwipeDown = function(onClickHandler) {
		addEvent("onSwipeDown",onClickHandler);
	};
		
	ApplicationEventsDispatcher.prototype.onSwipeStart = function(onClickHandler) {
		addEvent("onSwipeStart",onClickHandler);
	};
	
	blackberry.Loader.javascriptLoaded("blackberry.app.event", ApplicationEventsDispatcher);
})();