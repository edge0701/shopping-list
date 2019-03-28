/* tslint:disable:no-var-requires */

import development from './config.development';
import production from './config.production';
import test from './config.testing';
const db = require('./database');

const config = {
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
export default config[process.env.NODE_ENV];
