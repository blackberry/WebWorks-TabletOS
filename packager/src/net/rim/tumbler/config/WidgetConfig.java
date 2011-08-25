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
package net.rim.tumbler.config;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.Vector;
import java.util.regex.Matcher;
import java.util.regex.MatchResult;
import java.util.regex.Pattern;

import net.rim.tumbler.exception.ValidationException;
import net.rim.tumbler.log.LogType;
import net.rim.tumbler.log.Logger;
import net.rim.tumbler.session.SessionManager;

public class WidgetConfig {
    /**
     * Pre-compiled Pattern for validating and parsing of the version string.
     * Valid version strings are:
     * <pre>
     *     0-999.0-999.0-999
     *     0-999.0-999.0-999.0-999
     * </pre>
     * This Pattern provides a capturing group for each part of the version string.
     * For example, capturing groups for a version string of <code>"4.0.1.96"</code>
     * are "4", "0", "1", and "96".
     */
    private static final Pattern VERSION_PATTERN = Pattern.compile("(\\d{1,3})(?:\\.(\\d{1,3}))(?:\\.(\\d{1,3}))(?:\\.(\\d{1,3}))?$");

    private static final String FILE_CONFIG_XML = "config.xml";    

    private static final String CATEGORY_PREFIX = "core.";

    private static final String NUM_0 = "0";
    private static final String NUM_1 = "1";
    private static final String EMPTY_STRING = "";
    
    private static final char DELIMITER_DOT = '.';
    
    private static final String FILE_EXT_L_ICON = "icon.";
    private static final String FILE_EXT_U_ICON = "Icon.";
    private static final String FILE_EXT_L_PNG = ".png";
    
    private static final String VALIDATION_CONFIGXML_MISSING_VERSION = "VALIDATION_CONFIGXML_MISSING_VERSION";
    private static final String EXCEPTION_INVALID_ICON_FILE_TYPE = "EXCEPTION_INVALID_ICON_FILE_TYPE";
    private static final String EXCEPTION_CONFIGXML_MISSING_WIDGET_NAME = "EXCEPTION_CONFIGXML_MISSING_WIDGET_NAME";
    private static final String PROGRESS_VALIDATING_CONFIG_XML_WIDGET_VERSION = "PROGRESS_VALIDATING_CONFIG_XML_WIDGET_VERSION";
    private static final String EXCEPTION_CONFIGXML_INVALID_VERSION = "EXCEPTION_CONFIGXML_INVALID_VERSION";
    private static final String PROGRESS_VALIDATING_CONFIG_XML_LOADINGSCREEN_COLOR = "PROGRESS_VALIDATING_CONFIG_XML_LOADINGSCREEN_COLOR";
    private static final String EXCEPTION_CONFIGXML_LOADINGSCREEN_COLOUR = "EXCEPTION_CONFIGXML_LOADINGSCREEN_COLOUR";

    private static final String REGEX_COLOR = "^#[A-Fa-f0-9]{6}$";

    private String _content;
    private String _author;
    private String _authorEmail;
    private String _authorURL;
    private String _name;
    private String[] _versionParts; // e.g., {"4","0","1","96"}
    
    private String _loadingScreenColour;
    private String _backgroundImage;
    private String _foregroundImage;
    private boolean _firstPageLoad;
    private boolean _remotePageLoad;
    private boolean _localPageLoad;
    private String _transitionType;
    private int _transitionDuration;
    private String _transitionDirection;
    private String _autoOrientation;
    private String _orientation;
    private String _categoryName; // Application Home Screen Category
    
    private String _copyright;
    private String _description;
    private Vector<String> _hoverIconSrc;
    private Vector<String> _iconSrc;
    private String _id;
    private Map<String, String> _customHeaders;
    private String _backButton;
    private boolean _navigationMode;
    private String _contentType;
    private String _contentCharSet;
    private String _license;
    private String _licenseURL;
    private int _transportTimeout;
    private String[] _transportOrder;
    private String[] _permissions;
    private boolean _multiAccess;
    private String _configXML;
    private Hashtable<WidgetAccess, Vector<WidgetFeature>> _accessTable;
    private Vector<String> _extensionClasses;

    // Cache fields
    private Boolean               _cacheEnabled;
    private Boolean               _aggressivelyCaching;
    private Integer               _aggressiveCacheAge;    
    private Integer               _maxCacheable; 
    private Integer               _maxCacheSize; // Total cache size

    //Auto-Startup Fields
    private boolean 			  _runOnStartup;
    private boolean               _allowInvokeParams;
    private String                _backgroundSource;
    private String                _foregroundSource;
    // debug issue
    private boolean _debugEnabled=false;
    
