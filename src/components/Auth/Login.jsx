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
        await handleLogin({ email: email.trim(), password });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
      setPassword("");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f172a] px-4 py-10">
      <section className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl sm:p-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Employee Management
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white">
            {isSignup ? "Create your workspace" : "Sign in to your workspace"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {isSignup
              ? "Start with an empty company workspace and add your own team."
              : "Manage tasks, track progress, and keep team work visible."}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 rounded-lg bg-slate-950 p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`rounded-md py-2 text-sm font-semibold transition ${
              !isSignup ? "bg-emerald-600 text-white" : "text-slate-400"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-md py-2 text-sm font-semibold transition ${
              isSignup ? "bg-emerald-600 text-white" : "text-slate-400"
            }`}
          >
            Admin Signup
          </button>
        </div>

        <form onSubmit={submitHandler} className="space-y-4">
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
            label="Email"
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
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            disabled={submitting}
            className="w-full rounded-lg bg-emerald-600 py-3 text-base font-semibold text-white transition hover:bg-emerald-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? "Please wait..."
              : isSignup
                ? "Create Workspace"
                : "Log in"}
          </button>
        </form>
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
    <label className="mb-2 block text-sm font-medium text-slate-300">
      {label}
    </label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full rounded-lg border border-slate-600 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
      type={type}
      placeholder={placeholder}
    />
  </div>
);

export default Login;
