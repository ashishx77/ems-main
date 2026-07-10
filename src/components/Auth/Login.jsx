import { useState } from "react";

const Login = ({ handleLogin, handleRegister }) => {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isSignup = mode === "signup";

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (isSignup) {
        await handleRegister({
          name: name.trim(),
          companyName: companyName.trim(),
          email: email.trim(),
          password,
        });
      } else {
        await handleLogin({
          email: email.trim(),
          password,
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
      setPassword("");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07111f] px-4 py-10">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>
        <div className="absolute bottom-[-140px] right-[-120px] h-80 w-80 rounded-full bg-violet-500/20 blur-3xl"></div>
        <div className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl"></div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <section className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 shadow-lg shadow-cyan-500/20">
            <span className="text-3xl">💼</span>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white">
            WorkSphere
          </h1>

          <p className="mt-2 text-sm text-slate-300">
            Smart Employee Management Platform
          </p>

          <p className="mt-4 text-sm leading-6 text-slate-400">
            {isSignup
              ? "Create your company workspace and start managing your team with ease."
              : "Welcome back! Sign in to manage employees, assign tasks, and track productivity."}
          </p>
        </div>

        {/* Toggle */}
        <div className="mb-7 rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
          <div className="grid grid-cols-2">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-xl py-3 text-sm font-semibold transition-all duration-300 ${
                !isSignup
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`rounded-xl py-3 text-sm font-semibold transition-all duration-300 ${
                isSignup
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Admin Signup
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-5">
          {isSignup && (
            <>
              <Input
                label="Your Name"
                value={name}
                onChange={setName}
                placeholder="Ashish"
                required
              />

              <Input
                label="Company Name"
                value={companyName}
                onChange={setCompanyName}
                placeholder="Acme Team"
                required
              />
            </>
          )}

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@company.com"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Minimum 6 characters"
            required
          />

          {error && (
            <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 backdrop-blur-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 py-3.5 text-base font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_35px_rgba(6,182,212,0.45)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="relative z-10">
              {submitting
                ? "Please wait..."
                : isSignup
                ? "Create Workspace"
                : "Log In"}
            </span>

            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"></span>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 border-t border-white/10 pt-5 text-center">
          <p className="text-xs tracking-wide text-slate-400">
            Secure • Fast • Modern Workspace Experience
          </p>
        </div>
      </section>
    </main>
  );
};

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-slate-200">
      {label}
    </label>

    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      required={required}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 outline-none backdrop-blur-xl transition-all duration-300 focus:border-cyan-400 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/30"
    />
  </div>
);

export default Login;