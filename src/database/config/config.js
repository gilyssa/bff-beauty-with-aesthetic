require('dotenv').config({ path: __dirname + '/./../../../.env' });

module.exports = {
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: 'mysql04-farm36.kinghost.net',
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
    },
    timezone: '-03:00',
  },
};
