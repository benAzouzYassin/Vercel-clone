import { Router } from "express"
import { handleGithubAuth, handleLogout } from "../controllers/authControllers.js"

export const authRouter = Router()
// github auth
authRouter.get("/withGithub", handleGithubAuth)
authRouter.get("/logout", handleLogout)