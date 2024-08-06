const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
//tambahin dialect
module.exports = {
  development: {
    username: process.env.db_username,
    password: process.env.db_password,
    database: process.env.db_database,
    host: process.env.db_host,
    port: process.env.db_port,
    dialect: "mysql",
    dialectModule: require('mysql2'),
    dialectOptions: {
      ssl: {
        ca: process.env.DB_CA,
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: process.env.db_username,
    password: process.env.db_password,
    database: process.env.db_database,
    host: process.env.db_host,
    port: process.env.db_port,
    dialect: "mysql",
    dialectModule: require('mysql2'),
    dialectOptions: {
      ssl: {
        ca: process.env.DB_CA,
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: process.env.db_username,
    password: process.env.db_password,
    database: process.env.db_database,
    host: process.env.db_host,
    port: process.env.db_port,
    dialect: "mysql",
    dialectModule: require('mysql2'),
    dialectOptions: {
      ssl: {
        ca: process.env.DB_CA,
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
