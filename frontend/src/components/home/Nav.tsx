import { Bell } from "lucide-react"
import { Link } from 'react-router-dom';

export default function Nav() {
    return <div className="w-full items-center  h-12   flex bg-black p-3">
        <Link to="/">
            <img alt="logo" src="/vercel.svg" width="20" height="20" className="w-5  rotate-180 h-5" /></Link>
        <div className=" flex gap-2 items-center">
            <span className=" ml-2 text-white/20 text-[18px]">/</span>
            <span className="ml-1 bg-white w-6 h-6 rounded-full"></span>
            <p className="  text-[16px] text-white/90">benazouzyassine </p>
        </div>
        <div className="ml-auto flex items-center gap-1 mr-5">
            <span className="ring-1 ring-white/20   hover:bg-white/20 peer rounded-full p-[3px]">
                <Bell className="stroke-white/70 scale-[85%] peer-hover:stroke-white" />
            </span>
            <span className="ml-1 bg-white w-7 h-7 rounded-full"></span>

        </div>
    </div>
}