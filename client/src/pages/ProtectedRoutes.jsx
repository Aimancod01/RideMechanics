import { Navigate } from "react-router-dom";

function ProtectedRoute({ element }) {
  const token = localStorage.getItem("userinfo");

  return token ? element : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
