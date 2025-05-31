import type { Request, Response, NextFunction } from "express";
import type { SimpleResponse } from "../types/requests";

export const validateRegister = (
  req: Request,
  res: Response<SimpleResponse>,
  next: NextFunction
): void => {
  const { username, email, password } = req.body;
  if (!username || username.length < 5 || username.length > 20) {
    res.status(400).json({
      success: false,
      error: "username must be between 5 and 20 caracteres ",
    });
  }
  if (!email || !email.includes("@") || !email.includes(".")) {
    res.status(400).json({
      success: false,
      error: "Email invalide.",
    });
    return;
  }

  if (!password || password.length < 10) {
    res.status(400).json({
      success: false,
      error: "Le mot de passe doit faire au moins 10 caractères.",
    });
    return;
  }

  next();
};
