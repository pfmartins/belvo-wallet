
import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth'

const PrivateRoute = ({ children }) => {
    console.log(children)
    const auth = useAuth();
    console.log('private', auth)
    return auth ? children : <Navigate to="/login" />;
};

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export {
    PrivateRoute,
    ProtectedRoute
}