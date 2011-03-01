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
(function(){
	function Application(disp) {

		if(typeof disp == 'undefined') {
			throw new Error('Dispatcher required for API initialization');
		}
		
		this.constructor.prototype.exit = function() { return disp.exit(); };
		
		/*
		 * Getters for read-only properties
		*/
		
		this.constructor.prototype.__defineGetter__("author", disp.author);
		this.constructor.prototype.__defineGetter__("authorEmail", disp.authorEmail);
		this.constructor.prototype.__defineGetter__("authorURL", disp.authorURL);
		this.constructor.prototype.__defineGetter__("copyright", disp.copyright);
		this.constructor.prototype.__defineGetter__("description", disp.description);
		this.constructor.prototype.__defineGetter__("id", disp.id);
		this.constructor.prototype.__defineGetter__("license", disp.license);
		this.constructor.prototype.__defineGetter__("licenseURL", disp.licenseURL);
		this.constructor.prototype.__defineGetter__("name", disp.name);
		this.constructor.prototype.__defineGetter__("version", disp.version); 
	};

	blackberry.Loader.javascriptLoaded("blackberry.app", Application);
}());
