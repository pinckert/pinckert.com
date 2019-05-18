#!/usr/bin/python
''' Determine if a string is a rotated version of another string '''

def isRotatedString(base, rotated):
	if len(base) != len(rotated):
		return 0
		
	compare = rotated+rotated
	if compare.find(base) != -1:
		return 1
	else:
		return 0
	
if __name__ == "__main__":		
	list = [["puppy", "ppypu"], ["pop", "opp"], ["fuzzy bear", "bear fuzzy"], ["abc", "def"], ["turtle", "aturtle"]]
	for pair in list:
		if (isRotatedString(pair[0], pair[1])):
			print "match: %s %s" % (pair[0], pair[1])
		else:
			print "no match: %s %s" % (pair[0], pair[1])
