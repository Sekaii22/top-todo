import { reformProject, Project } from "./todo";

function saveToLocalStorage(value, key="projects") {
    localStorage.setItem(key, JSON.stringify(value));
}

function getProjsFromLocalStorage() {
    let projects = localStorage.getItem("projects");

    if (projects === null) {
        projects = [new Project("Default", "Default project.")];
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

export { projects, saveToLocalStorage, getProjsFromLocalStorage };