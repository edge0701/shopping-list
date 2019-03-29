/* tslint:disable:object-literal-sort-keys */
import { format, transports } from 'winston';

import { AppConfig } from '.';

const config: AppConfig = {
  http: {
    port: 10001,
  },
  logger: {
    level: 'debug',
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.splat(),
          format.simple(),
        ),
      }),
    ],
  },
};

export default config;
