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
package blackberry.utils
{
    import flash.utils.ByteArray;

    import mx.utils.Base64Decoder;
    import mx.utils.Base64Encoder;

    import webworks.extension.DefaultExtension;
    import webworks.extension.WebWorksReturnValue;
    import webworks.service.ServiceManager;
    import webworks.service.blob.BlobManager;

    public class Utilities extends DefaultExtension
    {
        private const FEATURE_ID:Array = new Array("blackberry.utils");

        public function Utilities()
        {
            super();
        }

        override public function getFeatureList():Array
        {
            return FEATURE_ID;
        }

        private function getBlobManager():BlobManager
        {
            var serviceManager:ServiceManager = environment["serviceManager"] as ServiceManager;
            return serviceManager.getService(BlobManager.NAME) as BlobManager;
        }

        public function blobToString(blobId:String, encoding:String):Object
        {
            var characterSet:String = translateEncodingIntoASCharacterSet(encoding);
            var ba:ByteArray = getBlobManager().getBlobFromRepository(blobId).bytes;
            ba.position = 0;

            var stringResult:String;
            if (characterSet == "base64")
            {
                var base64Decoder:Base64Decoder = new Base64Decoder();
                base64Decoder.decode(ba.readUTFBytes(ba.length));
                var tmpByteArray:ByteArray = base64Decoder.toByteArray();
                stringResult = tmpByteArray.readUTFBytes(tmpByteArray.length);
            } 
            else if (characterSet == "binary")
            {
                var base64Encoder:Base64Encoder = new Base64Encoder();
                base64Encoder.encodeBytes(ba);
                stringResult = base64Encoder.toString();
            }
            else
            {
                stringResult = ba.readMultiByte(ba.length, characterSet);
            }

            // UTF-8 character number cannot be larger than 254, 
            // if there is such character in the returned string (e.g. U+FEFF is the invisible Zero-width non-breaking space (ZWNBSP) character), 
            // it should be removed.
            // Later on, it might be "possible" for ActionScript to return ZWNBSP into 2 bytes (FE, FF) mistakenly,
            // So we check toweard 254 instead of 255.
            if (stringResult.charCodeAt(0) >= 254)
            {
                stringResult = stringResult.substring(1);
            }

            return new WebWorksReturnValue(stringResult).jsonObject;
        }

        public function stringToBlob(data:String, encoding:String):Object
        {
            var characterSet:String = translateEncodingIntoASCharacterSet(encoding);
            var ba:ByteArray = new ByteArray();
            if (characterSet == "base64")
            {
                var base64Encoder:Base64Encoder = new Base64Encoder();
                base64Encoder.encode(data);
                ba.writeUTFBytes(base64Encoder.toString());
            }
			else if (characterSet == "binary")
			{
				var base64Decoder:Base64Decoder = new Base64Decoder();
                base64Decoder.decode(data);
                ba = base64Decoder.toByteArray();
			}
            else if (characterSet == "none") {
				for(var s=0; s<data.length; s++) {
					var bin = data.charAt(s);
					var byte:uint = 0;
					for(var i:uint = 0; i < 8; i++) {
						byte += uint(bin.charAt(7 - i)) * Math.pow(2,i);
					}
					ba.writeUnsignedInt(byte);
				}
				
				
				//for(var i=0; i<data.length; i++) {
				//	var dataInt:int = parseint(data.charAt(i));
				//	ba.writeInt(dataInt);
				//}
				//ba.writeUTFBytes(data);
			}
            else
            {
                ba.writeMultiByte(data, characterSet);
            }

            var bm:BlobManager = getBlobManager();
            var blobId:String = bm.createBlob(ba).id;

            return new WebWorksReturnValue(blobId).jsonObject;
        }

        private function translateEncodingIntoASCharacterSet(encoding:String):String
        {
            switch (encoding.toLowerCase())
            {
                case "iso-8859-1":
                case "utf-8":
                case "us-ascii":
                case "base64":
                    return encoding.toLowerCase();
                case "utf-16be":
                    return "unicodeFFFE";
                default:
                    return encoding;
            }
        }
    }
}
