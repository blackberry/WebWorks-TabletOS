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
	import com.adobe.audio.format.WAVWriter;
	
	import flash.events.SampleDataEvent;
	import flash.events.TimerEvent;
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.media.Microphone;
	import flash.utils.*;
	
	import json.JSON;
	
	import webworks.extension.DefaultExtension;
	
	public class MicrophoneExtension extends DefaultExtension
	{	
		private const NUM_MILLISEC_PER_SEC:Number = 1000;
		private const MIC_DEFAULTS:Object = {
			loopBack : false,
			useEchoSuppression : false,
			rate : 44
		};
		private const WAV_DEFAULTS:Object = {
			numOfChannels : 2,
			sampleBitRate : 16,
			samplingRate : 44100			
		};
		
		private const ERROR_CODE:Number = 1;
		
		private var _filePath:String = null;
		private var _onSuccessId:String = null;
		private var _onErrorId:String = null;
		private var _mic:Microphone = null;
		private var _soundBytes:ByteArray = null;		
		private var _timer:Timer = null;
		
		public function MicrophoneExtension() {
			_mic = Microphone.getMicrophone();
			_soundBytes = new ByteArray();
		}		
		
		public override function loadFeature(feature:String, version:String):void {
			
		}
		
		public override function unloadFeature():void {
			
			
		}
		
		public override function getFeatureList():Array {			
			return new Array("blackberry.media.microphone");
		}
		
		public function hasMicrophones():Object {
			var result:Object = createResultObject({});			
			
			try {
				if (Microphone.isSupported && _mic != null) {
					result.data["hasMicrophones"] = true;				
				}
			} catch (e:Error) {
				result.code = 1;
				result.msg = e.message;				
			}
			
			return result;
		}
		
		public function recordToFile(filePath:String, duration:Number, onSuccessId:String, onErrorId:String):void {			
			if (_mic != null) {
				_filePath = filePath;
				_onSuccessId = onSuccessId;
				_onErrorId = onErrorId;				
				
				if (checkFilePath()) {
					var durationMs:Number = duration * NUM_MILLISEC_PER_SEC;					
					_timer = new Timer(durationMs);				
					_timer.addEventListener(TimerEvent.TIMER, timerHandler); 
					configMic(MIC_DEFAULTS, durationMs, micSampleDataHandler);					
					_timer.start();
				}
			} else {
				this.evalJavaScriptEvent(_onErrorId, [ERROR_CODE, JSON.encode("no microphone available")]);
			}
		}
		
		private function micSampleDataHandler(event:SampleDataEvent):void {
			try {
				while(event.data.bytesAvailable) { 
					var sample:Number = event.data.readFloat(); 
					_soundBytes.writeFloat(sample);					
					
					// Encoder requires 44.1kHz stereo, so duplicate mono-channel from mic to make 2 of
					// the same channel, effectivily making it stereo data
					_soundBytes.writeFloat(sample);
				}
			} catch (e:Error) {
				stopCapture();
				this.evalJavaScriptEvent(_onErrorId, [ERROR_CODE, JSON.encode(e.message)]);
			}
		}
		
		private function timerHandler(event:TimerEvent):void {
			try {
				stopCapture();
				
				var wavBytes:ByteArray = convertToWav();
				
				// write to file
				var ostream:FileStream = new FileStream();
				ostream.open(new File(_filePath), FileMode.WRITE);
				ostream.writeBytes(wavBytes, 0, wavBytes.length);
				ostream.close();
				
				// invoke success callback function
				this.evalJavaScriptEvent(_onSuccessId, [JSON.encode(_filePath)]);
			} catch (e:Error) {
				this.evalJavaScriptEvent(_onErrorId, [ERROR_CODE, JSON.encode(e.message)]);
			}
		}
		
		private function convertToWav():ByteArray {
			var wavBytes:ByteArray = new ByteArray();
			
			// Setup up wav writer for flash sound -> wav conversion
			var wavWriter:WAVWriter = new WAVWriter();
			wavWriter.numOfChannels = WAV_DEFAULTS.numOfChannels;
			wavWriter.sampleBitRate = WAV_DEFAULTS.sampleBitRate;
			wavWriter.samplingRate = WAV_DEFAULTS.samplingRate;
			
			wavBytes.position = 0;
			_soundBytes.position = 0;
			wavWriter.processSamples(wavBytes, _soundBytes, WAV_DEFAULTS.samplingRate, WAV_DEFAULTS.numOfChannels);
			
			return wavBytes;
		}
		
		private function configMic(config:Object, timeout:int, sampleDataHandler:Function):void {
			_mic.setLoopBack(config.loopBack);
			_mic.setUseEchoSuppression(config.useEchoSuppression);
			_mic.rate = config.rate;				
			_mic.setSilenceLevel(0, timeout);
			_mic.addEventListener(SampleDataEvent.SAMPLE_DATA, sampleDataHandler);			
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
		
		private function stopCapture():void {
			_mic.removeEventListener(SampleDataEvent.SAMPLE_DATA, micSampleDataHandler); 
			_timer.stop();			
		}
		
		private function createResultObject(data : Object) : Object {
			return {
				"code" : 0,
				"msg" : null,
				"data" : data
			};	
		}
	}
}