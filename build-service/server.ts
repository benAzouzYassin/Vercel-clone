import dotenv from "dotenv"
import { createClient } from "redis"
import { downloadFolder } from "./src/firebase.js"
dotenv.config()

const redis = createClient({
    url: process.env.REDIS_URL,
});
redis.on('error', (err) => console.log('Redis Client Error', err));
redis.connect();

async function main() {
    console.log("waiting for elements")
    while (true) {
        console.log("loop")
        const queueElement = await redis.brPop("id", 0)
        console.log(queueElement)
        await downloadFolder(queueElement?.element ?? "").catch(err => console.error(err))

    }
}

main()