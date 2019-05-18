'use strict'
//  Copyright Dean Pinckert 2017-18 http://www.pinckert.com/copyright.html
//  Routines to convert Javascript data structures into DOM tables
//

//
//  Convert an array of homogeneous dictionaries into a table.
//
function tableFromDictArray(da) {
		var tab  = document.createElement("table");
		var head = tab.appendChild(document.createElement("thead"));
		for (var key in da[0]) {   //  all dictionaries should have the same keys
			var col_header = document.createElement("th");
			col_header.appendChild(document.createTextNode(key));
			head.appendChild(col_header);
		}
		console.log("creating table from dictionary: " + da.length + " rows")
		for (var i = 0; i<da.length; i++) {
			var row = document.createElement("tr");

			for (var key in da[0]) {
				var cell = document.createElement("td");
				cell.appendChild(document.createTextNode(da[i][key]));
				row.appendChild(cell);
			}
			tab.appendChild(row);
		}
	return tab
  }

  //
  //  Data format [{key1: [,,,,], key2: [,,,,], key3: [,,,,]}]
  //
 function tableFromArrayOfDictSingleArray(ada, labels, columnsOrRows,) {
	var tab = document.createElement('table');
	var head = tab.appendChild(document.createElement("thead"));
	// not implemnted yet
	if (columnsOrRows == undefined) {
		columnsOrRows = 1;
	} 
	if (labels != undefined) {
		for (var i in labels) {
			var col_header = document.createElement("th");
			col_header.appendChild(document.createTextNode(labels[i]));
			head.appendChild(col_header);			
		}
	}
	for (var label in ada) {
		var row = document.createElement("tr");
		var rowLabel = document.createTextNode(label);
		var labelNode = document.createElement("td");
		labelNode.appendChild(rowLabel);
		row.appendChild(labelNode);
		for (var element in ada[label]) {   
			var cell = document.createElement("td");
			cell.appendChild(document.createTextNode(ada[label][element]));
			row.appendChild(cell);
		}
		tab.appendChild(row);			
	}
return tab
}

//
// Non-generic file display from directory query...
//
	function tableFromFileList(data) {
		var tab    = document.createElement("table");
		tab.class = "fileview";
		var head   = tab.appendChild(document.createElement("thead"));
		var dictArray = JSON.parse(data);
		var keys = {"name":"","date":"","size":""};
		// Build header based on keys in first dictionary
		for (var key in keys) {
			var label = document.createElement("th");
			label.appendChild(document.createTextNode(key));
			head.appendChild(label);
		}
		tab.appendChild(head);
		for (var i = 0; i<dictArray.length; i++) {
			console.log("looping through files...")
			console.dir(dictArray[i]["name"]);
			var row = document.createElement("tr");
			row.class = "fileview";
			for (var key in keys) {
				var value;
				var cell = document.createElement("td");
				cell.className = "fileview";
				
				if (key == "name") {
					var name = dictArray[i][key];
					var link = document.createElement("a");	
					if (dictArray[i]["is_dir"]) {
						name = "/" + name;
						var dirName = (dictArray[i]["fileLoc"]).slice(4);
						var dirLoc  = "http://www.pinckert.com/cgi-bin/dir.py?path=" + dirName;
						console.log("Setting path to : " + dirLoc);
						link.dirLoc = dirLoc;
						link.onclick = function() {
							console.log("in click handler, directory is " + this.dirLoc);
							goFiles(this.dirLoc);
						};
					}
					else {
						link.href = dictArray[i]["link"];
					}
					link.appendChild(document.createTextNode(name));
					value = link;
				}
				if (key == "date") {
					var fromUnixEpoch = dictArray[i][key] * 1000;
					var d = new Date(fromUnixEpoch);
					value = document.createTextNode(formatDate(d));
				}
				if (key == "size") {
					value = document.createTextNode(dictArray[i][key]);
					cell.style.textAlign = "right";
				}
				cell.appendChild(value);
				row.appendChild(cell);
			}
			tab.appendChild(row);	
		}
		return tab;
	}
//	
// Convert a simple dictionary to a table element (first column keys, second column values)
//
function tableFromDict(dict, caption) {
		var tab  = document.createElement("table");
		var head = tab.appendChild(document.createElement("thead"));
		var cap = head.appendChild(document.createElement("th"));
		cap.colSpan = 2;
		cap.style.align = "center";
		cap.appendChild(document.createTextNode(caption));
		head.appendChild(cap);
		var labels = document.createElement("tr");
		var label = labels.appendChild(document.createElement("th"));
		label.appendChild(document.createTextNode("Key"));
		var label2 = labels.appendChild(document.createElement("th"));
		label2.appendChild(document.createTextNode("Value"));
		head.appendChild(labels);
		for(var key in dict) {
			var tr = tab.appendChild(document.createElement("tr"));
			var cell = tr.appendChild(document.createElement("td"))
			cell.appendChild(document.createTextNode(key));
			cell = tr.appendChild(document.createElement("td"));
			cell.appendChild(document.createTextNode(dict[key]));
		}
		return tab;
	}
