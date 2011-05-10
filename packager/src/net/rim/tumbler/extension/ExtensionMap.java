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
package net.rim.tumbler.extension;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Vector;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import net.rim.tumbler.exception.PackageException;
import net.rim.tumbler.file.FileManager;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class ExtensionMap {

    // need to check in this collection first before creating a new ExtensionDescriptor
    private Map<String, ExtensionDescriptor> _masterList; // map from an entryClass key to the corresponding extension descriptor (of that same entryClass)

    // the elements of the Vector values refer to the same ExtensionDescriptor instances as in _masterList, so that you only need to mark it copied ONCE
    private Hashtable<String, Vector<ExtensionDescriptor>> _featureIdToDescriptors; // many-to-many mapping from feature ID key to required extension descriptors
    
    private ExtensionDependencyManager _dependencyManager;

    public ExtensionMap(String platform, String version, String repositoryRoot) {
        _masterList = new LinkedHashMap<String, ExtensionDescriptor>();
        _featureIdToDescriptors = new Hashtable<String, Vector<ExtensionDescriptor>>();
        _dependencyManager = new ExtensionDependencyManager(_masterList);

        File root = new File(repositoryRoot);
        // Note that it's possible that the ext folder doesn't even exist
        if (root.isDirectory()) {
            File[] extFolders = root.getAbsoluteFile().listFiles(new FileFilter() {
                public boolean accept(File pathname) {
                    return pathname.isDirectory()
                        && new File(pathname, "/library.xml").isFile();
                }
            });


            for (File extFolder : extFolders) {
                try {
                    Document document = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(new File(extFolder, "/library.xml"));
                    Element e = document.getDocumentElement();
                    if (e != null) {
                        NodeList nl = e.getElementsByTagName("extension");
                        if (nl.getLength() > 0 && nl.item(0) instanceof Element) {
                            Element e2 = (Element)nl.item(0);
                            String id = e2.getAttribute("id");

                            NodeList nl2 = e2.getElementsByTagName("entryClass");
                            if (nl2.getLength() > 0 && nl2.item(0) instanceof Element) {
                                Element e3 = (Element)nl2.item(0);
                                String entryClass = e3.getTextContent();

                                ExtensionDescriptor descriptor;
                                if (_masterList.containsKey(id)) {
                                    descriptor = _masterList.get(id);
                                } else {
                                    descriptor = new ExtensionDescriptor(id, entryClass, extFolder.getAbsolutePath());
                                    _masterList.put(id, descriptor);

                                    populateDescriptor(
                                        descriptor,
                                        e,
                                        e2,
                                        extFolder,
                                        platform,
                                        version);
                                }

                                NodeList nl9 = e.getElementsByTagName("features");
                                if (nl9.getLength() > 0 && nl9.item(0) instanceof Element) {
                                    Element e6 = (Element)nl9.item(0);

                                    NodeList nl0 = e6.getElementsByTagName("feature");

                                    for (int n = 0; n < nl0.getLength(); n++) {
                                        String featureID = ((Element)nl0.item(n)).getAttribute("id");

                                        Vector<ExtensionDescriptor> v;
                                        if (!_featureIdToDescriptors.containsKey(featureID)) {
                                            v = new Vector<ExtensionDescriptor>();
                                            _featureIdToDescriptors.put(featureID, v);
                                        } else {
                                            v = _featureIdToDescriptors.get(featureID);
                                        }
                                        v.add(descriptor);
                                    }
                                }
                            }
                        }
                    }
                } catch (IOException ioe) {
                    // log it?
                } catch (ParserConfigurationException pce) {
                    // log it?
                } catch (SAXException se) {
                    // log it?
                }
            }
        }
    }

    // helper method
    private static void populateDescriptor(
        ExtensionDescriptor descriptor,
        Element e,
        Element eExt,
        File extFolder,
        String platform,
        String version)
    {
    	XPath xpath = XPathFactory.newInstance().newXPath();
    	try {
			NodeList nodes = (NodeList) xpath.evaluate("dependencies/extension/@id", eExt, XPathConstants.NODESET);
			
			for (int n = 0; n < nodes.getLength(); n++) {
				descriptor.addDependency(nodes.item(n).getNodeValue());
			}
		} catch (XPathExpressionException e1) {
			// log it?
		}	
    	
        NodeList nl3 = e.getElementsByTagName("platforms");
        if (nl3.getLength() > 0 && nl3.item(0) instanceof Element) {
            Element e4 = (Element)nl3.item(0);

            NodeList nl4 = e4.getElementsByTagName("platform");
            String config = null;
            for (int i = 0; config == null && i < nl4.getLength(); i++) {
                if (((Element)nl4.item(i)).getAttribute("value").equals(platform)) {
                    NodeList nl5 = ((Element)nl4.item(i)).getElementsByTagName("target");
                    for (int j = 0; j < nl5.getLength(); j++) {
                        if (((Element)nl5.item(j)).getAttribute("version").equals(version)) {
                            config = ((Element)nl5.item(j)).getAttribute("config");
                            break;
                        }
                    }
                }
            }

            if (config == null) {
                // no config found for the specified platform and version
                //TODO: log it
            } else {
                NodeList nl6 = e.getElementsByTagName("configurations");
                if (nl6.getLength() > 0 && nl6.item(0) instanceof Element) {
                    Element e5 = (Element)nl6.item(0);

                    NodeList nl7 = e5.getElementsByTagName("configuration");
                    for (int k = 0; k < nl7.getLength(); k++) {
                        if (((Element)nl7.item(k)).getAttribute("name").equals(config)) {
                            NodeList nl8 = ((Element)nl7.item(k)).getElementsByTagName("src");
                            for (int m = 0; m < nl8.getLength(); m++) {
                                String path = ((Element)nl8.item(m)).getAttribute("path");
                                // trim whitespace, then remove trailing '/' or '\\' characters
                                path = FileManager.removeTrailingSeparators(path.trim());
                                if (path.length() > 0) {
                                    File f = new File(extFolder, path);
                                    if (f.isDirectory()) {
                                        addFilesRecursively(descriptor, f, path, "");
                                    } else if (f.isFile()) {
                                        descriptor.addConfiguredPathname(path);
                                    }
                                }
                            }
                            break;
                        }
                    }
                }
            }
        }
    }

    // recursive helper method
    // directory.isDirectory() is assumed to be true
    private static void addFilesRecursively(
        ExtensionDescriptor descriptor,
        File directory,
        String relativePath,
        String pkg)
    {
        for (String s : directory.list()) {
            String relativeToExtDir = relativePath + File.separator + s;

            String relativeToPackage;
            if (pkg.length() > 0) {
                relativeToPackage = pkg + File.separator + s;
            } else {
                relativeToPackage = s;
            }

            File f = new File(directory, s);

            if (f.isDirectory()) {
                addFilesRecursively(descriptor, f, relativeToExtDir, relativeToPackage);
            } else if (f.isFile()) {
                descriptor.addConfiguredPathname(relativeToExtDir, relativeToPackage);
            }
        }
    }

    public void copyRequiredFiles(String outputFolder, String featureID)
        throws IOException, PackageException
    {
        if (_featureIdToDescriptors.containsKey(featureID)) {
            for (ExtensionDescriptor descriptor : _featureIdToDescriptors.get(featureID)) {
            	HashSet<String> resolvedDependencies = _dependencyManager.resolveExtension(descriptor.getId());
            	
				for (String depId : resolvedDependencies) {
					ExtensionDescriptor depDescriptor = _masterList.get(depId);
					
					if (!depDescriptor.isCopied()) {
						//
						// The prefix for javascript files. This can be
						// prepended
						// as-is to the configured pathname.
						//
						String javascriptPrefix = outputFolder
								+ File.separator
								+ "WebWorksApplicationSharedJsRepository0"
								+ File.separator
								+ getEscapedEntryClass(depDescriptor
										.getEntryClass()) + File.separator;

						//
						// The partial prefix for actionscript files. This needs
						// the folder structure such that it matches
						// the package name.
						//
						String actionscriptPrefix = outputFolder
								+ File.separator;

						for (ConfiguredPathname pathname : depDescriptor
								.getConfiguredPathnames()) {
							if (pathname.getPathname().endsWith(".js")) {
								//
								// This is javascript and therefore has no
								// package.
								// Copy to javascriptPrefix +
								// pathname.getPathname().
								//
								FileManager.copyFile(new File(depDescriptor
										.getRootFolder(), pathname
										.getPathname()), new File(
										javascriptPrefix
												+ pathname.getPathname()));
							} else if (pathname.getRelativeToPackage() != null) {
								//
								// This is something other than javascript and
								// presumably has
								// the notion of a package (e.g., ActionScript
								// or Java).
								// Copy to actionscriptPrefix +
								// pathname.getRelativeToPackage().
								//
								FileManager
										.copyFile(
												new File(depDescriptor
														.getRootFolder(),
														pathname.getPathname()),
												new File(
														actionscriptPrefix
																+ pathname
																		.getRelativeToPackage()));
							} else {
								// unexpected file type
								// TODO: log it
							}
						}

						depDescriptor.markCopied();
					}
                }
            }
        }
    }

    // get only those files that end with the specified suffix (and that are marked copied)
    // prepend the specified prefix to each entry
    public void getCopiedFiles(String suffix, Map<String, Vector<String>> result, String prefix) {
        for (ExtensionDescriptor descriptor : _masterList.values()) {
            if (descriptor.isCopied()) {
                String entryClass = descriptor.getEntryClass();
                Vector<String> v = new Vector<String>();
                for (ConfiguredPathname pathname : descriptor.getConfiguredPathnames()) {
                    if (pathname.getPathname().endsWith(suffix)) {
                        v.add(prefix + getEscapedEntryClass(entryClass) + File.separator + pathname.getPathname());
                    }
                }
                result.put(entryClass, v);
            }
        }
    }

    // simply replace all occurrences of "." with "_"
    private static String getEscapedEntryClass(String entryClass) {
        return entryClass.replace(".", "_");
    }
}
