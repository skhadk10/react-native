import express from "express";

const router = express.Router();

// middleware
import {requireSignin} from "../middleware/index.js";
import {
 create,task
} from "../controllers/task.js";


router.post("/task",requireSignin, create);
router.get("/tasks",task);


export default router;
