

class Snode:
	def __init__(self, value=0):
		self.value = value
		self.next = None

class Stack:
	''' Simple queue for integers integers '''
	# CTOR
	def __init__(self):
		self.head = None

	# Insert at end	
	def push(self, snode):
		 snode.next = self.head
		 self.head = snode

	def pop (self):
		if self.head == None:
			return None
		temp = self.head
		self.head = temp.next
		temp.next = None
		return temp
		
if __name__ == "__main__":	
	mine = Stack()
	for i in range(1, 100, 2):
		mine.push(Snode(i))
		
	node = mine.pop()
	while node != None:
		print node.value
		node = mine.pop()
		
		
		
	