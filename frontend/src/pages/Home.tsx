import Utilities from "@/components/home/Utilities"
import Nav from "@/components/home/Nav"
import ProjectCard from "@/components/home/ProjectCard"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/axios"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, } from "react"

type Project = {
    name: string
    url: string
    date: string
    githubUrl: string
    imageUrl: string
    faviconUrl: string
    status: string
    id: string
}

export default function Home() {
    const navigate = useNavigate()
    const [projects, setProjects] = useState<Project[]>([])
    useEffect(() => {
        api.get("/user/projects")
            .then(({ data }) => setProjects(data))
            .catch(err => {
                const status = err?.response?.status
                if (status == 401 || status == 403) navigate("/auth")
            })
    }, [])


    return (<main className="min-h-[100vh] relative  bg-black" >
        <Nav />
        <div className="px-48">
            <Utilities />
            <div className="grid grid-cols-3 gap-5">
                {projects.map(project => (
                    <ProjectCard {...project} key={project.url} />
                ))}
                {projects.length < 1 && <div className=" flex flex-col text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                    <p className=" text-center text-5xl text-white/50">You have no projects</p>
                    <Button className="mt-8 hover:scale-[101%] active:scale-100 transition-transform">Upload Project</Button>

                </div>}
            </div>
        </div>
    </main>)
}

