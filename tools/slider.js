'use strict'

function slider(parentName, name, onChange) {
/*
    if (parent == null || parent =="")
       this.parent = document;
    else
       this.parent = document.getElementById(parent);
    this.name = name;
		var base = document.createElement("svg");
*/
	var svg = document.getElementById(parentName);
	console.dir(svg);
	var slideBar = document.createElement("line");
	var pointer = document.createElement("polygon");
	svg.appendChild(slideBar);
	svg.appendChild(pointer);
	slideBar.outerHTML = "<line id=\"bar\" class=\"slider\" x1=\"20\" y1=\"30\" x2=\"300\" y2=\"30\" stroke-width=\"1\" stroke=\"black\"></line>";
	slideBar.classList.add("slider");
	pointer.outerHTML = "<polygon id=\"slider\" class=\"slider\" points=\"160,30,165,40,155,40,160,30\"></polygon>";
	pointer.classList.add("slider");
	
	slider.mouseIsDown = false;
	slider.midpoint = (bar.x1.animVal.value + bar.x2.animVal.value)/2;
	slider.width = bar.x2.animVal.value - bar.x1.animVal.value;
	slider.min = bar.x1.animVal.value;
	slider.max = bar.x2.animVal.value;
	
	slider.offset = 0;
	var control = document.getElementById("time_select");
};



}

// map time from a percentage to a 24-hour clock
function mapTime (percentOfDay) {
	var totalMinutes = Math.round(1440 * percentOfDay);
	console.log ("Total minutes: " + totalMinutes);
	var hours = Math.floor(totalMinutes/60);
	var minutes = Math.round(totalMinutes%60);
	return {"hour": hours, "minutes" : minutes};
}

function updateTime(percent) {
	console.log ("Time percent: " + percent);
	var h = document.getElementById("hours");
	var m = document.getElementById("minutes");
	var am = document.getElementById("am_pm");
	var time = mapTime(percent);
	var hours = (time.hour == 0) ? 12 : time.hour > 12 ? time.hour - 12 : time.hour;
	h.innerHTML = (time.hour == 0) ? 12 : (time.hour > 12) ? time.hour - 12 : time.hour;
	m.innerHTML = time.minutes < 10 ? "0" + time.minutes : time.minutes;
	am.innerHTML = time.hour >= 12 ? "pm" : "am";
}

	var slider = document.getElementById("slider");
	var bar = document.getElementById("bar");
	console.dir(bar);
	slider.mouseIsDown = false;
	slider.midpoint = (bar.x1.animVal.value + bar.x2.animVal.value)/2;
	slider.width = bar.x2.animVal.value - bar.x1.animVal.value;
	slider.min = bar.x1.animVal.value;
	slider.max = bar.x2.animVal.value;
	
	slider.offset = 0;
	var control = document.getElementById("time_select");
	control.onclick = function (event) {
		console.log("click! (" + event.x + ", " + event.y + ")");
		if (event.x < slider.max && event.x > slider.min) {
			slider.offset = event.x - slider.midpoint;
			slider.setAttribute('transform', "translate (" + slider.offset + ", 0)");	
			updateTime((slider.offset+(slider.width/2))/slider.width);	
		};
	};
	control.onmousedown = function(){console.log("mouse down");
		slider.mouseIsDown = true;
	};
	control.onmouseup = function() {
		console.log("mouse up");
		slider.mouseIsDown = false;
	};
	
	control.onmousemove = function(event){
		if (slider.mouseIsDown) {
			console.log("Max: " + slider.max + ", Min: " + slider.min);
			if (event.x < slider.max && event.x > slider.min) {
				slider.offset = event.x - slider.midpoint;
				slider.setAttribute('transform', "translate (" + slider.offset + ", 0)");
				updateTime((slider.offset+(slider.width/2))/slider.width);	
			}
		}

	};
	control.onwheel = function(event){
		console.log("Wheel: " + event.wheelDelta);
		slider.offset = slider.offset + event.wheelDelta/50;
		slider.offset = slider.offset > (slider.width)/2 ? (slider.width)/2 : slider.offset;
		slider.offset = slider.offset < -(slider.width/2) ? -(slider.width/2) : slider.offset;		
		slider.setAttribute('transform', "translate (" + slider.offset + ", 0)");
		updateTime((slider.offset+(slider.width/2))/slider.width);		
	};