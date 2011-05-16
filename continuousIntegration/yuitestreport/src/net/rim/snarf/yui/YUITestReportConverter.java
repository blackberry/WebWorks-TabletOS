package net.rim.snarf.yui;

import java.io.File;

import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class YUITestReportConverter {
	private File _yuiTestReportFile;
	
	public YUITestReportConverter(String reportFilePath) {
		_yuiTestReportFile= new File(reportFilePath);
	}
	
	public void convert() throws Exception{
		Document yuiXMLDoc=XMLUtil.openXmlFile(_yuiTestReportFile, false);
        if (yuiXMLDoc != null) {
            XPath xPath=XPathFactory.newInstance().newXPath();
            NodeList nodeList=(NodeList)xPath.evaluate("/testsuites/testsuite", yuiXMLDoc, XPathConstants.NODESET);
            for (int i=0; i<nodeList.getLength(); i++) {
                Node node=nodeList.item( i );
                if (node instanceof Element) {
                	createTestReport((Element)node);
                }
            }
        }
	}
	
	void createTestReport(Element testsuiteElement) throws Exception{
		Document testReportDoc= XMLUtil.newDocument();
		Node newNode=testReportDoc.importNode(testsuiteElement, true);
		testReportDoc.appendChild(newNode);
		
		// get the real amount of running test cases
		XPath xPath=XPathFactory.newInstance().newXPath();
		NodeList testcaseNodeList=(NodeList)xPath.evaluate("/testsuite/testcase", testReportDoc, XPathConstants.NODESET);
		((Element)newNode).setAttribute("tests", String.valueOf(testcaseNodeList.getLength()));
		
		// get the amount of errors
		NodeList errorNodeList=(NodeList)xPath.evaluate("/testsuite/testcase/error", testReportDoc, XPathConstants.NODESET);
		System.out.println(errorNodeList.getLength());
		((Element)newNode).setAttribute("errors", String.valueOf(errorNodeList.getLength()));
		
		// create the new xml report file
		String testsuiteName=testsuiteElement.getAttribute("name");
		XMLUtil.writeXmlFile(testReportDoc, getTargetFilePath(testsuiteName), "UTF-8", "no");
	}
	
	String getTargetFilePath(String testsuiteName) throws Exception{
		String fileName="TEST-"+testsuiteName.replaceAll(" ", "_")+".xml";
		File targetFile=new File(_yuiTestReportFile.getParent(), fileName);
		return targetFile.getCanonicalPath();
	}
	
	public static void main(String[] args) {
		String yuitestreport=null;
		if ((args != null) && (args.length > 0)) {
			yuitestreport=args[0];
		}else {
			yuitestreport="C:/DevProjects/Spider/Eclipse3.6.0/workspace-2.1.0/yuitestreport/2.0.0.5_result.xml";
		}
		
		try {
			YUITestReportConverter converter=new YUITestReportConverter(yuitestreport);
			converter.convert();
		}catch(Exception ex) {
			System.out.println("exception:"+ex.getMessage());
		}
	}
}
