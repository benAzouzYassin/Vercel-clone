import dotenv from "dotenv"
import { createClient } from "redis"
import { downloadFolder } from "./src/downloadProject.js"
import { buildProject } from "./src/buildProject.js";
import { uploadBuildOutput } from "./src/uploadProject.js";
import { removerDirAsync } from "./src/filesUtils.js";
dotenv.config()



const redis = createClient({
    url: process.env.REDIS_URL,
});
redis.on('error', (err) => console.log('Redis Client Error', err));
redis.connect();

async function main() {
    while (true) {
        console.log("waiting for elements")
        const queue = await redis.brPop("id", 0)
        const projectId = queue?.element
        await downloadFolder(projectId ?? "").catch(err => console.error(err))
        await buildProject(projectId ?? "").catch(err => console.error(err))
        await uploadBuildOutput(projectId ?? "").catch(err => console.error(err))
        await removerDirAsync(`downloaded-files/${projectId}`)
    }

}

main()