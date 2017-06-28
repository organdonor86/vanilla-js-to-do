


// 1. Overlay with Inputs to add new task when new task button clicked

var $overlay = $('<div id="overlay"></div>');
var $modal = $('<div class="wrap"><span class="modal"><table><tr class="editMode"><td><input class="description" id="taskInput" maxlength="30" /></td><td><button class="saveBtn" id="saveNew">Add Task</button><button id="cancelBtn">Cancel</button></td></tr></table></span></div>');
// var $textInput = $("<img>");
// var $caption = $("<p><a href='#'>close</a></p>");

// Append img and close link to container
$overlay.append($modal);



// Append Overlay to Body Element
$("body").append($overlay);


// 1.0 - Capture click event on link to an image
$("#addBtn").click(function(event) {
  console.log('add button clicked');
  // Prevents default behaviour for that event (following link)
  event.preventDefault();  
  // Selet caption object we created higher up
  // $caption.text(captionText);
  // Show Overlay on click
  $overlay.fadeIn(200);
});

$("#cancelBtn").click(function(event) {
  console.log('cancel button clicked');
  // Prevents default behaviour for that event (following link)
  event.preventDefault();
  // Selet caption object we created higher up
  // $caption.text(captionText);
  // Show Overlay on click
  $overlay.fadeOut(200);
});








//////////////////////////////////
///////////// fading /////////////
//////////////////////////////////


// $(document).ready(function(){
// /*! Fades in page on load */
// // $('body').css('display', 'none');
// // $('.site-logo').fadeIn(300);
// $('.top-bar-right').delay(200).fadeTo(50, 1);
// $('.hero').delay(200).fadeTo(200, 1);
// $('.hero-content').delay(200).fadeTo(200, 1);
//
// $('.hero-h1').delay(600).fadeTo(400, 1);
// $('.main-section').delay(600).fadeTo(400, 1);
// });





/*

document.getElementById('element-id')  -  Gets whole html element eg <div id="xxxxxx"></div>

document.querySelector('button.edit') - gets button with class .delete

*/



// 1. Plan program literally/pseudocode. PROBLEM PLAN PERFORM PERFECT.

// 2. Split stages of program into sensible functions

// 3. Create some sensible variables to target dom elements to be used and manipulated



/**********************

  DECLARE VARIABLES
  
**********************/




var taskInput = document.querySelector('#taskInput');  // New task

// This method reutrns collection of elements as a nodelist object. access each element with index like array.
var addBtn = document.querySelector('#saveNew'); // Add button on overlay

var completedTasksHolder = document.getElementById('compTasks');
var incompleteTasksHolder = document.getElementById('incTasks');

// var completedTasksHolder = compTable.querySelectorAll('tr'); // Completed tasks list 
// var incompleteTasksHolder = incTable.querySelectorAll('tr'); // Incomplete tasks list





/**********************

  CREATE FUNCTIONS
  
**********************/





////////////////////////////////////////////////////
/////////// CREATE NEW TASK ELEMENT ////////////////
////////////////////////////////////////////////////

var createNewTaskElement = function (taskTextString) {
  
  // Create row
  var row = document.createElement('tr');  

  // Create cells
  var column1 = document.createElement('td'); 
  var column2 = document.createElement('td');
  var column3 = document.createElement('td');
  var column4 = document.createElement('td'); 
  

  // Create checkbox
  var checkBox = document.createElement('input');
  // Add types/classes etc - dot notation to access element properties. (style, href, type etc)
  checkBox.type = "checkbox";
  // Append to cell
  column1.appendChild(checkBox);


  // Create label (Text from input)
  var label = document.createElement('label');
  // Add text to label element
  label.innerText = taskTextString;
  // Text input too for editing task name
  var editInput = document.createElement('input');
  // Specify that text input has a type of text
  editInput.setAttribute("type", "text");
  editInput.setAttribute("class", "description");
  editInput.setAttribute("maxlength", 30); 
  // Append to cell
  column2.appendChild(label);
  column2.appendChild(editInput);


  // Edit <button class="edit">Edit</button>
  var editButton = document.createElement('button');
  // Delete <button class="delete">Delete</button> 
  var deleteButton = document.createElement('button');
  // Add text to buttons and relevant classes
  editButton.innerText = "Edit";
  editButton.className = "editBtn";
  deleteButton.innerText = "Delete";
  deleteButton.className = "deleteBtn";  
  // Append to cell
  column3.appendChild(editButton);
  column3.appendChild(deleteButton);
    

  // Append each cell to row   
  row.appendChild(column1);
  row.appendChild(column2);
  row.appendChild(column3);  

  return row;
}




