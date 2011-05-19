/*
 * Copyright 2010-2011 Research In Motion Limited.
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
	var FILE_URL = "blackberry/io/file";
	
	function FileDispatcher() {
	}
	
	function makeCall(toFunction, functionArgs) {
		var request = new blackberry.transport.RemoteFunctionCall(FILE_URL + "/" + toFunction);
		
		if(functionArgs) {
			for(var name in functionArgs) {
				request.addParam(name, functionArgs[name]);
			}
		}
		
		var jsonReviver = function(key, value) {
			// construct JS Date object from number of milliseconds
			if (key.toLowerCase().indexOf('date') != -1) {
				return new Date(value);
			} else {
				return value;
			}
		};
		
		return request.makeSyncCall(jsonReviver);
	}	
	
	FileDispatcher.prototype.__defineGetter__("sharedFolderPath", function() {
		var result = makeCall("sharedFolderPath");
		return result; 
	});
	
	function addEvent(eventName, eventCallback) {
		return blackberry.events.registerEventHandler(eventName, eventCallback);
	}
	
	function isDefined(o) {
		return typeof(o) != "undefined";
	}	
	
	FileDispatcher.prototype.copy = function (path, targetPath) {
		var result = makeCall("copy", {"path" : path, "targetPath" : targetPath});

		if (isDefined(result.code)) {
			if (result.code != 0) {
				throw new Error(result.msg);
			}
		}		
	};
	
	
	FileDispatcher.prototype.deleteFile = function (path) {
		var result = makeCall("delete", {"path" : path});
		
		if (isDefined(result.code)) {
			if (result.code != 0) {
				throw new Error(result.msg);
			}
		}		
	};
	
	
	FileDispatcher.prototype.exists = function (path) {
		var result = makeCall("exists", {"path" : path});
		
		if (isDefined(result.code)) {
			if (result.code != 0) {
				throw new Error(result.msg);
			}			
		}
		
		if (isDefined(result.data.exists)) {
			return result.data.exists;
		} else {
			return false;
		}				
	};
	
	
	FileDispatcher.prototype.readFile = function (path, callbackId) {
		var result = makeCall("readFile", {"path" : path, "cb" : callbackId});
		
		if (isDefined(result.code)) {
			if (result.code != 0) {
				throw new Error(result.msg);
			}
		}
		
		return result.data;
	};
	
	FileDispatcher.prototype.rename = function (path, newFileName) {
		var result = makeCall("rename", {"path" : path, "newFileName" : newFileName});
		
		if (isDefined(result.code)) {
			if (result.code != 0) {
				throw new Error(result.msg);
			}
		}		
	};
	
	FileDispatcher.prototype.saveFile = function (path, fileBlobId) {
		var result = makeCall("saveFile", {"path" : path, "blobId" : fileBlobId});
		
		if (isDefined(result.code)) {
			if (result.code != 0) {
				throw new Error(result.msg);
			}
		}
	};
	
	FileDispatcher.prototype.open = function(path) {
		var result = makeCall("open", {"path" : path});
		
		if (isDefined(result.code)) {
			return result.code == 0;
		}
		
		return false;
	};
	
	FileDispatcher.prototype.getFileProperties = function(path) {
		var result = makeCall("get", {"path" : path});
		
		if (isDefined(result.code)) {
			if (result.code != 0) {
				throw new Error(result.msg);
			}
		}
		
		if (isDefined(result.data)) {
			var props = {};
			
			props.__defineGetter__("dateCreated", function() { return result.data.dateCreated; });
			props.__defineGetter__("dateModified", function() { return result.data.dateModified; });
			props.__defineGetter__("directory", function() { return result.data.directory; });
			props.__defineGetter__("fileExtension", function() { return result.data.fileExtension; });
			props.__defineGetter__("isHidden", function() { return result.data.isHidden; });
			props.__defineGetter__("size", function() { return result.data.size; });
			
			return props;
		}
	};
	
	blackberry.Loader.javascriptLoaded("blackberry.io.file", FileDispatcher);
	
})();
