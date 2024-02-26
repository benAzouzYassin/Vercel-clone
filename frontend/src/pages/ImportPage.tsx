import { Input } from '@/components/ui/input';
import Nav from '../components/home/Nav';
import { Button } from '@/components/ui/button';
import { Lock, AlertTriangle, LucideLoader, CheckCircle2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import Loader from '@/components/ui/Loader';
import { toast, Toaster } from "sonner"
import { useCallback, useEffect, useState } from 'react';
import LoadingPage from '@/components/LoadingPage';
import { useNavigate } from 'react-router-dom';

type GitRepo = {
    name: string
    date: string
    isPrivate: boolean
    url: string
}

const REQUESTS_SERVICE_URL = "localhost:3001"
const STATUS_POLLING_TIMES = 120
type DeployStatus = "uploading" | "building" | "live" | "failed" | null

const toastError = (message: string) => toast.error(<div className="text-xs font-bold flex items-center gap-1"><AlertTriangle className=" fill-red-600 stroke-white" />{message}</div>)
const toastMessage = (message: string) => toast.message(<div className="text-xs  font-bold flex items-center gap-1"><LucideLoader className=" fill-black stroke-black scale-75 stroke-[3px]" />{message}</div>)
const toastSuccess = (message: string) => toast.success(<div className="text-xs font-bold flex items-center gap-1"><CheckCircle2 className=" fill-green-600 stroke-white" />{message}</div>)
const wait = (t: number) => new Promise(res => setTimeout(res, t))
export function ImportPage() {
    //route protection
    const navigate = useNavigate()
    api.get("/isAuthenticated").
        catch(() => navigate("/auth"))

    const query = useQuery({
        queryKey: ["githubRepos"],
        queryFn: async () => {
            const { data } = await api.get("/github/repos")
            return data
        },

    })
    const [searchInput, setSearchInput] = useState("")
    const [repositories, setRepositories] = useState(query?.data)
    const [deployedId, setDeployId] = useState("")
    const [deployStatus, setDeployStatus] = useState<DeployStatus>(null)
    const [deployBtnLoading, setDeployBtnLoading] = useState(false)

    console.log(deployStatus)
    const handleSearch = () => {
        setRepositories(query?.data?.filter(((repo: GitRepo) => repo.name.toLowerCase().includes(searchInput.toLowerCase()))))
    }

    const getProjectStatus = useCallback(async (id: string) => {
        let i = 0
        while (i < STATUS_POLLING_TIMES) {
            await wait(2000) //POLL DATA EVERY 2 seconds
            try {

                const { data } = await api.get(`/projectStatus/${id}`)
                switch (data?.deployStatus) {
                    case "live":
                        setDeployStatus("live")
                        toastSuccess("deployment succeeded ! ")
                        api.patch("/user/project", { status: "live", projectId: id }).catch(err => console.error(err))
                        window.location.replace("http://" + id + "." + REQUESTS_SERVICE_URL)
                        i = STATUS_POLLING_TIMES // stops the polling
                        break;

                    case "failed":
                        setDeployStatus(null)
                        setDeployId("")
                        api.patch("/user/project", { status: "failed", projectId: id }).catch(err => console.error(err))
                        toastError("deployment failed.")
                        i = STATUS_POLLING_TIMES // stops the polling
                        break;
                    case "building":

                        setDeployStatus("building")
                        break;
                    default:
                        break
                }
                i += 1
            } catch (error) {
                toastError("deployment failed.")
                setDeployStatus(null)
                i = STATUS_POLLING_TIMES
                console.log("error while polling the data")
                break
            }
        }
    }, [])

    useEffect(() => {
        if (deployedId) {
            getProjectStatus(deployedId)
        }
    }, [deployedId]);


    const [deployBtnIndex, setDeployBtnIndex] = useState(-1)
    const handleDeploy = (repo: GitRepo, index: number) => {
        setDeployBtnIndex(index)
        if (repo.isPrivate) {
            toastError("can't deploy a private repository")
            return
        }
        setDeployBtnLoading(true)
        api.post("/deployProject", { repoURL: repo.url })
            .then((res => {
                setDeployBtnLoading(false)
                if (res.data && res.data?.deployId) {
                    const deployId = res.data?.deployId
                    setDeployId(res.data?.deployId)
                    setDeployStatus(res.data?.deployStatus)
                    toastSuccess(`your project is uploaded ${deployId}`)
                    getProjectStatus(deployId)
                }
            }))
            .catch(err => {
                setDeployBtnLoading(false)
                console.error(err)
                toastError("error while deploying your app.")
            })

        toastMessage("Deploying your repository...")
    }


    //Effects
    useEffect(() => {
        setRepositories(query?.data)
    }, [query?.data])
    useEffect(() => {
        handleSearch()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput])

    if (query?.isError) {
        toastError("error while getting your data.")
    }


    if (deployStatus === "building") return <LoadingPage message="Deploying your project..." />
    return <main className="min-h-[100vh] bg-black text-white">
        <Nav />
        <div className="px-56  flex flex-col mt-12 pb-5 justify-center ">
            <h1 className=" ml-[10%] text-3xl font-medium  text-white/90">Let's build Something !</h1>
            <p className=" ml-[10%] text-sm text-white/50">To deploy new project paste it's github link or import it directly.</p>

            <div className="border-2 shadow-lg  pb-5 shadow-white/10 w-[60vw] mt-10 min-h-[70vh] my-auto ml-[10%] rounded-md  border-white/20   ">
                <div className='flex mt-6  px-3 gap-2'>
                    <Input onChange={(e) => setSearchInput(e.target.value)} value={searchInput} type="text" placeholder="Search a github repository... " className="bg-[#111111] border-0  focus-visible:ring-offset-white/20" /> <Button onClick={handleSearch} className="bg-white text-black px-6 hover:bg-white/70 active:bg-white/50">Search a repository</Button>
                </div>
                <p className="w-full text-center mt-5  text-3xl text-white/40"></p>
                <div className="w-[90%] mx-auto h-fit min-h-[50vh]  rounded-lg  border-white/20 bg-[#0A0A0A] mt-8 flex flex-col border ">

                    {repositories?.map((repo: GitRepo, index: number) => (
                        <div key={repo.url} className="flex  first:rounded-t-lg last:rounded-b-lg items-center border border-white/20   py-2 ">
                            <p className="pl-5 first-letter:uppercase"> {repo.name}</p>{repo.isPrivate && <Lock className=" ml-2 stroke-neutral-600 scale-75" />}
                            <Button onClick={() => handleDeploy(repo, index)} className="bg-white/90 text-black px-7 ml-auto mr-5 hover:bg-white/70 active:bg-white/50" disabled={deployBtnLoading}>{deployBtnLoading && deployBtnIndex === index ? <Loader className="w-5 h-5 border-4" /> : "Deploy"}</Button>
                        </div>
                    ))}
                    {query?.isLoading && <Loader className="m-auto opacity-50 w-20  h-20" />}
                </div>
            </div>
        </div>
        <Toaster richColors />
    </main >
}
