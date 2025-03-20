const { Op } = require("sequelize");
const { Task } = require("../models");

exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({ message: "El título es obligatorio" });
        }

        const newTask = await Task.create({
            title,
            description,
            dueDate,
            status: "pendiente",
            userId: req.user.userId,
        });

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const { status, search, fromDate, toDate } = req.query;
        const filters = { userId: req.user.userId };
        if (status) {
          filters.status = status;
        }
        if (search) {
          filters.title = { [Op.iLike]: `%${search}%` };
        }
        if (fromDate && toDate) {
          filters.dueDate = { [Op.between]: [fromDate, toDate] };
        }
        const tasks = await Task.findAll({ where: filters });
        res.json(tasks);
      } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
      }
};
exports.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({
          where: { id, userId: req.user.userId },
        });
    
        if (!task) {
          return res.status(404).json({ message: "Tarea no encontrada" });
        }
    
        res.json(task);
      } catch (error) {
        console.error("Error al obtener tarea:", error);
        res.status(500).json({ message: "Error interno del servidor" });
      }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, dueDate } = req.body;

        const task = await Task.findOne({ where: { id, userId: req.user.userId } });

        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        if (task.status === "completada") {
            return res.status(400).json({ message: "No puedes modificar una tarea completada" });
        }

        if (status === "pendiente" && task.status !== "pendiente") {
            return res.status(400).json({ message: "No puedes volver una tarea a 'pendiente'" });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;

        if (status) {
            if (
                (status === "en progreso" && task.status !== "pendiente") ||
                (status === "completada" && task.status !== "en progreso")
            ) {
                return res.status(400).json({ message: "Cambio de estado no permitido" });
            }
            task.status = status;
        }

        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOne({ where: { id, userId: req.user.userId } });

        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        await task.destroy();
        res.json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};
