#!/usr/bin/python
#
#  Copyright Dean Pinckert per http://www.pinckert.com/copyright.html
#
#
#
print "Content-type:text/html\n\n"
print "<link rel='stylesheet' href='../styles/site.css'>"
import os
import sys
import math
import datetime
import cgi
import _mysql
import MySQLdb

#
#  Local imports
#
import time_util
import db_util

tables = ["builds", "servers", "jobs", "views", "users"]
columns = [ "project_name", "number", "start", "duration", "result", "server", "user"]
sql_cmds = {
		"clear"      : "DROP TABLE builds",
		"hack" : "DELETE FROM builds WHERE number = 0", 
		"summary" : "SELECT start, duration, result FROM builds ORDER BY start"
		}
#
#  Return list of sql commands based on URL parameters
#
def processParams():
	params = {}
	if 'REQUEST_METHOD' in os.environ:
		params = cgi.FieldStorage()
	else:
		print "Running locally"
		return {"show_tables" : ""}
	
	command_list = []
	
	if len(params) == 0:  # provide a list of links / definitions
		fp = open("../db_util.html")
		print fp
		exit(1)
	for parm in params: 
		for key in sql_cmds:  # URL 
			if key == params[parm].value:
				command_list.append(sql_cmds[key])
				
	return command_list

def summary(cmd):
	sql = sql_cmds["summary"]
	print "Executing -> " + sql + "<br>"
	print "<table><thead>"
	cmd.execute(sql)
	date_summary = {}
	for start, duration, result in cmd:
		build_date = str(datetime.date.fromtimestamp(float(start)/1000.0))
		if date_summary.has_key(build_date):
			date_summary[build_date][0] += duration
		else:
			date_summary[build_date][0] = duration
		date_summary[build_date][1] = result
		
	ordered_keys =  date_summary.keys()
	ordered_keys.sort()
	for dt in ordered_keys:
		print "<tr><td style='width:100;padding-left:10px'>%s</td><td style='text-align:right;padding-right:10px'>%s</td></tr>" % (dt, time_util.prettyDelta(date_summary[dt]))
	print "</table>"
	
def showTables(cmd):
	sql = "SELECT %s FROM builds ORDER by project_name, start" % ", ".join(columns)
	print "Executing -> " + sql + "<br>"
	cmd.execute(sql)
	print "<table><thead>"
	for column in columns:
		print "<th>%s</th>" % column
	print "</thead>"
	for row in cmd:
		print "<tr>"
		for index, value in enumerate(row):
			if index == 2: # start time
				value = time_util.prettyDate(value)
			if index == 3: # duration
				value = time_util.prettyDelta(value)
			print "<td>%s</td>" % str(value)
		print "</tr>"
	print "</table>"
# ----------------------------
#
#  Main
#
try:
	db_info = db_util.db_cred()
	conn = MySQLdb.connect (host = db_info["host"], user = db_info["user"], passwd = db_info["passwd"], db = db_info["db"])
	cmd = conn.cursor()
	if cgi.FieldStorage().has_key("show_tables"):
		showTables(cmd)
		sys.exit(1)
	if cgi.FieldStorage().has_key("summary"):
		summary(cmd)
		sys.exit(1)
#	cmd_list = processParams()
#	for sql in cmd_list:
#		print "Executing -> " + sql + "<br>"
#		cmd.execute(sql)
	conn.commit()
	conn.close()
except MySQLdb.Error, e:
	print "<style> p {color:red;}</style>"
	print "<p> ----> Error %d: %s</p>" % (e.args[0], e.args[1])
	sys.exit (1)

