import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';

import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';


const logEvents = async (message, logName) => {
    try {
        const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
        const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
        const logsDir = path.join('logs');

        if (!fs.existsSync(logsDir)) {
            await fsPromises.mkdir(logsDir, { recursive: true });
        }

        await fsPromises.appendFile(path.join(logsDir, logName), logItem);
    } catch (err) {
        console.error('Error writing to log file:', err);
    }
};

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}\t${req.ip}`, 'logs.txt')
    next();
}

export {logEvents, logger};