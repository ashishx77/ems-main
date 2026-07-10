import express from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.use(protect);

router.route("/").get(asyncHandler(getTasks)).post(adminOnly, asyncHandler(createTask));
router.route("/:id").patch(asyncHandler(updateTask)).delete(adminOnly, asyncHandler(deleteTask));

export default router;
