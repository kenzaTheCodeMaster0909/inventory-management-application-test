"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markArticleAsTaken = exports.getArticles = void 0;
const article_model_1 = require("../models/article.model");
// 1. List articles
const getArticles = async (req, res) => {
    try {
        const { search = '', page = '1', limit = '10' } = req.query;
        // Convert to numbers with validation
        const pageNum = Number.parseInt(page, 10) || 1;
        const limitNum = Number.parseInt(limit, 10) || 10;
        const articles = await (0, article_model_1.listArticles)(search, page.toString(), limit.toString());
        const response = {
            success: true,
            data: articles,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total: articles.length,
            },
        };
        res.json(response);
    }
    catch (error) {
        console.error('Error listing articles:', error);
        const errorResponse = {
            success: false,
            error: 'Erreur serveur',
        };
        res.status(500).json(errorResponse);
    }
};
exports.getArticles = getArticles;
// 2. Take an article
const markArticleAsTaken = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId; // From JWT middleware
        if (!id || !userId) {
            const errorResponse = {
                success: false,
                error: 'ID d\'article ou utilisateur manquant',
            };
            res.status(400).json(errorResponse);
            return;
        }
        const articleId = Number.parseInt(id, 10);
        if (Number.isNaN(articleId)) {
            const errorResponse = {
                success: false,
                error: 'ID d\'article invalide',
            };
            res.status(400).json(errorResponse);
            return;
        }
        const success = await (0, article_model_1.takeArticle)(articleId, Number.parseInt(userId, 10));
        if (!success) {
            const errorResponse = {
                success: false,
                error: 'Article déjà pris ou inexistant',
            };
            res.status(400).json(errorResponse);
            return;
        }
        const successResponse = {
            success: true,
            message: 'Article marqué comme sorti',
        };
        res.json(successResponse);
    }
    catch (error) {
        console.error('Error taking article:', error);
        const errorResponse = {
            success: false,
            error: 'Erreur serveur',
        };
        res.status(500).json(errorResponse);
    }
};
exports.markArticleAsTaken = markArticleAsTaken;
//# sourceMappingURL=article.controller.js.map