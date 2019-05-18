#
#   Compare the files/directories under two base paths
#
import os
import sys
import getopt

if __name__ == "__main__":

	if len(sys.argv) < 2:
		show_usage()
	
	optlist, args = getopt.getopt(sys.argv[1:], "")
	print "args: " + str(args)
	if len(args) > 2:
		show_usage()
	if args[0]