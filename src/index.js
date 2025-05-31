import "./styles.css";
import { renderProjectPage, renderProjectCatelogPage } from "./todo-ui";
import { projects } from "./storage"; //DEBUG

// renderProjectCatelogPage(projects);
renderProjectPage(projects[0]);

// TODOs:
//  - event handlers for editing project title and desc in project page. (DONE)
//  - modal for create new project (Done)
//  - modal for create new todo item (Done)
//  - add todo item button in project page (Done)
//  - event hander for sidebar create new project button (Done)
//  - Add event handlers for modal (Done)
//  - event handler to sidebar navBtn (Done)
//  - event handers for titleBtn and project delBtn in project catalog page (Done)
//  - nav button highlight showing current page (Done)
//  - save current page uuid in local storage, start from that page on load (Done)

// const textareas = document.querySelectorAll(".auto-text-area");


// for (let textarea of textareas) {
//     textarea.style.height = "0";
//     textarea.style.height = textarea.scrollHeight + "px";

//     textarea.addEventListener("input", () => {
//     textarea.style.height = "0";
//     textarea.style.height = textarea.scrollHeight + "px";  // Set height to scrollHeight
//     });
// }
