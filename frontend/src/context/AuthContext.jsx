import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // =========================
  // Get Current Logged-in User
  // =========================
  const getMe = async () => {
    try {
      const response = await API.get("/auth/me");

      setUser(response.data.data);
    } catch (error) {
      console.log(
        "Auth Error:",
        error.response?.data || error.message
      );

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Run Once On App Load
  // =========================
  useEffect(() => {
    getMe();
  }, []);

  // =========================
  // Login
  // =========================
  const login = async (formData) => {
    try {
      const response = await API.post(
        "/auth/login",
        formData
      );

      const userData = response.data.data.user;

      setUser(userData);

      return userData;
    } catch (error) {
      throw error;
    }
  };

  // =========================
  // Register
  // =========================
  const register = async (formData) => {
    try {
      const response = await API.post(
        "/auth/register",
        formData
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // =========================
  // Logout
  // =========================
  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (error) {
      console.log(
        "Logout Error:",
        error.response?.data || error.message
      );
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        getMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);