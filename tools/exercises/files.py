#!/usr/bin/python
import os
import sys
import cgi
import cgitb
import logging
import json

if __name__ == "__main__":		

	file = open("input.txt")	
	content = file.readlines()
	words = [word.strip("\n") for line in content for word in line.split(" ")]
	print words