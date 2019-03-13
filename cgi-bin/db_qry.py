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
cgitb.enable()
#
#
#   Handle requests for data from the DB
#
print "Content-type:application/json\n\n"

columns = [ "project_name", "number", "start", "duration", "result", "server", "user"]
sql = "SELECT %s FROM apache_builds ORDER by project_name, start" % ", ".join(columns)

#------------------------------------------------------------
#		*Main*
#
records = []
try:
# check for parameter
	if 'REQUEST_METHOD' in os.environ:   # handle cgi invocation	
		cgitb.enable()
		form = cgi.FieldStorage()
		print form["path"].value
		print form["params"].value
		
	else:
# Connect
		db_info = db_util.db_cred()
		connection = MySQLdb.connect (host = db_info["host"], user = db_info["user"], passwd = db_info["passwd"], db = db_info["db"])
		table = connection.cursor()
		status = table.execute(sql)
#   Convert query-response to array of dict
		records = [dict((table.description[i][0], value) \
				for i, value in enumerate(row)) for row in table.fetchall()]
	
		connection.close()
	
except MySQLdb.Error, e:
	print "Error %d: %s<br>" % (e.args[0], e.args[1])
	
print json.dumps(records)

