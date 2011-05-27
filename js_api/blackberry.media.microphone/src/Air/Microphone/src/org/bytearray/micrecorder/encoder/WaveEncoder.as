/*
* Copyright (c) 2011, Adobe Systems Incorporated
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without 
* modification, are permitted provided that the following conditions are
* met:
*
* Redistributions of source code must retain the above copyright notice, 
* this list of conditions and the following disclaimer.
*
* Redistributions in binary form must reproduce the above copyright
* notice, this list of conditions and the following disclaimer in the 
* documentation and/or other materials provided with the distribution.
*
* Neither the name of Adobe Systems Incorporated nor the names of its 
* contributors may be used to endorse or promote products derived from 
* this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
* IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
* THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
* PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
* CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
* EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
* PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
* PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
* LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
* NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
package org.bytearray.micrecorder.encoder
{
	import flash.events.Event;
	import flash.utils.ByteArray;
	import flash.utils.Endian;
	
	import org.bytearray.micrecorder.IEncoder;
	
	public class WaveEncoder implements IEncoder
	{
		private static const RIFF:String = "RIFF";	
		private static const WAVE:String = "WAVE";	
		private static const FMT:String = "fmt ";	
		private static const DATA:String = "data";	
		
		private var _bytes:ByteArray = new ByteArray();
		private var _buffer:ByteArray = new ByteArray();
		private var _volume:Number;
		
		/**
		 * 
		 * @param volume
		 * 
		 */		
		public function WaveEncoder( volume:Number=1 )
		{
			_volume = volume;
		}
		
		/**
		 * 
		 * @param samples
		 * @param channels
		 * @param bits
		 * @param rate
		 * @return 
		 * 
		 */		
		public function encode( samples:ByteArray, channels:int=2, bits:int=16, rate:int=44100 ):ByteArray
		{
			var data:ByteArray = create( samples );
			
			_bytes.length = 0;
			_bytes.endian = Endian.LITTLE_ENDIAN;
			
			_bytes.writeUTFBytes( WaveEncoder.RIFF );
			_bytes.writeInt( uint( data.length + 44 ) );
			_bytes.writeUTFBytes( WaveEncoder.WAVE );
			_bytes.writeUTFBytes( WaveEncoder.FMT );
			_bytes.writeInt( uint( 16 ) );
			_bytes.writeShort( uint( 1 ) );
			_bytes.writeShort( channels );
			_bytes.writeInt( rate );
			_bytes.writeInt( uint( rate * channels * ( bits >> 3 ) ) );
			_bytes.writeShort( uint( channels * ( bits >> 3 ) ) );
			_bytes.writeShort( bits );
			_bytes.writeUTFBytes( WaveEncoder.DATA );
			_bytes.writeInt( data.length );
			_bytes.writeBytes( data );
			_bytes.position = 0;
			
			return _bytes;
		}
				
		private function create( bytes:ByteArray ):ByteArray
		{
			_buffer.endian = Endian.LITTLE_ENDIAN;
			_buffer.length = 0;
			bytes.position = 0;
			
			while( bytes.bytesAvailable ) 
				_buffer.writeShort( bytes.readFloat() * (0x7fff * _volume) );
			return _buffer;
		}
	}
}