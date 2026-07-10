import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employeeController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.use(protect, adminOnly);

router.route("/").get(asyncHandler(getEmployees)).post(asyncHandler(createEmployee));
router
  .route("/:id")
  .patch(asyncHandler(updateEmployee))
  .delete(asyncHandler(deleteEmployee));

export default router;
