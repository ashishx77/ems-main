import { useContext } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthProvider";

const App = () => {
  const { user, loading, employeeWorkspace, login, registerAdmin } =
    useContext(AuthContext);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0f172a] px-6">
        <p className="text-lg font-medium text-slate-300">
          Loading workspace...
        </p>
      </main>
    );
  }

  if (!user) {
    return <Login handleLogin={login} handleRegister={registerAdmin} />;
  }

  if (user.role === "admin") {
    return <AdminDashboard />;
  }

  return <EmployeeDashboard data={employeeWorkspace} />;
};

export default App;
