import { generateMock } from '@anatine/zod-mock';
import { logCreateZodSchema } from '../modules/logger/dtos/log-create.dto';

function generateMocks(amount: number) {
    return [...Array(amount)].map(() => generateMock(logCreateZodSchema));
}

async function sendLog(mock: unknown) {
    const response = await fetch('http://localhost:3000/api/logs', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(mock)
    }).catch(error => console.error(JSON.stringify(error)));

    if (!response) return;

    console.log(response.statusText);
}

async function createLogs(amount: number) {
    const mocks = generateMocks(amount);

    Promise.all(mocks.map(sendLog));
};

createLogs(100);