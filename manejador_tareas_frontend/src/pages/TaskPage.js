import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';

// Estilos para la página de bienvenida
const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const WelcomeTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  width: 100%;
  text-align: left;
`;

const LogoutButton = styled.button`
  padding: 8px 16px;
  margin-left: auto;
  margin-top: -35px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e63946;
  }
`;

const TaskHeading = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
`;

const TaskFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px; /* Espacio entre los inputs */
  align-items: center;
`;

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
        <WelcomeContainer>
      <WelcomeTitle>Bienvenido, {user?.name}</WelcomeTitle>

      <LogoutButton onClick={logout}>Cerrar Sesión</LogoutButton>

      <TaskHeading>{task ? "Editar Tarea" : "Nueva Tarea"}</TaskHeading>

      {/* Formulario de tareas */}
      <TaskFormContainer>
        <TaskForm task={task} onTaskSaved={handleTaskSaved} />
      </TaskFormContainer>
    </WelcomeContainer>
    );
};

export default TaskPage;