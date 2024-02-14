import { readdirSync, statSync } from "fs"

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
