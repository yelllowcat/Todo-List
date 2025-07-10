import { addList, addTodo, deleteTask, deleteProyect } from "./logic.js";
import { getCount } from "./logic.js";
import { populateStorage, myLists } from "./localStorage.js";
import { selectProyect } from "./logic.js";
import odinImage from "./icons/panel-left.png";
import rabbitImage from "./icons/rabbitBook.jpg";
import trashCan from "./icons/trash.png";

import { format } from "date-fns";

const body = document.querySelector("body");

const main = document.querySelector(".main");
const h1Title = document.querySelector("h1");
const content = document.querySelector(".content");
const container = document.querySelector(".container");
const proyects = document.querySelector(".proyects");

const dialog = document.querySelector(".dialogTask");

const newTask = document.querySelector(".addTask");
const newTaskAside = document.querySelector(".divTask");
const titleTask = document.querySelector(".titleTask");
const description = document.querySelector(".description");
const inputDate = document.querySelector(".inputDate");

const priority = document.querySelector("#priority");
const proOptions = document.querySelector("#proOptions");

const optionBtn = document.querySelector("#colorOptions");

const closeButton = document.querySelector(".cancelTask");
const submitButton = document.querySelector(".submit");

const inputTitle = document.querySelector(".title");
const nameField = document.querySelector(".nameField");
const inputNumber = document.querySelector(".number");

const dialogPro = document.querySelector(".dialogProyect");
const closeProButton = document.querySelector(".cancelPro");
const submitProButton = document.querySelector(".submitPro");
const list = document.querySelector(".list");

const aside = document.querySelector("aside");
const asideBtn = document.querySelector(".asideBtn");
const divToday = document.querySelector(".today");
const divCompleted = document.querySelector(".completed");
const userInfo = document.querySelector(".userInfo");
const username = document.querySelector(".username");
const trashDOM = document.querySelector(".trash");

