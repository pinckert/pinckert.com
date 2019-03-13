'use strict';

var legalColors = {
	"aliceblue"     : "#F0F8FF",   "antiquewhite"   : "#FAEBD7",   "aqua"           : "#00FFFF",
	"aquamarine"    : "#7FFFD4",   "azure"          : "#F0FFFF",   "beige"          : "#F5F5DC",
	"bisque"        : "#FFE4C4",   "black"          : "#000000",   "blanch"         : "#FFEBCD",
	"blue"          : "#0000FF",   "blueviolet"     : "#8A2BE2",   "brown"          : "#A52A2A",
	"burlywood"     : "#DEB887",   "cadetblue"      : "#5F9EA0",   "chartreuse"     : "#7FFF00",
	"chocolate"     : "#D2691E",   "coral"          : "#FF7F50",   "cornflowerblue" : "#6495ED",
	"cornsilk"      : "#FFF8DC",   "crimson"        : "#DC143C",   "cyan"           : "#00FFFF",
	"darkblue"      : "#00008B",   "darkcyan"       : "#008B8B",   "darkgoldenrod"  : "#B8860B",
	"darkgrey"      : "#A9A9A9",   "darkgreen"      : "#006400",   "darkkhaki"      : "#BDB76B",
	"darkmagenta"   : "#8B008B",   "darkolivegreen" : "#556B2F",   "darkorange"     : "#FF8C00",
	"darkorchid"    : "#9932CC",   "darkred"        : "#8B0000",   "darksalmon"     : "#E9967A",
	"darkseagreen"  : "#F8FBC8",   "darkslateblue"  : "#483D8B",   "darkslategrey"  : "#2F4F4F",
	"darkturquoise" : "#00CED1",   "darkviolet"     : "#9400D3",   "deeppink"       : "#FF1493",
	"deepskyblue"   : "#00BFFF",   "dimgrey"        : "#696969",   "dodgerblue"     : "#1E90FF",
	"firebrick"     : "#B22222",   "floralwhite"    : "#FFFAF0",   "forestgreen"    : "#228B22",
	"fuchsia"       : "#FF00FF",   "gainsboro"      : "#DCDCDC",   "ghostwhite"     : "#F8F8FF",
	"gold"          : "#FFD700",   "goldenrod"      : "#DAA520",   "grey"           : "#808080",
	"green"         : "#008000",   "greenyellow"    : "#ADFF2F",   "honeydew"       : "#F0FFF0",
	"hotpink"       : "#FF69B4",   "indianred"      : "#CD5C5C",   "indigo"         : "#4B0082",
	"ivory"         : "#FFFFF0",   "khaki"          : "#F0E68C",   "lavender"       : "#E6E6FA",
	"lavenderblush" : "#FFF0F5",   "lawngreen"      : "#7CFC00",   "lemonchiffon"   : "#FFFACD",
	"lightblue"     : "#ADDAE6",   "lightcoral"     : "#F08080",   "lightcyan"      : "#E0FFFF",
	"lightgoldenrodyellow" : "#FAFAD2",	"lightgray" : "#D3D3D3",   "lightgrey"      : "#D3D3D3",
	"lightgreen"    : "#90EE90",   "lightpink"      : "#FFB6C1",   "lightsalmon"    : "#FFA07A",
	"lightseagreen" : "#20B2AA",   "lightskyblue"   : "#87CEFA",   "lightslategray" : "#778899",
	"lightslategrey"  : "#778899",  "lightsteelblue"  : "#B0C4DE",   "lightyellow"       : "#FFFFE0",
	"lime"            : "#00FF00",  "limegreen"       : "#32CD32",   "linen"             : "#FAF0E6",
	"magenta"         : "#FF00FF",  "maroon"          : "#800000",   "mediumaquamarine"  : "#66CDAA",
	"mediumblue"      : "#0000CD",  "mediumorchid"    : "#BA55D3",   "mediumpurple"      : "#9370DB",
	"mediumseagreen"  : "#3CB371",  "mediumslateblue" : "#7B68EE",   "mediumspringgreen" : "#00FA9A",
	"mediumturquoise" : "#48D1CC",  "mediumvioletred" : "#C71585",   "midnightblue"      : "#191970",
	"mintcream"     : "#F5FFFA",   "mistyrose"      : "#FFE4E1",   "moccasin"       : "#FFE4B5",
	"navajowhite"   : "#FFDEAD",   "navy"           : "#000080",   "oldlace"        : "#FDF5E6",
	"olive"         : "#808000",   "olivedrab"      : "#6B8E23",   "orange"         : "#FFA500",
	"orangered"     : "#FF4500",   "orchid"         : "#DA70D6",   "palegoldenrod"  : "#EEE8AA",
	"palegreen"     : "#98FB98",   "paleturquoise"  : "#AFEEEE",   "palevioletred"  : "#DB7093",
	"papayawhip"    : "#FFEFD5",   "peachpuff"      : "#FFDAB9",   "peru"           : "#CD853F",
	"pink"          : "#FFC0CB",   "plum"           : "#DDA0DD",   "powderblue"     : "#B0E0E6",
	"purple"        : "#800080",   "rebeccapurple"  : "#663399",   "red"            : "#FF0000",
	"rosybrown"     : "#BC8F8F",   "royalblue"      : "#4169E1",   "saddlebrown"    : "#8B4513",
	"salmon"        : "#FA8072",   "sandybrown"     : "#F4A460",   "seagreen"       : "#2E8B57",
	"seashell"      : "#FFF5EE",   "sienna"         : "#A0522D",   "silver"         : "#C0C0C0",
	"skyblue"       : "#87CEEB",   "slateblue"      : "#6A5ACD",   "slategray"      : "#708090",
	"slategrey"     : "#708090",   "snow"           : "#FFFAFA",   "springgreen"    : "#00FF7F",
	"steelblue"     : "#4682B4",   "tan"            : "#D2B48C",   "teal"           : "#008080",
	"thistle"       : "#D8BFD8",   "tomato"         : "#FF6347",   "turquoise"      : "#40E0D0",
	"violet"        : "#EE82EE",   "wheat"          : "#F5DEB3",   "white"          : "#FFFFFF",
	"whitesmoke"    : "#F5F5F5",   "yellow"         : "#FFFF00",   "yellowgreen"    : "#9ACD32",
};

