import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Register = ({ setUser, switchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (err) {
      console.error(err.message);
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-80 border border-white/20">

        <h2 className="text-2xl font-bold text-center mb-6">
          Sign Up
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 hover:bg-green-700 transition p-3 rounded-lg font-semibold"
        >
          Sign Up
        </button>

        {error && (
          <p className="text-red-400 text-sm text-center mt-3">
            {error}
          </p>
        )}

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={switchToLogin}
            className="text-blue-400 cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;