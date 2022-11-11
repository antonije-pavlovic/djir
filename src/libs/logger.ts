import winston, { Logger, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
/**
 * TODO: This should be thread safe
 */
class CustomLogger {
  private static instance: CustomLogger;
  private infoLoger: Logger;
  private errorLogger: Logger;
  private debugLogger: Logger;

  constructor() {
    this.createErrorLogger();
    this.createInfoLogger();
    this.createDebugLogger();
  }

  public static getInstance(): CustomLogger {
    if(!CustomLogger.instance) {
      CustomLogger.instance = new CustomLogger();
    }

    return CustomLogger.instance;
  }

  private createErrorLogger() {
    const transport =  new DailyRotateFile({
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      dirname: './logs/error/',
    });

    this.errorLogger = winston.createLogger({
      level: 'error',
      format: format.combine(
        format.timestamp(),
        format.json()
      ),
      transports: [
        transport
      ],
    });
  }

  private createInfoLogger() {
    const transport =  new DailyRotateFile({
      filename: 'info-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      dirname: './logs/info/'
    });

    this.infoLoger = winston.createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.json()
      ),
      transports: [
        transport
      ],
    });
  }

  private createDebugLogger() {
    this.debugLogger = winston.createLogger({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.align(),
        format.printf(info => `${info.timestamp}   ${info.level}: ${info.message}`)
      ),
      transports: [
        new winston.transports.Console(),
      ],
    });
  }

  public error(message: string) {
    this.errorLogger.error(message);
  }

  public info(message: string) {
    this.infoLoger.info(message);
  }

  public debug(message: string) {
    this.debugLogger.debug( message);
  }

}

export default CustomLogger.getInstance();