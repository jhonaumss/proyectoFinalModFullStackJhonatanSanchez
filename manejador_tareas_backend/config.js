require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("🟢 Conectado a PostgreSQL en Render");
  } catch (error) {
    console.error("🔴 Error conectando a la base de datos:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
