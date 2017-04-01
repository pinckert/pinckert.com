#!/usr/bin/python
print "Content-type:text/html\n\n"
import sys
import _mysql
import MySQLdb

try:
	conn = MySQLdb.connect (host = "pinckert.veriomysql.com", user = "pinckert", passwd = "Puff2%Dragon", db = "pinckert")
	db = conn.cursor()
	db.execute("SHOW tables")
	content = db.fetchone()
	
except MySQLdb.Error, e:
	print "Error %d: %s" % (e.args[0], e.args[1])
	sys.exit (1)

print content