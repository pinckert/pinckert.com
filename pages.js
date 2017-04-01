'use strict';

	var goAbout=function () {
		console.log("Reading resume.pdf");
		var node = document.getElementById("content");
		clearContent(node);
		var stuff = document.createElement("Object");
		stuff.data = "./resume/resume.pdf";
		stuff.type = "application/pdf";
		stuff.style.height = "600px";
		stuff.style.width = "75%";
		content.appendChild(stuff);
	}; 
	var goTest = function () {
		console.log("Listing environment");		
		var node = document.getElementById("content");
		clearContent(node);
		node.innerHTML ='<object type="text/html" data="/charts/jenkins1.html" ></object>';		
	}
	var goEnvironment=function() {
		console.log("Listing environment");
		var node = document.getElementById("content");
		clearContent(node);
		var tableOfTables = document.createElement("table");
		tableOfTables.id = "setOfTables";
		var itemsToDisplay = {
			"clientEnvironment" : navigator,
			"locationData"      : location,
			"pluginData"        : window.plugins,
			"historyData"       : window.history,
			"responseHeader"    : this,
		};
	
		if (location.hostname != "") {
			$(document).ready(function(data) {
				var jqxhr = $.get("http://www.pinckert.com/cgi-bin/environ.py", function(data) {
				node.appendChild(tableFromDict(JSON.parse(data), "Server Environment"));
				for (var key in itemsToDisplay) {
					node.appendChild(tableFromDict(itemsToDisplay[key]));
				}
				}, "text");
			});
		}
		else {
			var node = document.getElementById("content");
			var windowData = tableFromDict(window.history,  "Window.history");
			var clientEnvironment = tableFromDict(navigator, "Client Navigator");
			var locationData = tableFromDict(location, "Location data");
			var plugins = tableFromDict(window.screen, "Window Screen data" );
			node.appendChild(windowData);
			node.appendChild(clientEnvironment);
			node.appendChild(locationData);
			node.appendChild(plugins);
		}
	}
	var goFiles = function(directory) {
		console.log("Getting remote file list parameter type is : " +  Object.prototype.toString.call(directory));
		// when called without a parameter, directory is set as a MouseEvent object. 
		if (directory == "[object MouseEvent]") {
			directory = "http://www.pinckert.com/cgi-bin/dir.py?path=";
		}
		console.log("Directory name is : \"" + directory + "\"");
//		window.location.href = "http://www.pinckert.com/cgi-bin/dir.py";
		console.log("Querying file list for " + directory);
		var node = document.getElementById("textContainer");
		clearContent(node);
		listFiles(directory);
	}
	var goBlog=function () {
		console.log("Changing page to \"Blog\"");
	}
	var goCode=function () {
		console.log("Changing page to \"Code\"");
		clearContent(content);
	}
	var goPics=function () {
		console.log("Changing page to \"Pics\"");
	}
	var goDB=function() {
		console.log("Changing page to 'DB Test'");
		var node = document.getElementById("content");
		clearContent(node);
		node.innerHTML ='<object name="chartsTable1" type="text/html" width="1000" height="1200" data="/charts/jenkins1.html"></object>';	
		var jqxhr = $.get("http://www.pinckert.com/cgi-bin/db_qry.py", function(data) {
			console.log("Returned from executed query, processing results:");
			
			var html = document.getElementById("content").firstChild.contentDocument;  // embedded document
			var graph1 = html.getElementById("pie1");
			var graph2 = html.getElementById("pie2");
			var userTime   = extractExecutionTime(data, "user");
			var userBuilds = extractBuildCounts(data, "user");
			drawPieChart(graph1, userTime, "Usage By User");
			drawPieChart(graph2, userBuilds, "Build Count By User");

			var graph3 = html.getElementById("bar1");
			var graph4 = html.getElementById("bar2");
			var serverTime   = extractExecutionTime(data, "server");
			var serverBuilds = extractBuildCounts(data, "server");
			drawBarChart(graph3, serverTime, "Usage By Server");
			drawBarChart(graph4, serverBuilds, "Build Count By Server");
			
			var graph5 = html.getElementById("line1");
			var graph6 = html.getElementById("line2");
			var serverTime   = extractDataByDate(data, "duration");
			var serverBuilds = extractBuildResultByDate(data);
			drawLineChart(graph5, serverTime, "Server Usage Over Time");
			drawLineChart(graph6, serverBuilds, "Build Count Over Time");
		})

//		console.dir(jqxhr)

	}
	var goHome=function() {
		console.log("Changing page to \"Home\"");
		var content = document.getElementById("content");
		clearContent(content);
		var picHolder = document.createElement("div");
		var pic = document.createElement("IMG");
		pic.src = "images/dean.jpg";
		pic.id = "mypic";
		pic.classList.add("portraitDean");
		picHolder.appendChild(pic);
		content.appendChild(picHolder);
		var stuff = document.createTextNode("*empty*");
		var p = document.createElement("p");
		p.classList.add("portraitDean");
		p.appendChild(stuff);
		picHolder.appendChild(p);
		if (location.hostname == "") {
			console.log("Running on local host");
			stuff.nodeValue = "Dean Pinckert is a graduate of the University of California at Santa Barbara with a Bachelor of Science degree in Computer Science. He has worked as a software engineer in Silicon Valley for almost 30 years, and has a broad range of expertise. His career began as a scientific programmer at Lockheed Missiles and Space, working on the ERIS anti-missile system.Since then he has forayed into the semiconductor, software and security industries, working for notable companies like Netscape and Symantec as well as successful startups--Boxer Cross, purchased by Applied Materials and Prometrix, purchased by KLA-Tencor. He has produced over 100,000 lines of production C/C++ code and is currently focussed on software process automation and web technologies.";
		}
		else {
			readFile("bio.txt", stuff);
		}
	}
