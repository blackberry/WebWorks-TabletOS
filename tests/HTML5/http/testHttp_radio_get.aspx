 <%@ Page Language="C#" %>
<script runat="server">
 
 protected void Page_Load(object sender, EventArgs e)
 
    {
 //       Label1.Text = DateTime.Now.ToLongTimeString();
        Response.Buffer = false;
        Response.CacheControl = "no-cache";        
        //Response.Write(Request.RequestType);
        String str;
        str = Request.QueryString["sex"];
        Response.Write("<p style=\"color:red\"><b>The gender you selected:</b><p>");      
        Response.Write(str);
		
		//Label1.Text = Response.Buffer.ToString();
    
    }
 
</script>
