import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) => 
    new Promise((resolve, reject) => {
    const videoURL = "http://www.youtube.com/shorts/" + videoId;

    ytdl(videoId, {quality: "lowestaudio", filter: "audioonly"}).on
    ("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000;
        
        if (seconds > 60) {
            throw new Error("The duration of this video is higher than 60 seconds.")
        }
    }
    ).on("end", () => {
        console.log("Video downloded.");
        resolve()
    }
    ).on("error", (error) => {
        console.log("Failed to download the video. Error:", error);
        reject(error)
    }
    ).pipe(fs.createWriteStream("./tmp/audio.mp4"))
})