const express = require("express");
const router = express.Router();
const articleController = require("../controllers/article.controller");
const verifyToken = require("../middlewares/auth/verifyToken");

router.get("/", articleController.listArticles);

router.post("/:id/take", verifyToken, articleController.takeArticle);

module.exports = router;
