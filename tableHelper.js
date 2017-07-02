'use strict'
//  Copyright Dean Pinckert 2017 http://www.pinckert.com/copyright.html
//
// Convert an array of homogeneous dictionaries into a table for display
// Currnetly specific to file display...
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
	
// Convert a dictionary to a table element (first column keys, second column values)	
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
			var foo = tr.appendChild(document.createElement("td"))
			foo.appendChild(document.createTextNode(key));
			foo = tr.appendChild(document.createElement("td"));
			foo.appendChild(document.createTextNode(dict[key]));
		}
		return tab;
	}
//
//  Convert an array of homogeneous dictionaries into a table 
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