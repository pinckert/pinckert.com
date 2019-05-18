<<<<<<< HEAD
#!/usr/bin/python
print "Content-type:text/html\n\n"
import sys
import _mysql
import MySQLdb
import db_util

try:
	db_info = db_util.db_cred()
	conn = MySQLdb.connect (host = db_info["host"], user = db_info["user"], passwd = db_info["passwd"], db = db_info["db"])
	db = conn.cursor()
	db.execute("SHOW tables")
	content = db.fetchone()
	
except MySQLdb.Error, e:
	print "Error %d: %s" % (e.args[0], e.args[1])
	sys.exit (1)

=======
#!/usr/bin/python
print "Content-type:text/html\n\n"
import sys
import _mysql
import MySQLdb
import db_util

try:
	db_info = db_util.db_cred()
	conn = MySQLdb.connect (host = db_info["host"], user = db_info["user"], passwd = db_info["passwd"], db = db_info["db"])
	db = conn.cursor()
	db.execute("SHOW tables")
	content = db.fetchone()
	
except MySQLdb.Error, e:
	print "Error %d: %s" % (e.args[0], e.args[1])
	sys.exit (1)

>>>>>>> cb97fa344060fddee1b1b68722c1e6b281f454c7
print content