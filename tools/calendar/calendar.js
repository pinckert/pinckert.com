'use strict';
//-----------------------------------------------------------------------
//
//  Calendar.js                      Copyright 2007, 2016 Dean William Pinckert
//
//  Purpose: Provide an embeddable calendar element.
//  
//  Design Notes:   

//------------------------------------------------------------------------------
//  constructor
//
//      Parent is the name/id of the parent that we are attaching the calendar to. 
//      Name is the DOM name/id for the created calendar
//      Callbacks --
//         onMonthChange -- called when user increments/decrements month
//         onClick       -- called when a day is clicked  
//         onHover       -- called when the cursor is hovering over a day
//------------------------------------------------------------------------------

function calendar(parent, name, onMonthChange, onClick, onHover) {
    if (parent == null || parent =="")
       this.parent = document;
    else
       this.parent = document.getElementById(parent);
    this.name = name;

    this.btn_images = new Array ("left.gif", "left_alt.gif", "right.gif", "right_alt.gif");

    this.clickCallback       = onClick;
    this.hoverCallback       = onHover;
    this.monthChangeCallback = onMonthChange;
    this.current             = new Date();
    this.startDate           = new Date();
    this.buildTable();
    this.nodeList            = this.fill();
	if (onMonthChange) {
       this.monthChangeCallback(this.current, this.nodeList);
	}
    this.theTable.parent = this;   // Still using the DOM to get access to calendar from callbacks....
}

// Class globals
calendar.dayOfWeek = new Array("Su","M", "T", "W", "Th", "F", "S");

calendar.monthName = new Array("January", "February",  "March",     "April",   "May",      "June", 
                            "July",    "August",    "September", "October", "November", "December");

calendar.daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

//------------------------------------------------------------------------------
//
//  Function: changeMonth()
//  Purpose: Respond to user request to increment/decrement the current month
//  Parameter: increment -- number of months to increment (currently +1 or -1)
//
//  Design Notes: Might be better to take a date object, than a delta....
//
function changeMonth(increment, owner)
{
    var calObject = document.getElementById(owner).parent;
    var month = calObject.current.getMonth() + increment;
    var year  = calObject.current.getFullYear();

    if (month < 0)
    {
       month = 11;
       year -= 1;
    }
    if (month > 11)
    {
       month = 0;
       year += 1;
    }
    calObject.current = new Date(calendar.monthName[month] + " " + calObject.current.getDate() + " " + year);

    var nodeList = calObject.fill();
    
    if (calObject.monthChangeCallback !== null)
    {
        calObject.monthChangeCallback(calObject.current, nodeList);
    }

}

//------------------------------------------------------------------------------
//  Support functions
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//
// Function: fill()
//
// Purpose: propogate the table with the images and dates for a given month
//          
// Notes: Current month is controlled through the this.current date value.
//        Table is indexed day/row id that is added in buildTable() 
//           e.g. Friday3 is the cell representing Friday in the 4th row (0-base).
//
// Design Note: probably better to pass in the date as a parameter.
// 
calendar.prototype.fill=function()
{
   var today = this.current;
   var nodeList = new Array();  // list of nodes that will be passed to client for further additions.


   this.clearCells();   // this is a no-op the first time through, clear out the images/dates in the table.
   this.updateHeader(); // set the month/year in the header

   var firstDayOfMonth =  new Date(calendar.monthName[today.getMonth()] + " " + "1" + ", " + today.getFullYear())
   var offset = firstDayOfMonth.getDay();   // Specifies where in the table we 'start' the month
   // Loop through the days of the month.
   var daysThisMonth = getDaysInMonth(today);

   for (var i=0; i<daysThisMonth; i++)
   {
      var dom=i+1;                       // also need the 'actual' day of month, and not just an index.
      var dow=(offset+i)%7;              // determine which day of the week
      var row=Math.floor((offset+i)/7);  // determine which week of the month
      // Get our cell for this day
      var whichNode = this.name + calendar.dayOfWeek[dow]+row;   
      var node = document.getElementById(whichNode);
      nodeList[dom] = node;

      // Get the info that we want to put in the cell
      var aDay = new Date(calendar.monthName[today.getMonth()] + " " + dom + " " + today.getFullYear());

      // Update the cell and highlight it if it's today. 
      fillNode(node, dom, 0);
      if (dom == this.current.getDate() && this.startDate.getMonth() == aDay.getMonth())
      {
			node.style.color = "red";
      }
   }
   return nodeList;
}


