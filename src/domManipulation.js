export function createUI() {}

export const main = document.querySelector(".main");

export function createForm() {
  const div = document.createElement("div");
  div.style.height = "20vh";
  div.style.width = "60vw";
  div.style.border = "1px solid black";
  main.appendChild(div);
}
