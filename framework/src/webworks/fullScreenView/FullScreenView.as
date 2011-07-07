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
package webworks.fullScreenView
{
	import caurina.transitions.Tweener;
	
	import flash.display.Screen;
	import flash.display.Sprite;
	import flash.display.StageAspectRatio;
	import flash.display.StageOrientation;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.events.StageOrientationEvent;
	import flash.events.TimerEvent;
	import flash.geom.Point;
	import flash.utils.Timer;
	
	import qnx.display.IowWindow;
	import qnx.display.IowWindowSensitivity;
	import qnx.display.IowWindowTransparency;
	import qnx.fullscreen.FullscreenClient;
	import qnx.fullscreen.FullscreenClientEvent;
	import qnx.media.impl.mmr.MMR;
	import qnx.media.impl.mmr.MMRContext;
	import qnx.media.impl.mmr.MMREvent;
	import qnx.media.impl.mmr.MMROutput;
	import qnx.system.QNXSystem;
	import qnx.ui.core.UIComponent;
	import qnx.ui.events.MediaControlEvent;
	import qnx.ui.media.MediaControl;
	import qnx.ui.media.MediaControlOption;
	import qnx.ui.media.MediaControlProperty;
	import qnx.ui.media.MediaControlState;
	
	import webworks.config.ConfigConstants;
	import webworks.config.ConfigData;
	import webworks.webkit.WebkitEvent;
	
	public class FullScreenView extends UIComponent
	{
		private var _controlLayer:Sprite;
		private var _hideTimer:Timer;
		private var _fc:FullscreenClient;
		private var _mmr:MMR;
		private var _context:MMRContext;
		private var window_id:String;
		private var _output:MMROutput;
		private var _curPosition:int;
		private var _bkgColor:uint;
		
		private var controls:MediaControl;
		
		private var app:WebWorksAppTemplate;
		
		public function FullScreenView(fcClient:FullscreenClient)
		{
			//Debug.log("Fullscreen controller enabled", Debug.USER_GLOBAL, this);
			_controlLayer = new Sprite();
			_hideTimer = new Timer(3000, 1);
			_bkgColor = 0x000000;
			
			try {
				_mmr = new MMR();
				_fc = fcClient;
				_fc.addEventListener(FullscreenClientEvent.ENTER, enterFullScreen);
				_fc.addEventListener(FullscreenClientEvent.EXIT, exitFullScreen);
			} catch (e:Error) {
				//Debug.error("Unable to connector mm-renderer");
			}
			_hideTimer.addEventListener(TimerEvent.TIMER_COMPLETE, hideControls);
			var window:IowWindow = IowWindow.getAirWindow();
			window.sensitivity = IowWindowSensitivity.ALWAYS;
			super();
			
		}
		
		protected override function init():void {
			__startWidth = Math.max(Screen.mainScreen.bounds.width, Screen.mainScreen.bounds.height);
			__startHeight = Math.min(Screen.mainScreen.bounds.height, Screen.mainScreen.bounds.width);
			super.init();
			
			
			controls = new MediaControl();
			controls.setOption( MediaControlOption.PLAY_PAUSE, true );
			controls.setOption( MediaControlOption.SEEKBAR, true );
			controls.setOption( MediaControlOption.FULLSCREEN, true );
			
			controls.addEventListener( MediaControlEvent.STATE_CHANGE, playbackChange );
			controls.addEventListener( MediaControlEvent.PROPERTY_CHANGE, controlPropertyChange );
			
			_controlLayer.addChild(controls);
			
			addChild(_controlLayer);
		}
			
		private function playbackChange(event:MediaControlEvent):void {
			if (!_context){
				return;
			}
			
			var state:String = controls.getState();
			if (state == MediaControlState.PLAY)
			{
				if (_context.state.state != "playing") {
					_context.play();
				} else {
					_context.setSpeed(1000);
				}
			} else {
				_context.setSpeed(0);
			}	
		}
		
		private function controlPropertyChange( event:MediaControlEvent ):void
		{
			switch( event.property )
			{
				case MediaControlProperty.POSITION:
					
					var value:Number = Number( controls.getProperty( MediaControlProperty.POSITION ) );
					var position:uint = uint( value );
					_context.seek( position.toString() );
					break;
				case MediaControlProperty.FULLSCREEN:
					//Debug.log("controlPropertyChange - calling fullscreenExited", Debug.USER_GLOBAL, this);
					_fc.fullscreenExited(true);	
					break;
			}	
		}
		
		public override function destroy():void {
			var window:IowWindow = IowWindow.getAirWindow();
			window.sensitivity = IowWindowSensitivity.ALPHA_TEST; //This will return
			super.destroy();
			if (_mmr)
			{
				_mmr.release();
				_mmr = null;
			}
			else
			{
				//Debug.error("_mmr.release() called when it does not exist", this);
			}
		}
		
		private function enterFullScreen(event:FullscreenClientEvent):void {
			//Debug.log("enterFullScreen " + event, Debug.USER_GLOBAL, this);
			_context = _mmr.openContext(event.context);
			_context.addEventListener(MMREvent.CONTEXT_READY, contextReady);
			_context.addEventListener(MMREvent.CONTEXT_CLOSED, contextClosed);
			_context.addEventListener(MMREvent.STATE_CHANGE, stateChange);
			_context.addEventListener(MMREvent.METADATA_CHANGE, metadataChange);
			_context.addEventListener(MMREvent.OUTPUT_ATTACHED, outputAttached);
			_context.addEventListener(MMREvent.STATUS_CHANGE, statusChange);

		}
		
		private function exitFullScreen(event:FullscreenClientEvent):void {
			//Debug.log("exitFullScreen " + event, Debug.USER_GLOBAL, this);
			if (_context ) {
				_context.close();
				if (_output) {
					_output = null;
					dispatchEvent(new WebkitEvent(WebkitEvent.FULL_SCREEN_EXIT));
				}
			}
			_hideTimer.stop();
			Tweener.removeTweens(_controlLayer);
			_controlLayer.visible = false;
			IowWindow.getAirWindow().transparency = IowWindowTransparency.ALPHA;
			IowWindow.getAirWindow().setWindowProperty(61, 0x7673); // SCREEN_CBABC_MODE_UI
		}
		
		private function outputAttached(event:MMREvent):void {
			//Debug.log("outputAttached " + event, Debug.USER_GLOBAL, this);
			if (MMROutput(event.data).type == "video") {
				_output = MMROutput(event.data);
				IowWindow.getAirWindow().setWindowProperty(61, 0x7672); // SCREEN_CBABC_MODE_VIDEO
				draw();
				dispatchEvent(new WebkitEvent(WebkitEvent.FULL_SCREEN_ENTER));
				controls.setProperty( MediaControlProperty.FULLSCREEN, true );
				showControls(true);
			}
		}
		
		private function onOrientationChanging(e:StageOrientationEvent):void
		{
			if (visible) {
				if (e.afterOrientation == StageOrientation.ROTATED_LEFT || e.afterOrientation == StageOrientation.ROTATED_RIGHT) {
					e.preventDefault();
					return;
				}
			}
		}
		
		protected override function onAdded():void {
			stage.addEventListener(MouseEvent.MOUSE_DOWN, handleTouch, true);
			stage.addEventListener(MouseEvent.MOUSE_UP, handleTouch, true);
			draw();
		}
		
		protected override function onRemoved():void {
			stage.removeEventListener(MouseEvent.MOUSE_DOWN, handleTouch, true);
			stage.removeEventListener(MouseEvent.MOUSE_UP, handleTouch, true);
			draw();	
		}
		
		private function handleTouch(event:MouseEvent):void
		{
			if (event.type== MouseEvent.MOUSE_DOWN) {
				showControls(false);
			} else if (event.type == MouseEvent.MOUSE_UP) {
				showControls(true);
			}
		}
		
		private function showControls(startTimer:Boolean):void
		{
			IowWindow.getAirWindow().transparency = IowWindowTransparency.ALPHA;
			_controlLayer.visible = true;
			Tweener.addTween(_controlLayer, {time:1.0,_autoAlpha:1});
			_hideTimer.stop();
			_hideTimer.reset();
			
			if (startTimer) {	
				_hideTimer.start();
			}
			
		}
		
		private function hideControls(e:TimerEvent):void
		{
			var hideComplete:Function = function():void {
				IowWindow.getAirWindow().transparency = IowWindowTransparency.DISCARD;				
			}
			
			Tweener.addTween(_controlLayer, {time:1.0,_autoAlpha:0, onComplete:hideComplete});
		}
		
		private function contextReady(event:MMREvent):void {
			if (_context.state.state != "playing") {
				_context.play();	
			} else {
				if (_context.state.speed == 0) {
					controls.setState( MediaControlState.PAUSE );				
				} else {
					controls.setState( MediaControlState.PLAY );
				}
			}
			controls.setProperty( MediaControlProperty.DURATION,  _context.metadata["md_title_duration"] );			
			showControls(true);
		} 
		
		private function contextClosed(event:MMREvent):void {
			_context = null;
		}
		
		private function metadataChange(event:MMREvent):void {
			if (event.data["md_title_duration"]) {
				controls.setProperty( MediaControlProperty.DURATION, _context.metadata["md_title_duration"] );
			}
			if (event.data["md_video_height"] || event.data["md_video_width"]) {
				draw();
			} 
		}
		
		private function stateChange(event:MMREvent):void {
			if (event.data["state"]) {
				if (_context.state["state"] != "playing") {
					controls.setState( MediaControlState.STOP );
					_fc.fullscreenExited(true);
				} else {
					controls.setState( MediaControlState.PLAY) ;
				}
			} else if (event.data["speed"]) {
				if (_context.state.speed == 0) {
					controls.setState( MediaControlState.PAUSE );				
				} else {
					controls.setState( MediaControlState.PLAY );
				}				
			}
		}
		
		private function statusChange(event:MMREvent):void {
			if (event.data["position"]) {
				var position : int;
				var pos : String = _context.status["position"];	
				position = new int(pos);
				if (position != _curPosition) {
					_curPosition = position;
					controls.setProperty( MediaControlProperty.POSITION, _curPosition );
				}
			}			
		}
		
		private function videoEnabled():Boolean {
			return _context && _output && stage &&  visible;
		}
		
		/**
		 * @override
		 * @inheritDoc
		 */
		override public function get visible():Boolean {
			return super.visible;
		}
		
		/**
		 * @override
		 */
		override public function set visible(value:Boolean):void {
			super.visible = value;
			draw();
		}
		
		/**
		 * The background color of the VideoDisplay object.
		 */
		public function set backgroundColor(rgb:uint):void {
			_bkgColor = rgb;
			draw();
		}
		
		/**
		 * The background color of the VideoDisplay object.
		 * 
		 * @param rgb The RGB value of the background color.
		 * @return An RGB value representing the background color.
		 */
		
		public function get backgroundColor():uint {
			return _bkgColor;
		}
		
		public function get controlLayer():Sprite
		{
			return _controlLayer;
		}
		
		protected override function draw():void {
			validate();
			if (false) {
				if (width != 0 && height != 0) {
					drawBars(null);
				}
				return;
			}
			var dest:Rect = new Rect(0, 0, __width, __height);
			// adjust dest for aspect ratio
			var newDest:Rect = fitToSize( new int(_context.metadata["md_video_width"]), new int(_context.metadata["md_video_height"]), dest );
			
			var tl:Point = new Point(x, y);
			//tl = parent.localToGlobal(tl);
			var params:Object = {};
			params["video_dest_x"] = new String(tl.x + newDest.left);
			params["video_dest_y"] = new String(tl.y + newDest.top);
			params["video_dest_w"] = new String(newDest.right - newDest.left);
			params["video_dest_h"] = new String(newDest.bottom - newDest.top);			
			_context.setOutputParameters(_output, params);
			
			drawBars(newDest);
			
			controls.width = __width - 100;
			controls.y = height - controls.height - 20;
			controls.x = __width / 2 - controls.width / 2;
			
			//_control.qnxWebView.zOrder = -1;
		}
		
		private function drawBars(videoRect:Rect):void {
			graphics.clear();
			graphics.beginFill(_bkgColor);
			if (videoEnabled() && videoRect != null) {
				graphics.drawRect(0, 0, __width, videoRect.top); // top
				graphics.drawRect(0, videoRect.top, videoRect.left, videoRect.height ); //left
				graphics.drawRect(videoRect.right, videoRect.top, __width - videoRect.right, videoRect.height ); // right
				graphics.drawRect(0, videoRect.bottom, __width, __height - videoRect.bottom); // bottom
			} else {
				graphics.drawRect(0, 0, __width, __height);
			}
			graphics.endFill();
		}
		
		private function fitToSize( source_width:int, source_height:int, dest:Rect ):Rect {
			var rect:Rect = new Rect();
			var tw:int = dest.right - dest.left;
			var th:int = dest.bottom - dest.top;
			
			if (source_width == 0) {
				source_width = dest.right - dest.left;
			}
			if (source_height == 0) {
				source_height = dest.bottom - dest.top;
			}
			var ar:Number = source_width / source_height;
			// calc target size based on AR
			if ( source_width > source_height ) {
				// width fit
				rect.right = tw;
				rect.bottom = tw / ar;
				if (rect.bottom > th ) {
					rect.bottom = th;
					rect.right = th * ar;
				}
			} else {
				// height fit
				rect.bottom = th;
				rect.right = th / ar;
				if ( rect.right > th ) {
					rect.right = tw;
					rect.bottom = tw * ar;
				}
			}
			var xa:int = ( tw - rect.right ) / 2;
			var ya:int = ( th - rect.bottom ) / 2;
			
			// calc new dest
			rect.left = dest.left + xa;
			rect.top  = dest.top + ya;
			rect.right = rect.left + rect.right;
			rect.bottom = rect.top + rect.bottom;
			return( rect );	
		}
		
	}
}

class Rect {
	public var left:uint;
	public var top:uint;
	public var right:uint;
	public var bottom:uint;
	
	public function Rect(left_:uint = 0, top_:uint = 0, right_:uint = 0, bottom_:uint = 0) {
		left = left_;
		top = top_;
		right = right_;
		bottom = bottom_;
	}
	
	public function get width():uint {
		return right - left;
	}
	
	public function get height():uint {
		return bottom - top;
	}
	
	public function toString():String {
		return "Rect:( left:" + left + ", top:" + top + ", right:" + right + ", bottom:" + bottom + ")"; 
	}

}
