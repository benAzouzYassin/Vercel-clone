import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['accessToken'];

    if (token == null) {
        return res.sendStatus(401);
    }
    //@ts-ignore
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            // Detect expired token
            if (err?.name === 'TokenExpiredError') {
                //@ts-ignore
                return res.status(401).json({ error: 'Token expired', expiredAt: err?.expiredAt });
            }
            return res.sendStatus(403);
        }
        //@ts-ignore
        req.user = user;
        next();
    });
}