export function domLogic() {
  selectProyectDom();
  toggleAside();
  user();
  displayStored();
  trashDOM.addEventListener("click", () => {
    deleteProyect("Default");
    trashDOM.parentNode.remove();
    localStorage.setItem("lists", JSON.stringify(myLists));
  });
  divToday.addEventListener("click", renderToday);
  divCompleted.addEventListener("click", renderCompleted);
  //tasks
  newTask.addEventListener("click", () => {
    dialog.showModal();
  });
  newTaskAside.addEventListener("click", () => {
    dialog.showModal();
  });
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (titleTask.value != "") {
      addTodo(
        proOptions.value,
        titleTask.value,
        description.value,
        inputDate.value,
        priority.value
      );
      const currentProyect = selectProyect(h1Title.textContent);
      if (h1Title.textContent == "Today") {
        renderToday();
      } else {
        renderProyect(currentProyect);
      }

      currentProyect;
      titleTask.value = "";
      description.value = "";
      inputDate.value = "";
      console.log("tesys");
      console.log(myLists);
      populateStorage();

      dialog.close();
    }
  });

  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  //proyects
  const addIcon = document.querySelector(".add");
  addIcon.addEventListener("click", () => {
    dialogPro.showModal();
  });
  submitProButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (!proyectExist(nameField.value)) {
      addList(nameField.value);
      const proyectLi = document.createElement("li");
      proyectLi.id = nameField.value;
      const hash = document.createElement("span");
      hash.textContent = "#";
      hash.classList.add("hash");
      const spanProName = document.createElement("span");
      spanProName.classList.add("spanName");
      spanProName.textContent = nameField.value;
      const trash = document.createElement("img");

      trash.src = trashCan;
      trash.classList.add("trash");

      proyectLi.appendChild(hash);
      proyectLi.appendChild(spanProName);
      proyectLi.appendChild(trash);

      list.appendChild(proyectLi);
      selectProyectDom();

      const option = document.createElement("option");

      option.value = nameField.value;
      option.textContent = nameField.value;
      proOptions.appendChild(option);

      const currentProyect = selectProyect(nameField.value);
      trash.addEventListener("click", () => {
        deleteProyect(trash.parentNode.id);
        trash.parentNode.remove();
      });
      renderProyect(currentProyect);
      h1Title.textContent = nameField.value;
      nameField.value = "";
      populateStorage();

      dialogPro.close();
    }
  });

  closeProButton.addEventListener("click", () => {
    dialogPro.close();
  });

  function selectProyectDom() {
    list.childNodes.forEach((element) => {
      element.addEventListener("click", () => {
        const currentProyect = selectProyect(element.id);

        renderProyect(currentProyect);
        h1Title.textContent = element.id;
      });
    });
  }

  function renderProyect(proyect) {
    localStorage.setItem("lists", JSON.stringify(myLists));

    console.log("test");
    console.log(proyect);
    content.children[0].remove();
    const container = document.createElement("div");
    container.classList.add("container");
    const proyectList = document.createElement("ul");
    for (const key in proyect) {
      if (Object.prototype.hasOwnProperty.call(proyect, key)) {
        const element = proyect[key];
        if (element.completed == false) {
          const proyectLi = document.createElement("li");
          proyectLi.classList.add("tasks");

          const check = document.createElement("input");
          check.type = "checkbox";
          proyectLi.id = element.title;
          check.addEventListener("click", () => {
            element.completed = true;
          });
          const task = document.createElement("div");
          task.classList.add("divTasks");
          task.textContent = element.title;
          const taskDescription = document.createElement("div");
          taskDescription.textContent = element.description;

          const delBtn = document.createElement("button");
          delBtn.textContent = "delete";
          delBtn.classList.add("delBtn");
          delBtn.addEventListener("click", () => {
            deleteTask(proyect, element.title);
            renderProyect(proyect);
          });
          proyectLi.appendChild(check);
          proyectLi.appendChild(task);
          proyectLi.appendChild(delBtn);
          task.appendChild(taskDescription);
          proyectList.appendChild(proyectLi);
        }
      }
    }
    const addProyectTask = document.createElement("button");
    addProyectTask.classList.add("addTask");
    addProyectTask.textContent = "Add task";
    addProyectTask.addEventListener("click", () => {
      dialog.showModal();
    });
    if (proyectList.hasChildNodes() == false) {
      const rabbit = document.createElement("img");
      rabbit.classList.add("rabbit");
      rabbit.src = rabbitImage;
      container.appendChild(rabbit);
      const advice = document.createElement("h2");
      advice.textContent = "No tasks yet";
      container.appendChild(advice);
    }
    container.appendChild(proyectList);
    container.appendChild(addProyectTask);
    content.appendChild(container);
    proOptions.value = h1Title.textContent;
  }

  function renderToday() {
    content.children[0].remove();
    h1Title.textContent = "Today";
    const container = document.createElement("div");
    container.classList.add("container");
    const proyectList = document.createElement("ul");
    content.appendChild(container);
    for (const key in myLists) {
      if (Object.prototype.hasOwnProperty.call(myLists, key)) {
        const element = myLists[key];
        for (const key in element) {
          const thisElement = element[key];
          // if (element.completed == false) {
          if (thisElement.dueDate == format(new Date(), "MM/dd/yyyy")) {
            const proyectLi = document.createElement("li");
            proyectLi.classList.add("tasks");

            const check = document.createElement("input");
            check.type = "checkbox";
            const task = document.createElement("div");

            task.textContent = thisElement.title; //add checkbutton and decription
            const taskDescription = document.createElement("div");
            taskDescription.textContent = thisElement.description;
            proyectLi.appendChild(check);
            proyectLi.appendChild(task);
            proyectLi.appendChild(taskDescription);
            proyectList.appendChild(proyectLi);
          }
          // }
        }
      }
    }
    if (proyectList.hasChildNodes() == false) {
      const rabbit = document.createElement("img");
      rabbit.classList.add("rabbit");
      rabbit.src = rabbitImage;
      container.appendChild(rabbit);
      const advice = document.createElement("h2");
      advice.textContent = "No tasks for today";
      container.appendChild(advice);
    }

    container.appendChild(proyectList);
  }

  function renderCompleted(params) {
    content.children[0].remove();
    h1Title.textContent = "Completed";
    const container = document.createElement("div");
    container.classList.add("container");
    const proyectList = document.createElement("ul");
    content.appendChild(container);
    for (const key in myLists) {
      if (Object.prototype.hasOwnProperty.call(myLists, key)) {
        const element = myLists[key];
        for (const key in element) {
          const thisElement = element[key];
          if (thisElement.completed == true) {
            const proyectLi = document.createElement("li");
            proyectLi.classList.add("tasks");

            const check = document.createElement("input");
            check.type = "checkbox";
            const task = document.createElement("div");

            task.textContent = thisElement.title; //add checkbutton and decription
            const taskDescription = document.createElement("div");
            taskDescription.textContent = thisElement.description;
            proyectLi.appendChild(task);
            proyectLi.appendChild(taskDescription);
            proyectList.appendChild(proyectLi);
          }
        }
      }
    }
    if (proyectList.hasChildNodes() == false) {
      const rabbit = document.createElement("img");
      rabbit.classList.add("rabbit");
      rabbit.src = rabbitImage;
      container.appendChild(rabbit);
      const advice = document.createElement("h2");
      advice.textContent = "No tasks completed yet";
      container.appendChild(advice);
    }
    container.appendChild(proyectList);
  }
  function proyectExist(name) {
    let exist = false;
    const childs = Array.from(list.childNodes).filter(
      (node) => node.nodeType === Node.ELEMENT_NODE
    );
    childs.forEach((element) => {
      if (element.querySelector(".spanName").textContent == name) {
        exist = true;
      }
    });
    return exist;
  }
  function toggleAside() {
    let active = true;
    asideBtn.addEventListener("click", () => {
      if (active) {
        aside.style.display = "none";
        const newBtn = document.createElement("img");
        newBtn.src = odinImage;
        body.insertBefore(newBtn, main);
        newBtn.addEventListener("click", () => {
          newBtn.remove();
          aside.style.display = "flex";
        });
      }
    });
  }
  function user(params) {
    userInfo.addEventListener("click", () => {
      username.textContent = prompt("Select Name: ");
    });
  }

  function displayStored() {
    for (const key in myLists) {
      if (!proyectExist(key)) {
        addList(key);
        const proyectLi = document.createElement("li");
        proyectLi.id = key;
        const hash = document.createElement("span");
        hash.textContent = "#";
        hash.classList.add("hash");
        const spanProName = document.createElement("span");
        spanProName.classList.add("spanName");
        spanProName.textContent = key;
        const trash = document.createElement("img");

        trash.src = trashCan;
        trash.classList.add("trash");

        proyectLi.appendChild(hash);
        proyectLi.appendChild(spanProName);
        proyectLi.appendChild(trash);

        list.appendChild(proyectLi);
        selectProyectDom();

        const option = document.createElement("option");

        option.value = key;
        option.textContent = key;
        proOptions.appendChild(option);

        const currentProyect = selectProyect(key);
        trash.addEventListener("click", () => {
          deleteProyect(trash.parentNode.id);
          trash.parentNode.remove();
        });
        renderProyect(currentProyect);
        console.log("test3");
        console.log(currentProyect);
        h1Title.textContent = key;
        populateStorage();
      }
    }
  }
}
