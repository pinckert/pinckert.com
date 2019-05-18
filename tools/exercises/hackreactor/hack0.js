'use strict'
//
//  Module 0
//

 //converts an object literal into an array of arrays
function convertObjectToList(obj) {
   var retArray=[];
   var i = 0;
   for (var key in obj) {
       retArray[i] = [key, obj[key]];
       console.log("key = " + key + " Obj[key] = " + obj[key]);
	   i++;
   }
	console.log("Length = " + retArray.length);
   return retArray;
}
function transformEmployeeData(array) {
    var retObj = [];
    for (var i=0; i<array.length; i++) {
		var entry = {};
		for (var j=0; j<array[i].length; j++) {
            var key   = array[i][j][0];
            var value = array[i][j][1];
			console.log("key = " + key + " value = " + value);
            entry[key] = value;
        }
		console.log ("Entry = " + entry);
		retObj.push(entry);
    }
	for (i = 0; i<retObj.length; i++) {
		for (var key in retObj[i]) {
		  console.log("key = " + key + " value = " + retObj[i][key]);
		}
	}
    return retObj;
}
var customerData = {
  'Joe': {
    visits: 1
  },
  'Carol': {
    visits: 2
  },
  'Howard': {
    visits: 3,
  },
  'Carrie': {
    visits: 4
  }
};
/*
Given a name, "greetCustomers" returns a greeting based on how many times that customer has visited the restaurant. 
*/
function greetCustomer(firstName) {
  var allGreetings = ["Welcome! Is this your first time?",
                      "Welcome back, %s! We\'re glad you liked us the first time!",
                      "Welcome back, %s! So glad to see you again!"];
  var greeting = "";
  if (firstName === undefined || firstName === "") {
      return "Welcome! I didn't catch your name...";
  }
  // check to see if they are in the list...
  if (!customerData.hasOwnProperty(firstName)) {
      greeting = allGreetings[0];
  }
  else {  // assumes the list is properly managed.
      var visits = customerData[firstName]["visits"] > 1 ? 2 : 1 ;
      greeting = allGreetings[visits].replace("%s", firstName);
  }
  return greeting;
}
