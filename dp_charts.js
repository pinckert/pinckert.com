'use strict';
//
//  Notes:
//       All data is read-only, provided by the DB query (pages.js/goDB())
//
// --------------------------------------------------------------------------------
//
//  Generic chart action callback routine
//
function selectionHandler(chart,chartData, callback) {
	console.log("in selection handle constructor");
	return function() {
			console.log ("in selection handler execution");
			var selection = chart.getSelection();
			console.dir(selection);
     		var label = chartData.getValue(selection[0].row, 0);
			console.dir(label);
			var value = chartData.getValue(selection[0].row, 1);		
			console.dir(value);
			callback(selection, chartData);
	};
}
//
// Graph select response routines...
//
function pieSelectResponse(selection, chartData) {
	console.log("in pieSelectResponse");
	console.dir(selection);
	console.dir(chartData);
	console.dir(goDB.data);
	var data = filterDataByFieldValue(goDB.data, "user", chartData.getValue(selection[0].row, 0));
	var buildList = fixDates(data, "start");
	var tab = tableFromDictArray(buildList);
	console.dir(tab);
	//
	// TBD figure out how to pass in (and retain) the context.
	//
	var node = document.getElementById("content");
	clearContent(node)
	node.appendChild(tab);
}

//
// Graph select response routines...
//
function barSelectResponse(selection, chartData) {
	console.log("in barSelectResponse");
	var data = filterDataByFieldValue(goDB.data, "server", chartData.getValue(selection[0].row, 0));
	var buildList = fixDates(data, "start");
	var tab = tableFromDictArray(buildList);
	console.dir(tab);
	//
	// TBD figure out how to pass in (and retain) the context.
	//
	var node = document.getElementById("content");
	clearContent(node)
	node.appendChild(tab);
}

//
// Graph select response routines...
//
function lineSelectResponse(selection, chartData) {
	console.log("in lineSelectResponse");
	console.dir(chartData);
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

		var chart   = new google.visualization.PieChart(parent);
		var handler = new selectionHandler(chart, chartData, pieSelectResponse);
		google.visualization.events.addListener(chart, 'select', handler);
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
		var handler = new selectionHandler(chart, chartData, barSelectResponse);
		google.visualization.events.addListener(chart, 'select', handler);		
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
function drawLineChart(parent, data, chartTitle) { 
	var isArray = data instanceof Array;

	try {
		var chartData = google.visualization.arrayToDataTable(data);

		var options = {
			title: chartTitle,
		};
		var chart = new google.visualization.LineChart(parent);
		var handler = new selectionHandler(chart, chartData, lineSelectResponse);
		google.visualization.events.addListener(chart, 'select', handler);		
		chart.draw(chartData, options);
	}
	catch (err) {
		console.log("Failed to create chart: "+ err.message);
	}
}
// --------------------------------------------------------------------------------
//
//  Routines to extract data returned from query
//
//
// determine attribute by date 
function extractDataByDate(data, field) {
	var records = {};
	var results = [];
	for (var index in data) {
		var record = data[index];
		var buildDate = dateStringFromEpoch(record["start"]);
		if (buildDate == "") { 
			continue; 
		}
	
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
	results.unshift([field, "Date"]);  // Axis labels
	return results;
}

function filterDataByFieldValue(data, field, value)
{
   var results = [];
   console.log("in filterDataByFieldValue()");
   console.log("Field = " + field + " Value = " + value);
   for (var index in data) {
	   console.dir(data[index]);
	   if (data[index][field] == value) {
		   results.push(data[index]);
	   }
   }
   return results;
}

//
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
		var buildDate = dateStringFromEpoch(record["start"]);
		if (buildDate == "") { continue; }
		var index =  indexFromStatus(record["result"]);
		if (buildDate in records) {
			records[buildDate][index] += 1;
		} else {
			records[buildDate] = [0, 0, 0];
			records[buildDate][index] = 1;
		}
	}
	// Convert to proper format for Google API
	var keys = Object.keys(records);
	keys.sort();
	for (var key in keys) {
		results.push([new Date([keys[key]]), records[keys[key]][0], records[keys[key]][1], records[keys[key]][2]]);
	}

	results.unshift(["Status", "Success", "Failure", "Unstable"])  // Axis labels
	return results;
}
	
//  Determine total execution time by field (user/server)...
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

	for (var key in keys) {
		results.push([keys[key], records[keys[key]]]);
	}
	results.unshift([field, "Builds"]);
	return results;
}

//
// *  misc routines to move at some point...
//

//
//  Takes an array of dict's and a field name and attempts to convert epoch times to HR values.
//
function fixDates(list, field)
{
	var newList = [];
	for (var index in list) {
		newList.push(list[index]);
		newList[index][field] = dateStringFromEpoch(list[index][field]);
	}
	return newList;
}

function dateStringFromEpoch(t) {

	var dt = new Date(parseInt(t));
	if (isNaN(dt.getTime())) {
		console.log("dateStringFromEpoch() failed to create date: " + t); 
		return "";
	}
	var month = dt.getMonth() + 1;
	month = month >= 10 ? month : "0" + month;
	var date  = dt.getDate();
	date = date >= 10 ? date : "0" + date;	
	var str = dt.getFullYear() + "-" + month + "-" + date;
	return str;
}
