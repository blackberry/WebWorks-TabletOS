/*
* Copyright 2010-2011 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package blackberry.ui.dialog
{
    import flash.events.Event;
    import flash.utils.*;

    import qnx.dialog.AlertDialog;
    import qnx.display.IowWindow;

    import webworks.extension.DefaultExtension;

    /**
     *
     * Dialog extension for creating a dialog.
     * Two JavaScript APIs are currently supported by this extension
     *
     * 	static  void   customAsk ( message : String ,  buttons : String[] ,  onClick: String , [settings : String[] )
     * 	static  void   standardAsk ( message : String , type : Number , onClick :String, [settings: String[] ))
     *
     * author - Nukul Bhasin * Carolina Pinzon (Software Developers - Research in Motion)
     *
     */

    public class Dialog extends DefaultExtension
    {
        private static const LOC_BOTTOM:String = "bottomCenter";
        private static const LOC_CENTER:String = "middleCenter";
        private static const LOC_TOP:String = "topCenter";

        private static const SIZE_FULL:String = "full";
        private static const SIZE_LARGE:String = "large";
        private static const SIZE_MEDIUM:String = "medium";
        private static const SIZE_SMALL:String = "small";
        private static const SIZE_TALL:String = "tall";

        private const FEATUREID:Array = new Array("blackberry.ui.dialog");

        public function Dialog()
        {
            super();
        }

        override public function getFeatureList():Array
        {
            return FEATUREID;
        }

        public function ask(eMessage:String, eButtons:String, eOnClick:String, ... eSettings):void
        {
            var eNewSettings:Dictionary = dialogProperties();
            var buttons:Array = eButtons.split(",");
            var myDialog:AlertDialog = createDialog(eMessage, buttons, eOnClick, eNewSettings);
            var groupId:String = getGroupIdForDialog();

            myDialog.show(groupId);
        }

        private function getGroupIdForDialog():String
        {
            var global:String = super.getParameterByName("global") as String;

            // groupId should not be null unless for system-level dialog, which makes it impossible to
            // minimize the application when the dialog is active 
            if (global != null && global.toLowerCase() == "true")
            {
                return null;
            }

            return IowWindow.getAirWindow().group;
        }

        private function createDialog(eMessage:String, eButtons:Array, eOnClick:String, eSettings:Dictionary = null):AlertDialog
        {
            var alertDialog:AlertDialog = new AlertDialog();
            alertDialog.message = eMessage;

            for (var i:Number = 0; i < eButtons.length; i++)
            {
                alertDialog.addButton(eButtons[i]);
            }

            alertDialog.title = eSettings["title"];
            alertDialog.dialogSize = eSettings["size"];
            alertDialog.align = eSettings["position"];

            alertDialog.addEventListener(Event.SELECT, function(event:Event):void
            {
                var array:Array = new Array();
                array[0] = event.target.selectedIndex;
                evalJavaScriptEvent(eOnClick, array);
            });

            return alertDialog;
        }

        private function dialogProperties():Dictionary
        {
            var settings:Dictionary = new Dictionary();

            var title:String = super.getParameterByName("title") as String;
            var size:String = super.getParameterByName("size") as String;
            var position:String = super.getParameterByName("position") as String;

            settings["title"] = (title == null) ? "" : title;
            settings["size"] = (size == null) ? SIZE_MEDIUM : size;
            settings["position"] = (position == null) ? LOC_CENTER : position;

            return settings;
        }

    }
}
