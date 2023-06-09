import winston from 'winston';

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level} ${message}`;
});

export const logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "pc-consultoria-log" })
    ],
    format: combine(
        label({ label: "pc-consultoria-api" }),
        timestamp(),
        myFormat
    )
});