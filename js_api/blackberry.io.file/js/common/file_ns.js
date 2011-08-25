/*
* Copyright 2010 Research In Motion Limited.
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
    function File(disp) {
        this.constructor.prototype.copy = function(sourcePath, targetPath) {
            return disp.copy(sourcePath, targetPath);
        };
        this.constructor.prototype.deleteFile = function(path) {
            return disp.deleteFile(path);
        };
        this.constructor.prototype.exists = function(path) {
            return disp.exists(path);
        };
        this.constructor.prototype.getFileProperties = function(path) {
            return disp.getFileProperties(path);
        };
        this.constructor.prototype.open = function(path) {
            return disp.open(path);
        };
        this.constructor.prototype.readFile = function(path, onFileOpened, async) {
            if (typeof(onFileOpened) != "function") 
                throw new Error("Required argument missing: onFileOpened callback function.");
            
            // Registering a wrapper for onFileOpened callback to create the Blob object from the ID
            var callbackId = blackberry.events.registerEventHandler("onFileReadComplete", function(fullPath, blobId) {
                if (blobId) {
                    onFileOpened(fullPath, new blackberry.service.Blob(blobId));
                }
            });
            
            // Set default values
            async = (async === false) ? false : true;
            
            disp.readFile(path, callbackId, async);
        };
        this.constructor.prototype.rename = function(path, newFileName) {
            return disp.rename(path, newFileName);
        };
        this.constructor.prototype.saveFile = function(path, fileBlob) {
            return disp.saveFile(path, fileBlob["id"]);
        };
        /*
         * Getters for public static properties
         */
        this.constructor.prototype.__defineGetter__("sharedFolderPath", function() {
            return disp.sharedFolderPath;
        });
    }
    
    
    blackberry.Loader.javascriptLoaded("blackberry.io.file", File);
})();
