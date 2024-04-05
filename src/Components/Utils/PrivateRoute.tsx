import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }: any) => {
  const token: string | null = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
