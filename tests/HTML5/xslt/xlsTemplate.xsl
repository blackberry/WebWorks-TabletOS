<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- Edited by XMLSpy® -->
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
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
  <p class="haha">Note: Should show up the table contains 2 rows and 2 columns records, table content is:</p>
  <p class="haha">      Title: Empire Burlesque, Artist: Bob Dylan</p>
    <table border="1">
      <tr bgcolor="#9acd32">
        <th>Title</th>
        <th>Artist</th>
      </tr>
      <tr>
        <td><xsl:value-of select="catalog/cd/title" /></td>
        <td><xsl:value-of select="catalog/cd/artist" /></td>
      </tr>
    </table>
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>