const Input = (type, inputID, placeholder) => {
    const inputField = document.createElement("input");
    inputField.type = type;
    inputField.id = inputID;
    inputField.placeholder = placeholder;
    inputField.className = "input-url";
    inputField.type === "url" &&
    inputField.classList.add("url-input");
    
    return inputField
}

export default Input