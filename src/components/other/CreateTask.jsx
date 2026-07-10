import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const CreateTask = () => {
  const { employeesWithTasks, createTask } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setAssignedTo("");
    setCategory("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await createTask({
        title: title.trim(),
        description: description.trim(),
        dueDate,
        category: category.trim(),
        assignedTo,
      });
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-lg sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-400">
            Admin Control
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Create New Task
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          {employeesWithTasks.length} employees available
        </p>
      </div>

      <form
        onSubmit={submitHandler}
        className="grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        <div className="space-y-5">
          <Input
            label="Task Title"
            placeholder="Design landing page"
            value={title}
            onChange={setTitle}
          />

          <Input
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={setDueDate}
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Assign To
            </label>

            <select
              required
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
            >
              <option value="">Select employee</option>
              {employeesWithTasks.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Category"
            placeholder="Design / Development / QA"
            value={category}
            onChange={setCategory}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Task Description
          </label>

          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the task in detail..."
            className="min-h-56 w-full flex-1 resize-none rounded-lg border border-slate-600 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
          />

          {error && (
            <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || !employeesWithTasks.length}
            className="mt-6 rounded-lg bg-emerald-600 py-3 text-lg font-semibold text-white transition-all duration-200 hover:bg-emerald-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

const Input = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-slate-300">
      {label}
    </label>
    <input
      required
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-slate-600 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
    />
  </div>
);

export default CreateTask;
