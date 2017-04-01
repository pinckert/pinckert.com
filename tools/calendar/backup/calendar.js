
//-----------------------------------------------------------------------
//
//  Calendar.js                      Copyright 2007, 2016 Dean William Pinckert
//
//  Purpose: Provide an embeddable calendar element.
//  
//  Design Notes:   

var g_DayOfWeek = new Array ("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
var g_AbbrDayOfWeek = new Array("S","M", "T", "W", "Th", "F", "S");

var g_MonthName = new Array("January", "February",  "March",     "April",   "May",      "June", 
                            "July",    "August",    "September", "October", "November", "December");

var g_DaysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

var g_today = new Date();  // Actual date
var g_current = g_today;   // Currently selected month

//------------------------------------------------------------------------------
//  constructor
//
//      Parent is the name/id of the parent that we are attaching the calendar to. 
//      Name is the DOM name/id for the created calendar
//      Size is either 'small' or 'large' and determines the button size to use.
//      onMonthChage is  
//------------------------------------------------------------------------------

function calendar(parent, name, size, onMonthChange, onClick, onHover)
{
    if (parent == null || parent =="")
       this.parent = document;
    else
       this.parent = document.getElementById(parent);
   
    this.name = name;

    this.btn_images = new Array ("left.gif", "left_alt.gif", "right.gif", "right_alt.gif");
    this.size = "small";

    this.clickCallback = onClick;
    this.hoverCallback = onHover;
    this.monthChangeCallback = onMonthChange;

    this.buildTable();
    var nodeList = this.fill();
    this.monthChangeCallback(g_current, nodeList);
    this.theTable.parent = this;   // Still using the DOM to get access to calender from callbacks....
}


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
    calObject = document.getElementById(owner).parent;
    var month = g_current.getMonth() + increment;
    var year  = g_current.getFullYear();

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
    g_current = new Date(g_MonthName[month] + " " + g_current.getDate() + " " + year);

    nodeList = calObject.fill();
    
    if (calObject.changeMonthCallback !== null)
    {
        calObject.monthChangeCallback(g_current, nodeList);
    }

}

//--------------------------------------------------------------------------------------------------------
//  Functions to support the summary table--not updated dynamically.
//
//--------------------------------------------------------------------------------------------------------

calendar.prototype.summaryTitleText=function(today)
{
   var today = g_current;
   addNode(this.parent, "text", "title", formatDate(today));
}

