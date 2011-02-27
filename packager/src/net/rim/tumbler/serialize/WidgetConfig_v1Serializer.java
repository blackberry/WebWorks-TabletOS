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
package net.rim.tumbler.serialize;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.Vector;
import java.util.regex.Pattern;

import net.rim.tumbler.config.WidgetAccess;
import net.rim.tumbler.config.WidgetConfig;
import net.rim.tumbler.config.WidgetFeature;
import net.rim.tumbler.exception.ValidationException;
import net.rim.tumbler.file.TemplateFile;

public class WidgetConfig_v1Serializer implements WidgetConfigSerializer {
    
    private static final String         EOL = System.getProperty("line.separator");
    private static final String         TAB = "    ";
    private static final String         AUTOGEN_HEADER =
        "package webworks.config"+EOL+
        "{"+EOL+
        "import webworks.access.Access;"+EOL+
        "import webworks.access.Feature;"+EOL+
        "import webworks.config.ConfigConstants;"+EOL;    	

    private StringBuffer        _buffer;
    private Map<String, String> _memberMap;
    private WidgetConfig        _widgetConfig;
    private Map<String, Vector<String>> _entryClassTable;
    
    public WidgetConfig_v1Serializer(WidgetConfig widgetConfig, Map<String, Vector<String>> entryClassTable) {
        _buffer = new StringBuffer();
        _memberMap = new HashMap<String, String>();
        _entryClassTable = entryClassTable;
        
        // populate the basic members
        // MKS: special characters for Java source file: escape /, ", ' for Java source 
        _memberMap.put("id",                       widgetConfig.getID());
        _memberMap.put("name",                     widgetConfig.getName());
        _memberMap.put("description",              widgetConfig.getDescription());
        _memberMap.put("content",                  widgetConfig.getContent());
        _memberMap.put("configXML",                widgetConfig.getConfigXML());
        _memberMap.put("backButtonBehaviour",      widgetConfig.getBackButtonBehaviour());
        _memberMap.put("contentType",              widgetConfig.getContentType());
        _memberMap.put("contentCharset",           widgetConfig.getContentCharSet());
        _memberMap.put("license",                  widgetConfig.getLicense());
        _memberMap.put("licenseURL",               widgetConfig.getLicenseURL());
        _memberMap.put("author",                   widgetConfig.getAuthor());
        _memberMap.put("copyright",                widgetConfig.getCopyright());
        _memberMap.put("authorEmail",              widgetConfig.getAuthorEmail());
        _memberMap.put("loadingScreenColor",       widgetConfig.getLoadingScreenColour());
        _memberMap.put("backgroundImage",       	widgetConfig.getBackgroundImage());
        _memberMap.put("foregroundImage",       	widgetConfig.getForegroundImage());
        _memberMap.put("authorURL",                widgetConfig.getAuthorURL());
        _memberMap.put("backgroundSource",         widgetConfig.getBackgroundSource());
        _memberMap.put("foregroundSource",         widgetConfig.getForegroundSource());

        
        _widgetConfig = widgetConfig;
    }
    
