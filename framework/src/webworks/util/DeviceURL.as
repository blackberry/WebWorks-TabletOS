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
////////////////////////////////////////////////////////////////////////////////
//
//  RIM
//  Copyright 2010 RIM
//  All Rights Reserved.
//
////////////////////////////////////////////////////////////////////////////////

package webworks.util
{
	import mx.utils.URLUtil;
	
	import webworks.uri.URI;
	
	/**
	 * DeviceURL parses a XHRRequest URL ( webworks://namespace1/namespace2/class/mehtod?par1=v1&par2=v1... ) into individual properties
	 *  
	 */
	public class DeviceURL
	{
		private var _uri:URI;
		
		public function DeviceURL(url:String)
		{
			_uri = new URI(url);
		}
		
		public function isDeviceProtocol():Boolean
		{
			return _uri.scheme == "webworks";
		}
		
		/**
		 * The raw query string, everything after the first '?' character, and up to the '#' if it exists.
		 */
		public function get query():String
		{
			return _uri.query;
		}
		
		/**
		 * The path is everything after the host but before any query string parameters, with no leading or trailing slashes.
		 */
		public function get path():String
		{
			return _uri.path.replace(/^\//, "");
		}

		//return qualified name in format  "namespace.class.method"
		public function get qualifiedMethodName():String
		{
			return _uri.authority + "." + this.path.replace(/\//g, '.');
		}
		
		//returning just the "method" portion of "namespace.class.method" 
		public function get methodName():String
		{			
			return _uri.path.split("/").pop();			
		}
		
		public function get featureName():String
		{			
			var str:String = "";
			var temp:String = this.path;
			var strs:Array = temp.split("/");
			for (var i:int; i < strs.length - 1; i++)
			{
				if(i != 0)
					str += ".";
				
				str += strs[i];
			}			
			return  _uri.authority + "." + str;
		}
		
		//return parameter as a object with each para as a property
		public function get parametersAsObject():Object
		{
			return URLUtil.stringToObject(query,"&",true);
		}
		
		//return a string of value1, value2, ...
		public function get parameters():String
		{
			var out:String = "";
			for(var obj:Object in parametersAsObject)
			{
				out += obj.toString() + ",";
			}
			return out;
		}
	}
}
