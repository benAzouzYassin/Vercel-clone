import { Router } from "express"
import { getUserProjects } from "../controllers/userDataControllers"

export const userRouter = Router()


userRouter.get("/projects", getUserProjects)