#!/usr/bin/python
''' Determine if a string can be rewritten as a palindrome '''

def isPalindrome(base):
	counts = {}
	even_counts = 1
	for letter in base:
		if not letter.isalpha():
			continue
		if counts.has_key(letter):
			counts[letter] += 1
		else:
			counts[letter] = 1
			
# A palindrome requires all but one letter to have an even count	
	for key in counts:
		if counts[key] % 2 != 0:
			if not even_counts:
				return 0
			else:
				even_counts = 0

	return 1
	
if __name__ == "__main__":		
	list = ["abcabc", "abcdabc", "abcdabce"]
	for str in list:
		if isPalindrome(str):
			print "%s is palindronable" % (str)
		else:
			print "%s can not be made into a palindrome" % (str)
		
		
