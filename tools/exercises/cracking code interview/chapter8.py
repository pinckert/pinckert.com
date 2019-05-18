
		

# recursive multiply
def mult(i,j):
	if j == 0:
		return 0
	if j == 1:
		return i
	else:
		return i + mult(i,j-1)
		
		
if __name__ == "__main__":			
	a = [0 for i in range(1000)]
	a[5] = "this"
	print a