 <%@ Page Language="C#" %>
<script runat="server">
 
 protected void Page_Load(object sender, EventArgs e)
 
    {
 //       Label1.Text = DateTime.Now.ToLongTimeString();
        Response.Buffer = false;
        Response.CacheControl = "no-cache";        
        //Response.Write(Request.RequestType);
        String str;
        str = Request.Form["t1"];
        Response.Write("<p style=\"color:red\"><b>If you can find \"start\" and \"end\" in this paragraph, this test passes!</b><p>");      
        Response.Write(str);
		
		//Label1.Text = Response.Buffer.ToString();
    
    }
 
</script>
