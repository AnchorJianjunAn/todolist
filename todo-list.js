let todoList = [];

function addTodoItem(task) {
  const todoItem = {
    task,
    done:false,
    id: Date.now()
  };

  todoList.push(todoItem);
  refreshTodoList(todoItem);

  saveLocalStorage();
}

function refreshTodoList(todoItem) {
  const ul = document.querySelector("#todo-list");

  if (todoItem.deleted) {
    oldItem.remove();
    return;
  }

  const li = document.createElement("li");
  const oldItem = document.querySelector(`[data-id="${todoItem.id}"]`);
  const isDone = todoItem.done ? "done" : "";
  li.setAttribute("data-id", todoItem.id);
  li.setAttribute("class",`todo-item ${isDone}`);
  li.innerHTML = `<lable for="${todoItem.id}" class="tick"></lable>
  <input type="checkbox" id="${todoItem.id}">
  <span>${todoItem.task}</span>
  <button class="delete"><img src="images/Remove-icon.png"></button>`;

  if(oldItem) {
    ul.replaceChild(li, oldItem);
  } else {
    ul.insertBefore(li, ul.firstElementChild);
  }
}

function toggleDone(id) {
  const index = todoList.findIndex(todoItem => todoItem.id ===Number(id)
  );

  todoList[index].done = !todoList[index].done;
  refreshTodoList(todoList[index]);

  saveLocalStorage();
}

function deleteTodoItem(id) {
  const index = todoList.findIndex(todoItem => todoItem.id === Number(id));
  todoList[index].deleted = true;
  refreshTodoList(todoList[index]);
  todoList = todoList.filter(todoItem => todoItem.id !== Number(id));

  saveLocalStorage();
}

function saveLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todoList));
}

const form = document.querySelector ("#todo-form");

form.addEventListener("submit", event => {
  event.preventDefault();
  const input=document.querySelector("#todo-input");
  const task=input.value.trim();
 
 if(task !==""){
   addTodoItem(task);
   input.value = "";
 }else{
  alert("please enter an item");
 }
  
});

const ul = document.querySelector("#todo-list");
ul.addEventListener("click", event =>{
  console.log(event.target);
  const id = event.target.parentElement.dataset.id;
  if(event.target.classList.contains("tick")){
    toggleDone(id);
  } else if (event.target.classList.contains("delete")) {
   console.log(`Delete ID = ${id}`);
   deleteTodoItem(id);
   console.log(todoList);
  }});

  document.addEventListener("DOMContentLoaded", () => {
    const todoListSring = localStorage.getItem("todo-list");

    if(todoListString) {
      todoList = JSON.parse(todoListString);
      for (let i = 0; i < todoList.length; i++) {
        refreshTodoList(todoList[i]);
      }
    }
  })