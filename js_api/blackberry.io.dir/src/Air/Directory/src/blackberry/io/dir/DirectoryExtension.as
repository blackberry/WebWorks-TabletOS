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
package blackberry.io.dir
{	
	import flash.errors.IOError;
	import flash.events.Event;
	import flash.filesystem.File;
	import flash.utils.*;
	
	import webworks.extension.DefaultExtension;
	
	public class DirectoryExtension extends DefaultExtension
	{	
		private const ERROR_CODE:Number = -1;

		public function DirectoryExtension(){
		}
		
		
		public override function loadFeature(feature:String, version:String):void{
			
		}
		
		public override function unloadFeature():void{
			
			
		}
		
		public override function getFeatureList():Array {			
			return new Array("blackberry.io.dir");
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
					funcObj = (this["deleteDir"] as Function);
				}
			}
			
			return funcObj;
		}
		
		public function appDirs():Object {
			var result:Object = createResultObject({});
			
			try {
				var appStorage:File = File.applicationStorageDirectory;
				// manually construct file:// URL, "appStorage.url" returns app-storage:// URL
				// which webkit does not know how to handle
				result.data["app"] = { "storage" : { "path" : "file://" + appStorage.nativePath } };
				result.data["shared"] = {};
				
				var shared:File = File.userDirectory.resolvePath("shared");
				var filesList:Array = shared.getDirectoryListing();
				
				for (var i:uint = 0; i < filesList.length; i++) {
					var file:File = filesList[i] as File;
					
					if (file.isDirectory) {
						result.data.shared[file.name] = { "path" : file.url };
					}
				}				
			} catch (e:Error) {
				result.code = ERROR_CODE;
				result.msg = e.message;				
			}
						
			return result;
		}
		
		public function create(path:String):Object {
			var result:Object = createResultObject({"path" : path});
			
			try {
				var file:File = new File(path);
				
				// if directory already exists, this function does nothing
				file.createDirectory();
			} catch (e:Error) {
				result.code = ERROR_CODE;
				result.msg = e.message;
			}
			
			return result;
		}
		
		// use String for the recursive parameter, when converting String to Boolean, ActionScript
		// regards all non-empty Strings as true; manually convert the parameter value to Boolean
		// to avoid passing recursive=true erroneously
		public function deleteDir(path:String, recursive:String = "false"):Object {
			var recBool:Boolean = recursive.toLowerCase() == Boolean(true).toString();				
			var result:Object = createResultObject({"path" : path, "recursive" : recBool});
			
			try {
				var file:File = new File(path);
				result = checkDir(file, result);
				
				if (result.code != 0) {
					return result;
				}								
				
				file.deleteDirectory(recBool);
			} catch (e:Error) {
				result.code = ERROR_CODE;
				result.msg = e.message;
			}
			
			return result;
		}
		
		public function exists(path:String):Object {
			var result:Object = createResultObject({"path" : path});
			
			try {
				var file:File = new File(path);
				
				// if path exists but points to file, should still return false				
				if (file.exists && file.isDirectory) {
					result.data["exists"] = true;
				} else {
					result.data["exists"] = false;
				}
			} catch (e:Error) {
				result.code = ERROR_CODE;
				result.msg = e.message;				
			}						
			
			return result;
		}
		
		public function list(path:String):Object {
			var result:Object = createResultObject({"path" : path});
			
			try {
				var file:File = new File(path);
				result = checkDir(file, result);
				
				if (result.code != 0) {
					return result;
				}
				
				var filesList:Array = file.getDirectoryListing();
				var dirs:Array = new Array();
				var files:Array = new Array();
								
				result.data["directories"] = dirs;
				result.data["files"] = files;
				
				for (var i:uint = 0; i < filesList.length; i++) {
					var f:File = filesList[i] as File;
					
					if (f.isDirectory) {
						dirs.push(f.name);
					} else {
						files.push(f.name);
					}
				}				
			} catch (e:Error) {
				result.code = ERROR_CODE;
				result.msg = e.message;				
			}
			
			return result;
		}
		
		public function parent(path:String):Object {
			var result:Object = createResultObject({"path" : path});
			
			try {
				var file:File = new File(path);
				result = checkDir(file, result, true);
				
				if (result.code != 0) {
					return result;
				}
				
				result.data["directory"] = file.parent.url;				
			} catch (e:Error) {
				result.code = ERROR_CODE;
				result.msg = e.message;
			}
			
			return result;
		}
		
		public function rename(path : String, newDirectoryName : String):Object {
			var result:Object = createResultObject({"path" : path, "newDirectoryName" : newDirectoryName});
			
			try {
				var file:File = new File(path);
				result = checkDir(file, result);
				
				if (result.code != 0) {
					return result;
				}
				
				if (newDirectoryName.indexOf("/") != -1) {
					result.code = ERROR_CODE;
					result.msg = "newDirectoryName must not contain slash";
					return result;
				}
				
				var dest:File = file.parent.resolvePath(newDirectoryName);
				file.moveTo(dest);
			} catch (e:Error) {
				result.code = ERROR_CODE;
				result.msg = e.message;
			}
			
			return result;
		}
		
		public function get(path:String):Object {
			var result:Object = createResultObject({"path" : path});
			
			try {
				var file:File = new File(path);
				result = checkDir(file, result);
				
				if (result.code != 0) {
					return result;
				}
				
				result.data["name"] = file.name;
				result.data["spaceAvailable"] = file.spaceAvailable;
				result.data["isEmpty"] = file.getDirectoryListing().length == 0;
			} catch (e:Error) {
				result.code = ERROR_CODE;
				result.msg = e.message;
			}
			
			return result;
		}		

		private function createResultObject(data : Object) : Object {
			return {
				"code" : 0,
				"msg" : null,
				"data" : data
			};	
		}
		
		private function checkDir(file : File, result : Object, skipCheckFile : Boolean = false):Object {			
			try {
				if (!file.exists) {
					result.code = ERROR_CODE;
					result.msg = "path points to non-existent file or directory";
					return result;
				}
				
				if (!skipCheckFile) {
					if (!file.isDirectory) {
						result.code = ERROR_CODE;
						result.msg = "path points to a file";
						return result;
					}
				}
			} catch (e:Error) {
				result.code = ERROR_CODE;
				result.msg = e.message;
			}
			
			return result;
		}
	}
}
