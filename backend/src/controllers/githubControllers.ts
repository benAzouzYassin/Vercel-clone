import axios from "axios";
import { Request, Response } from "express"
export async function getGithubRepos(req: Request, res: Response) {
    try {
        const { data } = await axios.get('https://api.github.com/user/repos', {
            headers: {
                Authorization: `Bearer ${req.githubToken}`,
            },
        });
        const repos = data.map((repo: any) => ({ name: repo?.name, url: repo?.clone_url, date: repo?.created_at, isPrivate: repo?.visibility === "private" }))
        res.send(repos)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}