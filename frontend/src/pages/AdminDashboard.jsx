import { useEffect, useState } from "react";

import {
  FaTrash,
  FaUsers,
  FaTasks,
} from "react-icons/fa";

import { toast } from "react-toastify";

import Navbar from "../components/Navbar";

import API from "../api/axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] =
    useState(false);

  // ================= FETCH USERS =================

  const fetchUsers = async () => {
    try {
      const response = await API.get(
        "/admin/users"
      );

      setUsers(response.data.data);
    } catch (error) {
      toast.error(
        "Failed to fetch users"
      );
    }
  };

  // ================= FETCH TASKS =================

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        "/admin/tasks"
      );

      setTasks(response.data.data);
    } catch (error) {
      toast.error(
        "Failed to fetch tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    fetchTasks();
  }, []);

  // ================= DELETE TASK =================

  const deleteTask = async (taskId) => {
    try {
      await API.delete(
        `/admin/tasks/${taskId}`
      );

      setTasks(
        tasks.filter(
          (task) => task._id !== taskId
        )
      );

      toast.success("Task Deleted");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete task"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* HEADER */}

        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white">
            Admin Dashboard
          </h1>

          <p className="text-slate-400 mt-3">
            Manage users and tasks
          </p>
        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl text-white">
                <FaUsers />
              </div>

              <div>
                <h2 className="text-slate-400">
                  Total Users
                </h2>

                <p className="text-4xl font-bold text-white">
                  {users.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center text-2xl text-white">
                <FaTasks />
              </div>

              <div>
                <h2 className="text-slate-400">
                  Total Tasks
                </h2>

                <p className="text-4xl font-bold text-white">
                  {tasks.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* USERS */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            Users
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left text-slate-400 py-4">
                    Username
                  </th>

                  <th className="text-left text-slate-400 py-4">
                    Email
                  </th>

                  <th className="text-left text-slate-400 py-4">
                    Role
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-slate-800"
                  >
                    <td className="py-5 text-white">
                      {user.userName}
                    </td>

                    <td className="py-5 text-slate-300">
                      {user.email}
                    </td>

                    <td className="py-5">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          user.role ===
                          "admin"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TASKS */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-white mb-8">
            All Tasks
          </h2>

          {loading ? (
            <div className="text-slate-400">
              Loading Tasks...
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-slate-400">
              No Tasks Found
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-slate-800 border border-slate-700 rounded-3xl p-6"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {task.name}
                      </h2>

                      <p className="text-slate-400 mt-3">
                        {task.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        task.completed
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {task.completed
                        ? "Completed"
                        : "Pending"}
                    </span>
                  </div>

                  <div className="mt-6">
                    <p className="text-slate-500 text-sm">
                      Owner:
                    </p>

                    <p className="text-white">
                      {
                        task.owner
                          ?.userName
                      }
                    </p>

                    <p className="text-slate-400 text-sm">
                      {
                        task.owner
                          ?.email
                      }
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      deleteTask(task._id)
                    }
                    className="w-full mt-8 bg-red-600 hover:bg-red-700 py-3 rounded-2xl text-white font-semibold transition flex items-center justify-center gap-3"
                  >
                    <FaTrash />

                    Delete Task
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;