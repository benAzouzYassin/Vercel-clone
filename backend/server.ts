import dotenv from "dotenv"
import express from "express"
import { authRouter } from "./src/routes/authRoutes.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import { authMiddleware } from "./src/middleware/authMiddleware.js";
import { githubRouter } from "./src/routes/githubRoutes.js";
import { handleDeploy } from "./src/controllers/deployControllers.js";
import { createClient } from "redis"
import { userRouter } from "./src/routes/userRoutes.js";
dotenv.config()
//TODO MAkE IT WHEN USER UPLOAD A PROJECT IT IS SAVED


const redis = createClient({
    url: process.env.REDIS_URL,
});
redis.on('error', (err) => console.log('Redis Client Error', err));
redis.connect();

const app = express()

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

//routes
app.use("/auth", authRouter)
app.use("/github", authMiddleware, githubRouter)
app.use("/user", authMiddleware, userRouter)

app.post("/deployProject", authMiddleware, handleDeploy)
app.get("/isAuthenticated", authMiddleware, (req, res) => res.send({ authenticated: true }))

app.get("/projectStatus/:id", async (req, res) => {
    try {
        console.log(req.params.id, req.params.id.length)
        const status = await redis.HGET("status", req.params.id)
        console.log(status)
        if (!status) {
            return res.status(400).send({ deployStatus: null, error: "no project with this id !" })
        }
        return res.send({ deployStatus: status, error: null })
    } catch (error) {
        return res.status(500).send({ error: "error while getting the status", data: null })
    }
})

app.listen(process.env.PORT, () => {
    console.log("app is live on", process.env.PORT)
})