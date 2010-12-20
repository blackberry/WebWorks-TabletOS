package webworks.config
{
import webworks.access.Access;
import webworks.access.Feature;
import webworks.config.ConfigConstants;

   public class CustomData
   {
// constants
        public static const values:Object = {

        "configXML" : "config.xml",
        "content" : "index.html", //"http://www.google.com",
        "author" : "Lev",
        "name" : "invoked3.1.5step1",
        "foregroundSource" : "http://www.google.com",
        "icon" : "icon.jpg",
        "disableAllCache" :  true,
        "accessList" : new Array(
                new Access(
                    "file:///mlc/sandboxes/guest",
                    false,
                    null
                )
            ,
                new Access(
                    "http://google.com",
                    true,
                    null
                )
            ,
                new Access(
                    "http://wikipedia.org",
                    true,
                    null
                )
            ,
                new Access(
                    "file:///store/home/user",
                    false,
                    null
                )
            ,
                new Access(
                    ConfigConstants.WIDGET_LOCAL_DOMAIN,
                    true,
                    new Array(
                        new Feature(
                            "Screen",
                            true,
                            "",
                            null),
                        new Feature(
                            "blackberry.app",
                            true,
                            "1.0.0.0",
                            null)
                    )
                )
            ,
                new Access(
                    "about:blank",
                    false,
                    null
                )
            ,
                new Access(
                    "http://google.ca",
                    true,
                    null
                )
            ,
                new Access(
                    "http://rim.net",
                    true,
                    new Array(
                        new Feature(
                            "Screen",
                            true,
                            "",
                            null),
                        new Feature(
                            "blackberry.app",
                            true,
                            "1.0.0.0",
                            null)
                    )
                )
            ),
		
    "name" : "value"
        }
    }
}