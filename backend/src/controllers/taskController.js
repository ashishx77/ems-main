import Task from "../models/Task.js";
import User from "../models/User.js";

const allowedStatuses = ["new", "active", "completed", "failed"];

export const createTask = async (req, res) => {
  const { title, description, category, dueDate, assignedTo } = req.body;

  if (!title || !description || !category || !dueDate || !assignedTo) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const employee = await User.findOne({
    _id: assignedTo,
    companyId: req.user.companyId,
    role: "employee",
  });

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  const task = await Task.create({
    title,
    description,
    category,
    dueDate,
    assignedTo,
    createdBy: req.user._id,
    companyId: req.user.companyId,
  });

  const populatedTask = await task.populate("assignedTo", "name email");

  res.status(201).json({ task: populatedTask });
};

export const getTasks = async (req, res) => {
  const filter = { companyId: req.user.companyId };

  if (req.user.role === "employee") {
    filter.assignedTo = req.user._id;
  }

  const tasks = await Task.find(filter)
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  res.json({ tasks });
};

export const updateTask = async (req, res) => {
  const { title, description, category, dueDate, assignedTo, status } = req.body;

  const task = await Task.findOne({
    _id: req.params.id,
    companyId: req.user.companyId,
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (req.user.role !== "admin" && String(task.assignedTo) !== String(req.user._id)) {
    return res.status(403).json({ message: "Not allowed to update this task" });
  }

  if (req.user.role === "admin") {
    if (title) task.title = title;
    if (description) task.description = description;
    if (category) task.category = category;
    if (dueDate) task.dueDate = dueDate;

    if (assignedTo) {
      const employee = await User.findOne({
        _id: assignedTo,
        companyId: req.user.companyId,
        role: "employee",
      });

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      task.assignedTo = assignedTo;
    }
  }

  if (status) {
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid task status" });
    }

    task.status = status;
  }

  await task.save();
  const populatedTask = await task.populate("assignedTo", "name email");

  res.json({ task: populatedTask });
};

export const deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    companyId: req.user.companyId,
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({ message: "Task deleted" });
};
