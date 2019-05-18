<<<<<<< HEAD
#!/usr/bin/python
import os
import sys
import json
import cgi
import cgitb
cgitb.enable()
#
#   Return the server side environment variables
#
print "Content-type:application/json\n\n"
keylist = dict()
keys = os.environ.keys()
for key in keys:
	keylist[key] = os.environ[key] 

print json.dumps(keylist)
=======
#!/usr/bin/python
import os
import sys
import json
import cgi
import cgitb
cgitb.enable()
#
#   Return the server side environment variables
#
print "Content-type:application/json\n\n"
keylist = dict()
keys = os.environ.keys()
for key in keys:
	keylist[key] = os.environ[key] 

print json.dumps(keylist)
>>>>>>> cb97fa344060fddee1b1b68722c1e6b281f454c7
