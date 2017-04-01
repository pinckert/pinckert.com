#!/usr/bin/python
#from __future__ import print_function
import os
import sys
import urllib
import xml.etree.ElementTree as ET
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
base_url = "https://builds.apache.org"
base_path = "ApacheCommons"  # only monitoring one set of projects
directories = { "views"   : "./views",
				"servers" : "./servers",
				"users"   : "./users"
			  }
# helper functions
def updateCounts(counts, classType):
	type = classType["_class"];
	if type in counts:
		counts[type] += 1
	else:
		counts[type] = 1

def buildPath(resource_type="", resource=""):
	return base_url + "/" + resource_type + "/" + resource + "/api/xml" 

def createDirectoryStructure():
	for dir in directories:
		if not (os.path.exists(directories[dir])):
			os.mkdir(directories[dir])
#
#    Save the XML at the given path
#		
def saveXML(url, path):
	page = urllib.urlopen(url)
	xml = page.read()	
	fp = open(path, "w")
	fp.write(xml)
	fp.close()
	return xml
	
def getXML(url):
	page = urllib.urlopen(url)
	xml = page.read()	
	return xml
#
#  Standalone routine to determine what job types are used in the project
#
def allJobTypes():
	url = buildPath()
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
def jobsFromView(view_name):
	url = buildPath("view", view_name)
	print "url = " + url
	page = getXML(url)

	tree = ET.fromstring(page)
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
	return url_list	

def buildsFromJob(job):   	# input is the xml representing a job
	tree = ET.fromstring(job)		
	url_list = {}
	for build in tree.findall("build"):
		for key in build:
			if key.tag == "number":
				build_number = key.text
				print "build: %s" % key.text
			if key.tag == "url":
				build_url = key.text + "api/xml"
		url_list[build_number] = build_url
	return url_list
	
def allServers():
	url = buildPath("computer")
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
				
def allViews():
	url = buildPath()
	xml = saveXML(url, "views.txt")
	tree = ET.fromstring(xml)	
	view_list = {}

	for view in tree.findall("view"):

		for key in view:
			if key.tag == "name":
				view_name = key.text
			if key.tag == "url":
				view_URL = key.text + "api/xml"
				
		view_list[view_name] = view_URL
	return view_list		

#
#   *** Main ***
#
createDirectoryStructure()

server_list = allServers()
print "[Servers]"
for server in server_list:
	print "\t" + server
	server_path = directories["servers"] + "/" + server + ".xml"
	saveXML(server_list[server], server_path)
		
view_list = allViews()
print "[views]"
for view in view_list:
	print "\t" + view
	path = directories["views"] + "/" + view + ".xml"
	saveXML(view_list[view], path)

#
#  For each job in a view, save the job and builds in .xml format.
#

jobs = jobsFromView("Apache%20Commons")
if not os.path.exists(base_path):
	os.mkdir(base_path)
	
for key in jobs:	
	print "%s : %s" % (key, jobs[key])
	job_dir = base_path + "/" + key
	if not os.path.exists(job_dir):
		os.mkdir(job_dir)
	job_url = jobs[key]
	file_name = "%s/%s.xml" % (job_dir, key)
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
