import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../features/auth/stores/useAuthStore';

// Protege o Dashboard (Ninguém entra sem logar)
export const PrivateRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// Protege o Login (Ninguém logado vê a tela de login)
export const PublicRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};