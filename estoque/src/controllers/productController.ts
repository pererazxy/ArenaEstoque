import { Request, Response } from "express";
import * as productService from "../services/productService";

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, amount, value, categoryId } = req.body;
    const photourl = req.file?.path; // Obtendo o caminho do arquivo enviado, se houver
    const product = await productService.createProduct(
      name,
      description,
      photourl ? photourl.replace(/\\/g, "/") : undefined,
      amount,
      value,
      categoryId
    );
    res.status(201).json(product);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(Number(id));
    res.status(200).json(product);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, amount, value, categoryId } = req.body;
    const photourl = req.file?.path; // Obtendo o caminho do arquivo enviado, se houver
    const product = await productService.updateProduct(
      Number(id),
      name,
      description,
      photourl ? photourl.replace(/\\/g, "/") : undefined,
      amount,
      value,
      categoryId
    );
    res.status(200).json(product);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(Number(id));
    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
};
