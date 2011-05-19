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
	var DIR_URL = "blackberry/io/dir";
	
	function DirectoryDispatcher() {
	}
	
	function makeCall(toFunction, functionArgs) {
		var request = new blackberry.transport.RemoteFunctionCall(DIR_URL + "/" + toFunction);
		
		if(functionArgs) {
			for(var name in functionArgs) {
				request.addParam(name, functionArgs[name]);
			}
		}
		
		return request.makeSyncCall();
	}
	
	function isDefined(o) {
		return typeof(o) != "undefined";
	}
	
	DirectoryDispatcher.prototype.createNewDir = function (path) {
		var result = makeCall("create", {"path" : path});

		if (isDefined(result.code)) {
			if (result.code != 0) {
				throw new Error(result.msg);
			}
		}		
	};
	
	
	DirectoryDispatcher.prototype.deleteDirectory = function (path, recursive) {
		if (typeof(recursive) == "undefined") {
			recursive = false;
		}
	
		var result = makeCall("delete", {"path" : path, "recursive" : recursive});
		
		if (isDefined(result.code)) {
			if (result.code != 0) {
				throw new Error(result.msg);
			}
		}	
	};	
	
	DirectoryDispatcher.prototype.exists = function (path) {
		var result = makeCall("exists", {"path" : path});
		
		if (isDefined(result.code)) {
			if (result.code != 0) {
				throw new Error(result.msg);
			}
		}
		
		if (isDefined(result.data)) {
			return result.data.exists;
		}
	};
		
	DirectoryDispatcher.prototype.getParentDirectory = function (path) {
		var result = makeCall("parent", {"path" : path});
		
		if (isDefined(result.code)) {
			if (result.code != 0) {
				throw new Error(result.msg);
			}
		}
		
		if (isDefined(result.data)) {
			return result.data.directory;
		}		
	};
	
	DirectoryDispatcher.prototype.listDirectories = function (path) {
		var result = makeCall("list", {"path" : path});
		
		if (isDefined(result.code)) {
			if (result.code != 0) {
				throw new Error(result.msg);
			}
		}
		
		if (isDefined(result.data)) {
			return result.data.directories;
		}		
	};	
	
	DirectoryDispatcher.prototype.listFiles = function (path) {
		var result = makeCall("list", {"path" : path});
		
		if (isDefined(result.code)) {
			if (result.code != 0) {
				throw new Error(result.msg);
			}
		}
		
		if (isDefined(result.data)) {
			return result.data.files;
		}		
	};	
	
	DirectoryDispatcher.prototype.rename = function (path, newDirectoryName) {
		var result = makeCall("rename", {"path" : path, "newDirectoryName" : newDirectoryName});
		
		if (isDefined(result.code)) {
			if (result.code != 0) {
				throw new Error(result.msg);
			}
		}		
	};
	
	DirectoryDispatcher.prototype.__defineGetter__("appDirs", function() {
		var result = makeCall("appDirs");
		
		if (isDefined(result.code)) {
			if (result.code != 0) {
				throw new Error(result.msg);
			}
		}
		
		if (isDefined(result.data)) {
			return result.data;
		}
		
		return result;
	});
	
	blackberry.Loader.javascriptLoaded("blackberry.io.dir", DirectoryDispatcher);
	
})();