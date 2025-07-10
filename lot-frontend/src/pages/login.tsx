import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hashPassword } from "../utils/hash";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [is_create, setis_create] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setusername] = useState("");
  const [error, setError] = useState("");
  const [msg, setmsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const hashedpass = await hashPassword(password);
      const body = JSON.stringify({ email, password: hashedpass });

      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await response.json();

      if (data.success && data.token) {
        localStorage.setItem("authToken", data.token);
        setmsg(data.message);
        setTimeout(() => {
          navigate("/lists");
        }, 1500);
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const hashedpass = await hashPassword(password);
      const hashedconpass = await hashPassword(confirmPassword);

      if (hashedpass !== hashedconpass) {
        setError("Passwords dont match");
        return;
      }

      const body = JSON.stringify({ username, email, password: hashedpass });

      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await response.json();

      if (data.success && data.token) {
        localStorage.setItem("authToken", data.token);
        setmsg(data.message);
        setTimeout(() => {
          navigate("/lists");
        }, 1500);
      } else {
        setError("failed to create account.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f6fb] p-2">
      {!is_create && (
        // LOGIN
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center text-[#2C7DA0]">
            Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#468FAF]">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61A5C2]"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#468FAF]">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61A5C2]"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-xs text-center font-medium">
                {error}
              </div>
            )}
            {msg && (
              <div className="text-green-600 text-xs text-center font-medium">
                {msg}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#2C7DA0] text-white py-2 rounded-xl hover:bg-[#468FAF] transition-colors"
            >
              Login
            </button>
          </form>
          <button
            onClick={() => setis_create(true)}
            className="p-2 rounded-full bg-white shadow hover:shadow-md transition"
          >
            Create A Account
          </button>
        </div>
      )}

      {is_create && (
        // CREATE ACCOUNT
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center text-[#2C7DA0]">
            Create Account
          </h1>

          <form onSubmit={handleCreateAccount} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#468FAF]">
                Username
              </label>
              <input
                type="username"
                id="username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61A5C2]"
                placeholder="your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#468FAF]">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61A5C2]"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#468FAF]">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61A5C2]"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#468FAF]">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61A5C2]"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-xs text-center font-medium">
                {error}
              </div>
            )}
            {msg && (
              <div className="text-green-600 text-xs text-center font-medium">
                {msg}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#2C7DA0] text-white py-2 rounded-xl hover:bg-[#468FAF] transition-colors"
            >
              Create
            </button>
          </form>
          <button
            onClick={() => setis_create(false)}
            className="p-2 rounded-full bg-white shadow hover:shadow-md transition"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
