import { serviceAccount } from "./firebaseSecret.js"
import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';


const firebaseApp = initializeApp({
    credential: cert({ clientEmail: serviceAccount.client_email, privateKey: serviceAccount.private_key, projectId: serviceAccount.project_id }),
    storageBucket: "gs://vercel-clone-35033.appspot.com"
});

const bucket = getStorage(firebaseApp).bucket()

export async function getFile(projectId: string, file: string) {

    file = file === "" ? "index.html" : file
    const path = `/builds/${projectId}/dist/${file}`
    const [fileBuffer] = await bucket.file(path).download()

    return fileBuffer
}
