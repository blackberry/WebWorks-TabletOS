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


import webworks.access.Access;
import webworks.access.Feature;

import blackberry.system.System;

   public class CustomData 
   { 
// constants
        public static const values:Object = { 

        "configXML" : "config.xml",
        "content" : "index.html", //"http://www.google.com",
        "author" : "Lev",
        "name" : "invoked3.1.5step1",
        "foregroundSource" : "http://www.google.com",
        "icon" : "icon.jpg",
        "disableAllCache" :  true,
        "accessList" : new Array(
                new Access(
                    "http://atg05-yyz.rim.net/yui_unittest/dev/",
                    true,
					new Array(
						new Feature(
							"Screen",
							true,
							"",
							null),
						new Feature(
							"blackberry.invoke",
							true,
							"1.0.0.0",
							null),
						new Feature(
							"blackberry.ui.dialog",
							true,
							"1.0.0.0",
							null),
						new Feature(
							"blackberry.system",
							true,
							"1.0.0.0",
							null)
					)
                )
            ,
                new Access(
                    "http://google.com",
                    true,
                    null
                )
            ,
                new Access(
                    "http://wikipedia.org",
                    true,
                    null
                )
            ,
                new Access(
                    "file:///store/home/user",
                    false,
                    null
                )
            ,
                new Access(
                    ConfigConstants.WIDGET_LOCAL_DOMAIN,
                    true,
                    new Array(
                        new Feature(
                            "Screen",
                            true,
                            "",
                            null),
                        new Feature(
                            "blackberry.system",
                            true,
                            "1.0.0.0",
                            null)
                    )
                )
            ,
                new Access(
                    "about:blank",
                    false,
                    null
                )
            ,
                new Access(
                    "http://google.ca",
                    true,
                    null
                )
            ,
                new Access(
                    "http://rim.net",
                    true,
                    new Array(
                        new Feature(
                            "Screen",
                            true,
                            "",
                            null),
                        new Feature(
                            "blackberry.system",
                            true,
                            "1.0.0.0",
                            null)
                    )
                )
            ),
		
	"widgetExtensions" : new Array( {"class" : new System(), 
		                             "requiredJSFiles" : new Array("js/constants.js",
																	"js/blackberry_ns.js",
																	"js/direct.js", 
									 								"js/system_dispatcher.js",
																	"js/system_ns.js")}),
    "name" : "value"
        }
    }
}
