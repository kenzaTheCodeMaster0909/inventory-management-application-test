const { listArticles, takeArticle } = require("../models/article.model");

// 1. Lister les articles
exports.listArticles = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;

    // Convertir en nombres
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const articles = await listArticles(search, pageNum, limitNum);

    res.json({
      success: true,
      data: articles,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: articles.length,
      },
    });
  } catch (err) {
    console.error("Error listing articles:", err);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};

// 2. Prendre un article
exports.takeArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId; // From JWT middleware

    const success = await takeArticle(id, userId);

    if (!success) {
      return res.status(400).json({
        success: false,
        error: "Article déjà pris ou inexistant",
      });
    }

    res.json({
      success: true,
      message: "Article marqué comme sorti",
    });
  } catch (err) {
    console.error("Error taking article:", err);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};
