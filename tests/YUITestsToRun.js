(function() {
	var framework = YUI.framework;
	try {	
		if (blackberry.system.softwareVersion == "QNX"){
			//on playbook
			framework.device = "Playbook";
			framework.yuiTestsToRunArray = [
				"playbook/pb_app_yui.js",
				"playbook/pb_app_yui_bindings.js",
				"playbook/pb_dialog_yui.js",
				"playbook/pb_dialog_yui_bindings.js",
			    "playbook/pb_invoke_yui.js",
				"playbook/pb_invoke_yui_bindings.js",
				"playbook/pb_invoke_browserarguments_yui.js",
				"playbook/pb_invoke_browserarguments_yui_bindings.js",
				"playbook/pb_invoke_cameraarguments_yui.js",
				"playbook/pb_invoke_cameraarguments_yui_bindings.js",
				"playbook/pb_system_yui.js",
				"playbook/pb_system_yui_bindings.js",
				"playbook/pb_utils_yui.js",
				"playbook/pb_utils_yui_bindings.js",
			];
		}
		else{
			//on blackberry
			framework.device = "Blackberry";
			framework.yuiTestsToRunArray = [
			"blackberry/bb_app_yui.js", 
			"blackberry/bb_utils_yui.js", 
			"blackberry/bb_system_yui.js", 
			"blackberry/bb_dialog_yui.js", 
			"blackberry/bb_invoke_yui.js", 
			"html5/html5_webstorage_yui.js",
			"html5/html5_dom_yui.js",
			"html5/html5_http_yui.js",
			"html5/html5_xslt_yui.js",
			"html5/html5_messaging_yui.js",
			"html5/manual.js",
			];
		}
	}
	catch (e) {
		//on desktop
		framework.device = "Desktop";
		framework.yuiTestsToRunArray = [
			"playbook/pb_app_yui.js",
			"playbook/pb_app_yui_bindings.js",
			"playbook/pb_dialog_yui.js",
			"playbook/pb_dialog_yui_bindings.js",
			"playbook/pb_invoke_addressbookarguments_yui.js",
			"playbook/pb_invoke_addressbookarguments_yui_bindings.js",
			"playbook/pb_invoke_browserarguments_yui.js",
			"playbook/pb_invoke_browserarguments_yui_bindings.js",
			"playbook/pb_invoke_calendararguments_yui.js",
			"playbook/pb_invoke_calendararguments_yui_bindings.js",
			"playbook/pb_invoke_cameraarguments_yui.js",
			"playbook/pb_invoke_cameraarguments_yui_bindings.js",
			"playbook/pb_invoke_javaarguments_yui.js",
			"playbook/pb_invoke_javaarguments_yui_bindings.js",
			"playbook/pb_invoke_mapsarguments_yui.js",
			"playbook/pb_invoke_mapsarguments_yui_bindings.js",
			"playbook/pb_invoke_memoarguments_yui.js",
			"playbook/pb_invoke_memoarguments_yui_bindings.js",
			"playbook/pb_invoke_messagearguments_yui.js",
			"playbook/pb_invoke_messagearguments_yui_bindings.js",
			"playbook/pb_invoke_phonearguments_yui.js",
			"playbook/pb_invoke_phonearguments_yui_bindings.js",
			"playbook/pb_invoke_searcharguments_yui.js",
			"playbook/pb_invoke_searcharguments_yui_bindings.js",
			"playbook/pb_invoke_taskarguments_yui.js",
			"playbook/pb_invoke_taskarguments_yui_bindings.js",
			"playbook/pb_invoke_yui.js",
			"playbook/pb_invoke_yui_bindings.js",
			"playbook/pb_system_yui.js",
			"playbook/pb_system_yui_bindings.js",
			"playbook/pb_utils_yui.js",
			"playbook/pb_utils_yui_bindings.js",
		];
	}

})();