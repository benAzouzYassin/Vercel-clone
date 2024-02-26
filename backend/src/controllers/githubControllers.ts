import axios from "axios";
import { Request, Response } from "express"
export async function getGithubRepos(req: Request, res: Response) {
    try {
        console.log(req.githubToken)
        const { data } = await axios.get('https://api.github.com/user/repos', {
            headers: {
                Authorization: `Bearer ${req.githubToken}`,
            },
        });
        const repos = data.map((repo: any) => ({ name: repo?.name, url: repo?.clone_url, date: repo?.created_at, isPrivate: repo?.visibility === "private" }))
        res.send(repos)
    } catch (error) {

        res.sendStatus(500)
    }
    // 2c4efeeb-e889-4efe-bec3-deaf554c9fdc
    // 2c4efeeb-e889-4efe-bec3-deaf554c9fdc
}