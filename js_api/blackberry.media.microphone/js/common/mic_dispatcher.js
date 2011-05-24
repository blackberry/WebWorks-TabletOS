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
(function () {
	var MIC_URL = "blackberry/media/microphone";
	var EVENT_SUCCESS = "onRecordAudioSuccess";
	var EVENT_ERROR = "onRecordAudioError";
	
	function MicrophoneDispatcher() {
	}
	
	function makeCall(toFunction, functionArgs, async) {
		var request = new blackberry.transport.RemoteFunctionCall(MIC_URL + "/" + toFunction);
		
		if(functionArgs) {
			for(var name in functionArgs) {
				request.addParam(name, functionArgs[name]);
			}
		}
				
		if (!async) {
			return request.makeSyncCall();
		} else {
			return request.makeAsyncCall();
		}		
	}
	
	function isDefined(o) {
		return typeof(o) != "undefined";
	}	
	
	MicrophoneDispatcher.prototype.hasMicrophones = function () {		
		var result = makeCall("hasMicrophones", false);

		if (isDefined(result.code)) {
			if (result.code != 0) {
				throw new Error(result.msg);
			}
		}
		
		return result.data.hasMicrophones;
	};
	
	MicrophoneDispatcher.prototype.record = function(filePath, onCaptured, onError) {
		var onRecordSuccessId = blackberry.events.registerEventHandler(EVENT_SUCCESS, onCaptured);
		var onRecordErrorId = blackberry.events.registerEventHandler(EVENT_ERROR, onError);
		
		makeCall("record", {"filePath" : filePath, EVENT_SUCCESS : onRecordSuccessId, EVENT_ERROR : onRecordErrorId}, true);
	};

	MicrophoneDispatcher.prototype.pause = function() {
		makeCall("pause", {}, true);
	};
	
	MicrophoneDispatcher.prototype.stop = function() {
		makeCall("stop", {}, true);
	};
			
	blackberry.Loader.javascriptLoaded("blackberry.media.microphone", MicrophoneDispatcher);	
})();