import type { Request } from 'express';
import type { Article } from '../interfaces/Article';
export interface RegisterRequest extends Request {
    body: {
        username: string;
        email: string;
        password: string;
    };
}
export interface LoginRequest extends Request {
    body: {
        email: string;
        password: string;
    };
}
export interface AuthResponse {
    message: string;
    token?: string;
    user?: {
        id: number;
        username: string;
        email: string;
        createdAt?: Date;
    };
    error?: string;
    details?: unknown;
}
export interface ListArticlesRequest extends Omit<Request, 'query' | 'user'> {
    query: {
        search?: string;
        page?: string;
        limit?: string;
    };
    userId?: string;
}
export interface TakeArticleRequest extends Omit<Request, 'params' | 'user'> {
    params: {
        id: string;
    };
    userId: string;
}
export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
    error?: string;
}
export interface SimpleResponse {
    success: boolean;
    message?: string;
    error?: string;
    details?: unknown;
}
export interface ArticleResponse extends SimpleResponse {
    data?: Article | Article[];
}
