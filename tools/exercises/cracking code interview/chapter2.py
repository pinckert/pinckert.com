
class Node:
	''' Simple linked list for integers '''
	# CTOR
	def __init__(self, value=0):
		self.data = value
		self.next = None
	
	# Insert at end	
	def insert(self, new):
		ptr = self
		while (ptr.next != None):
			ptr = ptr.next
		ptr.next = new	
	
		
	def printAll(self):
		ptr = self
		while ptr != None:
			print "-->\t" + str(ptr.data)
			ptr = ptr.next
	
	def contains(self, value):
		ptr = self
		while ptr != None:
			if ptr.value == value:
				return true
		return false
	#
	#  delete all occurrences of nodes with a given value
	#
	def delete(self, value):
		ptr = self
		while ptr != None:
			if ptr.data == value:  # only if the initial node contains the value to be deleted.
				if ptr == self:
					self = self.next
					ptr = self
			else:
				if ptr.next != None:
					print "Data from next node = " + str(ptr.next.data)
					if ptr.next.data == value:
						ptr.next = ptr.next.next
				ptr = ptr.next
		return self
	# treat the list as a number (head = least significant digit) and add to another list treated the same way
	
	def add(self, other):
		if self == None:
			return other
		if other == None: 
			return self

		myValue = self.data
		while self.next != None:
			myValue = myValue*10 + self.data
			self = self.next
		
		otherValue = other.data
		while other.next != None:
			otherValue = otherValue*10 + other.data
			other = other.next
		
		return myValue + otherValue
		
	def hasLoop(self):
		if self == None or self.next == None or self.next.next == None:
			return

		slow = self
		fast = self.next
		while slow != fast and (slow.next != None and fast.next.next != None):
			print "Slow: " + str(slow.data) + "\tFast: " + str(fast.data)
			slow = slow.next
			fast = fast.next.next

		print "Slow: " + str(slow.data) + "\tFast: " + str(fast.data)			
		
		if slow == fast:
			print "loop found"
		else:
			print "no loop found"
	
	
#  End of Node  ------------------------------------------------------------------

def TestLoop():
	print "Executing TestLoop()..."
	head = Node(5)
	head.insert(Node(6))
	head.insert(Node(7))
	head.insert(Node(8))
	head.insert(Node(9))	
	loop = Node(50)
	head.insert(loop)
	loop.insert(Node(51))
	loop.insert(Node(52))    
	loop.insert(Node(53))
	loop.insert(Node(54))
	culprit = Node(100)
	culprit.next = loop
	loop.insert(culprit)
	
	head.hasLoop()

def TestDelete():
	print "\n\nExecuting TestDelete()..."
	head = Node(5)
	head.insert(Node(5))
	for i in range(1,10):
		print "i = " + str(i)
		newNode = Node(i)
		head.insert(Node(i))

	head.insert(Node(5))
	print "Printing list: "
	head.printAll()
	head = head.delete(5)
	head.printAll()
				
if __name__ == "__main__":				
	print Node.__doc__
		
	TestLoop()
	TestDelete()

	
	