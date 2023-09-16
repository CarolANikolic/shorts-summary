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