import Company from "../models/Company.js";
import User from "../models/User.js";
import { createToken } from "../utils/token.js";

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  companyId: user.companyId,
});

export const registerAdmin = async (req, res) => {
  const { name, email, password, companyName } = req.body;

  if (!name || !email || !password || !companyName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const company = await Company.create({ name: companyName });
  const user = await User.create({
    name,
    email,
    password,
    role: "admin",
    companyId: company._id,
  });

  company.owner = user._id;
  await company.save();

  res.status(201).json({
    user: sanitizeUser(user),
    token: createToken(user),
  });
};

export const login = async (req, res) => {
  const { email, password, companyId } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const query = { email: email.toLowerCase() };

  if (companyId) {
    query.companyId = companyId;
  }

  const user = await User.findOne(query);

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    user: sanitizeUser(user),
    token: createToken(user),
  });
};

export const getMe = async (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
};
