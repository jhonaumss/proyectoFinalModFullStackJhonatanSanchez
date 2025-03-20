import { createContext, useContext, useState, useEffect } from "react";
import API from "../api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
            setLoading(false);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { data } = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", data.token);
        setUser(jwtDecode(data.token));
        setLoading(false);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
