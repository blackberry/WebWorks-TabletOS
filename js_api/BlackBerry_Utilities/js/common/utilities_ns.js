(function () {
	//We will not attach ourselves if the blackberry namespace doesn't exist
	if(!this.blackberry) {
		return;
	}
	
	var bb = this.blackberry;
	
	bb.Utilities = new function() {
		this.Utils = new function() {
			
			this.parseUrl = function (theUrl) {
				
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
				return {
					get host() { return uri["host"]; },
					get port() { return parseInt(uri["port"]); },
						
					getUrlParameter : function(key) {
						return uri.queryKey[key];
					},
					
					getUrlParameterByIndex : function(index) {
						return uri.queryArray[index];
					}
				};
			}
		}();
	}();
})();
