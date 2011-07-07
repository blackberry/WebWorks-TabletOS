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

	function Directory(disp) {
		this.constructor.prototype.createNewDir = function(path)
								{ return disp.createNewDir(path); };
		this.constructor.prototype.deleteDirectory = function(path, recursive)
								{ return disp.deleteDirectory(path, recursive); };
		this.constructor.prototype.exists = function(path)
								{ return disp.exists(path); };
		this.constructor.prototype.getParentDirectory = function(path)
								{ return disp.getParentDirectory(path); };
		this.constructor.prototype.listDirectories = function(path)
								{ return disp.listDirectories(path); };
		this.constructor.prototype.listFiles = function(path)
								{ return disp.listFiles(path); };
		this.constructor.prototype.rename = function(path, newDirectoryName)
								{ return disp.rename(path, newDirectoryName); };

		/*
		 * Getters for public static properties
		 */
		this.constructor.prototype.__defineGetter__("appDirs", function() { return disp.appDirs; });										
	}
	
	blackberry.Loader.javascriptLoaded("blackberry.io.dir", Directory);
})();

