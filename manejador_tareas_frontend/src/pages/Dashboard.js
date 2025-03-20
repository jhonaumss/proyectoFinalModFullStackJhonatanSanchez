import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const res = await API.get("/tasks");
            setTasks(res.data);
        } catch (error) {
            console.error("Error al obtener tareas", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (taskId) => {
        try {
            await API.delete(`/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error("Error al eliminar tarea", error);
        }
    };

    return (
        <div>
            <h2>Bienvenido, {user?.name}</h2>
            <button onClick={logout}>Cerrar Sesión</button>

            <button onClick={() => navigate("/task")}>Nueva Tarea</button>

            <h3>Mis Tareas</h3>
            <TaskList tasks={tasks} onDelete={handleDelete} />
        </div>
    );
};

export default Dashboard;
