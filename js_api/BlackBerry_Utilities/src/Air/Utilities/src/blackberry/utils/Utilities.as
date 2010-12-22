package blackberry.utils
{
	import webworks.extension.DefaultExtension;
	
	public class Utilities extends DefaultExtension {
		public function Utilities() {
			super();
		}
		
		override public function getFeatureList():Array {
			return [ "blackberry.utils" ];
		}
	}
}