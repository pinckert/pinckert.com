#!/usr/bin/python
print "Content-type:text/html\n\n"
import sys
import _mysql
import MySQLdb

commands = {"clear_all" : "DROP TABLE IF EXISTS builds",
			"insert_row" : "INSERT INTO builds (number, project_name, success, start, duration, server, build_trigger, user) \
										VALUES(145, 'foo_bar', 'SUCCESS', 1479507116829, 120034, 'windows server', 'scm', 'dean');",
			"initialize" : "CREATE TABLE IF NOT EXISTS builds (                     \
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

#							CREATE TABLE views (name VARCHAR (40) NOT NULL  \
#												count 	
#													 ) \
#								create table users   \
#								create table servers \
#
#  Base class for reference to the database. Implemented as singleton to prevent
#  multiple connections during a session
#
"""
							\
							CREATE TABLE IF NOT EXISTS project_group (              \
												view_name VARCHAR(35),              \
												project_name VARCHAR(30) NOT NULL,  \
												FOREIGN KEY (project_name, project_name);", \  

class DB ():
	connection = 0
	user = ""
	passwd = ""
	def __init__ (host):
		try:
			dbg.append("In Init<br>")
			connection = MySQLdb.connect (host = "pinckert.veriomysql.com", user = "pinckert", passwd = "", db = "pinckert")
	
		except MySQLdb.Error, e:
			dbg.append("Error %d: %s<br>" % (e.args[0], e.args[1]))
#			sys.exit (1)
	
	def execute(command):
		try:
			connection.execute(command)
		except MySQLdbError, e:
#			sys.exit (1)
			
	def clear():
		dbg.append("clear...<br>")

"""		

try:
	connection = MySQLdb.connect (host = "pinckert.veriomysql.com", user = "pinckert", passwd = "Puff2%Dragon", db = "pinckert")
	db = connection.cursor()
	print "connection made <br>"
	db.execute(commands["initialize"])
	print "initialize executed<br>"
	connection.commit()
	connection.close()
except MySQLdb.Error, e:
	print "Error %d: %s<br>" % (e.args[0], e.args[1])
	
