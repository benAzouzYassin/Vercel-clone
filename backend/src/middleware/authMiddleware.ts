import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

//extending the Request type
declare module "express" {
    interface Request {
        githubToken?: boolean;
        userId?: string
    }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies['access_token'];
    const refreshToken = req.cookies['refresh_token'];
    if (!accessToken) {
        return res.sendStatus(401);
    }

    try {
        const payload = jwt.verify(accessToken, process.env.SECRET_KEY!) as jwt.JwtPayload;
        req.githubToken = payload.githubToken;
        req.githubToken = payload.userId;
        next();

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            // Attempt to use the refresh token
            console.log("trying to refresh the token")
            const { accessToken, userId, githubToken, success, message } = await generateNewToken(refreshToken)
            if (success) {
                res.cookie("access_token", accessToken, { httpOnly: true, secure: !!process.env.PRODUCTION });
                req.githubToken = githubToken;
                req.githubToken = userId;
                next();
            } else {
                return res.sendStatus(401).send({ message: message })
            }
        } else {
            // For any other errors, send a Forbidden status
            return res.sendStatus(403);
        }
    }
}


async function generateNewToken(refreshToken: string) {
    try {
        const payload = jwt.verify(refreshToken, process.env.SECRET_KEY!) as jwt.JwtPayload;
        const sessionId = payload.sessionId
        const session = await prisma.session.findFirst({ where: { id: sessionId } })
        const jwtAccessToken = jwt.sign(
            { userId: payload.userId, githubToken: payload.githubToken },
            process.env.SECRET_KEY!,
            { expiresIn: "1h" }
        );
        if (session && session.isValid) {
            return { message: "valid session", userId: payload.userId, success: true, githubToken: payload.githubToken, accessToken: jwtAccessToken }
        } else {
            return { message: "invalid session", success: false, userId: null, githubToken: null, accessToken: null }
        }

    } catch (error) {
        return { message: "invalid refresh token", success: false, githubToken: null, userId: null, accessToken: null }
    }
}
