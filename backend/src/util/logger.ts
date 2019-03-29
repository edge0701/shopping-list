/* tslint:disable:no-console */

import * as winston from 'winston';

import config from '../config';

const logger: winston.Logger = winston.createLogger({
  level: config.logger.level,
  transports: config.logger.transports,
});

logger.on('error', (err) => { console.error('winston error', err); });

export default logger;
