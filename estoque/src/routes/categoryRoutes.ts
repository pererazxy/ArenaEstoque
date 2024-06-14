import { Router } from "express";
import * as categoryController from "../controllers/categoryController";
import authenticateToken from "../middlewares/authenticateToken";
import { uploadCategory } from "../middlewares/upload";

const router = Router();

router.post(
  "/categories",
  uploadCategory.single("photo"),
  categoryController.createCategory
);

router.get(
  "/categories",
  authenticateToken,
  categoryController.getAllCategories
);

router.get(
  "/categories/:id",
  authenticateToken,
  categoryController.getCategoryById
);

router.patch(
  "/categories/:id",
  authenticateToken,
  uploadCategory.single("photo"),
  categoryController.updateCategory
);

router.delete(
  "/categories/:id",
  authenticateToken,
  categoryController.deleteCategory
);

export default router;
