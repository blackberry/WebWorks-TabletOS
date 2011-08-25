<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <html>
  <head> 
	<title>Tests</title>
	<style type="text/css">
	body {counter-reset:section;}
	h2:before
	{
	counter-increment:section;
	content:"#" counter(section);
	}
	.haha{color:red}
	</style>
	</head>
  <body>
  <h1>Tests</h1>
  <p class="haha">Note: Should show up the table contains 2154 rows and 8 columns records.</p>
    <table border="1">
      <tr bgcolor="#9acd32">
            <th>Category</th>
            <th>Subcategory</th>
            <th>Description</th>
            <th>Standard</th>
            <th>Source</th>
            <th>Supported</th>
            <th>Index</th>
            <th>Href</th>
      </tr>
      <xsl:for-each select="tests/test">
      <!--xsl:if test="category = 'HTML Legacy'"-->
      <tr>
        <td> 
          <xsl:value-of select="category"/>
        </td>
        <td>
          <xsl:value-of select="subcategory"/>
        </td>
        <td>
          <xsl:value-of select="description"/>
        </td>
        <td>
        <xsl:value-of select="standard"/>
        </td>
        <td>
          <xsl:value-of select="source"/>
        </td>
        <td>
          <xsl:value-of select="supported"/>
        </td>
        <td>
          <xsl:number value="position()" format="1" />
        </td>
        <td>
          <a href="{href}"><xsl:value-of select="href"/></a>
        </td>
      </tr>
      <!--/xsl:if-->
      </xsl:for-each>
    </table>
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>





