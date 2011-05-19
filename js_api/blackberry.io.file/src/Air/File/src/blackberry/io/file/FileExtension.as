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
package blackberry.io.file
{	
	import flash.errors.IOError;
	import flash.events.Event;
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.utils.*;
	
	import webworks.extension.DefaultExtension;
	import webworks.extension.WebWorksReturnValue;
	import webworks.service.IWebWorksData;
	import webworks.service.IWebWorksService;
	import webworks.service.ServiceManager;
	
	public class FileExtension extends DefaultExtension
	{	
		private var javascriptCallbackToRead:String = "";
		
		private const FILE_GENERAL_ERROR_CODE:Number = 1;
		
		
		public function FileExtension(){
		}
		
		
		public override function loadFeature(feature:String, version:String):void{
			
		}
		
		public override function unloadFeature():void{
			
			
		}
		
		public override function getFeatureList():Array {			
			return new Array("blackberry.io.file");
		}
		
		/**
		 * Do custom lookup to find the function to call<br>
		 * 
		 * The framework originally expects the extension class to have a function
		 * that is named __exactly__ the same as the methodName specified in URI,
		 * but methodName might not necessarily be a legitimate function name
		 * in ActionScript (e.g. "delete" is a reserved word)		
		 * 
		 * @param method
		 * @return function to call 
		 * 
		 */
		protected override function resolveMethod(method:String):Function {
			var funcObj:Function = null;
			
			try {				
				funcObj = super.resolveMethod(method);
			} catch (e:Error) {
				if (method == "delete") {
					funcObj = (this["deleteFile"] as Function);
				}
			}
			
			return funcObj;
		}
		
		public function copy(path:String, targetPath:String):Object {
			var result:WebWorksReturnValue;
			var returnData:Object = {"path" : path, "targetPath" : targetPath};
			
			try {
				var file:File = new File(path);
				var targetFile:File = new File(targetPath);
				checkFile(file);
				
				file.copyTo(targetFile);
				
				result = new WebWorksReturnValue(returnData);
			} catch (e:Error) {
				result = new WebWorksReturnValue(returnData, FILE_GENERAL_ERROR_CODE, e.message);
			}
			
			//Temporarily return the inner jsObject because the superclass converts to JSON
			return result.jsObject;
		}
		
		public function deleteFile(path:String):Object {
			var result:WebWorksReturnValue;
			var returnData:Object = {"path" : path};
			
			try {
				var file:File = new File(path);
				checkFile(file);
				
				file.deleteFile();
				
				result = new WebWorksReturnValue(returnData);
			} catch (e:Error) {
				result = new WebWorksReturnValue(returnData, FILE_GENERAL_ERROR_CODE, e.message);
			}
			
			//Temporarily return the inner jsObject because the superclass converts to JSON
			return result.jsObject;
		}
		
		public function exists(path:String):Object 
		{
			var result:WebWorksReturnValue;
			var returnData:Object = {"path" : path};
			var exists:Boolean = true;
			
			try {
				var file:File = new File(path);
				
				// if path exists but points to directory, should still return false				
				if (file.exists && !file.isDirectory) {
					returnData["exists"] = true;
				} else {
					returnData["exists"] = false;
				}
				
				result = new WebWorksReturnValue(returnData);
			} catch (e:Error) {
				result = new WebWorksReturnValue(returnData, FILE_GENERAL_ERROR_CODE, e.message);
				exists = false;
			}
			
            return result.jsObject;
		}
		
		public function get(path:String):Object {
			var result:WebWorksReturnValue;
			var returnData:Object = {"path" : path};
			
			
			try {
				var file:File = new File(path);
				checkFile(file);
				
				returnData["dateCreated"] = file.creationDate;
				returnData["dateModified"] = file.modificationDate;
				returnData["directory"] = file.parent.url;
				returnData["fileExtension"] = file.extension;
				returnData["isHidden"] = file.isHidden;
				returnData["size"] = file.size;
				
				result = new WebWorksReturnValue(returnData);
			} catch (e:Error) {
				result = new WebWorksReturnValue(returnData, FILE_GENERAL_ERROR_CODE, e.message);
			}
			
			//Temporarily return the inner jsObject because the superclass converts to JSON
			return result.jsObject;
		}
		
		public function open(path:String):Object {
			var result:WebWorksReturnValue;
			var returnData:Object = {"path" : path};
			
			try {
				var file:File = new File(path);
				checkFile(file);
				
				file.openWithDefaultApplication();
				
				result = new WebWorksReturnValue(returnData);
			} catch (e:Error) {
				result = new WebWorksReturnValue(returnData, FILE_GENERAL_ERROR_CODE, e.message);
			}
			
			//Temporarily return the inner jsObject because the superclass converts to JSON
			return result.jsObject;
		}
		
		public function readFile(path:String, cb:String):Object
		{
			var result:WebWorksReturnValue;
			var loopbackReturnData:Object = {"path" : path};
			
			try
			{
				var file:File = new File(path);
				checkFile(file);
				
				readFileBytesAsync(file, cb);
				result = new WebWorksReturnValue(loopbackReturnData);
			} catch (e:Error) {
				result = new WebWorksReturnValue(loopbackReturnData, FILE_GENERAL_ERROR_CODE, e.message);
			}
			
			//Temporarily return the inner jsObject because the superclass converts to JSON
			return result.jsObject;
		}
		
		public function rename(path : String, newFileName : String):Object {
			var result:WebWorksReturnValue;
			
			try {
				var file:File = new File(path);
				checkFile(file);
				
				if (newFileName.indexOf("/") != -1) {
					throw new Error("newFileName must not contain slash", 1);
				}
				
				var dest:File = file.parent.resolvePath(newFileName);
				file.moveTo(dest);
				
				//Return with just the data object.
				result = new WebWorksReturnValue({"path" : path, "newFileName" : newFileName});
			} catch (e:Error) {
				//Return with error code 1.
				result = new WebWorksReturnValue({"path" : path, "newFileName" : newFileName}, FILE_GENERAL_ERROR_CODE, e.message);
			}
			
			//Temporarily return the inner jsObject because the superclass converts to JSON
			return result.jsObject;
		}
		
		public function saveFile(path:String, blobId:String):Object
		{
			var result:WebWorksReturnValue;
			var returnData:Object = {"path" : path, "blobId":blobId};
			
			try
			{
                var file:File = new File(path);
				
				//Throw exception if file exists already
				if(file.exists && !file.isDirectory) throw new Error("File exists at: " + path + ". Please save to a new file.");
				
				//Retrieve blob with given ID
				var serviceManager:ServiceManager = environment["serviceManager"];
				var blobService:IWebWorksService = serviceManager.getEndPointForMethod("webworks://services/blob/getBlob");
				var fileBlob:IWebWorksData = blobService.execute("getBlob", { id : blobId }).data;
				
                //Write the file
				writeFileBytes(file, fileBlob.actionScriptObject.bytes);
				
				result = new WebWorksReturnValue(returnData);
			} catch (e:Error) {
				result = new WebWorksReturnValue(returnData, FILE_GENERAL_ERROR_CODE, e.message);
			}
			
			//Temporarily return the inner jsObject because the superclass converts to JSON
			return result.jsObject;
		}
		
		private function blobFromBytes(bytes:ByteArray):WebWorksReturnValue
		{
			var serviceManager:ServiceManager = environment["serviceManager"];
			
			var blobService:IWebWorksService = serviceManager.getEndPointForMethod("webworks://services/blob/createBlob");
			
			return blobService.execute("createBlob", {"bytes" : bytes });
		}
		
		private function readFileBytesAsync(file:File, jsCallbackId:String):void
		{
			var fs:FileStream = new FileStream();
			
			//We only care about the complete event because the smartphone signature doesn't allow us
			//to return an error callback
			fs.addEventListener(Event.COMPLETE, 
								function(event:Event):void
								{
									var fileBytes:ByteArray = new ByteArray();
									fs.readBytes(fileBytes);
									
									var blobData:WebWorksReturnValue = blobFromBytes(fileBytes);
									
									evalJavaScriptEvent(jsCallbackId, [file.nativePath, blobData.jsObject.data]);
									
									fs.close();
								});
			
			fs.openAsync(file, FileMode.READ);
		}
		
		private function writeFileBytes(toFile : File, bytes:ByteArray):void
		{
			var fs:FileStream = new FileStream();
			fs.open(toFile, FileMode.WRITE);
			fs.writeBytes(bytes);
			//Close the stream
			fs.close();
		}
		
		private function checkFile(file : File, skipCheckDir : Boolean = false):void {			
			try {
				if (!file.exists) {
					throw new Error("path points to non-existent file or directory", FILE_GENERAL_ERROR_CODE);
				}
				
				if (!skipCheckDir && file.isDirectory) {
					throw new Error("path points to a directory", FILE_GENERAL_ERROR_CODE);
				}
			} catch (e:Error) {
				throw new Error("unexpected error occurred: " + e.message, FILE_GENERAL_ERROR_CODE);
			}
		}
	}
}