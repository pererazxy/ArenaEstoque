// src/services/userService.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserData {
  username: string;
  email: string;
  password: string;
}

export async function registerUser(
  username: string,
  email: string,
  password: string
): Promise<UserData> {
  if (!username.trim() || !email.trim() || !password.trim()) {
    throw new Error("Todos os campos devem ser preenchidos!");
  }

  const existingEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (existingEmail) {
    throw new Error("Já possui usuario com esse email!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: { username, email, password: hashedPassword },
  });
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ token: string; user: any }> {
  // Adicionado tipo de retorno com user
  if (!email.trim() || !password.trim()) {
    throw new Error("Todos os campos devem ser preenchidos.");
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { userId: user.id },
      "nooooo", // Use uma variável de ambiente para a chave secreta
      { expiresIn: "60d" }
    );

    // Retorne o usuário e o token, excluindo a senha
    const { password, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  } else {
    throw new Error("Usuário não encontrado ou senha incorreta.");
  }
}

export async function updateUserById(
  userId: number,
  updateData: Partial<UserData>
): Promise<UserData | null> {
  if (!userId) {
    throw new Error("ID de usuário fornecido é inválido.");
  }

  try {
    if (updateData.password) {
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(userId: number) {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      photoUrl: true,
    },
  });
}
