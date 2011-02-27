#A Basic Application Skeleton

This is a basic application skeleton to get you started. Below, some of the highlights are discussed

##skeleton/build.xml
Probably the single greatest feature in this skeleton, this is a [ Apache Ant](http://ant.apache.org/) build file to build and deploy your application. All you need to do is tell it:

 * your similator password
 * the simulator IP
 * possibly change the install directory of the Playbook SDK (optional, it's already configured with the default for 64-bit Windows 7)

Then in the application's root directory run `ant` (assuming you have ant installed) to build and install your application on the simulator. See the source for more details on the individual targets.

##skeleton/app
I put the app itself in a subdirectory because some tools like putting config files in root directories. It's really up to you.

##skeleton/app/index.html
A basic HTML page with some CSS style and JavaScript files already associated, nothing too special

##skeleton/app/config.xml
A very basic config.xml to get you started. It already specifies the application starting page and a default icon.
