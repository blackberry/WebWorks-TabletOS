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

        private var _jsOnCapturedId:String = "";
        private var _jsOnCameraClosedId:String = "";
        private var _jsOnErrorId:String = "";


        public function Camera()
        {
        }

        override public function getFeatureList():Array
        {
            return new Array("blackberry.media.camera");
        }

        public function invokeCamera(cameraMode:String, onCapturedId:String, onCameraClosedId:String, onErrorId:String):void
        {
            _jsOnCapturedId = onCapturedId;
            _jsOnCameraClosedId = onCameraClosedId;
            _jsOnErrorId = onErrorId;

            var defaultDeviceCamera:CameraUI = new CameraUI();
            defaultDeviceCamera.addEventListener(MediaEvent.COMPLETE, onCaptured);
            defaultDeviceCamera.addEventListener(Event.CANCEL, onCameraClosed);
            defaultDeviceCamera.addEventListener(ErrorEvent.ERROR, onError);

            if (cameraMode == PHOTO)
            {
                defaultDeviceCamera.launch(MediaType.IMAGE);
            }
            else
            {
                defaultDeviceCamera.launch(MediaType.VIDEO);
            }
        }

        public function takePicture(onCapturedId:String, onCameraClosedId:String, onErrorId:String):void
        {
            invokeCamera(PHOTO, onCapturedId, onCameraClosedId, onErrorId);
        }

        public function takeVideo(onCapturedId:String, onCameraClosedId:String, onErrorId:String):void
        {
            invokeCamera(VIDEO, onCapturedId, onCameraClosedId, onErrorId);
        }

        private function onCaptured(event:MediaEvent):void
        {
            var mediaPromise:MediaPromise = event.data;

            this.evalJavaScriptEvent(_jsOnCapturedId, [mediaPromise.relativePath]);
			
            // After saving the file, camera doens't fire closed camera event, this is why it called manually. 
            onCameraClosed(null);
        }

        private function onCameraClosed(event:Event):void
        {
            this.evalJavaScriptEvent(_jsOnCameraClosedId, []);
        }

        private function onError(error:ErrorEvent):void
        {
            this.evalJavaScriptEvent(_jsOnErrorId, []);
        }
    }
}