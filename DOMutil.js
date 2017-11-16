//------------------------------------------------------------------
// 
//  Utilities for working with the DOM.
//
//------------------------------------------------------------------
//----------------------------------------------------------------
// 
//  addnode
//
//  Author:     Elaine Haight
//  Purpose:    Creates a new node given an existing DOM node
//  Parameters: parent  -- an existing DOM node 
//              element -- type of node to create (e.g. "button")
//              nameId  -- value for the name tag of the node
//              text    -- (optional)
//
// Returns:   the new node
// Notes:     Adapted From page 48 of Crane and Pascarello.

function addNode(parent, element, nameId, text, styleClass)
{   
    var newNode = document.createElement(element);
    parent.appendChild(newNode);
    newNode.setAttribute("id", nameId);
    newNode.setAttribute("name", nameId);
	newNode.setAttribute("class", styleClass);
    if (text != "")
    {
        var textNode = document.createTextNode(text);
        newNode.appendChild(textNode);
    }
    return newNode;
}

function addFormNode(parent, element, type, nameId, text)
{   
    var newNode = document.createElement(element);
    newNode.setAttribute("type", type);
    newNode.setAttribute("id", nameId);
    newNode.setAttribute("name", nameId);
    newNode.setAttribute("value", text);
    if (text != "")
    {
        var textNode = document.createTextNode(text);
        newNode.appendChild(textNode);
    }
    parent.appendChild(newNode);
    return newNode;
}

//----------------------------------------------------------------
// 
//  findnode
//
//  Author:     Elaine Haight
//  Purpose:    Finds a node with a given tag type
//  Parameters: tree       -- the XML tree 
//              tabName    -- type of nodes to be checked 
//              attribute  -- attribute to compare value against
//              value      -- comparison value
//
//  Return:     The node if found, null otherwise
//
function findNode (tree, tagName, attribute, value)
{   
    var targetNode = null;
    var nodeArray = tree.getElementsByTagName(tagName);

    // find the first node in nodeArray with attribute == value

    for (i = 0; i < nodeArray.length && targetNode==null; ++i)
    {
         if (nodeArray[i].getAttribute(attribute) == value)
         { 
            targetNode = nodeArray[i];
         }
    }
    return targetNode;
}

//------------------------------------------------------------------------------------
//
//  Function clearNode()
//
//  Purpose: Remove all of the child nodes of a given DOM element
//
function clearNode(parent)
{
   while (parent.hasChildNodes())
   {
       parent.removeChild(parent.firstChild);
   }
}

//---------------------------------------------------------------
//
//  getValue
//
//  Purpose:     shorthand for document.GetElementById("foo").value
//  Parameters:  nodeId -- the name of the element (e.g. "foo").
//
function getValue(nodeID)
{
   return document.getElementById(nodeID).value;
}


//---------------------------------------------------------------
//
//  setValue
//
//  Purpose:     shorthand for document.GetElementById("foo").value = value;
//  Parameters:  nodeId -- the name of the element to set(e.g. "foo").
//               value  -- new value for the object
//
function setValue(nodeID, value)
{
   var node = document.getElementById(nodeID);
   node.value = value;  
}

//--------------------------------------------------------------------------------
//
// randInt -- 
// Description: Returns a pseudo-random integer given a lower bound and a range.
// Implementation taken from course (Foothill CIS70a) notes
//

function randInt(lower, size)
{
    return Math.floor(lower + size*Math.random() );
}