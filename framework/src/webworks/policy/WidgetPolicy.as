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
package webworks.policy
{
	
	import flash.utils.Dictionary;
	
	import webworks.access.Access;
	import webworks.uri.URI;
	import webworks.util.Utilities;
	public class WidgetPolicy
	{
		private static var _authorityCollection : Dictionary;
		private static var _localAccess : Access;    
		
		private static var _instance:WidgetPolicy = null;
		
		public function WidgetPolicy(blocker:SingletonEnforcer)
		{
			if (blocker != null)
			{			
				//TODO: implement function
			}
			else
			{
				throw new Error("Error: Instantiation failed: Use WidgetPolicy.instance");
			}						
		}
		
		public static function get instance():WidgetPolicy 
		{
			if ( _instance == null )
				_instance = new WidgetPolicy(new SingletonEnforcer());
			else
			{
				_authorityCollection = null;
				_localAccess = null;
			}
			return _instance;
		}
		
		public function getElement(request:String, accessList:Array):Access {
			var requestURI:URI  = new URI(request);//.trim());            
			// require absolute URI's
			if (requestURI.isAbsolute()) {
				
				// Initialize authority collection if it does not yet exist
				initializeAuthCollection(accessList);
				
				// Start with the full authority path and check if a WidgetAccess set exists for that path
				// If it does not exist, remove the first section of the authority path and try again
				var authString : String = getAuthorityFromString(request);
				var schemeString : String = getSchemeFromString(request);                                
				
				// Check for an authority string that has an existing key
				// Special case: Allow file, and local  protocol to proceed without an authority
				authString = authorityCheck(schemeString, authString);
				if (authString == "" && !( schemeString == "file" || schemeString == "local")){
					return null;
				} 
				
				var folderAccess : WidgetWebFolderAccess;
				var fetchedAccess : Access;
				
				// Retrieve WidgetAccess set for the specified authority
				folderAccess = _authorityCollection[schemeString + "://" +authString];
				
				// Special case: no access element was found for a file protocol request.  
				// This is added since file protocol was allowed through the above check
				if(schemeString == "file" && folderAccess == null){
					return null;
				}
				
				// If no access element is found with local URI, use local access for this request
				if ( schemeString == "local" && folderAccess == null ) {
					return _localAccess;
				}
				
				if (requestURI.path == "")
					fetchedAccess = folderAccess.getWidgetAccess("/");
				else
					fetchedAccess = folderAccess.getWidgetAccess(requestURI.path + parseNull(requestURI.query));
				
				var failedToFindAccess : Boolean = false;
				// Make sure we've got the right one
				while(fetchedAccess == null || !isMatch(fetchedAccess, requestURI)){                        
					
					// There was an auth url that matched, but didnt match the folder structure
					// Try the next level up                                                
					authString = authString.substring(authString.indexOf('.') + 1);
					
					// Check for an authority string that has an existing key
					authString = authorityCheck(schemeString, authString);
					if (authString == ""){
						failedToFindAccess = true;
						break;
					}
					
					// Retrieve WidgetAccess set for the specified authority                        
					folderAccess = _authorityCollection[schemeString + "://" +authString];   
					
					// Special case: no access element was found for a file protocol request.  
					// This is added since file protocol was allowed through the above check
					if( schemeString == "file" && folderAccess == null){
						return null;
					}
					
					fetchedAccess = folderAccess.getWidgetAccess( requestURI.path + parseNull( requestURI.query ) );
					
				}
				if(!failedToFindAccess){
					return fetchedAccess;   
				}
				else if ( isMatch(_localAccess, requestURI)) {
					//if we cannot find a more specific access for this local URI, use local access
					return _localAccess;
				}
			}
			return null;
		}
				
		private function isMatch(access : Access, toMatchURI : URI) : Boolean {
			// Look for local first
			if ( access.isLocal() ) {
  			    if ( Utilities.isLocalURI(toMatchURI) || Utilities.isFileURI(toMatchURI)) {
				    //local access always allowed
				    return true;
			    }
				else {
					return false;
				}
			}
			// Check for data url
			else if (Utilities.isDataURI(toMatchURI)) {
				// data urls are allowed
				return true;
			}
			
			// Based on widgets 1.0 (access control)
			// http://www.w3.org/TR/2009/WD-widgets-access-20090618/#rfc3987        
			var referenceURI : URI = new URI(access.getURI());
			var allowSub : Boolean = access.allowSubDomain();
			
			// Start comparison based on widget spec.
			// 1. Compare scheme
			if (referenceURI.scheme.toLowerCase() != toMatchURI.scheme.toLowerCase() ) {
				return false;
			}
			// 2. Compare host - if subdoman is false, host must match exactly
			// (referenceURI MUST HAVE host specified - not null.)
			var refHost : String = referenceURI.authority;
			var matchHost : String = toMatchURI.authority;
			if (matchHost == null) {
				return false;
			}
			if (!allowSub && !(refHost.toLowerCase() == matchHost.toLowerCase())) {
				return false;
			}
			// 3. Compare host - if subdomain is true, check for subdomain or match
			if (allowSub 
				&& !Utilities.endsWith(matchHost.toLowerCase(),"." + refHost.toLowerCase()) 
				&& matchHost.toLowerCase() != refHost.toLowerCase()) {
				return false;
			}
			// 4. Compare port
			var refPort : String = parseNull(referenceURI.port);
			var toMatchPort : String = parseNull(toMatchURI.port);
			if (refPort != toMatchPort) {
				return false;
			}
			// 5.  Compare path+query
			var refPath : String = referenceURI.path +  parseNull(referenceURI.query);
			var toMatchPath : String = toMatchURI.path + parseNull(toMatchURI.query);
			if (!Utilities.startsWith(toMatchPath,refPath)) {
				return false;
			}
			return true;
		}
		
		private function parseNull(toParse : String) : String {
			return toParse == null ? "" : toParse;
		}
		
		/**
		 * Initalizes the collection of authority urls with their proper WidgetAccess elements
		 * @param accessList List of WidgetAccess elements to add into the collection
		 */
		private function initializeAuthCollection(accessList : Array):void{
			
			// Initialize collection if it does not yet exist
			if(_authorityCollection == null){
				_authorityCollection = new Dictionary();
				
				// Loop access elements and add them to the authority collection
				for (var i:int = 0 ; i < accessList.length ; i++) {
					var currentAccess : Access = accessList[i];
					var currentURI : URI; 
					
					// Special case: local access does not go into the collection because it has no URI
					if(currentAccess.isLocal()){
						_localAccess = currentAccess;
					}
					else{
						currentURI = new URI(currentAccess.getURI());
						var folderAccess : WidgetWebFolderAccess;
						
						// Check the authority collection to see if the authority item we want already exists
						if(_authorityCollection.hasOwnProperty(currentURI.scheme + "://" + currentURI.authority)){
							folderAccess = _authorityCollection[currentURI.scheme + "://" + currentURI.authority];
						}
						else{                            
							// Create web folder access
							folderAccess = new WidgetWebFolderAccess();
						}
						
						// Add folder path access to the authority item
						folderAccess.addWidgetAccess(currentURI.path, currentAccess);
						_authorityCollection[currentURI.scheme + "://" + currentURI.authority]=folderAccess;
						
					}
				}                    
			}
			
		}
		
		/**
		 * Retrieves the authority portion of a URL string
		 * @param url URL to parse for authority
		 * @return authority URL
		 */
		private function getAuthorityFromString(url : String) : String {
				var uriObject : URI = new URI(url);
				return uriObject.authority;                
		}
		
		/**
		 * Retrieves the scheme portion of a URL string
		 * @param url URL to parse for authority
		 * @return scheme of the URL
		 */
		private function getSchemeFromString(url : String) : String {
				var uriObject : URI = new URI(url);
				return uriObject.scheme;                
		}
		
		/**
		 * Process the given scheme and authority and returns an authority which exists in the authority collection
		 * @param scheme Scheme of the request url
		 * @param authString Authority of the request url
		 * @return Authority which exists in the authority collection
		 */
		private function authorityCheck(scheme : String, authString : String) : String {
			
			var firstPass : Boolean = true;             
			while(!_authorityCollection.hasOwnProperty(scheme + "://" + authString)){ 
				
				// If the authority is empty string, then no access element exists for that subdomain
				// Also, if the auth becomes a top level domain and is not found, then stop as well
				// First pass will allow computer names to be used 
				if(authString == "" || ((authString.indexOf('.') == -1) && !firstPass)){
					return "";
				}
				authString = authString.substring(authString.indexOf('.') + 1);                  
				
				// Set the flag
				if(firstPass){
					firstPass = false;      
				}
			}
			return authString;
		}		
	}
}
internal class SingletonEnforcer {};
