import { Router } from "express"
import { handleLogin, handleRegister, handleLogout } from "./controllers/passwordAuth.js"
import { passwordAuthMiddleware } from "./middleware/passwordAuth.js"

export const authRouter = Router()

authRouter.post("/withPassword/register", passwordAuthMiddleware, handleRegister)
authRouter.post("/withPassword/login", passwordAuthMiddleware, handleLogin)
authRouter.post("/withPassword/logout", handleLogout)