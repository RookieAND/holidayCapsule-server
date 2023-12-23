import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import winston from 'winston';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault('Asia/Seoul');

const { combine, timestamp, printf, align, colorize } = winston.format;

/**
 * 현재 시간을 timeStamp 형식으로 출력하는 함수 timeStamp
 * @returns YYYY-MM-DD HH:mm:ss
 */
const timeStamp = () => dayjs().tz().format('YYYY-MM-DD HH:mm:ss');

export const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    format: combine(
        timestamp({
            format: timeStamp(),
        }),
        printf(
            (information) =>
                `${information.timestamp} ${information.level} : ${information.message}`,
        ),
        align(),
        colorize({ level: true, message: false }),
    ),
    transports: [new winston.transports.Console()],
});

// morgan
export const stream = {
    write: (message: string) => {
        logger.info(message);
    },
};
