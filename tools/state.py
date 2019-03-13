
transitions = {"a" : ["fault", "c", "b", "fault", "fault", "fault"],
			   "b" : ["fault", "fault", "fault", "a", "fault", "c"],
			   "c" : ["a", "fault", "fault", "fault", "b", "fault"]
			  }

minTransition = 1
maxTransition = 6

def state_machine(stateList):
	if not isinstance(stateList, list):
		print "type error: " + type(stateList)
	
	current = "a"
	for value in stateList:
		if value < minTransition or value > maxTransition:
			return "fault"
			
		current = transitions[current][value-1]
		if current == "fault":   # no need to continue
			break;
	
	return current
			
tests  = [ [2, 1, 3, 4, 2, 5], 
           [],
 		   [10]
		 ]
			
if __name__ == "__main__":		
	for test in tests:
		print state_machine(test)