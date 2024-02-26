import { readdirSync, statSync } from "fs"
import { getRootDirectory } from "./filesUtils.js"
import { storage } from "./firebase.js"
import path from "path"

const bucket = storage.bucket()

export async function uploadBuildOutput(projectId: string) {
    const dist = getRootDirectory() + `/downloaded-files/${projectId}/dist`
    const distFiles = extractDirFiles(dist)
    const uploadResult = await uploadFiles(distFiles, projectId)
    return uploadResult
}


export function extractDirFiles(dirPath: string) {
    let files: string[] = []
    const elements = readdirSync(dirPath)
    elements.forEach(elem => {
        const stat = statSync(`${dirPath}/${elem}`)
        if (stat.isFile()) {
            files = files.concat([`${dirPath}/${elem}`])
        }

        if (stat.isDirectory()) {
            files = files.concat(extractDirFiles(`${dirPath}/${elem}`))
        }
    })

    return files
}

export async function uploadFiles(dir: string[], projectId: string) {
    console.log("uploading dist of  : ", projectId)
    let isError = false
    const uploadPromises = dir
        .filter(filePath => filePath.split("/")[2] !== ".git")
        .map(filePath => uploadFile(filePath, projectId))
    try {

        const res = await Promise.all(uploadPromises)
        if (res) {
            console.log("done uploading dist : ", projectId)
        }
    } catch (error) {
        isError = true
        console.log("error on src/firebase line 37", error)
    }

    return !isError
}


function uploadFile(file: string, projectId: string) {

    const filePlace = file.split(projectId)[1]
    const fileDestination = path.normalize(`/builds/${projectId}/${filePlace}`)
    return new Promise((res, rej) => {
        bucket.upload(file, { destination: fileDestination }, (err, file) => {
            if (err) {
                console.error("error in src/firebase.ts line 19 : ", err)
                rej("error while uploading " + err?.message ?? "")
            } else {
                res(`uploaded ${file?.name}`)
            }
        })
    })
}