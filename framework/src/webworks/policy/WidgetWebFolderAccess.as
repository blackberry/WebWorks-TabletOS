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
/*
 * WidgetWebFolderAccess.java
 *
 * Research In Motion Limited proprietary and confidential
 * Copyright Research In Motion Limited, 2009-2009
 */

package webworks.policy
{
import flash.utils.Dictionary;

import webworks.access.Access;
import webworks.util.Utilities;

/**
 * Models a searchable collection of WidgetAccess elements
 */
public class WidgetWebFolderAccess {   
    // Folder structure 
    private var _pathCollection : Dictionary;
    
    // Depth of longest file path
    private var _maxPathLength : int;
    
    // Constructor
    // Takes in url of the host
    public function WidgetWebFolderAccess():void {
        // Assign fields
        _maxPathLength = 0;       
        _pathCollection = new Dictionary();
    }
    
    // Adds WidgetElement to the structure by using the folder path as a key
    // Folder path must not include the scheme or the host
    public function addWidgetAccess(folderPath : String, accessElement : Access):void{
        // Trim surrounding slashes for consistency
        // The root "/" is a special case that does not need this trimming
        if(folderPath!="/"){
            folderPath = "/" + trimSurroundingSlashes(folderPath);        
        }
        _pathCollection[folderPath] = accessElement;
        
        // Determine the depth of the path
        _maxPathLength = Math.max(_maxPathLength, determineDepth(folderPath));
    }
    
    
    // Retrieves the access element assigned to the folder path, if it exists
    // Folder path must not include the scheme or the host
    private function fetchWidgetAccess(folderPath : String) : Access {
        var accessElement : Access = _pathCollection[folderPath];
        return accessElement;
    }
    
    // Retrieves the access element assigned to the folder path, if it exists
    // Folder path must not include the scheme or the host
    public function getWidgetAccess(folderPath : String) : Access {     
       
       var depth : int = determineDepth(folderPath);
       return getWidgetAccessRecursively(folderPath, depth);
    }
    
    private function getWidgetAccessRecursively(folderPath : String, pathLength : int) : Access{
        
        // Check folder path if an entry exists for the full path
        if(_pathCollection.hasOwnProperty(folderPath)){
            return fetchWidgetAccess(folderPath);            
        }
        else if(folderPath==""){
            return null;
        }
        else {
            // Truncate the end portion of the path and try again
            var newPathLength : int = Math.min(_maxPathLength, pathLength-1);
            var newPath : String = getPath(folderPath, newPathLength);            
            return getWidgetAccessRecursively(newPath, newPathLength);
        }
    }
    
    // Determines the depth of the given path
    // Folder path must not include the scheme or the host
    private function determineDepth(folderPath : String) : int {        
             
                     
        var depthCount : int = 0;
        
        // Replace all backslashes with forward slash
        folderPath = folderPath.replace('\\', '/');       
        
        // Special case: "/" is the given path
        if(folderPath=="/"){
            return 0;
        }
        
        folderPath = trimSurroundingSlashes(folderPath);
        
        // Count slashes remaining
        while(folderPath.indexOf("/") != -1 ){
            depthCount += 1;
            
            // Add 1 to skip the slash
            folderPath = folderPath.substring(folderPath.indexOf("/") + 1);
        }
        
        // Add one more for the remaining folder
        depthCount += 1;
        
        return depthCount;

    }
    
    // Parse a folder path up to the desired depth
    private function getPath(folderPath : String, desiredDepth : int) : String {
       
        var depthCount : int = 0;
        var builtPath : String = "";
        
        // Special case: Desired depth is 0
        if(desiredDepth == 0){
            return "/";
        }
       
        // Replace all backslashes with forward slash
        folderPath = folderPath.replace('\\', '/');       
                
        folderPath = trimSurroundingSlashes(folderPath);
        
        // Count slashes remaining
        while(depthCount < desiredDepth){
            depthCount += 1;
            
            // Add 1 to skip the slash
            builtPath += "/" + folderPath.substring(0, folderPath.indexOf('/'));
            folderPath = folderPath.substring(folderPath.indexOf('/') + 1);
        }
        
        return builtPath;
          
    }
    
    // Exclude the filename from the path
    private function excludeFilenameFromPath(fullPath : String) : String {
        var folderPath : String = fullPath;
        
        // Replace all backslashes with forward slash
        folderPath = folderPath.replace('\\', '/');               
        
        // root folder
        if(folderPath.lastIndexOf('/') == 0) {
            return "/";
        }
        else if(folderPath.indexOf('/') != -1){
            folderPath = folderPath.substring(0, folderPath.lastIndexOf('/'));
        }
        return folderPath;
    }
    
    // Removes the start and end slashes from the path
    private function trimSurroundingSlashes(path : String) : String {
        
          // Trim starting slash
        if(Utilities.startsWith(path,"/")) {
            path = path.substr(1);
        }        
        
        // Trim ending slash
        if(Utilities.endsWith(path,"/")){
            path = path.substr(0, path.length-1);
        }       
        
        return path;
    }
}



}
