import { Request, Response } from "express"
import { prisma } from "../lib/prisma"

export async function getUserProjects(req: Request, res: Response) {
    try {
        const userId = req.userId
        const projects = await prisma.project.findMany({ where: { githubUserId: userId } })
        res.json(projects)
    } catch (error) {
        res.status(500).send({ error: "error while getting user projects " })
    }
}

export async function patchProject(req: Request, res: Response) {
    const projectId = req.body?.projectId
    const status = req.body?.status
    if (!projectId) return res.status(400).send({ error: "request body should have projectId and status properties" })
    try {
        const updatedProject = await prisma.project.update({ where: { id: projectId }, data: { status } })
        res.send({ error: null, message: "updated project successfully", updatedProject })
    } catch (error) {
        res.status(500).send({ error: "error while updating the project" })
    }
}
export async function getProject(req: Request, res: Response) {
    const projectId = req.params?.id
    const userId = req.userId
    try {
        const project = await prisma.project.findFirst({ where: { id: projectId, githubUserId: userId } })
        if (!project) return res.status(404).json({ error: "No project with this id" })
        res.json(project)
    } catch (error) {
        res.status(500).json({ error: "error while trying to get the project" })
    }
}