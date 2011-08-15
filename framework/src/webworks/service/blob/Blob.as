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

package webworks.service.blob
{
	import flash.utils.ByteArray;

	public class Blob
	{	
		private var _id:String;
		private var _data:ByteArray;
		
		private static const ERROR_CREATE_NO_BYTES:Error = new Error("ByteArray required to construct Blob.", 10);
		
		private static const ERROR_SLICE_NAN_OFFSET:Error = new Error("Invalid offset. Must be a number. Possible undefined value passed.", 20);
		private static const ERROR_SLICE_INVALID_OFFSET:Error = new Error("Invalid offset. Must be greater than or equal to 0 and " +
			"less than the length of the blob.", 21);
		private static const ERROR_SLICE_INVALID_LENGTH:Error = new Error("Invalid length. Must be greater than or equal to 0 and offset + length " +
			"must be less than the length of the blob.", 22);
		
		public function Blob(id:String, fromBytes:ByteArray)
		{
			super();
			
			if(fromBytes == null) throw ERROR_CREATE_NO_BYTES;
			
			//The data is a copy of the bytes so we don't hold a reference to the original array.
			_data = new ByteArray();
			_data.writeBytes(fromBytes);
			
			_id = id;
		}
		
		public function slice(offset:Number, length:Number=0):ByteArray
		{
			//Check the error conditions
			if(isNaN(offset)) throw ERROR_SLICE_NAN_OFFSET;
			if(offset < 0 || offset >= _data.length) throw ERROR_SLICE_INVALID_OFFSET;
			if(length < 0 || offset + length >= _data.length) throw ERROR_SLICE_INVALID_LENGTH;
			
			//Copy a new byte array with the requested offset/length...
			var newBlobBytes:ByteArray = new ByteArray();
			newBlobBytes.writeBytes(_data, offset, length);
			
			//...and return it.
			return newBlobBytes;
		}
		
		public function get bytes():ByteArray
		{
			return _data;
		}
		
		public function get id():String 
		{
			return _id;
		}
	}
}
