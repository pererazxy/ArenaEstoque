import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProduct = async (
  name: string,
  description: string,
  photourl?: string,
  amount?: number,
  value?: number,
  categoryId?: number
) => {
  // Verifica se o nome já existe
  const existingProduct = await prisma.product.findUnique({
    where: { name },
  });

  if (existingProduct) {
    throw new Error("Product name must be unique");
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      photourl,
      amount,
      value,
      categoryId,
    },
  });
  return product;
};

export const getAllProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

export const getProductById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

export const updateProduct = async (
  id: number,
  name: string,
  description: string,
  photourl?: string,
  amount?: number,
  value?: number,
  categoryId?: number
) => {
  // Verifica se o produto existe
  const existingProduct = await prisma.product.findUnique({
    where: { id },
  });

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  // Verifica se o nome já existe e não é o próprio produto
  const duplicateProduct = await prisma.product.findUnique({
    where: { name },
  });

  if (duplicateProduct && duplicateProduct.id !== id) {
    throw new Error("Product name must be unique");
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      photourl,
      amount,
      value,
      categoryId,
    },
  });
  return product;
};

export const deleteProduct = async (id: number) => {
  const existingProduct = await prisma.product.findUnique({
    where: { id },
  });

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  await prisma.product.delete({
    where: { id },
  });
};
