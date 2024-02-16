import { serviceAccount } from "./firebaseSecret.js"
import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';


const firebaseApp = initializeApp({
    credential: cert({ clientEmail: serviceAccount.client_email, privateKey: serviceAccount.private_key, projectId: serviceAccount.project_id }),
    storageBucket: "gs://vercel-clone-35033.appspot.com"
});

export const storage = getStorage(firebaseApp);