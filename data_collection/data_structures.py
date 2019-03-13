
import os
import sys

def helloWorld():
	print "Hello World."

d = {
	"scalar"  : "Hello World!",
	"anArray" : [5, 6, 7, 8, 9],
	"aTuple"  : ("abc", "def", helloWorld),
	"aDict"   : {"one" : 1, "two" : 2, "three" : 3}
}

for key in d:
	print type(d[key])
	print key + " : " + str(d[key])
	if type(d[key]) is list:
		for index, i in enumerate(d[key]):
			print "\t[" + str(index) +"] : " + str(i)
	if type(d[key]) is dict:
		for label in d[key]:
			print "\t[" + label + "] : " + str(d[key][label])
	if type(d[key]) is tuple:
		for value in d[key]:
			print "(" + str(value) + ")"

class Base():			
	value = 0
	def __init__(self, baseValue):
		value = baseValue
		
	def who(self):
		print "baseClass() : " + str(self.value)
		
class DerivedOne(Base):
	def __init__(self,initValue):
		self.value = initValue
	
class DerivedTwo(Base):
	def __init__(self, initValue):
		self.value= initValue
		
	def who(self):
		print "derivedTwo() :" + str(value)
		
	
d["aTuple"][2]()

b = Base(4)
b.who()
one = DerivedOne(5)
one.who()
two = DerivedTwo(6)
two.who()