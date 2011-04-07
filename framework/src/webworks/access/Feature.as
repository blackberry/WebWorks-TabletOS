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
package webworks.access {
	public class Feature {
		
		//-------------------------------------
		//  properties
		//-------------------------------------
		private var _id:String;
		private var _isRequired:Boolean;
		private var _version:String;
		private var _dependentFeatures:Array;
		
		public function Feature(id:String, isRequired:Boolean, version:String, dependentFeatures:Array)
		{
			super();
			
			_id = id;
			_isRequired = isRequired;
			_version = version;
			_dependentFeatures = dependentFeatures;
		}
		
		//-----------------------------------------------------------------------------
		//
		//  Methods
		//
		//-----------------------------------------------------------------------------

		public function getID():String {
			return _id;
		}
		
		public function isRequired():Boolean {
			return _isRequired;
		}

		public function getVersion():String {
			return _version;
		}

		public function getDependentFeatures():Array {
			return _dependentFeatures;
		}
		
		public function isEqual(feature:Feature):Boolean
		{
			return _id == feature.getID();
		}
	}
}
