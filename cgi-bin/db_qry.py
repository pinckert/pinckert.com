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
cgitb.enable()
#
#   Handle requests for data from the DB
#
print "Content-type:application/json\n\n"

columns = [ "project_name", "number", "start", "duration", "result", "server", "user"]	
sql = "SELECT %s FROM builds ORDER by project_name, start" % ", ".join(columns)	

def calcDuration(build_data):
	total_msec = 0
	for duration in build_data:
		total_msec += duration
	return total_msec

def allRecords(db, table_name):
	records = []
	sql = "SELECT * from %s" % table_name
	try:
		table = db.execute(sql)
		return table

	except MySQLdb.Error, e:
		print "Error %d: %s<br>" % (e.args[0], e.args[1])	
	
#------------------------------------------------------------
#
#		*Main*
#
records = []
try:

	connection = MySQLdb.connect (host = "pinckert.veriomysql.com", user = "pinckert", passwd = "Puff2%Dragon", db = "pinckert")
	table = connection.cursor()
	status = table.execute(sql)
	
	records = [dict((table.description[i][0], value) \
               for i, value in enumerate(row)) for row in table.fetchall()]
			   
#	for row in table:
#		row_data = {}
#		for index, column in enumerate(row):
#			row_data[columns[index]] = column
#		records.append(row_data)
		
	connection.close()
	
except MySQLdb.Error, e:
	print "Error %d: %s<br>" % (e.args[0], e.args[1])
	
print json.dumps(records)	

