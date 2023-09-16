import cors from "cors"
import express from "express"
import { download } from "./download.js"

const app = express();
app.use(cors());

app.get("/summary/:id", (request, response) => {
    download(request.params.id)
    response.json({ result: "Video downloaded with success!" })
})

app.listen(3333, () => console.log("Test port 3333."))