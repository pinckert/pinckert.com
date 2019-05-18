#!/usr/bin/python
#from __future__ import print_function
import os
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
			  

#
#   Remove "old" files to clean up data...
#
for file in kill_files:
	print "Deleting: " + file
	os.remove(file)
