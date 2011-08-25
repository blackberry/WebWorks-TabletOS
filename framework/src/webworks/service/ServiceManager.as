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

package webworks.service
{
	import flash.utils.Dictionary;
	
	import webworks.service.blob.BlobManager;
	import webworks.util.DeviceURL;
	import webworks.webkit.WebkitControl;
	
	public class ServiceManager
	{
		private var _services:Dictionary;
		
		public function ServiceManager(webkitControl:WebkitControl)
		{
			_services = new Dictionary();
			_services[BlobManager.NAME] = new BlobManager(webkitControl);
		}
		
		public function getService(serviceName:String): IWebWorksService 
		{
			return _services[serviceName];
		}
		
		public function getEndPointForMethod(serviceUrl:String):IWebWorksService 
		{
			//The URL request comes in the form authority/request_path (ie: services/blob/slice)
			//Our service keys be the feature name of the requested URL (ie: services/blob)
			//Convert it to a DeviceURL to take advantage of the built-in parsing
			var url:DeviceURL = new DeviceURL(serviceUrl);
			return getService(url.featureName);
		}
	}
}