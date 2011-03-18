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
package webworks.errors
{
	
	
	public class HTTPErrorMapping
	{
		private var _message:String;
		private var _code:int;		
		
		public static const SUCCESS:int = 200;
		public static const BAD_REQUEST:int = 400;
		public static const FORBIDDEN:int = 403;
		public static const NOT_FOUND:int = 404;
		public static const SERVER_ERROR:int = 500;
		public static const NOT_IMPLEMENTED:int = 501;
		public static const SERVICE_UNAVAILABLE:int = 503;	
		
		private static const SUCCESS_STRING:String = "Success";
		

		
		public function HTTPErrorMapping(error:Error)
		{
			if( error is WebWorksError)
			{
				_code = error.errorID;
			}			
			
			else if( error is ReferenceError)
			{
				_code = NOT_IMPLEMENTED;
			}
			
			else if( error is ArgumentError)
			{
				_code = BAD_REQUEST;
			}	
			
			else
			{
				_code = SERVER_ERROR;			
			}
			
			_message = error.message;
		}
		
		public function get message():String
		{
			return _message;
		}
		
		public function get code():int
		{
			return _code;
		}
		
		public static function getSuccessCode():int
		{
			return SUCCESS;	
		}
		
		public static function getSuccessMessage():String
		{
			return SUCCESS_STRING;
		}
	}
}