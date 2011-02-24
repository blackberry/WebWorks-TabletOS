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
package webworks
{
	import flash.events.EventDispatcher;
	import flash.events.IEventDispatcher;
	
	import qnx.events.JavaScriptCallbackEvent;
	import qnx.media.QNXStageWebView;
	
	import webworks.config.ConfigData;
	import webworks.extension.IApiExtension;
	import webworks.util.DeviceURL;
	import webworks.util.Utilities;
	import webworks.webkit.WebkitEvent;
	
	
	/**
	 * apply the white list rules and delegate the XHR request to AS API 
	 * 
	*/
	public class FunctionBroker extends EventDispatcher
	{
		public  static const HTTPStatus_200_Okay :int		                 = 200;
		private static const HTTPStatus_400_BadRequest :int                  = 400;
		private static const HTTPStatus_401_Unauthorized :int                = 401;
		private static const HTTPStatus_402_PaymentRequired :int             = 402;
		private static const HTTPStatus_403_Forbidden :int                   = 403;
		private static const HTTPStatus_404_NotFound :int                    = 404;
		private static const HTTPStatus_405_MethodNotAllowed :int            = 405;
		private static const HTTPStatus_406_NotAcceptable :int               = 406;
		private static const HTTPStatus_407_ProxyAuthenticationRequired :int = 407;
		private static const HTTPStatus_408_RequestTimeOut :int              = 408;
		private static const HTTPStatus_409_Conflict :int                    = 409;
		private static const HTTPStatus_410_Gone :int                        = 410;
		private static const HTTPStatus_411_LengthRequired :int              = 411;
		private static const HTTPStatus_412_PreconditionFailed :int          = 412;
		private static const HTTPStatus_413_RequestEntityTooLarge :int       = 413;
		private static const HTTPStatus_414_RequestURLTooLarge :int          = 414;
		private static const HTTPStatus_415_UnsupportedMediaType :int        = 415;
		private static const HTTPStatus_500_ServerError :int                 = 500;
		private static const HTTPStatus_501_NotImplemented :int              = 501;
		private static const HTTPStatus_502_BadGateway :int                  = 502;
		private static const HTTPStatus_503_ServiceUnavailable :int          = 503;
		private static const HTTPStatus_504_GatewayTimeOut :int              = 504;
		private static const HTTPStatus_505_HTTPVersionNotSupported :int     = 505;		
		
		private var webView:QNXStageWebView;
		
		public function FunctionBroker(webview:QNXStageWebView, target:IEventDispatcher=null)
		{
			webView = webview;
			super(target);
		}
		
		//parse the url, check the feature available and invoke the feature
		public function valid(url:String):int
		{			
			if ( webView == null )
				return HTTPStatus_500_ServerError;
			
			if ( url == null || url.length == 0)
				return HTTPStatus_400_BadRequest;
			
			var deviceUrl:DeviceURL = new DeviceURL(url);
			
			if ( !deviceUrl.isDeviceProtocol() )
				return HTTPStatus_400_BadRequest;
			
			//validate the feature
			if ( ConfigData.getInstance().isFeatureAllowed(deviceUrl.featureName, webView.location))
			{
				var extension:IApiExtension = ConfigData.getInstance().getExtension(deviceUrl.featureName);
				if ( extension != null )
					return HTTPStatus_200_Okay;
				else
				{
					trace(deviceUrl.featureName + " is not defined for \"" + url + "\"!");
					return HTTPStatus_501_NotImplemented;
				}
			}
			else
			{
				trace(deviceUrl.featureName + " is not allowed for \"" + url + "\"!");
				return HTTPStatus_403_Forbidden;
			}
		}
		
		//parse the url, check the feature available and invoke the feature
		public function handleXHRRequest(url:String):Object
		{			
			if ( webView == null )
				return null;

			if ( url == null || url.length == 0)
				return null;
			
			var deviceUrl:DeviceURL = new DeviceURL(url);
			
			if ( !deviceUrl.isDeviceProtocol() )
				return null;

			//validate the feature
			if ( ConfigData.getInstance().isFeatureAllowed(deviceUrl.featureName, webView.location))
			{
				var extension:IApiExtension = ConfigData.getInstance().getExtension(deviceUrl.featureName);
				if ( extension != null )
					return extension.invokeFunction(deviceUrl.methodName, deviceUrl.query);
				else
				{
					return null;
				}
			}
			else
			{
				return null;
			}
		}
		
		public static function statusToText(status:int):String
		{
			switch (status)
			{
				case HTTPStatus_200_Okay: return "Okay";

				case HTTPStatus_400_BadRequest : return "Bad Request";
				case HTTPStatus_401_Unauthorized : return "Unauthorized";
				case HTTPStatus_402_PaymentRequired : return "Payment Required";
				case HTTPStatus_403_Forbidden : return "Forbidden";
				case HTTPStatus_404_NotFound : return "Not Found";
				case HTTPStatus_405_MethodNotAllowed : return "Method Not Allowed";
				case HTTPStatus_406_NotAcceptable : return "Not Acceptable";
				case HTTPStatus_407_ProxyAuthenticationRequired : return "Proxy Authentication Required";
				case HTTPStatus_408_RequestTimeOut : return "Request TimeOut";
				case HTTPStatus_409_Conflict : return "Conflict";
				case HTTPStatus_410_Gone : return "Gone";
				case HTTPStatus_411_LengthRequired : return "Length Required"; 
				case HTTPStatus_412_PreconditionFailed : return "Precondition Failed";
				case HTTPStatus_413_RequestEntityTooLarge : return "Request Entity Too Large";
				case HTTPStatus_414_RequestURLTooLarge : return "Request URL Too Large";
				case HTTPStatus_415_UnsupportedMediaType : return "Unsupported Media Type";
				case HTTPStatus_500_ServerError : return "Server Error";
				case HTTPStatus_501_NotImplemented : return "Not Implemented";
				case HTTPStatus_502_BadGateway : return "Bad Gateway";
				case HTTPStatus_503_ServiceUnavailable : return "Service Unavailable";
				case HTTPStatus_504_GatewayTimeOut : return "Gateway TimeOut";
				case HTTPStatus_505_HTTPVersionNotSupported : return "HTTP Version Not Supported";					

				default:
					return "Unknown error";
					
			}	
		}
	}	
}
