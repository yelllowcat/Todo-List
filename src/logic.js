export const myLists = {
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

export function addList(name) {
  myLists[name] = {};
}
addList("si");

export function addTodo(name, title, description, dueDate, priority) {
  console.log(myLists[name]);
  if (myLists[name]) {
    let id = crypto.randomUUID();
    const currentDate = new Date();
    const todo = new TodoItem(id, title, description, currentDate, priority);
    myLists[name][title] = todo;
  }
}
addTodo("si", "new", "no", "si", "no");
addTodo("si", "2", "no", "si", "no");
addTodo("si", "4", "no", "si", "no");

console.log(myLists);

export function selectProyect(name) {
  let currentProyect;

  currentProyect = myLists[name];
  return currentProyect;
}

export function getCount(title) {
  console.log(title);
  return Object.keys(myLists[title]).length;
}
