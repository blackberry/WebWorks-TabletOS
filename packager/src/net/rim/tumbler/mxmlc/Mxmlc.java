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
package net.rim.tumbler.mxmlc;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Map;

import com.sun.jmx.trace.Trace;

import net.rim.tumbler.config.WidgetConfig;
import net.rim.tumbler.file.FileManager;
import net.rim.tumbler.processbuffer.*;
import net.rim.tumbler.session.BBWPProperties;
import net.rim.tumbler.session.SessionManager;
import net.rim.tumbler.exception.PackageException;

public class Mxmlc {
    private static final String TEMPLATE_MAIN_CLASS_FILE = "WebWorksAppTemplate.as";
    private static final String JAVA_HOME = "JAVA_HOME";

    private String _tabletSdkPath;
    private String _mxmlcPath;
    private String _airConfigPath;
    
    private String _templateMainClassPath;

    private BBWPProperties _bbwpProperties;
    private WidgetConfig _widgetConfig;

    public Mxmlc(BBWPProperties bbwpProperties, WidgetConfig widgetConfig) {
        _bbwpProperties = bbwpProperties;
        _widgetConfig = widgetConfig;

        _tabletSdkPath = _bbwpProperties.getTabletSDK();
        String os = System.getProperty("os.name").toLowerCase();
        if (os.indexOf( "win" ) >= 0)
            _mxmlcPath = _tabletSdkPath + File.separator + "bin" + File.separator + "mxmlc.exe";
        else
            _mxmlcPath = _tabletSdkPath + File.separator + "bin" + File.separator + "mxmlc";
        _airConfigPath = _tabletSdkPath + File.separator + "frameworks" + File.separator + "air-config.xml";
        _templateMainClassPath = SessionManager.getInstance().getSourceFolder() + File.separator + TEMPLATE_MAIN_CLASS_FILE;
    }

    /**
     * Compiles template ActionScript files into a SWF using the mxmlc command-
     * line tool. The specified auto-generated source file is first copied to
     * the template source folder.
     *
     * @param sourcePath the full path of the auto-generated source file.
     * @param archiveName the name of the Widget archive.
     */
    public void run() throws PackageException{
        try {
            String sourceFolder = SessionManager.getInstance().getSourceFolder();
            String archiveName = SessionManager.getInstance().getArchiveName();

            File configFile = new File(sourceFolder, "config.xml");
            String newColor = getString(configFile, "rim:loadingScreen", "backgroundColor", 17);
            
            if (newColor.length() > 0) {
                // replace color in actionscript file
                File asName = new File(sourceFolder, "WebWorksAppTemplate.as");
                String oldColor = getString(asName, "SWF", "backgroundColor", 17);
            
                String input = "";
                BufferedReader reader = new BufferedReader(new FileReader(asName));
                String line = "";
                while ((line = reader.readLine()) != null) {
                    input += line + "\r\n";
                }
                reader.close();
                
                //Replace old background color with new one
                String output = input.replaceAll(oldColor, newColor);
                
                File tempFile = new File(sourceFolder, "temp.as");
                FileWriter writer = new FileWriter(tempFile);
                writer.write(output);
                writer.close();
                asName.delete();
                tempFile.renameTo(asName);
            }
            //
            // Now we can compile all the template code.
            //
            String[] cmd;
            if (SessionManager.getInstance().debugModeInternal()) {
                cmd = new String[] {
                    _mxmlcPath,
                    "-load-config",
                    _airConfigPath,
                    "-debug",
                    "-output",
                    sourceFolder + File.separator + archiveName + ".swf",
                    "--warnings=" + (SessionManager.getInstance().isVerbose()?"true":"false"),
                    _templateMainClassPath,
                };
            } else {
                cmd = new String[] {
                    _mxmlcPath,
                    "-load-config",
                    _airConfigPath,
                    "-output",
                    sourceFolder + File.separator + archiveName + ".swf",
                    "--warnings=" + (SessionManager.getInstance().isVerbose()?"true":"false"),
                    _templateMainClassPath,
                };
            }
            Process p = buildProcess(cmd);

            OutputBuffer stdout = new OutputBuffer(p);
            ErrorBuffer stderr = new ErrorBuffer(p);
            ExitBuffer exitcode = new ExitBuffer(p);

            stdout.waitFor();
            stderr.waitFor();
            exitcode.waitFor();

            if (exitcode.getExitValue().intValue() != 0 || SessionManager.getInstance().isVerbose()) {
                System.out.write(stderr.getStderr());
                System.out.write(stdout.getStdout());
                System.out.flush();
            }
        } catch (IOException ioe) {
            ioe.printStackTrace();
            throw new PackageException("EXCEPTION_MXMLC");
        } catch (InterruptedException ie) {
            throw new PackageException("EXCEPTION_MXMLC");
        }
    }

    /**
     * Builds a process with <code>JAVA_HOME</code> set as required on Windows.
     * This is needed because the JRE is an undocumented prerequisite for the
     * Tablet SDK but not for the WebWorks SDK (on Windows).
     *
     * @param cmd the command string array.
     *
     * @exception java.io.IOException
     *            if an i/o error occurs.
     */
    private static Process buildProcess(String[] cmd)
        throws IOException
    {
        ProcessBuilder builder = new ProcessBuilder(cmd);

        Map<String,String> env = builder.environment();
        if (!env.containsKey(JAVA_HOME)) {
            String javaHome = FileManager.selectOnPlatform(
                System.getProperty("java.home"),
                null);
            if (javaHome != null && !javaHome.isEmpty()) {
                env.put(JAVA_HOME, javaHome);
            }
        }

        return builder.start();
    }

    private String getString(
            File source,
            String lineName,
            String property,
            int offset) {
        String color = "";
        try {
            BufferedReader reader = new BufferedReader(new FileReader(source));
            String line = "";
            while ((line = reader.readLine()) != null) {
                if (line.contains(lineName) && line.contains(property)){
                    color = line;
                    break;
                }
            }
            reader.close();
            if (color != ""){
                color = color.substring(color.indexOf(property) + offset, color.indexOf('"', color.indexOf(property) + offset));
            }
        }
        catch (IOException ioe)
            {
            ioe.printStackTrace();
        }
        return color;
    }

}
