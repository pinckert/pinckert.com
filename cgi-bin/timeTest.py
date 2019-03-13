
import math

def prettyDelta(duration):
	norm = float(duration) / 1000 # convert to seconds
	seconds = math.floor(norm % 60)
	norm /= 60
	minutes = math.floor(norm % 60)
	return "%2d:%02d" % (minutes, seconds)
	
duration = 65393
print prettyDelta(duration)