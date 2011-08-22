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
    import flash.filesystem.File;
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

        public function Camera()
        {
        }

        override public function getFeatureList():Array
        {
            return new Array("blackberry.media.camera");
        }

        public function invokeCamera(cameraMode:String, onCapturedId:String, onCameraClosedId:String, onCameraErrorId:String):void
        {
            try
            {
                var onCameraClosed:Function = new Function;
                var defaultDeviceCamera:CameraUI = new CameraUI();
                defaultDeviceCamera.addEventListener(MediaEvent.COMPLETE, function(event:MediaEvent):void
                {
                    var mediaPromise:MediaPromise = event.data;
                    var path:String = mediaPromise.relativePath;

                    var shared:File = File.userDirectory.resolvePath("shared");
                    var fileList:Array = shared.getDirectoryListing();
                    var filePath:String = mediaPromise.relativePath;

                    for (var i:uint = 0; i < fileList.length; i++)
                    {
                        var file:File = fileList[i] as File;

                        if (file.isDirectory)
                        {
                            if (file.name == "camera")
                            {
                                filePath = file.url + "/" + mediaPromise.relativePath;
                            }
                        }
                    }

                    evalJavaScriptEvent(onCapturedId, [filePath]);

                    // After saving the file, camera doesn't fire closed camera event, this is why it called here. 
                    onCameraClosed(null);

                });
                defaultDeviceCamera.addEventListener(Event.CANCEL, onCameraClosed = function(event:Event):void
                {
                    evalJavaScriptEvent(onCameraClosedId, []);
                });
                defaultDeviceCamera.addEventListener(ErrorEvent.ERROR, function(error:ErrorEvent):void
                {
                    evalJavaScriptEvent(onCameraErrorId, []);
                });

                if (cameraMode == PHOTO)
                {
                    defaultDeviceCamera.launch(MediaType.IMAGE);
                }
                else
                {
                    defaultDeviceCamera.launch(MediaType.VIDEO);
                }
            }
            catch (e:Error)
            {
                evalJavaScriptEvent(onCameraErrorId, []);
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
    }
}
