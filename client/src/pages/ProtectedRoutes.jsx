import { Navigate } from "react-router-dom";

function ProtectedRoute({ element, requiredRole }) {
  const token = localStorage.getItem("userinfo");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return element;
}

export default ProtectedRoute;
