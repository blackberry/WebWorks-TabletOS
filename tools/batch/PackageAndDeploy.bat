REM Written by Matthew Haag / haagmm : at : gmail.com
REM For depoloyment to the Blackberry Playbook Simulator
REM Replace your IP/Name/Password/InstallDir for mine.

REM this depends on info-zip which is available for MOST platforms here : http://www.info-zip.org/FAQ.html#download


SET ip=192.168.1.128
SET name=myApp
SET password=aaaaaa
SET installDir="C:\rim\playbook\BlackBerry WebWorks Packager for PlayBook\bbwp"
SET old_Java_home=%JAVA_HOME%
SET JAVA_HOME=%installDir%\..\jre\bin

zip -0 -r %name%.zip * -x .* *.exe *.bar *.zip *.bat
%installDir%\bbwp %name%.zip /o ./
%installDir%\blackberry-tablet-sdk\bin\blackberry-deploy -installApp -password %password% -device %ip% -devMode -package %name%.bar

SET JAVA_HOME=%old_Java_home%
