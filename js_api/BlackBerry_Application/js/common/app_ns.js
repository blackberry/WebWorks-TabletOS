(function () {
	//We will not attach ourselves if the blackberry namespace doesn't exist
	if(!this.blackberry) {
		return;
	}
	
	var bb = this.blackberry;
	var disp = this.blackberry.app.dispatcher;
	
	bb.app = {
		
		/*
		 * This function will cause the application to exit.
		 */
		exit : disp.exit,
		
		/*
		 * This function will move the application to the background.
		 */
		requestBackground : disp.requestBackground,
		
		/*
		 * This function will move the application to the foreground.
		 */
		requestForeground : disp.requestForeground,
		
		/*
		 * This method will set the icon that appears in the Home Screen of the device.
		 * 
		 * @param uri Fully qualified, white-listed path to the image resource, for example: local:///resourceFolder/icons/icon.png.
		 * @param hover Optional - If set to true then the hover icon for the application is changed. Set to false by default.
		 * 
		 * @return True if successful, false otherwise. Changes are not persisted across device resets. On PlayBook always returns
		 * 			false as this operation is not supported.
		 */
		setHomeScreenIcon : disp.setHomeScreenIcon,
		
		/*
		 * This method will set the text for the icon that appears in the Home Screen of the device.
		 * 
		 * @param text Text to appear on the home screen icon.
		 * 
		 * @return True if successful, false otherwise. Changes are not persisted across device resets. On PlayBook always returns
		 * 			false as this operation is not supported.
		 */
		setHomeScreenName :  disp.setHomeScreenName
		
	};
	
	/*
	 * Getters for read-only properties
	 */
	bb.app.__defineGetter__("author", disp.author);
	bb.app.__defineGetter__("authorEmail", disp.authorEmail);
	bb.app.__defineGetter__("authorURL", disp.authorURL);
	bb.app.__defineGetter__("copyright", disp.copyright);
	bb.app.__defineGetter__("description", disp.description);
	bb.app.__defineGetter__("id", disp.id);
	bb.app.__defineGetter__("isForeground", disp.isForeground);
	bb.app.__defineGetter__("license", disp.license);
	bb.app.__defineGetter__("licenseURL", disp.licenseURL);
	bb.app.__defineGetter__("name", disp.name);
	bb.app.__defineGetter__("version", disp.version);
})();
