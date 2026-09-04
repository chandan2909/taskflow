import { useState } from "react";
import { format, isToday, isPast, parseISO } from "date-fns";

function getDueDateStatus(dueDate, completed) {
  if (!dueDate || completed) return null;
  const date = parseISO(dueDate);
  if (isPast(date) && !isToday(date)) return "overdue";
  if (isToday(date)) return "due-today";
  return "upcoming";
}

export default function TaskList({
  tasks,
  allTasksCount,
  updateTask,
  deleteTask,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  filterCategory,
  setFilterCategory,
  sortBy,
  setSortBy,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const toggleComplete = (id) => {
    const task = tasks.find((t) => t.id === id);
    updateTask(id, { completed: !task.completed });
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    updateTask(id, { text: trimmed });
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <>
      <div className="toolbar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="all">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Category</option>
          <option value="General">General</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="created">Newest First</option>
          <option value="due-date">Due Date</option>
          <option value="priority">Priority</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>
      <p className="task-count">
        Showing {tasks.length} of {allTasksCount} tasks
      </p>
      <ul className="task-list">
        {tasks.map((task) => {
          const dueDateStatus = getDueDateStatus(task.dueDate, task.completed);
          return (
            <li
              key={task.id}
              className={[
                task.completed ? "completed" : "",
                dueDateStatus === "overdue" ? "overdue" : "",
                dueDateStatus === "due-today" ? "due-today" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div>
                {editingId === task.id ? (
                  <input
                    type="text"
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit(task.id);
                      if (e.key === "Escape") cancelEdit();
                    }}
                    autoFocus
                  />
                ) : (
                  <span>{task.text}</span>
                )}
                <small>
                  ({task.priority}, {task.category})
                  {task.dueDate && (
                    <span className="due-date">
                      {" "}
                      &middot; Due{" "}
                      {format(parseISO(task.dueDate), "MMM d, yyyy")}
                    </span>
                  )}
                </small>
                {dueDateStatus === "overdue" && (
                  <span className="overdue-badge">Overdue</span>
                )}
                {dueDateStatus === "due-today" && (
                  <span className="due-today-badge">Due today</span>
                )}
              </div>
              <div>
                {editingId === task.id ? (
                  <>
                    <button
                      className="save-btn"
                      onClick={() => saveEdit(task.id)}
                    >
                      Save
                    </button>
                    <button className="cancel-btn" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => toggleComplete(task.id)}>
                      {task.completed ? "Undo" : "Completed"}
                    </button>
                    <button className="edit-btn" onClick={() => startEdit(task)}>
                      Edit
                    </button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
