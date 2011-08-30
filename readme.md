# About BlackBerry&reg; WebWorks for Tablet OS
 
The BlackBerry&reg; WebWorks&trade; for Tablet OS Platform allows web and mobile web developers to use the SDK in combination with their development
tooling of choice to develop, test and package up their web applications as BlackBerry WebWorks applications for tablets.
BlackBerry WebWorks applications are distributed through the BlackBerry App World&trade; storefront and run on the BlackBerry&reg; PlayBook&trade;
tablet with access to the hardware.
 
The project is Open Sourced under the Apache 2.0 license [http://github.com/blackberry](http://github.com/blackberry).
 
* Advanced Standards
* Powerful Integration
* Open
 
## Downloads
Full installers for Mac and Windows can be found on the [product download page](http://us.blackberry.com/developers/tablet/webworks.jsp)
 
## Reference Material &amp; Community
You can also find associated reference material for the BlackBerry WebWorks platform as well as community forums for building and contributing to the BlackBerry WebWorks project
 
* [API Reference](http://www.blackberry.com/developers/docs/webworks/api/playbook/)
* [Installation and Developer Guides](http://docs.blackberry.com/en/developers/subcategories/?userType=21&category=BlackBerry+WebWorks+SDK+for+Tablet+OS)
* [Community Forums](http://supportforums.blackberry.com/t5/Web-Development/bd-p/browser_dev)
* [Project Contributor Forums](http://supportforums.blackberry.com/t5/BlackBerry-WebWorks/bd-p/ww_con)
* [Open Source Project Contributor Forums](http://supportforums.blackberry.com/t5/BlackBerry-WebWorks/bd-p/ww_con)
 
## Building the Source Code
 
### Download and install Maven on Windows&reg;
Note: In order to build the source code you must have the [Java SE Development Kit v1.6](http://java.sun.com/javase/downloads/index.jsp#jdk) installed
 
1. The first step is to [Download Maven v3.0](http://maven.apache.org/download.html) and create an installation directory.
2. On the Maven download page, select the _(Binary zip)_ format of the latest Maven v3.0 from the mirror of your choice.
3. When the download is finished, take the file and unzip it to the "C:\Program Files\Apache Software Foundation" directory. If the directory does not exist create it.
4. The second step is to add environmental variables. From the start menu right click on "My Computer" and click on properties. If you are on Windows XP click the advanced tab then click on environmental variables. If you arer using Windows 7 click on advanced systems settings then click on environmental variables.
5. To add the first environmental variable, look under system variables, click on the new button and enter "M2_HOME" (without the quotes) for the variable name and enter the path to your maven installation directory for the variable value e.g. C:\Program Files\Apache Software Foundation\apache-maven-(your version number). Click ok when you're done.
6. Add a second environmental variable with "M2" for the name and "%M2_HOME%\bin" (without the quotes) as the value.
7. If JAVA_HOME is not listed as one of the variables under System Variables then add a new environmental variable with "JAVA_HOME" as the name and the path to you JDK installation directory (not the bin folder) as the value.
8. Click on the Path variable and click edit. Then add the following string to the end of value for path:
 
        "%JAVA_HOME%\bin;%M2%"
     
9. Open up a command prompt and type "mvn --version". _NOTE: If you already had a command prompt open, close it and open a new one so that your changes are reflected._ You should see some information about your maven installation. If you get a prompt stating that the command was not found then you probably made a mistake in one of the previous steps.

### Download and install maven on OSX

Note: In order to build the source code you must have the Java Development Kit version 1.6 installed.


#### Using MacPorts 
It is recommended to install Maven on OSX using MacPorts. If you do not currently have MacPorts you can install it from http://www.macports.org/install.php.

1. Run the following command:
 
        sudo port install maven3
      
2. Run mvn --version to vertify that it is correctly installed.

If you do not wish to use MacPorts simply use the following instructions.

#### Without using MacPorts
1. Extract the distribution archive, i.e. apache-maven-3.0.3-bin.tar.gz to the directory you wish to install Maven 3.0.3. These instructions assume you chose /usr/local/apache-maven. The subdirectory apache-maven-3.0.3 will be created from the archive.
2. In a command terminal, add the M2_HOME environment variable, e.g. export M2_HOME=/usr/local/apache-maven/apache-maven-3.0.3.
3. Add the M2 environment variable, e.g. export M2=$M2_HOME/bin.
4. Optional: Add the MAVEN_OPTS environment variable to specify JVM properties, e.g. export MAVEN_OPTS="-Xms256m -Xmx512m". This environment variable can be used to supply extra options to Maven.
5. Add M2 environment variable to your path, e.g. export PATH=$M2:$PATH.
6. Make sure that JAVA_HOME is set to the location of your JDK, e.g. export JAVA_HOME=/usr/java/jdk1.5.0_02 and that $JAVA_HOME/bin is in your PATH environment variable.
7. Run mvn --version to verify that it is correctly installed.


### Build the project
 
From command line, change directory to the root directory of the WebWorks-TabletOS repository and run the following command:
 
        mvn clean install
 
The first time the build is run it will take up to 5-10 minutes and requires an internet connection. Subsequent builds take around 10-20 seconds.
 
If the build is successful a zip file will be generated in a "target" directory located in the root of WebWorks-TabletOS repository.
 
## Patching Your Existing WebWorks for Tablet OS Installation
 
1. Locate your existing WebWorks SDK for Tablet OS Installation.  Default path is "C:\Program Files\Research In Motion\BlackBerry WebWorks SDK for TabletOS\bbwp"
 
2. In your WebWorks for Tablet OS installlation directory backup the "ext", "bin" and "AirAppTemplates" folders as well as the "bbwp.*" files.
 
3. Unzip the file generated by the build (shown above) into your installation directory.
 
4. Open your old "bin\bbwp.properties" file and copy the path located in the <tablet_sdk> and paste this path into the same <tablet_sdk> element found in your new "bin\bbwp.properties" file
 
5. You can now start building WebWorks applications with the patched SDK