//------------------------------------------------------------------------------------
//
//  Function updateHeader()
//
//  Purpose: Write the Month/Year to the calendar header
//
calendar.prototype.updateHeader=function()
{
   var today = this.current;
   var head = document.getElementById(this.name + "tableHeader");
   head.firstChild.nodeValue = calendar.monthName[today.getMonth()] + "  " + today.getFullYear();
}

//------------------------------------------------------------------------------------
//
//  Function clearCells()
//
//  Purpose: Clear the contents of the table before re-populating
//
calendar.prototype.clearCells=function()
{
   for (var row=0; row<6; row++)
   {
       for (var i=0; i<7; i++)
       {
	      var nodeName = this.name + calendar.dayOfWeek[i] + row;
       	  var node = document.getElementById(nodeName);
		  node.style.color = "black";
          if (node.hasChildNodes())  // required since some cells aren't set
          {
             clearNode(node);
          }
       }
   }
}

//------------------------------------------------------------------------------------
//
//  Function getDaysInMonth
//
//  Purpose: Bury the leap-year calculation so it's not in the main-line logic.
//
function getDaysInMonth(today)
{
    var month = today.getMonth();
    if (today.getMonth() != 1)
        return calendar.daysInMonth[month];

    // else -- it's february
    var year = today.getFullYear();
    
    // years divisible by 100 are not leap years, unless they're also divisible by 400
    if ( (year%100) == 0 && !((year%400) == 0))
       return 28;

    // we've handled the non-leap leap-years, so now everything divisible by 4 is gtg.
    if ( (year % 4) == 0) 
       return 29;
  
    return 28;
 }

//------------------------------------------------------------------------------------
//
//

calendar.prototype.handleClickCallback=function()
{
    var calObject = document.getElementById(this.myCalendarName).parent;
    var today = calObject.current;
	
	if (this.firstChild != null) {
       var dayOfMonth = this.firstChild.nodeValue;
	   var dayClicked = new Date(calendar.monthName[today.getMonth()] + " " + dayOfMonth + ", " + today.getFullYear());
    }
    calObject.clickCallback(dayClicked);
}

calendar.prototype.handleHoverCallback=function()
{
    var calObject = document.getElementById(this.myCalendarName).parent;
    var today = calObject.current;
	if (this.firstChild != null) {
		var dayOfMonth = this.firstChild.nodeValue;
        var dayClicked = new Date(calendar.monthName[today.getMonth()] + " " + dayOfMonth + ", " + today.getFullYear());
		calObject.hoverCallback(dayClicked);
	}
}

//------------------------------------------------------------------------------------
//
//  Function buildTable()
//
//  Purpose: Create a table suitable as a calendar.
//           Each cell is labeled with the calendar ID, day of week + the row. eg
//             the fifth cell of the third row is '<calenderID>Th3'
//
//  Notes: Should only be called on initialization.
//
calendar.prototype.buildTable=function() {
   this.theTable = addNode(this.parent, "table", this.name, "", "calendar");
   this.buildTableHeader();
   for (var i=0; i<6;i++) {
       var row = addNode(this.theTable, "tr", "", "", "calendar");
       for (var j=0; j<7; j++) {
	      var nodeName = this.name + calendar.dayOfWeek[j] + i.toString();
          var node = addNode(row, "td", nodeName, "", "calendar");
		  node.myCalendarName = this.name;
          if (this.hoverCallback != null)
			node.addEventListener("mouseover", this.handleHoverCallback);

          if (this.clickCallback != null)
               node.addEventListener("click", this.handleClickCallback);

//          node.setAttribute("onmouseout", "this.bgColor='#FFFFFF'");
       }
   }
}

