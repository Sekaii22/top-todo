import "./styles.css";

const sidebarBtn = document.querySelector(".sidebar-btn");
const content = document.querySelector(".content");
const sidebar = document.querySelector(".sidebar");

sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapse-sidebar");
    content.classList.toggle("expand-content"); 
    // sidebar.classList.toggle("collapse-sidebar");
});