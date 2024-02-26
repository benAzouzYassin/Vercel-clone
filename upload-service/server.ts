import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { generateRandomId, isUrl } from "./src/utils.js"
import { cloneRepo } from "./src/git.js"
import expressAsyncHandler from "express-async-handler"
import { uploadFiles } from "./src/firebase.js"
import { extractDirFiles } from "./src/filesUtils.js"
import { createClient } from "redis"
import { rm } from "fs"

dotenv.config()
const app = express();
app.use(express.json())
app.use(cors())


const redis = createClient({
  url: process.env.REDIS_URL,
});
redis.on('error', (err) => console.log('Redis Client Error', err));
redis.connect();



app.post('/', expressAsyncHandler(async (req, res) => {
  const url = req.body?.gitRepoUrl

  if (!isUrl(url)) {
    res.status(400).json({ "error": "body should contains gitRepoUrl" })
    return
  }

  const reqId = generateRandomId()
  const cloned = await cloneRepo(url, reqId)
  if (!cloned) {
    res.status(500).json({ "error": "error while cloning the repo" })
    return
  }

  const files = extractDirFiles(`git-repos/${reqId}`)
  const uploaded = await uploadFiles(files)

  if (!uploaded) {
    res.status(500).json({ "error": "error while uploading the files to the cloud" })
    return
  }
  rm(`git-repos/${reqId}`, { recursive: true }, (err) => {
    if (err) console.error("error while deleting repo : server.ts line: 40 ")
  })
  redis.LPUSH("id", reqId)
  redis.hSet("status", reqId, "building")
  res.json({ "success": uploaded, id: reqId })
}));


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`live at http://localhost:${PORT}`);
});
