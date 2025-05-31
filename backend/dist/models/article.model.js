"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeArticle = exports.listArticles = void 0;
const db_1 = __importDefault(require("../config/db"));
const listArticles = async (search = "", page = "1", limit = "10") => {
    const offset = (Number.parseInt(page, 10) - 1) * Number.parseInt(limit, 10);
    const result = await db_1.default.query(`SELECT id, code, name, description, image, stock_status 
     FROM articles 
     WHERE name ILIKE $1 
     ORDER BY id 
     LIMIT $2 OFFSET $3`, [`%${search}%`, limit, offset.toString()]);
    return result.rows;
};
exports.listArticles = listArticles;
const takeArticle = async (articleId, userId) => {
    const client = await db_1.default.connect();
    try {
        await client.query('BEGIN');
        const updateResult = await client.query(`UPDATE articles 
       SET stock_status = $1, updated_at = NOW() 
       WHERE id = $2 AND stock_status = $3 
       RETURNING *`, ['out', articleId.toString(), 'in']);
        if (updateResult.rowCount === 0) {
            await client.query('ROLLBACK');
            return false;
        }
        await client.query('INSERT INTO article_out (article_id, user_id) VALUES ($1, $2)', [articleId.toString(), userId.toString()]);
        await client.query('COMMIT');
        return true;
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }
    finally {
        client.release();
    }
};
exports.takeArticle = takeArticle;
//# sourceMappingURL=article.model.js.map