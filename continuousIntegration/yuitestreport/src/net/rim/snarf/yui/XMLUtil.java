/*********************************************************************
 * XMLUtil.java
 *
 * Copyright (c) 2009 Research In Motion Inc.  All rights reserved.
 * This file contains confidential and propreitary information
 *
 * Creation date: Apr 2, 2009 1:37:28 PM
 *
 * File:          $File$
 * Revision:      $Revision:$
 * Checked in by: $Author:$
 * Last modified: $DateTime:$
 *
 *********************************************************************/

package net.rim.snarf.yui;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

/**
 * @author jluo
 *
 */
public class XMLUtil {
    public static void writeXmlFile(Document doc, String filename) throws Exception{
        writeXmlFile(doc, filename, "ISO-8859-1", "no");
    }
    
    public static void writeXmlFile(Document doc, String filename, 
        String encoding, String omitXmlDeclaration) throws Exception{

        // Prepare the DOM document for writing
        Source source = new DOMSource(doc);

        // Prepare the output file
        File file = new File(filename);
        Result result = new StreamResult(file);

        // Write the DOM document to the file
        Transformer transformer = TransformerFactory.newInstance().newTransformer();
        transformer.setOutputProperty(OutputKeys.METHOD, "xml");
        transformer.setOutputProperty(OutputKeys.INDENT, "yes");
        transformer.setOutputProperty(OutputKeys.ENCODING, encoding);
        transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, omitXmlDeclaration);
        
        transformer.transform(source, result);
    }

    public static Document openXmlFile(String filename, boolean validating) {
        return openXmlFile(new File(filename), validating);
    }
    
    public static Document openXmlFile(File file, boolean validating) {
        try {
            // Create a builder factory
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setValidating(validating);

            // Create the builder and parse the file
            Document doc = factory.newDocumentBuilder().parse(file);
            return doc;
        } catch (SAXException e) {
            // A parsing error occurred; the xml input is not valid
        } catch (ParserConfigurationException ex) {
            System.out.println(ex.getMessage());
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
        }
        
        return null;
    }
    
    public static Document newDocument() {
    	Document doc=null;
    	try {
    		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
    		doc=factory.newDocumentBuilder().newDocument();
    	}catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    	
    	return doc;
    }
    
    
    public static String evaluate(File xmlFile, String xPathExpression) {
        String result=null;
        
        try {
                XPathFactory factory=XPathFactory.newInstance();
                XPath xPath=factory.newXPath();
                result=xPath.evaluate(xPathExpression, new InputSource(new FileInputStream(xmlFile)));
        }catch (Exception ex) {
                System.out.println(ex.getMessage());
        }
        
        return result;
    }

}

