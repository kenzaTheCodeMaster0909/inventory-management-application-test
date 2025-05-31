import { Router, type RequestHandler } from 'express';
import { getArticles, markArticleAsTaken } from '../controllers/article.controller';
import { verifyToken } from '../middlewares/auth/verifyToken.js';

const router = Router();

router.get('/', getArticles);
router.post(
  '/:id/take', 
  verifyToken, 
  markArticleAsTaken as unknown as RequestHandler
);

export default router;
