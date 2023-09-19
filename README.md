# Shorts Summary

Shorts Summary is my first project with backend and AI. With Shorts Summary you can get the summary of a short video, by entering a valid url video of a short from Youtube. This project is part of NLW (Next Level Week) from Rocketseat. The purpose of NLW is to share with the brazilian community of programmer's a challange project for free with the goal of improve the programmers coding skills and demonstrate new trends. 

### This project is not deployed since there is a need for a hosting. However, you can check it out and run locally in your navigator. Please, see "Requirements".

<img src="./public/images/screenshot/screenshot-shorts-summary.png" width=100% alt="Shorts summary initial page" width=100%>

<img src="./public/images/screenshot/screenshot-summary.png" width=100% alt="Shorts summary with a video summary" width=100%>

## Development Process

- Access Figma design;
- Initiate project using vite@latest;
- Frontend development: HTML structure and styles;
- Downloading dependencies for the backend: express cors axios;
- Set up server side and routes;
- Downloading ytdl-core dependency for downloading Youtube videos;
- Creating function for video download;
- Verifying if the video is a short;
- Connecting front and backend;
- Recovering from the frontend the video url, specificaly the video id and sending it to the server;
- Displaying message to the user;
- Using mock for testing response /utils;
- Installing dependencies for AI:
    @xenova/transformers: a library that allows you to run machine learning models.
    fluent-ffmpeg ffmpeg-static: tool for video and audio processing, like editing and transcoding.
    node-wav: node module used to work with wav audio files (decoding (reading) and encoding (writing)).
- Creating function to convert and read audio;
- Creating function to transcribe the audio to text format;
- Creating function to create the summary of the text with AI, model Xenova/distilbart-cnn-12-6;
- Testing.

## Built with

- Semantic HTML5 markup;
- JS modules;
- Mobile-first workflow;
- Node.js
- Machine learning model Xenova/distilbart-cnn-12-6;

## Technologies and Tools

- [HTML5](https://html.com)
- [CSS3](https://www.w3.org/Style/CSS/)
- [JavaScript](https://www.javascript.com)
- [NodeJs](https://nodejs.org/en)
- [Xenova/distilbart-cnn-12-6](https://huggingface.co/models?sort=downloads&search=distilbart&p=0)

## Requirements

To work with the code, you will need, before you begin, to install in your machine: NodeJs, Git and to have a source-code editor such as [VSCode](https://code.visualstudio.com).
You will also need to download all the dependencies used in this project by using this command in your terminal:

\```shell
npm install
\```

To run de server side in your machine, use de following command:
\```shell
npm run server
\```

To run de frontend side in your machine, use de following command:
\```shell
npm run web
\```

## What I learned

### Th use of ffmpeg library, Promise and Float32Array:

- Convert video MP4 into a WAV file using ffmpeg library;
- Use Promise to manage tasks that takes time and handle potential outcomes (successful outcomes (resolved) and errors (rejected) when the task is completed;
- Use Float32Array to store float numbers (audio, graphics, scientific calc) to make the code faster and to use less memory space.

~~~
import fs from "fs"
import wav from "node-wav"
import ffmpeg from "fluent-ffmpeg"
import ffmpegStatic from "ffmpeg-static"

const filePath = "./tmp/audio.mp4";
const outputPath = filePath.replace(".mp4", ".wav");

export const convert = () => 
new Promise((resolve, reject) => {
    console.log("Converting video...")

    ffmpeg.setFfmpegPath(ffmpegStatic)
    ffmpeg()
    .input(filePath)
    .audioFrequency(16000)
    .audioChannels(1)
    .on("end", () => {
        const file = fs.readFileSync(outputPath);
        const fileDecoded = wav.decode(file);
        const audioData = fileDecoded.channelData[0];
        const floatArray = new Float32Array(audioData);

        console.log("Video converted with success!")
        resolve(floatArray);
        fs.unlinkSync(outputPath);
    })
    .on("error", (error) => {
        console.log("Error converting video.", error)
        reject(error)
    })
    .save(outputPath)
})
~~~

### Backend and Async Functions:
- Setup the backend/server side, route and endpoints;
- Use async functions (asynchronous functions), to run the code not necessarily from top to botton. In this way the code can run/finish some tasks, while other tasks are paused, so the program does not freeze, instead, in the meanwhilea finishes other tasks and resume those paused tasks later. I also learn the use of "await" keyword to pause certain tasks/functions and wait for a Promise to resolve before continuing.

~~~
import cors from "cors"
import express from "express"
import { download } from "./download.js"
import { summarize } from "./summarize.js";
import { transcribe } from "./transcribe.js";
import { convert } from "./convert.js"

const app = express();
app.use(express.json());
app.use(cors());

app.get("/summary/:id", async (request, response) => {
    try {
        await download(request.params.id)
        const convertedAudio = await convert();
        const result = await transcribe(convertedAudio);
    
        return response.json({ result })
        
    } catch (error) {
        console.log(error)
        return response.json({ error })
    }
})

app.post("/summary", async (request, response) => {
    try {
        const result = await summarize(request.body.text);
    
        return response.json({ result })
    } catch (error) {
        console.log(error)
        return response.json({ error })
    }
})

app.listen(3333, () => console.log("Server is running on port 3333."))
~~~

### Using AI for text summarization:
- Use Xenova/distilbart-cnn-12-6 model for summarization.

~~~
import { pipeline } from "@xenova/transformers"

export async function summarize(text) {
    try {
        console.log("Summarizing text...");

        // Use A action of summarization from AI model Xenova
        const generator = await pipeline(
            "summarization", 
            "Xenova/distilbart-cnn-12-6"
            )
        const output = await generator(text);
        console.log("Summarization finished with success!")
        return output[0].summary_text
    } catch (error) {
        console.log("Unable to summarize text.");
        throw new Error(error)
    }
}
~~~

## Useful resources
- [Hugging Face](https://huggingface.co): This platform offers AI models to use in your projects. You can search by AI specialization areas such as: Multimodal, Computer Vision, Natural Language Procedding (Shorts Summary is part of this area), Audio, Tabular and Reinforcement Learning.

### Made with :heart: by [Caroline Almeida Nikolic](https://www.linkedin.com/in/carolinealmeidanikolic/)