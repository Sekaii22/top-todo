import { TodoItem, getProjectFromUUID } from "./todo";

const projGroupDiv = document.querySelector(".project-group");
const main = document.querySelector(".main");

function renderProjectPage(project) {
    delCurrContent();
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

        titleBtn.textContent = proj.title;
        titleBtn.dataset.uuid = proj.UUID;
        descP.textContent = proj.desc;
        delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`;
    
        gridContainer.appendChild(gridItem);
        gridItem.appendChild(btngroup);
        gridItem.appendChild(descP);
        btngroup.appendChild(titleBtn);
        btngroup.appendChild(delBtn);

        // add event handler to titleBtn and project delBtn
        // ask for confirmation when deleting
    }

}

function delCurrContent() {
    let child = main.firstElementChild;

    if (child !== null)
        main.removeChild(child);
}

function updateSidebar(project) {
    const li = document.createElement("li");
    const navBtn = document.createElement("button");

    projGroupDiv.appendChild(li);
    li.appendChild(navBtn);

    navBtn.classList.add("nav-btn", "sub-nav-btn");
    navBtn.textContent = project.title;
    navBtn.dataset.uuid = project.UUID;

    // add event handler to navBtn
}

export { updateSidebar, renderProjectPage, renderProjectCatelogPage };