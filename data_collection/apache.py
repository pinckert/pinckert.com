#!/usr/bin/python
#from __future__ import print_function
import os
import sys
import urllib
import xml.etree.ElementTree as ET
import time
"""
Attempted using jenkinsapi, but after ~10 minutes, the following request failed on the apache build server...

import jenkinsapi
from jenkinsapi.jenkins import Jenkins

jenkins = Jenkins('https://builds.apache.org')
# Print all jobs in Jenkins
print(jenkins.items())

ERROR:root:Failed request at https://builds.apache.org/job/FlexJS Pipeline/job/f
eature-autobuild%2Fcleanup/api/python with params: None
...
  File "C:\Python27\lib\jenkinsapi\jenkinsbase.py", line 83, in get_data
    response.raise_for_status()
  File "C:\Python27\lib\site-packages\requests\models.py", line 909, in raise_fo
r_status
    raise HTTPError(http_error_msg, response=self)
requests.exceptions.HTTPError: 404 Client Error: Not Found for url: https://buil
ds.apache.org/job/FlexJS%20Pipeline/job/feature-autobuild%2Fcleanup/api/python

"""

#
#  Approach:
#		Save a hierarchy of xml files that will be imported to DB on the server side.
#		For each view, job, server, etc. provide a method to return a dict. of ID's and URL's
#		Generate the filename/directory from the ID and use the URL to retrieve the .xml for the given resource 
#

# Global constant
base_urls = {
	"apache"  : "https://builds.apache.org/",
#	"ubuntu"  : "https://jenkins.qa.ubuntu.com/",
#	"jenkins" : "https://ci.jenkins.io/",
			}

base_path = { 
			  "apache"  : "A-D",   # limit to just the 'A-D' view
#			  "ubuntu"  : "wily",  # limit to just the 'wily' view
#			  "jenkins" : "",
			}  

directories = { "views"   : "./views",
				"servers" : "./servers",
				"users"   : "./users"
			  }
#
# Apache failed to clean up a few projects when they migrated...
#
kill_files = ["A-D/Commons-Compress-Windows/33.xml",
				"A-D/Commons-Compress-Windows/46.xml",
				"A-D/Commons-Compress-Windows/57.xml",
				"A-D/Commons-Compress-Windows/59.xml",
				"A-D/Commons-Compress-Windows/64.xml",
				"A-D/AntLib-props/22.xml",
				"A-D/AntLib-props/23.xml",
				"A-D/AntLib-props/24.xml",
				"A-D/AntLib-props/25.xml",
				"A-D/AntLib-svn/13.xml",
				"A-D/AntLib-svn/14.xml",
				"A-D/AntLib-svn/15.xml",
				"A-D/AntLib-antunit/31.xml",
				"A-D/AntLib-antunit/32.xml",
				"A-D/AntLib-antunit/33.xml",
				"A-D/AntLib-antunit/34.xml",
				]
			  
# helper functions
def updateCounts(counts, classType):
	type = classType["_class"];
	if type in counts:
		counts[type] += 1
	else:
		counts[type] = 1
#
#  URL's are returned from REST API without the trailing /api/xml.
#
def buildPath(url, resource_type="", resource=""):
	return url + "/" + resource_type + "/" + resource + "/api/xml" 

def createDirectoryStructure(project):
	for subdir in directories:
		dir = project + "/" + subdir
		if not (os.path.exists(dir)):
			os.makedirs(dir)
#
#    Save the XML at the given path
#		
def saveXML(url, path):
	xml = getXML(url)

	if path != "":
		fp = open(path, "w")
		fp.write(xml)
		fp.close()
	return xml
	
def getXML(url):
	time.sleep(15)                 # apache doesn't like rapid requests anymore. :-(
	page = urllib.urlopen(url)
	xml = page.read()	
	return xml
#
#  Standalone routine to determine what job types are used in the project
#
def allJobTypes(base_url):
	url = buildPath(base_url)
	page = urllib.urlopen(url)
	
	fp = open("jobs.txt", "w")
	jobTypeCounts = dict()

	xml = ET.fromstring(r1)
	for job in xml.findall("job"):
		for elem in job:
			if elem.tag == "name":
				updateCounts(jobTypeCounts, job.attrib)
				fp.write(job.tag + " : " + elem.text + "\n")

	fp.close()	
	for key in jobTypeCounts:
		print key, " : ", jobTypeCounts[key]
