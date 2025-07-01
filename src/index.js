import "./styles.css";
import { createForm } from "./domManipulation.js";
const myLists = {
  default: {},
};

class TodoItem {
  constructor(id, title, description, dueDate, priority) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

function addList(name) {
  myLists[name] = {};
}
addList("si");

function addTodo(title, description, dueDate, priority) {
  let id = crypto.randomUUID();
  const currentDate = new Date();
  const todo = new TodoItem(id, title, description, currentDate, priority);
  myLists.default[0] = todo;
}
addTodo("si", "no", "si", "no");
console.log(myLists);

function selectProyect(name) {
  let currentProyect;

  currentProyect = myLists[name];
  return currentProyect;
}
const addIcon = document.querySelector(".add");
addIcon.addEventListener("click", () => {
  createForm();
  addList("New List");
  console.log(myLists);
});
const proyects = document.querySelector(".proyects");

proyects.textContent = selectProyect("default")[0].description;
