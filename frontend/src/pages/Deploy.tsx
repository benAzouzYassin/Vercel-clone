import Nav from "@/components/home/Nav";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";

type GitRepo = {
    name: string
    date: string
    isPrivate: boolean
    url: string
}

export function Deploy() {
    const project: GitRepo = { name: "vercel clone", date: "1/2/2", isPrivate: false, url: "https://excalidraw.com/" }
    return <main className="min-h-[100vh] bg-black text-white z-20 relative">
        <Nav />
        <div className="px-16 ml-[10%]  flex flex-col mt-12 justify-center z-50 ">
            <div className="w-96 ">

                <span className=" hover:bg-[#101010] w-fit rounded-full p-1 px-2 hover:scale-105 active:scale-100 transition-transform -ml-3 flex text-sm  text-[#a1a1a1]  ">
                    <ArrowLeft className="scale-75 stroke-[#1a1a1a mt-[1px]" /> <Link to="/import">Back</Link>
                </span>
                <h1 className=" mt-5 text-3xl font-medium  text-white/90">We are almost done !</h1>
                <p className=" text-sm text-white/50">we just need to configure your project and deploy it.</p>
                <a href={project.url} target="_blank" className="flex hover:opacity-75 hover:cursor-pointer items-center justify-center gap-2 w-64 h-16 bg-[#2e2e2e] rounded-sm mt-14">
                    <img src="/github.svg" alt="" width="40" height="40" />
                    <p className="text-lg font-medium">{project.name}</p>
                </a>
                <div className="mt-16 flex gap-1 flex-col">
                    <p className="flex items-center gap-2 "> <span className="w-2 h-2 rounded-full bg-white"></span>Configure Project </p>
                    <div className="w-[2px] ml-[4px] h-10 -mt-3  bg-neutral-500"></div>
                    <p className="flex items-center gap-2 -mt-3 text-neutral-500 "> <span className="w-2 h-2 rounded-full bg-neutral-500"></span>Deploy  </p>
                </div>

                <p className="mt-10 font-medium text-neutral-400">Git Repository</p>
                <div className="mt-3 flex gap-2"><img src="/github.svg" alt="github logo" width="20" height="20" /><a href="" className="text-sm underline underline-offset-2">{project.url}</a></div>
                <Link to="/import" className="mt-10 flex items-center font-medium text-sm text-white/50 hover:underline hover:underline-offset-2">Import different repository <ArrowRight className="scale-90 mt-[1px]" /></Link>
                <Link to="/" className="mt-3 flex items-center font-medium text-sm text-white/50 hover:underline hover:underline-offset-2">Back to dashboard <ArrowRight className="scale-90 mt-[1px]" /></Link>
            </div>
        </div>

        <div className="border   p-5 bg-[#111111] absolute border-white/20 rounded-sm  w-[50vw] h-[60vh] left-[70%] -translate-x-1/2 top-[55%] -translate-y-1/2" >
            <p className="font-bold text-3xl text-white/80" >Configure project</p>
            <hr className="mt-5 w-72 border-white/20" />
            <br />

            <Label className="text-white/60 text-sm">Project name</Label>
            <Input className="mt-1 border-white/20 focus-visible:ring-offset-0 focus-visible:ring-0 bg-[#131313]" type="text" placeholder="Project name..." />
            <br />
            <Label className="text-white/60 text-sm">Framework Preset</Label>
            <Select>
                <SelectTrigger className="mt-1 border-white/20 w-[30%] focus-visible:outline-offset-0 focus-visible:outline-0 bg-[#131313]">
                    <SelectValue placeholder="Select your framework" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a0a] text-white  border-black/10">
                    <SelectItem className="focus:bg-[#181818]  focus:text-white " value="react">React</SelectItem>
                    <SelectItem className="focus:bg-[#181818] focus:text-white " value="vue">Vue</SelectItem>
                    <SelectItem className="focus:bg-[#181818] focus:text-white " value="angular">Svelete</SelectItem>
                    <SelectItem className="focus:bg-[#181818] focus:text-white " value="svelte">Angular</SelectItem>
                </SelectContent>
            </Select>
            <br />
            <Label className="text-white/60 text-sm">Build command</Label>
            <Input className="mt-1 border-white/20 focus-visible:ring-offset-0 focus-visible:ring-0 bg-[#131313]" type="text" placeholder="Project name..." />

            <Button className=" mt-12 w-full text-black  bg-white hover:bg-white/70 active:bg-white/50">Deploy</Button>
        </div>
        <div className="w-full bg-[#141414] h-[55vh] absolute -z-10 bottom-0"></div>
    </main>

}