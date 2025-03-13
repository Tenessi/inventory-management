const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '.env')
});

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port:     process.env.DB_PORT,
      host:     process.env.DB_HOST
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, 'src/db/migrations')
    }
  },

};
