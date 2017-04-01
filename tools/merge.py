import sys
import os

#
#  take a text listing of mouse events and values and produce an html page.
#

header = "<!DOCTYPE html><html><head>	<link rel='stylesheet' href='./styles/site.css'></head><table>"
trailer = "</table></html>"
in1 = open("events.txt")
in2 = open("mouseEvent.txt")

values = {}
events = {}

print header

for line in in1:
	event = line.split(":")[0]
	html = "<tr><td><a href='https://www.w3schools.com/jsref/event_%s.asp'>%s</a></td><tr>" % (event, event)
	print html

print trailer
