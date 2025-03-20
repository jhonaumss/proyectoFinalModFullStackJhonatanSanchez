import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const TaskList = ({ tasks, onDelete }) => {
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const navigate = useNavigate();

  const markAsCompleted = async (taskId) => {
    try {
      await API.patch(`/tasks/${taskId}`, { status: "completada" });
    } catch (error) {
      console.error("Error al completar tarea", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (filterStatus === "" || task.status === filterStatus) &&
      (filterDate === "" || task.dueDate?.startsWith(filterDate))
    );
  });

  const onEdit = (taskId) => {
    navigate(`/task/${taskId}`);
  }

  return (
    <div>
      <h3>Filtrar Tareas</h3>
      <select onChange={(e) => setFilterStatus(e.target.value)}>
        <option value="">Todos</option>
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En Progreso</option>
        <option value="completada">Completada</option>
      </select>
      <input type="date" onChange={(e) => setFilterDate(e.target.value)} />

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Estado: {task.status}</p>
            <p>Fecha límite: {task.dueDate ? task.dueDate.split("T")[0] : "No definida"}</p>

            {task.status !== "completada" && (
              <button onClick={() => onEdit(task.id)}>Editar</button>
            )}
            {task.status === "en progreso" && (
              <button onClick={() => markAsCompleted(task.id)}>Completar</button>
            )}
            <button onClick={() => onDelete(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
