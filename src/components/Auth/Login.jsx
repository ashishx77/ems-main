import React, { useState } from "react";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    handleLogin(email, password);

    setEmail("");
    setPassword("");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#052e2b] px-4">

      {/* Background Glow */}
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-emerald-400/10 blur-[120px]" />

      {/* Login Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-emerald-500/20 bg-white/5 p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(16,185,129,0.12)]">

        {/* Logo */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10">
          <span className="text-4xl">💼</span>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white">
            WorkSphere
          </h2>

          <p className="mt-2 text-gray-400">
            Employee Management System
          </p>

          <p className="mt-5 text-sm text-gray-500">
            Welcome back! Please sign in to continue.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={submitHandler}
          className="mt-8 flex flex-col gap-5"
        >
          <input
            type="email"
            placeholder="Email Address"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-gray-700 bg-[#111827]/70 px-5 py-3 text-white placeholder:text-gray-500 outline-none transition duration-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border border-gray-700 bg-[#111827]/70 px-5 py-3 text-white placeholder:text-gray-500 outline-none transition duration-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
          />

          <button
            type="submit"
            className="mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-3 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center">
          <div className="h-px flex-1 bg-gray-700"></div>

          <span className="px-4 text-xs uppercase tracking-widest text-gray-500">
            Secure Access
          </span>

          <div className="h-px flex-1 bg-gray-700"></div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Built for seamless employee management.
          </p>

          <p className="mt-2 text-xs text-gray-600">
            © 2026 WorkSphere
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;