import { useState } from "react";
import Gallery from "./components/Gallery";

export default function App() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "bg-black text-white min-h-screen" : "bg-gray-100 text-black min-h-screen"}>
      
      {/* THEME TOGGLE */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setDark(!dark)}
          className="px-4 py-2 rounded-full bg-blue-600 text-white"
        >
          {dark ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>
      </div>

      <Gallery />
    </div>
  );
}