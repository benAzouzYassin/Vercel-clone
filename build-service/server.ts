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

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Promise Rejection:', error);
});
async function main() {
    let projectId
    while (true) {
        try {
            console.log("waiting for elements")
            const queue = await redis.brPop("id", 0)
            projectId = queue?.element
            await downloadFolder(projectId ?? "")
            await buildProject(projectId ?? "")
            await uploadBuildOutput(projectId ?? "")
            await removerDirAsync(`downloaded-files/${projectId}`)
            if (projectId) redis.hSet("status", projectId, "live")
        } catch (error) {
            console.error(error)
            if (projectId) redis.hSet("status", projectId, "failed")
            continue
        }

    }


}

main()