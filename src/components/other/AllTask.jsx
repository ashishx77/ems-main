import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const statusStyles = {
  new: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
  active: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  completed: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  failed: "bg-red-500/15 text-red-300 ring-red-500/30",
};

const formatStatus = (status) => {
  const labels = {
    new: "New",
    active: "Active",
    completed: "Completed",
    failed: "Failed",
  };

  return labels[status] || status;
};

const formatDate = (date) => new Date(date).toLocaleDateString();

const AllTask = () => {
  const { employeesWithTasks } = useContext(AuthContext);

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-lg sm:p-6">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-400">
              Team Overview
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              Employee Task Status
            </h2>
          </div>
          <p className="text-sm text-slate-400">
            {employeesWithTasks.length} employees tracked
          </p>
        </div>

        <div className="hidden overflow-hidden rounded-xl border border-slate-700 md:block">
          <div className="grid grid-cols-[1.4fr_1.8fr_repeat(4,0.8fr)] bg-emerald-600 px-6 py-4 text-sm font-semibold text-white">
            <div>Employee</div>
            <div>Email</div>
            <div className="text-center">New</div>
            <div className="text-center">Active</div>
            <div className="text-center">Done</div>
            <div className="text-center">Failed</div>
          </div>

          {employeesWithTasks.map((employee) => (
            <div
              key={employee.id}
              className="grid grid-cols-[1.4fr_1.8fr_repeat(4,0.8fr)] items-center border-t border-slate-700 bg-slate-950 px-6 py-4 text-sm"
            >
              <div className="font-semibold text-white">{employee.name}</div>
              <div className="truncate pr-4 text-slate-400">{employee.email}</div>
              <div className="text-center text-blue-300">
                {employee.taskCounts.newTask}
              </div>
              <div className="text-center text-amber-300">
                {employee.taskCounts.active}
              </div>
              <div className="text-center text-emerald-300">
                {employee.taskCounts.completed}
              </div>
              <div className="text-center text-red-300">
                {employee.taskCounts.failed}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:hidden">
          {employeesWithTasks.map((employee) => (
            <article
              key={employee.id}
              className="rounded-xl border border-slate-700 bg-slate-950 p-4"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {employee.name}
                </h3>
                <p className="mt-1 break-all text-sm text-slate-400">
                  {employee.email}
                </p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <Stat label="New" value={employee.taskCounts.newTask} />
                <Stat label="Active" value={employee.taskCounts.active} />
                <Stat label="Completed" value={employee.taskCounts.completed} />
                <Stat label="Failed" value={employee.taskCounts.failed} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-lg sm:p-6">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-400">
            Task Directory
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            Employee-wise Assigned Tasks
          </h2>
        </div>

        <div className="grid gap-5">
          {employeesWithTasks.length ? (
            employeesWithTasks.map((employee) => (
              <EmployeeTaskCard key={employee.id} employee={employee} />
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-slate-700 p-5 text-sm text-slate-400">
              Add employees to see task ownership here.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const EmployeeTaskCard = ({ employee }) => (
  <article className="rounded-xl border border-slate-700 bg-slate-950 p-4 sm:p-5">
    <div className="flex flex-col gap-4 border-b border-slate-800 pb-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h3 className="text-xl font-bold text-white">{employee.name}</h3>
        <p className="mt-1 break-all text-sm text-slate-400">{employee.email}</p>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center text-xs sm:min-w-[360px]">
        <MiniStat label="New" value={employee.taskCounts.newTask} />
        <MiniStat label="Active" value={employee.taskCounts.active} />
        <MiniStat label="Done" value={employee.taskCounts.completed} />
        <MiniStat label="Failed" value={employee.taskCounts.failed} />
      </div>
    </div>

    {employee.tasks.length ? (
      <div className="mt-4 grid gap-3">
        {employee.tasks.map((task) => (
          <TaskRow key={task._id} task={task} />
        ))}
      </div>
    ) : (
      <div className="mt-4 rounded-lg border border-dashed border-slate-700 p-4 text-sm text-slate-400">
        No tasks assigned yet.
      </div>
    )}
  </article>
);

const TaskRow = ({ task }) => (
  <div className="grid gap-3 rounded-lg border border-slate-800 bg-slate-900 p-4 lg:grid-cols-[1.5fr_1fr_1fr_auto] lg:items-center">
    <div>
      <h4 className="font-semibold text-white">{task.title}</h4>
      <p className="mt-1 text-sm leading-6 text-slate-400">
        {task.description}
      </p>
    </div>

    <div className="text-sm">
      <p className="text-slate-500">Category</p>
      <p className="mt-1 font-medium text-slate-200">{task.category}</p>
    </div>

    <div className="text-sm">
      <p className="text-slate-500">Due Date</p>
      <p className="mt-1 font-medium text-slate-200">
        {formatDate(task.dueDate)}
      </p>
    </div>

    <span
      className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusStyles[task.status]}`}
    >
      {formatStatus(task.status)}
    </span>
  </div>
);

const MiniStat = ({ label, value }) => (
  <div className="rounded-lg bg-slate-900 px-3 py-2">
    <p className="text-slate-500">{label}</p>
    <p className="mt-1 text-lg font-bold text-white">{value}</p>
  </div>
);

const Stat = ({ label, value }) => (
  <div className="rounded-lg bg-slate-900 p-3">
    <p className="text-slate-400">{label}</p>
    <p className="mt-1 text-xl font-bold text-white">{value}</p>
  </div>
);

export default AllTask;
