// src/app/login/page.tsx
// Login page for NepWears
// Clean, organized, and commented for easy backend integration and future maintenance
"use client";
import React, { useState } from "react";
import Link from "next/link";

// -----------------------------
// Simulated login function (replace with real backend call)
// -----------------------------
/**
 * Simulate login API call.
 * Replace this with a real API call when backend is ready.
 */
const loginUser = async (
  _email: string,
  _password: string
): Promise<{ success: boolean; message?: string }> => {
  // _email and _password are unused for now; this is a placeholder for future backend integration
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Always fail for now (no backend)
  return { success: false, message: "Backend not implemented yet." };
};

// -----------------------------
// Main Login Component
// -----------------------------

const MyLogin: React.FC = () => {
  // -----------------------------
  // State
  // -----------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Handlers
  // -----------------------------
  // Handle login form submit
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Simulate backend login (replace with real API call)
    const result = await loginUser(email, password);
    setLoading(false);
    if (!result.success) {
      setError(result.message || "Login failed");
    } else {
      // TODO: Redirect or set auth state
    }
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Vertical accent bar for desktop */}
      <div className="hidden md:block w-2 bg-gray-900 h-full" />
      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm mx-auto flex flex-col items-center"
        >
          {/* Title */}
          <h1 className="text-lg font-medium tracking-widest mb-2 text-center text-gray-900 uppercase">
            Login
          </h1>
          <p className="text-gray-500 text-sm mb-6 text-center max-w-xs">
            Welcome back! Please enter your email and password to sign in.
          </p>
          {/* Error message (for backend integration) */}
          {error && (
            <div className="w-full mb-4 text-xs text-black text-center border">
              {error}
            </div>
          )}
          {/* Email Field */}
          <div className="w-full mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-xs mb-1 font-medium tracking-wide"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-200 focus:border-gray-900 outline-none py-2 bg-transparent text-gray-900 placeholder-gray-400 text-sm transition-colors duration-200"
              placeholder=""
              required
              autoComplete="email"
              style={{ borderRadius: 0 }}
            />
          </div>
          {/* Password Field */}
          <div className="w-full mb-2 relative">
            <label
              htmlFor="password"
              className="block text-gray-600 text-xs mb-1 font-medium tracking-wide"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-200 focus:border-gray-900 outline-none py-2 bg-transparent text-gray-900 placeholder-gray-400 text-sm transition-colors duration-200"
              placeholder=""
              required
              autoComplete="current-password"
              style={{ borderRadius: 0 }}
            />
            <Link
              href="/forgot-password"
              className="absolute right-0 top-0 text-xs text-gray-400 hover:text-gray-900 mt-1 font-medium tracking-wide"
            >
              Forgot your password?
            </Link>
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-gray-900 text-white py-2 text-sm tracking-widest font-medium hover:bg-black transition-colors duration-200 border-0 cursor-pointer"
            style={{ borderRadius: 0 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
          {/* Sign Up Link */}
          <div className="w-full text-center mt-6">
            <span className="text-gray-500 text-xs">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-gray-400 hover:text-black font-medium text-xs transition-colors duration-200"
              >
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyLogin;
