import urllib
import os
import sys
from bottle import route, run, request, static_file
import bottle
import re

@route('/')
def index():
	return "YUI Continuous Integration Testing Reporter, POST to the following URL http://localhost/report"

@route('/report', method='POST')
def do_report():
    try:
        filename = request.GET['buildId'] + ".xml"
        f = open(filename, 'wb')
        i = 0
        for p in request.body:
            i = i + 1
            f.write(p);	
        f.close();
    except:
        print sys.exc_info()[1]
        pass
    return "Success"

@route('/:path#.+#')
def server_static(path):
	print "serving up ", path
	return static_file(path, root='./')

#bottle.debug(True)
run(host='10.135.232.40', port=8080, reloader=True)


