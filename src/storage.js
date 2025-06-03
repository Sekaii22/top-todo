import { reformProject, Project, TodoItem } from "./todo";

function saveToLocalStorage(value, key="projects") {
    localStorage.setItem(key, JSON.stringify(value));
}

// get last visited page's uuid
function getLastOpenPage() {
    let pageUUID = localStorage.getItem("lastPageOpened");

    if (pageUUID === null) {
        pageUUID = "default";
        saveToLocalStorage(pageUUID, "lastPageOpened");
    } 
    else {
        pageUUID = JSON.parse(pageUUID);
    }
    
    return pageUUID;
}

// get whether sidebar was in closed or opened state
function getSidebarIsOpen() {
    let isOpen = localStorage.getItem("sidebarOpen");

    if (isOpen === null) {
        isOpen = true;
        saveToLocalStorage(isOpen, "sidebarOpen");
    }
    else {
        isOpen = JSON.parse(isOpen);
    }

    return isOpen;
}

function getProjsFromLocalStorage() {
    let projects = localStorage.getItem("projects");

    if (projects === null) {
        const defaultProj = new Project("Default Project", "Project Description");
        defaultProj.addTodoItem(new TodoItem("Example Todo", "Todo description can be added here."));
        projects = [defaultProj];
        
        saveToLocalStorage(projects);
    }
    else {
        projects = JSON.parse(projects);

        for (let proj of projects) {
            reformProject(proj);
        }
    }

    return projects;
}

const projects = getProjsFromLocalStorage();
let isSidebarOpen = { bool: getSidebarIsOpen() };
let lastOpenedPage = { string: getLastOpenPage() };

export { projects, saveToLocalStorage, isSidebarOpen, lastOpenedPage };