import { server } from "../../server.js";

const sendForm = (event, inputId) => { 
    event.preventDefault()

    const input = document.querySelector(inputId);
    const videoURL = input.value;
    const content = document.querySelector('[data-attribute="summary"]');

    if(!videoURL) {
        console.log("VideoURL not found.");
        return;
    }
    
    const [_, params] = videoURL.split("/shorts/");
    
    if (!params || !params.includes("?si")) {
        console.log("Delimiter '?si' not found in params.");
        return; 
    }
    
    const [videoID] = params.split("?si");
    console.log(videoID);
    
    if (!videoURL.includes("shorts")) {
        content.textContent = "This video is not a short";
    }
    
    content.textContent = "Summarizing video content...";
}

export default sendForm
