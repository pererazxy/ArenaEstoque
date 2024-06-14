// src/controllers/userController.ts
import { Request, Response } from "express";
import * as userService from "../services/userService";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

export async function register(req: Request, res: Response): Promise<void> {
  try {
    let { email, username, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ message: "Email, nome de usuário e senha são obrigatórios!" });
      return;
    }

    const user = await userService.registerUser(username, email, password);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Erro no servidor" });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const { token, user } = await userService.loginUser(email, password);
    res.json({ token, user });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}

export async function getProfile(req: Request, res: Response): Promise<void> {
  const userId = req.user?.id;

  if (!userId) {
    res
      .status(400)
      .json({ message: "Usuário não autenticado ou token inválido." });
    return;
  }

  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado!" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor!" });
  }
}

export async function updateProfile(
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.user?.id;

  if (!userId) {
    res
      .status(400)
      .json({ message: "ID de usuário inválido ou usuário não autenticado." });
    return;
  }

  const { username, email, password } = req.body;

  try {
    const updatedUser = await userService.updateUserById(userId, {
      username,
      email,
      password,
    });
    if (!updatedUser) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return; // Finaliza a execução da função após enviar a resposta
    }
    res.json(updatedUser); // Envia a resposta e finaliza a função
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Erro no servidor" });
    return; // Finaliza a execução da função após enviar a resposta
  }
}

export async function uploadUserProfilePhoto(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const userId = req.user?.id; // Supondo que você tenha req.user disponível
  try {
    // Busca usuário atual para obter a foto atual
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user && user.photoUrl) {
      // Caminho completo da foto atual
      const currentPhotoPath = path.join(__dirname, "../../", user.photoUrl);
      // Verifica se o arquivo existe e o remove de forma síncrona
      if (fs.existsSync(currentPhotoPath)) {
        fs.unlinkSync(currentPhotoPath);
      }
    }

    // Normaliza o caminho antes de salvar no banco de dados
    const photoUrl = req.file.path.replace(/\\/g, "/");

    // Atualiza o usuário com o novo URL da foto e retorna o usuário atualizado
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { photoUrl: photoUrl },
      select: {
        username: true,
        email: true,
        photoUrl: true,
      },
    });

    res.json({
      message: "Photo updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Failed to update photo:", error);
    res.status(500).send("Failed to update photo.");
  }
}
