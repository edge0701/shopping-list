/* tslint:disable:no-var-requires */

import development from './config.development';
import production from './config.production';
import test from './config.testing';
const db = require('./database');

type EnvironmentType = 'development'|'production'|'testing';
export enum Environment {
  development,
  production,
  testing,
}

export interface AppConfig {
  http: {
    port: number;
  };
  logger: {
    level: string;
    transports: any[];
  };
}

interface AppConfigs {
  development: AppConfig;
  production: AppConfig;
  test: AppConfig;
}

const config: AppConfigs = {
  development,
  production,
  test,
};

if (process.env.npm_lifecycle_event === 'test') {
  process.env.NODE_ENV = 'test';
}

if (!process.env.NODE_ENV || process.env.NODE_ENV.length === 0) {
  process.env.NODE_ENV = 'development';
}

export const database = db[process.env.NODE_ENV];
export const env: Environment = Object.values(Environment).find(e => e === process.env.NODE_ENV);
export default (config[process.env.NODE_ENV] as AppConfig);
