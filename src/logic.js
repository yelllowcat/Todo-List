import { format } from "date-fns";
import { da } from "date-fns/locale";
import { myLists } from "./localStorage";
const { isValid } = require("date-fns");

class TodoItem {
  constructor(id, title, description, dueDate, priority, completed) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }
}

export function addList(name) {
  myLists[name] = {};
}

export function addTodo(
  name = "Default",
  title,
  description,
  date = format(new Date(), "MM/dd/yyyy"),
  priority,
  completed = false
) {
  //console.log(myLists[name]);
  if (myLists[name]) {
    let id = crypto.randomUUID();
    if (date == "") {
      date = format(new Date(), "MM/dd/yyyy");
    }
    const todo = new TodoItem(
      id,
      title,
      description,
      date,
      priority,
      completed
    );
    myLists[name][title] = todo;
  }
}

addTodo(
  "Default",
  "new",
  "2121",
  format(new Date(2014, 1, 11), "MM/dd/yyyy"),
  "no"
);
/*addTodo(
  "Default",
  "2",
  "212",
  format(new Date(2003, 3, 10), "MM/dd/yyyy"),
  "no"
);
addTodo(
  "Default",
  "4",
  "2112",
  format(new Date(2024, 4, 4), "MM/dd/yyyy"),
  "no"
);*/

//console.log(myLists);

export function selectProyect(name) {
  let currentProyect;

  currentProyect = myLists[name];
  return currentProyect;
}

export function getCount(title) {
  // console.log(title);
  return Object.keys(myLists[title]).length;
}

export function deleteTask(proyect, task) {
  delete proyect[task];
}
export function deleteProyect(proyect) {
  console.log(proyect);
  delete myLists[proyect];
}
