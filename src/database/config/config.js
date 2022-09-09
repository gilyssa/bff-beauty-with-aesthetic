require('dotenv').config({ path: __dirname + '/./../../../.env' });

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: 'us-cdbr-east-06.cleardb.net',
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
    },
    timezone: '-03:00',
  },
<<<<<<< HEAD
=======
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: 'us-cdbr-east-06.cleardb.net',
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
    },
    timezone: '-03:00',
  },
>>>>>>> 8e4b11ea68ac919df6adb74cf347e85421b82e4f
};
