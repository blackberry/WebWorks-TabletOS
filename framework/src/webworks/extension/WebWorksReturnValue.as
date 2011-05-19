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

package webworks.extension
{
	import json.JSONEncoder;
	
	import webworks.service.IWebWorksData;
	
	public class WebWorksReturnValue
	{
		private var _msg:String;
		private var _rc:Number;
		private var _data:*;
		
		public static const RET_SUCCESS:Number = 0;
		
		public function WebWorksReturnValue(data:*, returnCode:Number = WebWorksReturnValue.RET_SUCCESS, message:String=null) 
		{
			//If the data parameter is of type IWebWorksData, which contains a return value in the form of a complex AS object
			//and a simpler JS-friendly data object, keep it as-is. Otherwise create an instance of IWebWorksData for which both
			//the AS and JS objects are the same.
			_data = data;
			_rc = returnCode;
			_msg = message;
		}
		
		public function get data():*
		{
			return (_data is IWebWorksData) ? _data.actionScriptObject : _data;
		}
		
		//Temporary method that retrieves the underlying JS-friendly return object.
		//It exists because for function calls, DefaultExtension does the conversion to JSON
		//For service calls the IWebWorksData Implementation returns the jsObject which the service
		//manager converts into JSON
		public function get jsObject():Object
		{
			var d:* = (_data is IWebWorksData) ? _data.jsObject : _data;
			return {
				"code" : _rc,
				"msg"  : _msg,
				"data" : d
			};
		}
		
		public function get json():String 
		{
			var encoder:JSONEncoder = new JSONEncoder(this.jsObject);
			
			return encoder.getString();
		}
	}
}