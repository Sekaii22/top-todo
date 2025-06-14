import { projects, saveToLocalStorage, isSidebarOpen, lastOpenedPage } from "./storage"; 
import { createAutoTextAreaElement } from "./auto-text-area";
import "./modal";

const main = document.querySelector(".main");

function delCurrContent() {
    let child = main.firstElementChild;

    if (child !== null){
        let pageDeleteEvent = new CustomEvent("pageDelete");
        main.dispatchEvent(pageDeleteEvent);
        main.removeChild(child);
    }
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

/* Project */
function createTodoItem(todo, project) {
    // todo summary
    const todoItemDiv = document.createElement("div");
    todoItemDiv.classList.add("todo-item");
    todoItemDiv.classList.add("draggable");
    todoItemDiv.dataset.uuid = todo.UUID;

    const summary = document.createElement("div");
    summary.classList.add("todo-item-summary");
    todoItemDiv.appendChild(summary);

    const completeStatusCheckbox = document.createElement("input");
    const priorityBtn = document.createElement("button");
    const dueDateInput = document.createElement("input");
    const todoTitleWrapper = createAutoTextAreaElement(["todo-title"], todo.title);
    const todoDragIndicator = document.createElement("button");
    const expandBtn = document.createElement("button");
    
    completeStatusCheckbox.type = "checkbox";
    completeStatusCheckbox.checked = todo.isComplete
    
    priorityBtn.classList.add("priority-btn", "logo-btn");
    let priorityClass = getPriorityClassString(todo.priority);
    priorityBtn.title = "Priority";
    priorityBtn.innerHTML = `<svg class="${priorityClass} priority-svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M477-80q-83 0-156-31.5T194-197q-54-54-85.5-127T77-480q0-83 31.5-156T194-763q54-54 127-85.5T477-880q83 0 156 31.5T760-763q54 54 85.5 127T877-480q0 83-31.5 156T760-197q-54 54-127 85.5T477-80Zm91-93q78-23 135.5-80.5T784-389L568-173ZM171-574l212-212q-77 23-133 79t-79 133Zm-4 176 392-391q-12-3-24-5t-25-4L159-447q2 13 3.5 25t4.5 24Zm57 114 449-450q-8-6-16.5-12T639-757L200-318q5 9 11 17.5t13 16.5Zm91 81 438-439q-5-9-11-17.5T730-676L281-226q8 6 16.5 12t17.5 11Zm129 41 351-351q-2-13-4-25t-5-24L395-171q12 3 24 5t25 4Z"/></svg>`;
    
    dueDateInput.classList.add("due-date-input");
    dueDateInput.type = "date";
    if (todo.dueDate) {
        dueDateInput.valueAsDate = todo.dueDate;
    }
    dueDateInput.disabled = true;

    const todoTitleInput = todoTitleWrapper.querySelector("textarea");
    todoTitleInput.disabled = true;
    todoTitleInput.maxLength = 150;
    if (todo.isComplete) {
        todoTitleInput.classList.add("todo-completed");
        dueDateInput.classList.add("todo-completed");
    }

    todoDragIndicator.classList.add("logo-btn", "drag-indicator");
    todoDragIndicator.draggable = true;
    todoDragIndicator.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z"/></svg>`;
    
    expandBtn.classList.add("todo-expand-btn", "logo-btn");
    expandBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>`;
    
    summary.appendChild(completeStatusCheckbox);
    summary.appendChild(priorityBtn);
    summary.appendChild(dueDateInput);
    summary.appendChild(todoTitleWrapper);
    summary.appendChild(todoDragIndicator);
    summary.appendChild(expandBtn);

    // todo expanded
    const expanded = document.createElement("div");
    const div = document.createElement("div");
    expanded.classList.add("todo-item-expanded");
    todoItemDiv.appendChild(expanded);
    expanded.appendChild(div);

    const todoDescWrapper = createAutoTextAreaElement(["todo-desc"], todo.desc);
    const todoDescInput = todoDescWrapper.querySelector("textarea");
    todoDescInput.disabled = true;
    todoDescInput.placeholder = "Todo Description";
    div.appendChild(todoDescWrapper);

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
        todoTitleInput.classList.toggle("todo-completed");
        dueDateInput.classList.toggle("todo-completed");
        saveToLocalStorage(projects);
    });

    const prioritySvg = priorityBtn.firstElementChild;
    priorityBtn.addEventListener("click", () => {
        todo.setPriority(todo.priority + 1);
        saveToLocalStorage(projects);
        priorityClass = getPriorityClassString(todo.priority);
        prioritySvg.setAttribute("class", `${priorityClass} priority-svg`);
    });

    let isEditing = false;
    const editSvg = todoEditBtn.firstElementChild;
    const setEditing = function(bool) {
        if (bool) {
            todoTitleInput.disabled = false;
            todoDescInput.disabled = false;
            dueDateInput.disabled = false;
            editSvg.classList.add("fill-green");
        } else {
            todoTitleInput.disabled = true;
            todoDescInput.disabled = true;
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
        saveToLocalStorage(projects);
    });

    todoTitleInput.addEventListener("change", () => {
        todo.setTitle(todoTitleInput.value);
        saveToLocalStorage(projects);
    });

    todoDescInput.addEventListener("change", () => {
        todo.setDesc(todoDescInput.value);
        saveToLocalStorage(projects);
    });

    todoDelBtn.addEventListener("click", () => {
        // remove from DOM
        todoItemDiv.parentElement.removeChild(todoItemDiv);

        // remove from project
        project.deleteTodoItem(todo.UUID);
        saveToLocalStorage(projects);
    });

    // set item dragging event handlers
    let startDragY = null;
    todoDragIndicator.addEventListener("dragstart", (e) => {
        todoItemDiv.classList.add("dragging");
        
        let box = todoItemDiv.getBoundingClientRect();
        startDragY = Math.round(box.top + (box.height / 2));
        e.dataTransfer.setDragImage(todoItemDiv, box.width, 0);
    });

    todoDragIndicator.addEventListener("dragend", () => {
        todoItemDiv.classList.remove("dragging");

        let box = todoItemDiv.getBoundingClientRect();
        let endDragY = Math.round(box.top + (box.height / 2));
        
        if (endDragY > startDragY) {
            // dragged down
            const afterElement = todoItemDiv.nextElementSibling;

            if (afterElement) {
                const newIndex = project.getIndexOfTodo(afterElement.dataset.uuid) - 1;
                project.moveTodoItem(todoItemDiv.dataset.uuid, newIndex);
            } else {
                // move to end of arr
                project.moveTodoItem(todoItemDiv.dataset.uuid, project.todoList.length);
            }
            
            saveToLocalStorage(projects);
        }
        else if (endDragY < startDragY) {
            // dragged up
            const beforeElement = todoItemDiv.previousElementSibling;

            if (beforeElement) {
                const newIndex = project.getIndexOfTodo(beforeElement.dataset.uuid) + 1;
                project.moveTodoItem(todoItemDiv.dataset.uuid, newIndex);
            }
            else {
                // move to start of arr
                project.moveTodoItem(todoItemDiv.dataset.uuid, 0);
            }
            
            saveToLocalStorage(projects);
        }
    });

    return todoItemDiv;
}

function renderProjectPage(project) {
    delCurrContent();
    saveToLocalStorage(project.UUID, "lastPageOpened");

    const navBtn = document.querySelector(`button[data-uuid="${project.UUID}"]`);
    highlightSidebarNav(navBtn)
    
    const page = document.createElement("div");
    const projectDetail = document.createElement("div");
    const projectTitleWrapper = createAutoTextAreaElement(["project-title"], project.title);
    const projectTitleInput = projectTitleWrapper.querySelector("textarea");
    const projectDescWrapper = createAutoTextAreaElement(["project-desc"], project.desc);
    const projectDescInput = projectDescWrapper.querySelector("textarea");
    const todoContainer = document.createElement("div");
    const todoDialogOpenBtn = document.createElement("button");

    page.classList.add("page");
    page.dataset.uuid = project.UUID;
    projectDetail.classList.add("project-detail");
    projectDescInput.placeholder = "Project Description";
    todoContainer.classList.add("todo-container");
    todoDialogOpenBtn.classList.add("logo-btn");
    todoDialogOpenBtn.id = "dialog-todo-open-btn";
    todoDialogOpenBtn.title = "Add new todo";
    todoDialogOpenBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;

    main.appendChild(page);
    page.appendChild(projectDetail);
    page.appendChild(todoContainer);
    page.appendChild(todoDialogOpenBtn);
    projectDetail.appendChild(projectTitleWrapper);
    projectDetail.appendChild(projectDescWrapper);

    // create todo items
    for (let todo of project.todoList) {
        const todoItemDiv = createTodoItem(todo, project);
        todoContainer.appendChild(todoItemDiv);
    }

    // event handlers for dragging in todoContainer
    todoContainer.addEventListener("dragover", (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(todoContainer, e.clientY);
        const dragging = todoContainer.querySelector(".dragging");
        if (!dragging)
            return;

        if (afterElement === undefined) {
            todoContainer.appendChild(dragging);
        } 
        else {
            todoContainer.insertBefore(dragging, afterElement);
        }
    });

    function getDragAfterElement(container, y) {
        let draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];

        // get element with smallest negative offset from mouse cursor
        const closestAfterElement = draggableElements.reduce((closest, draggable) => {
            const box = draggable.getBoundingClientRect();
            const offset = y - (box.top + (box.height / 2));
            
            // elements below cursor will have negative offset from cursor
            // find the element that is below cursor and also closest to cursor
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: draggable};
            }
            else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;

        return closestAfterElement;
    }

    // event handler for projectTitle
    projectTitleInput.addEventListener("change", () => {
        project.setTitle(projectTitleInput.value);
        saveToLocalStorage(projects);

        // change nav btn title also
        const navBtn = document.querySelector(`button[data-uuid="${project.UUID}"]`);
        navBtn.textContent = project.title;
    });

    // event handler for projectDesc
    projectDescInput.addEventListener("change", () => {
        project.setDesc(projectDescInput.value);
        saveToLocalStorage(projects);
    });

    // event handler for new todo btn
    const todoDialog = document.querySelector("#new-todo-dialog");
    todoDialogOpenBtn.addEventListener("click", () => todoDialog.showModal());

    // event handler for todoDialog submit and page deletion
    let newTodoSubmitHandler = function (event) {
        const newTodo = event.detail;

        // save new todo
        project.addTodoItem(newTodo);
        saveToLocalStorage(projects);

        // add to new todo to DOM
        const newTodoItem = createTodoItem(newTodo, project);
        todoContainer.appendChild(newTodoItem);
    };
    todoDialog.addEventListener("newTodoSubmit", newTodoSubmitHandler);

    // need to remove handlers if not every project page load will keep increasing
    // the number of event listeners on todoDialog since the dialog element is not removed 
    // when current page is removed.
    let pageDeleteHandler = function() {
        todoDialog.removeEventListener("newTodoSubmit", newTodoSubmitHandler);
        main.removeEventListener("pageDelete", pageDeleteHandler);
    };
    main.addEventListener("pageDelete", pageDeleteHandler);
}

/* Project Catelog */
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

    // event handler for titleBtn
    titleBtn.addEventListener("click", () => renderProjectPage(project));
    
    // event handler for project delBtn
    delBtn.addEventListener("click", () => {
        let confirmationText = `Are you sure you want to delete "${project.title}" project?`
        
        // ask for confirmation when deleting
        if (confirm(confirmationText) === true) {
            // remove from DOM
            gridItem.parentElement.removeChild(gridItem);
            removeProjectNavFromSidebar(project);
            
            // remove from projects arr and local storage
            let index = projects.findIndex((item) => item.UUID === project.UUID);
            if (index !== -1) {
                projects.splice(index, 1);
            }
            saveToLocalStorage(projects);
        }
    });

    return gridItem;
}

function renderProjectCatelogPage(projectList) {
    delCurrContent();
    saveToLocalStorage("default", "lastPageOpened");

    const projectCatalogNavBtn = document.querySelector("#project-catalog-btn");
    highlightSidebarNav(projectCatalogNavBtn);

    const page = document.createElement("div");
    const gridContainer = document.createElement("div");

    main.appendChild(page);
    page.appendChild(gridContainer)

    page.classList.add("page");
    gridContainer.classList.add("project-grid-container");

    // grid item for each project
    for (let proj of projectList) {   
        const gridItem = createProjectItem(proj);
        gridContainer.appendChild(gridItem);
    }
}

/* Sidebar */
function createProjectNavBtn(project) {
    const li = document.createElement("li");
    const navBtn = document.createElement("button");

    li.appendChild(navBtn);

    navBtn.classList.add("nav-btn", "sub-nav-btn");
    navBtn.textContent = project.title;
    navBtn.dataset.uuid = project.UUID;

    // event handler for project navBtn
    navBtn.addEventListener("click", () => renderProjectPage(project));

    return li;
}

function removeProjectNavFromSidebar(project) {
    const projGroupDiv = document.querySelector(".project-group");
    const navBtn = projGroupDiv.querySelector(`button[data-uuid="${project.UUID}"]`);
    if (navBtn) {
        const li = navBtn.parentElement;
        li.parentElement.removeChild(li);
    }
}

function renderSidebarProjectNav() {
    const projGroupDiv = document.querySelector(".project-group");
    const sidebarBtn = document.querySelector(".sidebar-btn");
    const content = document.querySelector("#content");
    const sidebar = document.querySelector("#sidebar");

    if (!isSidebarOpen.bool) {
        sidebar.classList.toggle("collapse-sidebar");
        content.classList.toggle("expand-content");
    }

    // add proj nav buttons to sidebar
    for (let proj of projects) {
        const li = createProjectNavBtn(proj);
        projGroupDiv.appendChild(li);
    }

    // event handler for collapsing sidebar
    sidebarBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapse-sidebar");
        content.classList.toggle("expand-content");
        isSidebarOpen.bool = !isSidebarOpen.bool
        saveToLocalStorage(isSidebarOpen.bool, "sidebarOpen")
    });

    // event handler for new project btn
    const projectDialog = document.querySelector("#new-project-dialog");
    const projectDialogOpenBtn = document.querySelector("#dialog-project-open-btn");

    projectDialogOpenBtn.addEventListener("click", () => projectDialog.showModal());

    projectDialog.addEventListener("newProjectSubmit", (event) => {
        const newProj = event.detail;

        // save new proj
        projects.push(newProj);
        saveToLocalStorage(projects);

        // add new project to sidebar as a nav
        const li = createProjectNavBtn(newProj);
        projGroupDiv.appendChild(li);

        // add new project item to project catalog if it is currently opened
        const projCatalogGridContainer = document.querySelector(".project-grid-container");
        if (projCatalogGridContainer) {
            projCatalogGridContainer.appendChild(createProjectItem(newProj));
        }
    });

    // event handler for project catalog page btn
    const projectCatalogNavBtn = document.querySelector("#project-catalog-btn");
    projectCatalogNavBtn.addEventListener("click", () => renderProjectCatelogPage(projects));    
}

function highlightSidebarNav(btn) {
    // highlights only nav btn for the currently active page
    let navBtnArr = document.querySelectorAll(".nav-btn");
    for (let nav of navBtnArr) {
        nav.disabled = false;
    }
    btn.disabled = true;
}

function startUI() {
    renderSidebarProjectNav();

    if (lastOpenedPage.string === "default") {
        renderProjectCatelogPage(projects);
    } 
    else {
        let index = projects.findIndex((item) => item.UUID === lastOpenedPage.string);

        if (index === -1) {
            renderProjectCatelogPage(projects);
        }
        
        renderProjectPage(projects[index]);
    }
}


export { renderProjectPage, renderProjectCatelogPage, startUI };