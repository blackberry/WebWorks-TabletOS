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
package webworks.util
{
	import qnx.media.QNXStageWebView;
	
	import webworks.uri.URI;

	public class Utilities
	{
		private static var LOCAL_PROTOCOL : String              = "local:///";
		private static var FILE_PROTOCOL : String 				= "file://";
		private static var HTTP_PROTOCOL : String               = "http://";
		private static var HTTPS_PROTOCOL : String              = "https://";	
		private static var SLASH_FWD : String                   = "/";
		private static var SLASH_BACK : String                  = "\\";
		private static var ABSOLUTE_URI_MARKER : String         = "://";
		private static var DATA_URI : String                    = "data:";
		
		//-----------------------------------------------------------------------------
		//
		//  Methods
		//
		//-----------------------------------------------------------------------------
		public static function hasProtocol(url:String):Boolean
		{
			if (url.search("http:/") != -1) return true;
			if (url.search("https:/") != -1) return true;
			if (url.search("ftp:/") != -1) return true;
			if (url.search("file:/") != -1) return true;
			return false;
		}	
		
			
			
		/**
		 * Parses a path to determine if it is a local resource; if so appends the 'cod' protocol.
		 * @param path a path to a particular resource
		 * @return a localized path if no protocol was previously specified (e.g. file, cod, http)
		 */
		public static function getLocalPath(path : String) : String
		{
			// if the path is already fully qualified, leave it alone
			if (path.indexOf(ABSOLUTE_URI_MARKER) != -1) {
				return path;
			}
			
			// relative path - default to local
			var prefix : String = LOCAL_PROTOCOL;
			if ( path[0] != SLASH_FWD && path[0] != SLASH_BACK) {
				prefix += SLASH_FWD;
			}
			return prefix + path;
		}
		
		public static function isLocalURI(uri : URI) : Boolean {
			return uri.scheme != null && LOCAL_PROTOCOL.indexOf(uri.scheme) != -1;
		}
		
		public static function isFileURI(uri : URI) : Boolean {
			return uri.scheme != null && FILE_PROTOCOL.indexOf(uri.scheme) != -1;
		}
		
		public static function isHttpURI(uri : URI) : Boolean {
			return uri.scheme != null && HTTP_PROTOCOL.indexOf(uri.scheme) != -1;
		}
		
		public static function isHttpsURI(uri : URI) : Boolean {
			return uri.scheme != null && HTTPS_PROTOCOL.indexOf(uri.scheme) != -1;
		}
		// Checks if the specified uri starts with 'data:'
		public static function isDataURI(uri : URI) : Boolean {
			return uri.scheme != null && DATA_URI.indexOf(uri.scheme) != -1;
		}
		
		public static function endsWith(a : String , b : String) : Boolean
		{
			var bsize : int = b.length;
			var asize : int = a.length;
			var c : String = a.substr(asize - bsize);
			return c == b;
		}
		
		public static function startsWith(a : String , b : String) : Boolean
		{
			var bsize : int = b.length;
			var asize : int = a.length;
			if (asize>=bsize)
			{
			var c : String = b.substr(0,bsize);
			return c == b;
			}
			else return false;
		}
		
		//alert the msg in QNXStageWebView
		public static function alert(msg:String, webView:QNXStageWebView):void
		{
			if ( webView != null )
				webView.executeJavaScript("alert(\"" + msg + " \");");
		}
	}		
}
