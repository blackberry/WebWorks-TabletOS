/*
 * Copyright 2010 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package webworks.config
{
	import flash.utils.Dictionary;

	public class Globals
	{
		// constants
		public static const defaultValues:Object = {
			"configXML" 				: "config.xml", // String
			"configXMLDoc" 				: null, // XML Document
			
			"backButtonBehavior"		: "back", // String
			"customHeaders"				: {Date: "Dec 23 2010, 13:30 GTM-5"}, // Hashtable
			"version"					: "1.0.0", // String
			
			"author"					: "", // String
			"authorURL"					: "", // String
			"authorEmail"				: "", // String
			"copyright"					: "", // String
			"content"					: "index.html", // String
			"contentCharset"			: "", // String
			"contentType"				: "", // String
			"description"				: "", // String
			"icon"						: "AIRApp_72.png", // String
			"iconHover"					: "", // String
			"id"						: "", // String
			"license"					: "", // String
			"licenseURL"				: "", // String
			"name"						: "WebWorksAppTemplate", // String
			
			"navigationMode"			: "pointer", // String
			
			"preferredTransports"		: null, // Hashtable
			"transportTimeout"			: 300000, // Integer
			
			"hasMultiAccess"			: false, // Boolean
			"widgetExtensions"			: null, // Array
			"featureTable"				: null, // Hashtable
			"accessList"				: null, // Array
			
			"loadingScreenColor"		: "#FFFFFF", // String
			"backgroundImage"			: "", // String
			"foregroundImage"			: "", // String
			"onFirstLaunch"				: false, // Boolean
			"onLocalPageLoad"			: false, // Boolean
			"onRemotePageLoad"			: false, // Boolean
			"transitionType"			: 0, // Integer
			"transitionDuration"		: 0, // Integer
			"transitionDirection"		: 0, // Integer

			"disableAllCache"			: false, // Boolean
			"aggressiveCacheAge"		: 2592000, // Integer
			"maxCacheSizeTotal"			: 1024, // Integer
			"maxCacheSizeItem"			: 128, // Integer
			"maxStandardCacheAge"		: 2592000, // Integer
			
			"runOnStartUp"				: false, // Boolean
			"allowInvokeParams"			: false, // Boolean
			"backgroundSource"			: "", // String
			"foregroundSource"			: "http://www.google.com/", // String
			"debugEnabled"				: false, // Boolean

			"name":"value"
		};
		
		public function Globals()
		{
		}
	}
}
