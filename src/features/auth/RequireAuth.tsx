
import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { ROLES } from '../../config/roles'
import { isAuthenticated } from "../../utils/authUtility"

type RoleName = typeof ROLES[keyof typeof ROLES]

interface RequireAuthProps {
    allowedRoles: RoleName[]
}

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
    const location = useLocation()
    const { auth } = useAuth()
    const numericRoles = Array.isArray(auth?.roles)
        ? auth.roles
        : []

    const userRoleNames = numericRoles.map(role => ROLES[role as keyof typeof ROLES]);

    const hasRequiredRole = userRoleNames.some(name =>
        name && allowedRoles.includes(name as RoleName)
    )

    return isAuthenticated(auth) && hasRequiredRole ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )

}

export default RequireAuth