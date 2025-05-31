"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_js_1 = __importDefault(require("./routes/auth.routes.js"));
const article_routes_js_1 = __importDefault(require("./routes/article.routes.js"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API Routes
app.use('/api/auth', auth_routes_js_1.default);
app.use('/api/articles', article_routes_js_1.default);
// Health check endpoint
app.get('/health', (_req, res) => {
    res.json({ success: true, message: 'Server is running' });
});
// 404 handler
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});
// Global error handler
const errorHandler = (err, _req, res, _next) => {
    console.error('Error:', err);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        success: false,
        error: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message,
    });
};
app.use(errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map