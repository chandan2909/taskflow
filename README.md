# Taskflow

A task management application built with React and Vite.

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | ^19.2.8 |
| Build Tool | Vite | ^8.2.2 |
| Language | JavaScript (JSX) | -- |
| Linting | ESLint | ^10.9.0 |

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
│   ├── App.jsx             # Root component
│   ├── App.css             # Component styles
│   ├── index.css           # Global styles + theming
│   └── assets/             # Images & icons
```

## NPM Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Core Features

1. **Task Input Form**
   - Add tasks with an input field and a submit button.
   - Ensure the input is validated to prevent empty or duplicate tasks.

2. **Task List**
   - Display tasks dynamically, showing task names and their completion status.
   - Allow users to mark tasks as complete or delete them.

3. **Persistent Data**
   - Use **localStorage** to save tasks so they persist even after refreshing the page.

4. **Progress Tracker**
   - Implement a visual progress tracker that shows the percentage of tasks completed.
   - Update the progress dynamically as tasks are marked as complete or pending.

5. **Task History**
   - Allow users to view a history of completed tasks.
   - Provide an option to restore or delete tasks from the history, giving users control over their task management.

## Current Status

The project is in **early development stage**. The scaffolding and tooling are fully set up, but the Taskflow features are yet to be built.

### What's Currently Working

- Vite + React development environment with HMR
- ESLint configured for React hooks and refresh rules
- Light/dark theme support (via CSS `prefers-color-scheme`)
- Responsive layout with mobile/desktop support
- Default Vite starter template (counter demo)
