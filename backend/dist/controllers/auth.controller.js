"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
// Helper function to create error response
const createErrorResponse = (message, details) => ({
    message,
    error: message,
    ...(details ? { details: details } : {})
});
// Registration
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json(createErrorResponse('Tous les champs sont requis'));
            return;
        }
        // Check if user already exists
        const existingUser = await (0, user_model_1.findUserByEmail)(email);
        if (existingUser) {
            res.status(400).json(createErrorResponse('Un utilisateur avec cet email existe déjà'));
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await (0, user_model_1.createUser)(username, email, hashedPassword);
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });
        const userResponse = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            createdAt: newUser.created_at
        };
        const successResponse = {
            message: 'Utilisateur créé avec succès',
            token,
            user: userResponse
        };
        res.status(201).json(successResponse);
    }
    catch (err) {
        const error = err;
        console.error('Registration error:', error);
        const errorResponse = createErrorResponse('Erreur lors de l\'inscription', process.env.NODE_ENV === 'development' ? error.message : undefined);
        res.status(500).json(errorResponse);
    }
};
exports.register = register;
// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json(createErrorResponse('Email et mot de passe requis'));
            return;
        }
        const user = await (0, user_model_1.findUserByEmail)(email);
        if (!user) {
            res.status(401).json(createErrorResponse('Email ou mot de passe incorrect'));
            return;
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json(createErrorResponse('Email ou mot de passe incorrect'));
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        const userResponse = {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.created_at
        };
        const successResponse = {
            message: 'Connexion réussie',
            token,
            user: userResponse
        };
        res.status(200).json(successResponse);
    }
    catch (err) {
        const error = err;
        console.error('Login error:', error);
        const errorResponse = createErrorResponse('Erreur lors de la connexion', process.env.NODE_ENV === 'development' ? error.message : undefined);
        res.status(500).json(errorResponse);
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map