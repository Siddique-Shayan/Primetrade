import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950">

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* HERO SECTION */}
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight">
            Manage Your Tasks
            <span className="text-blue-500">
              {" "}
              Efficiently
            </span>
          </h1>

          <p className="text-slate-400 text-xl mt-6 max-w-3xl mx-auto leading-relaxed">
            Primetrade helps users organize,
            manage and track tasks with secure
            JWT authentication, protected routes,
            role-based dashboards and a modern
            task management experience.
          </p>

          {/* BUTTONS */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl text-white text-lg font-semibold transition duration-300 shadow-lg"
                >
                  Get Started
                </Link>

                <Link
                  to="/login"
                  className="bg-slate-800 hover:bg-slate-700 px-8 py-4 rounded-2xl text-white text-lg font-semibold transition duration-300 border border-slate-700"
                >
                  Login
                </Link>
              </>
            ) : (
              <Link
                to={
                  user.role === "admin"
                    ? "/admin"
                    : "/dashboard"
                }
                className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-2xl text-white text-lg font-semibold transition duration-300 shadow-lg"
              >
                Go To Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-8 mt-28">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500 transition">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 text-2xl">
              🔐
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">
              Secure Authentication
            </h2>

            <p className="text-slate-400 leading-relaxed">
              Access Token and Refresh Token
              based authentication with secure
              HTTP-only cookies and automatic
              session management.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500 transition">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 text-2xl">
              ✅
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">
              Task Management
            </h2>

            <p className="text-slate-400 leading-relaxed">
              Create, update, delete and manage
              your tasks efficiently with modern
              dashboard UI and smooth user
              experience.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500 transition">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 text-2xl">
              👨‍💻
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">
              Role Based Access
            </h2>

            <p className="text-slate-400 leading-relaxed">
              Separate Admin and User dashboards
              with protected routing and scalable
              architecture for production-ready
              applications.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-28 text-center border-t border-slate-800 pt-10">
          <p className="text-slate-500">
            © 2026 Primetrade. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;