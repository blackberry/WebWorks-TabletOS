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
	var UTILITIES_API_URL = "blackberry/utils";
	
	function makeCall(toFunction, functionArgs) {
		var request = new blackberry.transport.RemoteFunctionCall(UTILITIES_API_URL + "/" + toFunction);
		
		if(functionArgs) {
			for(var name in functionArgs) {
				request.addParam(name, functionArgs[name]);
			}
		}
		
		return request.makeQnxExtensionCall();
	}

	function UtilsDispatcher() {
	};

	UtilsDispatcher.prototype.blobToString = function (blob, encoding) {
		if (blob.id == undefined) {
			return undefined;
		}
		
		var resultString = makeCall("blobToString", {"blobId": blob.id, "encoding" : (encoding == null || encoding == undefined)? "ISO-8859-1" : encoding});
		return (resultString.code == WEBWORKS_RETURN_VALUE_SUCCESS)? resultString.data : "";
	};

	UtilsDispatcher.prototype.xmlSerializer = new XMLSerializer();
	
	UtilsDispatcher.prototype.documentToBlob = function (xmlDocument) {
		var xmlString;
		try {
			xmlString = this.xmlSerializer.serializeToString( xmlDocument );
		} catch (e) {
			return undefined;
		}
	
		var resultId = makeCall("documentToBlob", {"data": xmlString});
		return (resultId.code == WEBWORKS_RETURN_VALUE_SUCCESS)? new blackberry.service.Blob(resultId.data) : undefined;		
	};
	
	UtilsDispatcher.prototype.stringToBlob = function (s, encoding) {
		var resultId = makeCall("stringToBlob", {"data": s, "encoding" : (encoding == null || encoding == undefined)? "ISO-8859-1" : encoding});
		return (resultId.code == WEBWORKS_RETURN_VALUE_SUCCESS)? new blackberry.service.Blob(resultId.data) : undefined;
	};
	
	blackberry.Loader.javascriptLoaded("blackberry.utils", UtilsDispatcher);
})();
