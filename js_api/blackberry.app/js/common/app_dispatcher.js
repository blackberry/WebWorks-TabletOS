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
(function() {
	var APPLICATION_URL = "blackberry/app";
		
	var APP_AUTHOR = "author";
	var APP_AUTHOR_EMAIL = "authorEmail";
	var APP_AUTHOR_URL = "authorURL";
	var APP_COPYRIGHT = "copyright";
	var APP_DESCRIPTION = "description";
	var APP_ID = "id";
	var APP_LICENCE = "license";
	var APP_LICENCE_URL = "licenseURL";
	var APP_NAME = "name";
	var APP_VERSION = "version";
	var APP_EXIT = "exit";
	
	function makeAppCall(uri) {
		var recall = new blackberry.transport.RemoteFunctionCall(APPLICATION_URL + "/" + uri);
		return recall.makeSyncCall();
	}
		
	function ApplicationDispatcher() { 
	}
		
	ApplicationDispatcher.prototype.author = function() {
		return makeAppCall(APP_AUTHOR);
	}
			
	ApplicationDispatcher.prototype.authorEmail = function() {
		return makeAppCall(APP_AUTHOR_EMAIL);
	}
	
	ApplicationDispatcher.prototype.authorURL = function() {
		return makeAppCall(APP_AUTHOR_URL);
	}
			
	ApplicationDispatcher.prototype.copyright = function() {
		return makeAppCall(APP_COPYRIGHT);
	}
			
	ApplicationDispatcher.prototype.description = function() {
		return makeAppCall(APP_DESCRIPTION);
	}
			
	ApplicationDispatcher.prototype.id = function() {
		return makeAppCall(APP_ID);
	}
	
	ApplicationDispatcher.prototype.license = function() {
		return makeAppCall(APP_LICENCE);
	}
	
	ApplicationDispatcher.prototype.licenseURL = function() {
		return makeAppCall(APP_LICENCE_URL);
	}
	
	ApplicationDispatcher.prototype.name = function() {
		return makeAppCall(APP_NAME);
	}
	
	ApplicationDispatcher.prototype.version = function() {
		return makeAppCall(APP_VERSION);
	}
			
	ApplicationDispatcher.prototype.exit = function() {
		return makeAppCall(APP_EXIT);
	}

	blackberry.Loader.javascriptLoaded("blackberry.app", ApplicationDispatcher);
}());
