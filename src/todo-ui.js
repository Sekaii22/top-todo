const projGroupDiv = document.querySelector(".project-group");
const main = document.querySelector(".main");

function renderProjectPage(project) {
    delCurrContent();
}

function renderProjectCatelogPage(projectList) {
    delCurrContent();
}

function delCurrContent() {
    let child = main.firstElementChild;

    if (child !== null)
        main.removeChild(child);
}

function updateSidebar(project) {
    const li = document.createElement("li");
    const btn = document.createElement("button");

    projGroupDiv.appendChild(li);
    li.appendChild(btn);

    btn.classList.add("nav-btn", "sub-nav-btn");
    btn.textContent = project.title;
    btn.dataset.uuid = project.UUID;

    // add event handler
}

export { updateSidebar, renderProjectPage, renderProjectCatelogPage };