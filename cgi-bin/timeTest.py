<<<<<<< HEAD

import math

def prettyDelta(duration):
	norm = float(duration) / 1000 # convert to seconds
	seconds = math.floor(norm % 60)
	norm /= 60
	minutes = math.floor(norm % 60)
	return "%2d:%02d" % (minutes, seconds)
	
duration = 65393
=======

import math

def prettyDelta(duration):
	norm = float(duration) / 1000 # convert to seconds
	seconds = math.floor(norm % 60)
	norm /= 60
	minutes = math.floor(norm % 60)
	return "%2d:%02d" % (minutes, seconds)
	
duration = 65393
>>>>>>> cb97fa344060fddee1b1b68722c1e6b281f454c7
print prettyDelta(duration)