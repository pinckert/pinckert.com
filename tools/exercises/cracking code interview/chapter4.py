#!/usr/bin/python

class BTree:
	''' Simple binary tree : lower values left, higher values right '''
	def __init__(self, value = 0):
		self.left  = None
		self.right = None
		self.data  = value 
		
	def insert(self, value):
		if value <= self.data:
			if self.left == None:
				self.left = BTree(value)
			else:
				self.left.insert(value)
		else:
			if self.right == None:
				self.right = BTree(value)
			else:
				self.right.insert(value)

	def listInOrder(self):
		if self.left != None:
			self.left.listInOrder()
		print "[%d]" % self.data
		if self.right != None:
			self.right.listInOrder()
	
	def listPreOrder(self):
		print "[%d]" % self.data	
		if self.left != None:
			self.left.listPreOrder()

		if self.right != None:
			self.right.listPreOrder()

			
	def listPostOrder(self):
		if self.left != None:
			self.left.listPostOrder()

		if self.right != None:
			self.right.listPostOrder()
		print "[%d]" % self.data

	# List the values by level within the tree
	# Use an array of lists to store values
	
	def listByRow(self, currentRow, values):
		row = str(currentRow)
		if not values.has_key(row):
			values[row] = []
		values[row].append(self.data)
		if self.left != None:
			self.left.listByRow(currentRow+1, values)
		if self.right != None:
			self.right.listByRow(currentRow+1, values)
			
		if currentRow == 0:
			for key in sorted(values.keys()):
				print "[%s]: %s" % (key, values[key])
	
		
if __name__ == "__main__":				
	print BTree.__doc__
	
	head = BTree(20)
	
	values = [17,22,25,3,40,5,15,32,12, 21,29,1,14]
	
	for i in values:
		head.insert(i)
		
	head.listInOrder()
	valueList = {}
	
	head.listByRow(0, valueList)
	