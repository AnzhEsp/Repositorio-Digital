const { Sequelize } = require("sequelize");
const configDb = new Sequelize({
  host: "localhost",
  username: "postgres",
  password: "root",
  database: "repositorio",
  dialect: "postgres",
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = configDb;
