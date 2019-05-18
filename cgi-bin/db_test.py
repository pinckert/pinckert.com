#!/usr/bin/python
import os
import sys
import json
import math
import datetime
import _mysql
import MySQLdb
import cgi
import cgitb
import db_util
import urllib

cgitb.enable()
#
#
#   Handle requests for data from the DB
#
print "Content-type:application/json\n\n"
#		*Main*
#
keylist = {}
try:
# check for parameter
	if 'REQUEST_METHOD' in os.environ:   # handle cgi invocation	
		query = os.environ['QUERY_STRING']
		decode = urllib.unquote(query)
		query = decode
	
		db_info = db_util.db_cred()
		connection = MySQLdb.connect (host = db_info["host"], user = db_info["user"], passwd = db_info["passwd"], db = db_info["db"])
		table = connection.cursor()

		status = table.execute(query)
		records = table.fetchall()

		connection.close()
	
except MySQLdb.Error, e:
	print "Error %d: %s<br>" % (e.args[0], e.args[1])

print json.dumps(records)
