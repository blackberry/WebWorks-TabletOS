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
    var SERVICE_URL = "service/blob";

    function ServiceDispatcher() {
    }

    function makeCall(toFunction, functionArgs) {
        var request = new blackberry.transport.RemoteFunctionCall(SERVICE_URL + "/" + toFunction);

        if (functionArgs) {
            for (var name in functionArgs) {
                request.addParam(name, functionArgs[name]);
            }
        }
        return request.makeQnxExtensionCall();
    }

    ServiceDispatcher.prototype.getBytes = function (id, offset, length) {
        if (offset == null || offset == undefined) {
            offset = NaN;
        }

        if (length == null || length == undefined) {
            length = NaN;
        }

        var result = makeCall("getBytes", { "blobId": id, "offset": offset, "length": length });
        return (result.code == WEBWORKS_RETURN_VALUE_SUCCESS)? result.data : undefined;
    }

    ServiceDispatcher.prototype.slice = function (id, offset, length) {
        if (offset == null || offset == undefined) {
            offset = NaN;
        }

        if (length == null || length == undefined) {
            length = NaN;
        }

        var slicedId = makeCall("slice", { "blobId": id, "offset": offset, "length": length });
        return (slicedId.code == WEBWORKS_RETURN_VALUE_SUCCESS)? (new blackberry.service.Blob(slicedId.data)) : undefined;
    }

    ServiceDispatcher.prototype.getLength = function (id) {
        var length = makeCall("getLength", { "blobId": id });
        return (length.code == WEBWORKS_RETURN_VALUE_SUCCESS)? length.data : undefined;
    }

    blackberry.Loader.javascriptLoaded("blackberry.service", ServiceDispatcher);
} ());