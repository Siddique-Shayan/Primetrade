import { useEffect, useState } from "react";

import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaCheckCircle,
} from "react-icons/fa";

import { toast } from "react-toastify";

import Navbar from "../components/Navbar";

import API from "../api/axios";

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(false);

  const [editingTask, setEditingTask] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    completed: false,
  });

  // ================= FETCH TASKS =================

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await API.get("/tasks");

      setTasks(response.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  // ================= CREATE TASK =================

  const createTask = async () => {
    try {
      const response = await API.post(
        "/tasks",
        formData
      );

      setTasks([
        response.data.data,
        ...tasks,
      ]);

      toast.success("Task Created");

      resetForm();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create task"
      );
    }
  };

  // ================= UPDATE TASK =================

  const updateTask = async () => {
    try {
      const response = await API.patch(
        `/tasks/${editingTask._id}`,
        formData
      );

      const updatedTasks = tasks.map(
        (task) =>
          task._id === editingTask._id
            ? response.data.data
            : task
      );

      setTasks(updatedTasks);

      toast.success("Task Updated");

      resetForm();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update task"
      );
    }
  };

  // ================= DELETE TASK =================

  const deleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);

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

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error(
        "Task name required"
      );
    }

    if (editingTask) {
      await updateTask();
    } else {
      await createTask();
    }
  };

  // ================= EDIT =================

  const handleEdit = (task) => {
    setEditingTask(task);

    setFormData({
      name: task.name,
      description:
        task.description || "",
      completed: task.completed,
    });
  };

  // ================= RESET =================

  const resetForm = () => {
    setEditingTask(null);

    setFormData({
      name: "",
      description: "",
      completed: false,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950">

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* HEADER */}

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-bold text-white">
              My Tasks
            </h1>

            <p className="text-slate-400 mt-2">
              Manage your tasks efficiently
            </p>
          </div>
        </div>

        {/* FORM */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            {editingTask
              ? "Update Task"
              : "Create New Task"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              type="text"
              name="name"
              placeholder="Task Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-slate-800 text-white p-4 rounded-2xl outline-none border border-slate-700"
            />

            <textarea
              name="description"
              placeholder="Task Description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-slate-800 text-white p-4 rounded-2xl outline-none border border-slate-700 resize-none"
            />

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
                className="w-5 h-5"
              />

              <span className="text-slate-300">
                Mark as Completed
              </span>
            </div>

            <div className="flex gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl text-white font-semibold transition flex items-center gap-3">
                <FaPlus />

                {editingTask
                  ? "Update Task"
                  : "Create Task"}
              </button>

              {editingTask && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-slate-700 hover:bg-slate-600 px-8 py-4 rounded-2xl text-white font-semibold transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* TASKS */}

        {loading ? (
          <div className="text-center text-slate-400 text-xl">
            Loading Tasks...
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center">
            <h2 className="text-3xl text-white font-bold">
              No Tasks Found
            </h2>

            <p className="text-slate-400 mt-4">
              Create your first task now
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-7 hover:border-blue-500 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {task.name}
                    </h2>

                    <p className="text-slate-400 mt-3 leading-relaxed">
                      {task.description}
                    </p>
                  </div>

                  {task.completed && (
                    <FaCheckCircle className="text-green-500 text-2xl" />
                  )}
                </div>

                <div className="mt-6">
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

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() =>
                      handleEdit(task)
                    }
                    className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-2xl text-white font-semibold transition flex items-center justify-center gap-2"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteTask(task._id)
                    }
                    className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-2xl text-white font-semibold transition flex items-center justify-center gap-2"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;