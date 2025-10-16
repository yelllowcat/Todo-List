export let myLists = {
  Default: {},
};

export let auxList;

export function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

if (storageAvailable("localStorage")) {
  console.log("// Yippee! We can use localStorage awesomeness");
} else {
  // Too bad, n
  // o localStorage for us
}
export function display() {
  if (!localStorage.getItem("lists")) {
    populateStorage();
  } else {
    console.log("exist");
    setLists();
  }
}
export function populateStorage() {
  localStorage.setItem("lists", JSON.stringify(myLists));
  console.log(JSON.parse(localStorage.getItem("lists")));
  setLists();
}
export function setLists() {
  console.log(localStorage.getItem("lists"));
  const storedLists = localStorage.getItem("lists");
  
  if (storedLists) {
    try {
      let currentList = JSON.parse(storedLists);
      
      console.log("currentList");
      console.log(JSON.stringify(currentList, null, 2));
      console.log(currentList);
      
      // Update myLists properties instead of reassigning
      if (currentList && typeof currentList === 'object') {
        Object.keys(myLists).forEach(key => delete myLists[key]);
        Object.assign(myLists, currentList);
      }
    } catch (e) {
      console.error("Error parsing localStorage:", e);
      // If parsing fails, initialize with default
      populateStorage();
    }
  }
}
