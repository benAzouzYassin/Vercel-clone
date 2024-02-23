import dotenv from "dotenv"
import express from "express"
import { authRouter } from "./src/routes/authroutes.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import { authMiddleware } from "./src/middleware/authMiddleware.js";

dotenv.config()
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

app.get("/githubData", authMiddleware, (req, res) => {
    //@ts-ignore
    res.send({ data: "your github data here" })
})


app.listen(process.env.PORT, () => {
    console.log("app is live on", process.env.PORT)
})