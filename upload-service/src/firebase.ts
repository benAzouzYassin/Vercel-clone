import { serviceAccount } from "./firebaseSecret.js"
import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { getRootDirectory } from "./utils.js";


const firebaseApp = initializeApp({
    credential: cert({ clientEmail: serviceAccount.client_email, privateKey: serviceAccount.private_key, projectId: serviceAccount.project_id }),
    storageBucket: "gs://vercel-clone-35033.appspot.com"
});

const bucket = getStorage(firebaseApp).bucket()

function uploadFile(file: string) {

    return new Promise((res, rej) => {
        const localFilePath = getRootDirectory() + "/" + file;
        bucket.upload(localFilePath, { destination: file }, (err, file) => {
            if (err) {
                console.log("error in src/firebase.ts line 19 : ", err)
                rej("error while uploading " + err?.message ?? "")
            } else {
                res("uploaded a file")
            }
        })
    })
}
export async function uploadFiles(dir: string[]) {
    console.log("uploading files of : " , dir)
    let isError = false
    const uploadPromises = dir
        .filter(filePath => filePath.split("/")[2] !== ".git")
        .map(filePath => uploadFile(filePath))
    try {
        console.log("starter uploading all files ! ")
        const res = await Promise.all(uploadPromises)
        console.log(res, "done ")
    } catch (error) {
        isError = true
        console.log("error on src/firebase line 37", error)
    }

    return !isError
}
