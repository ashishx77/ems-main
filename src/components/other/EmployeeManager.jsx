import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const EmployeeManager = () => {
  const { employeesWithTasks, createEmployee, deleteEmployee } =
    useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await createEmployee({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (employee) => {
    const confirmed = window.confirm(
      `Delete ${employee.name} and all assigned tasks?`,
    );

    if (!confirmed) return;

    try {
      await deleteEmployee(employee.id);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-lg sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-400">
            Team Setup
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Add Employees
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          {employeesWithTasks.length} employees
        </p>
      </div>

      <form onSubmit={submitHandler} className="grid gap-4 lg:grid-cols-4">
        <Input label="Name" value={name} onChange={setName} />
        <Input label="Email" type="email" value={email} onChange={setEmail} />
        <Input
          label="Temporary Password"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <div className="flex items-end">
          <button
            disabled={submitting}
            className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Adding..." : "Add Employee"}
          </button>
        </div>
      </form>

      {error && (
        <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="mt-6 grid gap-3">
        {employeesWithTasks.length ? (
          employeesWithTasks.map((employee) => (
            <article
              key={employee.id}
              className="flex flex-col gap-4 rounded-xl border border-slate-700 bg-slate-950 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {employee.name}
                </h3>
                <p className="mt-1 break-all text-sm text-slate-400">
                  {employee.email}
                </p>
              </div>
              <button
                onClick={() => handleDelete(employee)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </article>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-700 p-5 text-sm text-slate-400">
            No employees yet. Add your first employee to start assigning tasks.
          </div>
        )}
      </div>
    </section>
  );
};

const Input = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-slate-300">
      {label}
    </label>
    <input
      required
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-slate-600 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
    />
  </div>
);

export default EmployeeManager;
