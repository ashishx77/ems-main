import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { apiRequest } from "../utils/api";

export const AuthContext = createContext(null);

const countTasks = (tasks) => ({
  active: tasks.filter((task) => task.status === "active").length,
  newTask: tasks.filter((task) => task.status === "new").length,
  completed: tasks.filter((task) => task.status === "completed").length,
  failed: tasks.filter((task) => task.status === "failed").length,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshWorkspace = useCallback(async (currentUser) => {
    if (!currentUser) {
      setEmployees([]);
      setTasks([]);
      return;
    }

    const taskResponse = await apiRequest("/tasks");
    setTasks(taskResponse.tasks || []);

    if (currentUser.role === "admin") {
      const employeeResponse = await apiRequest("/employees");
      setEmployees(employeeResponse.employees || []);
    } else {
      setEmployees([]);
    }
  }, []);

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem("emsToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await apiRequest("/auth/me");
        setUser(response.user);
        await refreshWorkspace(response.user);
      } catch (error) {
        localStorage.removeItem("emsToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, [refreshWorkspace]);

  const login = async ({ email, password }) => {
    const response = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem("emsToken", response.token);
    setUser(response.user);
    await refreshWorkspace(response.user);
  };

  const registerAdmin = async ({ name, email, password, companyName }) => {
    const response = await apiRequest("/auth/register-admin", {
      method: "POST",
      body: JSON.stringify({ name, email, password, companyName }),
    });

    localStorage.setItem("emsToken", response.token);
    setUser(response.user);
    setEmployees([]);
    setTasks([]);
  };

  const logout = () => {
    localStorage.removeItem("emsToken");
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setEmployees([]);
    setTasks([]);
  };

  const createEmployee = async (employee) => {
    await apiRequest("/employees", {
      method: "POST",
      body: JSON.stringify(employee),
    });
    await refreshWorkspace(user);
  };

  const deleteEmployee = async (employeeId) => {
    await apiRequest(`/employees/${employeeId}`, {
      method: "DELETE",
    });
    await refreshWorkspace(user);
  };

  const createTask = async (task) => {
    await apiRequest("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });
    await refreshWorkspace(user);
  };

  const updateTaskStatus = async (taskId, status) => {
    await apiRequest(`/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    await refreshWorkspace(user);
  };

  const employeesWithTasks = useMemo(() => {
    return employees.map((employee) => {
      const employeeTasks = tasks.filter((task) => {
        const assignedId = task.assignedTo?._id || task.assignedTo?.id || task.assignedTo;
        return assignedId === employee.id;
      });

      return {
        ...employee,
        tasks: employeeTasks,
        taskCounts: countTasks(employeeTasks),
      };
    });
  }, [employees, tasks]);

  const employeeWorkspace = useMemo(() => {
    if (user?.role !== "employee") return null;

    return {
      ...user,
      tasks,
      taskCounts: countTasks(tasks),
    };
  }, [tasks, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        employees,
        employeesWithTasks,
        employeeWorkspace,
        login,
        registerAdmin,
        logout,
        createEmployee,
        deleteEmployee,
        createTask,
        updateTaskStatus,
        refreshWorkspace,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
