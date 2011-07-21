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

package webworks.service.blob
{
	import flash.events.LocationChangeEvent;
	import flash.utils.ByteArray;
	import flash.utils.Dictionary;
	
	import webworks.extension.WebWorksReturnValue;
	import webworks.service.IWebWorksService;
	import webworks.webkit.WebkitControl;
	
	public class BlobManager implements IWebWorksService {
		private var _blobRepository:Dictionary;
		
		private const ERROR_GENERAL_INVALID_OP:Number = 1;
		private const ERROR_GENERAL_NO_ID:Number = 2;
		private const ERROR_GENERAL_BLOB_NOT_FOUND:Number = 3;
		
		private const ERROR_BLOB_INTERNAL:Number = 4;
		
		private const ERROR_CREATE_NO_BYTES:Number = 5; 
		
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
		
		public function execute(operation:String, parameters:Object):WebWorksReturnValue 
		{
			var retVal:WebWorksReturnValue = null;
			
			try
			{
				//Figure out what operation was requested at invoke the specific handler
				switch(operation)
				{	
					case "createBlob" : retVal = handleCreate(parameters); break;
					
					case "getBlob" : retVal = handleGet(parameters); break;
					
					case "sliceBlob" : retVal = handleSlice(parameters); break;
					
					default : throw new Error("Blob operation not supported: " + operation, ERROR_GENERAL_INVALID_OP);
				}
			}
			catch(e:Error)
			{
				//Catch any exceptions thrown by the Blob and map them to the generic 
				//service-level error code 
				retVal = new WebWorksReturnValue(e.message, ERROR_BLOB_INTERNAL);
			}
			finally
			{
				return retVal;
			}
		}
		
		private function handleCreate(parameters:Object):WebWorksReturnValue
		{
			if(parameters["bytes"] == null) throw new Error("Source bytes not passed to createBlob.", ERROR_CREATE_NO_BYTES);
			
			return new WebWorksReturnValue(createBlob(parameters["bytes"]));
		}
		
		private function handleGet(parameters:Object):WebWorksReturnValue
		{
			if(parameters["id"] == null) throw new Error("Blob ID not passed to getBlob.", ERROR_GENERAL_NO_ID);
			
			var blobId:String = parameters["id"] as String;
			var blob:Blob = getBlobFromRepository(blobId);
			
			return new WebWorksReturnValue(blob);
		}
		
		private function handleSlice(parameters:Object):WebWorksReturnValue
		{
			if(parameters["id"] == null) throw new Error("Blob ID not passed to slice.", ERROR_GENERAL_NO_ID);
			
			var blobId:String = parameters["id"] as String;
			var blob:Blob = getBlobFromRepository(blobId);
			
			//Get the Blob to slice itself and return the sub-array of bytes
			var slicedBlobBytes:ByteArray = blob.slice(parameters["offset"], parameters["length"]);
			
			//Create a new Blob based on it...
			var slicedBlob:Blob = createBlob(slicedBlobBytes);
			
			//...and return it
			return new WebWorksReturnValue(slicedBlob);
		}
		
		private function getBlobFromRepository(blobId:String):Blob
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
			initRepository();
		}
		
		private function initRepository():void {
			_blobRepository = new Dictionary();
		}
	}
}

import flash.utils.ByteArray;
import flash.utils.Endian;

import webworks.service.IWebWorksData;

internal class Blob implements IWebWorksData 
{	
	import flash.utils.ByteArray;
	
	import mx.utils.UIDUtil;
	
	private var _id:String;
	private var _data:ByteArray;
	private var _encoding:String;
	
	private static const ERROR_CREATE_NO_BYTES:Error = new Error("ByteArray required to construct Blob.", 10);
	
	private static const ERROR_SLICE_NAN_OFFSET:Error = new Error("Invalid offset. Must be a number. Possible undefined value passed.", 20);
	private static const ERROR_SLICE_INVALID_OFFSET:Error = new Error("Invalid offset. Must be greater than or equal to 0 and " +
		"less than the length of the blob.", 21);
	private static const ERROR_SLICE_INVALID_LENGTH:Error = new Error("Invalid length. Must be greater than or equal to 0 and offset + length " +
		"must be less than the length of the blob.", 22);
	
	
	public function Blob(id:String, fromBytes:ByteArray, e:String = "")
	{
		super();
		
		if(fromBytes == null) throw ERROR_CREATE_NO_BYTES;
		
		//The data is a copy of the bytes so we don't hold a reference to the original array.
		_data = new ByteArray();
		_data.writeBytes(fromBytes);
		
		_id = id;
		
		_encoding = e.toLowerCase();
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
	
	//Implementation of IWebWorksData
	public function get actionScriptObject():* 
	{
		return this;
	}
	
	//Implementation of IWebWorksData
	public function get jsObject():Object 
	{
		return {
			id : _id,
			length : _data.length
		};
	}
}

/*
* Helper classes for the Blob's ID generator
*
*
*/
internal class MD5 {
	
