import { pipeline } from "@xenova/transformers"

export async function transcribe(audio) {
    try {
    console.log("Generating transcription...")  
    const transcribe = await pipeline(
        "automatic-speech-recognition", 
        "Xenova/whisper-small"
    )
    const transcription = await transcribe(audio, {
        chunk_lenght_s: 30,
        stride_lenght_s: 5,
        language: "english",
        task: "transcribe",
    })
    console.log("Transcription finished with sucess!")  
    return transcription?.text.replace("[Music]", "")
    } catch (error) {
        throw new Error(error)
    }

}