//------------------------------------------------------------------------------------
//
//  Function buildTableHeader()
//
//  Purpose: Create a header for the calendar that includes two lines:
//           -Displayed month and year
//           -The days of the week.
//           -Buttons to allow month change
//
//  Notes: The first row is modified on month change via updateHeader()
//     
calendar.prototype.buildTableHeader=function() {
   var today = this.current;

   var head              = addNode(this.theTable, "thead", "", "", "calendar");
   var leftButtonHolder  = addNode(head, "th","", "", "calendar");       
   var header            = addNode(head, "th", this.name + "tableHeader", "","", "calendar");
   var rightButtonHolder = addNode(head, "th","","", "calendar");

    // Month and year
   var title = document.createTextNode(calendar.monthName[today.getMonth()] + "  " + today.getFullYear());
   header.appendChild(title);
   header.colSpan = 5;
   header.align = "center";   
	
   // left button (decrement month)
   var leftButton = new Image();
   leftButton.name         = "leftButton";
   leftButton.id           = "leftButton";
   leftButton.selfAlign    = "left";
   leftButton.src          = this.btn_images[0];
   leftButton.style.height = "75%";
   leftButton.style.width  = "auto";
   
   leftButton.setAttribute("onmouseout",  "setImage('leftButton', " + "'" + this.btn_images[0] + "'" + ")");
   leftButton.setAttribute("onmousedown", "setImage('leftButton', " + "'" + this.btn_images[1] + "'" + ")");
   leftButton.setAttribute("onmouseup",   "setImage('leftButton', " + "'" + this.btn_images[0] + "'" + ")");
   leftButton.calendarName = this.name;
   leftButton.onclick      = function() {
       changeMonth(-1, this.calendarName); 
   };
   leftButtonHolder.appendChild(leftButton);
   
   // right button
    rightButtonHolder.aligh  = "right";
    var rightButton = new Image();
	rightButton.name         = "rightButton";
	rightButton.id           = "rightButton";
	rightButton.align        = "center";
	rightButton.src          = this.btn_images[2];
    rightButton.style.height = "75%";
    rightButton.style.width  = "auto";
   
    rightButton.setAttribute("onmouseout",  "setImage('rightButton', " + "'" + this.btn_images[2] + "'" + ")");
    rightButton.setAttribute("onmousedown", "setImage('rightButton', " + "'" + this.btn_images[3] + "'" + ")");
    rightButton.setAttribute("onmouseup",   "setImage('rightButton', " + "'" + this.btn_images[2] + "'" + ")");
    rightButton.calendarName = this.name;
    rightButton.onclick      = function() {
         changeMonth(1, this.calendarName);
	 };
	 rightButtonHolder.appendChild(rightButton);

   // Days of the week
   var weekday = addNode(head, "tr","", "", "calendar");
   for (var i=0;i<7;i++)
   {
      addNode(weekday, "th", calendar.dayOfWeek[i], calendar.dayOfWeek[i], "calendar");
   }
}       

//------------------------------------------------------------------------------------
//
//  Function fillNode()
// 
//  Purpose: Propogate one cell (day) of the calendar with the current day.
//
//  Parameters: Parent -- the DOM node representing the table cell (e.g <TD> element)
//              Day    -- day of the month (1..31)
//
function fillNode(parent, day) {
   clearNode(parent);
   var txt = document.createTextNode(day);
   parent.appendChild(txt);
}

//------------------------------------------------------------------------------------
//
//  Function setImage()
//
//  Purpose: Change a displayed image. 
// 
//  Parameters:  imageID  -- the id attribute when the image was generated.
//               newImage -- url/file for the new image.
//
function setImage(imageID, newImage) {
   document.images[imageID].src = newImage;
}
