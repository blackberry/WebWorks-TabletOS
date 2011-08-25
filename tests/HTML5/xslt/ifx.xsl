<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- Edited by XMLSpy? -->
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
  <html>
  <body>
    <xsl:for-each select="catalog/cd">
    <xsl:if test="price>10">
        <xsl:value-of select="title"/>
        <xsl:value-of select="artist"/>
    </xsl:if>
    </xsl:for-each>
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>