<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- Edited by XMLSpy® -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <html>
  <head> 
	<title>Tests</title>
	<style type="text/css">
	body {counter-reset:section;}
	.haha{color:red}
	</style>
  </head>
  <body>
  <h2>My CD Collection</h2>
  <p class="haha">Note: Should show up the table contains 26 rows and 3 columns records.</p>  
    <table border="1">
      <tr bgcolor="#9acd32">
		<th>Index</th>
        <th>Title</th>
        <th>Artist</th>
      </tr>
      <xsl:for-each select="catalog/cd">
      <tr>
	    <td><xsl:number value="position()" format="1"/></td>
        <td><xsl:value-of select="title"/></td>
        <td><xsl:value-of select="artist"/></td>
      </tr>
      </xsl:for-each>
    </table>
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>