import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

// Estilos para el contenedor de filtros
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FilterTitle = styled.h3`
  margin-right: 20px;
  font-size: 20px;
`;

const FilterInput = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
`;

const FilterSelect = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
`;

// Estilos para la lista de tareas
const TaskListStyle = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TaskCard = styled.li`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TaskTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
`;

const TaskDescription = styled.p`
  font-size: 16px;
`;

const TaskStatus = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => 
    props.status === 'pendiente' ? 'orange' :
    props.status === 'en progreso' ? 'blue' :
    props.status === 'completada' ? 'green' : 'black'};
`;

const TaskDueDate = styled.p`
  font-size: 14px;
  color: #888;
`;

const TaskButton = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  & + & {
    margin-left: 10px;
  }
`;

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
    <FilterContainer>
      <FilterTitle>Filtrar Tareas</FilterTitle>
      
      <div>
        <FilterSelect onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
          <option value="completada">Completada</option>
        </FilterSelect>
        
        <FilterInput type="date" onChange={(e) => setFilterDate(e.target.value)} />
      </div>
    </FilterContainer>

    {/* Lista de tareas */}
    <TaskListStyle>
      {filteredTasks.map((task) => (
        <TaskCard key={task.id}>
          <TaskTitle>{task.title}</TaskTitle>
          <TaskDescription>{task.description}</TaskDescription>
          <TaskStatus status={task.status}>Estado: {task.status}</TaskStatus>
          <TaskDueDate>
            Fecha límite: {task.dueDate ? task.dueDate.split("T")[0] : "No definida"}
          </TaskDueDate>

          <div>
            {task.status !== "completada" && (
              <TaskButton onClick={() => onEdit(task.id)}>Editar</TaskButton>
            )}
            {task.status === "en progreso" && (
              <TaskButton onClick={() => markAsCompleted(task.id)}>Completar</TaskButton>
            )}
            <TaskButton onClick={() => onDelete(task.id)}>Eliminar</TaskButton>
          </div>
        </TaskCard>
      ))}
    </TaskListStyle>
  </div>
  );
};

export default TaskList;
