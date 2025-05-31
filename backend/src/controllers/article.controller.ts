import type { Response } from 'express';
import { listArticles, takeArticle } from '../models/article.model';
import type { ListArticlesRequest, TakeArticleRequest, PaginatedResponse, SimpleResponse } from '../types/requests';

// 1. List articles
export const getArticles = async (req: ListArticlesRequest, res: Response<PaginatedResponse<unknown> | SimpleResponse>): Promise<void> => {
  try {
    const { search = '', page = '1', limit = '10' } = req.query;

    // Convert to numbers with validation
    const pageNum = Number.parseInt(page, 10) || 1;
    const limitNum = Number.parseInt(limit, 10) || 10;

    const articles = await listArticles(search, page.toString(), limit.toString());

    const response: PaginatedResponse<unknown> = {
      success: true,
      data: articles,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: articles.length,
      },
    };

    res.json(response);
  } catch (error) {
    console.error('Error listing articles:', error);
    const errorResponse: SimpleResponse = {
      success: false,
      error: 'Erreur serveur',
    };
    res.status(500).json(errorResponse);
  }
};

// 2. Take an article
export const markArticleAsTaken = async (req: TakeArticleRequest, res: Response<SimpleResponse>): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId; // From JWT middleware

    if (!id || !userId) {
      const errorResponse: SimpleResponse = {
        success: false,
        error: 'ID d\'article ou utilisateur manquant',
      };
      res.status(400).json(errorResponse);
      return;
    }

    const articleId = Number.parseInt(id, 10);
    if (Number.isNaN(articleId)) {
      const errorResponse: SimpleResponse = {
        success: false,
        error: 'ID d\'article invalide',
      };
      res.status(400).json(errorResponse);
      return;
    }

    const success = await takeArticle(articleId, Number.parseInt(userId, 10));

    if (!success) {
      const errorResponse: SimpleResponse = {
        success: false,
        error: 'Article déjà pris ou inexistant',
      };
      res.status(400).json(errorResponse);
      return;
    }

    const successResponse: SimpleResponse = {
      success: true,
      message: 'Article marqué comme sorti',
    };
    res.json(successResponse);
  } catch (error) {
    console.error('Error taking article:', error);
    const errorResponse: SimpleResponse = {
      success: false,
      error: 'Erreur serveur',
    };
    res.status(500).json(errorResponse);
  }
};
