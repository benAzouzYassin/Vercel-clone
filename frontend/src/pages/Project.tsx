import Nav from "@/components/home/Nav";
import { Button } from "@/components/ui/button";

type Project = {
    name: string
    url: string
    date: string
    githubUrl: string
    imageUrl: string
    faviconUrl: string
}

export default function Project() {

    return <main className=" text-white  bg-black min-h-[100vh] w-[100vw]" >
        <Nav />

        <div className=" flex items-center  px-44">
            <h1 className="font-medium text-4xl mt-12 text-white/80">Project name</h1>
            <Button className="ml-auto self-end border border-white/10 " >Source code</Button>
            <Button className=" ml-3 self-end px-8 bg-white/90 hover:bg-white/70 active:bg-white/50 text-black" >Visit</Button>
        </div>
        <hr className="mt-12 border-white/10" />
        <div className="px-44">
            <h2 className="mt-6 text-2xl font-medium text-white/80 ">Production Deployment</h2>
            <p className="text-sm text-white/70">The deployment that is available to your users</p>

            <div className="w-full mt-10 h-[55vh] flex bg-[#141414] border border-white/20">
                <div className="bg-white h-[90%] my-auto ml-5 rounded-sm w-96"></div>
                <div className="flex  flex-col w-[70%] px-5  mt-5">

                    <p className="text-lg drop-shadow-sm  font-medium text-neutral-500">Deployment :</p>
                    <a href="" className="text-sm underline underline-offset-4  text-white/90 mt-1">Lorem ipsum dolor  elit. Obcaecati nesciunt recusandae </a>

                    <p className=" mt-8 text-lg drop-shadow-sm  font-medium text-neutral-500">Source code : </p>
                    <a href="" className="text-sm underline underline-offset-4  text-white/90 mt-1">Lorem ipsum dolor  elit. Obcaecati nesciunt recusandae </a>

                    <p className="text-lg  mt-8 drop-shadow-sm  font-medium text-neutral-500">Created :</p>
                    <p className="text-sm mt-1 text-white/80">17 february 2024 (1 day ago) </p>


                    <div className=" flex items-center mt-5 "> <span className="text-lg drop-shadow-sm  font-medium text-neutral-500">Status :</span> <span className="text-neutral-400 mx-1">Live </span><span className="w-3 h-3 mr-2 animate-pulse  bg-green-500 rounded-full"></span> </div>
                    <Button className="mt-auto mb-5 w-full bg-white text-black hover:bg-white/70 active:bg-white:50">Live project</Button>
                </div>
            </div>
        </div>

    </main >
}