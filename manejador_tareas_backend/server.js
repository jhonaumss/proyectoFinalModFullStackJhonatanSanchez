require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB, sequelize } = require("./config");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Iniciar Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
