import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middleware/index.js";
import { create, task, update } from "../controllers/task.js";

router.post("/task", requireSignin, create);
router.get("/tasks", task);
router.post("/update", requireSignin, update);

export default router;
