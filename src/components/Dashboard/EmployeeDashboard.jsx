import Header from "../other/Header";
import TaskListNumbers from "../other/TaskListNumbers";
import TaskList from "../TaskList/TaskList";

const EmployeeDashboard = ({ data }) => {
  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0f172a] px-6">
        <p className="text-center text-lg font-medium text-slate-300">
          Loading employee workspace...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f172a] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Header data={data} />

        <section className="mt-8">
          <TaskListNumbers data={data} />
        </section>

        <section className="mt-8">
          <TaskList data={data} />
        </section>
      </div>
    </main>
  );
};

export default EmployeeDashboard;
