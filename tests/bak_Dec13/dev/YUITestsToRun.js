(function() {
	var framework = YUI.framework;
	try {	
		if (blackberry.system.softwareVersion == "QNX"){
			//on playbook
			framework.device = "Playbook";
			framework.yuiTestsToRunArray = [
			"playbook/pb_tests.js",
			];
		}
		else{
			//on blackberry
			framework.device = "Blackberry";
			framework.yuiTestsToRunArray = [
			"blackberry/bb_tests.js",
			];
		}
	}
	catch (e) {
		//on desktop
		framework.device = "Desktop";
		framework.yuiTestsToRunArray = [
		"qcsample/yui_qc_sample_tests.js",
		"qcsample/yui_qc_sample_tests_bindings.js",
		];
	}
})();