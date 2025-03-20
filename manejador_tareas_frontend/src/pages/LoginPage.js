import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Ingresar</button>
            </form>
            <button onClick={handleRegister} >Registrarse</button>
        </div>
    );
};

export default LoginPage;
