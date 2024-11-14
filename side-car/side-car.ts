import { watch, readFile } from 'node:fs/promises';

async function sendLog(log: string) {
    const response = await fetch('http://localhost:3000/api/logs', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: log,
    }).catch(error => console.error(JSON.stringify(error)));

    if (!response) return;

    console.log(response.statusText);
}
const FILE_NAME = 'side-car/logs.json';

/**
 * will read file from a shared volume between itself and the container
 */
async function start() {
    try {
        const watcher = watch(FILE_NAME);
        for await (const event of watcher) {
            if (event.eventType !== 'change') continue;
                const fileContent = await readFile(FILE_NAME, 'utf-8');
                const splitLogs = fileContent.split('\n');
                await Promise.all(splitLogs.map(sendLog));
                // Remove sent logs from end of file
        }
    } catch (err) {
        throw new Error(`file watch failed - ${JSON.stringify(err)}`);
    }
};

start();