#
#  Return a dictionary of job names and their corresponding URL's
#	
def jobsFromView(url):
#	url = buildPath(base_url, "view", view_name)
	print "url = " + url
	#
	#  Changing
	#
	try:
		page = getXML(url)
		tree = ET.fromstring(page)
	except e:
		print "Error %d: %s<br>" % (e.args[0], e.args[1])	
	url_list = {}
	for job in tree.findall("job"):
		for key in job:
			if key.tag == "name":
				print "--%s--" % key.text
				name = key.text
			if key.tag == "url":
				print "\turl: %s" % key.text
				jobURL = key.text+"api/xml"
		url_list[name] = jobURL
	#
	#
	#
	for key in url_list:
		print "\t\t[" + key + "]\t" + url_list[key]
	return url_list	

def buildsFromJob(job):   	# input is the xml representing a job
	tree = ET.fromstring(job)		
	url_list = {}
	for build in tree.findall("build"):
		for key in build:
			if key.tag == "number":
				build_number = key.text
			if key.tag == "url":
				build_url = key.text + "api/xml"
		url_list[build_number] = build_url
	return url_list
	
def allServers(base_url):
	url = buildPath(base_url, "computer")
	page = saveXML(url, "servers.xml")

	tree = ET.fromstring(page)
	server_list = {}

	for server in tree.findall("computer"):

		for child in server:
			if child.tag == "displayName":
				server_name = child.text
				server_url = base_url + "/computer/" + child.text + "/api/xml"
		server_list[server_name] = server_url
		
	return server_list
#
# Debug routine: Print all tags from a ET tree
#
def printAll(tree, tag):
	print "printAll()"
	list = tree.findall(tag)
	for item in list:
		for key in item:
			print "\t" + key.tag  + "\t" + key.text
	print "---- printAll()"
#
#  
#	
def allSubViews(view_tree):
	#
	#  Use the presence of a "nestedView" tag to determine type of structure 
	#  e.g. if nestedView is present view URLs represent directories, otherwise they represent the projects.
	#
	xml = getXML(view_tree)
	tree = ET.fromstring(xml)
	printAll(tree, "view")
	viewList = []
	subViews = tree.findall("view")
	if not subViews:  # implies that there are no subviews, just return the current url as an array with one entry.
		print "No nested views, returning the path that was provied: " + view_tree
		return viewList.append(view_tree)
	else:
		for view in subViews:
			for key in view:
				if key.tag == "url":
					viewList.append(key.text)
	return viewList
#
#  Return all of the view URL's. Flattens nested views (is this desirable?)
#
def allViews(base_url):
	url = buildPath(base_url)
	xml = saveXML(url, "views.xml")
	tree = ET.fromstring(xml)
	view_list = {}
	
	for view in tree.findall("view"):
		for key in view:
			if key.tag == "name":
				view_name = key.text
			if key.tag == "url":
				view_URL = buildPath(key.text)
				
		view_list[view_name] = view_URL
	return view_list		

#
#   *** Main ***
#
projects = base_path.keys()    # list of projects, need to parameterize
for key in projects:
	print "Retrieving information for project : " + key
	path = base_path[key]
	createDirectoryStructure(path)
#	server_list = allServers(base_urls[key])
#	print "[Servers]"
#	for server in server_list:
#		print "\t" + server
#		server_path = directories["servers"] + "/" + server + ".xml"
#		saveXML(server_list[server], server_path)
	view_urls = allViews("https://builds.apache.org/view/A-D/api/xml")

	print "[views]"
#	for url in view_urls:
#		print "Getting views for : " + url
#		view_list += allViews(url)
	for view in view_urls:
		print "\t" + view + "\t" + path + "\t" + view_urls[view]
		jobList = jobsFromView(view_urls[view])
#		saveXML(view_urls[view], path)

		jobs = jobsFromView(view_urls[view])
		if not os.path.exists(base_path[key]):
			os.mkdir(base_path)
	
		for job in jobs:	
			print "%s : %s" % (job, jobs[job])
			job_dir = base_path[key] + "/" + job
			if not os.path.exists(job_dir):
				os.mkdir(job_dir)
			job_url = jobs[job]
			file_name = "%s/%s.xml" % (job_dir, job)
			print "Saving job xml as : %s" % file_name
			page = saveXML(job_url, file_name)
			builds = buildsFromJob(page)
			for build_number in builds:
				build_filename = job_dir + "/" + str(build_number) + ".xml"
				if os.path.exists(build_filename):
					print "\t...Skippiong : %s" % build_filename
					continue
				print "\tSaving build as %s" % build_filename
				saveXML(builds[build_number], build_filename)

#
#   Remove "old" files to clean up data...
#
for file in kill_files:
	os.remove(file)

sys.exit()
