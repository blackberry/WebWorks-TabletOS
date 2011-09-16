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
package net.rim.tumbler.session;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.zip.ZipFile;

import net.rim.tumbler.CmdLineHandler;
import net.rim.tumbler.WidgetPackager;
import net.rim.tumbler.exception.PackageException;
import net.rim.tumbler.exception.SessionException;
import net.rim.tumbler.exception.ValidationException;
import net.rim.tumbler.signing.SigningSupport;

public class SessionManager {
    private static final String BAR_FILE_EXTENSION = ".bar";
    private static SessionManager   _instance = null;
    
    // environment properties
    public static final String BBWP_JAR_PATH;
    
    private String          _bbwpJarFolder;
    private String          _sessionHome; 
    private String          _tld;
    
    // widget info
    private String          _widgetArchive;
    private String          _archiveName;
    
    // command line settings
    private boolean         _requireSigning;
    private String          _password;
    private String          _cskPassword;
    private String          _p12Password;
    private String          _p12FullPath;
    private String          _buildId;
    private String          _outputFolder;
    private boolean         _requireSource;
    private String          _sourceFolder;
    private boolean         _debugMode;
    private boolean         _debugModeInternal;
    private boolean         _isVerbose;
    
    // for PlayBook WebWorks
    private boolean			_playbook;
    
    public boolean isPlayBook() {
        return _playbook;
    }
    
    static {
        try {
            BBWP_JAR_PATH = URLDecoder.decode(SessionManager.class
                    .getProtectionDomain().getCodeSource().getLocation()
                    .getPath(), "UTF-8");           
        } catch (UnsupportedEncodingException e) {
            throw new SessionException(e, "Unexpected error decoding BBWP JAR path.");
        }
    }

    public static void createInstance (            
            String archiveName,
            String widgetArchive,
            String bbwpInstallFolder,
            String outputFolder,
            boolean requireSigning,
            String password,
            String cskPassword,
            String p12Password,
            String buildId,
            boolean requireSource,
            String sourceFolder,
            boolean debugMode,
            boolean debugModeInternal,
            boolean isVerbose,
            boolean playbook ) throws Exception {
        _instance = new SessionManager(
                archiveName,
                widgetArchive,
                bbwpInstallFolder,
                outputFolder,
                requireSigning,
                password,
                cskPassword,
                p12Password,
                buildId,
                requireSource,
                sourceFolder,
                debugMode,
                debugModeInternal,
                isVerbose,
                playbook);
    }
    
    public static SessionManager getInstance() {
        return _instance;
    }
    
    private SessionManager (
            String archiveName,
            String widgetArchive,
            String bbwpInstallFolder,
            String outputFolder,
            boolean requireSigning,
            String password,
            String cskPassword,
            String p12Password,
            String buildId,
            boolean requireSource,
            String sourceFolder,
            boolean debugMode,
            boolean debugModeInternal,
            boolean isVerbose,
            boolean playbook ) throws Exception {
        
        _widgetArchive = widgetArchive;
        _archiveName = archiveName;
        _requireSigning = requireSigning;
        _password = password;
        _cskPassword = cskPassword;
        _p12Password = p12Password;
        _buildId = buildId;
        _outputFolder = outputFolder;
        _requireSource = requireSource;
        _sourceFolder = sourceFolder;
        _debugMode = debugMode;
        _debugModeInternal = debugModeInternal;
        _isVerbose = isVerbose;
        _bbwpJarFolder = bbwpInstallFolder;
        _playbook = playbook;
        
        // determine home directory
        _sessionHome = determineSessionHome();
        
        // validate session - check signing keys
        if (_requireSigning) {
            setP12FullPath();
            checkSignatureKeys();
        }
        
        // validate widget archive
        validateArchive(_widgetArchive);
        
        // load top level domain info
        BufferedReader input = new BufferedReader(new FileReader(new File(
                _bbwpJarFolder + "tld.txt")));
        String line = null; // not declared within while loop
        StringBuffer sb = new StringBuffer("$$");
        while ((line = input.readLine()) != null) {
            sb.append(line.toLowerCase().trim());
            sb.append("$$");
        }
        _tld = sb.toString();
    }

