import Header from "../other/Header";
import CreateTask from "../other/CreateTask";
import AllTask from "../other/AllTask";
import EmployeeManager from "../other/EmployeeManager";

const AdminDashboard = () => {
  return (
    <main className="min-h-screen bg-[#0f172a] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Header data={null} />

        <section className="mt-8">
          <EmployeeManager />
        </section>

        <section className="mt-8">
          <CreateTask />
        </section>

        <section className="mt-8">
          <AllTask />
        </section>
      </div>
    </main>
  );
};

export default AdminDashboard;
