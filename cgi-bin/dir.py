#!/usr/bin/python
import os
import sys
import cgi
import cgitb
import logging
import json

def buildLinks2(fileList, path):
#   path is the location from root (script executes in cgi-bin)
#   returns: array of dictionary
#   file content format:
#      name:   filename
#      is_dir: true if directory
#      link:   action to execute when clicked
#      size:   file size
#      date:   creation date
#
	file_info  = []
	parentDir = path[:path.rfind('/')]
	dotdot    = {"name": "..", "is_dir": True, "size": 0, "date": 0, "fileLoc": "    " + parentDir}
	file_info.append(dotdot)
	for file in fileList:
		fileLoc   = "../"+path+'/'+file
		entry = {
			"name":   file,
			"size":   os.path.getsize(fileLoc),
		    "is_dir": os.path.isdir(fileLoc),
		    "date":   os.path.getmtime(fileLoc),
			"link":   ""
		}
		if entry["is_dir"]:
			entry["fileLoc"] = fileLoc = "\\"+fileLoc
			link = "http://www.pinckert.com/cgi-bin/dir.py?path="+path
			entry["link"] = link
			file_info.insert(1, entry)
		else:
			entry["link"] = "http://www.pinckert.com/"+path+'/'+file
			file_info.append(entry)
			
	return file_info;

def buildLinks(fileList,path):
	linkList = []  # a list of html links :-P
	parentDir = path[:path.rfind('/')]
	dotdot = str.format("<tr><td><a href='/cgi-bin/dir.py?path={0}'>\\..</a></td></tr>", parentDir)
	linkList.append(dotdot)
	for file in fileList:
		fileLoc = "../"+path+'/'+file
		bonus = ""
		isDir = 0
		displayName = file
		if os.path.isdir(fileLoc):
			bonus = "/cgi-bin/dir.py?path="
			displayName = "\\" + displayName
			fileLoc = fileLoc[3:]  # remove the '../'
		link = str.format("<tr><td><a href='{2}{0}'>{1}</a></td></tr>", fileLoc,displayName,bonus)
		linkList.append(link)
	return linkList

def buildPage(content):
	header = list(("Content-Type: text/html","","<html>","<body>","<table><th>File list</th>"))
	trailer = list(("</table></body>","</html>"))
	page = ""
	for line in header+content+trailer:
	   page += line+"\n"
	print page
	
#------------------- MAIN ---------------------------
path = "" # directory path from base directory
isAJAX = False

if 'REQUEST_METHOD' in os.environ:   # handle cgi invocation
	cgitb.enable()
	form = cgi.FieldStorage()
	if (form.has_key("path")):
		path = form["path"].value
	if "HTTP_X_REQUESTED_WITH" in os.environ:
		isAJAX = True
else:
	if len(sys.argv) > 1:
		path = sys.argv[1]
		
targetDir = "../"+path  # path provided is relative to root, not cgi-bin
files     = os.listdir(targetDir)
files.sort()
if isAJAX:
	content = buildLinks2(list(files), path)
	print "Content-type:application/json\n\n"
	print json.dumps(content)
else:
	content = buildLinks(list(files), path)
	buildPage(content)
