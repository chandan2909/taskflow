import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Taskform({ addTask }) {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");
  const [dueDate, setDueDate] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = task.trim();
    if (!trimmed) {
      setError("Task cannot be empty");
      return;
    }
    setError("");
    addTask({
      id: crypto.randomUUID(),
      text: trimmed,
      priority,
      category,
      completed: false,
      dueDate: dueDate ? dueDate.toISOString() : null,
      createdAt: new Date().toISOString(),
    });
    setTask("");
    setPriority("Medium");
    setCategory("General");
    setDueDate(null);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div id="input">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
            if (error) setError("");
          }}
        />
        <span>
          <button type="submit">Add Task</button>
        </span>
        {error && <p className="error-msg">{error}</p>}
      </div>
      <div id="btns">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
        </select>
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          placeholderText="Due date (optional)"
          dateFormat="MMM d, yyyy"
          minDate={new Date()}
          className="date-picker-input"
        />
      </div>
    </form>
  );
}
