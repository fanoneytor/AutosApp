import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = await loginUser(username, password);
            login(token);
        } catch (err) {
            setError("Credenciales inválidas");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-semibold mb-4 text-center">Iniciar Sesión</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-3 px-3 py-2 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border rounded"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
                    Ingresar
                </button>
                <p className="mt-4 text-center text-sm">
                    ¿No tienes una cuenta?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Regístrate aquí
                    </Link>
                </p>
            </form>
        </div>
    );
}
