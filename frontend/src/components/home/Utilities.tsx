import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils";
import { Search, LayoutListIcon, LucideLayoutGrid } from "lucide-react"
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function Utilities() {
    const navigate = useNavigate()
    const commonClassName = "border-white/10 text-white bg-[#0a0a0a]  border border-white/10 focus-visible:ring-offset-white/20"
    return <div className="flex  h-20 gap-2 justify-center mt-20">
        <div className="w-[60%] relative h-fit">
            <Input placeholder="Search Projects..." type="text" className={cn("pl-10", commonClassName)} />
            <Search className="absolute left-3  stroke-white/50 top-1/2 -translate-y-1/2" />
        </div>
        <Select >
            <SelectTrigger className={cn("w-[15%] border-transparent focus:ring-transparent focus-visible:border-transparent  border-[#939393]", commonClassName)}>
                <SelectValue defaultValue={"activity"} placeholder="Sort by activity" />
            </SelectTrigger>
            <SelectContent className="bg-[#0a0a0a] text-white  border-black/10">
                <SelectItem className="focus:bg-[#181818]  focus:text-white " value="activity">Sort by activity</SelectItem>
                <SelectItem className="focus:bg-[#181818] focus:text-white " value="name">Sort by name</SelectItem>
            </SelectContent>
        </Select>
        <ToggleGroup defaultValue="grid" type="single" className={cn("h-10 rounded-md ", commonClassName)} >
            <ToggleGroupItem value="grid" className="data-[state=on]:bg-white/90"><LucideLayoutGrid /></ToggleGroupItem>
            <ToggleGroupItem value="list" className="data-[state=on]:bg-white/90"><LayoutListIcon /></ToggleGroupItem>
        </ToggleGroup>
        <Button onClick={() => navigate("/import")} className="bg-white/90 text-black hover:bg-white/50 active:bg-white/30 w-[15%]">Add new project </Button>
    </div>
}