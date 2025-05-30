import { reformProject } from "./todo";

function saveToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function getFromLocalStorage() {
    let projects = localStorage.getItem("projects");
    if (projects === null) {
        projects = [new Project("Default", "Default project.")];
        saveToLocalStorage();
    }
    else {
        projects = JSON.parse(projects);

        for (let proj of projects) {
            reformProject(proj);
        }
    }

    return projects;
}

const projects = getFromLocalStorage();

export { projects, saveToLocalStorage, getFromLocalStorage };