	public static var digest:ByteArray;
	/**
	 * Performs the MD5 hash algorithm on a string.
	 *
	 * @param s The string to hash
	 * @return A string containing the hash value of s
	 * @langversion ActionScript 3.0
	 * @playerversion Flash 8.5
	 * @tiptext
	 */
	
	public static function hash(s:String) :String{
		//Convert to byteArray and send through hashBinary function
		// so as to only have complex code in one location
		var ba:ByteArray = new ByteArray();
		ba.writeUTFBytes(s);	
		return hashBinary(ba);
	}
	
	public static function hashBytes(s:ByteArray) :String{	
		return hashBinary(s);
	}
	
	/**
	 * Performs the MD5 hash algorithm on a ByteArray.
	 *
	 * @param s The string to hash
	 * @return A string containing the hash value of s
	 * @langversion ActionScript 3.0
	 * @playerversion Flash 8.5
	 * @tiptext
	 */	 
	public static function hashBinary( s:ByteArray ):String {
		// initialize the md buffers
		var a:int = 1732584193;
		var b:int = -271733879;
		var c:int = -1732584194;
		var d:int = 271733878;
		
		// variables to store previous values
		var aa:int;
		var bb:int;
		var cc:int;
		var dd:int;
		
		// create the blocks from the string and
		// save the length as a local var to reduce
		// lookup in the loop below
		var x:Array = createBlocks( s );
		var len:int = x.length;
		
		// loop over all of the blocks
		for ( var i:int = 0; i < len; i += 16) {
			// save previous values
			aa = a;
			bb = b;
			cc = c;
			dd = d;				
			
			// Round 1
			a = ff( a, b, c, d, x[int(i+ 0)],  7, -680876936 ); 	// 1
			d = ff( d, a, b, c, x[int(i+ 1)], 12, -389564586 );	// 2
			c = ff( c, d, a, b, x[int(i+ 2)], 17, 606105819 ); 	// 3
			b = ff( b, c, d, a, x[int(i+ 3)], 22, -1044525330 );	// 4
			a = ff( a, b, c, d, x[int(i+ 4)],  7, -176418897 ); 	// 5
			d = ff( d, a, b, c, x[int(i+ 5)], 12, 1200080426 ); 	// 6
			c = ff( c, d, a, b, x[int(i+ 6)], 17, -1473231341 );	// 7
			b = ff( b, c, d, a, x[int(i+ 7)], 22, -45705983 ); 	// 8
			a = ff( a, b, c, d, x[int(i+ 8)],  7, 1770035416 ); 	// 9
			d = ff( d, a, b, c, x[int(i+ 9)], 12, -1958414417 );	// 10
			c = ff( c, d, a, b, x[int(i+10)], 17, -42063 ); 		// 11
			b = ff( b, c, d, a, x[int(i+11)], 22, -1990404162 );	// 12
			a = ff( a, b, c, d, x[int(i+12)],  7, 1804603682 ); 	// 13
			d = ff( d, a, b, c, x[int(i+13)], 12, -40341101 ); 	// 14
			c = ff( c, d, a, b, x[int(i+14)], 17, -1502002290 );	// 15
			b = ff( b, c, d, a, x[int(i+15)], 22, 1236535329 ); 	// 16
			
			// Round 2
			a = gg( a, b, c, d, x[int(i+ 1)],  5, -165796510 ); 	// 17
			d = gg( d, a, b, c, x[int(i+ 6)],  9, -1069501632 );	// 18
			c = gg( c, d, a, b, x[int(i+11)], 14, 643717713 ); 	// 19
			b = gg( b, c, d, a, x[int(i+ 0)], 20, -373897302 ); 	// 20
			a = gg( a, b, c, d, x[int(i+ 5)],  5, -701558691 ); 	// 21
			d = gg( d, a, b, c, x[int(i+10)],  9, 38016083 ); 	// 22
			c = gg( c, d, a, b, x[int(i+15)], 14, -660478335 ); 	// 23
			b = gg( b, c, d, a, x[int(i+ 4)], 20, -405537848 ); 	// 24
			a = gg( a, b, c, d, x[int(i+ 9)],  5, 568446438 ); 	// 25
			d = gg( d, a, b, c, x[int(i+14)],  9, -1019803690 );	// 26
			c = gg( c, d, a, b, x[int(i+ 3)], 14, -187363961 ); 	// 27
			b = gg( b, c, d, a, x[int(i+ 8)], 20, 1163531501 ); 	// 28
			a = gg( a, b, c, d, x[int(i+13)],  5, -1444681467 );	// 29
			d = gg( d, a, b, c, x[int(i+ 2)],  9, -51403784 ); 	// 30
			c = gg( c, d, a, b, x[int(i+ 7)], 14, 1735328473 ); 	// 31
			b = gg( b, c, d, a, x[int(i+12)], 20, -1926607734 );	// 32
			
			// Round 3
			a = hh( a, b, c, d, x[int(i+ 5)],  4, -378558 ); 	// 33
			d = hh( d, a, b, c, x[int(i+ 8)], 11, -2022574463 );	// 34
			c = hh( c, d, a, b, x[int(i+11)], 16, 1839030562 ); 	// 35
			b = hh( b, c, d, a, x[int(i+14)], 23, -35309556 ); 	// 36
			a = hh( a, b, c, d, x[int(i+ 1)],  4, -1530992060 );	// 37
			d = hh( d, a, b, c, x[int(i+ 4)], 11, 1272893353 ); 	// 38
			c = hh( c, d, a, b, x[int(i+ 7)], 16, -155497632 ); 	// 39
			b = hh( b, c, d, a, x[int(i+10)], 23, -1094730640 );	// 40
			a = hh( a, b, c, d, x[int(i+13)],  4, 681279174 ); 	// 41
			d = hh( d, a, b, c, x[int(i+ 0)], 11, -358537222 ); 	// 42
			c = hh( c, d, a, b, x[int(i+ 3)], 16, -722521979 ); 	// 43
			b = hh( b, c, d, a, x[int(i+ 6)], 23, 76029189 ); 	// 44
			a = hh( a, b, c, d, x[int(i+ 9)],  4, -640364487 ); 	// 45
			d = hh( d, a, b, c, x[int(i+12)], 11, -421815835 ); 	// 46
			c = hh( c, d, a, b, x[int(i+15)], 16, 530742520 ); 	// 47
			b = hh( b, c, d, a, x[int(i+ 2)], 23, -995338651 ); 	// 48
			
			// Round 4
			a = ii( a, b, c, d, x[int(i+ 0)],  6, -198630844 ); 	// 49
			d = ii( d, a, b, c, x[int(i+ 7)], 10, 1126891415 ); 	// 50
			c = ii( c, d, a, b, x[int(i+14)], 15, -1416354905 );	// 51
			b = ii( b, c, d, a, x[int(i+ 5)], 21, -57434055 ); 	// 52
			a = ii( a, b, c, d, x[int(i+12)],  6, 1700485571 ); 	// 53
			d = ii( d, a, b, c, x[int(i+ 3)], 10, -1894986606 );	// 54
			c = ii( c, d, a, b, x[int(i+10)], 15, -1051523 ); 	// 55
			b = ii( b, c, d, a, x[int(i+ 1)], 21, -2054922799 );	// 56
			a = ii( a, b, c, d, x[int(i+ 8)],  6, 1873313359 ); 	// 57
			d = ii( d, a, b, c, x[int(i+15)], 10, -30611744 ); 	// 58
			c = ii( c, d, a, b, x[int(i+ 6)], 15, -1560198380 );	// 59
			b = ii( b, c, d, a, x[int(i+13)], 21, 1309151649 ); 	// 60
			a = ii( a, b, c, d, x[int(i+ 4)],  6, -145523070 ); 	// 61
			d = ii( d, a, b, c, x[int(i+11)], 10, -1120210379 );	// 62
			c = ii( c, d, a, b, x[int(i+ 2)], 15, 718787259 ); 	// 63
			b = ii( b, c, d, a, x[int(i+ 9)], 21, -343485551 ); 	// 64
			
			a += aa;
			b += bb;
			c += cc;
			d += dd;
		}
		digest = new ByteArray()
		digest.writeInt(a);
		digest.writeInt(b);
		digest.writeInt(c);
		digest.writeInt(d);
		digest.position = 0;
		// Finish up by concatening the buffers with their hex output
		return IntUtil.toHex( a ) + IntUtil.toHex( b ) + IntUtil.toHex( c ) + IntUtil.toHex( d );
	}
	
