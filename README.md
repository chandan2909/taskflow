# Taskflow

A task management application built with React and Vite.

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | ^19.2.8 |
| Build Tool | Vite | ^8.2.2 |
| Language | JavaScript (JSX) | -- |
| Linting | ESLint | ^10.9.0 |
| Date Picker | react-datepicker | ^7.0.0 |
| Date Utils | date-fns | ^4.1.0 |

## Project Structure

```
Taskflow/
├── index.html              # HTML entry point
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint rules
├── public/                 # Static assets
│   ├── favicon.svg
│   └── icons.svg
├── src/                    # Source code
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Root component (state management)
│   ├── index.css           # Global styles + CSS variables + theming
│   ├── assets/             # Images & icons
│   └── Components/
│       ├── Taskform.jsx    # Task creation form with validation
│       ├── TaskList.jsx    # Task display with editing, search, filters
│       ├── ProgressTracker.jsx  # Completion progress bar
│       ├── ThemeToggle.jsx      # Dark/light mode toggle
│       └── Dashboard.jsx        # Analytics dashboard with charts
```

## NPM Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Features

### 1. Task Management
- Add tasks with text, priority (High/Medium/Low), and category (General/Personal/Work)
- Inline task editing with Save/Cancel
- Toggle task completion status
- Delete individual tasks or clear all
- Input validation prevents empty tasks

### 2. Due Dates & Overdue Tracking
- Optional due date picker on each task
- Overdue tasks highlighted in red with "Overdue" badge
- Tasks due today highlighted in amber with "Due today" badge
- Due date displayed on each task card

### 3. Search, Filter & Sorting
- Real-time text search across all tasks
- Filter by status (All/Active/Completed)
- Filter by priority (All/High/Medium/Low)
- Filter by category (All/General/Personal/Work)
- Sort by newest, due date, priority, or alphabetical

### 4. Dark Mode
- Toggle between light and dark themes
- Respects system preference on first visit
- Theme preference persisted in localStorage
- Smooth CSS transitions between themes

### 5. Analytics Dashboard
- Tab-based navigation (Tasks | Dashboard)
- Stats cards: Total, Completed, Active, Overdue counts
- SVG progress ring showing completion percentage
- Horizontal bar charts for priority and category distribution

### 6. Data Persistence
- All tasks saved to localStorage automatically
- Theme preference saved to localStorage
- Data persists across page refreshes

## Responsive Design

- Mobile-first layout with breakpoints at 500px
- Stacked form inputs and task items on small screens
- Toolbar and dashboard grid adapt to screen size
