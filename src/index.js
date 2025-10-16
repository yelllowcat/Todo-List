import "./styles.css";
import { domLogic } from "./domManipulation.js";
import { getCount } from "./logic.js";
import {
  storageAvailable,
  display,
  myLists,
  setLists,
} from "./localStorage.js";

// Initialize localStorage first
display();
// Then initialize DOM
domLogic();
