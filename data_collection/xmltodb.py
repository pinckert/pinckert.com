#!/usr/bin/python
print "Content-type:text/html\n\n"
import os
import sys
import _mysql
import MySQLdb
import ../cgi_bin/db_util
import xml.etree.ElementTree as ET
#
#   Migrate XML build files to DB
#  -- Need to do this on server side since DB connection not allowed from local client
#
#  To-do
#   Common import for definitions used in client and server (also used in "createTables.py")
#	Ignore 'in-progress' builds
#   Ignore project xml files 
#   Re-do directory structure to include a project root directory
#

# for testing without DB accessible
db_present = 1

# configuration for data collection
ubuntu = {"root" : "wily", "table" : "ubuntu_builds"}
apache = {"root" : "A-D", "table" : "apache_builds"}

project_list = [apache]

#
#  Return an SQL insert statement using a dictionary as columns/values
#
#-----
def buildSQLInsert(d, table):
	columns = ', '.join(d.keys())
	values = d.values()
	values  = ', '.join(values)
	sql = "INSERT IGNORE INTO %s ( %s ) VALUES ( %s )" % (table, columns, values)
	return sql
	
#
#  Return a dict of row names and values from a build.xml
#-----
def parseBuildData(xml_tree):
	values = {}
	# map of xml key name to db column name
	# must match createTables.py
	tags = { "result"    : "result", 
	         "number"    : "number", 
			 "timestamp" : "start", 
			 "duration"  : "duration",
			 "builtOn"   : "server"
			}

	build = xml_tree.getroot()
	for element in build:
		for tag in tags.keys():
			if element.tag == tag:
				values[tags[tag]] = "'%s'" % element.text
	values["user"]     = getUser(build)

	return values
	
#-----	
#  It's possible to have multiple 'culprits'. For now just get the first one.
#
def getUser(build):
	name = "<none>"
	try:
		name = build.find("changeSet").find("item").find("author").find("fullName")
		user = name.text
		
	except:  # Exception if "culprit" tag isn't present (e.g. triggered by upstream build)
		user = "<none>"
		
	return "'%s'" % user

def appendBuilds(file_list, table_name):
	for file in file_list:
		# process all directories
		if os.path.isdir(file):
			build_list = os.listdir(file)
			#
			# get data for each build
			#
			for build in build_list:
				print "Directory: %s, File %s<br>" % (file, build)
				if file == (build.replace(".xml", "")):   # skip if it's the project file. 
					continue
				build_data = {}
				try:
					print "attempting to parse " + file + "/" + build + "<br>"

					tree = ET.parse(file + "/" + build)
					build_data.update(parseBuildData(tree))
					build_data["project_name"] = "'%s'" % file
				except Exception, err:
					print "Parse failure : " + str(err.args[0])
			#
			#  Add the data to the build table. 
			#
				sql = buildSQLInsert(build_data, table_name)
				print "Executing -> " + sql + "<br>"
				if db_present:
					try:
						db.execute(sql)
						connection.commit()  # necessary to commit after each execute??

					except MySQLdb.Error, e:
						print "Error %d: %s<br>" % (e.args[0], e.args[1])

#------------------------------------------------------------
#
#		*Main*
#
if db_present:
	try:
		db_info = db_util.db_cred()
		connection = MySQLdb.connect (host = db_info["host"], user = db_info["user"], passwd = db_info["passwd"], db = db_info["db"])
		db = connection.cursor()
	except MySQLdb.Error, e:
		print "Error %d: %s<br>" % (e.args[0], e.args[1])
		print dbg
	
#
#  Cycle through directories based on projects
#
for proj in project_list:
	print "<h2> --- Beginning data import for proj %s </h2>" % proj
	os.chdir(proj["root"])
	file_list = os.listdir(".")

	appendBuilds(file_list, proj["table"])
	
	os.chdir("..")

if db_present:	
	connection.close()