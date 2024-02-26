import { Request, Response } from "express"
import axios from "axios"
import { Octokit } from "octokit"
import { prisma } from "../lib/prisma.js"
import jwt from "jsonwebtoken"

export async function handleGithubAuth(req: Request, res: Response) {
    console.log("github auth")
    try {
        const code = req.query["code"]

        const client_id = process.env.GITHUB_CLIENT_ID
        const client_secret = process.env.GITHUB_SECRET
        const redirect_uri = process.env.GITHUB_CALLBACK_URL

        const { data } = await axios.post("https://github.com/login/oauth/access_token", { client_id, client_secret, redirect_uri, code }, { headers: { "Accept": "application/json" } })
        const token = data?.access_token

        const { jwtAccessToken, jwtRefreshToken } = await saveUserIfNotExist(token)

        const cookiesOptions = {
            httpOnly: true,
            secure: !!process.env.PRODUCTION
        }


        res.cookie("access_token", jwtAccessToken, cookiesOptions)
        res.cookie("refresh_token", jwtRefreshToken, cookiesOptions)

        res.redirect(process.env.FRONTEND_URL ?? "")
    } catch (error) {
        res.status(403).send("error")
    }
}

async function saveUserIfNotExist(githubAccessToken: string) {

    const octokit = new Octokit({
        auth: githubAccessToken
    })

    const { data } = await octokit.request('GET /user/emails', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    const email = data[0].email
    let user = await prisma.githubUser.findFirst({ where: { email } })
    if (!user) {
        user = await prisma.githubUser.create({ data: { email } })
    }
    const newSession = await prisma.session.create({ data: { isValid: true, githubUserId: user.id } })

    const jwtAccessToken = jwt.sign({ userId: user.id, githubToken: githubAccessToken }, process.env.SECRET_KEY!, { expiresIn: "15s" });
    const jwtRefreshToken = jwt.sign({ sessionId: newSession.id, userId: user.id, githubToken: githubAccessToken }, process.env.SECRET_KEY!, { expiresIn: "1y" });

    return { user, jwtRefreshToken, jwtAccessToken }
}

export function handleLogout(req: Request, res: Response) {

    res.clearCookie("access_token")
    res.clearCookie("refresh_token")
    res.send({ success: true })

}