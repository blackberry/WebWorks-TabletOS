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
package net.rim.tumbler;

import java.io.File;
import java.util.Date;
import java.util.Random;
import java.util.regex.Pattern;

import net.rim.tumbler.exception.CommandLineException;
import net.rim.tumbler.exception.PackageException;
import net.rim.tumbler.log.LogType;
import net.rim.tumbler.log.Logger;
import net.rim.tumbler.session.SessionManager;

public class CmdLineHandler {
    private static final String         FILE_SEP = System.getProperty("file.separator");
    private static final char           SWITCH_CHAR = '-';
    private static final String         OPTION_SOURCEDIR = "-s";
    private static final String         OPTION_PASSWORD = "-g";
    private static final String         OPTION_CSK_PASSWORD = "-gcsk";
    private static final String         OPTION_P12_PASSWORD = "-gp12";
    private static final String         OPTION_BUILD_ID = "-buildId";
    private static final String         OPTION_OUTPUTDIR = "-o";
    private static final String         OPTION_VERBOSE = "-v";
    private static final String         OPTION_HELP = "-h";
    private static final String         OPTION_DEBUG = "-d";
    private static final String         OPTION_DEBUG_INTERNAL = "-dinternal";
    
    private boolean         _requireSigned;
    private String          _password;
    private String          _cskPassword;
    private String          _p12Password;
    private String          _buildId;
    private String          _outputDir;
    private boolean         _requireSource;
    private String          _sourceDir;
    private boolean         _debugMode;
    private boolean         _debugModeInternal;
    private boolean         _isVerbose;
    private String          _widgetArchive;
    private String          _archiveName;

    // true for WebWorks on Playbook
    private static final boolean PLAYBOOK = true;

    public static boolean isPlayBook() {
        return PLAYBOOK;
    }

    public boolean parse (String[] inputParams) throws PackageException, CommandLineException {
        // validate at least one parameter
        if (inputParams.length < 1) {
            throw new CommandLineException("EXCEPTION_INVALID_COMMAND_LINE");
        }

        // get first param - exception case: /h
        String input1 = inputParams[0].toLowerCase().trim();
        if (input1.equals(OPTION_HELP)) {
            Logger.logMessage(LogType.NONE, isPlayBook() ? "BBWP_PLAYBOOK_USAGE" : "BBWP_USAGE", WidgetPackager.getVersion());
            return false;
        }

        Logger.logMessage(LogType.INFO, "PROGRESS_CMDLINE_OPTIONS");
        
        // check archive format
        if (!input1.endsWith(".zip")) {
            throw new CommandLineException("EXCEPTION_INVALID_COMMAND_LINE");
        }

        // parse the command line
        _widgetArchive = getAbsolutePath(input1);
        _archiveName = parseWidgetName(_widgetArchive);

        Pattern patternWidgetName = Pattern.compile("[a-zA-Z][a-zA-Z0-9]*");
        if (!patternWidgetName.matcher(_archiveName).matches()) {
            throw new PackageException("EXCEPTION_INVALID_ARCHIVE_NAME");
        }

        // parse options
        try {
            parseOptionParameters(inputParams);
        } catch (Exception e) {
            throw new CommandLineException("EXCEPTION_INVALID_COMMAND_LINE");
        }  
        return true;
    }
    
    public SessionManager createSession() throws Exception {
        // parse location of packager
        String bbwpInstallFolder; 
        String installPath = getAbsolutePath(SessionManager.BBWP_JAR_PATH);
        File p = new File(installPath);
        if( p.isDirectory() ) {
            bbwpInstallFolder = getDirPathWithFileSeparator( installPath );
        } else {
            installPath = installPath.substring(0, installPath
                    .lastIndexOf(FILE_SEP))
                    + FILE_SEP;
            bbwpInstallFolder = installPath;
        }
        
        SessionManager.createInstance(
                _archiveName,
                _widgetArchive,
                bbwpInstallFolder,
                _outputDir,
                _requireSigned, 
                _password,
                _cskPassword,
                _p12Password,
                _buildId,
                _requireSource,
                _sourceDir,
                _debugMode,
                _debugModeInternal,
                _isVerbose,
                isPlayBook());
        return SessionManager.getInstance();
    }
        
    private String parseWidgetName(String archivePath) {
        String name = archivePath.substring(
                archivePath.lastIndexOf(FILE_SEP) + 1, archivePath.lastIndexOf("."));
        return name;
    }
      
