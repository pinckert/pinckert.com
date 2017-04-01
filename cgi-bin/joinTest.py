#!/usr/bin/python
import time_util
import re
# print "Content-type:text/html\n\n"

# Binary search an array
# Return array index of an element that matches the value or -1

def bsearch(value, array):
	if not isinstance(array, list):
		print "type(array) != list"
		return -1
	length = len(array)
	if length == 0:
		return 0
	offset = length/2

	if length == 1:
		if array[0] == value:
			return 1
		else:
			return 0
	elif array[offset] > value:
		return  bsearch(value, array[0:offset]) 
	else:
		return bsearch(value, array[offset:])

"""
stuff = {}
for a in 'abcdefghijklmnopqrstuvwxyz':
	print "a = " + a
	for i in range(10):
		if not stuff.has_key(a):
			stuff[a] = [i]
		else:	
			stuff[a].append(i)
		
print stuff

#cat = []


#for key in stuff:
#	cat.append(stuff[key])

#str = "abcdefghijklmnop"	
#print str.replace("jkl","")

#foo = stuff.keys()
#foo.sort()

#for key in foo:
#	print "%s : %s" % (key, stuff[key])

	
#print "".join(cat)
#print str(cat)
"""
def matchWords(str):
	str = "TTThis is a smaple string to test regex"
	try:
		regex = re.compile("[a-z]+")
		print regex
		matches = regex.findall(str)
		print matches
		for i, match in enumerate(matches):
			print "%d : %s" % (i, match)
	except Exception, e:
		print "Exception: %s" % e[0]
		
# matchWords("foo")
#
#   Binary search tests
#
array1 = [2, 5, 6, 8,9, 12, 23, 37, 54, 74, 95]
print bsearch(9, array1)
print bsearch(6, array1)
print bsearch(95, array1)
print bsearch(24, array1)
print bsearch(100, array1)
print bsearch(-25, array1)
print bsearch(1, [1])
print bsearch(2, [1])
print bsearch(2, {"a": 1, "b" : 2})


