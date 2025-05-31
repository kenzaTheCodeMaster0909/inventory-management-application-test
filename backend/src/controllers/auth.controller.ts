import type { Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/user.model";
import type {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
} from "../types/requests";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const createErrorResponse = (
  message: string,
  details?: unknown
): AuthResponse => ({
  message,
  error: message,
  ...(details ? { details: details as Record<string, unknown> } : {}),
});

// Registration
export const register = async (
  req: RegisterRequest,
  res: Response<AuthResponse>
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json(createErrorResponse("Tous les champs sont requis"));
      return;
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res
        .status(400)
        .json(createErrorResponse("Un utilisateur avec cet email existe déjà"));
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(username, email, hashedPassword);

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.created_at,
    };

    const successResponse: AuthResponse = {
      message: "Utilisateur créé avec succès",
      token,
      user: userResponse,
    };

    res.status(201).json(successResponse);
  } catch (err) {
    const error = err as Error;
    console.error("Registration error:", error);
    const errorResponse = createErrorResponse(
      "Erreur lors de l'inscription",
      process.env.NODE_ENV === "development" ? error.message : undefined
    );
    res.status(500).json(errorResponse);
  }
};

// Login
export const login = async (
  req: LoginRequest,
  res: Response<AuthResponse>
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json(createErrorResponse("Email et mot de passe requis"));
      return;
    }

    const user = await findUserByEmail(email);
    if (!user) {
      res
        .status(401)
        .json(createErrorResponse("Email ou mot de passe incorrect"));
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res
        .status(401)
        .json(createErrorResponse("Email ou mot de passe incorrect"));
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.created_at,
    };

    const successResponse: AuthResponse = {
      message: "Connexion réussie",
      token,
      user: userResponse,
    };

    res.status(200).json(successResponse);
  } catch (err) {
    const error = err as Error;
    console.error("Login error:", error);
    const errorResponse = createErrorResponse(
      "Erreur lors de la connexion",
      process.env.NODE_ENV === "development" ? error.message : undefined
    );
    res.status(500).json(errorResponse);
  }
};
