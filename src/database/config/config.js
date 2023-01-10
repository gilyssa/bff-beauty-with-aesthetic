require('dotenv').config({ path: __dirname + '/./../../../.env' });

module.exports = {
  development: {
    username: 'firminologisti01',
    password: '061346g',
    database: 'firminologisti01',
    host: 'mysql04-farm36.kinghost.net',
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
    },
    timezone: '-03:00',
  },
  production: {
    username: 'firminologisti01',
    password: '061346g',
    database: 'firminologisti01',
    host: 'mysql04-farm36.kinghost.net',
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
    },
    timezone: '-03:00',
  },
};
