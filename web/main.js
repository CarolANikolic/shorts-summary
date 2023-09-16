// CSS
import "/global.css"
import "./components/Button/button.css"
import "./components/Input/input.css"
import "./components/AppName/appName.css"
import "./components/Text/text.css"

// Components
import Button from "./components/Button"
import Input from "./components/Input"
import AppName from "./components/AppName"
import Text from "./components/Text"

// Functions
import sendForm from "./assets/functions/sendForm.js"

const main = document.querySelector("main");
const form = document.createElement("form");
const summarySection =  document.createElement("section");
form.className = "form";
form.id = "url-form";

form.appendChild(Input("url", "input-url", "Please enter the video URL"));
form.appendChild(Button("submit", "Summarize"))

summarySection.appendChild(Text("h2", "Summary"));
summarySection.appendChild(Text("p", "Choose a short video to summarize", "lighter-text", "summary"))

main.appendChild(AppName());
main.appendChild(form);
main.appendChild(summarySection);
form.addEventListener("submit", (event) => {
    sendForm(event, "#input-url")
});