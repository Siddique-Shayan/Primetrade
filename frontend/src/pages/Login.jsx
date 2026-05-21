import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login(formData);

      toast.success("Login Successful");

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-2xl w-[400px] shadow-lg border border-slate-700"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Primetrade
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          className="w-full p-3 rounded-lg bg-slate-800 mb-4 outline-none text-white"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          className="w-full p-3 rounded-lg bg-slate-800 mb-4 outline-none text-white"
          onChange={handleChange}
        />

        <select
          name="role"
          value={formData.role}
          className="w-full p-3 rounded-lg bg-slate-800 mb-4 outline-none text-white"
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold transition text-white">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;