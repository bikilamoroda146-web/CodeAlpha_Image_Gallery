const ThemeToggle = ({ dark, setDark }) => {
  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-2 rounded-full bg-gray-800 text-white"
    >
      {dark ? "Light Mode ☀️" : "Dark Mode 🌙"}
    </button>
  );
};

export default ThemeToggle;