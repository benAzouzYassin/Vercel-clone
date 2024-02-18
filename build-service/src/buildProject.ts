import { exec } from "child_process"

export function buildProject(projectId: string) {
    console.log("started building " + projectId)
    return new Promise((resolve, reject) => {
        exec(`cd ./downloaded-files/${projectId}`, async (err) => {
            if (err) throw new Error(err?.message)
            await verifyBuildCommand(projectId)
            const buildResult = await startBuilding(projectId)
            if (buildResult) {
                resolve(true)
            } else {
                reject(false)
            }

        })

    })

}

function startBuilding(projectId: string): Promise<{ success: boolean, error: Error | null }> {
    return new Promise<{ success: boolean, error: Error | null }>((resolve, reject) => {
        exec(`cd ./downloaded-files/${projectId} && npm install && npm run build `, (err, stdout) => {
            if (err) {
                console.log("error while executing build command")
                reject({ success: false, error: err })
            } else {
                resolve({ success: true, error: null })
            }
        })
    })
}
//TODO containerize before build
function verifyBuildCommand(projectId: string) {
    return new Promise((resolve, reject) => {
        exec(`cd ./downloaded-files/${projectId} && cat package.json`, (err, output) => {
            if (err) {
                reject(`Error while getting the package.json: ${err.message}`);
                return;
            }
            let buildCommand;
            try {
                buildCommand = JSON.parse(output)?.scripts?.build;
            } catch (parseError: any) {
                reject(`Failed to parse package.json: ${parseError?.message}`);
                return;
            }

            if (!buildCommand) {
                reject("Build command not found in package.json");
                return;
            }

            const disallowedKeywords = ["sudo", "apt-get", "apt", "cat", ".env", "rm", ";", "|", ">", "cd", "curl", "curl", "<", "$(", "shutdown", "reboot"];
            for (const keyword of disallowedKeywords) {
                if (buildCommand.includes(keyword)) {

                    reject(`Harmful build command detected: ${buildCommand}, harmful keyword : ${keyword} `);
                    return;
                }
            }
            resolve(buildCommand);
        });
    });
}