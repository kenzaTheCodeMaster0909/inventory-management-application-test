import type { Article } from '../interfaces/Article';
export declare const listArticles: (search?: string, page?: string, limit?: string) => Promise<Article[]>;
export declare const takeArticle: (articleId: number, userId: number) => Promise<boolean>;
