import "./styles.css";
import { renderSidebar, renderProjectPage, renderProjectCatelogPage } from "./todo-ui";
import { projects, saveToLocalStorage } from "./storage"; //DEBUG

renderSidebar();

renderProjectCatelogPage(projects);
// renderProjectPage(projects[0]);

// TODOs:
//  - event handlers for editing project title and desc in project page. (DONE)
//  - modal for create new project (Done)
//  - modal for create new todo item (Done)
//  - add todo item button in project page (Done)
//  - event hander for sidebar create new project button (Done)
//  - Add event handlers for modal (Done)
//  - event handler to sidebar navBtn (Done)
//  - event handers for titleBtn and project delBtn in project catalog page (Done)
//  - Move sidebar logic out of todo-ui.js
//  - nav button highlight showing current page



