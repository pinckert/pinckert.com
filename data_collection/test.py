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
		
	
b = Base(4)
b.who()
one = DerivedOne(5)
one.who()
two = DerivedTwo(6)
two.who()