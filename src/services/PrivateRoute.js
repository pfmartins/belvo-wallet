
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'

const PrivateRoute = ({ children }) => {
    const { signed } = useAuth();
    return signed ? children : <Navigate to="/login" replace />;
};

export {
    PrivateRoute
}