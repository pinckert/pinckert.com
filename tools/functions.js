//  'use strict' commented out for testing purposes 
/* JS function demostration code 
   Some of the common mechanisms in JS are syntactically difficult to read. 
   I found myself spending an inordinate amount of time on what should have 
   been fairly simple concepts and have stripped some general information from
   Javascript Patterns by Stoyan Stefanov and W3 Schools to make a convenient
   referenece.   
*/

/* Global function, 
notes: pollutes namespace, considered poor practice */

function global(args) {
	console.log("global() : " + typeof this);
	console.log(arguments.length);
	console.log("--caller : " + arguments.caller);
	console.log("--arguments : " + arguments + " : " + Array.isArray(arguments));
}

/* Named expression 
notes: JS functions aren't prototyped in anyway, */
var globalFunctionRefereence = function pseudoGlobal() {
	console.log("pseudoGlobal()");
}

/* Return Global reference */
var returnsGlobalFunction = function globalFunctionReturned() {
	console.log("globalFunctionReturned()")
	return global;
}

/* Classic "why doesn't this work?" counter */
/*
Notes:  From -- http://www.w3schools.com/js/js_function_closures.asp
		Honestly, I'm not sure why this is confusing. The "here's this 
		terrific syntactic nightmare to fix it" was an impediment to 
		understanding to understanding the nature of functions as objects. 
*/
function badCounter () {
	var sum = 0;
	return sum += 1;
}

/* Return a value from an immediate function */
/* 
notes: common mechanism to simulate a "private" member or method. 
       the "immediate" syntax is ( <regurlar function definition> )();
*/
var aCounter = (function returnImmediateValue() {
	var counter = 0;
	return function () {
		return counter += 1;
	};
})();

/* 
notes: this is the mechanism that was a bit confusing at first. The returned function
	executes in the caller's scope, where "counter" is no longer defined. 
*/
var bCounter  = function returnNonImmediateValue() {
	var counter = 0;
	return function () {
		return counter += 1;
	}
}
/*
  Just because I did this once accidentally...
  If you omit the parenthesis the function will still executes
  but is equivalent to bCounter(). 
*/
var aCounterOops = (function returnImmediateVale() {
	var counter = 0;
	return function() {
		return counter += 1; 
	}
});

// A basic class ...
/*
	C++ style declaration:
	
    class screenElement {
		public:
			setSize(h,w);
			setPosition(x,y);
			getSize();     // returns {height: Number, width: Number}
			getPosition(); // returns {x: Number, y: Number} (from top-left)
			hasMoved();    // check to see if this element is still where we think it is.
		protected:
			var x, y;          // position
			var width, height; // size
			exists();          // Does domNode exist?
			Object domNode;
	}

	The purpose of the class is to provide a simple interface for setting/examining the layout of elements 
	It should:
		Take a valid DOM node, valid identifier or undefined as an initializer.
		
*/
function ScreenElement (domNode) {
	ScreenElement.prototype.setSize = function (x,y) {this.x = x; this.y = y;};
	ScreenElement.prototype.getSize = function () {return {"height" : this.h, "width" : this.w}};
	ScreenElement.prototype.setPosition = function (x,y) {this.x = x; this.y = y;};
//	ScreenElement.prototype.getPosition = function () {return {"x" : this.x, "y" : this.y};};
	ScreenElement.prototype.getPosition = function () {return {"x" : this.elem.offsetLeft, "y" : this.elem.offsetTop};};
	ScreenElement.prototype.hasMoved = function() {};
	ScreenElement.prototype.moveTo = function(x,y) {
		console.log("Moving...");
		if (this.elem !== undefined) {
			console.log("Setting values: (" + x + ", " + y + ")");
			this.elem.offsetLeft = x;
			this.elem.offsetTop  = y;
		}
	}
	this.elem = domNode;
	this.x = domNode.offsetLeft;
	this.y = domNode.offsetTop;
	this.h = domNode.offsetHeight;
	this.w = domNode.offsetWidth;
	
	console.log("Initial values : (" + this.x + ", " + this.y + ", " + this.h + ", " + this.w + ")");
}

