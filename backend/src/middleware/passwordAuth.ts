import { Request, Response, NextFunction } from "express"
import { z } from "zod"

const BodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})


export function passwordAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const result = BodySchema.parse(req.body)
        next()

    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error(error)
            res.status(400).json({ error: error.format(), message: "bad email or password format" })
        } else {
            res.status(500).json({ error: "internal server error" })
        }
    }
}