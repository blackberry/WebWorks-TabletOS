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

        function invokeCamera(cameraMode, onComplete, onCancel, onError) {
            var onCompleteId = blackberry.events.registerEventHandler("onComplete", onComplete);
            var onCancelId = blackberry.events.registerEventHandler("onCancel", onCancel);
            var onErrorId = blackberry.events.registerEventHandler("onError", onError);

            if(cameraMode === PHOTO) {
                return disp.takePicture(onCompleteId, onCancelId, onErrorId);
            } else {
                return disp.takeVideo(onCompleteId, onCancelId, onErrorId);
            }
        }

        /**
         * Callback method. Invoked after capturing is completed.
         * @name onCompleteCallback
         * @function
         * @param {string} filePath The path to the file.
         */
        /**
         * Callback method. Invoked if capturing was canceled.
         * @name onCancelCallback
         * @function
         */
        /**
         * Callback method. Invoked if error occurred.
         * @name onErrorCallback
         * @function
         */

        /**
         * Opens native camera application to capture a photo.
         * @name takePicture
         * @methodOf Camera#
         * @param {onCompleteCallback} onComplete Invoked when photo capturing is completed.
         * @param {onCancelCallback} onCancel Invoked on capturing was canceled (i.e. app is closed without saving a picture).
         * @param {onErrorCallback} onError Invoked when error occured (i.e. the default camera cannot be opened).
         */
        this.constructor.prototype.takePicture = function(onComplete, onCancel, onError) {
            return invokeCamera(PHOTO, onComplete, onCancel, onError);
        };
        /**
         * Opens native camera application to capture a video.
         * @name takeVideo
         * @methodOf Camera#
         * @param {onCompleteCallback} onComplete Invoked when video capturing is completed.
         * @param {onCancelCallback} onCancel Invoked on capturing was canceled (i.e. app is closed without saving a picture).
         * @param {onErrorCallback} onError Invoked when error occured (i.e. the default camera cannot be opened).
         */
        this.constructor.prototype.takeVideo = function(onComplete, onCancel, onError) {
            return invokeCamera(VIDEO, onComplete, onCancel, onError);
        };
    };

    blackberry.Loader.javascriptLoaded("blackberry.media.camera", Camera);

})();