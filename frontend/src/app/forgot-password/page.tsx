"use client";
import React, { useState } from "react";
import Link from "next/link";

// Simulated recover function (replace with real backend call)
const recoverPassword = async (
  _email: string
): Promise<{ success: boolean; message?: string }> => {
  // _email is unused for now; placeholder for backend
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { success: false, message: "Backend not implemented yet." };
};

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await recoverPassword(email);
    setLoading(false);
    if (!result.success) {
      setError(result.message || "Recovery failed");
    } else {
      // TODO: Show success message or redirect
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="hidden md:block w-2 bg-gray-900 h-full" />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <form
          onSubmit={handleRecover}
          className="w-full max-w-sm mx-auto flex flex-col items-center"
        >
          <h1 className="text-lg font-medium tracking-widest mb-2 text-center text-gray-900 uppercase">
            Recover Password
          </h1>
          <p className="text-gray-500 text-sm mb-6 text-center max-w-xs">
            Enter your email to recover your password:
          </p>
          {error && (
            <div className="w-full mb-4 text-xs text-black text-center border">
              {error}
            </div>
          )}
          <div className="w-full mb-6">
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
              required
              autoComplete="email"
              style={{ borderRadius: 0 }}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 bg-gray-900 text-white py-2 text-sm tracking-widest font-medium hover:bg-black transition-colors duration-200 border-0 cursor-pointer"
            style={{ borderRadius: 0 }}
            disabled={loading}
          >
            {loading ? "Recovering..." : "RECOVER"}
          </button>
          <div className="w-full text-center mt-6">
            <span className="text-gray-500 text-xs">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-gray-400 hover:text-black font-medium text-xs transition-colors duration-200"
              >
                Back to login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
