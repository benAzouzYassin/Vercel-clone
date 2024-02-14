import { fileURLToPath } from 'url';
import path from 'path';

export function isUrl(str: string) {
    try {
        const url = new URL(str)
        return true
    } catch (error) {
        return false
    }
}

//moving the file util.ts into directory will break this !!
export function getRootDirectory() {
    const fileName = fileURLToPath(import.meta.url);
    const directoryName = path.dirname(fileName);
    return directoryName.slice(0, directoryName.length - 9)
}
export function generateRandomId() {
    const size = Number(process.env?.ID_SIZE) || 5
    return crypto.randomUUID().slice(0, size)
}