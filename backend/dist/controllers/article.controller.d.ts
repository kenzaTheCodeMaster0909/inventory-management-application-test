import type { Response } from 'express';
import type { ListArticlesRequest, TakeArticleRequest, PaginatedResponse, SimpleResponse } from '../types/requests';
export declare const getArticles: (req: ListArticlesRequest, res: Response<PaginatedResponse<unknown> | SimpleResponse>) => Promise<void>;
export declare const markArticleAsTaken: (req: TakeArticleRequest, res: Response<SimpleResponse>) => Promise<void>;
