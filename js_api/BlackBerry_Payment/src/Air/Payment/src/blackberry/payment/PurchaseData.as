package blackberry.payment
{
	public class PurchaseData
	{
		public var transactionID:String;
		public var digitalGoodID:String;
		public var date:String;
		public var digitalGoodSKU:String;
		public var licenseKey:String;
		public var metaData:String;
		
	
		
		public function PurchaseData( transactionID:String,  digitalGoodID:String,  date:String,
									  digitalGoodSKU:String,  licenseKey:String,  metaData:String){
			
			this.transactionID 		= transactionID; 
			this.digitalGoodID 		= digitalGoodID;
			this.date 				= date;
			this.digitalGoodSKU 	= digitalGoodSKU;
			this.licenseKey 		= licenseKey;
			this.metaData 			= metaData;
			
		}
		
	}
}