import { addList } from "./logic.js";
import { getCount } from "./logic.js";
import { myLists } from "./logic.js";
import { selectProyect } from "./logic.js";

const h1Title = document.querySelector("h1");
const content = document.querySelector(".content");
const container = document.querySelector(".container");
const proyects = document.querySelector(".proyects");

const dialog = document.querySelector(".dialogTask");

const newButton = document.querySelector(".addTask");
const closeButton = document.querySelector(".cancelTask");
const submitButton = document.querySelector(".submit");

const inputTitle = document.querySelector(".title");
const nameField = document.querySelector(".nameField");
const inputNumber = document.querySelector(".number");

const dialogPro = document.querySelector(".dialogProyect");
const closeProButton = document.querySelector(".cancelPro");
const submitProButton = document.querySelector(".submitPro");
const list = document.querySelector(".list");

export function domLogic() {
  newButton.addEventListener("click", () => {
    dialog.showModal();
  });
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close(inputTitle.value);
  });
  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  const addIcon = document.querySelector(".add");
  addIcon.addEventListener("click", () => {
    dialogPro.showModal();
  });
  submitProButton.addEventListener("click", (event) => {
    event.preventDefault();
    addList(nameField.value);
    const proyectLi = document.createElement("li");
    proyectLi.id = nameField.value;
    const hash = document.createElement("span");
    hash.textContent = "#";
    hash.classList.add("hash");
    const spanProName = document.createElement("span");
    spanProName.textContent = nameField.value;
    const numberTasks = document.createElement("span");
    numberTasks.textContent = getCount(nameField.value);
    proyectLi.appendChild(hash);
    proyectLi.appendChild(spanProName);
    proyectLi.appendChild(numberTasks);
    list.appendChild(proyectLi);
    dialogPro.close(nameField.value);
  });
  closeProButton.addEventListener("click", () => {
    dialogPro.close();
  });
  console.log(list.childNodes);

  function selectProyectDom() {
    list.childNodes.forEach((element) => {
      element.addEventListener("click", () => {
        selectProyect(element.id);
        h1Title.textContent = element.id;
        console.log(content.firstChild);
        content.remove(container);
      });
    });
  }
  selectProyectDom();

  function renderProyect(proyect) {
    const container = document.createElement("div");
    array.forEach((element) => {});
  }
}
