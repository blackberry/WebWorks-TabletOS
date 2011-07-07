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
(function() {
    /**
     * @namespace
     * Allows to capture a still image or video using the native camera application.
     *
     * @name Camera
     */

    function Camera(disp) {
        var PHOTO = "photo";
        var VIDEO = "video";

        function invokeCamera(cameraMode, onCaptured, onCameraClosed, onError) {
            var onCapturedId = blackberry.events.registerEventHandler("onCaptured", onCaptured);
            var onCameraClosedId = blackberry.events.registerEventHandler("onCameraClosed", onCameraClosed);
            var onErrorId = blackberry.events.registerEventHandler("onError", onError);

            if(cameraMode === PHOTO) {
                return disp.takePicture(onCapturedId, onCameraClosedId, onErrorId);
            } else {
                return disp.takeVideo(onCapturedId, onCameraClosedId, onErrorId);
            }
        }

        this.constructor.prototype.takePicture = function(onCaptured, onCameraClosed, onError) {
            checkRequiredParameter(arguments, 1);

            return invokeCamera(PHOTO, onCaptured, onCameraClosed, onError);
        };
        this.constructor.prototype.takeVideo = function(onCaptured, onCameraClosed, onError) {
            checkRequiredParameter(arguments, 1);

            return invokeCamera(VIDEO, onCaptured, onCameraClosed, onError);
        };
        var checkRequiredParameter = function(args, requiredNum) {
            var errorMsg = 'Required argument missing';
            if(args.length < requiredNum) {
                throw new Error(errorMsg);
            } else {
                for (i= 0; i < requiredNum; i++) {
                    if(!args[i]) {
                        throw new Error(errorMsg);
                    }
                }
            }
        }
    };

    blackberry.Loader.javascriptLoaded("blackberry.media.camera", Camera);

})();