	/**
	 * Auxiliary function f as defined in RFC
	 */
	private static function f( x:int, y:int, z:int ):int {
		return ( x & y ) | ( (~x) & z );
	}
	
	/**
	 * Auxiliary function g as defined in RFC
	 */
	private static function g( x:int, y:int, z:int ):int {
		return ( x & z ) | ( y & (~z) );
	}
	
	/**
	 * Auxiliary function h as defined in RFC
	 */
	private static function h( x:int, y:int, z:int ):int {
		return x ^ y ^ z;
	}
	
	/**
	 * Auxiliary function i as defined in RFC
	 */
	private static function i( x:int, y:int, z:int ):int {
		return y ^ ( x | (~z) );
	}
	
	/**
	 * A generic transformation function.  The logic of ff, gg, hh, and
	 * ii are all the same, minus the function used, so pull that logic
	 * out and simplify the method bodies for the transoformation functions.
	 */
	private static function transform( func:Function, a:int, b:int, c:int, d:int, x:int, s:int, t:int):int {
		var tmp:int = a + int( func( b, c, d ) ) + x + t;
		return IntUtil.rol( tmp, s ) +  b;
	}
	
	/**
	 * ff transformation function
	 */
	private static function ff ( a:int, b:int, c:int, d:int, x:int, s:int, t:int ):int {
		return transform( f, a, b, c, d, x, s, t );
	}
	
