import express from "express";

const router = express.Router();

// middleware
import {requireSignin} from "../middleware/index.js";
import {
  signin,
  signup,
  forgotPassword,
  resetPassword,
  authCheck,
} from "../controllers/auth.js";

router.get("/", (req, res) => {
  return res.json({
    data: "hello world from kaloraat auth API",
  });
});
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/auth-check", requireSignin, (req, res) => {
  res.json({ ok: true });
});

export default router;
