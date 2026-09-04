import { useState, useEffect, useMemo } from "react";
import Taskform from "./Components/Taskform";
import TaskList from "./Components/TaskList";
import ProgressTracker from "./Components/ProgressTracker";
import ThemeToggle from "./Components/ThemeToggle";
import Dashboard from "./Components/Dashboard";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("created");
  const [activeView, setActiveView] = useState("tasks");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (id, updatedFields) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updatedFields } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((t) => t.text.toLowerCase().includes(term));
    }

    if (filterStatus === "active") {
      result = result.filter((t) => !t.completed);
    } else if (filterStatus === "completed") {
      result = result.filter((t) => t.completed);
    }

    if (filterPriority !== "all") {
      result = result.filter((t) => t.priority === filterPriority);
    }

    if (filterCategory !== "all") {
      result = result.filter((t) => t.category === filterCategory);
    }

    const priorityOrder = { High: 0, Medium: 1, Low: 2 };

    switch (sortBy) {
      case "due-date":
        result.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
        break;
      case "priority":
        result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;
      case "alphabetical":
        result.sort((a, b) => a.text.localeCompare(b.text));
        break;
      case "created":
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return result;
  }, [tasks, searchTerm, filterStatus, filterPriority, filterCategory, sortBy]);

  return (
    <div>
      <header>
        <h1>TaskMan</h1>
        <p>
          <i>Your friendly Task Manager</i>
        </p>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <div className="view-tabs">
          <button
            className={`view-tab ${activeView === "tasks" ? "active" : ""}`}
            onClick={() => setActiveView("tasks")}
          >
            Tasks
          </button>
          <button
            className={`view-tab ${activeView === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveView("dashboard")}
          >
            Dashboard
          </button>
        </div>
      </header>

      {activeView === "tasks" ? (
        <>
          <Taskform addTask={addTask} />
          <TaskList
            tasks={filteredTasks}
            allTasksCount={tasks.length}
            updateTask={updateTask}
            deleteTask={deleteTask}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <ProgressTracker tasks={tasks} />

          {tasks.length > 0 && (
            <button className="clear-btn" onClick={clearTasks}>
              clear All Tasks
            </button>
          )}
        </>
      ) : (
        <Dashboard tasks={tasks} />
      )}
    </div>
  );
}
