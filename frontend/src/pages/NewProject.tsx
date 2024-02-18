import { Input } from '@/components/ui/input';
import Nav from '../components/home/Nav';
import { Button } from '@/components/ui/button';
import { Lock } from "lucide-react"



type GitRepo = {
    name: string
    date: string
    isPrivate: boolean
    url: string
}
export function ImportPage() {
    const repositories: GitRepo[] = [
        { name: "vercel clone", isPrivate: true, date: "20/2/2015", url: "" },
        { name: "vercel clone", isPrivate: true, date: "20/2/2015", url: "" },

    ]
    return <main className="min-h-[100vh] bg-black text-white">
        <Nav />
        <div className="px-56  flex flex-col mt-12 justify-center ">
            <h1 className=" ml-[10%] text-3xl font-medium  text-white/90">Let's build Something !</h1>
            <p className=" ml-[10%] text-sm text-white/50">To deploy new project paste it's github link or import it directly.</p>

            <div className="border-2 shadow-lg  shadow-white/10 w-[60vw] mt-10 h-[70vh] my-auto ml-[10%] rounded-md  border-white/20   ">
                <div className='flex mt-6  px-3 gap-2'>
                    <Input type="text" placeholder="Your github repository link... " className="bg-[#111111] border-0  focus-visible:ring-offset-white/20" /> <Button className="bg-white text-black px-10 hover:bg-white/70 active:bg-white/50">Import Project</Button>
                </div>
                <p className="w-full text-center mt-5 text-3xl text-white/40">OR</p>
                <div className="w-[90%] mx-auto  rounded-lg  border-white/20 bg-[#0A0A0A] mt-8 flex flex-col border ">
                    {repositories.map(repo => (
                        <div className="flex  first:rounded-t-lg last:rounded-b-lg items-center border border-white/20  py-2 ">
                            <p className="pl-5 first-letter:uppercase"> {repo.name}</p>{repo.isPrivate && <Lock className=" ml-2 stroke-neutral-600 scale-75" />}
                            <Button className="bg-white/90 text-black px-7 ml-auto mr-5 hover:bg-white/70 active:bg-white/50">Import</Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </main >
}
