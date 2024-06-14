import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategory = async (name: string, photourl?: string) => {
  // Verifica se o nome já existe
  const existingCategory = await prisma.category.findUnique({
    where: { name },
  });

  if (existingCategory) {
    throw new Error("Category name must be unique");
  }

  const category = await prisma.category.create({
    data: {
      name,
      photourl,
    },
  });
  return category;
};

export const getAllCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

export const getCategoryById = async (id: number) => {
  const category = await prisma.category.findUnique({
    where: { id },
  });
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};

export const updateCategory = async (
  id: number,
  name: string,
  photourl?: string
) => {
  // Verifica se a categoria existe
  const existingCategory = await prisma.category.findUnique({
    where: { id },
  });

  if (!existingCategory) {
    throw new Error("Category not found");
  }

  // Verifica se o nome já existe e não é a própria categoria
  const duplicateCategory = await prisma.category.findUnique({
    where: { name },
  });

  if (duplicateCategory && duplicateCategory.id !== id) {
    throw new Error("Category name must be unique");
  }

  const category = await prisma.category.update({
    where: { id },
    data: {
      name,
      photourl,
    },
  });
  return category;
};

export const deleteCategory = async (id: number) => {
  const existingCategory = await prisma.category.findUnique({
    where: { id },
  });

  if (!existingCategory) {
    throw new Error("Category not found");
  }

  await prisma.category.delete({
    where: { id },
  });
};
