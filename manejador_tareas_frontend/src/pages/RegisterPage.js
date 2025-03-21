import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

// Estilos de los componentes
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f3f4f6;
  padding: 20px;
`;

const Card = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 12px;
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

const LoginButton = styled.button`
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", { name, email, password });
            navigate("/login");
        } catch (error) {
            console.error("Error en registro", error);
        }
    };

    const goToLogin = () => {
        navigate("/login");
    };

    return (
        <Wrapper>
            <Card>
                <Title>Registro</Title>
                <form onSubmit={handleSubmit}>
                    <Input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <ButtonContainer>
                        <Button type="submit">Registrarse</Button>

                        <LoginButton onClick={goToLogin} >Iniciar Sesion</LoginButton>
                    </ButtonContainer>
                </form>
            </Card>
        </Wrapper>
    );
};

export default RegisterPage;
