import "./styles.css";

const sidebarBtn = document.querySelector(".sidebar-btn");
const body = document.querySelector("body");
const sidebarHeader = document.querySelector(".sidebar header");
const sidebarNav = document.querySelector(".sidebar nav");

sidebarBtn.addEventListener("click", () => {
    body.classList.toggle("collapse-grid");
    sidebarNav.classList.toggle("collapse");
    sidebarHeader.classList.toggle("collapse");
});