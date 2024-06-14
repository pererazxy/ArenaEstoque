// src/routes/index.ts
import express, { Router } from "express";
import userRoutes from "./userRoutes";
import categoryRoutes from "./categoryRoutes";
import productRoutes from "./productRoutes";

const router: Router = express.Router();

router.use("/uploads", express.static("uploads"));
router.use(userRoutes);
router.use(categoryRoutes);
router.use(productRoutes);

export default router;
