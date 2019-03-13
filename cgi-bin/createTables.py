#!/usr/bin/python
print "Content-type:text/html\n\n"
import sys
import _mysql
import MySQLdb
import db_util
import cgi


project_list = ["apache", "ubuntu"];

#
#  Initialize tables for the Jenkins data display app.
#

commands = {"clear_all" : "DROP TABLE IF EXISTS {0}_builds",
			"init_build_table" : "CREATE TABLE IF NOT EXISTS {0}_builds (                     \
												 number INT NOT NULL,               \
												 project_name VARCHAR(30) NOT NULL, \
												 result ENUM ('SUCCESS', 'UNSTABLE', 'FAILURE'),   \
												 start   VARCHAR(35),               \
												 duration INT NOT NULL,		        \
												 server VARCHAR(20),		        \
												 build_trigger VARCHAR(20),	        \
												 user VARCHAR(30),		            \
												 PRIMARY KEY (project_name, number) \
												) "
									
}

if __name__ == "__main__":	
	print "<html><body>"
	try:
		db_info = db_util.db_cred()
		connection = MySQLdb.connect (host = db_info["host"], user = db_info["user"], passwd = db_info["passwd"], db = db_info["db"])
		params = cgi.FieldStorage()
		command = params["cmd"].value.lower()
		print "<p>Executing command: {0}</p>".format(command)

		if command == "clear":
			print "Clear command"
		if command == "initialize":
			print "Initialize tables"
		if command == "truncate":
			print "Truncate tables"
	
		db = connection.cursor()
		print "connection made <br>"
		cmd = commands["init_build_table"].format(proj)
		print "executing: " + cmd
		db.execute(cmd)
		print "{0} executed<br>".format(command)
			
	
		connection.commit()
		connection.close()
		
	except MySQLdb.Error, e:
		print "Error %d: %s<br>" % (e.args[0], e.args[1])
		
	print "</body></html>"
	
