export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
      {theme === "light" ? "\u263E" : "\u2600"}
    </button>
  );
}
