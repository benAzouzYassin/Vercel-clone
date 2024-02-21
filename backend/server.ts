import dotenv from "dotenv"
import express from "express"
import { authRouter } from "./src/routes.js"
import cors from "cors"
import cookieParser from "cookie-parser";

dotenv.config()
const app = express()

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};


app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

app.use("/auth", authRouter)

app.get("/isAuthenticated", (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies)
})

app.get("/", (req, res) => {
    res.send({ work: true })
})

app.listen(process.env.PORT, () => {
    console.log("app is live on", process.env.PORT)
})