import { TodoItem, Project } from "./todo";
import { projects, saveToLocalStorage } from "./storage"; 

// get from local storage
const projGroupDiv = document.querySelector(".project-group");
const main = document.querySelector(".main");

function delCurrContent() {
    let child = main.firstElementChild;

    if (child !== null)
        main.removeChild(child);
}

function getPriorityClassString(num) {
    let priorityClass = "";
    if (num === 0) {
        priorityClass = "fill-green";
    }
    else if (num === 1) {
        priorityClass = "fill-orange";
    }
    else if (num === 2) {
        priorityClass = "fill-red";
    }
    return priorityClass;
}

function createTodoItem(todo, project) {
    if (!(todo instanceof TodoItem) || !(project instanceof Project)) {
        return null;
    }

    // todo summary
    const todoItemDiv = document.createElement("div");
    todoItemDiv.classList.add("todo-item");

    const summary = document.createElement("div");
    summary.classList.add("todo-item-summary");
    todoItemDiv.appendChild(summary);

    const completeStatusCheckbox = document.createElement("input");
    const priorityBtn = document.createElement("button");
    const dueDateInput = document.createElement("input");
    const todoTitle = document.createElement("div");
    const expandBtn = document.createElement("button");
    
    completeStatusCheckbox.type = "checkbox";
    priorityBtn.classList.add("priority-btn", "logo-btn");
    dueDateInput.type = "date";
    dueDateInput.classList.add("due-date-input");
    todoTitle.classList.add("todo-title", "content-editable");
    expandBtn.classList.add("todo-expand-btn", "logo-btn");

    completeStatusCheckbox.checked = todo.isComplete
    let priorityClass = getPriorityClassString(todo.priority);
    // priorityBtn.disabled = true;
    priorityBtn.title = "Priority";
    priorityBtn.innerHTML = `<svg class="${priorityClass} priority-svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M477-80q-83 0-156-31.5T194-197q-54-54-85.5-127T77-480q0-83 31.5-156T194-763q54-54 127-85.5T477-880q83 0 156 31.5T760-763q54 54 85.5 127T877-480q0 83-31.5 156T760-197q-54 54-127 85.5T477-80Zm91-93q78-23 135.5-80.5T784-389L568-173ZM171-574l212-212q-77 23-133 79t-79 133Zm-4 176 392-391q-12-3-24-5t-25-4L159-447q2 13 3.5 25t4.5 24Zm57 114 449-450q-8-6-16.5-12T639-757L200-318q5 9 11 17.5t13 16.5Zm91 81 438-439q-5-9-11-17.5T730-676L281-226q8 6 16.5 12t17.5 11Zm129 41 351-351q-2-13-4-25t-5-24L395-171q12 3 24 5t25 4Z"/></svg>`;
    if (todo.dueDate) {
        dueDateInput.valueAsDate = todo.dueDate;
    }
    dueDateInput.disabled = true;
    todoTitle.textContent = todo.title;
    todoTitle.spellcheck = false;
    expandBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>`;
    
    summary.appendChild(completeStatusCheckbox);
    summary.appendChild(priorityBtn);
    summary.appendChild(dueDateInput);
    summary.appendChild(todoTitle);
    summary.appendChild(expandBtn);

    // todo expanded
    const expanded = document.createElement("div");
    const div = document.createElement("div");
    expanded.classList.add("todo-item-expanded");
    todoItemDiv.appendChild(expanded);
    expanded.appendChild(div);

    const todoDesc = document.createElement("div");
    todoDesc.classList.add("todo-desc", "content-editable")
    todoDesc.textContent = todo.desc;
    todoDesc.spellcheck = false;
    div.appendChild(todoDesc);

    const todoBtnGroupContainer = document.createElement("div");
    todoBtnGroupContainer.classList.add("todo-btn-group-container");
    div.appendChild(todoBtnGroupContainer);

    const todoBtnGroup = document.createElement("div");
    todoBtnGroup.classList.add("todo-btn-group");
    todoBtnGroupContainer.appendChild(todoBtnGroup);

    const todoEditBtn = document.createElement("button");
    const todoDelBtn = document.createElement("button");
    todoEditBtn.classList.add("todo-edit-btn", "logo-btn");
    todoDelBtn.classList.add("todo-del-btn", "logo-btn");
    todoEditBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>`;
    todoDelBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>`;
    todoBtnGroup.appendChild(todoEditBtn);
    todoBtnGroup.appendChild(todoDelBtn);

    // event handlers
    completeStatusCheckbox.addEventListener("input", () => {
        todo.setCompleteStatus(completeStatusCheckbox.checked);
        saveToLocalStorage();
    });

    const prioritySvg = priorityBtn.firstElementChild;
    priorityBtn.addEventListener("click", () => {
        todo.setPriority(todo.priority + 1);
        saveToLocalStorage();
        priorityClass = getPriorityClassString(todo.priority);
        prioritySvg.setAttribute("class", `${priorityClass} priority-svg`);
    });

    let isEditing = false;
    const editSvg = todoEditBtn.firstElementChild;
    const setEditing = function(bool) {
        if (bool) {
            todoTitle.contentEditable = "true";
            todoDesc.contentEditable = "true";
            dueDateInput.disabled = false;
            editSvg.classList.add("fill-green");
        } else {
            todoTitle.contentEditable = "false";
            todoDesc.contentEditable = "false";
            dueDateInput.disabled = true;
            editSvg.classList.remove("fill-green");
        }
    }
    todoEditBtn.addEventListener("click", () => {
        isEditing = !isEditing;
        setEditing(isEditing);
    });

    expandBtn.addEventListener("click", ()=> {
        expanded.classList.toggle("open-expanded");
        isEditing = false;
        setEditing(false);
    });

    dueDateInput.addEventListener("input", () => {
        todo.setDueDate(new Date(dueDateInput.value));
        saveToLocalStorage();
    });

    let todoTitleChange = false;
    todoTitle.addEventListener("input", () => {
        todoTitleChange = true;
    });
    todoTitle.addEventListener("focusout", () => {
        if (todoTitleChange) {
            todoTitleChange = false;
            todo.setTitle(todoTitle.textContent);
            saveToLocalStorage();
        }
    });

    let todoDescChange = false;
    todoDesc.addEventListener("input", () => {
        todoDescChange = true;
    });
    todoDesc.addEventListener("focusout", () => {
        if (todoDescChange) {
            todoDescChange = false;
            todo.setDesc(todoDesc.textContent);
            saveToLocalStorage();
        }
    });

    todoDelBtn.addEventListener("click", () => {
        // remove from DOM
        todoItemDiv.parentElement.removeChild(todoItemDiv);

        // remove from project
        project.deleteTodoItem(todo.UUID);
        saveToLocalStorage();
    });

    return todoItemDiv;
}

function renderProjectPage(project) {
    delCurrContent();
    
    const page = document.createElement("div");
    const projectDetail = document.createElement("div");
    const projectTitle = document.createElement("div");
    const projectDesc = document.createElement("div");
    const todoContainer = document.createElement("div");
    const todoDialogOpenBtn = document.createElement("button");

    page.classList.add("page");
    page.dataset.uuid = project.UUID;
    projectDetail.classList.add("project-detail");
    projectTitle.classList.add("project-title", "content-editable");
    projectTitle.spellcheck = false;
    projectTitle.contentEditable = "true"
    projectTitle.textContent = project.title;
    projectDesc.classList.add("project-desc", "content-editable");
    projectDesc.spellcheck = false;
    projectDesc.contentEditable = "true"
    projectDesc.textContent = project.desc;
    todoContainer.classList.add("todo-container");
    todoDialogOpenBtn.classList.add("logo-btn");
    todoDialogOpenBtn.id = "dialog-todo-open-btn";
    todoDialogOpenBtn.title = "Add new todo";
    todoDialogOpenBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;

    main.appendChild(page);
    page.appendChild(projectDetail);
    page.appendChild(todoContainer);
    page.appendChild(todoDialogOpenBtn);
    projectDetail.appendChild(projectTitle);
    projectDetail.appendChild(projectDesc);

    // create todo items
    for (let todo of project.todoList) {
        const todoItemDiv = createTodoItem(todo, project);
        todoContainer.appendChild(todoItemDiv);
    }

    // add event handler for projectTitle and projectDesc
    let projectTitleChange = false;
    projectTitle.addEventListener("input", () => {
        projectTitleChange = true;
    });
    projectTitle.addEventListener("focusout", () => {
        if (projectTitleChange) {
            projectTitleChange = false;
            project.setTitle(projectTitle.textContent);
            saveToLocalStorage();
        }
    });

    let projectDescChange = false;
    projectDesc.addEventListener("input", () => {
        projectDescChange = true;
    });
    projectDesc.addEventListener("focusout", () => {
        if (projectDescChange) {
            projectDescChange = false;
            project.setDesc(projectDesc.textContent);
            saveToLocalStorage();
        }
    });

    // add event handler for creating new todo btn
    const todoDialog = document.querySelector("#new-todo-dialog");
    const todoDialogForm = document.querySelector("#new-todo-dialog form");
    const todoDialogCloseBtn = document.querySelector("#new-todo-dialog .dialog-close-btn");
    const todoDialogConfirmBtn = document.querySelector("#new-todo-dialog .dialog-confirm-btn");

    const todoDialogTitleInput = document.querySelector("#dialog-todo-title-input");
    const todoDialogDescInput = document.querySelector("#dialog-todo-desc-input");
    const todoDialogPriorityInput = document.querySelector("#dialog-todo-priority-input");
    const todoDialogDueDateInput = document.querySelector("#dialog-todo-due-date-input");

    todoDialogOpenBtn.addEventListener("click", () => todoDialog.showModal());
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

            // save new todo
            project.todoList.push(newTodo);
            saveToLocalStorage();

            // add to new todo to DOM
            todoContainer.appendChild(createTodoItem(newTodo, project));
            
            todoDialogForm.reset();
            todoDialog.close();
        }
    });
}

function createProjectItem(project) {
    const gridItem = document.createElement("div");
    const btngroup = document.createElement("div");
    const titleBtn = document.createElement("button");
    const delBtn = document.createElement("button")
    const descP = document.createElement("p");

    gridItem.classList.add("project-grid-item");
    btngroup.classList.add("project-btn-group");
    titleBtn.classList.add("project-title-btn");
    delBtn.classList.add("project-del-btn", "logo-btn");
    descP.classList.add("project-desc");

    titleBtn.textContent = project.title;
    titleBtn.dataset.uuid = project.UUID;
    descP.textContent = project.desc;
    delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`;

    gridItem.appendChild(btngroup);
    gridItem.appendChild(descP);
    btngroup.appendChild(titleBtn);
    btngroup.appendChild(delBtn);

    // add event handler to titleBtn and project delBtn
    // ask for confirmation when deleting

    return gridItem;
}

