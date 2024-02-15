import { serviceAccount } from "./firebaseSecret.js"
import { initializeApp, cert } from 'firebase-admin/app';
import { Storage, getDownloadURL, getStorage } from 'firebase-admin/storage';
import fs from "fs"
import http from "https"
import path from "path";
import { addRootDirToPath, createDirIfNotExist, getRootDirectory } from "./filesUtils.js";

//TODO download a file from firebase 
//TODO download a hole directory from firebase
// -->
//TODO build the project
//TODO upload the build result 
//TODO figure out how to serve those builds


const firebaseApp = initializeApp({
    credential: cert({ clientEmail: serviceAccount.client_email, privateKey: serviceAccount.private_key, projectId: serviceAccount.project_id }),
    storageBucket: "gs://vercel-clone-35033.appspot.com"
});

const storage = getStorage(firebaseApp);

export async function downloadFolder(id: string) {
    console.log("checking the id : ", id)

    try {
        const [files] = await storage.bucket().getFiles({ prefix: `git-repos/${id}/` })

        if (files.length === 0) return
        createDirIfNotExist(`downloaded-files/${id}`)


        for (const file of files) {
            const url = await getDownloadURL(file)

            // extracting and formatting the file from the firebase download url
            // example : /{uploadId}/index.html
            const extractedPath = url
                .split("git-repos")[1]
                .split("?")[0]
                .split("%2").map(elem => elem.slice(1))
                .join("/")

            const destinationPath = addRootDirToPath(`/downloaded-files/${extractedPath}`)

            //creating empty directories for the files to be saved
            const destinationDir = path.dirname(destinationPath)
            createDirIfNotExist(destinationDir)

            const saving = await saveFile(url, destinationPath).catch(err => console.error(err))
            console.log(saving)
        }
    } catch (error) {
        console.log(error)
    }
}


function saveFile(url: string, destination: string) {

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destination);

        http.get(url, (response) => {
            response.pipe(file);

            file.on("finish", () => {
                file.close();
                resolve("Download Completed");
            });

            file.on("error", (err) => {
                console.error(err)
                reject(err.message)
                console.log("cause ", err.cause)
            })
        });
    })

}
