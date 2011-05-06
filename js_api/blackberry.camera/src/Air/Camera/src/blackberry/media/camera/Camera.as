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
package blackberry.media.camera
{
    import flash.events.ErrorEvent;
    import flash.events.Event;
    import flash.events.MediaEvent;
    import flash.media.CameraUI;
    import flash.media.MediaPromise;
    import flash.media.MediaType;
    import flash.net.URLRequest;
    import flash.net.navigateToURL;

    import json.JSON;

    import webworks.extension.DefaultExtension;

    public class Camera extends DefaultExtension
    {
        private var PHOTO:String = "photo";
        private var VIDEO:String = "video"

        private var _jsOnCompleteId:String = "";
        private var _jsOnCancelId:String = "";
        private var _jsOnErrorId:String = "";


        public function Camera()
        {
        }

        override public function getFeatureList():Array
        {
            return new Array("blackberry.media.camera");
        }

        public function invokeCamera(cameraMode:String, onCompleteId:String, onCancelId:String, onErrorId:String):void
        {
            _jsOnCompleteId = onCompleteId;
            _jsOnCancelId = onCancelId;
            _jsOnErrorId = onErrorId;

            var defaultDeviceCamera:CameraUI = new CameraUI();
            defaultDeviceCamera.addEventListener(MediaEvent.COMPLETE, onImageCaptured);
            defaultDeviceCamera.addEventListener(Event.CANCEL, onCaptureCanceled);
            defaultDeviceCamera.addEventListener(ErrorEvent.ERROR, onCameraError);

            if (cameraMode == PHOTO)
            {
                defaultDeviceCamera.launch(MediaType.IMAGE);
            }
            else
            {
                defaultDeviceCamera.launch(MediaType.VIDEO);
            }
        }

        public function takePicture(onCompleteId:String, onCancelId:String, onErrorId:String):void
        {
            invokeCamera(PHOTO, onCompleteId, onCancelId, onErrorId);
        }

        public function takeVideo(onCompleteId:String, onCancelId:String, onErrorId:String):void
        {
            invokeCamera(VIDEO, onCompleteId, onCancelId, onErrorId);
        }

        private function onImageCaptured(event:MediaEvent):void
        {
            var mediaPromise:MediaPromise = event.data;
            var params:Array = encodeEventParams([mediaPromise.relativePath]);

            this.evalJavaScriptEvent(_jsOnCompleteId, params);
        }

        private function onCaptureCanceled(event:Event):void
        {
            this.evalJavaScriptEvent(_jsOnCancelId, []);
        }

        private function onCameraError(error:ErrorEvent):void
        {
            this.evalJavaScriptEvent(_jsOnErrorId, []);
        }
    }
}