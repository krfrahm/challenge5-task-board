const taskNameEl = $('#task-name');
const taskDescriptionEl = $('#task-text');
const dueDateEl = $('#datepicker');
const taskButton = $('.btn btn-primary')
const todoList = document.getElementById('todo-cards')

const taskList = [];
// Retrieve tasks and nextId from localStorage
function readTaskHistory(){
JSON.parse(localStorage.getItem("taskList"));
}
// let nextId = JSON.parse(localStorage.getItem("nextId"));



// Todo: create a function to generate a unique task id
function generateTaskId() {
    const taskName = taskNameEl.val().trim();
    const taskDescription = taskDescriptionEl.val(); 
    const taskDate = dueDateEl.val();

    const newTask = {
        id: crypto.randomUUID(),
        name: taskName,
        dueDate: taskDate,
        description: taskDescription,
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
   
    
  const taskCard = document.createElement('div');
    taskCard.className ='card task-card draggable my-3';
     taskCard.setAttribute('data-task-id', task.id);
  const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header h4';
    cardHeader.textContent = task.name;
  const cardBody = document.createElement('div');
    cardBody.className = 'card-body'
  const cardDescription = document.createElement('p');
    cardDescription.className = 'card-text';
    cardDescription.textContent = task.description;
  const cardDueDate = document.createElement('p');
    cardDueDate.className = 'card-text';
    cardDueDate.textContent = task.dueDate;
  const cardDeleteBtn = document.createElement('button');
    cardDeleteBtn.className = 'delete bg-warning';
    cardDeleteBtn.textContent= 'delete';

  
  

   if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

    // ? If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.className = 'bg-warning text-white card task-card draggable my-3';
    } else if (now.isAfter(taskDueDate)) {
      taskCard.className= 'bg-danger text-white card task-card draggable my-3';
      cardDeleteBtn.className='border-light';
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

const todoList = $('#todo-cards');
todoList.empty();

const inProgressList = $('#in-progress-cards');
inProgressList.empty();

const doneList = $('#done-cards');
doneList.empty();

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
   helper: function (e) {
       const original = $(e.target).hasClass('ui-draggable')
         ? $(e.target)
          : $(e.target).closest('.ui-draggable');
      return original.clone().css({
         width: original.outerWidth(),
        });
     },
    });
}

// // Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// // Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// // Todo: create a function to handle dropping a task into a new status lane
 function handleDrop(event, ui) {

 }


function saveTasksToStorage() {
     localStorage.setItem('taskList', JSON.stringify(taskList));
     
}

// // Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
 
 });

