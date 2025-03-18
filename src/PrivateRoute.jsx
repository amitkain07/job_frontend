import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("jwtToken"); // Replace with real auth check

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