function hexToRGB(hexColor) {
	var foo = new Object;
    foo.r = parseInt(hexColor.slice(1,3), 16);
	foo.g = parseInt(hexColor.slice(3,5), 16);
	foo.b = parseInt(hexColor.slice(5,7), 16);
	return foo;
}
function closestMatch (c) {
	var closest = "aliceblue";
	var minDiff = Math.pow(255,2);
	for (var key in legalColors) {
		var rgb = hexToRGB(legalColors[key]);
		console.log("diff : " + (rgb.r - c.r) + " , pow : " + Math.pow(Math.abs(rgb.r - c.r), 1.25) + " color : " + legalColors[key]);
		var normalizedDifference = Math.pow(Math.abs(rgb.r - c.r), 1.25) + 
		                           Math.pow(Math.abs(rgb.g - c.g), 1.25) + 
								   Math.pow(Math.abs(rgb.b - c.b), 1.25);

	   if (normalizedDifference < minDiff) {
			minDiff = normalizedDifference;
			closest = key;
		}
	}
	console.log("result = " + closest);
	return closest;
}

function determineColor() {
	console.log("determineColor");
	var redNode   = document.getElementById("redInput");
	var greenNode = document.getElementById("greenInput");
	var blueNode  = document.getElementById("blueInput");
	var rgb = new Object;
	rgb.r = redNode.value;
	rgb.g = greenNode.value;
	rgb.b = blueNode.value;
	console.log("Red: " + rgb.r + ", Green : " + rgb.g + ", Blue : ", rgb.b);
	var closest = closestMatch(rgb);
	var display = document.getElementById("colorname");
	display.style.backgroundColor = closest;
	var rgb2 = new Object;
	rgb2.r = rgb.r;
	rgb2.g = rgb.g;
	rgb2.b = rgb.b;
	var rgb = hexToRGB(legalColors[closest]);
	if (rgb.r + rgb.g + rgb.b < 384) {
		display.style.color = "snow";
	} else {
		display.style.color = "slategray";
	}
	display.innerHTML = closest + " rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
	var named = document.getElementById("namedColor");
	var actual = document.getElementById("actualColor");
	console.log("Red: " + rgb2.r + ", Green : " + rgb2.g + ", Blue : ", rgb2.b);
	named.style.backgroundColor = closest;
	actual.style.backgroundColor="rgb(" + rgb2.r + "," + rgb2.g + "," + rgb2.b + ")";
}

function buildColorTable() {
	var tname = "colorChart";
	console.log("Table name is : " + tname);
	var t = document.getElementById(tname);
		
	for (var key in legalColors) {
		var row = document.createElement("tr");
		var name = document.createElement("td");
		var color = hexToRGB(legalColors[key]);
		var row = document.createElement("tr");
		var name = document.createElement("td");
		var hexValue = document.createElement("td");
		var rgbValue = document.createElement("td");
		name.style.backgroundColor = key;
		hexValue.style.backgroundColor = key;
		rgbValue.style.backgroundColor = key;
		name.appendChild(document.createTextNode(key));
		hexValue.appendChild(document.createTextNode(legalColors[key]));
		rgbValue.appendChild(document.createTextNode("rgb(" + color.r + "," + color.g + "," + color.b + ")"));
		var textColor = color.r+color.g+color.b > 400 ? "slate" : "snow";
		hexValue.style.color = textColor;
		rgbValue.style.color = textColor;
		name.style.color     = textColor;

		row.appendChild(name);
		row.appendChild(hexValue);
		row.appendChild(rgbValue);
		t.appendChild(row);
	}
}