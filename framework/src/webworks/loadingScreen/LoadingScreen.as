package webworks.loadingScreen
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.DisplayObject;
	import flash.display.Graphics;
	import flash.display.GraphicsBitmapFill;
	import flash.display.Loader;
	import flash.display.Sprite;
	import flash.display.StageDisplayState;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.geom.Rectangle;
	import flash.net.URLRequest;
	import flash.text.TextField;
	
	import qnx.media.QNXStageWebView;
	
	import webworks.config.ConfigConstants;
	import webworks.config.ConfigData;
	import webworks.uri.URI;
	import webworks.util.Utilities;
	import webworks.webkit.WebkitControl;

	public class LoadingScreen extends Sprite
	{
		private var loader:Loader;
		private var fgLoader:Loader;
		private var source:Bitmap;
		private var foreground:Bitmap;
		private var rect:Rectangle;
		
		private var backgroundColor:uint = 0xFFCC00;
		private var backgroundImage:String = "bg.jpg";
		private var foregroundImage:String = "loading.gif";

		private var isFirstLaunch:Boolean = true;
		private var onFirstLaunch:Boolean = false;
		private var onLocalPageLoad:Boolean  = false;
		private var onRemotePageLoad:Boolean = false;
		
		private var app:WebWorksAppTemplate;
		private var webView:QNXStageWebView;

		public function LoadingScreen( x:int, y:int, width:int, height:int) 
		{	
			setProperties();			
			rect = new Rectangle(x,y,width,height);
			loadScreen();
		}

		private function loadScreen():void
		{
			loader = new Loader();
			fgLoader = new Loader();
			setBackgroundColor();
			loader.contentLoaderInfo.addEventListener(Event.COMPLETE, loadComplete);
			loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, imageIOError);
			fgLoader.contentLoaderInfo.addEventListener(Event.COMPLETE, fgLoaded);
			fgLoader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, imageIOError);
			addChild(loader);
			addChild(fgLoader);
			loader.load(new URLRequest(backgroundImage)); 
			fgLoader.load(new URLRequest(foregroundImage));
		}

		private function imageIOError(event:Event):void
		{
			trace("image load error");
		}
		
		private function setProperties():void
		{
			try
			{
			    var configData:ConfigData = ConfigData.getInstance();
			    backgroundColor = configData.getLoadingScreenColor(); 
			    var obj:Object = configData.getProperty(ConfigConstants.BACKGROUNDIMAGE);
			    if ( obj != null )
    				backgroundImage = obj as String;
	    		obj = configData.getProperty(ConfigConstants.FOREGROUNDIMAGE);
		    	if ( obj != null )
			    	foregroundImage = obj as String;
				obj = configData.getProperty(ConfigConstants.ONFIRSTLAUNCH);
			    if ( obj != null )
				    onFirstLaunch = obj as Boolean;
			    obj = configData.getProperty(ConfigConstants.ONLOCALPAGELOAD);
			    if ( obj != null )
				    onLocalPageLoad  = obj as Boolean;
			    obj = configData.getProperty(ConfigConstants.ONREMOTEPAGELOAD);
			    if ( obj != null )
    				onRemotePageLoad = obj as Boolean;
	    		obj = configData.getProperty(ConfigConstants.ENV_APPLICATION);
		    	if ( obj != null )
			    {	
				    app = obj as WebWorksAppTemplate;
			    }
			    obj = configData.getProperty(ConfigConstants.ENV_WEBVIEW);
			    if ( obj != null )
			    {	
				    webView = obj as QNXStageWebView;
			    }
			}
			catch(error:Error)
			{
				throw new Error("config data errors:" + error.message);
			}
		}
		
		private function fgLoaded(event:Event):void
		{
		  	foreground = event.target.content;
			//position the bitmap in the center of the stage
			if ( foreground != null )
			{
				foreground.x = (rect.width - foreground.width)/2;
				foreground.y = (rect.height - foreground.height)/2;
			}
		}
		private function loadComplete(event:Event):void
		{
			source = event.target.content;
			resize(rect.width);
		}
		
		private function setBackgroundColor():void
		{
			var graphic:Graphics = this.graphics;
			graphic.beginFill(backgroundColor);
			graphic.drawRect(rect.x, rect.y, rect.width, rect.height);
			graphic.endFill();
		}
				
		private function resize(maxW:Number, maxH:Number=0, constrainProportions:Boolean=true):void
		{
			maxH = maxH == 0 ? maxW : maxH;
			source.width = maxW;
			source.height = maxH;
			if (constrainProportions) {
				source.scaleX < source.scaleY ? source.scaleY = source.scaleX : source.scaleX = source.scaleY;
			}
		}
		
		private function isLoadingScreenRequired(url:String):Boolean 
		{
			if ( !isFirstLaunch )
			{
				var uri:URI = new URI(url);
				if ( onLocalPageLoad && ( Utilities.isLocalURI(uri) || Utilities.isFileURI(uri))) 
				{
					return true;
				}
				if ( onRemotePageLoad && (Utilities.isHttpURI(uri) || Utilities.isHttpsURI(uri))) 
				{
					return true;
				}
			}
			if ( isFirstLaunch )
				isFirstLaunch = false;
			return false;
		}
		
		public function showOnFirstLaunch():void
		{
			if ( onFirstLaunch && isFirstLaunch )
			{
			    //app.addChild(this);
			    //webView.moveBehind();
			}
		}
		
		public function show(url:String):void
		{
			if ( isLoadingScreenRequired(url))
			{
				//app.addChild(this);
				//webView.moveBehind();
			}
		}
		
		public function hide():void
		{
			if ( app.contains(this))
			{
		        //app.removeChild(this);
		        //webView.moveAhead();
			}
		}
		
		public function clearFirstLaunchFlag():void
		{
			isFirstLaunch = false;  
		}
	}
}