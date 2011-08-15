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
	import flash.events.LocationChangeEvent;
	import flash.utils.ByteArray;
	import flash.utils.Dictionary;
	import webworks.util.MD5;
	
	import webworks.service.IWebWorksService;
	import webworks.extension.WebWorksReturnValue;
	import webworks.webkit.WebkitControl;
	
	public class BlobManager implements IWebWorksService {
		private var _blobRepository:Dictionary;
		
		private const ERROR_GENERAL_INVALID_OP:Number = 1;
		private const ERROR_GENERAL_NO_ID:Number = 2;
		private const ERROR_GENERAL_BLOB_NOT_FOUND:Number = 3;
		private const ERROR_BLOB_INTERNAL:Number = 4;
		private const ERROR_CREATE_NO_BYTES:Number = 5; 
		
		public static const NAME:String = "service.blob";
		
		public function BlobManager(webkitControl:WebkitControl) {
			init(webkitControl);
		}
		
		public function createBlob(fromBytes:ByteArray):Blob {
			//Hash the blob's bytes to generate a unique identifier based on the byte content
			var blobId:String = MD5.hashBytes(fromBytes);
			var newBlob:Blob;
			
			//If the blob already exists in our repository, we return it...
			if(_blobRepository[blobId]) newBlob = _blobRepository[blobId];
			
			//...otherwise we create and add it to the repository before returning it
			else  
			{
				newBlob = new Blob(blobId, fromBytes);
				_blobRepository[newBlob.id] = newBlob;
			}
			
			return newBlob;
		}
		
		public function execute(operation:String, parameters:Object):String 
		{
			var retVal:WebWorksReturnValue = null;
			
			//Figure out what operation was requested at invoke the specific handler
			switch(operation)
			{	
				case "getLength" : 
					retVal = handleGetLength(parameters); 
					break;				
				case "getBytes" : 
					retVal = handleGetBytes(parameters); 
					break;
				case "slice" : 
					retVal = handleSlice(parameters); 
					break;
				default : 
					throw new Error("Blob operation not supported: " + operation, ERROR_GENERAL_INVALID_OP);
			}

			return retVal.json;
		}
		
		private function handleGetLength(parameters:Object):WebWorksReturnValue
		{
			if(parameters["blobId"] == null) throw new Error("Blob ID not passed to getBlob.", ERROR_GENERAL_NO_ID);
			
			var blobId:String = parameters["blobId"] as String;
			var blob:Blob = getBlobFromRepository(blobId);
			
			return new WebWorksReturnValue(blob.bytes.length);
		}
		
		private function handleGetBytes(parameters:Object):WebWorksReturnValue
		{
			if(parameters["blobId"] == null) throw new Error("Blob ID not passed to getBlob.", ERROR_GENERAL_NO_ID);
			
			var blobId:String = parameters["blobId"] as String;
			var blob:Blob = getBlobFromRepository(blobId);
			
			// Convert ByteArray to Array
			var byteData:ByteArray = blob.slice(isNaN(parameters["offset"])? 0 : parameters["offset"], isNaN(parameters["length"])? 0 : parameters["length"]);;
			var bytes:Array = new Array(byteData.length);
			for (var i:int = 0; i<byteData.length; i++)
			{
				bytes[i] = byteData[i];
			}
			
			return new WebWorksReturnValue(bytes);
		}
		
		private function handleSlice(parameters:Object):WebWorksReturnValue
		{
			if(parameters["blobId"] == null) throw new Error("Blob ID not passed to slice.", ERROR_GENERAL_NO_ID);
			
			var blobId:String = parameters["blobId"] as String;
			var blob:Blob = getBlobFromRepository(blobId);
			
			//Get the Blob to slice itself and return the sub-array of bytes
			var slicedBlobBytes:ByteArray = blob.slice(parameters["offset"], isNaN(parameters["length"])? 0 : parameters["length"]);
			
			//Create a new Blob based on it...
			var slicedBlob:Blob = createBlob(slicedBlobBytes);
			
			//...and return it
			return new WebWorksReturnValue(slicedBlob.id);
		}
		
		public function getBlobFromRepository(blobId:String):Blob
		{
			var blob:Blob = _blobRepository[blobId];
			
			if(blob == null) throw new Error("Blob not found for ID: " + blobId, ERROR_GENERAL_BLOB_NOT_FOUND);
			
			return blob;
		}
		
		private function init(webkitControl:WebkitControl):void {
			webkitControl.addEventListener(LocationChangeEvent.LOCATION_CHANGE, onPageChanged);
			initRepository();
		}
		
		private function onPageChanged():void {
			//Dump the old blob repository when we go to a new page to avoid memory leaks
			_blobRepository = null;
			initRepository();
		}
		
		private function initRepository():void {
			_blobRepository = new Dictionary();
		}
	}
}
