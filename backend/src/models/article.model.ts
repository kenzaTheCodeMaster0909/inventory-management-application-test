import type { PoolClient, QueryResult } from 'pg';
import pool from '../config/db';
import type { Article, ArticleOut } from '../interfaces/Article';

export const listArticles = async (
  search = "",
  page = "1",
  limit = "10"
): Promise<Article[]> => {
  const offset = (Number.parseInt(page, 10) - 1) * Number.parseInt(limit, 10);
  const result = await pool.query<Article>(
    `SELECT id, code, name, description, image, stock_status 
     FROM articles 
     WHERE name ILIKE $1 
     ORDER BY id 
     LIMIT $2 OFFSET $3`,
    [`%${search}%`, limit, offset.toString()]
  );
  return result.rows;
};

export const takeArticle = async (articleId: number, userId: number): Promise<boolean> => {
  const client: PoolClient = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const updateResult: QueryResult<Article> = await client.query<Article>(
      `UPDATE articles 
       SET stock_status = $1, updated_at = NOW() 
       WHERE id = $2 AND stock_status = $3 
       RETURNING *`,
      ['out', articleId.toString(), 'in']
    );

    if (updateResult.rowCount === 0) {
      await client.query('ROLLBACK');
      return false;
    }

    await client.query<ArticleOut>(
      'INSERT INTO article_out (article_id, user_id) VALUES ($1, $2)',
      [articleId.toString(), userId.toString()]
    );
    
    await client.query('COMMIT');
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
