/* tslint:disable:object-literal-sort-keys */
import { format, transports } from 'winston';

import { AppConfig } from '.';

const config: AppConfig = {
  http: {
    port: parseInt(process.env.HTTP_PORT, 10),
  },
  logger: {
    level: 'warn',
    transports: [
      new transports.Console({
        format: format.combine(
          format.timestamp(),
          format.colorize(),
          format.splat(),
          format.simple(),
        ),
      }),
    ],
  },
};

export default config;
