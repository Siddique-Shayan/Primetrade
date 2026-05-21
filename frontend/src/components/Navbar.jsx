import { Link, useNavigate } from "react-router-dom";

import { FaTasks } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
        await logout();

        toast.success(
        "Logged out successfully"
        );

        navigate("/");
    } catch (error) {
        toast.error("Logout failed");
    }
};

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-8 py-4 flex items-center justify-between">
      <Link
        to="/"
        className="flex items-center gap-3 text-white text-2xl font-bold"
      >
        <FaTasks className="text-blue-500" />
        Primetrade
      </Link>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-lg text-white transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg uppercase">
              {user?.userName?.charAt(0)}
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-white transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
