import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Loading from "../components/Loading";

const ProtectedRoute = ({
  children,
  allowedRoles,
}) => {
  const { user, loading } = useAuth();

  // =========================
  // Show Loader While Checking Auth
  // =========================
  if (loading) {
    return <Loading />;
  }

  // =========================
  // Not Logged In
  // =========================
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;