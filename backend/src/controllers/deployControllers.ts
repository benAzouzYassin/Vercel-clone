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
    if (!data?.id) {
        return res.send({ error: "error while creating your project id" })
    }
    const projectId = data.id
    const response: ResBody = { deployId: data?.id, deployStatus: "building" }
    const [protocol, host] = process.env.REQUESTS_SERVICE?.split("//")!
    const projectUrl = `${protocol}//${projectId}.${host}`
    try {

        await prisma.project.create({
            data: {
                id: projectId,
                faviconUrl: "",
                githubUrl: gitRepoUrl,
                imageUrl: "",
                name: projectId,
                url: projectUrl,
                status: "building",
                githubUserId: req.userId
            }
        })
        res.status(201).json(response)

    } catch (error) {
        res.status(500).json({ error: "error while saving your project" })

    }
}