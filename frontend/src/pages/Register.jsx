import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    userName: "",
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
      await register(formData);

      toast.success(
        "Account created successfully"
      );

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Register Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Create Account
        </h1>

        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={formData.userName}
          onChange={handleChange}
          className="w-full bg-slate-800 text-white p-4 rounded-xl mb-4 outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-slate-800 text-white p-4 rounded-xl mb-4 outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-slate-800 text-white p-4 rounded-xl mb-6 outline-none"
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-semibold transition">
          Register
        </button>

        <p className="text-slate-400 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;