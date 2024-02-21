import { Request, Response } from "express"
import { prisma } from "../lib/prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function handleRegister(req: Request, res: Response) {
    const { email, password } = req.body
    try {
        const user = await prisma.user.findFirst({ where: { email } })
        if (user) {
            res.status(400).json({ error: "invalid email or password" })
            return
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await prisma.user.create({ data: { email, hashedPassword } })

        const expiresAt = new Date()
        expiresAt.setHours(expiresAt.getHours() + 24);

        const newSession = await prisma.session.create({ data: { userId: newUser.id, expiresAt } })
        //@ts-ignore
        const accessToken = jwt.sign({ userId: newUser.id, sessionId: newSession.id }, process.env.SECRET_KEY, { expiresIn: "1m" });
        //@ts-ignore
        const refreshToken = jwt.sign({ userId: newUser.id, sessionId: newSession.id }, process.env.SECRET_KEY, { expiresIn: "1y" });
        console.log()
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.status(201).json({ success: true })
    } catch (error) {
        res.status(401).json({ error: "error while trying to authorize" })
    }

}

export async function handleLogin(req: Request, res: Response) {
    const { email, password } = req.body
    try {
        const user = await prisma.user.findFirst({ where: { email } })

        if (!user) {
            res.status(400).json({ error: "invalid email or password" })
            return
        }
        const isValidPassword = await bcrypt.compare(password, user.hashedPassword)
        if (!isValidPassword) {
            res.status(400).json({ error: "invalid email or password" })
            return
        }

        const expiresAt = new Date()
        expiresAt.setHours(expiresAt.getHours() + 24);

        const newSession = await prisma.session.create({ data: { userId: user.id, expiresAt } })
        //@ts-ignore
        const accessToken = jwt.sign({ userId: user.id, sessionId: newSession.id }, process.env.SECRET_KEY, { expiresIn: "1m" });
        //@ts-ignore
        const refreshToken = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: "1y" });
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.status(201).json({ success: true })
    } catch (error) {
        res.status(401).json({ error: "error while trying to authorize" })
    }

}
export async function handleLogout(req: Request, res: Response) {
    try {
        const token = req.cookies['accessToken'];

        if (token == null) return res.sendStatus(401);
        const payload: any = jwt.verify(token, process.env.SECRET_KEY ?? "");
        const sessionId = payload.sessionId;


        await prisma.session.delete({
            where: {
                id: sessionId,
            },
        });

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error(error)
        res.status(401).json({ error: "Error while trying to logout" });
    }
}