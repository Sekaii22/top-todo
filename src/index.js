import "./styles.css";
import { TodoItem, Project } from "./todo"; //DEBUG
import { renderSidebar, renderProjectPage, renderProjectCatelogPage } from "./todo-ui";
import { projects, saveToLocalStorage } from "./storage"; //DEBUG

renderSidebar();

// renderProjectCatelogPage(projects);
// projects[0].addTodoItem(new TodoItem("item1", "item1 desc", 1, new Date(), true));
// projects[0].addTodoItem(new TodoItem("item2", "item2 desc", 2, new Date()));
// saveToLocalStorage();
renderProjectPage(projects[0]);

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
//  - modal for create new todo item
//  - Add event handlers for modal
//  - add todo item button in project page.
//  - event handers for titleBtn and project delBtn in project catalog page.
//  - event handler to sidebar navBtn
//  - event hander for sidebar create new project button

const projectDialog = document.querySelector("#new-project-dialog");
const projectDialogArea = document.querySelector("#new-project-dialog > div");
const projectDialogForm = document.querySelector("#new-project-dialog form");
const projectDialogOpenBtn = document.querySelector("#dialog-project-open-btn");
const projectDialogCloseBtn = document.querySelector("#new-project-dialog .dialog-close-btn");
const projectDialogConfirmBtn = document.querySelector("#new-project-dialog .dialog-confirm-btn");

projectDialogOpenBtn.addEventListener("click", () => projectDialog.showModal());
projectDialogCloseBtn.addEventListener("click", () => projectDialog.close());

projectDialog.addEventListener("click", () => projectDialog.close());
projectDialogArea.addEventListener("click", (e) => e.stopPropagation());

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers a "close" event.
projectDialogConfirmBtn.addEventListener("click", (event) => {
	if (projectDialogForm.checkValidity()) {
		event.preventDefault();
		
		// work with form input data here....
        alert("add new project");
		
		projectDialogForm.reset();
		projectDialog.close();
	}
});

const todoDialog = document.querySelector("#new-todo-dialog");
const todoDialogArea = document.querySelector("#new-todo-dialog > div");
// const todoDialogForm = document.querySelector("#new-todo-dialog form");
const todoDialogOpenBtn = document.querySelector("#dialog-todo-open-btn");
const todoDialogCloseBtn = document.querySelector("#new-todo-dialog .dialog-close-btn");
// const todoDialogConfirmBtn = document.querySelector("#new-todo-dialog .dialog-confirm-btn");

todoDialogOpenBtn.addEventListener("click", () => todoDialog.showModal());
todoDialogCloseBtn.addEventListener("click", () => todoDialog.close());

todoDialog.addEventListener("click", () => todoDialog.close());
todoDialogArea.addEventListener("click", (e) => e.stopPropagation());

