'use strict'
//
//  Module 1
//
// 0: extend()
var obj1 = {
  a: 1,
  b: 2
};
var obj2 = {
  b: 4,
  c: 3
};
// 0: extend()
/*
Given two objects, "extend" adds properties from the 2nd object to the 1st object.

function extend(obj1, obj2) {
	if (obj1 === 'undefined' || obj2 === 'undefined') {
		console.log("invalid object passed to extend()");
	}
		
	for (var key in obj2) {
		if (!obj1.hasOwnProperty(key)) {
			obj1[key] = obj2[key];
		}
	}
}
// 1: countWords()

Given a string, "countWords" returns an object where each key is a word in the 
given string, with its value being how many times that word appeared in the given 
string. 

function countWords(str) {
	var wordCount = {};
	var words = str.split(" ");
	if (str === undefined || str.length === 0) { 
		return wordCount;
	}
	for (var i=0; i<words.length; i++) {
		if (wordCount.hasOwnProperty(words[i])) {
			wordCount[words[i]]++;
		} else {
			wordCount[words[i]] = 1;
		}
	}
	return wordCount;
}

// 2: isPersonOldEnoughToDrinkAndDrive(person)
/*
Given a "person" object, that contains an "age" property, 
"isPersonOldEnoughToDrinkAndDrive" returns whether the given 
person is old enough to legally drink and drive in the United States.

function isPersonOldEnoughToDrinkAndDrive(person) {
	return false;
}
 */
//3: getElementsThatEqual10AtProperty(obj, key)
/*
var obj = {
  key: [1000, 10, 50, 10]
};

Given an object and a key, "getElementsThatEqual10AtProperty" returns an 
array containing all the elements of the array located at the given key 
that are equal to ten.

function getElementsThatEqual10AtProperty(obj, key) {
	var tens = [];
	if (obj === undefined || key === undefined ) {
		return tens;
	}
	if (!obj.hasOwnProperty(key) || obj[key] === undefined || obj[key].length === 0)  {
		return tens;
	}
	for (var i=0; i<obj[key].length; i++)	
	{
		if (obj[key][i] == 10) {
			tens.push(10);
		}
	}
	return tens;
}
*/
// 4: select()

/*
var arr = ['a', 'c', 'e'];
var obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
};

 Given an array and an object, "select" returns a new object whose properties
 are those in the given object AND whose keys are present in the given array. 

function select(arr, obj) {
	var subSet = {};
	if (obj === undefined || arr === undefined ) {
		return subSet;
	}
	for (var i=0; i<arr.length; i++) {
		var key = arr[i];
		if (obj.hasOwnProperty(key)) {
			subSet[key] = obj[key];
		}
	}
	return subSet;
}
*/	
// 5: getElementsLessThan100AtProperty
/*
var obj = {
  key: [1000, 20, 50, 500]
};

Given an object and a key, "getElementsLessThan100AtProperty" returns an array 
containing all the elements of the array located at the given key that are less than 100.

function getElementsLessThan100AtProperty(obj, key) {
	var elements = [];
	if (obj === undefined || key === undefined ) {
		return elements;
	}
	if (!obj.hasOwnProperty(key) || obj[key].length === undefined) {
		return elements;
	}
	for (var i=0; i<obj[key].length; i++) {
		if (obj[key][i] < 100) {
			elements.push(obj[key][i]);
		}
	}
	return elements;
}
*/
// 6:
/*
Given a string, "countAllCharacters" returns an object where each key is a character 
in the given string. The value of each key should be how many times each character 
appeared in the given string.
*/
function countAllCharacters(str) {
	var chars = {};
	if (str === undefined || str === "") {
		return chars;
	}
	for (var i=0; i<str.length; i++) {
		if (chars.hasOwnProperty(str[i])) {
			chars[str[i]] = chars[str[i]] + 1;
		} else {
			chars[str[i]] = 1;
		}
	}
	return chars;
}
// 7: getElementsGreaterThan10AtProperty
/*
var obj = {
  key: [1, 20, 30]
};

Given an object and a key, "getElementsGreaterThan10AtProperty" returns an array 
containing the elements within the array, located at the given key, that are 
greater than 10.

function getElementsGreaterThan10AtProperty(obj, key) {
	var elements = [];
	if (obj === undefined || key === undefined ) {
		return elements;
	}
	if (!obj.hasOwnProperty(key) || obj[key].length === undefined) {
		return elements;
	}
	for (var i=0; i<obj[key].length; i++) {
		if (obj[key][i] > 10) {
			elements.push(obj[key][i]);
		}
	}
	return elements;
}
*/

