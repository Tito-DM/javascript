// Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//load all event listeners

loadEventListeners();

//DOMLoad Evnet

document.addEventListener('DOMContentLoaded', getTasks)


function loadEventListeners(){
  form.addEventListener('submit', addTask);
  //Remove task event
  taskList.addEventListener('click',removeTask);
  //clear Task events
  clearBtn.addEventListener('click', ClearTasks);
  //filter tasks events
  filter.addEventListener('keyup', filterTask)
}

//get task from local Storage

function getTasks(){
  let tasks;

  if (localStorage.getItem('task') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('task'));
  }

  tasks.forEach(function (task) {
    //create li Element
    const li = document.createElement('li');

    // add a class
    li.className = 'collection-item'
    //create a text node and append to li

    li.appendChild(document.createTextNode(task));

    //create a link alement

    const link = document.createElement('a');
    //add aclass

    link.className = 'delete-item secondary-content';
    //add icon
    link.innerHTML = '<i class= "fa fa-remove"></i>'
    //append to link

    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

  })
}

//Add Task
function addTask(e){

  if (taskInput.value === ""){
    alert("Add a task");
  }

  //create li Element
  const li = document.createElement('li');

  // add a class
  li.className = 'collection-item'
  //create a text node and append to li

  li.appendChild(document.createTextNode(taskInput.value));

  //create a link alement

  const link = document.createElement('a');
  //add aclass

  link.className = 'delete-item secondary-content';
  //add icon
  link.innerHTML = '<i class= "fa fa-remove"></i>'
  //append to link

  li.appendChild(link);

  //append li to ul
  taskList.appendChild(li);

//Store in local storage
storeTaskInLocalStorage(taskInput.value);



 // clear inpu

 taskInput.value = " ";


  e.preventDefault();

}

function storeTaskInLocalStorage(task){

let tasks;

if (localStorage.getItem('task') === null){
  tasks = [];
}else{
   tasks = JSON.parse(localStorage.getItem('task'));
}

tasks.push(task);

localStorage.setItem('task', JSON.stringify(tasks));
}

function removeTask(e) {

  if (e.target.parentElement.classList.contains('delete-item')){
    
    if(confirm('Are u sure?')){
      e.target.parentElement.parentElement.remove();

      // remove from loacal storage
      removeTaskFromLoacalStorage(e.target.parentElement.parentElement);
    }

  }
  
}
   // remove from loacal storage
function removeTaskFromLoacalStorage(taskItem) {
  let tasks;

  if (localStorage.getItem('task') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('task'));
  }

  tasks.forEach(function(task, index) {

    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }

    localStorage.setItem('task', JSON.stringify(tasks))
    
  })
  
}


function ClearTasks(){

  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  //clear from local storage
  localStorage.clear();
}

function filterTask(e){

  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1)
      task.style.display = 'block';
    else{
      task.style.display = 'none'
    }
    
  })

}