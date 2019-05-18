#!/usr/bin/python

def firstCharacter(word):
	return word[0]
	
def vowelFilter(c):
	return firstCharacter(c) in ['a','e','i','o','u','y']
	
def add(x,y): return x+y

if __name__ == "__main__":

	a = "abcedfghijklmnopqrstuvwxyz"
	animals = ["ant", "bear", "cat", "dog", "elephant", "frog", "giraffe", "horse", "iguana", "jaguar", "kangaroo", "lion", "mouse", "newt", "owl", "pig", "quail", "racoon", "seal", "toad", "uakari", "vulture", "walrus", "xerus", "yak", "zebra"]

# array 1,2,..,10	
	first_ten = [i for i in range(10)]
	print first_ten
	# The following creates an array with one element: an array of 0..9.
	second_ten = [range(10)]
	print second_ten
	
# array of [[1,2,..10],[11,12..,20],..,[91,92..100]]
	ten_by_ten = [[i+(j*10)+1 for i in range(0, 10)] for j in range (0, 10)]
	print ten_by_ten

# ... or ...	
	b3 = []
	for i in range(10):
		b3.append([])
		for j in range(10):
			b3[i].append(j+(i*10)+1)
	print b3

# dictionary values where their position is the key and letter is the value
	c = dict((i, value) for i, value in enumerate(a))
	print c

# iteritems() returns the key/value pair 	
	for key, value in c.iteritems():
		print "{}: {}".format(key, value) 

	d = dict((key, animal) for key, animal in c.iteritems())
	print d
	
# 2 lists to dictionary
	num   = [7,8,9,10,11,12]
	words = ["the", "quick", "brown", "fox", "jumped", "over"]
	foo = dict((num[i],v) for i, v in enumerate(words))
	print foo
	
# dictionary to two arrays 
	keys   = foo.keys()
	values = foo.values()
	print keys
	print values

# flatten array of arrays...
	list = [value for row in ten_by_ten for value in row]
	print "List (flatten): "
	print list
#   ... equivalent to
	list = []
	for row in ten_by_ten:
		for value in row:
			list.append(value)

	print list

# manipulations
	print "---------  Filter -------------"
	# list with only words beginning with a vowel
	v = filter(vowelFilter, animals)
	print v
	
	print "---------  Map -------------"
	m = map(firstCharacter, animals)
	print m
	
	print "-----------Reduce -------------"
	r = reduce(add, (reduce(add, arr, 0) for arr in ten_by_ten), 0)
	print r