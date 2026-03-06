"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { USERS } from "@/lib/data";
import type { UserRole } from "@/lib/types";

const ROLE_DASHBOARDS: Record<UserRole, string> = {
  secretary: "/dashboard/secretary",
  dos: "/dashboard/dos",
  dod: "/dashboard/dod",
  teacher: "/dashboard/teacher",
  student: "/dashboard/student",
  hod: "/dashboard/hod",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const user = USERS.find(
        (u) => u.email === email && u.passwordHash === password
      );

      if (user) {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        router.push(ROLE_DASHBOARDS[user.role]);
      } else {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-2xl mx-auto mb-4">
            A
          </div>
          <h1 className="text-white font-bold text-2xl">APPEC TSS College</h1>
          <p className="text-blue-200 text-sm mt-1">Staff Login Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-gray-800 font-bold text-xl mb-2">Sign In to Your Account</h2>
          <p className="text-gray-500 text-sm mb-6">
            Enter your institutional email and password to access your dashboard.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@appec.edu"
                required
                autoComplete="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-xs">
              Access is restricted to authorized APPEC TSS College staff only.
              <br />
              Contact the system administrator if you need assistance.
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-blue-200 hover:text-white text-sm transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
