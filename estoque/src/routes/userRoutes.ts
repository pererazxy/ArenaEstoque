// src/routes/userRoutes.ts
import express, { Router } from "express";
import * as userController from "../controllers/userController";
import authenticateToken from "../middlewares/authenticateToken";
import { uploadUser } from "../middlewares/upload";

const router: Router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", authenticateToken, userController.getProfile);
router.patch("/profile", authenticateToken, userController.updateProfile);
router.put(
  "/upload-photo",
  authenticateToken,
  uploadUser.single("photo"),
  userController.uploadUserProfilePhoto
);

export default router;
