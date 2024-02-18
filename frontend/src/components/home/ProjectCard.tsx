import { MoreHorizontal } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select"

type Props = {
    name: string
    url: string
    date: string
    githubUrl: string
    imageUrl: string
    faviconUrl: string

}

export default function ProjectCard(props: Props) {

    return <div className="relative text-white w-auto rounded-sm hover:border-white transition-colors hover:cursor-pointer h-40 bg-[#252525]/10 border border-white/10">
        <div className="w-full pl-3 pt-3  h-16 flex">
            <span style={{ backgroundImage: `url(${props.faviconUrl})`, backgroundSize: "50%", backgroundPosition: "center" }} className="border bg-no-repeat   object-contain   border-white/10 rounded-full h-9 w-9 " ></span>
            <div className=" pl-3">
                <p className="text-[20px] pt-1">{props.name}</p>
                <p className="text-[14px] hover:cursor-pointer hover:text-white active:text-white/70 text-white/80  pt-1">{props.url}</p>
            </div>
            <Select >
                <SelectTrigger iconClassName="hidden" className=" bg-transparent ml-auto mr-2 mt-1 border border-white/10 hover:bg-[#252525] h-6 w-fit p-1 rounded-md">
                    <MoreHorizontal />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a0a] text-white  border-black/10">
                    <SelectItem className="focus:bg-[#181818]  focus:text-white " value="Settings">Settings</SelectItem>
                    <SelectItem className="focus:bg-[#181818] focus:text-white text-red-500" value="Delete">Delete</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="flex items-center mt-3 bg-[#111111] rounded-full p-2 gap-2 w-fit ml-5 ">
            <img src="/github.svg" width="20" height="20" alt="github logo" className="ml-1" />
            <a href={props.githubUrl} className="text-[12px] underline underline-offset-2 line-clamp-1">{props.githubUrl}</a>
        </div>
        <p className="left-5 bottom-5 text-[14px] text-white/50 absolute">Uploaded {props.date}</p>
    </div>
}