    public WidgetConfig() {
        // set defaults
        _accessTable = new Hashtable<WidgetAccess, Vector<WidgetFeature>>();
        _hoverIconSrc = new Vector<String>();
        _customHeaders = new HashMap<String, String>();
        _iconSrc = new Vector<String>();
        _configXML = FILE_CONFIG_XML;
        _transportTimeout = -1;
        
        _backgroundImage = null;
        _foregroundImage = null;
        _firstPageLoad = false;
        _remotePageLoad = false;
        _localPageLoad = false;
        _transitionType = null;
        _transitionDuration = -1;
        _transitionDirection = null;
        
        _cacheEnabled = null;
        _aggressivelyCaching = null;
        _aggressiveCacheAge= null;    
        _maxCacheable = null; 
        _maxCacheSize = null; 
        
        _runOnStartup=false;
        _allowInvokeParams=false;
        _backgroundSource=null;
        _foregroundSource=null;
        _permissions=null;
        _debugEnabled = SessionManager.getInstance().debugMode();
    }

    public void validate() {
        if (_versionParts == null || getVersion().length() == 0) {
            Logger.logMessage(LogType.WARNING,
                    VALIDATION_CONFIGXML_MISSING_VERSION);
            setVersionParts(new String[] {NUM_1, NUM_0, NUM_0, NUM_0});
        }
    }

    public String getContent() {
        return _content;
    }

    public String getAuthor() {
        return _author;
    }

    public String getName() {
        return _name;
    }

    /**
     * Returns the version string. (Example: <code>"4.0.1.96"</code>).
     * Only the defined parts are included in the result. As an example,
     * a result for a 2-part version looks like this: <code>"4.0"</code>.
     *
     * @return the version string.
     */
    public String getVersion() {
        return getVersionParts(0);
    }

    /**
     * Returns the specified parts of the version string, starting from
     * the specified index (inclusive). As an example, for a version string
     * of <code>"4.0.1.96"</code> the result of <code>getVersionParts(1)</code>
     * looks like this: <code>"0.1.96"</code>. Returns an empty string if
     * <code>beginIndex</code> is greater than or equal to the value
     * returned by <code>getNumVersionParts()</code>.
     *
     * @param beginIndex the beginning index, inclusive.
     *
     * @return the specified parts of the version string, starting from
     * the specified index (inclusive).
     */
    public String getVersionParts(int beginIndex) {
        return getVersionParts(beginIndex, getNumVersionParts());
    }

    /**
     * Returns the specified parts of the version string, starting from
     * the specified index (inclusive) and extending to the specified end
     * (exclusive). As an example, for a version string of
     * <code>"4.0.1.96"</code> the result of <code>getVersionParts(1,3)</code>
     * looks like this: <code>"0.1"</code>. Returns an empty string if
     * <code>beginIndex</code> is greater than or equal to the value
     * returned by <code>getNumVersionParts()</code>.
     *
     * @param beginIndex the beginning index, inclusive.
     * @param endIndex the ending index, exclusive.
     *
     * @return the specified parts of the version string, starting from
     * the specified index (inclusive).
     */
    public String getVersionParts(int beginIndex, int endIndex) {
        int n = getNumVersionParts();
        if (beginIndex >= n) {
            return EMPTY_STRING;
        } else {
            StringBuilder sb = new StringBuilder();
            int end = Math.min(endIndex, n);
            boolean first = true;
            for (int i = beginIndex; i < end; i++) {
                if (first) {
                    first = false;
                } else {
                    sb.append(DELIMITER_DOT);
                }
                sb.append(_versionParts[i]);
            }
            return sb.toString();
        }
    }

    /**
     * Returns the number of defined parts in the version string.
     * For example, <code>"4.0.1.96"</code> has 4 defined parts, and
     * <code>"4.0"</code> has 2 defined parts.
     */
    public int getNumVersionParts() {
        return _versionParts == null
            ? 0
            : _versionParts.length;
    }

    public String getLoadingScreenColour() {
        return _loadingScreenColour;
    }

    public String getCopyright() {
        return _copyright;
    }

    public String getDescription() {
        return _description;
    }

    public Vector<String> getHoverIconSrc() {
        return _hoverIconSrc;
    }

    public Vector<String> getIconSrc() throws ValidationException {
        if (_iconSrc.toString().length() > 2 
                && !(_iconSrc.firstElement().toString().startsWith(FILE_EXT_L_ICON) || _iconSrc.firstElement().toString().startsWith(FILE_EXT_U_ICON))
                && !(_iconSrc.firstElement().toString().toLowerCase().endsWith(FILE_EXT_L_PNG))){
            throw new ValidationException(
                    EXCEPTION_INVALID_ICON_FILE_TYPE);
        }
        return _iconSrc;
    }
    
    public String getAutoOrientation() {
        return _autoOrientation;
    }

    public String getOrientation() {
        return _orientation;
    }

