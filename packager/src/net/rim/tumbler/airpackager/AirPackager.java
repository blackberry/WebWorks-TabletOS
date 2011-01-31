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
package net.rim.tumbler.airpackager;

import java.io.File;
import java.io.FileWriter;
import java.io.FileFilter;
import java.io.IOException;
import java.io.Writer;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.xml.parsers.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.stream.*;
import net.rim.tumbler.config.WidgetConfig;
import net.rim.tumbler.exception.ValidationException;
import net.rim.tumbler.file.FileManager;
import net.rim.tumbler.processbuffer.*;
import net.rim.tumbler.session.BBWPProperties;
import net.rim.tumbler.session.SessionManager;
import net.rim.tumbler.exception.PackageException;

import org.w3c.dom.*;
import org.xml.sax.SAXException;

public class AirPackager {
    private static final String PATH = "Path";

    // HARD-CODED VALUES FOR DEMO USE ONLY
    private String _tabletSdkPath;
    private String _airPackagerPath;

    private static final String APP_XML_SUFFIX = "-app.xml";
    private static final String SWF_FILE_EXTENSION = ".swf";

    private BBWPProperties _bbwpProperties;
    private WidgetConfig _widgetConfig;    

    public AirPackager(BBWPProperties bbwpProperties, WidgetConfig widgetConfig) {
        _bbwpProperties = bbwpProperties;
        _widgetConfig = widgetConfig;

        _tabletSdkPath = _bbwpProperties.getTabletSDK();
        _airPackagerPath = _tabletSdkPath + File.separator + "bin" + File.separator
            + FileManager.selectOnPlatform("blackberry-airpackager.bat", "blackberry-airpackager");
    }

    /**
     * Packages the files in the specified source path, using the AIR packager
     * to create a BAR file.
     *
     * @param sourcePath the folder containing the files to be packaged.
     * @param archiveName the name of the Widget archive.
     * @throws ValidationException 
     */
    public void run() throws PackageException, ValidationException {
        try {
            String sourcePath = SessionManager.getInstance().getSourceFolder();
            String bindebugPath = sourcePath + File.separator + "bin-debug";
            String archiveName = SessionManager.getInstance().getArchiveName();

            //
            // First we copy the files in the source path to the bin-debug folder.
            //
            deleteDirectory(new File(bindebugPath));
            new File(bindebugPath).mkdir(); // just in case

            List<File> fileList = new ArrayList<File>();
            File desFile; 

            
            // Check if the icon file actually exists
            // Needs to be done first in order to avoid putting the icon.png filename into the fileList
            String iconPath = "";
            if (_widgetConfig.getIconSrc().size() > 0) {
            	iconPath = _widgetConfig.getIconSrc().firstElement().toString();
            	File iconFile = new File(sourcePath, iconPath);
            	if (!iconFile.isFile()) {
            		iconPath = "";
            	}
            	else
            	{
            		iconPath = "appicon.png";
            		iconFile.renameTo(new File(sourcePath,iconPath));
            	}
            }                        
            //
            // Copy src files to the bin-debug folder
            //            
            List<File> srcFiles = listFiles(sourcePath, new FileFilter() {
                public boolean accept(File pathname) {
                    return !pathname.getName().endsWith(".as")
                        && !pathname.getName().endsWith(APP_XML_SUFFIX)
                        && !pathname.getName().endsWith(SWF_FILE_EXTENSION);
                }
            });

            for (File f : srcFiles) {
                String relativePath = f.getAbsolutePath().substring(sourcePath.length() + 1);
                desFile = new File(bindebugPath, relativePath);
                FileManager.copyFile(f, desFile);
                fileList.add(desFile);
            }

            //
            // Copy the SWF
            //
            String swfName = archiveName + SWF_FILE_EXTENSION;
            desFile = new File(bindebugPath, swfName);
            FileManager.copyFile(new File(sourcePath, swfName), desFile);
            fileList.add(desFile);

            //
            // Copy and replace the text in the app XML with the name of the SWF file.
            // Prepare the complete version of app.xml including a custom icon.
            //
          
            
          
            String appXmlName = archiveName + APP_XML_SUFFIX;
            desFile = new File(bindebugPath, appXmlName);
            prepareAppXML(new File(sourcePath, "WebWorksAppTemplate-app.xml"), desFile, swfName);
            fileList.add(desFile);
            
            File bbt = new File(sourcePath, "Blackberry-Tablet.xml");
            File bbtDes = new File(bindebugPath, "Blackberry-Tablet.xml");
            prepareBBTXML(bbt, bbtDes,iconPath);
            
            int size = fileList.size();
            String[] files = new String[size];
            int i = 2;
            for (File f: fileList) {
                String relativePath = f.getAbsolutePath().substring(bindebugPath.length() + 1);
                if (relativePath.equalsIgnoreCase(appXmlName)) {
                    files[0] = relativePath; 
                } else if (relativePath.equalsIgnoreCase(swfName)) {
                    files[1] = relativePath;
                } else {
                    files[i++] = relativePath;
                }
            }

            //
            // Now we can package it all.
            //
            String outputFolder = SessionManager.getInstance().getOutputFolder();
            new File(outputFolder).mkdirs();
            String outputPath = SessionManager.getInstance().getOutputFilepath(); //_airTemplatePath + File.separator + archiveName + BAR_FILE_EXTENSION

            //
            // For AIR, the build number is specified separately from the
            // version string using the -buildId parameter.
            //
            // For signing, the bbwp command-line interface supports -buildId
            // as an override.
            //
            String buildId;
            String buildIdOverride = SessionManager.getInstance().getBuildId();
            if (!buildIdOverride.isEmpty()) {
                buildId = buildIdOverride;
            } else if (_widgetConfig.getNumVersionParts() > 3) {
                buildId = _widgetConfig.getVersionParts(3);
            } else {
                buildId = "0";
            }

            //
            // Target is bar-debug unless we are signing.
            //
            String[] cmd = {
                _airPackagerPath,
                "-package",
                "-target",
                (SessionManager.getInstance().requireSigning() ? "bar" : "bar-debug"),
                "-buildId",
                buildId,
                outputPath
            };
            int n = files.length;
            String[] join = new String[cmd.length + n];
            System.arraycopy(cmd, 0, join, 0, cmd.length);
            System.arraycopy(files, 0, join, cmd.length, n);
            Process p = buildProcess(join, new File(bindebugPath));

            OutputBuffer stdout = new OutputBuffer(p);
            ErrorBuffer stderr = new ErrorBuffer(p);
            ExitBuffer exitcode = new ExitBuffer(p);

            stdout.waitFor();
            stderr.waitFor();
            exitcode.waitFor();

            if (exitcode.getExitValue().intValue() != 0) {
                System.out.write(stderr.getStderr());
                System.out.write(stdout.getStdout());
                System.out.flush();
            }
        } catch (IOException ioe) {
        	ioe.printStackTrace();
            throw new PackageException("EXCEPTION_AIRPACKAGER");
        } catch (InterruptedException ie) {
            throw new PackageException("EXCEPTION_AIRPACKAGER");        	
        }
    }

