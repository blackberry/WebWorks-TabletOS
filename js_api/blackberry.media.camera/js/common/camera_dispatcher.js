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
    var CAMERA_URL = "blackberry/media/camera/";
    var PHOTO = "takePicture";
    var VIDEO = "takeVideo";

    function CameraDispatcher() {
    }

    function invokeCamera(cameraMode, onCapturedId, onCameraClosedId, onErrorId) {
        var ARGS_ON_CAPTURED = "onCaptured";
        var ARGS_ON_CAMERA_CLOSED = "onCameraClosed";
        var ARGS_ON_ERROR = "onError";

        var request = new blackberry.transport.RemoteFunctionCall(CAMERA_URL + cameraMode);

        request.addParam(ARGS_ON_CAPTURED, onCapturedId);
        request.addParam(ARGS_ON_CAMERA_CLOSED, onCameraClosedId);
        request.addParam(ARGS_ON_ERROR, onErrorId);

        request.makeAsyncCall();
    }

    CameraDispatcher.prototype.takePicture = function(onCapturedId, onCameraClosedId, onErrorId) {
        invokeCamera(PHOTO, onCapturedId, onCameraClosedId, onErrorId);
    };
    CameraDispatcher.prototype.takeVideo = function(onCapturedId, onCameraClosedId, onErrorId) {
        invokeCamera(VIDEO, onCapturedId, onCameraClosedId, onErrorId);
    };
    blackberry.Loader.javascriptLoaded("blackberry.media.camera", CameraDispatcher);
})();