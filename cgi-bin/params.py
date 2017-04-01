#!/usr/bin/python
print "Content-type:text/html\n\n"
import os
import sys
import cgi
import cgitb

#cgitb.enable()

#
#  Regurgitate the keys/vaules from the URL
#
page = []
params = ()
if 'REQUEST_METHOD' in os.environ:
	params = cgi.FieldStorage()
else:
	params = {"1" : "0ne", "2" : "two", "3" : "three"}
	print "Running locally\n"
	
page.append("<html><body>")
trailer = "</body></html>"
page.append(str(params) + "<br>")

page.append("<list>")
for parm in params:
	page.append("<li>" + parm + " : " + params[parm].value + "</li>")
	
page.append("</list>")
page.append(trailer)
print "".join(page)
