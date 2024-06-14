// src/middleware/authenticateToken.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomJwtPayload extends jwt.JwtPayload {
  userId: number;
  role: string; // Definição atualizada para garantir que role sempre será uma string
}

export default function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, "nooooo", (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }

    const payload = decoded as CustomJwtPayload;
    req.user = { id: payload.userId, role: payload.role };
    next();
  });
}
