import { Project, TodoItem } from "./todo";

// event handlers for project modal
const projectDialog = document.querySelector("#new-project-dialog");
const projectDialogForm = document.querySelector("#new-project-dialog form");
const projectDialogCloseBtn = document.querySelector("#new-project-dialog .dialog-close-btn");
const projectDialogConfirmBtn = document.querySelector("#new-project-dialog .dialog-confirm-btn");

const projectDialogTitleInput = document.querySelector("#dialog-project-title-input");
const projectDialogDescInput = document.querySelector("#dialog-project-desc-input");

projectDialogCloseBtn.addEventListener("click", () => {
    projectDialogForm.reset();
    projectDialog.close();
});

projectDialogConfirmBtn.addEventListener("click", (event) => {
    if (projectDialogForm.checkValidity()) {
        event.preventDefault();
        
        const newProj = new Project(projectDialogTitleInput.value, projectDialogDescInput.value);

        // fire add project event
        let newProjEvent = new CustomEvent("newProjectSubmit", {
            detail: newProj
        });
        projectDialog.dispatchEvent(newProjEvent);

        projectDialogForm.reset();
        projectDialog.close();
    }
});

// event handlers for todo modal    
const todoDialog = document.querySelector("#new-todo-dialog");
const todoDialogForm = document.querySelector("#new-todo-dialog form");
const todoDialogCloseBtn = document.querySelector("#new-todo-dialog .dialog-close-btn");
const todoDialogConfirmBtn = document.querySelector("#new-todo-dialog .dialog-confirm-btn");

const todoDialogTitleInput = document.querySelector("#dialog-todo-title-input");
const todoDialogDescInput = document.querySelector("#dialog-todo-desc-input");
const todoDialogPriorityInput = document.querySelector("#dialog-todo-priority-input");
const todoDialogDueDateInput = document.querySelector("#dialog-todo-due-date-input");

todoDialogCloseBtn.addEventListener("click", () => {
    todoDialogForm.reset();
    todoDialog.close();
});

todoDialogConfirmBtn.addEventListener("click", (event) => {
    if (todoDialogForm.checkValidity()) {
        event.preventDefault();
        
        let title = todoDialogTitleInput.value;
        let desc = todoDialogDescInput.value;
        let priority = Number(todoDialogPriorityInput.value);
        let dueDate = new Date(todoDialogDueDateInput.value);
        const newTodo = new TodoItem(title, desc, priority, dueDate);

        // fire add project event
        let newTodoEvent = new CustomEvent("newTodoSubmit", {
            detail: newTodo
        });
        todoDialog.dispatchEvent(newTodoEvent);
        
        
        todoDialogForm.reset();
        todoDialog.close();
    }
});