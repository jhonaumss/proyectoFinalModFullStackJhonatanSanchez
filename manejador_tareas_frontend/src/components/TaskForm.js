import { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

// Estilos para el formulario de tareas
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  padding: 30px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  padding: 12px;
  margin-bottom: 15px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  margin-bottom: 15px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SelectField = styled.select`
  padding: 12px;
  margin-bottom: 15px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
`;

const DateInput = styled.input`
  padding: 12px;
  margin-bottom: 15px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 10px;
  width: 100%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  padding: 12px 20px;
  background-color: #ff4d4f;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e63946;
  }
`;

const TaskForm = ({ task, onTaskSaved }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pendiente");
    const [dueDate, setDueDate] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
            setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
        }
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { title, description, status, dueDate };

        try {
            if (task) {
                await API.put(`/tasks/${task.id}`, newTask);
            } else {
                await API.post("/tasks", newTask);
            }
            onTaskSaved();
            cleanForm();
        } catch (error) {
            console.error("Error al guardar tarea", error);
        }
    };

    const cleanForm = () => {
        setTitle("");
        setDescription("");
        setStatus("pendiente");
        setDueDate("");
    }

    return (
        <FormContainer>
      <FormTitle>{task ? "Editar Tarea" : "Nueva Tarea"}</FormTitle>

      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextArea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <SelectField value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
          <option value="completada">Completada</option>
        </SelectField>
        <DateInput
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <Button type="submit">{task ? "Actualizar" : "Crear"} Tarea</Button>
      </form>

      <CancelButton onClick={() => navigate("/")}>Cancelar</CancelButton>
    </FormContainer>
    );
};

export default TaskForm;