// *  misc routines to move at some point...

function dateFromEpoch(t) {
	var dt = new Date(parseInt(t));
	var month = dt.getMonth();
	month = month >= 10 ? month : "0" + month;
	var date  = dt.getDate();
	date = date >= 10 ? date : "0" + date;	
	var str = dt.getFullYear() + "-" + month + "-" + date;
	return str;
}

// determine attribute by date 
function extractDataByDate(data, field) {
	var records = {};
	var results = [];
	for (var index in data) {
		var record = data[index];
		var buildDate = dateFromEpoch(record["start"])
		if (buildDate in records) {
			records[buildDate] += record[field];
		} else {
			records[buildDate] = record[field];
		}
	}
	var keys = Object.keys(records);
	keys.sort();
	for (var key in keys) {
		results.push([new Date([keys[key]]), records[keys[key]]]);
	}
	results.unshift([field, "Date"])  // Axis labels
	return results;

}
//  Build status may be 'success', 'failure' or 'unknown' return an array index
//  based on the result.
//
function indexFromStatus(str) {

	switch (str) {
		case "SUCCESS": {
			return 0;
		}
		case "FAILURE": {
			return 1;
		}
		case "UNSTABLE": {
			return 2;
		}
		default:
			console.log("unrecognized build result:" + str);
			return 2;
	}
}

function extractBuildResultByDate(data) {
	var records = {};
	var results = [];
	for (var index in data) {
		var record = data[index];
		var buildDate = dateFromEpoch(record["start"]);
		var index =  indexFromStatus(record["result"]);
		if (buildDate in records) {
			records[buildDate][index] += 1;
		} else {
			records[buildDate] = [0, 0, 0];
			records[buildDate][index] = 1;
		}
	}
	var keys = Object.keys(records);
	keys.sort();
	for (var key in keys) {
		results.push([new Date([keys[key]]), records[keys[key]][0], records[keys[key]][1], records[keys[key]][2]]);
	}

	results.unshift(["Status", "Success", "Failure", "Unstable"])  // Axis labels
	return results;
	
}
	
//  Determine total execution time by by field (user/server)...
function extractExecutionTime(data, field) {
	var records = {};
	var results = [];

	for (var index in data) {
		var record = data[index];
		if (record["user"] in records) {
			records[record[field]] += record["duration"];
		} else {
			if (record[field] == null) { continue; }
			records[record[field]] = record["duration"];
		}
	}
// Convert to proper format for Google API
//  Sort the keys
	var keys = Object.keys(records);
	keys.sort();
	for (var key in keys) {
		results.push([keys[key], records[keys[key]]]);
	}
	results.unshift([field, "Execution time"])  // Axis labels
	return results;
}

//  Determine total builds 
function extractBuildCounts(data, field) {
	var records = {};
	var results = [];

	for (var index in data) {
		var record = data[index];
		if (record[field] in records) {
			records[record[field]] += 1 ;
		} else {
			if (record[field] == null) { continue; }
			records[record[field]] = 1;
		}
	}
// Convert to proper format for Google API	
	var keys = Object.keys(records);
	keys.sort();
	console.dir(keys);
	for (var key in keys) {
		results.push([keys[key], records[keys[key]]]);
	}
	results.unshift([field, "Builds"]);
	console.dir(results);
	return results;
}

//  Routines to interface with google charts.
//
//  Pie Chart
//
//  Data format: 
//      [ ["field1_name", "field2_name"] ["name1", value1], ["name2", value2] ... ]
//
function drawPieChart(parent, data, chartTitle){ 
	var isArray = data instanceof Array;

	try {
		var chartData = google.visualization.arrayToDataTable(data);

		var options = {
			title: chartTitle,
			sliceVisibilityThreshold: 0.05,
			is3D: true
		};
		var chart = new google.visualization.PieChart(parent);
		chart.draw(chartData, options);
	}
	catch (err) {
		console.log("Failed to create chart: "+ err.message);
	}
}
//
//  Bar Chart
//
//  Data Format -- same as PieChart for now.
//	  []
function drawBarChart(parent, data, chartTitle){ 
	var isArray = data instanceof Array;

	try {
		var chartData = google.visualization.arrayToDataTable(data);

		var options = {
			title: chartTitle,
		};
		var chart = new google.visualization.BarChart(parent);
		chart.draw(chartData, options);
	}
	catch (err) {
		console.log("Failed to create chart: "+ err.message);
	}
}

//
//  Line Chart
//
//  Data Format -- [[column headers, , ,],[row1 series1 value, series2 value, series3, ...], [row2,,,][...] ] 
//	  []
function drawLineChart(parent, data, chartTitle){ 
	var isArray = data instanceof Array;

	try {
		var chartData = google.visualization.arrayToDataTable(data);

		var options = {
			title: chartTitle,
		};
		var chart = new google.visualization.LineChart(parent);
		chart.draw(chartData, options);
	}
	catch (err) {
		console.log("Failed to create chart: "+ err.message);
	}
}