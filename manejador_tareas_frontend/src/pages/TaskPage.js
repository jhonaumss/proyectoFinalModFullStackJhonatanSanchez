import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import { useNavigate, useParams } from "react-router-dom";

const TaskPage = () => {
    const { taskId } = useParams();
    const { user, logout } = useAuth();
    const [task, setTask] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (taskId) {
          API.get(`/tasks/${taskId}`)
            .then((response) => setTask(response.data))
            .catch((error) => console.error("Error al cargar tarea", error));
        }
      }, [taskId]);

    const handleTaskSaved = () => {
        navigate("/");
    };

    return (
        <div>
            <h2>Bienvenido, {user?.name}</h2>
            <button onClick={logout}>Cerrar Sesión</button>

            <h3>{task ? "Editar Tarea" : "Nueva Tarea"}</h3>
            <TaskForm task={task} onTaskSaved={handleTaskSaved} />
        </div>
    );
};

export default TaskPage;