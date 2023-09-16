import { server } from "./server.js";

const form = async (event, inputId) => { 
    event.preventDefault();

    const input = document.querySelector(inputId);
    const videoURL = input.value;
    const content = document.querySelector('[data-attribute="summary"]');
    content.classList.remove("darker-text");

    // Check if videoURL is empty
    if (!videoURL) {
        console.log("VideoURL not found.");
        return;
    }

    // Check if videURL includes "/shorts/"
    if (!videoURL.includes("/shorts/")) {
        return content.textContent = "This video is not a short";
    }

    // If videoURL includes "/shorts/", set the content message
    content.textContent = "Getting text from the video's audio...";

    // Split the URL to extract videoID
    const [_, params] = videoURL.split("/shorts/");
    const [videoID] = params.split("?si");

    try {
        // Fetch transcription data from the server
        const transcription = await server.get("/summary/" + videoID);
        content.textContent = "Summarizing video content...";

        // Make a request to the summary route to send the transcription to be summarized
        const summary = await server.post("/summary", {
            text: transcription.data.result,
        })

        // Display the summary of the video transcription
        content.textContent = summary.data.result;
        console.log(transcription)
        content.classList.toggle("darker-text");
    } 
    catch (error) {
        // Handle any errors that may occur during the transcription request
        console.error("Error fetching transcription:", error);
        content.textContent = "Error fetching transcription";
    }
};

export default form;
