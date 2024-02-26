import LoadingPage from "@/components/LoadingPage";
import Nav from "@/components/home/Nav";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

type Project = {
    name: string
    url: string
    date: string
    githubUrl: string
    imageUrl: string
    faviconUrl: string
    id: string
    status: string
}

export default function Project() {
    //route protection
    const navigate = useNavigate()
    api.get("/isAuthenticated").catch(() => navigate("/auth"))

    const params = useParams()

    const { data, isLoading, isError } = useQuery({
        queryKey: ["projectData"],
        queryFn: () => api.get(`/user/project/${params["id"]}`)
    })

    const project = data?.data as Partial<Project>
    // const projectUrl = project ? new URL(project?.url).href : ""
    if (isLoading) return <LoadingPage message="getting your project data..." />
    if (!project || isError) return <div className="w-[100vh] h-[100vh] flex items-center justify-center  text-2xl font-medium text-white/60">No project was found.</div>
    return <main className=" text-white  bg-black min-h-[100vh] w-[100vw]" >
        <Nav />

        <div className=" flex items-center  px-44">
            <h1 className="font-medium text-4xl mt-12 text-white/80">{project?.name}</h1>
            <a className="ml-auto self-end" target="_blank" href={project?.githubUrl}><Button className=" border border-white/10 " >Source code</Button></a>
            <a href={project?.url} target="_blank" className=" ml-3 self-end "><Button className="px-8 bg-white/90 hover:bg-white/70 active:bg-white/50 text-black" >Visit</Button></a>
        </div>
        <hr className="mt-12 border-white/10" />
        <div className="px-44">
            <h2 className="mt-6 text-2xl font-medium text-white/80 ">Production Deployment</h2>
            <p className="text-sm text-white/70">The deployment that is available to your users</p>

            <div className="w-full mt-10 h-[55vh] flex bg-[#141414] border border-white/20">
                <div className="bg-gradient-to-tr from-neutral-400 via-neutral-300 to-neutral-400 h-[90%] my-auto ml-5 rounded-sm w-96 "></div>
                <div className="flex  flex-col w-[70%] px-5  mt-5">

                    <p className="text-lg drop-shadow-sm  font-medium text-neutral-500">Deployment :</p>
                    <a target="_blank" href={project?.url} className="text-sm underline underline-offset-4  text-white/90 mt-1">{project?.url} </a>

                    <p className=" mt-8 text-lg drop-shadow-sm  font-medium text-neutral-500">Source code : </p>
                    <a target="_blank" href={project?.githubUrl} className="text-sm underline underline-offset-4  text-white/90 mt-1">{project?.githubUrl}</a>

                    <p className="text-lg  mt-8 drop-shadow-sm  font-medium text-neutral-500">Created :</p>
                    <p className="text-sm mt-1 text-white/80">{project?.date?.split("T").join("/").split(".")[0]} </p>


                    <div className=" flex items-center mt-5 "> <span className="text-lg drop-shadow-sm  font-medium text-neutral-500">Status :</span> <span className="text-neutral-400 mx-1">{project?.status} </span><span className={cn("w-3 h-3 mr-2 animate-pulse  bg-red-500 rounded-full", { "bg-green-500": project.status === "live" })}></span> </div>
                    <a className="mt-auto mb-7" href={project?.url} target="__blank"> <Button className=" w-full bg-white text-black hover:bg-white/70 active:bg-white:50">Live project</Button></a>
                </div>
            </div>
        </div>

    </main >
}