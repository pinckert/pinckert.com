#/bin/python
#	Copyright Dean Pinckert 2017
#   Simple brace matching routine (demonstrate recursion)
#
import re

#
#  Braces to check for
#
matches = {	"<" : ">",
			"{" : "}",
			"[" : "]",
			"(" : ")"}

def isMatched(string):
	if (len(string) == 0):
		return 1
	if (len(string) == 1):
		return 0
	if not matches.has_key(string[0]):
		return 0
		
#
#   if there is a matching pair, remove it and check the remainder of the string.
#
	matching_index = string.rfind(matches[string[0]])
	if matching_index == -1:
		return 0;
	pre = string[1:matching_index]
	post = string[matching_index+1:]
	print "pre: " + pre + " post: " + post
	return isMatched(pre) and isMatched(post)

def hasBalancedBrackets(string):
    # Eliminate the extraneous characters. 
    # How to handle escaped characters in the input sequence?Not specified in requirements...
    
    # remove the extraneous characters so we're just left with a list of brackets.
	regex = re.compile("[\[\{<\(\[\]\}>\)]")    # Angle brackets not escaped, all others are.
    
	brackets = regex.findall(string)
	asString = "".join(brackets)
	return isMatched(asString);

if __name__ == "__main__":

	hasBalancedBrackets("")
	print hasBalancedBrackets("(some random text)")
	# assume the regular expression works correctly and don't worry about adding additional charcters
	print hasBalancedBrackets("<{}>>>")
	print hasBalancedBrackets("{ ( { } ) < [ ] > }")
print hasBalancedBrackets("{({{})}<>}")