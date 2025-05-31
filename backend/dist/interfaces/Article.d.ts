export interface Article {
    id: number;
    code: string;
    name: string;
    description?: string;
    image?: string;
    stock_status: 'in' | 'out';
    created_at?: Date;
    updated_at?: Date;
}
export interface ArticleOut {
    id: number;
    article_id: number;
    user_id: number;
    created_at?: Date;
}