// 8: getAverageOfElementsAtProperty
/*
var obj = {
  key: [1, 2, 3]
};
*/
/*
Given an object and a key, "getAverageOfElementsAtProperty" returns the 
average of all the elements in the array located at the given key. 

function getAverageOfElementsAtProperty(obj, key) {
	var average = 0;
	var sum = 0;
	
	if (obj === undefined || key === undefined ) {
		return 0;
	}
	if (!obj.hasOwnProperty(key) || obj[key].length === undefined || obj[key].constructor !== Array || obj[key].length === 0) {
		return 0;
	}
	for (var i=0; i<obj[key].length; i++) {
			sum = sum + obj[key][i];
	}
	average = sum/i;
	return average;
}
*/
// 9/10: getOddLengthWordsAtProperty
/*
Given an object and a key, "getOddLengthWordsAtProperty" returns an array
 containing all the odd length word elements of the array located at the given key. 
*/ 
function getEvenLengthWordsAtProperty(obj, key) {
	var words = [];
	
	if (obj === undefined || key === undefined ) {
		return words;
	}
	if (!obj.hasOwnProperty(key) || obj[key].length === undefined || 
	     obj[key].constructor !== Array || obj[key].length === 0) {
		return words;
	}
	for (var i=0; i<obj[key].length; i++) {
		if (!(obj[key][i].length%2)){
			words.push(obj[key][i]);
		}
	}
	return words;
}
// 9/10: getOddLengthWordsAtProperty
/*
Given an object and a key, "getOddLengthWordsAtProperty" returns an array
 containing all the odd length word elements of the array located at the given key. 
*/ 
function getEvenLengthWordsAtProperty(obj, key) {
	var words = [];
	
	if (obj === undefined || key === undefined ) {
		return words;
	}
	if (!obj.hasOwnProperty(key) || obj[key].length === undefined || 
	     obj[key].constructor !== Array || obj[key].length === 0) {
		return words;
	}
	for (var i=0; i<obj[key].length; i++) {
		if (!(obj[key][i].length%2)){
			words.push(obj[key][i]);
		}
	}
	return words;
}
// 9/10: getOddLengthWordsAtProperty
/*
Given an object and a key, "getOddLengthWordsAtProperty" returns an array
 containing all the odd length word elements of the array located at the given key. 
*/ 
function getEvenLengthWordsAtProperty(obj, key) {
	var words = [];
	
	if (obj === undefined || key === undefined ) {
		return words;
	}
	if (!obj.hasOwnProperty(key) || obj[key].length === undefined || 
	     obj[key].constructor !== Array || obj[key].length === 0) {
		return words;
	}
	for (var i=0; i<obj[key].length; i++) {
		if (!(obj[key][i].length%2)){
			words.push(obj[key][i]);
		}
	}
	return words;
}

// 11: getSquaredElementsAtProperty
/*
Given an object and a key, "getSquaredElementsAtProperty" returns an array 
containing all the squared elements of the array located at the given key. 
*/
function getSumOfAllElementsAtProperty(obj, key) {
	if (obj === undefined || key === undefined ) {
		return 0;
	}
	if (!obj.hasOwnProperty(key) || obj[key].constructor !== Array || obj[key].length === 0) {
		return 0;
	}
	var sum = obj[key][0];
	for (var i=1; i<obj[key].length; i++) {
		sum = sum + obj[key][i];
	}
	return sum;
}

function getNthElementOfProperty(obj, key, n) {
	var elements = [];
	
	if (obj === undefined || key === undefined || n === undefined) {
		return undefined;
	}
	if (!obj.hasOwnProperty(key) || obj[key].constructor !== Array 
	    || obj[key].length === 0 || n >= obj[key].length) {
		return undefined;	
	}
	return obj[key][n];
}
function getLastElementOfProperty(obj, key) {

	if (obj === undefined || key === undefined) {
		return undefined;
	}
	if (!obj.hasOwnProperty(key) || obj[key].constructor !== Array 
	    || obj[key].length === 0 ) {
		return undefined;	
	}
	var length = obj[key].length;
	return obj[key][length-1];
}