"use client";
import React, { useState } from "react";
import Link from "next/link";

// Simulated register function (replace with real backend call)
// -----------------------------
/**
 * Simulate register API call.
 * Replace this with a real API call when backend is ready.
 */
const registerUser = async (
  _firstName: string,
  _lastName: string,
  _email: string,
  _password: string
): Promise<{ success: boolean; message?: string }> => {
  // _firstName, _lastName, _email, _password are unused for now; placeholder for backend
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { success: false, message: "Backend not implemented yet." };
};

// -----------------------------
// Main Signup Component
// -----------------------------

const SignupPage: React.FC = () => {
  // -----------------------------
  // State
  // -----------------------------
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Handlers
  // -----------------------------
  // Handle signup form submit
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Simulate backend register (replace with real API call)
    const result = await registerUser(firstName, lastName, email, password);
    setLoading(false);
    if (!result.success) {
      setError(result.message || "Registration failed");
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
          onSubmit={handleSignup}
          className="w-full max-w-sm mx-auto flex flex-col items-center"
        >
          {/* Title */}
          <h1 className="text-lg font-medium tracking-widest mb-2 text-center text-gray-900 uppercase">
            Sign Up
          </h1>
          <p className="text-gray-500 text-sm mb-6 text-center max-w-xs">
            Please fill in the information below:
          </p>
          {/* Error message (for backend integration) */}
          {error && (
            <div className="w-full mb-4 text-xs text-black text-center border">
              {error}
            </div>
          )}
          {/* First Name Field */}
          <div className="w-full mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-600 text-xs mb-1 font-medium tracking-wide"
            >
              First name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border-b border-gray-200 focus:border-gray-900 outline-none py-2 bg-transparent text-gray-900 placeholder-gray-400 text-sm transition-colors duration-200"
              placeholder=""
              required
              autoComplete="given-name"
              style={{ borderRadius: 0 }}
            />
          </div>
          {/* Last Name Field */}
          <div className="w-full mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-600 text-xs mb-1 font-medium tracking-wide"
            >
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border-b border-gray-200 focus:border-gray-900 outline-none py-2 bg-transparent text-gray-900 placeholder-gray-400 text-sm transition-colors duration-200"
              placeholder=""
              required
              autoComplete="family-name"
              style={{ borderRadius: 0 }}
            />
          </div>
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
          <div className="w-full mb-2">
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
              autoComplete="new-password"
              style={{ borderRadius: 0 }}
            />
          </div>
          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-gray-900 text-white py-2 text-sm tracking-widest font-medium hover:bg-black transition-colors duration-200 border-0 cursor-pointer"
            style={{ borderRadius: 0 }}
            disabled={loading}
          >
            {loading ? "Creating..." : "CREATE ACCOUNT"}
          </button>
          {/* Login Link */}
          <div className="w-full text-center mt-6">
            <span className="text-gray-500 text-xs">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-gray-400 hover:text-black font-medium text-xs transition-colors duration-200"
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
