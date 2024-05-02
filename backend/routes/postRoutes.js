import express from "express";
import { authenticatedUser } from "../middlewares/authenticated.js";
import {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getFeedPosts,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/feed", authenticatedUser, getFeedPosts);
router.get("/:id", getPost);
router.post("/create", authenticatedUser, createPost);
router.delete("/:id", authenticatedUser, deletePost);
router.post("/likes/:id", authenticatedUser, likeUnlikePost);
router.post("/reply/:id", authenticatedUser, replyToPost);

export default router;
