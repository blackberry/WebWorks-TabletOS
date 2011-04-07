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
package webworks.loadingScreen
{
    import caurina.transitions.Tweener;
    
    import flash.display.DisplayObject;
    
    import webworks.config.ConfigConstants;
    import webworks.config.ConfigData;
    import webworks.config.TransitionConstants;
    
    public class Transitions
    {
        // target tweener acts on
        private var loadingScreen:LoadingScreen;
        
        //config properties
        private var type:int = TransitionConstants.TRANSITION_NONE;
        private var duration:Number = 0.25; //seconds
        private var direction:int = TransitionConstants.DIRECTION_LEFT;
        
        public function Transitions(target:LoadingScreen)
        {
            this.loadingScreen = target;
            setProperties();
        }
    
        private function setProperties():void
        {
            try
            {
                var configData:ConfigData = ConfigData.getInstance();
                var obj:Object = configData.getProperty(ConfigConstants.TRANSITIONTYPE);
                if ( obj != null )
                    type = obj as int;
                obj = configData.getProperty(ConfigConstants.TRANSITIONDURATION);
                if ( obj != null )
                    duration = (obj as Number)/1000;
                obj = configData.getProperty(ConfigConstants.TRANSITIONDIRECTION);
                if ( obj != null )
                    direction = obj as int;
            }
            catch(error:Error)
            {
                throw new Error("config data errors:" + error.message);
            }
        }
        
		public function get transitionType():int 
		{
			return type;
		}
		
        public function resetEffect():void
        {
            Tweener.removeTweens(loadingScreen);
            loadingScreen.x = 0;
            loadingScreen.y = 0;
			loadingScreen.width = 1024;
			loadingScreen.height = 600;
            loadingScreen.alpha = 1;
        }

        public function createEffect():void
        {
			trace("create effect: " + type );
            if ( type == TransitionConstants.TRANSITION_ZOOMIN )
                zoomIn();
            else if ( type == TransitionConstants.TRANSITION_ZOOMOUT )
                zoomOut();
            else if ( type == TransitionConstants.TRANSITION_WIPEIN )
                wipeIn();
            else if ( type == TransitionConstants.TRANSITION_WIPEOUT )
                wipeOut();
            else if ( type == TransitionConstants.TRANSITION_FADEIN )
                fadeIn();
            else if ( type == TransitionConstants.TRANSITION_FADEOUT )
                fadeOut();
            else if ( type == TransitionConstants.TRANSITION_SLIDEOVER )
                slideOver();
            else if ( type == TransitionConstants.TRANSITION_SLIDEPUSH )
                slidePush();
            else
				nonTransition();
        }
		
		private function nonTransition():void
		{
			loadingScreen.hideIfNecessary();
		}
        
        private function zoomIn():void
        {
            var w:Number = 1024;
            var h:Number = 600;

			loadingScreen.x = w/2;
            loadingScreen.y = h/2;
            loadingScreen.width = 0;
            loadingScreen.height = 0;

            Tweener.addTween(loadingScreen,{x:0, y:0, width:w, height:h, time:duration, delay:0, alpha:1, onComplete:loadingScreen.hideIfNecessary});
        }
        
        private function zoomOut():void 
		{
			nonTransition();
		}
		
        private function wipeIn():void 
		{
			wipeEffect();			
		}
		
        private function wipeOut():void
		{
			wipeEffect();
		}
		
        private function fadeIn():void {
			fadeEffect();
		}
        private function fadeOut():void {
			fadeEffect();
		}
        private function slideOver():void
		{
			wipeEffect();
		}
		
        private function slidePush():void
		{
			nonTransition();
		}
		
		private function wipeEffect():void {
			var w:Number = 1024;
			var h:Number = 600;
			
			if(direction == TransitionConstants.DIRECTION_LEFT) {
				loadingScreen.x = 0;
				loadingScreen.y = 0;
				loadingScreen.width = 0;
				loadingScreen.height = h;
			} else if (direction == TransitionConstants.DIRECTION_RIGHT) {
				loadingScreen.x = w;
				loadingScreen.y = 0;
				loadingScreen.width = 0;
				loadingScreen.height = h;				
			} else if (direction == TransitionConstants.DIRECTION_UP) {
				loadingScreen.x = 0;
				loadingScreen.y = h;
				loadingScreen.width = w;
				loadingScreen.height = 0;								
			} else { // TransitionConstants.DIRECTION_DOWN
				loadingScreen.x = 0;
				loadingScreen.y = 0;
				loadingScreen.width = w;
				loadingScreen.height = 0;								
			}		 	
			Tweener.addTween(loadingScreen,{x:0, y:0, width:w, height:h, time:duration, delay:0, alpha:1, onComplete:loadingScreen.hideIfNecessary});
		}
		private function fadeEffect():void {
			loadingScreen.alpha = 0;
			var w:Number = 1024;
			var h:Number = 600;
			Tweener.addTween(loadingScreen, {alpha:1, time:duration, onComplete:loadingScreen.hideIfNecessary});
		}
    }
}
