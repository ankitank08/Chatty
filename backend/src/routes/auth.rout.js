import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { login, logout, signUp, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the backend API");
});

router.post("/signup", signUp);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile",protectRoute, updateProfile)

router.get("/check", protectRoute, checkAuth);

export default router;
