<<<<<<< HEAD
'use strict'

// Standard format for displaying dates on the site. 
function formatDate(d) {
	return d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
}

// Format a delta time as h:m:s format
function formatDelta(d) {
	hours = d / 3600
	d -= hours * 3600
}

// Write an object's definition to the console.
function isA(obj, recurseDepth)
{
	if (obj === undefined) {
		console.log("isA: -undefined-");
		return;
	}
	console.log("typeOf: " + typeof obj);  
	console.log("Ctor: " + obj.constructor);
	console.log("asString: " + obj);
	var keyList = Object.keys(obj);
	var valueList = Object.values(obj);	
	console.log("length: " + keyList.length);
	for (var i= 0;i<keyList.length;i++) {
			console.log("Key: " + keyList[i] + "; Value: " + obj[keyList[i]]);
	}
	if (keyList.length > 0 && recurseDepth != false) {
		recurseDepth -= 1;
		keyList.map( 
			function(aKey) {
				isA(aKey, recurseDepth);
			}
		);
		valueList.map( 
			function(aValue) {
				isA(aValue, recurseDepth);
			}
		);		
	}
}

//------------------------------------------------------------------
//----------------------------------------------------------------
// 
//  addnode
//
//  Author:     Elaine Haight 2007
//  Purpose:    Creates a new node given an existing DOM node
//  Parameters: parent  -- an existing DOM node 
//              element -- type of node to create (e.g. "button")
//              nameId  -- value for the name tag of the node
//              text    -- (optional)
//
// Returns:   the new node
// Notes:     Adapted From page 48 of Crane and Pascarello.

function addNode(parent, element, nameId, text, styleClass)
{   
    var newNode = document.createElement(element);
    parent.appendChild(newNode);
    newNode.setAttribute("id", nameId);
    newNode.setAttribute("name", nameId);
	newNode.setAttribute("class", styleClass);
    if (text != "")
    {
        var textNode = document.createTextNode(text);
        newNode.appendChild(textNode);
    }
    return newNode;
}
// ------------------------------------------------------------------

function isPalindrome(str){
	for (var i=0; i<str.length/2; i++) {
		if (str[i] != str[str.length-(i+1)]){
			return false;
		}
	}
	return true;
=======
'use strict'

// Standard format for displaying dates on the site. 
function formatDate(d) {
	return d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
}

// Format a delta time as h:m:s format
function formatDelta(d) {
	hours = d / 3600
	d -= hours * 3600
}

// Write an object's definition to the console.
function isA(obj, recurseDepth)
{
	if (obj === undefined) {
		console.log("isA: -undefined-");
		return;
	}
	console.log("typeOf: " + typeof obj);  
	console.log("Ctor: " + obj.constructor);
	console.log("asString: " + obj);
	var keyList = Object.keys(obj);
	var valueList = Object.values(obj);	
	console.log("length: " + keyList.length);
	for (var i= 0;i<keyList.length;i++) {
			console.log("Key: " + keyList[i] + "; Value: " + obj[keyList[i]]);
	}
	if (keyList.length > 0 && recurseDepth != false) {
		recurseDepth -= 1;
		keyList.map( 
			function(aKey) {
				isA(aKey, recurseDepth);
			}
		);
		valueList.map( 
			function(aValue) {
				isA(aValue, recurseDepth);
			}
		);		
	}
}

//------------------------------------------------------------------
//----------------------------------------------------------------
// 
//  addnode
//
//  Author:     Elaine Haight 2007
//  Purpose:    Creates a new node given an existing DOM node
//  Parameters: parent  -- an existing DOM node 
//              element -- type of node to create (e.g. "button")
//              nameId  -- value for the name tag of the node
//              text    -- (optional)
//
// Returns:   the new node
// Notes:     Adapted From page 48 of Crane and Pascarello.

function addNode(parent, element, nameId, text, styleClass)
{   
    var newNode = document.createElement(element);
    parent.appendChild(newNode);
    newNode.setAttribute("id", nameId);
    newNode.setAttribute("name", nameId);
	newNode.setAttribute("class", styleClass);
    if (text != "")
    {
        var textNode = document.createTextNode(text);
        newNode.appendChild(textNode);
    }
    return newNode;
}
// ------------------------------------------------------------------

function isPalindrome(str){
	for (var i=0; i<str.length/2; i++) {
		if (str[i] != str[str.length-(i+1)]){
			return false;
		}
	}
	return true;
>>>>>>> cb97fa344060fddee1b1b68722c1e6b281f454c7
}