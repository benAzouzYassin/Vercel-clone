import Utilities from "@/components/home/Utilities"
import Nav from "@/components/home/Nav"
import ProjectCard from "@/components/home/ProjectCard"
import { Button } from "@/components/ui/button"


type Project = {
    name: string
    url: string
    date: string
    githubUrl: string
    imageUrl: string
    faviconUrl: string
}
export default function Home() {
    const projects: Project[] = [
        // { faviconUrl: "/vercel.svg", date: "17/2/2024", githubUrl: "https://github.com/benAzouzYassin/Portfolio-2.0", imageUrl: "", name: "portfolio", url: "yassine-ben-azouz-123" },
        // { faviconUrl: "/vercel.svg", date: "17/2/2024", githubUrl: "https://github.com/benAzouzYassin/Portfolio-2.0", imageUrl: "", name: "portfolio", url: "yassine-ben-azouz-123" },
        // { faviconUrl: "/vercel.svg", date: "17/2/2024", githubUrl: "https://github.com/benAzouzYassin/Portfolio-2.0", imageUrl: "", name: "portfolio", url: "yassine-ben-azouz-123" },
        // { faviconUrl: "/vercel.svg", date: "17/2/2024", githubUrl: "https://github.com/benAzouzYassin/Portfolio-2.0", imageUrl: "", name: "portfolio", url: "yassine-ben-azouz-123" },
        // { faviconUrl: "/vercel.svg", date: "17/2/2024", githubUrl: "https://github.com/benAzouzYassin/Portfolio-2.0", imageUrl: "", name: "portfolio", url: "yassine-ben-azouz-123" },
        // { faviconUrl: "/vercel.svg", date: "17/2/2024", githubUrl: "https://github.com/benAzouzYassin/Portfolio-2.0", imageUrl: "", name: "portfolio", url: "yassine-ben-azouz-123" }
    ]
    return (<main className="min-h-[100vh] relative  bg-black" >
        <Nav />
        <div className="px-48">
            <Utilities />
            <div className="grid grid-cols-3 gap-5">
                {projects.map(project => (
                    <ProjectCard {...project} />
                ))}
                {projects.length < 1 && <div className=" flex flex-col text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                    <p className=" text-center text-5xl text-white/50">You have no projects</p>
                    <Button className="mt-8 hover:scale-[101%] active:scale-100 transition-transform">Upload Project</Button>

                </div>}
            </div>
        </div>
    </main>)
}

