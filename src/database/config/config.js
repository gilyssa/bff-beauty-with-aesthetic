require('dotenv').config({ path: __dirname + '/./../../../.env' });

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE,
    host: 'db4free.net',
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
    },
    timezone: '-03:00',
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE,
    host: 'db4free.net',
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
    },
    timezone: '-03:00',
  },
};