    public String getAppHomeScreenCategory() {
        return _categoryName;
    }

    public void setContent(String content) {
        _content = content;
    }

    public void setAuthor(String author) {
        _author = author;
    }

    public void setName(String name) throws ValidationException {
        if (name == null || name.length() == 0) {
            throw new ValidationException(
                    EXCEPTION_CONFIGXML_MISSING_WIDGET_NAME);
        }
        _name = name;
    }

    public void setVersion(String version) throws ValidationException {
        if (SessionManager.getInstance().isVerbose()) {
            Logger.logMessage(LogType.INFO,
                    PROGRESS_VALIDATING_CONFIG_XML_WIDGET_VERSION);
        }
        // version variable should look like one of the options:
        // version="a.b.c"
        // version="a.b.c.d"
        Matcher matcher = VERSION_PATTERN.matcher(version);

        if (!matcher.matches()) {
            throw new ValidationException(EXCEPTION_CONFIGXML_INVALID_VERSION);
        }
        setVersionParts(parseVersion(matcher));
    }

    private String[] parseVersion(MatchResult mr) {
        int n;
        for (n = 0; n < mr.groupCount() && mr.group(n+1) != null; n++)
            ;
        String[] result = new String[n];

        for (int i = 0; i < result.length; i++) {
            result[i] = mr.group(i + 1);
        }

        return result;
    }

    private void setVersionParts(String[] versionParts) {
        _versionParts = versionParts;
    }

    public void setLoadingScreenColour(String screenColour)
            throws ValidationException {

        if (screenColour != null) {
            if (SessionManager.getInstance().isVerbose()) {
                Logger.logMessage(LogType.INFO,
                        PROGRESS_VALIDATING_CONFIG_XML_LOADINGSCREEN_COLOR);
            }
            // color variable should look like: #000000
            String regex = REGEX_COLOR;
            Pattern pattern = Pattern.compile(regex);
            Matcher matcher = pattern.matcher(screenColour);
            if (!matcher.matches()) {
                throw new ValidationException(
                        EXCEPTION_CONFIGXML_LOADINGSCREEN_COLOUR);
            }
        }
        
        _loadingScreenColour = screenColour;
    }

    public String getBackgroundImage() {
        return _backgroundImage;
    }

    public void setBackgroundImage(String src) {
        _backgroundImage = src;
    }
    
    public String getForegroundImage() {
        return _foregroundImage;
    }

    public void setForegroundImage(String src) {
        _foregroundImage = src;
    }
    
    public boolean getFirstPageLoad() {
        return _firstPageLoad;
    }

    public void setFirstPageLoad(boolean value) {
        _firstPageLoad = value;
    }	

    public boolean getRemotePageLoad() {
        return _remotePageLoad;
    }

    public void setRemotePageLoad(boolean value) {
        _remotePageLoad = value;
    }	
    
    public boolean getLocalPageLoad() {
        return _localPageLoad;
    }

    public void setLocalPageLoad(boolean value) {
        _localPageLoad = value;
    }	
    
    public String getTransitionType() {
        return _transitionType;
    }

    public void setTransitionType(String value) {
        _transitionType = value;
    }		
    
    public int getTransitionDuration() {
        return _transitionDuration;
    }

    public void setTransitionDuration(int value) {
        _transitionDuration = value;
    }	
    
    public String getTransitionDirection() {
        return _transitionDirection;
    }

    public void setTransitionDirection(String value) {
        _transitionDirection = value;
    }	
    
    public void setCopyright(String copyright) {
        _copyright = copyright;
    }

    public void setDescription(String description) {
        _description = description;
    }
    
    public void setAutoOrientation(String autoOrientation) {
    	_autoOrientation = autoOrientation;
    }
    
    public void setOrientation(String orientation) {
    	_orientation = orientation;
    }
    
    public void setAppHomeScreenCategory( String categoryName ) {       
        _categoryName = CATEGORY_PREFIX + categoryName;
    }

    public void addHoverIcon(String icon) {
        _hoverIconSrc.add(icon);
    }

    public void addIcon(String icon) {
        _iconSrc.add(icon);
    }

    public String getID() {
        return _id;
    }

    public void setID(String id)
    		throws ValidationException {
    	// We need validate the value of id using the same rule of the archive name
        Pattern patternWidgetName = Pattern.compile("[a-zA-Z][a-zA-Z0-9]*");
        if (!patternWidgetName.matcher(id).matches()) {
            throw new ValidationException("EXCEPTION_CONFIGXML_INVALID_ID");
        }    	
    	
        _id = id;
    }

    public Map<String, String> getCustomHeaders() {
        return _customHeaders;
    }

    public void addHeader(String key, String value) {
        _customHeaders.put(key, value);
    }

    public String getBackButtonBehaviour() {
        return _backButton;
    }

