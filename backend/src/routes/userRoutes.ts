import { Router } from "express"
import { getProject, getUserProjects, patchProject } from "../controllers/userDataControllers"

export const userRouter = Router()


userRouter.get("/projects", getUserProjects)
userRouter.patch("/project", patchProject)
userRouter.get("/project/:id", getProject)