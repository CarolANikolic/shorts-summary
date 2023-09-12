const Button = (type, title, content) => {
    const btn = document.createElement("button");
    btn.type = type;
    btn.title = title;
    btn.textContent = content;
    btn.className = "btn";
    btn.title === "Summarize" && 
    btn.classList.add("submit-btn")

    return btn
}

export default Button