import Task from "../models/Task.js";
import User from "../models/User.js";

const sanitizeEmployee = (employee) => ({
  id: employee._id,
  name: employee.name,
  email: employee.email,
  role: employee.role,
  companyId: employee.companyId,
  createdAt: employee.createdAt,
});

export const createEmployee = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const employee = await User.create({
    name,
    email,
    password,
    role: "employee",
    companyId: req.user.companyId,
  });

  res.status(201).json({ employee: sanitizeEmployee(employee) });
};

export const getEmployees = async (req, res) => {
  const employees = await User.find({
    companyId: req.user.companyId,
    role: "employee",
  })
    .select("-password")
    .sort({ createdAt: -1 });

  res.json({ employees: employees.map(sanitizeEmployee) });
};

export const updateEmployee = async (req, res) => {
  const { name, email, password } = req.body;

  const employee = await User.findOne({
    _id: req.params.id,
    companyId: req.user.companyId,
    role: "employee",
  });

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  if (name) employee.name = name;
  if (email) employee.email = email;
  if (password) employee.password = password;

  await employee.save();

  res.json({ employee: sanitizeEmployee(employee) });
};

export const deleteEmployee = async (req, res) => {
  const employee = await User.findOneAndDelete({
    _id: req.params.id,
    companyId: req.user.companyId,
    role: "employee",
  });

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  await Task.deleteMany({
    assignedTo: employee._id,
    companyId: req.user.companyId,
  });

  res.json({ message: "Employee and assigned tasks deleted" });
};
