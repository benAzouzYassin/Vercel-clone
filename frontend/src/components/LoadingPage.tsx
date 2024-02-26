import Loader from "./ui/Loader"
export default function LoadingPage({ message }: { message: string }) {
    return <div className="h-[100vh] w-[100vw] text-white items-center justify-center flex flex-col bg-black">
        <Loader className="w-20 h-20" />
        <p className="w-full text-2xl font-semibold text-center mt-10">{message}</p>
    </div>
}