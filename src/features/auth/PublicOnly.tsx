import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { isAuthenticated } from "../../utils/authUtility";

export default function PublicOnlyRoute() {
    const { auth } = useAuth();

    if (isAuthenticated(auth)) {
        return <Navigate to="/dashboard" replace />;
    }


    return <Outlet />;
}