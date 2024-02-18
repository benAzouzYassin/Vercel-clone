
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default function Login() {
    return (
        <main className="w-[100vw] h-[100vh] bg-black flex  ">
            <div className="mx-auto w-96 p-5 rounded-md bg-[#070707] border-white/10 space-y-6  border  h-fit my-auto   text-white">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-gray-500 dark:text-gray-400">Enter your email below to login to your account</p>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input className="text-black" id="email" placeholder="mail@example.com" required type="email" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input className="text-black" placeholder="***************" id="password" required type="password" />
                    </div>
                    <div className="h-1"></div>
                    <Button className="w-full mt-5 hover:bg-white/70 text-black " variant="outline" type="submit">
                        Login
                    </Button>
                    <Button className="w-full   text-white bg-black border border-white/20" >
                        Login with GitHub
                        <img className="bg-black rounded-full" src="/github.svg" width="20" height="20" alt="" />
                    </Button>
                    <a className="inline-block w-full text-center text-sm underline" href="#">
                        Forgot your password?
                    </a>
                </div>
            </div>
        </main>
    )
}