    private String getAbsolutePath(String filePath) {
        try {
            return (new File(filePath)).getCanonicalFile().getAbsolutePath();
        } catch (Exception e) {
            return (new File(filePath)).getAbsolutePath();
        }
    }
    
    public static String getDirPathWithFileSeparator( String dirPath ) {
        if( dirPath.lastIndexOf( FILE_SEP ) == dirPath.length() - 1 ) {
            return dirPath;
        } else {
            return dirPath + FILE_SEP;
        }
    }
    
    private void parseOptionParameters(String[] params) throws Exception {
        _requireSigned = false;
        _password = "";
        _cskPassword = "";
        _p12Password = "";
        _buildId = "";
        _outputDir = "";
        _requireSource = false;
        _sourceDir = "";

        int nPasswords = 0;

        int index = 1;
        while (index < params.length) {
            String param = params[index];

            if (param.equals(OPTION_HELP)) {
                throw new Exception();
            } else if (param.equals(OPTION_DEBUG)) {
                _debugMode = true;
                index++;
            } else if (param.equals(OPTION_DEBUG_INTERNAL)) {
                _debugModeInternal = true;
                index++;
            } else if (param.equals(OPTION_VERBOSE)) {
                _isVerbose = true;
                index++;
            } else if (param.equals(OPTION_PASSWORD)) {
                _requireSigned = true;
                if (params.length > index + 1) {
                    String followingParameter = params[index + 1];
                    if (followingParameter.charAt(0) != SWITCH_CHAR) {
                        _password = followingParameter;
                        index++;
                    }
                }
                index++;
            } else if (isPlayBook() && param.equals(OPTION_CSK_PASSWORD)) {
                _requireSigned = true;
                nPasswords++;
                if (params.length > index + 1) {
                    String followingParameter = params[index + 1];
                    if (followingParameter.charAt(0) != SWITCH_CHAR) {
                        _cskPassword = followingParameter;
                        index++;
                    }
                }
                index++;
            } else if (isPlayBook() && param.equals(OPTION_P12_PASSWORD)) {
                _requireSigned = true;
                nPasswords++;
                if (params.length > index + 1) {
                    String followingParameter = params[index + 1];
                    if (followingParameter.charAt(0) != SWITCH_CHAR) {
                        _p12Password = followingParameter;
                        index++;
                    }
                }
                index++;
            } else if (isPlayBook() && param.equals(OPTION_BUILD_ID)) {
                if (params.length > index + 1) {
                    String followingParameter = params[index + 1];
                    if (followingParameter.charAt(0) != SWITCH_CHAR) {
                        _buildId = followingParameter;
                        index++;
                    }
                }
                index++;
            } else if (param.equals(OPTION_OUTPUTDIR)) {
                if (params.length > index + 1) {
                    _outputDir = params[index + 1];
                    _outputDir = getAbsolutePath(_outputDir);
                    index += 2;
                } else {
                    throw new Exception();
                }
            } else if (param.equals(OPTION_SOURCEDIR)) {
                _requireSource = true;
                if (params.length > index + 1) {
                    String followingParameter = params[index + 1];
                    if (followingParameter.charAt(0) != SWITCH_CHAR) {
                        _sourceDir = followingParameter;
                        _sourceDir = getAbsolutePath(_sourceDir);
                        index++;
                    }
                }
                index++;
            } else {
                throw new Exception();
            }
        }

        // If only one of the passwords is specified, it has to be a common one provided with -g option.
        // Otherwise the command-line is invalid.
        if( ( _password != null && _password.length() > 0 ) ) {
            _cskPassword = _password;
            _p12Password = _password;
        } else {
            if( nPasswords == 1 ) {
                throw new Exception();
            }
        }
        
        // Populate correct source directory
        if (!_requireSource) {
            _sourceDir = System.getProperty("java.io.tmpdir") + "widgetGen."
                    + new Random().nextInt(2147483647) + new Date().getTime()
                    + ".tmp";
        } else {
            if (_sourceDir.length() != 0) {
                _sourceDir = _sourceDir + FILE_SEP + "src";
            } else {
                if (_outputDir.length() != 0) {
                    _sourceDir = _outputDir + FILE_SEP + "src";
                } else {
                    _sourceDir = _widgetArchive.substring(0, _widgetArchive
                            .lastIndexOf(FILE_SEP) + 1)
                            + "src";
                }
            }
        }

        // Populate correct output directory
        if (_outputDir.length() == 0) {
            _outputDir = _widgetArchive.substring(0, _widgetArchive
                    .lastIndexOf(FILE_SEP) + 1)
                    + "bin";
        }
    }
}
