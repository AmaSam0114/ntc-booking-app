"use client";

import { useState } from "react";
import { login } from "../services/auth";

interface AuthFormProps {
  setToken: (token: string) => void;
}

export default function AuthForm({ setToken }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      setToken(token); // Save token
    } catch (err) {
      setError("Login failed. Check your credentials.");
    }
  };

  return (
    <form className="p-4 border rounded shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="p-2 border w-full mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 border w-full mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="p-2 bg-blue-500 text-white w-full">
        Login
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