function formatDate(today)
{
  return g_DayOfWeek[today.getDay()] + ", " + g_MonthName[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear();
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
// Notes: Current month is controlled through the global g_current date variable.
//        Table is indexed day/row id that is added in buildTable() 
//           e.g. Friday3 is the cell representing Friday in the 4th row (0-base).
//
// Design Note: probably better to pass in the date as a parameter.
// 
calendar.prototype.fill=function()
{
  
   var today = g_current;
   var nodeList = new Array();  // list of nodes that will be passed to client for further additions.


   clearCells();   // this is a no-op the first time through, clear out the images/dates in the table.
   updateHeader(); // set the month/year in the header

   var firstDayOfMonth =  new Date(g_MonthName[today.getMonth()] + " " + "1" + ", " + today.getFullYear())
   var offset = firstDayOfMonth.getDay();   // Specifies where in the table we 'start' the month
   
   // Loop through the days of the month.
   var daysThisMonth = getDaysInMonth(today);
   for (i=0; i<daysThisMonth; i++)
   {
      var dom=i+1;                       // also need the 'actual' day of month, and not just an index.
      var dow=(offset+i)%7;              // determine which day of the week
      var row=Math.floor((offset+i)/7);  // determine which week of the month
      
      // Get our cell for this day
      var whichNode=g_DayOfWeek[dow]+row;   
      var node = document.getElementById(whichNode);
      nodeList[dom] = node;

      // Get the info that we want to put in the cell
      var aDay = new Date(g_MonthName[today.getMonth()] + " " + dom + " " + today.getFullYear());

      // Update the cell and highlight it if it's today. 

      fillNode(node, dom, 0);
      if (dom == g_today.getDate() && g_today.getMonth() == aDay.getMonth())
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
function updateHeader()
{
   var today = g_current;
   var head = document.getElementById("tableHeader");
   head.firstChild.nodeValue = g_MonthName[today.getMonth()] + "  " + today.getFullYear();
}

//------------------------------------------------------------------------------------
//
//  Function clearCells()
//
//  Purpose: Clear the contents of the table before re-populating
//
function clearCells()
{
   for (row=0; row<6; row++)
   {
       for (i=0; i<7; i++)
       {
       	  node=document.getElementById(g_DayOfWeek[i]+row);
		  node.style.color = "black";
          if (node.hasChildNodes())  // required since some days aren't set
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
        return g_DaysInMonth[month];

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
//  I couldn't figure out how to add the parameters for the callback when handling
//  the onClick/onHover events, so added functions solely to add the necessary info
//  for the client.
//

function handleClickCallback()
{
    var today = g_current;
    // navigate up the tree to get our 'base' class (since it has the pointers to the actual functions)
    //                                           -- row --  -- table-- --Cal--
    var parent = document.getElementById(this.id).parentNode.parentNode.parent;

    var dayOfMonth = this.firstChild.nodeValue;
    
    var dayClicked = new Date(g_MonthName[g_current.getMonth()] + " " + dayOfMonth + ", " + today.getFullYear());

    parent.clickCallback(dayClicked);
}

function handleHoverCallback()
{
    var today = g_current;

    // navigate up the tree to get our 'base' class (since it has the pointers to the actual functions)
    //                                           -- row --  -- table-- --Cal--
    var parent = document.getElementById(this.id).parentNode.parentNode.parent;

    var dayOfMonth = this.firstChild.nodeValue;
    
    var dayClicked = new Date(g_MonthName[today.getMonth()] + " " + dayOfMonth + ", " + today.getFullYear());

    parent.hoverCallback(dayClicked);
}

//------------------------------------------------------------------------------------
//
//  Function buildTable()
//
//  Purpose: Create a table suitable as a calendar.
//           Each cell is labeled with as the day of week + the row. eg
//             the fifth cell of the third row is Thursday2
//
//  Notes: Should only be called on initialization.
//
calendar.prototype.buildTable=function()
{
   this.theTable = addNode(this.parent, "table", this.name, "", "calendar");
   this.buildTableHeader();
   for (i=0; i<6;i++)  // max # of rows is 6
   {
       var row = addNode(this.theTable, "tr", "", "", "calendar");
       for (j=0; j<7; j++)
       {
          var node = addNode(row, "td", g_DayOfWeek[j]+i, "", "calendar");
          if (this.hoverCallback != null)
               node.onmouseover = handleHoverCallback;
          else
               node.setAttribute("onmouseover", "this.bgColor='yellow'");

          if (this.clickCallback != null)
               node.onclick = handleClickCallback;

          node.setAttribute("onmouseout", "this.bgColor='#FFFFFF'");
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
calendar.prototype.buildTableHeader=function()
{
   var today = g_current;
   var head=addNode(this.theTable, "thead", "", "", "calendar");
   // left button (decrement month)
   var leftButtonHolder = addNode(head, "th","", "", "calendar");
   leftButtonHolder.setAttribute("align", "left");
   var leftButton = new Image();
   leftButton.setAttribute("name", "leftButton");
   leftButton.setAttribute("id", "leftButton");
   leftButton.setAttribute("align", "center");
   leftButton.setAttribute("src", this.btn_images[0]);
   leftButton.setAttribute("onmouseout",  "setImage('leftButton', " + "'" + this.btn_images[0] + "'" + ")");
   leftButton.setAttribute("onmousedown", "setImage('leftButton', " + "'" + this.btn_images[1] + "'" + ")");
   leftButton.setAttribute("onmouseup",   "setImage('leftButton', " + "'" + this.btn_images[0] + "'" + ")");
   leftButton.setAttribute("onclick", "changeMonth(-1," +  "'" + this.name + "'" + ")");
   leftButton.style.height = "auto";
   leftButton.style.width  = "75%";
   leftButtonHolder.appendChild(leftButton);


   // Month and year
   var title = document.createTextNode(g_MonthName[today.getMonth()] + "  " + today.getFullYear());
   var header = addNode(head, "th", "tableHeader", "","", "calendar");
   header.appendChild(title);
   header.setAttribute("colspan", "5");
   header.setAttribute("align", "center");

   // right button
   var rightButtonHolder = addNode(head, "th","","", "calendar");
   rightButtonHolder.setAttribute("align", "right");
   var rightButton = new Image();
   rightButton.setAttribute("name", "rightButton");
   rightButton.setAttribute("id", "rightButton");
   rightButton.setAttribute("align", "center");
   rightButton.setAttribute("src", this.btn_images[2]);
   rightButton.setAttribute("onmouseout",  "setImage('rightButton', " + "'" + this.btn_images[2] + "'" + ")");
   rightButton.setAttribute("onmousedown", "setImage('rightButton', " + "'" + this.btn_images[3] + "'" + ")");
   rightButton.setAttribute("onmouseup",   "setImage('rightButton', " + "'" + this.btn_images[2] + "'" + ")");
   rightButton.setAttribute("onclick", "changeMonth(1," + "'" + this.name + "'" + ")");
   rightButton.style.height = "auto";
   rightButton.style.width  = "75%";
   rightButtonHolder.appendChild(rightButton);

   // Days of the week
   var weekday = addNode(head, "tr","", "", "calendar");
   for (i=0;i<7;i++)
   {
       if (this.size.toLowerCase() == "large")
       {
	   addNode(weekday, "th",g_DayOfWeek[i], g_DayOfWeek[i], "calendar");
       }
       else
       {
	   addNode(weekday, "th",g_DayOfWeek[i], g_AbbrDayOfWeek[i], "calendar");
       }
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
function fillNode(parent, day)
{
   clearNode(parent);
   txt = document.createTextNode(day);
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
function setImage(imageID, newImage)
{
   document.images[imageID].src = newImage;
}
