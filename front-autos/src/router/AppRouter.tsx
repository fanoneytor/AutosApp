import { Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Definir rutas aquí */}
      <Route path="/login" element={<h1>Login Page</h1>} />
      <Route path="/" element={<h1>Home Page</h1>} />
    </Routes>
  );
};
