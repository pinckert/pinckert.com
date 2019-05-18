
//-----------------------------------------------------------------------
//
//  Calendar.js
//
//  Purpose: Provide an embeddible calendar element.
//  
//  Design Notes:   

// Pulled some globals from lesson 5. Seemed better to include them here directly than link another
// library.

var g_DayOfWeek = new Array ("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
var g_AbbrDayOfWeek = new Array("S","M", "T", "W", "Th", "F", "S");

var g_MonthName = new Array("January", "February",  "March",     "April",   "May",      "June", 
                            "July",    "August",    "September", "October", "November", "December");

var g_DaysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

//------------------------------------------------------------------------------
//  constructor
//
//      Parent is the name/id of the parent that we are attaching the calendar to. 
//      Name is the DOM name/id for the created calendar
//      Size is the number of days to display (the size of the table that's generated
//
//      onMonthChage (date, date, callback()) 
//          onMonthChange is a function that accepts 3 parameters, the start and end dates, and 
//          
//
//
//------------------------------------------------------------------------------

function calendar(parent, name, size, onMonthChange)
{
    if (parent == null || parent =="")
       this.parent = document;
    else
       this.parent = document.getElementById(parent);
    
    this.name = name;
    this.interval = size;

    this.btn_images = new Array ("left.gif", "left_alt.gif", "right.gif", "right_alt.gif");

    this.currentDay = new Date();

    this.buildTable();

    this.fill();

    
}

//------------------------------------------------------------------------------
//
//  Function: changeMonth()
//  Purpose: Respond to user request to increment/decrement the current month
//  Parameter: increment -- number of months to increment (currently +1 or -1)
//
//  Design Notes: Might be better to take a date object, than a delta....
//
function changeView(increment, owner)
{
    calObject = document.getElementById(owner).parent;
    
    alert(formatDate(calObject.currentDay) + " " + increment);
    calObject.currentDay.setDate(calObject.currentDay.getDate() + increment);

    alert(formatDate(calObject.currentDay));    
    calObject.updateHeader();
    calObject.fill();
}

//--------------------------------------------------------------------------------------------------------
//  Functions to support the summary table--not updated dynamically.
//
//--------------------------------------------------------------------------------------------------------

calendar.prototype.summaryTitleText=function(today)
{
   var today = this.currentDay;
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
//  Function: fill()
//
//  Purpose: propogate the table with the images and dates for a given month
//          
//  Notes: Current month is controlled through the global date variable.
//         Table is indexed day/row id that is added in buildTable() 
//           e.g. Friday3 is the cell representing Friday in the 4th row (0-base).
//
//  Design Note: probably better to pass in the date as a parameter.
// 
calendar.prototype.fill=function()
{
   var today = this.currentDay;

   this.clearCells();  // this is a no-op the first time through, clear out the images/dates in the table.
   this.updateHeader();  // set the month/year in the header

   for (i=0;i<7; i++)
   {
       var cell = document.getElementById(g_DayOfWeek[i]+"0");
       var newDate = (today.getMonth()+1) + " " + (today.getDate()+i) + " " + today.getFullYear();

       var dow = new Date(newDate);
       var content = g_DayOfWeek[dow.getDay()] + ", " + g_MonthName[dow.getMonth()] + " " + dow.getDate();

       alert(content);

       cell.firstChild.nodeValue = content;
   }
}

//------------------------------------------------------------------------------------
//
//  Function updateHeader()
//
//  Purpose: Write the Month/Year to the calendar header
//
calendar.prototype.updateHeader=function()
{
   var today = this.currentDay;
   var head = document.getElementById("tableHeader");
   head.firstChild.nodeValue = g_MonthName[today.getMonth()] + "  " + today.getFullYear();
}

//------------------------------------------------------------------------------------
//
//  Function clearCells()
//
//  Purpose: Clear the contents of the table before re-populating
//
calendar.prototype.clearCells=function()
{
     for (i=0; i<7; i++)
     {
        node=document.getElementById(g_DayOfWeek[i]);
        if (node.hasChildNodes())  // required since some days aren't set
        {
//           clearNode(node);
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
   this.theTable = addNode(this.parent, "table", this.name);
   this.theTable.align = "center";
   this.theTable.border = 4;
   this.buildTableHeader();
   for (i=0; i<7;i++)  // max # of rows is 6
   {
       var whichDay = g_DayOfWeek[i];
       var row = addNode(this.theTable, "tr", whichDay, whichDay);
       row.setAttribute("onmouseover", "this.bgColor='yellow'");
       row.setAttribute("onmouseout", "this.bgColor='#FFFFFF'");

       // Add elements for Date, our content, add button
       
       addNode(row, "td", g_DayOfWeek[i]+"0");  // to hold the day/date
       content = addNode(row, "td", g_DayOfWeek[i]+"1");  // to hold the content
       content.colspan = 3;
       addNode(row, "td", g_DayOfWeek[i]+"4");      // for the 'add' button/link
   }
   this.theTable.parent = this;
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

   var today = this.currentDay;
   var head=addNode(this.theTable, "thead", "", "");

   // left button (decrement month)
   var leftButtonHolder = addNode(head, "th","", "");
   leftButtonHolder.setAttribute("align", "left");
   var leftButton = new Image();
   leftButton.setAttribute("name", "leftButton");
   leftButton.setAttribute("id", "leftButton");
   leftButton.setAttribute("align", "center");
   leftButton.setAttribute("src", this.btn_images[0]);
   leftButton.setAttribute("onmouseout",  "setImage('leftButton', " + "'" + this.btn_images[0] + "'" + ")");
   leftButton.setAttribute("onmousedown", "setImage('leftButton', " + "'" + this.btn_images[1] + "'" + ")");
   leftButton.setAttribute("onmouseup",   "setImage('leftButton', " + "'" + this.btn_images[0] + "'" + ")");
   leftButton.setAttribute("onclick", "changeView(-7," +  "'" + this.name + "'" + ")");
   leftButtonHolder.appendChild(leftButton);

   // Month and year
   var title = document.createTextNode(g_MonthName[today.getMonth()] + "  " + today.getFullYear());
   var header = addNode(head, "th", "tableHeader", "","");
   header.appendChild(title);
   header.setAttribute("colspan", "3");
   header.setAttribute("align", "center");

   // right button
   var rightButtonHolder = addNode(head, "th","","");
   rightButtonHolder.setAttribute("align", "right");
   var rightButton = new Image();
   rightButton.setAttribute("name", "rightButton");
   rightButton.setAttribute("id", "rightButton");
   rightButton.setAttribute("align", "center");
   rightButton.setAttribute("src", this.btn_images[2]);
   rightButton.setAttribute("onmouseout",  "setImage('rightButton', " + "'" + this.btn_images[2] + "'" + ")");
   rightButton.setAttribute("onmousedown", "setImage('rightButton', " + "'" + this.btn_images[3] + "'" + ")");
   rightButton.setAttribute("onmouseup",   "setImage('rightButton', " + "'" + this.btn_images[2] + "'" + ")");
   rightButton.setAttribute("onclick", "changeView(7, " + "'" + this.name + "'" + ")");
   rightButtonHolder.appendChild(rightButton);
}       


//------------------------------------------------------------------------------------
//
//  Function highLight(text)
//
//  Purpose: Wrap the passed in text with something to make it stand-out. 
//
function highLight(text)
{
   return "<b><em>" + text.fontcolor("RED") + "</em></b>";
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
