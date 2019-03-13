'use strict'; 
//
//  Dependencies: dp_charts.js
// 

//  Trying to get 'back' button to work intuitively, not working =(
	window.history.pushState = function () {
			console.log("Pushing current state");
	}
	window.history.replaceState = function () {
		console.log("Replacintg state");
	}
	
// Load Resume'
	var goAbout=function () {
		console.log("Reading resume.pdf");
		var node = document.getElementById("content");
		clearContent(node);
		var stuff = document.createElement("Object");
		stuff.data = "./resume/resume.pdf";
		stuff.type = "application/pdf";
		stuff.classList.add("resume");
		content.appendChild(stuff);
	};
// 
	var goTest = function () {
		const subMenuTag = "subMenuTag";
		
		const menuItems = {
			"Calendar" : goCalendar,
			"DB Dump" : goDBDump,
			"Time Select" : goSVGDemo,
			"Show Environment" : goEnvironment,
			"Color Chart" : goColorChart,
			"Table Sort" : goTableSort,
			"History Example" : goHistoryExample
		};
		
		var selection = document.getElementById("navDevelopment");
		var subMenu = document.getElementById(subMenuTag);

		if (subMenu == undefined) {
			console.log("no submenu defined");
			subMenu   = document.createElement("ul");
			subMenu.classList.add("mySubMenu");
			subMenu.id = subMenuTag;
		} else /* collapse menu */ {
			console.log("using previous menu");
			betterClearContent(subMenu);
			subMenu.parentNode.removeChild(subMenu);
			return;
		}
		
		for (key in menuItems){ 
			console.log("adding item : ", key)
			var item = document.createElement("li");
			item.classList.add("mySubMenu");
			item.appendChild(document.createTextNode(key));
			item.addEventListener("click", menuItems[key]);
			subMenu.appendChild(item);
		};
		selection.appendChild(subMenu);

	};
	
	var goEnvironment=function(event) {
		console.log("Listing environment");
		var node = document.getElementById("content");
		clearContent(node);
		var tableOfTables = document.createElement("table");
		tableOfTables.id = "setOfTables";
		var itemsToDisplay = {
			"clientEnvironment" : navigator,
			"locationData"      : location,
//			"pluginData"        : window.plugins,
			"historyData"       : window.history,
//			"responseHeader"    : this,
		};

		if (location.hostname != "") {
			$(document).ready(function(data) {
				var jqxhr = $.get("http://www.pinckert.com/cgi-bin/environ.py", function(data) {
				node.appendChild(tableFromDict(JSON.parse(data), "Server Environment"));
				for (var key in itemsToDisplay) {
					node.appendChild(tableFromDict(itemsToDisplay[key], key));
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
			node.appendChild(tableFromDict(windowData, "Window.history"));
			node.appendChild(tableFromDict(clientEnvironment, "Client Environment"));
			node.appendChild(tableFromDict(locationData, "Location Data"));
			node.appendChild(tableFromDict(plugins, "Plugin Data"));
		}
		event.stopPropagation();

		return false;
	};
	
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
	};

	
	var goBlog=function () {
		console.log("Changing page to \"Blog\"");
	};
	
	var goCode=function () {
		console.log("Changing page to \"Code\"");
		clearContent(content);
	};

	var goPics=function () {
		console.log("Changing page to \"Pics\"");
	};

	var goDBDump = function() {
		console.log("Changing page to 'DB Test'");
		var node = document.getElementById("content");
		clearContent(node);
//		node.innerHTML ='<object name="chartsTable1" type="text/html" width="1000" height="1300" data="/charts/jenkins1.html"></object>';
		var jqxhr = $.get("http://www.pinckert.com/cgi-bin/db_qry.py", function(data) {
			console.log("Returned from executed query, processing DB Dump results:");
			var html = document.getElementById("content");
			var sorter = {"project_name" : sort_alpha, "number" : sort_int, "server" : sort_alpha, "start" : sort_int, "result" : sort_alpha,"duration" : sort_int, "user" : sort_alpha};
			var table = sortableTableFromDictArray(data, sorter);
			html.appendChild(table);
		});
		event.stopPropagation();
		return false;
			
	}
	var goDBUtil=function() {
		console.log("Changing page to 'DB Util'");
		var node = document.getElementById("content");
		clearContent(node);
		node.innerHTML = '<object name="" type="text/html" width="1000" height="1300" data="/db_util.html"></object>'
		
	}
//
//  Display the Jenkins data from Apache Commons.
//    Chart Routines in dp_charts.js
//
	var goDB=function() {
		console.log("Changing page to 'DB Test'");
		var node = document.getElementById("content");
		clearContent(node);
		node.innerHTML ='<object name="chartsTable1" type="text/html" width="1000" height="1300" data="/charts/jenkins1.html"></object>';
		var jqxhr = $.get("http://www.pinckert.com/cgi-bin/db_qry.py", function(data) {
			console.log("Returned from executed query, processing results:");

			var html = document.getElementById("content").firstChild.contentDocument;  // embedded document
			var graph1 = html.getElementById("pie1");
			var graph2 = html.getElementById("pie2");
			var userTime   = extractExecutionTime(data, "user");
			console.log("Data for pie chart...");
			console.dir(userTime);
			var userBuilds = extractBuildCounts(data, "user");
			console.log("Data for pie chart...");
			console.dir(userBuilds);
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

			goDB.data = data; // Yeah, just passing it around as a global for now :-(
		});
	};

	var goHobbies=function() {
		console.log("Changing page to \"Hobbies\"");
		var content = document.getElementById("content");
		clearContent(content);
		content.innerHTML ='<object name="pool" type="text/html" width="800" height="700" data="./hobbies/spinners.html"></object>';

	};

	var goHome=function() {
		console.log("Changing page to \"Home\"");
		var content = document.getElementById("content");
		clearContent(content);
		var picHolder = document.createElement("div");
		var pic = document.createElement("IMG");
		pic.src = "images/dean.jpg";
		pic.id = "portraitDean";
		picHolder.appendChild(pic);
		content.appendChild(picHolder);
		var stuff = document.createTextNode("*empty*");
		var p = document.createElement("p");
		p.appendChild(stuff);
		picHolder.appendChild(p);
		if (location.hostname == "") {
			console.log("Running on local host");
			stuff.nodeValue = "Dean Pinckert is a graduate of the University of California at Santa Barbara with a Bachelor of Science degree in Computer Science. He has worked as a software engineer in Silicon Valley for almost 30 years, and has a broad range of expertise. His career began as a scientific programmer at Lockheed Missiles and Space, working on the ERIS anti-missile system.Since then he has forayed into the semiconductor, software and security industries, working for notable companies like Netscape and Symantec as well as successful startups--Boxer Cross, purchased by Applied Materials and Prometrix, purchased by KLA-Tencor. He has produced over 100,000 lines of production C/C++ code and is currently focussed on software process automation and web technologies.";
		}
		else {
			readFile("bio.txt", stuff);
		}
	};
//
//   Development submenu
//	
	var goCalendar=function(event) {
		console.log("Listing environment");
		var node = document.getElementById("content");
		clearContent(node);
		var page = document.createElement("Object");
		page.type = "text/html";
		page.classList.add("calendar_page");
		content.appendChild(page);
		page.data = "tools/calendar/testControl.html";
		event.stopPropagation();
		return false;
	}
	
	var goSVGDemo = function(event) {
		console.log("SVG Demo");
		var node = document.getElementById("content");
		clearContent(node);
		var page = document.createElement("Object");
		page.type = "text/html";
		page.classList.add("SVG_demo");
		content.appendChild(page);
		page.data = "tools/svg.html";
		event.stopPropagation();
		return false;
	};

	var goTableSort = function(event) {
		console.log("Table Sort Demo");
		var node = document.getElementById("content");
		clearContent(node);
		var page = document.createElement("Object");
		page.type = "text/html";
		page.classList.add("tableSort_demo");
		content.appendChild(page);
		page.data = "tools/tableSort.html";
		event.stopPropagation();
		return false;
	};

	var goHistoryExample = function(event) {
		console.log("History Example");
		var node = document.getElementById("content");
		clearContent(node);
		var page = document.createElement("Object");
		page.type = "text/html";
		page.classList.add("history_example");
		content.appendChild(page);
		page.data = "tools/stateRestore.html";
		event.stopPropagation();
		return false;
	};
	
	var goColorChart = function(event) {
		console.log("Color Chart");
		var node = document.getElementById("content");
		clearContent(node);
		var page = document.createElement("Object");
		page.type = "text/html";
		page.classList.add("colorChart");
		//		page.classList.add("tableSort_demo");
		content.appendChild(page);

		page.data = "tools/colorChart.html";
		event.stopPropagation();
		return false;
	};
	
	var goEnvironment=function(event) {
		console.log("Listing environment");
		var node = document.getElementById("content");
		clearContent(node);
		var tableOfTables = document.createElement("table");
		tableOfTables.id = "setOfTables";
		var itemsToDisplay = {
			"clientEnvironment" : navigator,
			"locationData"      : location,
//			"pluginData"        : window.plugins,
			"historyData"       : window.history,
//			"responseHeader"    : this,
		};

		if (location.hostname != "") {
			$(document).ready(function(data) {
				var jqxhr = $.get("http://www.pinckert.com/cgi-bin/environ.py", function(data) {
				node.appendChild(tableFromDict(JSON.parse(data), "Server Environment"));
				for (var key in itemsToDisplay) {
					node.appendChild(tableFromDict(itemsToDisplay[key], key));
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
			node.appendChild(tableFromDict(windowData, "Window.history"));
			node.appendChild(tableFromDict(clientEnvironment, "Client Environment"));
			node.appendChild(tableFromDict(locationData, "Location Data"));
			node.appendChild(tableFromDict(plugins, "Plugin Data"));
		}
		event.stopPropagation();
		return false;
	};
