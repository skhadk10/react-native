import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
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
router.get(
  "/auth-check",
  (req, res, next) => {
    console.log("check");
    try {
      const decoded = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      req.user = decoded;
      next();
    } catch (err) {
      console.log(err);
    }
  },
  (req, res) => {
    res.json({ ok: true });
  }
);

export default router;
