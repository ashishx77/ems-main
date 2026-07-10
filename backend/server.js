import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import employeeRoutes from "./src/routes/employeeRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import { errorHandler, notFound } from "./src/middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://127.0.0.1:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "EMS API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);
app.use(notFound);
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`EMS API running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  });
