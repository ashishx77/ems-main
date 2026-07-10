import jwt from "jsonwebtoken";

export const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      companyId: user.companyId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};