//
//  Convert an array of homogeneous dictionaries into a sortable table 
//	da :list of key/value dictionaries.
//  sorter list of comparisson functions for the columns. default to standard sort. 
// TODO: allow sorting based on row values.
//
//  Inputs:
//       da: dictionary containing key/array of values e.g. {'names' : ['john', 'dave',...]}, 'ages' : [34,27,...]}
//       sorter (optional): dictionary of comparison functions (defined below)
// 			current options: sort_alpha, sort_int, sort_date

   function sortableTableFromDictArray(da, sorter) {

		var tab  = document.createElement("table");	
		var head = tab.appendChild(document.createElement("thead"));

		for (var key in da[0]) {   //  all dictionaries should have the same keys
			var col_header = document.createElement("th");
			col_header.appendChild(document.createTextNode(key));

			col_header.addEventListener("click", function() {
								console.log("Click response");
								var key = this.innerHTML;
								var table = this.parentNode.parentNode;
								var tableData = extractTableDataByColumn(table);
								tableData = sortDictionary(tableData, key, sorter[key]);
								updateTable(table, tableData);
							});
						
			head.appendChild(col_header);
		}
		for (var i = 0; i<da.length; i++) {
			var row = document.createElement("tr");

			for (var key in da[0]) {
				var cell = document.createElement("td");
				cell.appendChild(document.createTextNode(da[i][key]));
				row.appendChild(cell);
			}
			tab.appendChild(row);
		}

	return tab
	}

function sortableTableFromArrayArray(da, sorter) {
		var tab  = document.createElement("table");	
		tab.id = name;
		var head = tab.appendChild(document.createElement("thead"));

		for (var key in da[0]) {   //  all dictionaries should have the same keys
			var col_header = document.createElement("th");
			col_header.appendChild(document.createTextNode(key));

			col_header.addEventListener("click", function() {
								console.log("Click response");
								var key = this.innerHTML;
								var table = this.parentNode.parentNode;
								var tableData = extractTableDataByColumn(table);
								tableData = sortDictionary(tableData, key, sorter[key]);
								updateTable(table, tableData);
							});
						
			head.appendChild(col_header);
		}
		console.log("creating table from dictionary: " + da.length + " rows")
		for (var i = 0; i<da.length; i++) {
			var row = document.createElement("tr");

			for (var key in da[0]) {
				var cell = document.createElement("td");
				cell.appendChild(document.createTextNode(da[i][key]));
				row.appendChild(cell);
			}
			tab.appendChild(row);
		}

	return tab
	}

	
function updateTable(table, data){
	var rows = table.getElementsByTagName("TR");
	var keys = Object.keys(data);
	var rowCount = data[keys[0]].length;  // array's must be the same length.
	
	var i = 0;
	for (var row =0; row<rowCount; row++) {
		var cells = rows[row].childNodes;
		var i = 0;
		for (var key in data) {
			cells[i].innerHTML = data[key][row];
			i++;
		}
	}
}

//
//  Sort a dictionary of key/array pairs by values associated with a given key.
//  Array's must be same length
//
function sortDictionary(dict, key, sorter) {

  if (sorter === undefined) {
	  sorter = sort_alpha;
  }
  var rows, columns, switching, i, x, y, shouldSwitch, values;
  switching = true;
  console.log ("Sorting on column : ", key);
  console.dir(sorter);

  while (switching) {
    // Start by saying: no switching is done:
    switching = false;

    for (i = 0; i < (dict[key].length-1); i++) {
      // Start by saying there should be no switching:
		shouldSwitch = false;

		x = dict[key][i];
		y = dict[key][i+1];

		if (sorter(x, y)) {
			shouldSwitch= true;
			break;
		}
    }
    if (shouldSwitch) {
		for (var k in dict) {
			var temp = dict[k][i+1];
			dict[k][i+1] = dict[k][i];
			dict[k][i] = temp;
			
			switching = true;
		}
    }
  }
  return dict;
}	
//
// return a dictionary of arrays corresponding to a table 
// table = {'header1' : [,,,], 'header2': [,,,], ...}
//
function extractTableDataByColumn(table)
{
	var headers =  table.getElementsByTagName("TH");
	var rows = table.getElementsByTagName("TD");
	var data = {};
	
	for (var col=0; col<headers.length; col++) {
		var label = headers[col].innerHTML;
		var rowCount = rows.length/headers.length
		data[label] = new Array;
		
		for (var row=0; row<rowCount; row++)
		{
			var value = rows[col+(row*headers.length)].innerHTML;
			data[label][row] = value;
		}
	}

	return data;
}
//
//  Return an array of homogenous dictionaries, slow sort...
//
function extractTableDataByRow(table)
{
	var headers =  table.getElementsByTagName("TH");
	var rows = table.getElementsByTagName("TD");
	var data = {};
	console.dir(headers);
	console.dir(rows);
	console.log(rows.length, headers.length)
	for (var col=0; col<headers.length; col++) {
		var rowData = [];
		data[headers[col].innerHTML] = rowData;
		var rowCount = rows.length/headers.length

		for (var row=0; row<rowCount; row++)
		{
			data[headers[col].innerHTML][row] = rows[row+(col*headers.length)].innerHTML;
		}
	}
	console.dir(data);
	return data;
}

function extractTableDataAsArray(table)
{
	var headers =  table.getElementsByTagName("TH");
	var rows = table.getElementsByTagName("TD");
	var data = {};
	for (var col=0; col<headers.length; col++) {
		var rowData = [];
		data[col] = rowData;
		var rowCount = rows.length/headers.length

		for (var row=0; row<rowCount; row++)
		{
			data[col][row] = rows[row+(col*headers.length)].innerHTML;
		}
	}	
	console.log(data)
	return data;
	
}

function sort_alpha(a,b) {
	return (a.toLowerCase() >  b.toLowerCase());
};

function sort_int(a,b) {
	return parseInt(a) > parseInt(b);
};

function sort_date(a,b) {
	var first = new Date(a);
	var second = new Date(b);
	return first > second;
};

// Specific to charts.html
function sort_result(a, b) {
	var result = (a[3] - b[3]) - (a[5] - b[5]);
	return (result > 0);
};