    public void setBackButtonBehaviour(String value) {
        _backButton = value;
    }

    public boolean getNavigationMode() {
        return _navigationMode;
    }

    public void setNavigationMode(boolean value) {
        _navigationMode = value;
    }

    public String getContentType() {
        return _contentType;
    }

    public String getContentCharSet() {
        return _contentCharSet;
    }

    public void setContentType(String type) {
        _contentType = type;
    }

    public void setContentCharSet(String charSet) {
        _contentCharSet = charSet;
    }

    public String getLicense() {
        return _license;
    }

    public String getLicenseURL() {
        return _licenseURL;
    }

    public void setLicense(String license) {
        _license = license;
    }

    public void setLicenseURL(String licenseurl) {
        _licenseURL = licenseurl;
    }

    public void setAuthorURL(String authorURL) {
        _authorURL = authorURL;
    }

    public String getAuthorURL() {
        return _authorURL;
    }

    public void setAuthorEmail(String authorEmail) {
        _authorEmail = authorEmail;
    }

    public String getAuthorEmail() {
        return _authorEmail;
    }

    public void setTransportTimeout(int transportTimeout) {
        _transportTimeout = transportTimeout;
    }

    public int getTransportTimeout() {
        return _transportTimeout;
    }

    public void setTransportOrder(String[] transportOrder) {
        _transportOrder = transportOrder;
    }

    public String[] getTransportOrder() {
        return _transportOrder;
    }

    public boolean allowMultiAccess() {
        return _multiAccess;
    }

    public void setMultiAccess(boolean multiAccess) {
        _multiAccess = multiAccess;
    }

    public String getConfigXML() {
        return _configXML;
    }

    public void setConfigXML(String configXML) {
        _configXML = configXML;
    }

    public Hashtable<WidgetAccess, Vector<WidgetFeature>> getAccessTable() {
        return _accessTable;
    }

    public void setAccessTable(
            Hashtable<WidgetAccess, Vector<WidgetFeature>> table) {
        _accessTable = table;
    }

    public void setExtensionClasses(Vector<String> classes) {
        _extensionClasses = classes;
    }

    public Vector<String> getExtensionClasses() {
        return _extensionClasses;
    }
    
    // Cache field functions
    
    public Boolean isCacheEnabled() {
        return _cacheEnabled;
    }
    
    public void setCacheEnabled(boolean inputValue) {
        _cacheEnabled = inputValue;
    }
    
    public Boolean isAggressiveCacheEnabled() {
        return _aggressivelyCaching;
    }
    
    private void setAggressiveCache(boolean inputValue) {
        _aggressivelyCaching = inputValue;
    }
    
    public Integer getAggressiveCacheAge() {
        return _aggressiveCacheAge;
    }
    
    public void setAggressiveCacheAge(int inputValue) {
        // Enable aggressive cache flag if the value is above 0
        if(inputValue > 0){
            setAggressiveCache(true);
        } else if (inputValue==-1) {
            setAggressiveCache(false);
        }
        
        // Max value is 30 days
        if(inputValue <= 2592000){
            _aggressiveCacheAge = inputValue;
        }
    }
    
    public Integer getMaxCacheSize() {
        return _maxCacheSize;
    }
    
    public void setMaxCacheSize(int inputValue) {
        // Min value of 0, max value of 2048 KB
        if(inputValue >= 0 && inputValue <= (2048*1024)){
            _maxCacheSize = inputValue;
        } else if(inputValue > 2048*1024) {
            _maxCacheSize = 2048*1024;
        }
    }
    
    public Integer getMaxCacheItemSize() {
        return _maxCacheable;
    }
    
    public void setMaxCacheItemSize(int inputValue) {
        // -1 is a valid value
        if(inputValue >= -1){
            _maxCacheable = inputValue;
        }
    }

    //Auto-Startup Accessors and Mutators
    
    public Boolean isStartupEnabled() {
        return _runOnStartup;
    }

    public void setStartup(Boolean runOnStartup) {
        _runOnStartup = runOnStartup;
    }

    public String getBackgroundSource() {
        return _backgroundSource;
    }
    
    public String getForegroundSource() {
        return _foregroundSource;
    }
    
    public void setForegroundSource(String foregroundSource) {
        _foregroundSource = foregroundSource;
    }

    public void setBackgroundSource(String backgroundSource) {
        _backgroundSource = backgroundSource;
    }

    public Boolean allowInvokeParams() {
        return _allowInvokeParams;
    }

    public void setAllowInvokeParams(Boolean allowInvokeParams) {
        _allowInvokeParams = allowInvokeParams;
    }
    
    public boolean isDebugEnabled() {
        return _debugEnabled;
    }

    public void setPermissions(String[] permissions) {
        _permissions = permissions;
    }

    public String[] getPermissions() {
        return _permissions;
    }    
    
}
