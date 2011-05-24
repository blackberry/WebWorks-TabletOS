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
package blackberry.media.microphone
{		
	import flash.events.Event;
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.media.Microphone;
	import flash.utils.*;
	
	import json.JSON;
	
	import org.bytearray.micrecorder.MicRecorder;
	import org.bytearray.micrecorder.encoder.WaveEncoder;
	import org.bytearray.micrecorder.events.RecordingEvent;
	
	import webworks.extension.DefaultExtension;
	import webworks.extension.WebWorksReturnValue;
	
	public class MicrophoneExtension extends DefaultExtension
	{	
		private const ERROR_CODE:Number = -1;
		
		private var _filePath:String = null;
		private var _onSuccessId:String = null;
		private var _onErrorId:String = null;
		private var _mic:Microphone = null;
		private var _soundBytes:ByteArray = null;		
		private var _timer:Timer = null;
		
		private var _recorder:MicRecorder = null;
		
		public function MicrophoneExtension() {
			_mic = Microphone.getMicrophone();
			_recorder = new MicRecorder(new WaveEncoder());
		}		
		
		public override function loadFeature(feature:String, version:String):void {
			
		}
		
		public override function unloadFeature():void {
						
		}
		
		public override function getFeatureList():Array {			
			return new Array("blackberry.media.microphone");
		}
		
		public function hasMicrophones():Object {
			var result:WebWorksReturnValue;
			var returnData:Object = {};
			
			try {
				if (Microphone.isSupported && _mic != null) {
					returnData["hasMicrophones"] = true;				
				} else {
					returnData["hasMicrophones"] = false;
				}
				
				result = new WebWorksReturnValue(returnData);
			} catch (e:Error) {
				result = new WebWorksReturnValue(returnData, ERROR_CODE, e.message);				
			}
			
			return result.jsObject;
		}
		
		public function record(filePath:String, onSuccessId:String, onErrorId:String):void {	
			if (_mic != null) {
				_filePath = filePath;
				_onSuccessId = onSuccessId;
				_onErrorId = onErrorId;
				
				if (checkFilePath()) {
					_recorder.addEventListener(RecordingEvent.RECORDING, onRecording);
					_recorder.addEventListener(Event.COMPLETE, onRecordComplete);
					_recorder.record();
				}
			} else {
				this.evalJavaScriptEvent(_onErrorId, [ERROR_CODE, JSON.encode("no microphone available")]);
			}			
		}
		
		public function pause():void {
			_recorder.pause();
		}
		
		public function stop():void {
			_recorder.stop();
		}
		
		private function onRecording(event:RecordingEvent):void {
			// not used
		}
		
		private function onRecordComplete(event:Event):void {
			try {
				writeToFile(_recorder.output);				
				
				// invoke success callback function
				this.evalJavaScriptEvent(_onSuccessId, [JSON.encode(_filePath)]);
			} catch (e:Error) {
				this.evalJavaScriptEvent(_onErrorId, [ERROR_CODE, JSON.encode(e.message)]);
			}
		}
		
		private function checkFilePath():Boolean {
			var file:File = new File(_filePath);
			
			if (file.exists) {
				this.evalJavaScriptEvent(_onErrorId, [ERROR_CODE, JSON.encode("filePath points to an existing file")]);
				return false;
			} else {
				var tempFile:File = File.createTempFile();				
				
				if (tempFile.exists) {
					try {
						// try move temp file to the destination path to see if that path is writable
						tempFile.moveTo(file);
						file.deleteFile();
					} catch (e:Error) {
						this.evalJavaScriptEvent(_onErrorId, [ERROR_CODE, JSON.encode(e.message)]);
						return false;
					}
				}					
			}
			
			return true;
		}
		
		private function writeToFile(bytes:ByteArray):void {
			var ostream:FileStream = new FileStream();
			ostream.open(new File(_filePath), FileMode.WRITE);
			ostream.writeBytes(bytes, 0, bytes.length);
			ostream.close();
		}
	}
}