import express from "express";
import { register, login } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { validateRequest } from "../middleware/validate.middleware";
import { registerSchema, loginSchema } from "../schemas/auth.schema";

const router = express.Router();

router.post("/register", validateRequest(registerSchema, "body"), asyncHandler(register));
router.post("/login", validateRequest(loginSchema, "body"), asyncHandler(login));

export default router;