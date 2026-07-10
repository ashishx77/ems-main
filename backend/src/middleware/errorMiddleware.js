export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (error, req, res, next) => {
  void next;

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (error.code === 11000) {
    return res.status(409).json({ message: "Email already exists" });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }

  res.status(statusCode).json({
    message: error.message || "Server error",
  });
};
