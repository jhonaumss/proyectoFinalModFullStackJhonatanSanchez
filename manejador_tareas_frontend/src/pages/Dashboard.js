import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa'; // Para el ícono de "+"

// Estilos de los componentes
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  background-color: #f3f4f6;
  height: 100vh;
  position: relative;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 700px;
  margin-top: 20px;
  padding: 10px;
`;

const Button = styled.button`
  background-color: #4f46e5;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: auto;
  font-size: 1rem;

  &:hover {
    background-color: #4338ca;
  }

  @media (max-width: 600px) {
    display: ${(props) => (props.hideOnMobile ? 'none' : 'block')};
  }
`;

const LogoutButton = styled(Button)`
  background-color: #e11d48;

  &:hover {
    background-color: #9b1c2f;
  }
`;

const PlusButton = styled(Button)`
  background-color: #4f46e5;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: none;

  @media (max-width: 600px) {
    display: block;
    border-radius: 50%;
    padding: 0;
  }
`;

const TaskTitle = styled.h3`
  font-size: 1.5rem;
  margin-top: 30px;
  color: #333;
  text-align: center;
`;

const TaskWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin-top: 20px;
`;


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
        <Wrapper>
        {/* Título y contenedor de botones */}
        <Title>Bienvenido, {user?.name}</Title>
        <ButtonContainer>
          {/* Botón de cerrar sesión */}
          <LogoutButton onClick={logout}>Cerrar Sesión</LogoutButton>
          {/* Botón de nueva tarea (para escritorio) */}
          <Button hideOnMobile onClick={() => navigate("/task")}>
            Nueva Tarea
          </Button>
          {/* Botón de nueva tarea (para móvil) */}
          <PlusButton onClick={() => navigate("/task")}>
            <FaPlus />
          </PlusButton>
        </ButtonContainer>
  
        {/* Título de Mis Tareas */}
        <TaskTitle>Mis Tareas</TaskTitle>
  
        {/* Contenedor de las tareas */}
        <TaskWrapper>
          <TaskList tasks={tasks} onDelete={handleDelete} />
        </TaskWrapper>
      </Wrapper>
    );
};

export default Dashboard;
