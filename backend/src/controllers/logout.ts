import { Request, Response } from "express"
export function handleLogout(req: Request, res: Response) {

    res.clearCookie("access_token")
    res.clearCookie("refresh_token")
    res.send({ success: true })

}