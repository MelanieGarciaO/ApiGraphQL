import { Router } from "express";
import healthController from "../controllers/health.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

// GET /health
router.get("/", asyncHandler(healthController.healthCheck));

export default router;
