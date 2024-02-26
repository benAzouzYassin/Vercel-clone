import { Router } from "express"
import { getGithubRepos } from "../controllers/githubControllers.js"


export const githubRouter = Router()

githubRouter.get("/repos", getGithubRepos)

