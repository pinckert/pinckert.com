# 
#  Read DB  credentials
#
def db_cred():
	fp = open("./db_connect/db_info.txt", "r")
	info = fp.read()
	return (eval(info))	
