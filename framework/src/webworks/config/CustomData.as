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

	import blackberry.Application.Application;
	import blackberry.applicationEvents.ApplicationEvent;
	import blackberry.invoke.Invoke;
	import blackberry.system.System;
	import blackberry.system.event.SystemEvents;
	import blackberry.ui.dialog.Dialog;
	
	import webworks.access.Access;
	import webworks.access.Feature;
	
	/* UNCOMMENT HERE
	import webworks.extension.blackberry.Invoke.Invoke;
	import webworks.extension.blackberry.Application.Application;
	import webworks.extension.blackberry.System; 
	*/
	public class CustomData
	{ 
		// constants
		public static const values:Object = {
			
			"configXML" : "config.xml",
			//"content" : "http://atg05-yyz.rim.net/WebWork_Playbook/blackberry/system/system_default.htm",//"http://atg05-yyz.rim.net/WebWork_Playbook/blackberry/invoke/invoke_default.htm",//"http://atg05-yyz.rim.net/lei/utils_default.htm", //"http://atg05-yyz.rim.net/yui/", //"http://atg05-yyz.rim.net/webapi/blackberry/app/default.htm",//"http://atg05-yyz.rim.net/yui/bak_Nov23/index.htm", //"http://atg05-yyz.rim.net/yui/bak_Dec13/", //"http://dl.dropbox.com/u/6464031/JasonIndex.html",//"http://atg05-yyz.rim.net/yui/index.htm", //"http://dl.dropbox.com/u/6464031/JasonIndex.html",//"index.html", //"http://www.google.com",

			//"content" : "http://atg05-yyz.rim.net/yui/xhr.html",
			"content" : "local:///index.html",
			"author" : "Lev",
			"authorEmail": "lev@lev.com",
			"authorURL" : "www.lev.com",
			"copyright": "Levy copy",
			"description" : "My app",
			"id" : "888",
			"license":"balh",
			"licenseURL" : "blah.com",
			"version" : "1.0",			
			"name" : "invoked3.1.5step1",
			"foregroundSource" : "http://www.google.com",
			"icon" : "icon.jpg",
			"hasMultiAccess"			: true, // Boolean
			"disableAllCache" :  true,
			"customHeaders"	: {"MyCustom": "XXXYYYZZZ"}, // Hashtable
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
							"blackberry.invoke",
							true,
							"1.0.0.0",
							null),
						new Feature(
							"blackberry.system",
							true,
							"1.0.0.0",
							null),
						new Feature(
							"blackberry.app", 
							true,
							"1.0.0.0",
							null),
						new Feature(
							"blackberry.app.event",
							true,
							"1.0.0.0",
							null),
						new Feature(
							"blackberry.system.event",
							true,
							"1.0.0.0",
							null),
						new Feature(
							"blackberry.ui.dialog",
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
							"blackberry.invoke",
							true,
							"1.0.0.0",
							null),
						new Feature(
							"blackberry.system",
							true,
							"1.0.0.0",
							null),
						new Feature(
							"blackberry.app", 
							true,
							"1.0.0.0",
							null),
						new Feature(
							"blackberry.app.event",
							true,
							"1.0.0.0",
							null),
						new Feature(
							"blackberry.system.event",
							true,
							"1.0.0.0",
							null),
						new Feature(
							"blackberry.ui.dialog",
							true,
							"1.0.0.0",
							null)
						
					)
				)
			),
			
			/* UNCOMMENT HERE
			"widgetExtensions" : new Array( {"class" : new Invoke(), 
				"requiredJSFiles" : new Array("js/a_constants.js", "js/b_blackberry_ns.js","js/c_xhr.js","js/d_app_dispatcher.js","js/e_app_ns.js", "js/utilities_ns.js", "js/system_dispatcher.js", "js/system_ns.js")},
				{"class" : new Application(), 
					"requiredJSFiles" : new Array("js/a_constants.js", "js/b_blackberry_ns.js","js/c_xhr.js","js/d_app_dispatcher.js","js/e_app_ns.js", "js/utilities_ns.js", "js/system_dispatcher.js", "js/system_ns.js")},
				{"class" : new System(), 
					"requiredJSFiles" : new Array("js/a_constants.js", "js/b_blackberry_ns.js","js/c_xhr.js","js/d_app_dispatcher.js","js/e_app_ns.js", "js/utilities_ns.js", "js/system_dispatcher.js", "js/system_ns.js")}
				
			),*/
			"widgetExtensions" : new Array(
//			{"class" : new Invoke(), 
//				"requiredJSFiles" : new Array("js/constants.js", "js/blackberry_ns.js","js/xhr.js","js/invoke_dispatcher.js","js/invoke_ns.js")}
//			,
//			{"class" : new ApplicationEvent(), 
//				"requiredJSFiles" : new Array("js/constants.js", "js/blackberry_ns.js","js/xhr.js","js/events_ns.js","js/app_event_dispatcher.js","js/app_event_ns.js")}
//			
//			,
//			{"class" : new Dialog(), 
//				"requiredJSFiles" : new Array("js/constants.js", "js/blackberry_ns.js","js/xhr.js","js/events_ns.js","js/dialog_dispatcher.js","js/dialog_ns.js")}
//			
//			,
//			{"class" : new SystemEvents(), 
//						"requiredJSFiles" : new Array("js/constants.js", "js/blackberry_ns.js","js/xhr.js","js/events_ns.js","js/system_event_dispatcher.js","js/system_event_ns.js")}
					
				
				
			//limited common 	
//				{"class" : new Invoke(), 
//									"requiredJSFiles" : new Array("js/constants.js", "js/blackberry_ns.js","js/xhr.js","js/invoke_dispatcher.js","js/invoke_ns.js")}
//				,
//				{"class" : new Application(), 
//					"requiredJSFiles" : new Array("js/app_dispatcher.js","js/app_ns.js", "js/utilities_ns.js")}
//				,
//				{"class" : new System(), 
//					"requiredJSFiles" : new Array( "js/system_dispatcher_temp.js", "js/system_ns_temp.js")}
//				,
//				{"class" : new ApplicationEvent(), 
//					"requiredJSFiles" : new Array("js/events_ns.js","js/app_event_dispatcher.js","js/app_event_ns.js")}
//				
//				,
//				{"class" : new Dialog(), 
//					"requiredJSFiles" : new Array("js/dialog_dispatcher.js","js/dialog_ns.js")}
//				
//				,
//				{"class" : new SystemEvents(), 
//							"requiredJSFiles" : new Array("js/system_event_dispatcher.js","js/system_event_ns.js")}
				
				
//				
			),
			"name" : "value"
		}
	}

}
