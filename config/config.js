const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

module.exports = {
  development: {
    username: process.env.db_username,
    password: process.env.db_password,
    database: process.env.db_database,
    host: process.env.db_host,
    port: process.env.db_port,
    dialect: "mysql",
    dialectModule: mysql2,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
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
    dialectModule: mysql2,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
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
    dialectModule: mysql2,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      },
    },
  },
};
