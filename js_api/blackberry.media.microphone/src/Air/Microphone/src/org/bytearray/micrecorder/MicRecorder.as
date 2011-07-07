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
package org.bytearray.micrecorder
{
	import flash.events.ActivityEvent;
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.events.SampleDataEvent;
	import flash.events.StatusEvent;
	import flash.events.TimerEvent;
	import flash.media.Microphone;
	import flash.utils.ByteArray;
	import flash.utils.Timer;
	import flash.utils.getTimer;
	
	import org.bytearray.micrecorder.encoder.WaveEncoder;
	import org.bytearray.micrecorder.events.RecordingEvent;
	
	/**
	 * Dispatched during the recording of the audio stream coming from the microphone.
	 *
	 * @eventType org.bytearray.micrecorder.RecordingEvent.RECORDING
	 *
	 * * @example
	 * This example shows how to listen for such an event :
	 * <div class="listing">
	 * <pre>
	 *
	 * recorder.addEventListener ( RecordingEvent.RECORDING, onRecording );
	 * </pre>
	 * </div>
	 */
	[Event(name='recording', type='org.bytearray.micrecorder.RecordingEvent')]
	
	/**
	 * Dispatched when the creation of the output file is done.
	 *
	 * @eventType flash.events.Event.COMPLETE
	 *
	 * @example
	 * This example shows how to listen for such an event :
	 * <div class="listing">
	 * <pre>
	 *
	 * recorder.addEventListener ( Event.COMPLETE, onRecordComplete );
	 * </pre>
	 * </div>
	 */
	[Event(name='complete', type='flash.events.Event')]

	/**
	 * This tiny helper class allows you to quickly record the audio stream coming from the Microphone and save this as a physical file.
	 * A WavEncoder is bundled to save the audio stream as a WAV file
	 * @author Thibault Imbert - bytearray.org
	 * @version 1.2
	 * 
	 */	
	public final class MicRecorder extends EventDispatcher
	{
		private var _gain:uint;
		private var _rate:uint;
		private var _silenceLevel:uint;
		private var _timeOut:uint;
		private var _difference:uint;
		private var _microphone:Microphone;
		private var _buffer:ByteArray = new ByteArray();
		private var _output:ByteArray;
		private var _encoder:IEncoder;
		private var _onError:Function;    // error callback
		private var _paused:Boolean;      // flag to support pause/resume
		private var _activity:Boolean;    // flag to detect if mic has activity before timeout
		private var _activityTimer:Timer  // timer to detect if mic has activity before timeout
		
		private const ACTIVITY_TIMEOUT:Number = 500;
		
		private var _completeEvent:Event = new Event ( Event.COMPLETE );
		private var _recordingEvent:RecordingEvent = new RecordingEvent( RecordingEvent.RECORDING, 0 );

		/**
		 * 
		 * @param encoder The audio encoder to use
		 * @param microphone The microphone device to use
		 * @param gain The gain
		 * @param rate Audio rate
		 * @param silenceLevel The silence level
		 * @param timeOut The timeout
		 * 
		 */		
		public function MicRecorder(encoder:IEncoder, onError:Function, microphone:Microphone=null, gain:uint=100, rate:uint=44, silenceLevel:uint=0, timeOut:uint=4000)
		{
			_encoder = encoder;
			_microphone = microphone;
			_gain = gain;
			_rate = rate;
			_silenceLevel = silenceLevel;
			_timeOut = timeOut;
			_onError = onError;
			_paused = false;
			_activity = false;
		}
		
		/**
		 * Starts recording from the default or specified microphone.
		 * The first time the record() method is called the settings manager may pop-up to request access to the Microphone.
		 */		
		public function record():void
		{
			if ( _microphone == null )
				_microphone = Microphone.getMicrophone();
			 
			_difference = getTimer();
			
			_microphone.setSilenceLevel(_silenceLevel, _timeOut);
			_microphone.gain = _gain;
			_microphone.rate = _rate;
			_buffer.length = 0;
			
			_paused = false;
			_activity = false;			
			
			_microphone.addEventListener(ActivityEvent.ACTIVITY, onActivity);
			_microphone.addEventListener(SampleDataEvent.SAMPLE_DATA, onSampleData);
			_microphone.addEventListener(StatusEvent.STATUS, onStatus);
			
//			detectActivity();
		}
		
		// the calls to this function is commented out due to
		// [PR #99339] Microphone.muted property and status event
		private function detectActivity():void
		{
			// check if microphone is already in use, call at the following times:
			// (1) right after user presses record,
			// (2) when status event comes in (i.e. when user presses OK on permission prompt)
			
			// only start activity timer when permission is granted to use microphone
			if (!_microphone.muted) {
				_activityTimer = new Timer(ACTIVITY_TIMEOUT);
				_activityTimer.addEventListener(TimerEvent.TIMER, activityTimerHandler);
				_activityTimer.start();
			}
		}
		
		private function activityTimerHandler(event:TimerEvent):void
		{
			if (!_activity) {				
				_onError.apply(this, ["no activity - check if microphone already in use"]);
			}
			
			_activityTimer.stop();
		}
		
		private function onActivity(event:ActivityEvent):void
		{
			_activity = event.activating;	
		}
		
		private function onStatus(event:StatusEvent):void
		{			
			_difference = getTimer();
			
//			detectActivity();
		}
		
		/**
		 * Dispatched during the recording.
		 * @param event
		 */		
		private function onSampleData(event:SampleDataEvent):void
		{
			if (!_paused) {
				_recordingEvent.time = getTimer() - _difference;
				
				dispatchEvent( _recordingEvent );
				
				while(event.data.bytesAvailable > 0)
					_buffer.writeFloat(event.data.readFloat());
			}
		}
		
		public function pause():void
		{
			_paused = !_paused;
		}
		
		/**
		 * Stop recording the audio stream and automatically starts the packaging of the output file.
		 */		
		public function stop():void
		{
			_microphone.removeEventListener(SampleDataEvent.SAMPLE_DATA, onSampleData);
			
			if (_activity) {
				_buffer.position = 0;
				_output = _encoder.encode(_buffer, 1);
				
				dispatchEvent( _completeEvent );
			}
		}
		
		/**
		 * 
		 * @return 
		 * 
		 */		
		public function get gain():uint
		{
			return _gain;
		}

		/**
		 * 
		 * @param value
		 * 
		 */		
		public function set gain(value:uint):void
		{
			_gain = value;
		}

		/**
		 * 
		 * @return 
		 * 
		 */		
		public function get rate():uint
		{
			return _rate;
		}

		/**
		 * 
		 * @param value
		 * 
		 */		
		public function set rate(value:uint):void
		{
			_rate = value;
		}
		
		/**
		 * 
		 * @return 
		 * 
		 */		
		public function get silenceLevel():uint
		{
			return _silenceLevel;
		}

		/**
		 * 
		 * @param value
		 * 
		 */		
		public function set silenceLevel(value:uint):void
		{
			_silenceLevel = value;
		}


		/**
		 * 
		 * @return 
		 * 
		 */		
		public function get microphone():Microphone
		{
			return _microphone;
		}

		/**
		 * 
		 * @param value
		 * 
		 */		
		public function set microphone(value:Microphone):void
		{
			_microphone = value;
		}

		/**
		 * 
		 * @return 
		 * 
		 */		
		public function get output():ByteArray
		{
			return _output;
		}
		
		/**
		 * 
		 * @return 
		 * 
		 */		
		public override function toString():String
		{
			return "[MicRecorder gain=" + _gain + " rate=" + _rate + " silenceLevel=" + _silenceLevel + " timeOut=" + _timeOut + " microphone:" + _microphone + "]";
		}
	}
}