    private void validateArchive(String archive) throws PackageException {

        File f = new File(archive);
        ZipFile zipFile;

        // check for file's existence
        if (!f.exists()) {
            throw new PackageException("EXCEPTION_WIDGET_ARCHIVE_NOT_FOUND");
        } else {
            try {
                zipFile = new ZipFile(f);
                zipFile.close();
            } catch (Exception e) {
                throw new PackageException("EXCEPTION_ARCHIVE_IO");
            }
        }
    }
    
    private String determineSessionHome() {
        String home = "";

        try {
            home = new File(getClass().getProtectionDomain().getCodeSource()
                    .getLocation().toURI()).getCanonicalPath();
        } catch (Exception e) {
            home = "";
        }

        if (home.equals("")) {
            return System.getProperty("user.dir");
        } else {
            return home
                    .substring(0, home.lastIndexOf(File.separator+"bin"));
        }
    }
    
    private void checkSignatureKeys() throws Exception {
        if (!isPlayBook()) {
            String keyPath = _bbwpJarFolder + WidgetPackager.SIGNATURE_KEY_FILE;

            // check for file's existence
            if (!(new File(keyPath)).exists()) {
                throw new ValidationException("EXCEPTION_MISSING_SIGNING_KEYS");
            }
        } else {
            if( !SigningSupport.isSigningKeyPresent( getP12FullPath() ) ) {
                throw new ValidationException( "EXCEPTION_MISSING_SIGNING_KEYS" );
            }
        }
    }
    
    private void setP12FullPath() {
        //
        // (1) Check for .p12 in "bin".
        //
        // (2) Check for .p12 in:
        // %HOMEPATH%\Local Settings\Application Data\Research In Motion on Windows XP;
        // %HOMEPATH%\AppData\Local\Research In Motion on Windows Vista and Windows 7
        // ~/Library/Research In Motion on OSX
        //
        String p12FullPath = "";
        p12FullPath = SigningSupport.getP12BinFullPath( _bbwpJarFolder );

        if( !new File( p12FullPath ).isFile() ) {
            String p12OuterFolder = "";
            String os = System.getProperty( "os.name" ).toLowerCase();
            if( os.indexOf( "win" ) >= 0 ) {
                if( os.indexOf( "vista" ) >= 0 || os.indexOf( "7" ) >= 0 ) {
                    p12OuterFolder = System.getenv( "HOMEDRIVE" ) + System.getenv( "HOMEPATH" )
                            + "\\AppData\\Local\\Research In Motion";

                } else if( os.indexOf( "xp" ) >= 0 ) {
                    p12OuterFolder = System.getenv( "HOMEDRIVE" ) + System.getenv( "HOMEPATH" )
                            + "\\Local Settings\\Application Data\\Research In Motion";
                }
            } else {
                p12OuterFolder = System.getenv( "HOME" ) + "/Library/Research In Motion";
            }

            p12OuterFolder = CmdLineHandler.getDirPathWithFileSeparator( p12OuterFolder );

            p12FullPath = SigningSupport.getP12OuterFullPath( p12OuterFolder );
        }

        _p12FullPath = p12FullPath;
    }
    
    public String getBBWPJarFolder() {
        return _bbwpJarFolder;
    }

    public String getWidgetArchive() {
        return _widgetArchive;
    }

    public String getArchiveName() {
        return _archiveName;
    }

    public boolean requireSigning() {
        return _requireSigning;
    }

    public String getPassword() {
        return _password;
    }

    public String getCskPassword() {
        return _cskPassword;
    }

    public String getP12Password() {
        return _p12Password;
    }

    public String getP12FullPath() {
        return _p12FullPath;
    }

    public String getBuildId() {
        return _buildId;
    }

    public String getOutputFolder() {
        return _outputFolder;
    }

    public boolean requireSource() {
        return _requireSource;
    }

    public String getSourceFolder() {
        return _sourceFolder;
    }

    public boolean debugMode() {
        return _debugMode;
    }

    public boolean debugModeInternal() {
        return _debugModeInternal;
    }

    public boolean isVerbose() {
        return _isVerbose;
    }
    
    public String getSessionHome() {
        return _sessionHome;
    }
    
    public String getTLD() {
        return _tld;
    }

    public String getOutputFilepath() {
        return getOutputFolder() + File.separator + getArchiveName() + BAR_FILE_EXTENSION;
    }
}
