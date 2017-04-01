#!/usr/bin/python

class millisecond(int):
	def __str__(self):
		milliseconds = self%1000
		totalseconds = self/1000
		hours = totalseconds/3600
		minutes = (totalseconds-(hours*3600))/60
		seconds = (totalseconds-(hours*3600 + minutes * 60))

		return str.format("{0}:{1}:{2}", hours, minutes,seconds)
		

