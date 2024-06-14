import { Router } from "express";
import * as productController from "../controllers/productController";
import { uploadProduct } from "../middlewares/upload";
import authenticateToken from "../middlewares/authenticateToken";

const router = Router();

router.post(
  "/products",
  uploadProduct.single("photo"),
  authenticateToken,
  productController.createProduct
);

router.get("/products", authenticateToken, productController.getAllProducts);

router.get(
  "/products/:id",
  authenticateToken,
  productController.getProductById
);

router.patch(
  "/products/:id",
  authenticateToken,
  uploadProduct.single("photo"),
  productController.updateProduct
);

router.delete(
  "/products/:id",
  authenticateToken,
  productController.deleteProduct
);

export default router;
