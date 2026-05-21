import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard";

import ProtectedRoute from "../components/ProtectedRoute";

import Navbar from "../components/Navbar";

import WrongRoute from "../pages/WrongRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />


        <Route
            path="*"
            element={<WrongRoute />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;