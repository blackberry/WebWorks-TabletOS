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
package net.rim.tumbler.signing;

import java.io.File;
import java.io.IOException;
import net.rim.tumbler.exception.PackageException;
import net.rim.tumbler.file.FileManager;
import net.rim.tumbler.processbuffer.*;
import net.rim.tumbler.session.BBWPProperties;
import net.rim.tumbler.session.SessionManager;

public class SigningSupport {
    private static final String SIGTOOL_P12_FILENAME = "sigtool.p12";
    private static final String LONGTERM_CSK_FILENAME = "barsigner.csk";
    private static final String LONGTERM_DB_FILENAME = "barsigner.db";

    /**
     * The constructor is inaccessible because this class
     * only provides static helper methods.
     */
    private SigningSupport() {}

    /**
     * Returns true if the signing-key files are present.
     *
     * @param bbwpJarFolder the location of bbwp.jar.
     *
     * @return true if the signing-key files are present.
     */
    public static boolean isSigningKeyPresent(String bbwpJarFolder) {
        //
        // (1) Check for "barsigner.csk" and "barsigner.db" in:
        //     System.getProperty("user.home") + "Local Settings\\Application Data\\Research In Motion" on Windows, and
        //     System.getProperty("user.home") + "Applications/Research In Motion" on OSX.
        //
        // (2) Check for "sigtool.p12" in "bin".
        //
        return new File(getP12Filename(bbwpJarFolder)).isFile();
    }

    private static String getP12Filename(String bbwpJarFolder) {
        return bbwpJarFolder + SIGTOOL_P12_FILENAME;
    }

    public static void signBar(BBWPProperties bbwpProperties) throws IOException, PackageException {
        SessionManager sessionManager = SessionManager.getInstance();
        String signer = bbwpProperties.getTabletSDK() + File.separator + "bin" + File.separator
            + FileManager.selectOnPlatform("blackberry-signer.bat", "blackberry-signer");

        String barFullname = sessionManager.getOutputFilepath();
        File barFile = new File(barFullname);

        if (barFile.isFile()) {
            try {
                //
                // 1. RIM signing
                //
                String[] cmd1 = {
                    signer,
//                    "-verbose",
                    "-cskpass",
                    sessionManager.getCskPassword(),
                    "-keystore",
                    getP12Filename(sessionManager.getBBWPJarFolder()),
                    "-storepass",
                    sessionManager.getP12Password(),
                    barFullname,
                    "RDK"
                };
                execAndCheck(cmd1, barFile);

                //
                // 2. Developer signing
                //
                String[] cmd2 = {
                    signer,
//                    "-verbose",
                    "-keystore",
                    getP12Filename(sessionManager.getBBWPJarFolder()),
                    "-storepass",
                    sessionManager.getP12Password(),
                    barFullname,
                    "author"
                };
                execAndCheck(cmd2, barFile);
            } catch (InterruptedException ie) {
                throw new PackageException("EXCEPTION_SIGNING_FAILED");
            }
        }
    }

    private static void execAndCheck(String[] cmdarray, File targetToCheck)
        throws IOException, PackageException, InterruptedException
    {
        long lastModified = targetToCheck.lastModified();

        Process p = Runtime.getRuntime().exec(cmdarray);

        OutputBuffer stdout = new OutputBuffer(p);
        ErrorBuffer stderr = new ErrorBuffer(p);
        ExitBuffer exitcode = new ExitBuffer(p);

        stdout.waitFor();
        stderr.waitFor();
        exitcode.waitFor();

        //
        // Check for return code
        //
        if (exitcode.getExitValue().intValue() != 0) {
            System.out.write(stderr.getStderr());
            System.out.write(stdout.getStdout());
            System.out.flush();
            throw new PackageException("EXCEPTION_SIGNING_FAILED");
        }

        //
        // Check for target modified
        //
        if (targetToCheck.lastModified() == lastModified) {
            throw new PackageException("EXCEPTION_SIGNING_FAILED");
        }
    }
}
