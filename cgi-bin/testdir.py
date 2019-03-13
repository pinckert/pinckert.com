#!/usr/bin/python
import os
import sys
import json

def buildLinks(fileList, path):
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
	dotdot    = {"name": "..", "is_dir": True, "size": 0, "date": 0}
	for file in fileList:
		fileLoc   = "../"+path+'/'+file
		entry = {
			"file":    file,
			"size":    os.path.getsize(fileLoc),
		    "is_dir":  os.path.isdir(fileLoc),
		    "date":    os.path.getmtime(fileLoc),
			"link":    ""
		}
		if entry["is_dir"]:
			entry["fileLoc"] = fileLoc = "\\"+fileLoc
			link = "http://www.pinckert.com/cgi-bin/dir.py?path="+path
			entry["link"] = link
		else:
			entry["link"] = "http://www.pinckert.com/"+path+'/'+file
		file_info.append(entry)

	return file_info;

path = "tools/calendar"
targetDir = "../"+path 
print targetDir
files     = os.listdir(targetDir)
print files
info      = buildLinks(files, path)
print info
