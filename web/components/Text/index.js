const Text = (type, content, keyword) => {
    const text = document.createElement(type);
    text.textContent = content;
    text.className = "text-general-style";

    type === "h1" ?
    text.classList.add("main-title") :
    type === "h2" ?
    text.classList.add("subtitle") :
    text.classList.add("paragraph")

    keyword === "lighter-text" && 
    text.classList.add("lighter-text") 
    
    return text
}

export default Text