    /**
     * Builds a process with the <code>bin</code> folder under <code>java.home</code>
     * appended to <code>PATH</code> on Windows.
     * This is needed because the JRE is an undocumented prerequisite for the
     * Tablet SDK but not for the WebWorks SDK (on Windows).
     *
     * @param cmd the command string array.
     * @param workingDirectory the working directory of the subprocess.
     *
     * @exception java.io.IOException
     *            if an i/o error occurs.
     */
    private static Process buildProcess(String[] cmd, File workingDirectory)
        throws IOException
    {
        ProcessBuilder builder = new ProcessBuilder(cmd);

        String javaBin = FileManager.selectOnPlatform(
            System.getProperty("java.home"),
            null);
        if (javaBin != null && !javaBin.isEmpty()) {
            javaBin += File.separator + "bin";
            Map<String,String> env = builder.environment();
            if (env.containsKey(PATH)) {
                env.put(PATH, env.get(PATH) + File.pathSeparator + javaBin);
            } else {
                env.put(PATH, javaBin);
            }
        }

        return builder.directory(workingDirectory).start();
    }

    /**
     * Parses XML from the specified input file, replaces the text content of the
     * &lt;content&gt; with the specified replacement string, and writes the result
     * to the specified output file. If the &lt;content&gt; element is not found in
     * the expected location, this method is at liberty to do nothing.
     *
     * @param infile the input XML file, expected to be in app XML format.
     * @param outfile the destination file, to hold the result.
     * @param replacementText the replacement string.
     *
     * @exception java.io.IOException if an i/o error occurs.
     * @throws ValidationException 
     */
    private void prepareAppXML(
        File infile,
        File outfile,
        String replacementText)
        throws IOException, ValidationException
    {
        Writer w = null;
        try {
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document d = db.parse(infile);

            Element e = d.getDocumentElement();

            if (e != null) {
                // Replace initialWindow/content
                NodeList nl = e.getElementsByTagName("initialWindow");
                if (nl.getLength() > 0 && nl.item(0) instanceof Element) {
                    Element e2 = (Element)nl.item(0);
                    
                    NodeList nl2 = e2.getElementsByTagName("content");
                    if (nl2.getLength() > 0 && nl2.item(0) instanceof Element) {
                        Element e3 = (Element)nl2.item(0);
                        e3.setTextContent(replacementText);
                    }
                }
                
                // Replace id
                NodeList nl2 = e.getElementsByTagName("id");
                if (nl2.getLength() > 0 && nl2.item(0) instanceof Element) {
                    Element e3 = (Element)nl2.item(0);
                    e3.setTextContent(SessionManager.getInstance().getArchiveName() + genPackageName(SessionManager.getInstance().getArchiveName()));
                }
                
                // Replace name
                nl2 = e.getElementsByTagName("name");
                if (nl2.getLength() > 0 && nl2.item(0) instanceof Element) {
                    Element e3 = (Element)nl2.item(0);
                    e3.setTextContent(_widgetConfig.getName());
                }
                
                // Replace version
                nl2 = e.getElementsByTagName("versionNumber");
                if (nl2.getLength() > 0 && nl2.item(0) instanceof Element) {
                    Element e3 = (Element)nl2.item(0);
                    e3.setTextContent(_widgetConfig.getVersionParts(0, 3)); // AIR supports only 3-part version strings
                }
                
                // Add description
                if (_widgetConfig.getDescription() != null && _widgetConfig.getDescription().length() > 0) {
                	Element description = d.createElement("description");
                	description.setTextContent(_widgetConfig.getDescription());
                    Node root = d.getFirstChild();
                    root.appendChild(description);
                }
                
                // Add copyright
                if (_bbwpProperties.getCopyright().length() > 0) {
                	Element copyright = d.createElement("copyright");
                	copyright.setTextContent(_bbwpProperties.getCopyright());
                	Node root = d.getFirstChild();
                	root.appendChild(copyright);
                }                         
            }

            TransformerFactory tf = TransformerFactory.newInstance();
            Transformer t = tf.newTransformer();
            DOMSource s = new DOMSource(d);
            w = new FileWriter(outfile);
            StreamResult r = new StreamResult(w);
            t.transform(s, r);
        } catch (ParserConfigurationException pce) {
            throw new IOException(pce);
        } catch (SAXException se) {
            throw new IOException(se);
        } catch (TransformerConfigurationException tce) {
            throw new IOException(tce);
        } catch (TransformerException te) {
            throw new IOException(te);
        } finally {
            if (w != null) {
                try {
                    w.close();
                } catch (IOException ioe) {}
            }
        }
    }

