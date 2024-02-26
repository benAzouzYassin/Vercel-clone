
export default function Auth() {

    const githubClientId = "127f2985fa1a115fb5b5"
    const path = "/deploy"
    const scopes = ["repo", "user:email", "emails:read"].join(" ")
    console.log(scopes)
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&path=${path}&scope=${scopes}`
    console.log(githubAuthUrl)
    return (
        <main className="w-[100vw] h-[100vh] bg-black flex  ">
            <div className="mx-auto w-96  p-5 rounded-md bg-[#ffffff] border-white/10 space-y-6  border  h-fit mt-56   text-black">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Login / Register</h1>
                    <p className="text-gray-500 dark:text-gray-400">Please authenticate with your github</p>
                </div>
                <div className="space-y-4">
                    <div className="h-1"></div>

                    <a href={githubAuthUrl} className="w-[90%] mx-auto rounded-md  px-5 py-2 items-center justify-center    flex text-white bg-black border border-white/20 active:scale-95 transition-transform" >
                        Authenticate with GitHub
                        <img className="bg-black ml-3 rounded-full mb-[2px]" src="/github.svg" width="20" height="20" alt="" />
                    </a>
                    <a className="inline-block w-full text-center text-sm underline" href="https://github.com/signup">
                        Don't have an account?
                    </a>
                </div>
            </div>
        </main>
    )
}
