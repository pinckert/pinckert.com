'use strict'
//  Copyright Dean Pinckert 2017-18 http://www.pinckert.com/copyright.html
//  Routines to convert Javascript data structures into DOM tables
//
//

//  Create a row for a DOM table
//  Data Format  Object (e.g. {key1: value, key2: value2, key3: value 3,...}
function addRow(obj, header=false) {
//	console.log('addRow()');
//	console.dir(obj);
    let tagNames = header ? ["thead", "th"] : ["tr", "td"]
	let keys = Object.keys(obj);
	let row  = document.createElement(tagNames[0]);
	keys.forEach(entry =>  {
		let cell = document.createElement(tagNames[1]);
		cell.appendChild(document.createTextNode(obj[entry]));
		row.appendChild(cell);
	});
	return row;
};
//
//  Convert an array of homogeneous dictionaries into a table.
//  Data Format [ {key1: value, key2: value}, {key: value, key2: value}, ...]
//

function tableFromDictArray(da, labels=Object.keys(da[0])) {
	let tab  = document.createElement("table");
	let head = tab.appendChild(document.createElement("thead"));

	//  assumes first row is the header
	labels.forEach(label =>  {   //  all dictionaries should have the same keys
		let col_header = document.createElement("th");
		col_header.appendChild(document.createTextNode(label));
		head.appendChild(col_header);
	});

	da.forEach(entry =>  {
		tab.appendChild(addRow(entry));
	});

	return tab
  };

  //
  //  Data format {key1: [,,,,], key2: [,,,,], key3: [,,,,]}
  //
 function tableFromObjectArrays(da, labels=Object.keys(da)) {
	let tab = document.createElement('table');
    let head = tab.appendChild(document.createElement("thead"));
    console.log('tableFromObjectArrays()');
 
	labels.forEach( label => {
		let col_header = document.createElement("th");
		col_header.appendChild(document.createTextNode(label));
		head.appendChild(col_header);			
	});
	let keys =  Object.keys(da);
	console.dir(da);
	keys.forEach( element => {
		da[element].unshift(element);
		tab.appendChild(addRow(da[element]));
	});
	return tab
}
//
//  Data format is [[value1, ...], [value2,...], ...]
//     where each array of values represents one row. 
// 
function tableFromArrayArrays(aa, labels=aa[0]) {
	let tab = document.createElement('table');
	let head = tab.appendChild(document.createElement("thead"));

	labels.forEach(label => {
		let col_header = document.createElement("th");
		col_header.appendChild(document.createTextNode(label));
		head.appendChild(col_header);			
	});

	aa.forEach(element => {
		tab.appendChild(addRow(element));
    });
    
	return tab
}

//	
// Convert a simple dictionary to a table element (first column keys, second column values)
// Format: Object  {key1: value1, key2: value2, ...}
function tableFromDict(dict, caption = "Table") {
		let tab  = document.createElement("table");
		tab.innerHTML = `<thead><th colspan=2>${caption}</th></thead`;
		let keys = Object.keys(dict);
		keys.forEach ( key => tab.appendChild(addRow({key: dict[key]})));
		return tab;
	}
//
//  Convert an array of homogeneous dictionaries into a sortable table 
//	da :list of key/value dictionaries.
//  sorter list of comparisson functions for the columns. default to standard sort. 
//
//  Inputs:
//       da: dictionary containing key/array of values e.g. {'names' : ['john', 'dave',...]}, 'ages' : [34,27,...]}
//       sorter (optional): dictionary of comparison functions (defined below)
// 			current options: sort_alpha, sort_int, sort_date, sort_result
//
//   Bugs: mutates (re-orders) data 
//
function sortableTableFromDictArray(da, sorter = {}) {
	console.log('SortableTableFromDictArray()');
	console.dir(sorter);
    let tab     = tableFromDictArray(da);
    tab.data    = da; // Hmm, nasty side effect if not expected. Deep copy better?
    tab.sorter  = sorter;
    let headers = tab.getElementsByTagName("th");

    for (let col_header of headers) {
	    col_header.addEventListener("click", function() {
			let column = this.innerHTML;
			let sortFunc = sorter[column] || sort_alpha;  // Make a best guess
			console.dir(sortFunc);
			tab.data.sort((a, b) => {return sortFunc(a[column], b[column])});
			updateTable(this.parentNode.parentNode, tab.data);
		});
	}; 
	return tab;
};
//
//  Data format is [[value1, ...], [value2,...], ...]
//     where each array of values represents one row. 
// 
function sortableTableFromArrayArrays(da, sorter) {
    let tab = tableFromArrayArrays(da);
    tab.data   = da;
    tab.sorter = sorter;
    let headers = tab.getElementsByTagName("th");
    for (let col_header of headers) {
        col_header.addEventListener("click", function() {
           let column = 2;
           tab.data.sort((a, b) => {return sorter[column](a[column], b[column])});
           updateTable(this.parentNode.parentNode, tab.data);
        });
    };
    return tab;
} 
//
//  Given a DOM table and array of values,
//  replace rows with the new data
//
function updateTable(table, data) {
    var rows = table.getElementsByTagName("TR");
    let i = 0;
    [...rows].forEach(row =>  {
        row.remove();
        table.appendChild(addRow(data[i++]));
     });
}

//
//  Sort a dictionary of key/array pairs by values associated with a given key.
//  Array's must be same length
//
function sortDictionary(dictArray, key, sorter=sort_alpha) {

  let revised = dictArray.sort((a, b) => {
      let result = sorter(a[key], b[key]);
     return result;
  });
  return revised;
};

function sort_alpha(a,b) {
	return (a.toLowerCase() > b.toLowerCase() ? 1 : -1);
};

function sort_int(a,b) {
	return (parseInt(a) - parseInt(b));
};

function sort_date(a,b) {
	return ((new Date(a) > new Date(b)) ? 1 : -1);
};

// Assumes 'first last' name format
function sort_name(a,b) {

	return (a.split([' '])[1].toLowerCase() > b.split([' '])[1].toLowerCase() ? 1 : -1);
}

// Specific to charts.html
function sort_result(a, b) {
	let result = (a[3] - b[3]) - (a[5] - b[5]);
	return (result > 0 ? 1 : -1);
};

//
// Non-generic file display from directory query...
//
function tableFromFileList(data) {
	let tab    = document.createElement("table");
	tab.class = "fileview";
	let head   = tab.appendChild(document.createElement("thead"));
	let dictArray = JSON.parse(data);
	let keys = {"name":"","date":"","size":""};
	// Build header based on keys in first dictionary
	for (let key in keys) {
		let label = document.createElement("th");
		label.appendChild(document.createTextNode(key));
		head.appendChild(label);
	}
	tab.appendChild(head);
	for (let i = 0; i<dictArray.length; i++) {
		var row = document.createElement("tr");
		row.class = "fileview";
		for (let key in keys) {
			let value;
			let cell = document.createElement("td");
			cell.className = "fileview";
			
			if (key == "name") {
				let name = dictArray[i][key];
				let link = document.createElement("a");	
				if (dictArray[i]["is_dir"]) {
					name = "/" + name;
					let dirName = (dictArray[i]["fileLoc"]).slice(4);
					let dirLoc  = "http://www.pinckert.com/cgi-bin/dir.py?path=" + dirName;
					link.dirLoc = dirLoc;
					link.onclick = function() {
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
				let fromUnixEpoch = dictArray[i][key] * 1000;
				let d = new Date(fromUnixEpoch);
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