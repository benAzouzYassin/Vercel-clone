import simpleGit from "simple-git"
import { getRootDirectory } from "./utils.js"

const rootDir = getRootDirectory()
const git = simpleGit()


export function cloneRepo(repoUrl: string, id: string) {
    console.log("cloning git")
    return new Promise((res, rej) => {
        git.clone(repoUrl, `${rootDir}/git-repos/${id}`).then(data => {
            res(true)
        })
            .catch(err => rej(false))
    })
}
