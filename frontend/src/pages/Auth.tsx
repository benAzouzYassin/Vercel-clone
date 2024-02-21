
import { Button } from "@/components/ui/button"

export default function Auth() {
    const handleLogin = async () => {
    }

    return (
        <main className="w-[100vw] h-[100vh] bg-black flex  ">
            <div className="mx-auto w-96  p-5 rounded-md bg-[#ffffff] border-white/10 space-y-6  border  h-fit mt-56   text-black">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Login / Register</h1>
                    <p className="text-gray-500 dark:text-gray-400">Please authenticate with your github</p>
                </div>
                <div className="space-y-4">
                    <div className="h-1"></div>
                    <Button onClick={() => handleLogin} className="w-full   text-white bg-black border border-white/20" >
                        Login with GitHub
                        <img className="bg-black ml-3 rounded-full mb-[2px]" src="/github.svg" width="20" height="20" alt="" />
                    </Button>
                    <a className="inline-block w-full text-center text-sm underline" href="#">
                        Don't have an account?
                    </a>
                </div>
            </div>
        </main>
    )
}
