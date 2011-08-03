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
package net.rim.tumbler.airpackager;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileFilter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;

import net.rim.tumbler.config.WidgetConfig;
import net.rim.tumbler.exception.PackageException;
import net.rim.tumbler.exception.ValidationException;
import net.rim.tumbler.file.FileManager;
import net.rim.tumbler.processbuffer.ErrorBuffer;
import net.rim.tumbler.processbuffer.ExitBuffer;
import net.rim.tumbler.processbuffer.OutputBuffer;
import net.rim.tumbler.session.BBWPProperties;
import net.rim.tumbler.session.SessionManager;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;


public class AirPackager {
    private static final String PATH = "Path";

    // For splash screen image
    private static final int SCREEN_WIDTH = 1024;
    private static final int SCREEN_HEIGHT = 600;
    private static final String SPLASHSCREEN_FORMAT = "png";
    
    private static final String DOC_ELM_SPLASHSCREEN = "splashscreen";
    private static final String DOC_ELM_IMAGE = "image";
    private static final String DOC_ELM_ICON = "icon";
    private static final String DOC_ELM_COPYRIGHT = "copyright";
    private static final String DOC_ELM_DESCRIPTION = "description";
    private static final String DOC_ELM_VERSIONNUMBER = "versionNumber";
    private static final String DOC_ELM_NAME = "name";
    private static final String DOC_ELM_ID = "id";
    private static final String DOC_ELM_ASPECTRATIO = "aspectRatio";
    private static final String DOC_ELM_AUTOORIENTS = "autoOrients";
    private static final String DOC_ELM_CONTENT = "content";
    private static final String DOC_ELM_INITIALWINDOW = "initialWindow";
    private static final String DOC_ELM_PUBLISHER = "publisher";
    private static final String DOC_ELM_CATEGORY = "category";
    private static final String DOM_ELM_ROOT_XPATH = "//qnx"; 
    private static final String DOC_ELM_CATEGORY_XPATH = DOM_ELM_ROOT_XPATH + "/" + DOC_ELM_CATEGORY;
    
    private static final String PATH_BIN = "bin";
    private static final String PATH_JAVA_HOME = "java.home";

    // HARD-CODED VALUES FOR DEMO USE ONLY
    private String _tabletSdkPath;
    private String _airPackagerPath;

    private static final String APP_XML_SUFFIX = "-app.xml";
    private static final String SWF_FILE_EXTENSION = ".swf";

    private static final String PATH_BIN_DEBUG = "bin-debug";
    private static final String PATH_ICON_APPICON_PNG = "appicon.png";
    protected static final String FILE_EXT_AS = ".as";
    protected static final CharSequence PATH_MACOSX = "__MACOSX";
    private static final String FILE_BLACKBERRY_TABLET_XML = "Blackberry-Tablet.xml";
    private static final String NUM_0 = "0";
    private static final String FLAG_PACKAGE = "-package";
    private static final String FLAG_TARGET = "-target";
    private static final String FLAG_DEBUG_TOKEN = "-debugToken";
    private static final String FLAG_DEV_MODE = "-devMode";
    private static final String FILE_EXT_BAR = "bar";
    private static final String PATH_BAR_DEBUG = "bar-debug";
    private static final String EXCEPTION_AIRPACKAGER = "EXCEPTION_AIRPACKAGER";
    private static final String EXCEPTION_DEBUG_TOKEN_INVALID = "EXCEPTION_DEBUG_TOKEN_INVALID";
    private static final String MD5 = "MD5";
    private static final String FILE_SPSH = "spsh";
    private static final String DELIMITER_DOT = ".";
    private static final String FILE_WEBWORKSAPPTEMPLATE_APP_XML = "WebWorksAppTemplate-app.xml";
    private static final String FLAG_BUILDID = "-buildId";
    private static final String EMPTY_STRING = "";


    private BBWPProperties _bbwpProperties;
    private WidgetConfig _widgetConfig;    
    private Hashtable<String,String> _permissionMappings;
    public AirPackager(BBWPProperties bbwpProperties, WidgetConfig widgetConfig) {
        _bbwpProperties = bbwpProperties;
        _widgetConfig = widgetConfig;

        _tabletSdkPath = _bbwpProperties.getTabletSDK();
        _airPackagerPath = _tabletSdkPath + File.separator + "bin" + File.separator
            + FileManager.selectOnPlatform("blackberry-airpackager.bat", "blackberry-airpackager");
        _permissionMappings = new Hashtable<String,String>();
        // 1 to 1 mapping for now.
        _permissionMappings.put("access_shared", "access_shared");
        _permissionMappings.put("read_geolocation", "read_geolocation");
        _permissionMappings.put("access_internet", "access_internet");
        _permissionMappings.put("read_device_identifying_information", "read_device_identifying_information");
        _permissionMappings.put("use_camera", "use_camera");
        _permissionMappings.put("record_audio", "record_audio");
    }

