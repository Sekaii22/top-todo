import "./styles.css";
import { TodoItem, Project, reformProject } from "./todo";

const sidebarBtn = document.querySelector(".sidebar-btn");
const content = document.querySelector(".content");
const sidebar = document.querySelector(".sidebar");

sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapse-sidebar");
    content.classList.toggle("expand-content"); 
    // sidebar.classList.toggle("collapse-sidebar");
});

/* 
    // TESTING LOCAL STORAGE
    let test = new Project("some title", "testing local storage");
    test.addTodoItem(new TodoItem("item1", "item1 desc", 1, new Date()));
    test.addTodoItem(new TodoItem("item2", "item2 desc", 2, new Date()));
    console.log(test);

    localStorage.setItem("test", JSON.stringify(test));

    let test2 = JSON.parse(localStorage.getItem("test"));
    reformProject(test2);
    console.log(test2);
*/
