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
package webworks.access {
	import webworks.config.ConfigConstants;

	public class Access {
		
		//-------------------------------------
		//  properties
		//-------------------------------------
		private var _uri:String;
		private var _allowSubDomain:Boolean;
		private var _features:Array;
		private var _isLocal:Boolean;
		
		public function Access(uri:String, allowSubDomain:Boolean, features:Array)
		{
			super();
			
			_allowSubDomain = allowSubDomain;
			_features = features;
			
			if (uri == ConfigConstants.WIDGET_LOCAL_DOMAIN) {
				_isLocal = true;
				_uri = "";
			} else {
				_isLocal = false;
				_uri = uri;
			}
		}
		
		//-----------------------------------------------------------------------------
		//
		//  Methods
		//
		//-----------------------------------------------------------------------------

		public function getURI():String {
			return _uri;
		}
		
		public function allowSubDomain():Boolean {
			return _allowSubDomain;
		}

		public function getFeatures():Array {
			return _features;
		}

		public function isLocal():Boolean {
			return _isLocal;
		}
	}
}
