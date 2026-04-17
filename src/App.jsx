import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Gallery from "./components/Gallery";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export default function App() {
  const [dark, setDark] = useState(true);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div
      className={
        dark
          ? "bg-black text-white min-h-screen"
          : "bg-gray-200 text-black min-h-screen"
      }
    >
      {/* TOP BAR */}
      <div className="flex justify-between p-4">
        <button
          onClick={() => setDark(!dark)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {dark ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>

        {user && (
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Logout
          </button>
        )}
      </div>

      {/* MAIN CONTENT */}
      {!user ? (
        isLogin ? (
          <Login
            setUser={setUser}
            switchToRegister={() => setIsLogin(false)}
          />
        ) : (
          <Register
            setUser={setUser}
            switchToLogin={() => setIsLogin(true)}
          />
        )
      ) : (
        <Gallery />
      )}
    </div>
  );
}