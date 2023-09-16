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
import form from "./form.js"

const main = document.querySelector("main");
const formulary = document.createElement("form");
const summarySection =  document.createElement("section");
formulary.className = "form";
formulary.id = "url-form";

formulary.appendChild(Input("url", "input-url", "Please enter the video URL"));
formulary.appendChild(Button("submit", "Summarize"))

summarySection.appendChild(Text("h2", "Summary"));
summarySection.appendChild(Text("p", "Choose a short video to summarize", "lighter-text", "summary"))

main.appendChild(AppName());
main.appendChild(formulary);
main.appendChild(summarySection);
formulary.addEventListener("submit", (event) => {
    form(event, "#input-url")
});