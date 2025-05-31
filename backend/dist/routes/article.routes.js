"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const article_controller_1 = require("../controllers/article.controller");
const verifyToken_js_1 = require("../middlewares/auth/verifyToken.js");
const router = (0, express_1.Router)();
router.get('/', article_controller_1.getArticles);
router.post('/:id/take', verifyToken_js_1.verifyToken, article_controller_1.markArticleAsTaken);
exports.default = router;
//# sourceMappingURL=article.routes.js.map