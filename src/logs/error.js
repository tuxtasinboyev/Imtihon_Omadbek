import winston from "winston";
import path from "path"
const logger = winston.createLogger({
    level: "error",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH-mm-ss" }),
        winston.format.printf(({ timestamp, level, message }) => {
            return ` ${timestamp}-${level}-${message}`
        })
    ),
    transports: [
        new winston.transports.File({ filename: path.join(process.cwd(), "src", "logs", "error.log") })
    ]
})
export default logger