import { createLogger, format, transports } from "winston";
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
