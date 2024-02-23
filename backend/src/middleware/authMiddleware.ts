import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
    githubToken?: string;
}

export function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
    const accessToken = req.cookies['access_token'];
    const refreshToken = req.cookies['refresh_token'];
    if (!accessToken) {
        return res.sendStatus(401); // Unauthorized
    }

    try {
        const payload = jwt.verify(accessToken, process.env.SECRET_KEY!) as jwt.JwtPayload;
        req.githubToken = payload.githubToken;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            // Attempt to use the refresh token
            console.log("trying to refresh the token")
            jwt.verify(refreshToken, process.env.SECRET_KEY!, (err: any, decoded: any) => {
                if (err) {
                    console.error(" refresh the token is invalid")

                    return res.status(401).send({ error: "Invalid refresh token" });
                }

                const payload = decoded as jwt.JwtPayload;
                const jwtAccessToken = jwt.sign(
                    { userId: payload.userId, githubToken: payload.githubToken },
                    process.env.SECRET_KEY!,
                    { expiresIn: "1m" }
                );

                res.cookie("access_token", jwtAccessToken, { httpOnly: true, secure: !!process.env.PRODUCTION });
                req.githubToken = payload.githubToken;
                next();
            });
        } else {
            // For any other errors, send a Forbidden status
            res.sendStatus(403);
        }
    }
}
