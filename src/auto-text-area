function createAutoTextAreaElement(classList = [], initialValue = "") {
    const wrapper = document.createElement("div");
    const textarea = document.createElement("textarea");

    wrapper.classList.add(...classList, "auto-text-area");
    wrapper.dataset.replicatedValue = initialValue;
    textarea.value = initialValue;
    textarea.rows = 1;
    textarea.spellcheck = false;

    wrapper.appendChild(textarea);

    textarea.addEventListener("input", () => {
        wrapper.dataset.replicatedValue = textarea.value;
    });

    return wrapper
}

export { createAutoTextAreaElement };