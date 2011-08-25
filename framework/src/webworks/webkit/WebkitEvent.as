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
package webworks.webkit
{
	import flash.events.Event;
    import qnx.events.WebViewEvent;
	
	public class WebkitEvent extends Event
	{
		public static const TAB_ACTIVE:String				= "tabActiveEvent";
		public static const TAB_INACTIVE:String 			= "tabInactiveEvent";
		public static const TAB_LOAD_COMPLETE:String 		= "tabLoadCompleteEvent";
		public static const TAB_LOAD_ERROR:String 			= "tabLoadErrorEvent";
		public static const TAB_LOCATION_CHANGED:String 	= "tabLocationChangedEvent";
		public static const TAB_LOCATION_CHANGING:String	= "tabLocationChangingEvent";
		public static const TAB_PROGRESS_UPDATE:String 		= "tabProgressUpdateEvent";
		public static const TAB_SNAPSHOT_UPDATE:String 		= "tabSnapshotUpdateEvent";
		public static const TAB_TITLE_UPDATE:String 		= "tabTitleUpdateEvent";
		
		public static const TAB_NETWORKRESOURCEREQUESTED:String = "tabNetworkResourceRequested";
		public static const TAB_UNKNOWNPROTOCOL:String      = "tabUnknownProtocol";
		public static const TAB_QNXCALLEXTENSION:String      = "tabQnxCallExtension";
		
//        public static const HTML_BROWSER_CREATE_FAILED:String 	= HtmlEvent.HTML_BROWSER_CREATE_FAILED;
        public static const WEBVIEW_CREATED:String 			= WebViewEvent.CREATED;
        public static const WEBVIEW_DESTROYED:String 		= WebViewEvent.DESTROYED;
		
		public static const FULL_SCREEN_ENTER:String = "fullScreenEnter";
		public static const FULL_SCREEN_ENTERING:String = "fullScreenEntering";
		public static const FULL_SCREEN_EXIT:String = "fullScreenExit";
		
		
		
		public var data:Object;
		
		public function WebkitEvent(type:String, data:Object = null, bubbles:Boolean = false, cancelable:Boolean = false) 
		{
			super(type, bubbles, cancelable);
			this.data = data;
		}
	}
}