    /**
     * Packages the files in the specified source path, using the AIR packager
     * to create a BAR file.
     *
     * @param sourcePath the folder containing the files to be packaged.
     * @param archiveName the name of the Widget archive.
     * @throws ValidationException 
     */
    public int run() throws PackageException, ValidationException {
        try {
            String sourcePath = SessionManager.getInstance().getSourceFolder();
            String bindebugPath = sourcePath + File.separator + PATH_BIN_DEBUG;
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
            String iconPath = EMPTY_STRING;
            if (_widgetConfig.getIconSrc().size() > 0) {
            	iconPath = _widgetConfig.getIconSrc().firstElement().toString();
            	File iconFile = new File(sourcePath, iconPath);
            	if (!iconFile.isFile()) {
            		iconPath = EMPTY_STRING;
            	}
            	else
            	{
            		iconPath = PATH_ICON_APPICON_PNG;
            		iconFile.renameTo(new File(sourcePath,iconPath));
            	}
            }                        

            //
            // Create a splash screen consistent with the loading screen.
            // If the widget config doesn't specify loading screen data,
            // splashscreenFilename will be null.
            //
            String splashscreenFilename = createSplashscreen(sourcePath);

            //
            // Copy src files to the bin-debug folder
            //            
            List<File> srcFiles = listFiles(sourcePath, new FileFilter() {
                public boolean accept(File pathname) {
                    return !pathname.getName().endsWith(FILE_EXT_AS)
                        && !pathname.getName().endsWith(APP_XML_SUFFIX)
                        && !pathname.getName().equals(SessionManager.getInstance().getArchiveName() + SWF_FILE_EXTENSION)
                        && !pathname.getName().contains(PATH_MACOSX);
                }
            });

            for (File f : srcFiles) {
                String relativePath = f.getAbsolutePath().substring(sourcePath.length() + 1);
                desFile = new File(bindebugPath, relativePath);
                FileManager.copyFile(f, desFile);
            }

            // Add the top level file/folder under bin-debug folder to the file list,
            // so it will greatly shorten the length of final command line
            File[] archiveFiles = new File(bindebugPath).listFiles(new FileFilter() {
            	// APP_XML_SUFFIX and SWF_FILE_EXTENSION will be added afterwards
                public boolean accept(File pathname) {
                    return !pathname.getName().endsWith(APP_XML_SUFFIX)
                        && !pathname.getName().endsWith(SessionManager.getInstance().getArchiveName() + SWF_FILE_EXTENSION)
                        && !pathname.getName().contains(PATH_MACOSX);
                }
            });
            
            for (File f : archiveFiles) {
            	fileList.add(f);
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
            prepareAppXML(new File(sourcePath, FILE_WEBWORKSAPPTEMPLATE_APP_XML), desFile, swfName);
            fileList.add(desFile);
            
            File bbt = new File(sourcePath, FILE_BLACKBERRY_TABLET_XML);
            File bbtDes = new File(bindebugPath, FILE_BLACKBERRY_TABLET_XML);
            prepareBBTXML(bbt, bbtDes, iconPath, splashscreenFilename);
            
            bbt.delete();
            
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
                buildId = NUM_0;
            }

            String debugToken = _bbwpProperties.getDebugToken();
            String[] cmd;
            if (SessionManager.getInstance().requireSigning()) {
                cmd = new String[] {
                    _airPackagerPath,
                    FLAG_PACKAGE,
                    FLAG_TARGET,
                    FILE_EXT_BAR,
                    FLAG_BUILDID,
                    buildId,
                    outputPath
                };
            } else if (!SessionManager.getInstance().debugMode() || debugToken.isEmpty()) {
                cmd = new String[] {
                    _airPackagerPath,
                    FLAG_PACKAGE,
                    FLAG_DEV_MODE,
                    FLAG_TARGET,
                    SessionManager.getInstance().debugModeInternal() ? PATH_BAR_DEBUG : FILE_EXT_BAR,
                    FLAG_BUILDID,
                    buildId,
                    outputPath
                };
            } else {
                if (!(new File(debugToken).isFile())) {
                    //
                    // It is an error for the <debug_token> element to
                    // contain a pathname that does not point to a file.
                    //
                    throw new PackageException(EXCEPTION_DEBUG_TOKEN_INVALID);
                } else {
                    cmd = new String[] {
                        _airPackagerPath,
                        FLAG_PACKAGE,
                        FLAG_DEV_MODE,
                        FLAG_DEBUG_TOKEN,
                        debugToken,
                        FLAG_TARGET,
                        SessionManager.getInstance().debugModeInternal() ? PATH_BAR_DEBUG : FILE_EXT_BAR,
                        FLAG_BUILDID,
                        buildId,
                        outputPath
                    };
                }
            }
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
                return exitcode.getExitValue().intValue();
            }
        } catch (IOException ioe) {
        	ioe.printStackTrace();
            throw new PackageException(EXCEPTION_AIRPACKAGER);
        } catch (InterruptedException ie) {
            throw new PackageException(EXCEPTION_AIRPACKAGER);        	
        }
        return 0;
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
            System.getProperty(PATH_JAVA_HOME),
            null);
        if (javaBin != null && !javaBin.isEmpty()) {
            javaBin += File.separator + PATH_BIN;
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
                NodeList nl = e.getElementsByTagName(DOC_ELM_INITIALWINDOW);
                if (nl.getLength() > 0 && nl.item(0) instanceof Element) {
                    Element e2 = (Element)nl.item(0);
                    
                    NodeList nl2 = e2.getElementsByTagName(DOC_ELM_CONTENT);
                    if (nl2.getLength() > 0 && nl2.item(0) instanceof Element) {
                        Element e3 = (Element)nl2.item(0);
                        e3.setTextContent(replacementText);
                    }
                    
                    // Add AutoOrientation
                    if (_widgetConfig.getAutoOrientation() != null && _widgetConfig.getAutoOrientation().length() > 0) {
                    	Element autoOrientation = d.createElement(DOC_ELM_AUTOORIENTS);
                    	autoOrientation.setTextContent(_widgetConfig.getAutoOrientation());
                        e2.appendChild(autoOrientation);
                    }                         

                    // Add Orientation
                    if (_widgetConfig.getOrientation() != null && _widgetConfig.getOrientation().length() > 0) {
                    	Element orientation = d.createElement(DOC_ELM_ASPECTRATIO);
                    	orientation.setTextContent(_widgetConfig.getOrientation());
                        e2.appendChild(orientation);
                    }                         

                }
                
                // Replace id
                NodeList nl2 = e.getElementsByTagName(DOC_ELM_ID);
                if (nl2.getLength() > 0 && nl2.item(0) instanceof Element) {
                    Element e3 = (Element)nl2.item(0);
                    e3.setTextContent( sanitizeWidgetName( _widgetConfig.getName() )
                            + genPackageName( sanitizeWidgetName( _widgetConfig.getName() ) ) );
                }
                
                // Replace name
                nl2 = e.getElementsByTagName(DOC_ELM_NAME);
                if (nl2.getLength() > 0 && nl2.item(0) instanceof Element) {
                    Element e3 = (Element)nl2.item(0);
                    e3.setTextContent(_widgetConfig.getName());
                }
                
                // Replace version
                nl2 = e.getElementsByTagName(DOC_ELM_VERSIONNUMBER);
                if (nl2.getLength() > 0 && nl2.item(0) instanceof Element) {
                    Element e3 = (Element)nl2.item(0);
                    e3.setTextContent(_widgetConfig.getVersionParts(0, 3)); // AIR supports only 3-part version strings
                }
                
                // Add description
                if (_widgetConfig.getDescription() != null && _widgetConfig.getDescription().length() > 0) {
                	Element description = d.createElement(DOC_ELM_DESCRIPTION);
                	description.setTextContent(_widgetConfig.getDescription());
                    Node root = d.getFirstChild();
                    root.appendChild(description);
                }
                
                // Add copyright
                if (_bbwpProperties.getCopyright().length() > 0) {
                	Element copyright = d.createElement(DOC_ELM_COPYRIGHT);
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
            String iconPath,
            String splashscreenFilename) // may be null
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
                    Element icon = d.createElement(DOC_ELM_ICON);
                    Node root = d.getFirstChild();
                    root.appendChild(icon);
                 
                    // add image72x72 node
                    Element image = d.createElement(DOC_ELM_IMAGE);
                    image.appendChild(d.createTextNode(iconPath));
                    icon.appendChild(image);                	
                }                

                // Splash screen
                if (splashscreenFilename != null) {
                    Element splashscreen = d.createElement(DOC_ELM_SPLASHSCREEN);
                    splashscreen.appendChild(d.createTextNode(splashscreenFilename));
                    d.getFirstChild().appendChild(splashscreen);
                }

                if (e != null && !_bbwpProperties.getCopyright().isEmpty()) {
                    NodeList nl = e.getElementsByTagName(DOC_ELM_PUBLISHER);
                    if (nl.getLength() > 0 && nl.item(0) instanceof Element) {
                        Element e2 = (Element)nl.item(0);
                        e2.setTextContent(_bbwpProperties.getCopyright());
                    }
                }

                String[] permissions = _widgetConfig.getPermissions();
                Boolean has_access_internet = false;
                if (permissions!=null && permissions.length > 0) {
                	for (int i = 0; i<permissions.length; i++)
                	{
	                	Element curPer = d.createElement("action");
	                	String permissionString = (_permissionMappings.get(permissions[i]));
	                	if (permissionString!=null && !permissionString.isEmpty())
	                	{
	                		curPer.setTextContent(permissionString);
	                		Node root = d.getFirstChild();
	                		root.appendChild(curPer);
	                	}
	                	if (permissions[i] == "access_internet")
	                	{
	                		has_access_internet=true;
	                	}
                	}
                }                       
                if (!has_access_internet)  // hardcoded access_internet to ensure user has internet (whitelist takes care of security)
                {
                	Element curPer = d.createElement("action");
                	String permissionString = "access_internet";
                	curPer.setTextContent(permissionString);
                	Node root = d.getFirstChild();
                	root.appendChild(curPer);                	
                }

            XPath xpathCategory = XPathFactory.newInstance().newXPath();
            NodeList categoryNL = (NodeList) xpathCategory.evaluate( DOC_ELM_CATEGORY_XPATH, d, XPathConstants.NODESET );

            if( categoryNL == null || categoryNL.getLength() == 0 ) {
                Element categoryE = d.createElement( DOC_ELM_CATEGORY );
                categoryE.setTextContent( _widgetConfig.getAppHomeScreenCategory() );
                Node rootN = (Node) xpathCategory.evaluate( DOM_ELM_ROOT_XPATH, d, XPathConstants.NODE );
                rootN.appendChild( categoryE );
            } else {

                for( int i = 0; i < categoryNL.getLength(); i++ ) {
                    categoryNL.item( i ).setTextContent( _widgetConfig.getAppHomeScreenCategory() );
                }
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

            md = MessageDigest.getInstance(MD5);
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
        
        // Only use the first 10 characters as the hash
        // in order not to exceed the limitation of length of package id "easily"
        String shortHash;
        if( packageHash.length() > 10 ) {
            shortHash = packageHash.substring( 0, 10 );
        } else {
            shortHash = packageHash;
        }

        return shortHash;
    }
    
    private static String sanitizeWidgetName( String widgetName ) {
        // Replace all characters that are not alphanumeric with "0"
        String patternInvalidCharacters = "([^a-zA-Z0-9\\.])";
        String sanitizedWidgetName = widgetName.replaceAll( patternInvalidCharacters, "0" );

        // Add "w" in front of the sanitized name
        // because the first letter of packager id cannot be a number
        return "w" + sanitizedWidgetName;
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

    /**
     * Create a splash screen image on disk and return its name, or null
     * if no splash screen is created. A splash screen is not created if
     * the widget config specifies no loading screen data.
     *
     * @param directory the destination folder for the image file, if one
     *        is created. Also used to locate the foreground and background
     *        images.
     *
     * @return the name of the splash screen image file on disk, or null
     * if none created.
     */
    private String createSplashscreen(String directory)
        throws IOException
    {
        // Get string args from widget config. They may be null.
        String arg0 = _widgetConfig.getLoadingScreenColour();
        String arg1 = _widgetConfig.getBackgroundImage();
        String arg2 = _widgetConfig.getForegroundImage();

        //
        // If the widget config doesn't specify loading screen data,
        // do not create a splash screen.
        //
        if (arg0 == null && arg1 == null && arg2 == null) {
            return null;
        }

        Color bgcolor = arg0 == null
            ? Color.WHITE
            : Color.decode(arg0);
        BufferedImage bgImage = arg1 == null
            ? null
            : ImageIO.read(new File(directory, arg1));
        BufferedImage fgImage = arg2 == null
            ? null
            : ImageIO.read(new File(directory, arg2));
        BufferedImage composition = new BufferedImage(SCREEN_WIDTH, SCREEN_HEIGHT, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g = composition.createGraphics();

        g.setBackground(bgcolor);
        g.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

        if (bgImage != null) {
            g.drawImage(bgImage, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, null);
        }

        if (fgImage != null) {
            g.drawImage(fgImage, (SCREEN_WIDTH - fgImage.getWidth())/2, (SCREEN_HEIGHT - fgImage.getHeight())/2, null);
        }

        File out = File.createTempFile(FILE_SPSH, DELIMITER_DOT + SPLASHSCREEN_FORMAT, new File(directory));
        ImageIO.write(composition, SPLASHSCREEN_FORMAT, out);

        return out.getName();
    }
}
