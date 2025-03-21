import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

// Estilos de los componentes
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f3f4f6;
  padding: 20px;
`;

const FormContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #4f46e5;
  }
`;

const Button = styled.button`
  background-color: #4f46e5;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #4338ca;
  }
`;

const RegisterButton = styled.button`
  background-color: transparent;
  color: #4f46e5;
  padding: 10px;
  border: 1px solid #4f46e5;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #4f46e5;
    color: white;
  }
`;

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/");
        } catch (error) {
            console.error("Error en login", error);
        }
    };

    const handleRegister = () => {
        navigate("/register");
    };


    return (
        <Wrapper>
            <FormContainer>
            <Title>Iniciar Sesión</Title>
            <form onSubmit={handleSubmit}>
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit">Ingresar</Button>
            </form>
            <RegisterButton onClick={handleRegister} >Registrarse</RegisterButton>
            </FormContainer>
        </Wrapper>
        

    );
};

export default LoginPage;