    private void prepareBBTXML(
            File infile,
            File destFile,
            String iconPath)
            throws IOException
        {
            Writer w = null;
            try {
                DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
                DocumentBuilder db = dbf.newDocumentBuilder();
                Document d = db.parse(infile);
                Element e = d.getDocumentElement();
                
                // Add icon
                if (iconPath.length() > 0) {
                	
                    // add icon node
                    Element icon = d.createElement("icon");
                    Node root = d.getFirstChild();
                    root.appendChild(icon);
                 
                    // add image72x72 node
                    Element image = d.createElement("image");
                    image.appendChild(d.createTextNode(iconPath));
                    icon.appendChild(image);                	
                }                
                TransformerFactory tf = TransformerFactory.newInstance();
                Transformer t = tf.newTransformer();
                DOMSource s = new DOMSource(d);
                w = new FileWriter(destFile);
                StreamResult r = new StreamResult(w);
                t.transform(s, r);
                } catch (Exception e) {}
            finally {
	            if (w != null) {
	                try {
	                    w.close();
	                } catch (IOException ioe) {}
	            }
            }
            

        }    
    
    private static String genPackageName(String widgetName) {
        String packageHash;

        try {
            MessageDigest md;

            md = MessageDigest.getInstance("MD5");
            md.reset();
            md.update(widgetName.getBytes());
            byte[] byteArray = md.digest();

            StringBuffer hexString = new StringBuffer();
            for (int i = 0; i < byteArray.length; i++) {
                hexString.append(Integer.toHexString(0xFF & byteArray[i]));
            }

            packageHash = hexString.toString();
            
        } catch (Exception e) {
            packageHash = widgetName;
        }
        return packageHash;
    }
    
    private List<File> listFiles(String path, FileFilter fileFilter) {
        List<File> fileList = new ArrayList<File>();
        File[] archiveFiles = new File(path).listFiles(fileFilter);
        for (File f : archiveFiles) {
            if (f.isDirectory()) {
                List<File> subFiles = listFiles(f.getPath(), fileFilter);
                for (File subFile : subFiles) {
                    fileList.add(subFile);
                }
            } else {
                fileList.add(f);
            }
        }

        return fileList;
    }

    // delete a dir
    private boolean deleteDirectory(File dir) {
        // remove files first
        if (dir.exists() && dir.isDirectory()) {
            String[] children = dir.list();
            for (String child : children) {
                if (!deleteDirectory(new File(dir, child)))
                    return false;
            }
        }
        if (dir.exists()) {
            // then remove the directory
            return dir.delete();
        }
        return false;
    }    
}
