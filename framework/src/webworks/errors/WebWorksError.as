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
	import flash.utils.Dictionary;
	
	import webworks.errors.HTTPErrorMapping;
	
	public class WebWorksError extends Error
	{
		public static const BAD_REQUEST:int = HTTPErrorMapping.BAD_REQUEST;
		public static const FORBIDDEN:int = HTTPErrorMapping.FORBIDDEN;
		public static const NOT_FOUND:int = HTTPErrorMapping.NOT_FOUND;
		public static const SERVER_ERROR:int = HTTPErrorMapping.SERVER_ERROR;
		public static const NOT_IMPLEMENTED:int = HTTPErrorMapping.NOT_IMPLEMENTED;
		public static const SERVICE_UNAVAILABLE:int = HTTPErrorMapping.SERVICE_UNAVAILABLE;		
		
		private static const StatusToString:Dictionary = new Dictionary();		
		
		StatusToString[BAD_REQUEST] = "Bad Request";		
		StatusToString[FORBIDDEN] = "Forbidden";
		StatusToString[NOT_FOUND] = "Not Found";
		StatusToString[SERVER_ERROR] = "Server Error";
		StatusToString[NOT_IMPLEMENTED] = "Not Implemented";
		StatusToString[SERVICE_UNAVAILABLE] = "Service Unavailable";
		
		public function WebWorksError(status:int = SERVER_ERROR, message:String ="")			
		{	
			if (message.length <= 0)			
				message = (StatusToString[status] == null) ? StatusToString[status]: "";
			
			super(message, status);
		}	
	}	
}