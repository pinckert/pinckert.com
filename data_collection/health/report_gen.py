#!/usr/bin/python
import os
import sys
import cgi
import cgitb
import logging
import json

def readFile():
	file = open("blood pressure.txt")	
	content = file.readlines()
	# reduce to tab separated values (date, bp/p, bp/p, bp/p)
	lines = [line.strip("\n") for line in content]
	# reduce to [{date: [reading 1, reading 2, reading3]}, ...]
	values = []
	for line in lines:
		parsed = line.split('\t')
		date = parsed[0]
		bps = [value[0] for value in parsed[1:4]]
		pulse = [value[1] for value in parsed[1:4]]
		values.append({"date" : date, "bps" : bps, "pulse" : pulse})
	
	return values
		
		

if __name__ == "__main__":		

	data = readFile()
	print data