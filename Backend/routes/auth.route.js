import express from "express";
import {
  signup,
  logout,
  login,
  verifyemail,
  forgotpassword,
  resetPassword,
  checkauth,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkauth);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verifyemail", verifyemail);

router.post("/forgot-password", forgotpassword);

router.post("/reset-password/:token", resetPassword);

export default router;
