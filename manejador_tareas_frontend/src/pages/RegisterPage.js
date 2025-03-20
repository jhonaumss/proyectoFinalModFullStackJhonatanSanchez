import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Registrarse</button>
            </form>
            <button onClick={goToLogin} >Iniciar Sesion</button>
        </div>
    );
};

export default RegisterPage;
