import { useContext } from "react";
import { authContext } from "./frontend/hooks/context/authContext";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { token } = useContext(authContext);

  return !token ? (
    <Navigate to="/login" state={{ pathname: location.pathname }} />
  ) : (
    children
  );
};