function renderProjectCatelogPage(projectList) {
    delCurrContent();

    const page = document.createElement("div");
    const gridContainer = document.createElement("div");

    main.appendChild(page);
    page.appendChild(gridContainer)

    page.classList.add("page");
    gridContainer.classList.add("project-grid-container");

    // add grid item for each project
    for (let proj of projectList) {   
        const gridItem = createProjectItem(proj);
        gridContainer.appendChild(gridItem);
    }
}

function addProjectNavToSidebar(project) {
    const li = document.createElement("li");
    const navBtn = document.createElement("button");

    projGroupDiv.appendChild(li);
    li.appendChild(navBtn);

    navBtn.classList.add("nav-btn", "sub-nav-btn");
    navBtn.textContent = project.title;
    navBtn.dataset.uuid = project.UUID;

    // add event handler to navBtn
}

function renderSidebar() {
    const sidebarBtn = document.querySelector(".sidebar-btn");
    const content = document.querySelector("#content");
    const sidebar = document.querySelector("#sidebar");

    // add proj nav to sidebar
    for (let proj of projects) {
        addProjectNavToSidebar(proj);
    }

    sidebarBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapse-sidebar");
        content.classList.toggle("expand-content");
    });

    // add event handler for creating new projects btn
    const projectDialog = document.querySelector("#new-project-dialog");
    const projectDialogForm = document.querySelector("#new-project-dialog form");
    const projectDialogOpenBtn = document.querySelector("#dialog-project-open-btn");
    const projectDialogCloseBtn = document.querySelector("#new-project-dialog .dialog-close-btn");
    const projectDialogConfirmBtn = document.querySelector("#new-project-dialog .dialog-confirm-btn");

    const projectDialogTitleInput = document.querySelector("#dialog-project-title-input");
    const projectDialogDescInput = document.querySelector("#dialog-project-desc-input");

    projectDialogOpenBtn.addEventListener("click", () => projectDialog.showModal());
    projectDialogCloseBtn.addEventListener("click", () => {
        projectDialogForm.reset();
        projectDialog.close();
    });

    projectDialogConfirmBtn.addEventListener("click", (event) => {
        if (projectDialogForm.checkValidity()) {
            event.preventDefault();
            
            const newProj = new Project(projectDialogTitleInput.value, projectDialogDescInput.value);

            // save new proj
            projects.push(newProj);
            saveToLocalStorage();

            // add new project to sidebar as a nav
            addProjectNavToSidebar(newProj);

            // add new project item to project catalog if it is currently opened
            const projCatalogGridContainer = document.querySelector(".project-grid-container");
            if (projCatalogGridContainer) {
                projCatalogGridContainer.appendChild(createProjectItem(newProj));
            }
            
            projectDialogForm.reset();
            projectDialog.close();
        }
    });
}

export { renderSidebar, renderProjectPage, renderProjectCatelogPage };