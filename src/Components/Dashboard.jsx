import { isToday, isPast, parseISO } from "date-fns";

export default function Dashboard({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = total - completed;
  const overdue = tasks.filter(
    (t) => !t.completed && t.dueDate && isPast(parseISO(t.dueDate)) && !isToday(parseISO(t.dueDate))
  ).length;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  const tasksByPriority = { High: 0, Medium: 0, Low: 0 };
  const tasksByCategory = { General: 0, Personal: 0, Work: 0 };

  tasks.forEach((t) => {
    tasksByPriority[t.priority]++;
    tasksByCategory[t.category]++;
  });

  const maxPriority = Math.max(...Object.values(tasksByPriority), 1);
  const maxCategory = Math.max(...Object.values(tasksByCategory), 1);

  if (total === 0) {
    return (
      <div className="dashboard">
        <div className="empty-dashboard">
          <p>No tasks yet. Add some tasks to see analytics!</p>
        </div>
      </div>
    );
  }

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (completionRate / 100) * circumference;

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{total}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-card stat-completed">
          <span className="stat-number">{completed}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card stat-active">
          <span className="stat-number">{active}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-card stat-overdue">
          <span className="stat-number">{overdue}</span>
          <span className="stat-label">Overdue</span>
        </div>
      </div>

      <div className="chart-row">
        <div className="chart-section">
          <h3>Completion</h3>
          <div className="progress-ring-container">
            <svg viewBox="0 0 120 120" className="progress-ring">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="var(--progress-bg)"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="var(--success)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 60 60)"
                className="progress-ring-circle"
              />
              <text x="60" y="60" textAnchor="middle" dy="0.35em" className="progress-ring-text">
                {completionRate}%
              </text>
            </svg>
          </div>
        </div>

        <div className="chart-section">
          <h3>By Priority</h3>
          <div className="bar-chart">
            {Object.entries(tasksByPriority).map(([label, count]) => (
              <div className="bar-row" key={label}>
                <span className="bar-label">{label}</span>
                <div className="bar-track">
                  <div
                    className={`bar-fill bar-${label.toLowerCase()}`}
                    style={{ width: `${(count / maxPriority) * 100}%` }}
                  />
                </div>
                <span className="bar-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="chart-section">
        <h3>By Category</h3>
        <div className="bar-chart">
          {Object.entries(tasksByCategory).map(([label, count]) => (
            <div className="bar-row" key={label}>
              <span className="bar-label">{label}</span>
              <div className="bar-track">
                <div
                  className="bar-fill bar-category"
                  style={{ width: `${(count / maxCategory) * 100}%` }}
                />
              </div>
              <span className="bar-count">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
