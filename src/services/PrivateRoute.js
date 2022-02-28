
import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth'

const PrivateRoute = ({ children }) => {
    const { signed } = useAuth();
    return signed ? children : <Navigate to="/login" replace />;
};

export {
    PrivateRoute
}