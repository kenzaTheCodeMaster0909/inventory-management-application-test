"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    try {
        // 1. Get token from headers (format: "Bearer TOKEN")
        const token = req.headers.authorization?.split(' ')[1];
        // 2. If no token → 401 Unauthorized
        if (!token) {
            res.status(401).json({
                success: false,
                error: 'Accès refusé. Token manquant.'
            });
            return;
        }
        // 3. Verify token with secret key (stored in .env)
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        // 4. If OK, add user ID to the request (for subsequent routes)
        req.userId = decoded.userId;
        next(); // Proceed to next middleware/route
    }
    catch (err) {
        res.status(403).json({
            success: false,
            error: 'Token invalide.'
        });
    }
};
exports.verifyToken = verifyToken;
exports.default = exports.verifyToken;
//# sourceMappingURL=verifyToken.js.map