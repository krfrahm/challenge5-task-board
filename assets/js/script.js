const taskNameEl = $('#task-name');
const taskDescriptionEl = $('#task-text');
const dueDateEl = $('#datepicker');
const taskButton = $('.btn btn-primary')
const todoList = document.getElementById('todo-cards')

// const taskList = [];
// Retrieve tasks and nextId from localStorage

let taskList = JSON.parse(localStorage.getItem("taskList"));

// let nextId = JSON.parse(localStorage.getItem("nextId"));



// Todo: create a function to generate a unique task id
function generateTaskId() {
    const taskName = taskNameEl.val().trim();
    const taskDescription = taskDescriptionEl.val().trim(); 
    const taskDate = dueDateEl.val();

    const newTask = {
        id: crypto.randomUUID(),
        name: taskName,
        dueDate: taskDate,
        descrption: taskDescription,
        status:"to-do",
}
localStorage.setItem('newTask', JSON.stringify(newTask));

console.log(newTask)

taskList.push(newTask)
console.log(taskList)
saveTasksToStorage()
renderTaskList()
}

// Todo: create a function to create a task card
function createTaskCard(task) {
   
    
    const taskCard = $('<div>')
     .addClass('card task-card draggable my-3')
     .attr('data-task-id', task.id);
   const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
   const cardBody = $('<div>').addClass('card-body');
   const cardDescription = $('<p>').addClass('card-text').text(task.description);
   const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
   const cardDeleteBtn = $('<button>')
  

   if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

    // ? If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
  }
   cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
   taskCard.append(cardHeader, cardBody);

 return taskCard;
}


// // Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
const tasks = JSON.parse(localStorage.getItem('taskList'))
console.log(tasks)

for (let task of tasks){
     if (task.status === 'to-do') {
       todoList.append(createTaskCard(task));
     } else if (task.status === 'in-progress') {
       inProgressList.append(createTaskCard(task));
     } else if (task.status === 'done') {
       doneList.append(createTaskCard(task));
     }
   }

$('.draggable').draggable({
      opacity: 0.7,
     zIndex: 100,
         // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
   helper: function (e) {
 // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
       const original = $(e.target).hasClass('ui-draggable')
         ? $(e.target)
          : $(e.target).closest('.ui-draggable');
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
         width: original.outerWidth(),
        });
     },
    });
}

// // Todo: create a function to handle adding a new task
// function handleAddTask(event){

// }

// // Todo: create a function to handle deleting a task
// function handleDeleteTask(event){

// }

// // Todo: create a function to handle dropping a task into a new status lane
 function handleDrop(event, ui) {
 }


function saveTasksToStorage() {
     localStorage.setItem('taskList', JSON.stringify(taskList));
     
}

// // Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
// $(document).ready(function () {

// });

