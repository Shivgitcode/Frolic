import { createLogger, format, transports } from "winston";
import winston from "winston/lib/winston/config";
const { printf, colorize, timestamp, combine, label } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

export const devlogger = createLogger({
	level: "debug",
	format: combine(
		label({ label: "hello" }),
		timestamp({ format: "" }),
		colorize(),
		myFormat,
	),
	transports: [new transports.Console()],
});
