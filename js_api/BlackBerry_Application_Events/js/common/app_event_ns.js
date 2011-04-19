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
(function () {
	
	function ApplicationEvents(disp) {
		
		this.constructor.prototype.onBackground = function(onClickHandler) { return disp.onBackground(onClickHandler); };
		
		this.constructor.prototype.onForeground = function(onClickHandler) { return disp.onForeground(onClickHandler); };
		
		this.constructor.prototype.onSwipeDown = function(onClickHandler) { return disp.onSwipeDown(onClickHandler); };
		
		this.constructor.prototype.onSwipeStart = function(onClickHandler) { return disp.onSwipeStart(onClickHandler); };
		
	}
	
	blackberry.Loader.javascriptLoaded("blackberry.app.event", ApplicationEvents);
})();
