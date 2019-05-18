#!/usr/bin/python
''' Simple string substitution without using replace '''

def URLify(base):
	return "%20".join(base.split(" "))
	
if __name__ == "__main__":		
	list = ["puppies are cute", "pop goes the weasel", "fuzzy bear", "abcdef"]
	for str in list:
		print "URLified: %s" % (URLify(str))
		
		
