import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { toast } from "react-toastify";

const RequireAuth = ({ allowedRoles }) => {
  const { auth: { username, accessToken }} = useAuth();
  const location = useLocation();

  const decoded = accessToken && jwt_decode(accessToken);
  const roles = decoded?.roles

  useEffect(()=> {
    !username && toast.warn("Please log in to access this page.");
},[username])

  return  roles?.some(role => allowedRoles?.includes(role))
          ? <Outlet />
          : username
          ? <Navigate to="/unauthorized" state={{ from: location }} replace /> 
          : <Navigate to="/login" state={{ from: location }} replace />
}

export default RequireAuth;