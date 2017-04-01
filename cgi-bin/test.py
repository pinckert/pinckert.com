#!/usr/bin/python
import time_util
import re
# print "Content-type:text/html\n\n"

simple_dict  = {"a" : 1, "b" : 2, "c" : 3}
simple_array = [1, 2, 3, 5]
"""
class base:
	p = {}
	def __init__(self, params):
		self.p = params
		
	def __str__(self):
		return str(self.p)
		
	def accept(self, visitor):
		visitor.visit(self.p)
		
class base_visitor:
	def visit(self, d):
		for key in d:
			print "Key %s : Value %s" % (str(key), str(d[key]))
		
class xml_visitor(base_visitor):
	def visit(self, d):
		for key in d:
			print("<%s>%s</%s>") % (key, d[key], key)

if __name__ == "__main__":
	c = base(simple_dict)
	d = base_visitor()
	e = xml_visitor()

	c.accept(d)
	c.accept(e)

"""
# Binary search an array
# Return array index of an element that matches the value or -1
"""
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

def matchWords():
	str = "[this <is> (some) text] some{} more text"
	try:
		regex = re.compile("[\[\]\(\)\}\{<>]")
		print regex
		matches = regex.findall(str)
		print matches
		for i, match in enumerate(matches):
			print "%d : %s" % (i, match)
	except Exception, e:
		print "Exception: %s" % e[0]
		
matchWords()
"""
import re

def bracket_type(char):
    # valid bracket type ensured previously
    if char == "]":
        return "brace"
    if char == ">":
        return "angle"
    if char == ")":
        return "paren"
    if char == "]":
        return "square"

def other_counts(type, counts):
    total = bracket_counts["paren"] + bracket_counts["brace"] + bracket_counts["square"] + bracket_counts["angle"]
    return total - bracket_counts[type]
    
#
#  return 1 if counts can be update legally, 0 otherwise
#
def update_counts(char, counts):
    
    type = bracket_type(type)
    if bracket_counts[type] == 0:  # no opening bracket of the same type
        return 0
    if other_counts(type, counts) != 0:  #  other bracket is not closed
        return 0
    else:
        bracket_counts[type] += 1
        return 1

def hasBalancedBrackets(str):
    # Eliminate the extraneous characters. 
    # How to handle escaped characters in the input sequence?Not specified in requirements...
    
    # remove the extraneous characters so we're just left with a list of brackets.
	regex = re.compile("[\[\{<\([\]\}<\(]")    # Angle brackets not escaped, all others are.
	bracket_counts = {"square": 0, "angle" : 0, "brace" : 0, "paren" : 0}
    
	brackets = regex.findall(str)
	print brackets
    # Simple algorithm: if we encounter a closing bracket when OTHER bracket types are not completed
    # then we have an error. Otherwise decrement the count for the current brakcet
    
	for char in brackets:
		if char == "[":
			bracket_counts["square"] += 1
		elif char == "<":
				bracket_counts["angle"] += 1
		elif char == "(":
			bracket_counts["paren"] += 1
		elif char == "{":
			bracket_counts["brace"] += 1
		else:
			type = bracket_type(char)
			status = update_counts(char, bracket_counts)
			if status != 1:
				return status
#
#  If any remaining counts are non-zero it's invalid
#
	if bracket_counts["square"] + bracket_counts["angle"] + bracket_counts["paren"] + bracket_counts["brace"] != 0:
		return 0
#
#  No problems!
#
	return 1
	

print hasBalancedBrackets("")
print hasBalancedBrackets("{}")
print hasBalancedBrackets("<{}?")
print hasBalancedBrackets("{{{{}}}<>}")
#
#   Binary search tests
#
"""
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
"""		