	/**
	 * gg transformation function
	 */
	private static function gg ( a:int, b:int, c:int, d:int, x:int, s:int, t:int ):int {
		return transform( g, a, b, c, d, x, s, t );
	}
	
	/**
	 * hh transformation function
	 */
	private static function hh ( a:int, b:int, c:int, d:int, x:int, s:int, t:int ):int {
		return transform( h, a, b, c, d, x, s, t );
	}
	
	/**
	 * ii transformation function
	 */
	private static function ii ( a:int, b:int, c:int, d:int, x:int, s:int, t:int ):int {
		return transform( i, a, b, c, d, x, s, t );
	}
	
	/**
	 * Converts a string to a sequence of 16-word blocks
	 * that we'll do the processing on.  Appends padding
	 * and length in the process.
	 *
	 * @param s The string to split into blocks
	 * @return An array containing the blocks that s was
	 *			split into.
	 */
	private static function createBlocks( s:ByteArray ):Array {
		var blocks:Array = new Array();
		var len:int = s.length * 8;
		var mask:int = 0xFF; // ignore hi byte of characters > 0xFF
		for( var i:int = 0; i < len; i += 8 ) {
			blocks[ int(i >> 5) ] |= ( s[ i / 8 ] & mask ) << ( i % 32 );
		}
		
		// append padding and length
		blocks[ int(len >> 5) ] |= 0x80 << ( len % 32 );
		blocks[ int(( ( ( len + 64 ) >>> 9 ) << 4 ) + 14) ] = len;
		return blocks;
	}	
}

/**
 * Contains reusable methods for operations pertaining 
 * to int values.
 */
internal class IntUtil {
	
	/**
	 * Rotates x left n bits
	 *
	 * @langversion ActionScript 3.0
	 * @playerversion Flash 9.0
	 * @tiptext
	 */
	public static function rol ( x:int, n:int ):int {
		return ( x << n ) | ( x >>> ( 32 - n ) );
	}
	
	/**
	 * Rotates x right n bits
	 *
	 * @langversion ActionScript 3.0
	 * @playerversion Flash 9.0
	 * @tiptext
	 */
	public static function ror ( x:int, n:int ):uint {
		var nn:int = 32 - n;
		return ( x << nn ) | ( x >>> ( 32 - nn ) );
	}
	
	/** String for quick lookup of a hex character based on index */
	private static var hexChars:String = "0123456789abcdef";
	
	/**
	 * Outputs the hex value of a int, allowing the developer to specify
	 * the endinaness in the process.  Hex output is lowercase.
	 *
	 * @param n The int value to output as hex
	 * @param bigEndian Flag to output the int as big or little endian
	 * @return A string of length 8 corresponding to the 
	 *		hex representation of n ( minus the leading "0x" )
	 * @langversion ActionScript 3.0
	 * @playerversion Flash 9.0
	 * @tiptext
	 */
	public static function toHex( n:int, bigEndian:Boolean = false ):String {
		var s:String = "";
		
		if ( bigEndian ) {
			for ( var i:int = 0; i < 4; i++ ) {
				s += hexChars.charAt( ( n >> ( ( 3 - i ) * 8 + 4 ) ) & 0xF ) 
					+ hexChars.charAt( ( n >> ( ( 3 - i ) * 8 ) ) & 0xF );
			}
		} else {
			for ( var x:int = 0; x < 4; x++ ) {
				s += hexChars.charAt( ( n >> ( x * 8 + 4 ) ) & 0xF )
					+ hexChars.charAt( ( n >> ( x * 8 ) ) & 0xF );
			}
		}
		
		return s;
	}
}
