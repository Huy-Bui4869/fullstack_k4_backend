require("dotenv").config;
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_DIALECT } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT || "postgres",
    port: DB_PORT || 5432,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    dialectModule: pg,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT || "postgres",
    port: DB_PORT || 5432,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    dialectModule: pg,
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT || "postgres",
    port: DB_PORT || 5432,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    dialectModule: pg,
  },
};
