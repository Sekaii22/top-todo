import "./styles.css";
import { TodoItem, Project, reformProject } from "./todo";
import { updateSidebar, renderProjectCatelogPage } from "./todo-ui";

const sidebarBtn = document.querySelector(".sidebar-btn");
const content = document.querySelector("#content");
const sidebar = document.querySelector("#sidebar");

// get from local storage
let projects = localStorage.getItem("projects");
if (projects === null) {
    projects = [new Project("Default", "Default project."), new Project("School work", "Project for school work.")];
    localStorage.setItem("projects", JSON.stringify(projects));
}
else {
    projects = JSON.parse(projects);
}

// reform obj and update sidebar
for (let proj of projects) {
    reformProject(proj);
    updateSidebar(proj);
}

sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapse-sidebar");
    content.classList.toggle("expand-content");
});

renderProjectCatelogPage(projects);

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

