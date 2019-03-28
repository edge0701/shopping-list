/* tslint:disable:object-literal-sort-keys */

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'shopping',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'shopping',
    host: process.env.DB_HOSTNAME || 'localhost',
    dialect: 'postgresql',
    logging: false, // console.log,
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data',
    seederStorage: 'sequelize',
  },
  test: {
    username: process.env.DB_USERNAME || 'shopping',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'shopping',
    host: process.env.DB_HOSTNAME || 'localhost',
    dialect: 'postgresql',
    logging: false,
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data',
    seederStorage: 'sequelize',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgresql',
    logging: false, // todo: change this to winston
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data',
    seederStorage: 'sequelize',
  },
};
