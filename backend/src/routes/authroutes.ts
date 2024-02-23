import { Router } from "express"
import { handleGithubAuth } from "../controllers/githubAuth.js"
import { handleLogout } from "../controllers/logout.js"

export const authRouter = Router()
// github auth
authRouter.get("/withGithub", handleGithubAuth)
authRouter.get("/logout", handleLogout)