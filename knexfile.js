// Update with your config settings.
const dbConfig = require('./config/database.js');

module.exports = {

  development: {
    client: 'oracledb',
    connection: dbConfig.hrPool,
    pool: { min: 0, max: 7 },
  },

  staging: {
    client: 'oracledb',
    connection: dbConfig.hrPool,
    pool: { min: 0, max: 7 },
  },

  production: {
    client: 'oracledb',
    connection: dbConfig.hrPool,
    pool: { min: 0, max: 7 },
  },

};
