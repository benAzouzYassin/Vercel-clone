import { fileURLToPath } from 'url';
import path from 'path';
import fs, { rm } from "fs"


export function getRootDirectory() {
    const fileName = fileURLToPath(import.meta.url);
    const directoryName = path.dirname(fileName);
    return directoryName.slice(0, directoryName.length - 9)
}

export function createDirIfNotExist(dirPath: string) {

    console.log("checking ", dirPath)
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
    }
}

export function addRootDirToPath(p: string) {
    const rootDir = getRootDirectory()
    const normalizedPath = path.normalize(rootDir + p)
    return normalizedPath
}

export function removerDirAsync(path: string) {
    return new Promise((resolve, reject) => {
        rm(path, { recursive: true }, (err) => {
            if (err) {
                console.error("error while deleting ", path)
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}