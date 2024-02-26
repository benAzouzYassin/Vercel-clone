import express from "express"
import dotenv from "dotenv"
import { getFile } from "./src/firebase.js"
import mime from "mime-types"
dotenv.config()
const app = express()

app.use(express.json())

app.get("/*", async (req, res) => {
    const id = req.hostname.split(".")[0]
    const file = Object.values(req.params).join("/")
    console.log("request to : ", id)
    const storedFile = await getFile(id, file).catch(err => console.error(err.message))
    const fileType = mime.lookup(file)
    res.set("Content-Type", fileType.toString())
    res.send(storedFile)


})

app.listen(3001, () => console.log("requests service is live on port 3001"))