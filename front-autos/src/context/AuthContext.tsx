import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Role } from "../types/auth";

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    userRole: Role | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    const [userRole, setUserRole] = useState<Role | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                setUserRole(decodedToken.role as Role);
            } catch (error) {
                console.error("Error decoding token:", error);
                logout();
            }
        } else {
            setUserRole(null);
        }
    }, [token]);

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        navigate("/");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUserRole(null);
        navigate("/login");
    };

    const value: AuthContextType = {
        token,
        login,
        logout,
        isAuthenticated: !!token,
        userRole,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};

