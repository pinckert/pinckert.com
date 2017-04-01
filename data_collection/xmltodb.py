#!/usr/bin/python
print "Content-type:text/html\n\n"
import os
import sys
import _mysql
import MySQLdb
import xml.etree.ElementTree as ET
#
#   Migrate XML build files to DB
#  -- Need to do this on server side since connection not allowed from local client
#
#  To-do
#	Ignore 'in-progress' builds
#   Ignore project xml files 
#   Double records when reloading?



#
#  Return an SQL insert statement using a dictionary as columns/values
#
#-----
def buildSQLInsert(d):
	table = "builds"
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
#		values["trigger"]  = getTrigger(build)
	return values
	
#-----	
#  It's possible to have multiple 'culprits'. For now just get the first one.
#
def getUser(build):
	culprit = build.find("culprit")            # build.findall("culprit")
	name = culprit.find("fullName")
	return "'%s'" % name.text
	
#------------------------------------------------------------
#
#		*Main*
#
try:
	connection = MySQLdb.connect (host = "pinckert.veriomysql.com", user = "pinckert", passwd = "Puff2%Dragon", db = "pinckert")
	db = connection.cursor()
except MySQLdb.Error, e:
	print "Error %d: %s<br>" % (e.args[0], e.args[1])
	print dbg
	
os.chdir("ApacheCommons")
file_list = os.listdir(".")

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
				print tree
				build_data.update(parseBuildData(tree))
				build_data["project_name"] = "'%s'" % file
			except Exception, err:
				print "Parse failure : " + str(err.args[0])
			#
			#  Add the data to the build table. 
			#
			sql = buildSQLInsert(build_data)
			print "Executing -> " + sql + "<br>"
			try:
				db.execute(sql)
				connection.commit()

			except MySQLdb.Error, e:
				print "Error %d: %s<br>" % (e.args[0], e.args[1])
connection.close()