package net.rim.snarf.yui;

/*********************************************************************
 * PluginConfiguration.java
 *
 * Copyright (c) 2006 Research In Motion Inc.  All rights reserved.
 * This file contains confidential and propreitary information
 *
 * Creation date: Sep 14, 2006 4:45:08 PM
 *
 * File:          $File$
 * Revision:      $Revision:$
 * Checked in by: $Author:$
 * Last modified: $DateTime:$
 *
 *********************************************************************/

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Task;

/***
 * 
 * @author jluo
 * 
 *         Here is an example illustrating how to use this task in ANT 
 *         <YUIConverterAntTask testReportPath=""/>
 * 
 */
public class YUITestReportConverterAntTask extends Task {

    String _testReportPath;

    public void execute() throws BuildException {

        try {
        	log("testReportPath: "+getTestReportPath());
        	
    		YUITestReportConverter converter=new YUITestReportConverter(getTestReportPath());
    		converter.convert();
        	
        } catch( Exception ex ) {
            log( "Exception: " + ex.getMessage() );
            throw new BuildException( ex.getMessage() );
        }
    }
    public String getTestReportPath() {
        return _testReportPath;
    }

    public void setTestReportPath( String testReportPath ) {
    	_testReportPath = testReportPath;
    }

}
