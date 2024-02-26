import { cn } from "@/lib/utils";

export default function Loader({ className }: { className?: string }) {
    return <div className={cn("w-16 h-16 rounded-full border-[8px] border-gray-200 border-t-gray-600 animate-spin", className)}></div>

}