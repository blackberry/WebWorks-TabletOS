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
    import flash.events.SampleDataEvent;
    import flash.filesystem.File;
    import flash.filesystem.FileMode;
    import flash.filesystem.FileStream;
    import flash.media.Microphone;
    import flash.utils.*;

    import json.JSON;

    import org.bytearray.micrecorder.MicRecorder;
    import org.bytearray.micrecorder.encoder.WaveEncoder;

    import webworks.extension.DefaultExtension;
    import webworks.extension.WebWorksReturnValue;

    public class MicrophoneExtension extends DefaultExtension
    {
        private const ERROR_CODE:Number = -1;
        private var _mic:Microphone = null;
        private var _recorder:MicRecorder = null;

        public function MicrophoneExtension()
        {
            _mic = Microphone.getMicrophone();
        }

        public override function loadFeature(feature:String, version:String):void
        {

        }

        public override function unloadFeature():void
        {

        }

        public override function getFeatureList():Array
        {
            return new Array("blackberry.media.microphone");
        }

        public function record(filePath:String, onSuccessCallbackId:String, onErrorCallbackId:String):void
        {
            var onRecordComplete:Function = new Function;
            var onError:Function = function(msg:String):void
            {
                evalJavaScriptEvent(onErrorCallbackId, [WebWorksReturnValue.RET_ERROR, JSON.encode(msg)]);
            };

            if (_recorder != null && _recorder.hasEventListener(Event.COMPLETE))
            {
                onError("Can't start a new recording while the microphone still in use.");

                return;
            }

            _recorder = new MicRecorder(new WaveEncoder(), onError);

            if (_mic != null)
            {
                if (checkFilePath(filePath, onError))
                {
                    _recorder.addEventListener(Event.COMPLETE, onRecordComplete = function(event:Event):void
                    {
                        try
                        {
                            writeToFile(filePath, _recorder.output);

                            _recorder.removeEventListener(Event.COMPLETE, onRecordComplete);

                            // invoke success callback function
                            evalJavaScriptEvent(onSuccessCallbackId, [JSON.encode(filePath)]);
                        }
                        catch (e:Error)
                        {
                            onError(e.message);
                        }
                    });

                    _recorder.record();
                }
            }
            else
            {
                onError("no microphone available");
            }
        }

        public function pause():void
        {
            _recorder.pause();
        }

        public function stop():void
        {
            _recorder.stop();
        }

        private function checkFilePath(filePath:String, onError:Function):Boolean
        {
            var file:File = new File(filePath);

            if (file.exists)
            {
                onError("filePath points to an existing file");
                return false;
            }
            else
            {
                var tempFile:File = File.createTempFile();

                if (tempFile.exists)
                {
                    try
                    {
                        // try move temp file to the destination path to see if that path is writable
                        tempFile.moveTo(file);
                        file.deleteFile();
                    }
                    catch (e:Error)
                    {
                        onError(e.message);
                        return false;
                    }
                }
            }

            return true;
        }

        private function writeToFile(filePath:String, bytes:ByteArray):void
        {
            var ostream:FileStream = new FileStream();
            ostream.open(new File(filePath), FileMode.WRITE);
            ostream.writeBytes(bytes, 0, bytes.length);
            ostream.close();
        }
    }
}