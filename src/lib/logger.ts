import * as fs from 'fs';
import * as winston from 'winston';

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp()
  ),
  transports: [
    new winston.transports.File({
      filename: './logs/log.log'
    })
  ]
});

export default logger;
