(function() {
	var framework = YUI.framework;
	try {
	    //alert(blackberry.system.softwareVersion);
		//if (blackberry.system.softwareVersion == "QNX"){
		if ((blackberry.system.softwareVersion == "Blackberry Tablet OS")||(blackberry.system.softwareVersion == "QNX")){
			//on playbook
			framework.device = "Playbook";
			framework.yuiTestsToRunArray = [
				YUI.framework.testDomain +"/yui/playbook/pb_app_yui.js",
				YUI.framework.testDomain +"/yui/playbook/pb_app_yui_bindings.js",
				YUI.framework.testDomain +"/yui/playbook/pb_uri_app_yui.js",
				YUI.framework.testDomain +"/yui/playbook/pb_uri_app_yui_bindings.js",		
				YUI.framework.testDomain +"/yui/playbook/pb_dialog_yui.js",
				YUI.framework.testDomain +"/yui/playbook/pb_dialog_yui_bindings.js",
			    YUI.framework.testDomain +"/yui/playbook/pb_invoke_yui.js",
				YUI.framework.testDomain +"/yui/playbook/pb_invoke_yui_bindings.js",
				YUI.framework.testDomain +"/yui/playbook/pb_invoke_browserarguments_yui.js",
				YUI.framework.testDomain +"/yui/playbook/pb_invoke_browserarguments_yui_bindings.js",
				YUI.framework.testDomain +"/yui/playbook/pb_invoke_cameraarguments_yui.js",
				YUI.framework.testDomain +"/yui/playbook/pb_invoke_cameraarguments_yui_bindings.js",
				YUI.framework.testDomain +"/yui/playbook/pb_system_yui.js",
				YUI.framework.testDomain +"/yui/playbook/pb_system_yui_bindings.js",
				YUI.framework.testDomain +"/yui/playbook/pb_system_uri_yui.js",
				YUI.framework.testDomain +"/yui/playbook/pb_system_uri_yui_bindings.js",
				YUI.framework.testDomain +"/yui/playbook/pb_utils_yui.js",
				YUI.framework.testDomain +"/yui/playbook/pb_utils_yui_bindings.js",
				//"playbook/pb_deviceorientation_yui.js",
				
			];
		}
		else{
			//on blackberry
			framework.device = "Blackberry";
			framework.yuiTestsToRunArray = [
			
			
			YUI.framework.testDomain +"/yui/blackberry/bb_utils_yui.js",
			YUI.framework.testDomain +"/yui/blackberry/bb_utils_yui_bindings.js",
			YUI.framework.testDomain +"/yui/blackberry/bb_dialog_yui.js",
			YUI.framework.testDomain +"/yui/blackberry/bb_dialog_yui_bindings.js",			
			YUI.framework.testDomain +"/yui/blackberry/bb_menu_yui.js",
			YUI.framework.testDomain +"/yui/blackberry/bb_menu_yui_bindings.js",
			YUI.framework.testDomain +"/yui/blackberry/bb_push_yui.js",
			YUI.framework.testDomain +"/yui/blackberry/bb_push_yui_bindings.js",
			YUI.framework.testDomain +"/yui/blackberry/bb_identity_yui.js",
			YUI.framework.testDomain +"/yui/blackberry/bb_identity_yui_bindings.js",
			YUI.framework.testDomain +"/yui/blackberry/bb_io_yui.js",
			YUI.framework.testDomain +"/yui/blackberry/bb_io_yui_bindings.js",
			YUI.framework.testDomain +"/yui/blackberry/bb_system_yui.js",
			YUI.framework.testDomain +"/yui/blackberry/bb_system_yui_bindings.js",	
/*
			YUI.framework.testDomain +"/yui/blackberry/bb_invoke_yui.js", 
			YUI.framework.testDomain +"/yui/html5/html5_webstorage_yui.js",
			YUI.framework.testDomain +"/yui/html5/html5_dom_yui.js",
			YUI.framework.testDomain +"/yui/html5/html5_http_yui.js",
			YUI.framework.testDomain +"/yui/html5/html5_xslt_yui.js",
			YUI.framework.testDomain +"/yui/html5/html5_messaging_yui.js",
			YUI.framework.testDomain +"/yui/html5/manual.js",
			*/
		/*	
			YUI.framework.testDomain +"/yui/blackberry/bb_message_sms_yui.js",
			YUI.framework.testDomain +"/yui/blackberry/bb_message_sms_yui_bindings.js",
			
			YUI.framework.testDomain + "/yui/blackberry/bb_phone_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_phone_yui_bindings.js",
			
			YUI.framework.testDomain + "/yui/blackberry/bb_audio_player_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_audio_player_yui_bindings.js",
			*/
			//"/yui/blackberry/bb_utils_yui_bindings.js",
			//"/yui/blackberry/bb_utils_yui.js",
			//"/yui/blackberry/bb_system_yui.js",
			//"/yui/blackberry/bb_system_yui_bindings.js",			
			//"/yui/blackberry/bb_dialog_yui.js",
			//"/yui/blackberry/bb_dialog_yui_bindings.js",			
			//"/yui/blackberry/bb_menu_yui.js",
			//"/yui/blackberry/bb_menu_yui_bindings.js",
			//"/yui/blackberry/bb_push_yui.js",
			//"/yui/blackberry/bb_push_yui_bindings.js",
			//"blackberry/bb_identity_yui.js",
			//"blackberry/bb_identity_yui_bindings.js",
			//"/yui/blackberry/bb_io_yui.js",
			//"/yui/blackberry/bb_io_yui_bindings.js",
			//"/yui/blackberry/bb_invoke_yui.js", 
		
			//"/yui/blackberry/bb_message_sms_yui.js",
			//"/yui/blackberry/bb_message_sms_yui_bindings.js",
			
			// "/yui/blackberry/bb_phone_yui.js",
			// "/yui/blackberry/bb_phone_yui_bindings.js",
			
			// "/yui/blackberry/bb_audio_player_yui.js",
			// "/yui/blackberry/bb_audio_player_yui_bindings.js",
			
			//YUI.framework.testDomain + "/yui/blackberry/bb_app_yui.js",
			//YUI.framework.testDomain + "/yui/blackberry/bb_app_yui_bindings.js",
			/*
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_yui_bindings.js",
			
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_addressbookarguments_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_addressbookarguments_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_browserarguments_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_browserarguments_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_calendararguments_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_calendararguments_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_cameraarguments_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_cameraarguments_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_javaarguments_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_javaarguments_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_mapsarguments_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_mapsarguments_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_memoarguments_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_memoarguments_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_messagearguments_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_messagearguments_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_phonearguments_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_phonearguments_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_searcharguments_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_searcharguments_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_taskarguments_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_invoke_taskarguments_yui_bindings.js",
			*/
			/*
			
			YUI.framework.testDomain + "/yui/blackberry/bb_find_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_find_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_message_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_message_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_pim_address_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_pim_address_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_pim_appointment_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_pim_appointment_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_pim_attendee_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_pim_attendee_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_pim_category_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_pim_category_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_pim_contact_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_pim_contact_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_pim_memo_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_pim_memo_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_pim_recurrence_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_pim_recurrence_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_pim_reminder_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_pim_reminder_yui_bindings.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_pim_task_yui.js",
			YUI.framework.testDomain + "/yui/blackberry/bb_pim_task_yui_bindings.js",			
			*/
			];
		}
	}
	catch (e) {
		//on desktop
		framework.device = "Playbook"; //bug in blackberry.system loading, remove later and change to "Desktop"
        framework.yuiTestsToRunArray = [
				YUI.framework.testDomain +"/yui/playbook/pb_app_yui.js",
				YUI.framework.testDomain +"/yui/playbook/pb_app_yui_bindings.js",
				YUI.framework.testDomain +"/yui/playbook/pb_dialog_yui.js",
				YUI.framework.testDomain +"/yui/playbook/pb_dialog_yui_bindings.js",
			    YUI.framework.testDomain +"/yui/playbook/pb_invoke_yui.js",
				YUI.framework.testDomain +"/yui/playbook/pb_invoke_yui_bindings.js",
				YUI.framework.testDomain +"/yui/playbook/pb_invoke_browserarguments_yui.js",
				YUI.framework.testDomain +"/yui/playbook/pb_invoke_browserarguments_yui_bindings.js",
				YUI.framework.testDomain +"/yui/playbook/pb_invoke_cameraarguments_yui.js",
				YUI.framework.testDomain +"/yui/playbook/pb_invoke_cameraarguments_yui_bindings.js",
				YUI.framework.testDomain +"/yui/playbook/pb_system_yui.js",
				YUI.framework.testDomain +"/yui/playbook/pb_system_yui_bindings.js",
				YUI.framework.testDomain +"/yui/playbook/pb_utils_yui.js",
				YUI.framework.testDomain +"/yui/playbook/pb_utils_yui_bindings.js",
				//"playbook/pb_deviceorientation_yui.js",
				
			];
	}

})();