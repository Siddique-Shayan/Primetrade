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

  const getMe = async () => {
    try {
      const response = await API.get("/auth/me");

      setUser(response.data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  const login = async (formData) => {
    const response = await API.post(
      "/auth/login",
      formData
    );

    const userData = response.data.data.user;

    setUser(userData);

    return userData;
  };

  const register = async (formData) => {
    const response = await API.post(
      "/auth/register",
      formData
    );

    return response.data;
  };

  const logout = async () => {
  try {
    await API.post("/auth/logout");
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

export const useAuth = () =>
  useContext(AuthContext);