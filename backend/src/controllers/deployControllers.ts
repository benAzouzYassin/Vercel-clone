import axios from "axios"
import { Request, Response } from "express"
import { prisma } from "../lib/prisma"

type ResBody = {
    deployId: string
    deployStatus: string
}



export async function handleDeploy(req: Request, res: Response) {
    const gitRepoUrl = req.body?.repoURL
    if (!gitRepoUrl) return res.status(400).json({ error: "body should contain repoURL propriety." })

    const { data } = await axios.post(process.env?.UPLOAD_SERVICE!, { gitRepoUrl })
    const response: ResBody = { deployId: data?.id, deployStatus: "building" }
    await prisma.project.create({
        data: {
            githubUserId: req.userId,
            faviconUrl: "tes",
            githubUrl: "test",
            imageUrl: "test",
            name: "test",
            url: "test",
            status: "building"
        }
    })
    res.status(201).json(response)
}