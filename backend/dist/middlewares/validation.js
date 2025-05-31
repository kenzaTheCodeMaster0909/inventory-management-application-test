"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const validateRegister = (req, res, next) => {
    const { email, password } = req.body;
    // 1. Check if email is valid
    if (!email || !email.includes('@') || !email.includes('.')) {
        res.status(400).json({
            success: false,
            error: 'Email invalide.'
        });
        return;
    }
    // 2. Check if password is long enough
    if (!password || password.length < 10) {
        res.status(400).json({
            success: false,
            error: 'Le mot de passe doit faire au moins 10 caractères.'
        });
        return;
    }
    // 3. If everything is OK, proceed to the next middleware
    next();
};
exports.validateRegister = validateRegister;
exports.default = { validateRegister: exports.validateRegister };
//# sourceMappingURL=validation.js.map