    public byte[] serialize() throws ValidationException {
        _buffer.append(TemplateFile.refactor(AUTOGEN_HEADER));
        
        // add import for entryClass
        for (String entryClass : _entryClassTable.keySet()) {
            _buffer.append("import " + entryClass + ";" + EOL);
        }
        
        _buffer.append(TAB + "public class CustomData" + EOL);
        _buffer.append(TAB + "{" + EOL);
        _buffer.append(TAB + "// constants" + EOL);
        _buffer.append(TAB + TAB + "public static const values:Object = {" + EOL);
        
        Set<String> members = _memberMap.keySet();
        
        // iterate memberMap
        for( String member : members ) {
            String value = _memberMap.get(member);
            if (value != null) {
                _buffer.append(makeLine("\""+ member + "\" : \"" + escapeSpecialCharacterForJavaSource(value) + "\",", 0));
            }
        }
        
        // * present
        if (_widgetConfig.allowMultiAccess()) {
            _buffer.append(makeLine("\"hasMultiAccess\" : true,",0));
        }
       
        // add icons
        if (_widgetConfig.getIconSrc().size() > 0) {
            _buffer.append(makeLine("\"icon\" : \"" + _widgetConfig.getIconSrc().firstElement() + "\",", 0));
            if (_widgetConfig.getHoverIconSrc().size() > 0) {
                _buffer.append(makeLine("\"iconHover\" : \"" + _widgetConfig.getHoverIconSrc().firstElement() + "\",", 0));            }
        }
        
        // add custom headers
        if (_widgetConfig.getCustomHeaders().size() > 0)
        {
            _buffer.append(makeLine("\"customHeaders\" : ", 0));
            _buffer.append(makeLine("{", 0));
	        boolean first=true;
            for( String key : _widgetConfig.getCustomHeaders().keySet()) {
	        	if (!first) _buffer.append(",");
	            _buffer.append(makeLine("\"" + key + "\" : \"" + escapeSpecialCharacterForJavaSource(_widgetConfig.getCustomHeaders().get(key)) + "\"", 1));
            }
	        _buffer.append(makeLine("},", 0));
        }
        // set navigation mode
        if (_widgetConfig.getNavigationMode()) {
            _buffer.append(makeLine("\"navigationMode\" :  true,",0));
        }

        // add LoadingScreen configuration
        _buffer.append(makeLine("\"onFirstLaunch\" : "+_widgetConfig.getFirstPageLoad()+",",0));
        _buffer.append(makeLine("\"onRemotePageLoad\" : "+_widgetConfig.getRemotePageLoad()+",",0));
        _buffer.append(makeLine("\"onLocalPageLoad\" : "+_widgetConfig.getLocalPageLoad()+",",0));
        
        // add TransitionEffect configuration
        if (_widgetConfig.getTransitionType() != null) {
            _buffer.append(makeLine("\"transitionType\" : "+_widgetConfig.getTransitionType()+",",0));
           
            if (_widgetConfig.getTransitionDuration() >= 0) {
                _buffer.append(makeLine("\"transitionDuration\" : "+_widgetConfig.getTransitionDuration()+",",0));
            }
            
            if (_widgetConfig.getTransitionDirection() != null) {
                _buffer.append(makeLine("\"transitionDirection\" : "+_widgetConfig.getTransitionDirection()+",",0));
            }            
        }
        
        // add cache options
        if (_widgetConfig.isCacheEnabled() != null) {
            _buffer.append(makeLine("\"disableAllCache\" :  true,",0));
        }
        if (_widgetConfig.getAggressiveCacheAge() != null) {
            // Enable aggressive caching if applicable
            _buffer.append(makeLine("\"aggressiveCacheAge\" : " + _widgetConfig.getAggressiveCacheAge() + ",",0));
        }        
        if (_widgetConfig.getMaxCacheSize() != null) {
            _buffer.append(makeLine("\"maxCacheSizeTotal\" : " + _widgetConfig.getMaxCacheSize() + ",",0));
        }
        if (_widgetConfig.getMaxCacheItemSize() != null) {
            _buffer.append(makeLine("\"maxCacheSizeItem\" : " + _widgetConfig.getMaxCacheItemSize() + ",",0));
        }

        if (_widgetConfig.getMaxCacheItemSize() != null) {
            _buffer.append(makeLine("\"maxCacheSizeItem\" : " + _widgetConfig.getMaxCacheItemSize() + ",",0));
            _buffer.append(makeLine("config.setProperty(ConfigConstants.MAXCACHESIZEITEM," + _widgetConfig.getMaxCacheItemSize() + ");", 0));        	
        }
        
        //Debug issue fix ?
        if(_widgetConfig.isDebugEnabled()) {
            _buffer.append(makeLine("\"debugEnabled\" :  true,",0));
        }

        //Auto-Startup options
        if(_widgetConfig.allowInvokeParams()) {
            _buffer.append(makeLine("\"allowInvokeParams\" : " + _widgetConfig.allowInvokeParams() + ",",0));
        }
        
        if(_widgetConfig.isStartupEnabled()) {
            _buffer.append(makeLine("\"runOnStartUp\" : " + _widgetConfig.isStartupEnabled() + ",",0));
        }
/*        
        // Not needed right now.
         
         
        // add 3rd party extensions
        for (int j = 0; j < _widgetConfig.getExtensionClasses().size(); j++) {
            String extensionClass = _widgetConfig.getExtensionClasses().elementAt(j);
            _buffer.append(makeLine(
                    "_widgetExtensions.addElement(new " + extensionClass + "());", 0));
            
        }
        
        // add transport
        if (_widgetConfig.getTransportTimeout() >= 0) {
            _buffer.append(makeLine("config.setProperty(ConfigConstants.TRANSPORTTIMEOUT," + _widgetConfig.getTransportTimeout() + ");", 0));        	
        }
        if (_widgetConfig.getTransportOrder() != null) {
            _buffer.append(makeLine(
                    "_preferredTransports = new int[]{",0));
            for(int i=0; i<_widgetConfig.getTransportOrder().length; i++) {
                String transport = _widgetConfig.getTransportOrder()[i];
                if (i+1 != _widgetConfig.getTransportOrder().length) {
                    transport += ",";
                }
                _buffer.append(makeLine(transport, 1));
            }
            _buffer.append(makeLine("};", 0));
        }*/
        
        // add access/features
        if (_widgetConfig.getAccessTable().size() > 0) {
            String line;
            _buffer.append(makeLine("\"accessList\" : new Array(", 0));
            int i=0;
            int keySetSize = _widgetConfig.getAccessTable().keySet().size();
            for (WidgetAccess key : _widgetConfig.getAccessTable().keySet()) {
                String uri = key.getURI().toString();
                if (uri.equals("WidgetConfig.WIDGET_LOCAL_DOMAIN")) {
                    line = "ConfigConstants.WIDGET_LOCAL_DOMAIN,";
                } else {
                    line = "\"" + uri + "\"" + ",";
                }
                
                _buffer.append(makeLine("new Access(", 2));
                _buffer.append(makeLine(line, 3));
                line = (new Boolean(key.allowSubDomain())).toString() + ",";
                _buffer.append(makeLine(line, 3));
                Vector<?> wfList = (Vector<?>)_widgetConfig.getAccessTable().get(key);
                if (wfList.size()>0)
                {
                _buffer.append(makeLine("new Array(", 3));
                
                for (int j = 0; j < wfList.size(); j++) {
                    WidgetFeature wf = (WidgetFeature) wfList.get(j);
                    _buffer.append(makeLine("new Feature(", 4));
                    line = "\"" + wf.getID() + "\"" + ",";
                    _buffer.append(makeLine(line, 5));
                    line = (new Boolean(wf.isRequired())).toString() + ",";
                    _buffer.append(makeLine(line, 5));
                    line = "\"" + wf.getVersion() + "\"" + ",";
                    _buffer.append(makeLine(line, 5));
                    line = "null)";
                    if (j+1 != wfList.size()) {
                        line += ",";
                    }
                    _buffer.append(makeLine(line, 5));
                }
                _buffer.append(makeLine(")", 3));
                }
                else
                {
                    _buffer.append(makeLine("null",3));
                }
                _buffer.append(makeLine(")", 2));
                if (i+1 != keySetSize) {                
                    _buffer.append(makeLine(",", 1));
                }
                i++;
            }
        }  
        _buffer.append(makeLine("),", 1));
        
        _buffer.append(EOL + TAB + TAB + "\"widgetExtensions\" : new Array(");
        boolean first = true;
        for (String entryClass : _entryClassTable.keySet()) {
            if (!first) {
                _buffer.append(",");
            } else {
                first = false;
            }
            _buffer.append(EOL + TAB + TAB + TAB + "{\"class\" : new " + entryClass + "(),");
            _buffer.append(EOL + TAB + TAB + TAB + "\"requiredJSFiles\" : new Array(");

            boolean innerFirst = true;
            for (String jsPathname : _entryClassTable.get(entryClass)) {
                if (!innerFirst) {
                    _buffer.append(",");
                } else {
                    innerFirst = false;
                }
                _buffer.append(EOL + TAB + TAB + TAB + TAB + "\"" + jsPathname.replace('\\', '/') + "\"");
            }

            _buffer.append(")}");
        }
        _buffer.append(EOL + TAB + TAB + TAB + "),");
        
        _buffer.append(EOL + TAB + "\"name\" : \"value\"" + EOL);
        _buffer.append(EOL + TAB + TAB + "}" + EOL + TAB + "}" + EOL + "}");
        return _buffer.toString().getBytes();
    }
    
    private String makeLine(String toAdd, int level) {
        String result = EOL + TAB + TAB;
        for(int i=0; i<level; i++) {
            result += TAB;
        }
        return result + toAdd;
    }
    
    private String escapeSpecialCharacterForJavaSource(String s) {
        // process escaped characters
        // " -> \\\\\"
        // ' -> \\\\\'
        // \ -> \\\\\\\\
        // NOTE: \\\\ (4 SLASHES) stand for 1 \ (SLASH)
        
        if (s == null) return null;
        String ret = 
            s.replaceAll(Pattern.quote("\\"), "\\\\\\\\")
             .replaceAll(Pattern.quote("\""), "\\\\\"")
             .replaceAll(Pattern.quote("\'"), "\\\\\'");
        return ret;
    }    
}
