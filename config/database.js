module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "timetable",
    host: "127.0.0.1",
    dialect: "postgresql",
    seederStorage: "sequelize"
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "timetable_test",
    host: "127.0.0.1",
    dialect: "postgresql",
    seederStorage: "sequelize"
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: "postgresql",
    seederStorage: "sequelize"
  }
}
