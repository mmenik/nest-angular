
import { Component } from '@nestjs/common';
import { configure, getLogger, Configuration } from 'log4js';

@Component()
// tslint:disable-next-line:component-class-suffix
export class LogService {
    readonly info;
    readonly warn;
    readonly debug;
    readonly error;

    constructor() {
        const cfg: Configuration = {
            appenders: {
                out: {
                    type: 'console',
                    layout: {
                        type: 'pattern',
                        pattern: '%[[%d{ISO8601}] %-5p%] - %m'
                    }
                },
                file: {
                    type: 'file',
                    layout: {
                        type: 'pattern',
                        pattern: '[%d{ISO8601}] %-5p - %m'
                    },
                    filename: 'logs/app.log',
                    pattern: '-yyyy-MM-dd',
                    maxLogSize: 10485760,
                    numBackups: 3
                }
            },
            categories: {
                default: {
                    appenders: ['out'],
                    level: 'debug'
                }
            }
        };
        configure(cfg);
        const logger = getLogger();
        logger.info(`Create log with level: ${logger.level}`);

        this.info = logger.info.bind(logger);
        this.warn = logger.warn.bind(logger);
        this.debug = logger.debug.bind(logger);
        this.error = logger.error.bind(logger);
    }
}
