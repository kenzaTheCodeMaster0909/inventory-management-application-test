const pool = require("../config/db");

const listArticles = async (search = "", page = "1", limit = "10") => {
  const offset = (page - 1) * limit;
  const result = await pool.query(
    "SELECT (id,code,name,description,image,stock_status) FROM articles WHERE name ILIKE $1 ORDER BY id LIMIT $2 OFFSET $3",
    values[("%{search}%", limit, offset)]
  );
  return result.rows;
};
// mettre a jour le status
const takeArticle = async (articleId, userId) => {
  await pool.query("BEGIN");
  try {
    await pool.query(
      "UPDATE articles SET stock_status= 'out' WHERE id=$1 AND stock_status='in'",
      [articleId]
    );

    //enregistrer dans historique
    await pool.query(
      "INSERT INTO article_out (article_id,user_id) VALUES  ($1,$2)",
      [articleId, userId]
    );
    await pool.query("COMMIT");
    return true;
  } catch (err) {
    await pool.query("ROLLBACK");
    throw err;
  }
};
