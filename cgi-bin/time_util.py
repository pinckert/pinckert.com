<<<<<<< HEAD
import math
import datetime
#
#  Convert epoch time to human readable
#
def prettyDate(epoch_time):
	try:
		t = datetime.datetime.fromtimestamp(float(epoch_time)/1000)
		return t.ctime()
	except:
		return "Invalid input: %s" % str(epoch_time)

#
#  Format milliseconds as minutes:seconds
#	
def prettyDelta(duration):
	norm = float(duration) / 1000   # convert to seconds
	seconds = round(norm) % 60
	norm /= 60
	minutes = norm % 60
	if norm  <= 60:
		return "%02d:%02d" % (minutes, seconds)
	
	norm /= 60
	hours = norm % 24
	return 	"%3d:%02d:%02d" % (hours, minutes, seconds)
"""
delta = 5926
print prettyDelta(delta)
=======
import math
import datetime
#
#  Convert epoch time to human readable
#
def prettyDate(epoch_time):
	try:
		t = datetime.datetime.fromtimestamp(float(epoch_time)/1000)
		return t.ctime()
	except:
		return "Invalid input: %s" % str(epoch_time)

#
#  Format milliseconds as minutes:seconds
#	
def prettyDelta(duration):
	norm = float(duration) / 1000   # convert to seconds
	seconds = round(norm) % 60
	norm /= 60
	minutes = norm % 60
	if norm  <= 60:
		return "%02d:%02d" % (minutes, seconds)
	
	norm /= 60
	hours = norm % 24
	return 	"%3d:%02d:%02d" % (hours, minutes, seconds)
"""
delta = 5926
print prettyDelta(delta)
>>>>>>> cb97fa344060fddee1b1b68722c1e6b281f454c7
"""