////////////////////////////////////////////////////
///////////////////ADD A NEW TASK //////////////////
////////////////////////////////////////////////////

var addTask = function() {
  
  console.log('Add task....');
  
  // if there is text in input field then add a task
  
  var inputContainsText = taskInput.value;
  
  console.log(inputContainsText);
  
  // Create a new task li with text from #new-task   
  var taskRow = createNewTaskElement(taskInput.value);
  
  // Append list item to ul for incomplete tasks
  
  completedTasksHolder.appendChild(taskRow);
  
    // Bind event handlers
  bindTaskEvents(taskRow, completeTask);
  bindTaskEvents(taskRow, editTask);

  // Fade out overlay
  $overlay.fadeOut(200);  
  
  }


////////////////////////////////////////////////////
////////////////// EDIT A TASK /////////////////////
////////////////////////////////////////////////////


var editTask = function() {
  console.log('Edit task....');
    
  // Get <li> element to be modified
  var row = this.parentNode.parentNode;  
  
  // Get inner elements to be modified
  var editInput = row.querySelector("input[type=text");
  var label = row.querySelector("label");
  var button = row.querySelector("button.editBtn");
  
  // If the parent has the class of .editmode
  
  // Store precence of class as boolean  
  var containsClass = row.classList.contains("editMode");
  
  if(containsClass) {
    // Switch from editmode
    // Inpout value goes into label text
    label.innerText = editInput.value;
    button.innerText = "Edit"; 
  } else {
    // Switch to editmode
    // Label text goes into input value
    editInput.value = label.innerText; 
    
    // Change button text to "save"
    button.innerText = "Save"; 
  }
  
  // Toggle editmode class
    listItem.classList.toggle("editMode");
  
  }
     
  
    // if parent li has editmode class
      // Text inpt becomes label
      // Switch from editmode class
    // If parent list item not have editmode class
      // Label text becomes input property value
      // add editmode class




// Delete task

var deleteTask = function() {
  console.log('Delete task....');

  // delete/remove parent of button (li) from the ul.
  
  // Get <li> element - call parentnode method on 'this' as its the button that's been clicked
  var cell = this.parentNode;
  var row = cell.parentNode;
  var table = row.parentNode;
  table.removeChild(row);
  
}


// Mark task as complete

var completeTask = function() {
  console.log('Task complete....');
  
  // Get parent element of button that's been clicked as it's the <li> we want to move to the other list  
  var listItem = this.parentNode.parentNode;
  
  // Append task list item to completedTaskList ul element
  completedTasksHolder.appendChild(listItem);
  
  // Need to bind different event handler to checkbox now so we can switch back to incomplete.
  bindTaskEvents(listItem, incompleteTask);
    
}


// Mark task as incomplete

var incompleteTask = function() {
  console.log('Task incomplete....');

  // Get parent element of button that's been clicked as it's the <li> we want to move to the other list
  var listItem = this.parentNode.parentNode;
  
  // Append task list item to incompleteTaskList ul element
  incompleteTasksHolder.appendChild(listItem);
  
  // Need to bind different event handler to checkbox now so we can switch back to complete.
  bindTaskEvents(listItem, completeTask);
  
}


// Pass in task row <tr> and bind all event handlers to relevant child elements

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');
    // Select task list item's children

  // for (i = 0; i < taskListItem.length)  
  var checkbox = taskListItem.querySelector('input[type=checkbox]');
  var editButton = taskListItem.querySelector('.editBtn');
  var deleteButton = taskListItem.querySelector('.deleteBtn');
  

  checkbox.onchange = checkBoxEventHandler;
  // Bind the edit task to the edit button
  editButton.onclick = editTask;
  
  // Bind delete task to the delete button
  deleteButton.onclick = deleteTask;
  
  
  // We use different event here as checkbox can be triggered with spacebar....  
  // Bind task checkbox event handler to the checkbox
  
}


/*****************************

  DO ALL THE STUFF

*****************************/


/*   Bind all event handlers to elements on the page*/

  // Bind addTask event handler to add task button

    //Don't call function like addTask() unless you want it to be called straight away
    // Use var functionName = function(){} like above. The onclick method = function reference. See global event handlers.onclick on MDN



//  addButton.onclick = addTask; - this would be overridden






addBtn.addEventListener("click", addTask);



// Function to cycle over li items in incomplete task list
// Trigger bind eventhandler function on each li 

// .children method - parentNode.children, returns a live html collection of the child elements of the node.


for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], completeTask);         
}


// Function to cycle over li items in incomplete task list
// Trigger bind eventhandler function on each li 

// for(var i = 0; i < completedTasksHolder.length; i++) {
//   bindTaskEvents(completedTasksHolder[i], incompleteTask);  
  
// }
    
