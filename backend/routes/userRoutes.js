import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  followUnfollowUser,
  updateProfile,
  getUserProfile
} from "../controllers/userController.js";
import { authenticatedUser } from "../middlewares/authenticated.js";

const router = express.Router();

router.get("/profile/:username", getUserProfile)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", authenticatedUser, followUnfollowUser);
router.post("/update/:id", authenticatedUser, updateProfile);

export default router;
