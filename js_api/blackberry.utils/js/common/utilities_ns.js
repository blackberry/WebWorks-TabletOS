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
(function () {
	
	function Utils(disp) {
		this.constructor.prototype.blobToString = function(blob, encoding)
								{ return disp.blobToString(blob, encoding); };
		this.constructor.prototype.documentToBlob = function(xmlDocument)
								{ return disp.documentToBlob(xmlDocument); };
		this.constructor.prototype.stringToBlob = function(s, encoding)
								{ return disp.stringToBlob(s, encoding); };		
	}
	
	Utils.prototype.parseURL = function (theUrl) {
		/********START IDEA BORROWING*******/
		// parseUri 1.2.2
		// (c) Steven Levithan <stevenlevithan.com>
		// MIT License

		function parseUri (str) {
			var	o   = parseUri.options,
				m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
				uri = {},
				i   = 14;

			while (i--) uri[o.key[i]] = m[i] || "";

			uri[o.q.name] = {};
			uri[o.q.arrayName] = new Array();
			uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
				if ($1) {
					uri[o.q.name][$1] = $2;
					uri[o.q.arrayName].push($2);
				}
			});

			return uri;
		};

		parseUri.options = {
				strictMode: false,
				key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
				q:   {
					name:   "queryKey",
					arrayName:   "queryArray",
					parser: /(?:^|&)([^&=]*)=?([^&]*)/g
				},
				parser: {
					strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
					loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
				}
			};
		/********END IDEA BORROWING*******/
		
		parseUri.strictMode = "strict"; 
		var uri = parseUri(theUrl);
		
		//Add default values for the http/https port if they weren't specified in the URL. The above parser returns undefined. We need the values
		//to be compatible with the BB version of API.
		if (uri["port"]=="") {
			if (uri["protocol"] == "http") uri["port"]="80";
			
			if (uri["protocol"] == "https") uri["port"]="443";
		}
		
		var retVal = {
			getURLParameter : function(key) {
				return uri.queryKey[key];
			},
			
			getURLParameterByIndex : function(index) {
				return uri.queryArray[index];
			}
		};
		
		retVal.__defineGetter__("host", function() { return uri["host"]; });
		retVal.__defineGetter__("port", function() { return parseInt(uri["port"]); });
		
		return retVal;
	};
	
	Utils.prototype.generateUniqueId = function() {
		return Math.floor(Math.random() * Number.MAX_VALUE);
	}
	
	blackberry.Loader.javascriptLoaded("blackberry.utils", Utils);
}());
