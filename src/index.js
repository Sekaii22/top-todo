import "./styles.css";
import { TodoItem, Project } from "./todo"; //DEBUG
import { renderSidebar, renderProjectPage, renderProjectCatelogPage } from "./todo-ui";
import { projects, saveToLocalStorage } from "./storage"; //DEBUG

renderSidebar();

renderProjectCatelogPage(projects);
// projects[0].addTodoItem(new TodoItem("item1", "item1 desc", 1, new Date(), true));
// projects[0].addTodoItem(new TodoItem("item2", "item2 desc", 2, new Date()));
// saveToLocalStorage();
// renderProjectPage(projects[0]);

// TESTING LOCAL STORAGE
// let test = new Project("some title 1", "testing local storage 1");
// test.addTodoItem(new TodoItem("item1", "item1 desc", 1, new Date()));
// test.addTodoItem(new TodoItem("item2", "item2 desc", 2, new Date()));
// console.log(test);

// let test2 = new Project("some title 2", "testing local storage 2");
// test2.addTodoItem(new TodoItem("some item1", "some item1 desc", 1, new Date()));
// console.log(test2);

// localStorage.setItem("test", JSON.stringify([test, test2]));

// let arr = JSON.parse(localStorage.getItem("test"));
// // reformProject(test2);
// for (let proj of arr) {
//     reformProject(proj);
// }

// console.log(arr);

// TODOs:
//  - event handlers for editing project title and desc in project page. (DONE)
//  - modal for create new project (Done)
//  - modal for create new todo item (Done)
//  - add todo item button in project page (Done)
//  - Add event handlers for modal (Done)
//  - event handler to sidebar navBtn
//  - event handers for titleBtn and project delBtn in project catalog page.
//  - event hander for sidebar create new project button



