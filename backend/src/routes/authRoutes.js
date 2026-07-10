import express from "express";
import { getMe, login, registerAdmin } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.post("/register-admin", asyncHandler(registerAdmin));
router.post("/login", asyncHandler(login));
router.get("/me", protect, asyncHandler(getMe));

export default router;
